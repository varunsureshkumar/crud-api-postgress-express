// The entry point for our server
// Initializations
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./queries')
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
/* Tell a route to look for a GET request on the 
root (/) URL, and return some JSON. */
app.get('/', (request, response) => {
    response.json({ info: 'CRUD, Express, and Postgres API' })
  })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Now set the app to listen on the port.
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
