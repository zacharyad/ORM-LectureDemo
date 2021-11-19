// These are some config you may wont to think about for CONNECTING TO THE DB
// postgres protocol
// localhost -> defaults to 5432
// database name: wiki
// DB Password
const Sequelize = require('sequelize')
const db = new Sequelize("postgres://localhost:5432/wiki")



// db.define -> accepts at LEAST 2 arguments
// 1st one: table name in lowercase and singular
// 2nd argument is an object whose keys are the field/attribute names and the values are at LEAST the data types we expect

// if we want to add validations/etc into our fields, we no longer can use just a string value, we MUST turn this 2nd argument's values into objects


// in Sequelize, we will call these return values from db.define "models" which is an object
// will convert into a table into the database


//USER
const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pictureUrl: Sequelize.STRING
})

// DOG
const Dog = db.define("dog", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: Sequelize.INTEGER
})


// when do you add a class method and when do you add an instance method?
// Dog.findPuppies
// class methods: we are dealing with more than 1 instance at a time
// looking through the db for multiple rows

// instance methods: dealing with changes or dealing with just 1 instance itself

// class method to find puppies -> aged 1 or younger


// arrow functions -> don't have a THIS! so it will look for the most immediate this which is probably this file
// for class and instance methods, be careful and make use of the function declaration
Dog.findPuppies = function() {
  // this the entire Dog does not have 1 name or 1 age
  // You can make versions of me by calling new Dog()
  // this relates to the Dog class
  // we don't need an await or a try catch here because we will be using this in our routes, where try catch already exists.
  let puppies = this.findAll({
    where: {
      age: {
        [Sequelize.Op.lte]: 1
      }
    }
  })

  return puppies;

}

Dog.prototype.getStatement = function() {
  // the `this` is an object that has a name property and an age property
  // this is `Dog.prototype`

  return `The dog named ${this.name} is ${this.age} years old!`
}

// console.log('what is Dog', Object.keys(Dog));

// create associations -> these methods will (when synced) create the appropriate foreign keys and references to different tables as necessary
// dogs should have 1 owner which means dogs should have the foreign key "userId"


// Dog.belongsTo(User);
// User.hasMany(Dog);

Dog.belongsTo(User, {
  foreignKey: {
    name: "pickle"
  }
})


console.log('Dog prototype methods', Object.keys(Dog.prototype));
console.log('User prototype methods', Object.keys(User.prototype));


// console.log('what if I just invoked it?', User());

// to use class and instance methods

// ModelName.hookName(callback function whose argument is the instance)
// User.beforeValidate(user => {
//   console.log('beforeValidate');
// });

// VALIDATE HAPPENS HERE OUTSIDE OF ALL OUR LOGS

User.afterValidate(user => {
  console.log('afterValidate');
  // Lets manipulate this "row" or "instance"
  user.name += "!"
});

// User.beforeCreate(user => {
//   console.log('beforeCreate');
// });

// this is the creation stage CREATION STAGE

// User.afterCreate(user => {
//   console.log('afterCreate');
// });


module.exports = {
  db,
  User,
  Dog
};
