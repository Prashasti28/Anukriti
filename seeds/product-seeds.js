const Product = require("../schemas/product");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDBanukriti", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const products = [
  new Product({
    productID: "0",
    productName: "Kalamkari Print Scarf",
    productPrice: 800,
    productDescription: "Dimensions: 52 inches x 8.5 inches, Handwash only",
    productImage: "https://www.gitagged.com/wp-content/uploads/2018/09/Machilipatnam-Kalamkari-Scraf-Creepers-2-1.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "1",
    productName: "Kalamkari Print Bedsheet",
    productPrice: 1700,
    productDescription: "Dimensions: 180cm x 275cm, Do not machine wash",
    productImage: "https://lepakshihandicrafts.gov.in/images/products/kalamkari-prints/2.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "2",
    productName: "Muga Silk Saree",
    productPrice: 1800,
    productDescription: "Care Instructions: Dry Clean Only, Length 5.5M-Width 1.6M , With Blouse Piece",
    productImage: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlum4OF43Sw3xmj5rfwlf1-Ez3-mC2dl8cRlMvlSOc5IgwNlLN&usqp=CAY",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "3",
    productName: "Muga Silk Pouch",
    productPrice: 950,
    productDescription: "Dimensions: 7.6 x 5.1 x 5.1 centimeters, Weight: 20 grams",
    productImage: "https://www.fabindia.com/ccstore/v1/images/?source=/file/v6691975978179934143/products/10613984BR.f.250719.jpg&height=475&width=475",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "4",
    productName: "Sankheda Temple",
    productPrice: 800,
    productDescription: " Made of Brown Sheesham Wood, Dimensions : 22.86 x 15.24 x 53.34 cm; 2 Kilograms",
    productImage: "https://productimages.withfloats.com/tile/5e04f76d2a9c910001e03262.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "5",
    productName: "Wooden Chowki (Set of 3)",
    productPrice: 650,
    productDescription: "Dimensions: (B)12x12x3 (M)10x10x3 (S)8x8x3 inch, Weight: 3.080 kg",
    productImage: "https://n1.sdlcdn.com/imgs/i/q/9/Wooden-Chowki-Set-of-3-SDL394005456-1-09f0e.JPG",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "6",
    productName: "Chamba Rumal Geometric Embroidery",
    productPrice: 450,
    productDescription: "Traditional Women Design, Gentle and Soft Feel, Dimensions : 15x15 inch",
    productImage: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRBN2kE6Efzn_ppLOSBxpfTiCDV6j_FKlFeMfGnHGk2VA1tR2aU&usqp=CAY",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "7",
    productName: "Chamba Rumal Peacock Embroidery",
    productPrice: 800,
    productDescription: "Traditional Women Design, Gentle and Soft Feel, Dimensions : 10x10 inch",
    productImage: "https://www.shoppingkart24.com/image/cache/catalog/rohini/mayur1-500x660.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "8",
    productName: "Wooden Boat",
    productPrice: 900,
    productDescription: "Dimensions: 50.8 x 11.4 x 15.2 Centimeters, Weight: 0.8 Kilograms, Eco-Friendly",
    productImage: "https://cdn.shopify.com/s/files/1/0067/4978/2119/products/KB3107_1024x1024.jpg?v=1598276946",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "9",
    productName: "Natural Marble Stone Soap Dish",
    productPrice: 850,
    productDescription: "Dimension : 13cm x 2.6cm. Suitable for all size of soaps. Weight: 500gms",
    productImage: "https://cdn.shopify.com/s/files/1/0067/4978/2119/products/kb10422_1_1024x1024.jpg?v=1598293388",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "10",
    productName: "Storage Box",
    productPrice: 1600,
    productDescription: "Dimensions: L – 8.5cm, W – 2.5, H – 7cm, Weight: 200 grams, Base Metal: Zinc & Copper, Inlay Material: Pure Silver",
    productImage: "https://cdn.engrave.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/a/aamlet-1.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "11",
    productName: "Bidri Bangles",
    productPrice: 1200,
    productDescription: "Dimensions: L – 2.5 inches, W – 0.6 inches, Weight: 50-55 grams, Base Metal: Zinc & Copper, Inlay Material: Pure Silver",
    productImage: "https://www.gitagged.com/wp-content/uploads/2017/06/Copy-Bidriware-Big-Star-Single-Bangle-4-300x300.png",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "12",
    productName: "Breathable Sandals",
    productPrice: 500,
    productDescription: "Dimensions: L - 26 inches, H – 4 inches, Weight: 70g, Suitability: Indoors & beachwear",
    productImage: "https://www.gitagged.com/wp-content/uploads/2018/05/Breathable-Sandals-2-233x233.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "13",
    productName: "Screw Pine Mats",
    productPrice: 700,
    productDescription: "Mat Dimensions = L - 95 cm, W - 25 cm, H - 1 cm",
    productImage: "https://healthyliving.natureloc.com/wp-content/uploads/2018/04/Screw-Pine-Products-NatureLoC-Buy-Online-2.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "14",
    productName: "Blue & White Wall Plate",
    productPrice: 1500,
    productDescription: "Purely decorative, this wall plate is not meant food, comes with a hook behind to hang on the wall, wipe with soft, dry cloth. Do not wash. Diameter - 26cm. Weight - 600g",
    productImage: "https://cdn.shopify.com/s/files/1/1671/4363/products/first_MG_9731_1024x1024.jpg?v=1592652581",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "15",
    productName: "Blue Ceramic Wall Plate",
    productPrice: 1450,
    productDescription: "Made of glazed blue ceramic, wipe clean with a wet cloth, Dimensions: 34 Long X 25 Wide X 4 High (centimetres), Weight: 1 kg.",
    productImage: "https://cdn.shopify.com/s/files/1/1671/4363/products/MG_0109_1024x1024.jpg?v=1593608169",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "16",
    productName: "Stone Flower Vase",
    productPrice: 2500,
    productDescription: "12 inch Hand Carved Indian Marble Flower Vase Pot with Intricate detailing and Handiwork; Dimensions: Size: 12 inches, Colour/Material: Marble Weight: 2 Kgs",
    productImage: "https://images-na.ssl-images-amazon.com/images/I/9151FUveBeL._SL1500_.jpg",
    productReviews: [],
    productAvgRating: 0
  }),
  new Product({
    productID: "17",
    productName: "Carved Tealight Holder",
    productPrice: 2000,
    productDescription: "Dimensions: Diameter = 3 inch (7.6 cms), Height = 7 inch (17.8 cms) Gorgeous Tealight Candle Holder With Lid Made of Soap Stone in the Shape of Pot.",
    productImage: "https://rukminim1.flixcart.com/image/416/416/jsge4cw0/candle-tealight-holder/f/y/g/ki0987-kaushal-creation-original-imafey3htycrkweb.jpeg?q=70",
    productReviews: [],
    productAvgRating: 0
  })
];

var done=0;
for (var i = 0; i<products.length; i++){
  products[i].save(function(err, result){
    done++;
    if (done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
