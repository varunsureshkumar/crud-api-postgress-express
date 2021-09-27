const axios = require('axios');

/* axios.get('http://webcode.me').then((resp) => {
  console.log(resp.data);
}); */

async function makeGetRequest_1() {
  const res = await axios.get('http://webcode.me');

  const { data } = res;
  console.log('Function 1');
  console.log(data);
}

async function makeRequest_2() {
  const config = {
    method: 'get',
    url: 'http://webcode.me',
  };

  const res = await axios(config);

  console.log('Function 2');
  console.log(res.status);
}

async function makeHeadRequest_3() {
  const res = await axios.head('http://webcode.me');

  console.log('Function 3');
  console.log(`Status: ${res.status}`);
  console.log(`Server: ${res.headers.server}`);
  console.log(`Date: ${res.headers.date}`);
}

async function makeRequest_4() {
  const config = {
    method: 'head',
    url: 'http://webcode.me',
  };

  const res = await axios(config);

  console.log('Function 4');
  console.log(res.status);
}

async function makeRequest_5() {
  const config = {
    method: 'get',
    url: 'http://webcode.me',
    headers: { 'User-Agent': 'Axios - console app' },
  };

  console.log('Function 5');
  const res = await axios(config);

  console.log(res.request._header);
}
/* 
async function getNumberOfFollowers() {
  const res = await axios.get('https://github.com/users/ravishan16');

  const nOfFollowers = res.data.followers;
  const { nOfFollowing } = res.data.following;

  console.log(`# of followers: ${nOfFollowers}`);
  console.log(`# of following:: ${nOfFollowing}`);
}

getNumberOfFollowers(); */

makeGetRequest_1();
makeRequest_2();
makeHeadRequest_3();
makeRequest_4();
makeRequest_5();
