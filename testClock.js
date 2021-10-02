/* eslint-disable no-console */

const { CronJob } = require('cron');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

const selectQuery = function () {
  try {
    // eslint-disable-next-line no-shadow
    const selectQuery = 'SELECT * FROM users ORDER BY id ASC';
    console.log('select 1:', selectQuery);

    const { rows } = pool.query(selectQuery, []);
    console.log('select 2:', rows);

    const result = JSON.stringify(rows);
    console.log('select 3:', result);

    return result;
  } catch (error) {
    return error.routine;
  }
};

// setInterval(selectQuery, 5000);

new CronJob({
  cronTime: '15 * * * * *', // 15 seconds after every minute
  onTick: selectQuery,
  start: true,
  timeZone: 'America/New_York',
});
