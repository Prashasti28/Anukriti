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

mongoose.connect("mongodb://localhost:27017/userDBanukriti", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/anukriti"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

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
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.redirect("/register");
    } else{
      passport.authenticate("local") (req, res, function(){
        res.redirect("/frontpage");
      });
    }
  });
});

app.post("/login", function(req, res){
  const user = new User({
    username: req.body.username,
    password: req.body.password
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
    res.render("frontpage");
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

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});


app.listen(3000, function(req, res){
  console.log("Server running on port 3000");
});
