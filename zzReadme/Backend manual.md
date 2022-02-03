KARLA general Readme.md

Sequelize
config => configure for example where is our database

models => Models of our data (Users, Product, Orders, Categories)

migrations: instructions to actually build tables from the models.

seeders: How to input test data to our tables.

Useful commands
Generate Models & Migrations
npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,password:string

Generate Seed files
npx sequelize-cli seed:generate --name some-users

---

A. SET UP PROJECT AND DATABASE
B. RELATIONS.md (Karla)

A. SET UP PROJECT AND DATABASE

1. Set up project--DONE--
2. Install sequelize --> npm install sequelize sequelize-cli --DONE--
3. Install library communication sequelize <-> postgres --DONE--
   npm install pg --DONE--
4. initialize sequelize project --> npx sequelize-cli init --DONE--
5. Git initial commit:--DONE--
   git add .
   git commit -m 'Initial commit, sequelize init'
6. Create repo in your git account
7. Push existing repo to your github
   git@github.com:koenwisse/Database-project-2.git
   git branch -M main
   git push -u origin main
   check in your github if its there
   for every next push do
   for every next commit do: add, commit + message and ggpush

   npm init -y
   git init
   touch .gitignore
   add node modules to .gitignore --> node_modules/

8. 1. set up server in index.js file on root --DONE--

const express = require("express");

const PORT = process.env.PORT || 4000;

// create the app (server)
const app = express();

// start the server
app.listen(PORT, () => console.log(`I am listening on port, ${PORT}`));

Test the server in your browser. You should see Cannot GET / in the browser and a message like Listening on :4000 in your terminal. ---DONE--

9. a Generate Models & Migrations
   Add models, migs ---DONE---
   and attributes ---DONE---
   user:
   npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string
   team:
   npx sequelize-cli model:generate --name team --attributes name:string,country:string,titles:integer
   player:
   npx sequelize-cli model:generate --name player --attributes name:string,age:integer
   user ---DONE---
   team ---DONE---
   players ---DONE---
   b Connect to database -->
   create postgreSQL instance in ElephantSQL https://customer.elephantsql.com/instance/create

   ***

   Modify the corresponding object and set your own PostgreSQl credentials: {dialect}://{username}:{password}@{host_url}:{PORT}/{db_name}
   Go to postico and if you put that url in host in Postico "node" it fills all details (password, etc.)
   c. add relations
   user
   team
   player

   ***

GGPUSH

10. Connect sequelize to postgres: npx sequelize-cli db:migrate ---DONE--
    you should get "Loaded config file.." etc in terminal 10. Set postgreSQL credentials to development object in config.json
    "development": {
    "url": "postgres://sialuzfd:hVxgAW_Yvvk4O32dvzqjqIM7b1rjVEo3@balarama.db.elephantsql.com:5432/sialuzfd", 11. change in models/index.js "sequelize = new....." to "sequelize = new Sequelize(config.url, config)"
    // \*\*\_DATABASE IS NOW SET UP\*\*\* 12. Run "npx sequelize-cli db:migrate" and look in postico that tables are there 13. Generate Seed files (for every model 1 seed file)
    npx sequelize-cli seed:generate --name some-users 14. Add test data, initial set of data is provided to a database, so for user.js use for example:

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert(
"users",
[
{
name: "Leo Messi",
email: "leo@messi.com",
phone: 1234567,
password: "test",
createdAt: new Date(),
updatedAt: new Date(),
},
{
name: "Dan Abramov",
email: "dan@redux.com",
phone: 1234567,
password: "test",
createdAt: new Date(),
updatedAt: new Date(),
},
],
{}
);
},

15. Run the seeds
    npx sequelize-cli db:seed:all

// To un-do the seed we can use

$ npx sequelize-cli db:seed:undo:all
// We can also point to a specific seed file to run instead of "all" using the --seed flag

$ npx sequelize-cli db:seed --seed 20191211110453-some-users
$ npx sequelize-cli db:seed:undo --seed 20191211110453-some-users.js (.js at the end of the file required to be able to run)

GGPUSH

16. Let's set up a simple endpoint to get our data out of the server. We must install express as a dependency and set up one route. Run npm install express and create an index.js file in the root of your project
17. Now try it out! Run node index.js and you can use httpie or your browser to test this endpoint.
    // --------------------------------------

// B. RELATIONS.md (Karla)

Why add relations ?
Avoid repetition
Separations of concerns
Security
Get only relevant data
Types of relation
One to One:

citizen hasOne BSN
BSN belongsTo citizen
citzen <-> BSN person <-> ID user <-> token per Session

One to Many:

person hasMany toothbrushes
toothbrushed belongsTo person
person <-> underwear person <-> email person <-> computers person <-> glasses biological mother <-> kids author <-> books

Many to Many:

student hasMany classes
classes hasMany students
students <-> classes person <-> siblings customer <-> products worker <-> project

Steps to add relation
Step 0: Undo all your migrations and add the Foreign key to the seeds

npx sequelize-cli db:migrate:undo:all

Step 1: Generate a new file to add the relation

npx sequelize-cli migration:generate --name set-up-relations

Step 2: Modify that file to describe the relation

"use strict";

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.addColumn("todoLists", "userId", {
type: Sequelize.INTEGER,
references: {
model: "users",
key: "id",
},
onUpdate: "CASCADE",
onDelete: "SET NULL",
});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.removeColumn("todoLists", "userId");
},
};
Step 3: Migrate and check Postico/DBeaver

npx sequelize-cli db:migrate

Step 4: Write the relations in the models

Step 5: Write queries to test

---

--> BACK TO OUR STEP PLAN, MOVE ON WITH RELATIONS

Week-3/day-2/Database-project-2

18a. Undo all your migrations and add the Foreign key to the seeds
$ npx sequelize-cli db:migrate:undo:all

18b. Generate a new file to add the relation:
$ npx sequelize-cli migration:generate --name set-up-relations
18c. Generate new migration for relation 19. Add relations to files, example
Add hasMany() relation to user.js:
static associate(models) {
user.hasMany(models.todoList);
}; 20. Now onto the todoList model. Here we have to do a very similar change but using belongsTo() instead of hasMany(), this way:
static associate(models) {
todoList.belongsTo(models.user);
}; 21. Add new colums to migration for relations by passing info to "addColumns"

---

"use strict";

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.addColumn("todoLists", "userId", {
type: Sequelize.INTEGER,
references: {
model: "users",
key: "id",
},
onUpdate: "CASCADE",
onDelete: "SET NULL",
});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.removeColumn("todoLists", "userId");
},
};

---

22. undo migrate file
    $ npx sequelize-cli db:migrate:undo:all
    23.run migrate file to add tables"
    $ npx sequelize-cli db:migrate
23. Run the seeds:
    $ npx sequelize-cli db:seed:all

    "start": "node server.js"
