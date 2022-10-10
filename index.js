/*
Course Code:    COMP3123
Lab Exercise:   5
Student Name:   Julien Widmer
Student ID:     101320111
*/
const express = require('express');
const fs = require("fs");

const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(`${__dirname}/home.html`);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile(`${__dirname}/user.json`, "utf8", (err, data) => {
    if (err) {
      console.log(`An error occurred while reading data from user.json: ${err}`);
      res.send();
    } else {
      res.send(JSON.parse(data));
    }
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
// http://localhost:8081/login?username=admin&password=1234
router.get('/login', (req,res) => {
  // Retriever values from query parameters
  const username = req.query.username;
  const password = req.query.password;

  // Define responses
  const success = {
    status: true,
    message: "User Is valid"
  }

  const usernameError = {
    status: false,
    message: "User Name is invalid"
  }

  const passwordError = {
    status: false,
    message: "Password is invalid"
  }

  // Retrieve user info from JSON file
  const jsonString = fs.readFileSync(`${__dirname}/user.json`, "utf8");
  const user = JSON.parse(jsonString);

  // Username is invalid
  if (username !== user.username) { res.send(usernameError); }

  // Password is invalid
  if (password !== user.password) { res.send(passwordError); }

  // Success
  res.send(success);
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// http://localhost:8081/logout/admin
router.get('/logout/:user', (req,res) => {
  res.send(`<b>${req.params.user} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));