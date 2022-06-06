# WAAD-ICA2

Prague College Polls is a website for creating and answering questions. Hosted at: https://waad-polls.herokuapp.com/

Technologies used:
  - [Vue.js](https://vuejs.org/) for frontend 
  - [Bulma](https://bulma.io/) for CSS styling
  - [Express](https://expressjs.com/) for backend
  
## Installation 
1. Following environmental variables have to be configured for database credentials:
```
dbhost - Database host
dbuser - Database user
dbpass - Database password
db     - Database
```
2. Initialise the database using schema.sql

3. Run the application:
```
cd frontend
npm install
npm run build
cd ../backend
npm install
npm run start
```
