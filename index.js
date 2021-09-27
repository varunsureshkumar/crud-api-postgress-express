// The entry point for our server
// Initializations
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const db = require('./queries');
const stringify = require('json-stringify-safe');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
/* Tell a route to look for a GET request on the
root (/) URL, and return some JSON. */
app.get('/', (request, response) => {
  response.json({ info: 'CRUD, Express, and Postgres API' });
});

// CRUD Bot with Slack Channel
const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-2375497193185-2392166787239-uXjFJCS6L5DRwSHH0cDtWh8q',
  name: 'Crudbot',
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:',
  };

  bot.postMessageToChannel(
    'general',
    'Be crude With @CRUD-bot! :)',
    params,
  );
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }
  handleMessage(data.text);
});

// Response to Data
function handleMessage(message) {
  console.log('Here 1');
  if (message.includes(' C')) {
    create_CRUD();
  } else if (message.includes(' R')) {
    console.log('Here 2');
    read_CRUD();
  } else if (message.includes(' U')) {
    // update_CRUD();
  } else if (message.includes(' D')) {
    // delete_CRUD();
  } else if (message.includes(' help')) {
    runHelp();
  }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:',
  };

  bot.postMessageToChannel(
    'general',
    'Type @CRUD-bot C or R or U or D or help',
    params,
  );
}

// Read Operations to read from Postgres DB
function read_CRUD() {
  const params = {
    icon_emoji: ':+1:',
  };
    // app.get('/users', db.getUsers)
  console.log('Here 3');
  bot.postMessageToChannel(
    'general',
    'List of users: ',
    params,
  );
  bot.postMessageToChannel(
    'general',
    stringify(app.get('/users', db.getUsers)),
    params,
  );
  console.log('Here 4 finished get');
}

// Post Operations to write to Postgres DB
function create_CRUD() {
  const params = {
    icon_emoji: ':wave:',
  };
    // app.get('/users', db.getUsers)
  console.log('Here 5');
  bot.postMessageToChannel(
    'general',
    'inserted into Postgres DB',
    params,
  );
  app.post('/users', db.createUser);
  console.log('Here 6 finished post');
}

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

// Now set the app to listen on the port.
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
