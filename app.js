require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "This is my little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDBanukriti", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false});

const productSchema = new mongoose.Schema ({
  productID: String,
  productName: String,
  productPrice: Number,
  productDescription: String,
  productImage: String,
  productReviews: [{
    authorName: String,
    review: String,
    rating: Number
  }],
  productAvgRating: Number
});
const Product = mongoose.model("Product", productSchema);

const cartSchema = new mongoose.Schema ({
  itemsArr: [{
      item: productSchema,
      qty: Number,
      itemTotal: Number //total price of respetive item = qty * price of one item = qty * item.price
    }],
  totalItemQuantity: Number,
  totalBill: Number
});
const Cart = mongoose.model("Cart", cartSchema);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  cart: cartSchema,
  wishlist: [productSchema]
});

const orderSchema = new mongoose.Schema ({ //collection: orders, each document contains an array of orders(bought carts) of a user and the userId of the corresponding user
  userId: String,
  ordersArr: [cartSchema]
});
const Order = mongoose.model("Order", orderSchema);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) { //when google login is done
  done(null, user.id);
});

passport.deserializeUser(function(id, done) { //when google register is done
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/anukriti"
  },
  function(accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) { //creating new user if no user with matching googleID was found
                user = new User({
                  googleId: profile.id,
                  cart: new Cart ({
                      itemsArr: [],
                      totalItemQuantity: 0,
                      totalBill: 0
                    }),
                  wishlist: []
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user); //return found user
            }
        });
    }
));

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){ // will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}

app.get("/", function(req, res){
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/anukriti",
passport.authenticate("google", { failureRedirect: "/login" }),
function(req, res) {
  // Successful authentication, redirect to frontpage.
  res.redirect("/frontpage");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  User.register(
    {
      username: req.body.username, cart: new Cart ({
      itemsArr: [],
      totalItemQuantity: 0,
      totalBill: 0
    })
  }, req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local") (req, res, function(){
        res.redirect("/frontpage");
      });
    }
  });
});

app.post("/login", function(req, res){ //when non google login is done
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function(err){
    if (err){
      console.log(err);
    } else {
      passport.authenticate("local") (req, res, function(){
        res.redirect("/frontpage");
      });
    }
  });
});

app.get("/frontpage", function(req, res){
  if (req.isAuthenticated()){
    res.render("frontpage"); //CHANGE
  } else {
    res.redirect("/login");
  }
});

app.get("/catalog", function(req, res){
  res.render("catalog");
});

app.get("/andhra", function(req, res){
  res.render("states/andhra");
});

app.get("/assam", function(req, res){
  res.render("states/assam");
});

app.get("/gujarat", function(req, res){
  res.render("states/gujarat");
});

app.get("/himachal", function(req, res){
  res.render("states/himachal");
});

app.get("/jk", function(req, res){
  res.render("states/jk");
});

app.get("/karnataka", function(req, res){
  res.render("states/karnataka");
});

app.get("/kerala", function(req, res){
  res.render("states/kerala");
});

app.get("/rajasthan", function(req, res){
  res.render("states/rajasthan");
});

app.get("/uttar", function(req, res){
  res.render("states/uttar");
});


app.get("/about", function(req,res){
  res.render("about");
});

app.get("/contact-us", function(req,res){
  res.render("contact-us");
});

app.get("/cart", checkAuthentication, function(req, res){
  userID = req.user._id;
  User.findById(userID, function(err, user){
    cart = user.cart;
    res.render("cart", {products: cart.itemsArr, cart: cart});
    });
  });

app.get("/wishlist", checkAuthentication, function(req, res){
  userID = req.user._id;
  User.findById(userID, function(err, user){
    wishlist = user.wishlist; //wishlist is already an array of productSchema
    res.render("wishlist", {products: wishlist});
  });
});

app.get("/orders", checkAuthentication, function(req, res){
  userID = req.user._id;
  Order.findOne( { userId: userID}, function(err, order){
    if (!order){
      res.render("orders", {flag: 0});
    } else{
      cartsArr = order.ordersArr;
      res.render("orders", {cartsArr: order.ordersArr, flag:1});
    }
  });
});


app.post("/add-to-cart", checkAuthentication, function (req, res){
  productID = req.body.product_id;
  userID = req.user._id;
  addToCart(userID, productID, function(){
    res.redirect("/cart");
  });
});

