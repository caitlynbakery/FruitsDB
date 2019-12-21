//jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 5,
  review: "Peaches are mushy"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 10,
  review: "Love Mangos!"
});

mango.save();
Person.updateOne({name: "Wally"}, {favoriteFruit: mango}, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Added favorite fruit");
  }
})
// const person = new Person ({
//   name: "Wally",
//   age: 2
// });


// person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  score: 9,
  review: "Love this fruit!"
});

// // Fruit.insertMany([kiwi, orange, banana], function(err){
// //   if(err){
// //     console.log(err);
// //   } else{
// //     console.log("Successfully saved all fruits to fruitsDB");
// //   }
// // });


Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else{

    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

  }
});

// Fruit.updateOne({_id: "5dfce28340d14b08fcc04949"}, {name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document!")
//   }
// })

// Fruit.deleteOne({name: "Peach"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully removed Peach");
//   }
// })

// Person.deleteMany({name: "Wally"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Removed Wally")
//   }
// })