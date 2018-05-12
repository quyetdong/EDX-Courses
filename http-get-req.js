const http = require('http');

const url = 'http://noodeprogram.com';

http.get(url, (res) => {
  let buff = '';
  res.on('data', (chunk) => {
    buff += chunk;
  } )

  res.on('end', () => {
    console.log(buff);
  })
  res.on('error', (err) => {
    console.error('second error', err);
  })
}).on('error', (error) => {
  console.error(`Got error: ${error.message}`);
})