app.post("/add-to-wishlist", checkAuthentication, function (req, res){
  productID = req.body.product_id;
  userID = req.user._id;
  addToWishlist(userID, productID, function(){
    res.redirect("/wishlist");
  });

});

app.post("/remove-from-wishlist", checkAuthentication, function (req, res){
  productID = req.body.product_id;
  userID = req.user._id;
  removeFromWishlist(userID, productID, function(){
    res.redirect("/wishlist");
  });

});

app.post("/move-to-cart", checkAuthentication, function (req, res){ //moving item from cart to wishlist
  productID = req.body.product_id;
  userID = req.user._id;
  removeFromWishlist(userID, productID, function(){
    addToCart(userID, productID, function(){
      //do nothing
    });
  });
  res.redirect("/wishlist");
});

app.get("/checkout-cart", checkAuthentication, function(req, res){
  userID = req.user._id;
  checkoutCart(userID);
  res.redirect("/cart");
});


app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});


function addToCart(userID, productId, callback) {
  Product.findOne({ productID: productId }, function (err, toAddProduct) {
    if (err){
      console.log(err);
    } else {
      prodDbId = toAddProduct._id;
      productPrice = toAddProduct.productPrice;
    }
    User.findById( userID, function(err, user){
      if (err){
        console.log(err);
      } else { //checking if toAddProduct is already in the cart or not
        if (user.cart.itemsArr.length !== 0) { // if cart is not empty
          flag = 0;
          user.cart.itemsArr.forEach(function(itm) {
            str1 = "" + prodDbId;
            str2 = "" + itm.item._id;
            if (str1.localeCompare(str2) == 0 ) { // item is already in cart
              itm.qty++;
              itm.itemTotal += productPrice;
              flag = 1;
            }
          });
          if (flag == 0){ // item is not in cart but cart is not empty
            user.cart.itemsArr.push({item: toAddProduct, qty: 1, itemTotal: productPrice});
          }
        } else { //cart is empty
          user.cart.itemsArr.push({item: toAddProduct, qty: 1, itemTotal: productPrice});
        }
        user.cart.totalItemQuantity++;
        user.cart.totalBill += productPrice;
        user.save();
      }
    })
  });
  callback();
}

function addToWishlist (userID, productId, callback) {
  Product.findOne({ productID: productId }, function (err, toAddProduct) {
    if (err){
        console.log(err);
      } else {
        User.findById( userID, function(err, user){
          if (user.wishlist.length != 0) { //if user's wishlist is not empty, check if item is already in wishlist
            flag = 0;
            user.wishlist.forEach(function(itm){
              str1 = "" + itm._id;
              str2 = "" + toAddProduct._id;
              if (str1.localeCompare(str2) == 0) {
                flag = 1; // flag becomes 1 if item is found in wishlist
              }
            });
            if (flag === 0) { //item was not in wishlist
              user.wishlist.push(toAddProduct);
              user.save();
            }
          } else { //wishlist is empty
            user.wishlist.push(toAddProduct);
            user.save();
          }
        });
      }
  });
  callback();
}

function removeFromWishlist (userID, productId, callback){
    User.findById( userID, function(err, user){
      wishlist = user.wishlist;
      for (var i=0; i < wishlist.length; i++){
        if (productId === wishlist[i].productID){
          wishlist.splice(i, 1);
          user.save();
        }
      }
    });
    callback();
}




function emptyCart(userID) {
  User.findByIdAndUpdate( userID, { cart: {itemsArr: [], totalItemQuantity: 0, totalBill: 0} } ,function(err){
    if (err){
      console.log(err);
    }
  });
}



function checkoutCart(userID) {
  User.findById( userID, function( err, user){
    if (err){
      console.log(err);
    } else {
      Order.findOne( {userId: userID} , function(err, order){
      if (!order){ // if this is the user's first order
        firstOrder = new Order({
          userId: userID,
          ordersArr: [user.cart]
        });
        firstOrder.save()
      } else { // if the user already has an document of orders
        order.ordersArr.push(user.cart);
        order.save();
      }
    });
    emptyCart(userID);
  }
});
}


















app.listen(3000, function(req, res){
  console.log("Server running on port 3000");
});
