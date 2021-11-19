const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
// we need to database
// import DB and models
const {db, User, Dog} = require('./db')

app.use(morgan("dev")); //logging middleware
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    //res.send('<h1>WELCOME to our Sequelize intro!</h1>');

    // 2 ways to create a user/instance in the db
    // new keyword + save

    // create
     /*
     
     const person = await new User({
      name: "Zacho",
    })

    person.save() */

    // findOrCreate

    const newPerson = await User.create({
      name: "Craig"
    })

    res.send(newPerson)

  } catch (e) {
    next(e);
  }
})

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.send(users)

  } catch (e) {
    next(e);
  }
});

app.get('/dogs', async (req, res, next) => {
  try {
    res.send("In the /dogs route")
  } catch (e) {
    next(e);
  }
});

app.get('/users/:userId', async (req, res, next) => {
  try {
    const idForUser = req.params.userId
    res.send("In the /users/:userId route")
  } catch (e) {
    next(e);
  }
})

app.post('/users', async (req, res, next) => {
  try {
  
    let newUser = await User.create(req.body)
    console.log(newUser)
    res.send("Posted to users.....?")
  } catch (e) {
    next(e);
  }
})



// before I ever give my users/clients access to my server, I want to make sure my database is properly synced!
const init = async () => {
  try {
    // await User.sync(); // all of these sync methods will create a table only if it does not exist.
    // await Dog.sync();
    await db.sync({force: true});
    // `sync` -> add and work with all the FIELDS and ASSOCIATIONS.

    // { force: true } => drop all tables and recreate them
    // you would lose any seed data that you originally had
    // Force true will drop all tables so if you needed to add a field/remove/etc in your models, you would include force true for 1 run of the server, and then remove it so you don't constantly drop your tables.
    app.listen(PORT, () => {
      console.log(`Waving through a window on PORT ${PORT}`);
    });
  } catch (e) {
    console.log('Woops, my window broke', e);
  }
};

init();
