# Welcome to the Sequelize intro!
## To get start:
1. `createdb wiki` (or create database in Postico or `create database wiki;` in psql)
2. `npm install`
3. `npm start`
4. Go to `localhost:8080` to see the home page!

### What we will be covering:
1. Create a Sequelize instance and connect to postgres. []
2. Create models using `db.define`. []
3. Syncing models. []

BREAK UNTIL 11:04AM EST.

4. Using class methods `.findAll()` and `.findByPk()` in our route handlers/express middleware to query the database through pg. []
5. Use class methods `.create` and instance method `.save` in order to create new rows in the database. []
6. Learn extended model options through __hooks__ such as `beforeValidate`, `afterValidate`, `beforeCreate`, `afterCreate`. []
7. Cover `class/instance` methods: Model.classMethod, Model.prototype.instanceMethod. []
8. Cover 1 to many relationship using `belongsTo` and `hasMany`, and walk through `magic methods` using `Object.keys(Model.prototype)`. [ ]
