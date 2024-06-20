require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI);

var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let dzeko = new Person({name: "dzeko", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
let cengo = new Person({name: "cengo", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
let omer = new Person({name: "omer", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

arrayOfPeople = [dzeko, cengo, omer];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.log(err);
    done(null, data)
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) =>{
    if (err) return console.log(err);
    done(null, data)
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) =>{
    if (err) return console.log(err);
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId},(err, data) =>{
    if (err) return console.log(err);
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) =>{
    if (err) return console.log(err);
  
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) =>{
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, updatedPerson) =>{
    if (err) return console.log(err);
    done(null , updatedPerson);
  })
  
};

const removeById = (personId, done) => {
  
  Person.findOneAndRemove({_id: personId}, (err, data)=>{
    if (err) return console.log(err);
    done(null , data);
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, data)=>{
    if (err) return console.log(err);
    done(null , data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age:0})
    .exec((err, data)=>{
    if (err) return console.log(err);
    done(null , data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
