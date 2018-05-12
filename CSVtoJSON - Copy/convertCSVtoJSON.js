const fs = require('fs');
const path = require('path');

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./customer-data.csv')
})

let i = 0;
let dataArr = [];
let proArr = [];
let leng;

lineReader.on('line', (line) => {
  if (i === 0) {
    proArr = line.split(',');
    ({ length: leng } = proArr);
  }

  if (i > 0) {
    let valArr = line.split(',');
    dataArr[i - 1] = {};

    for (let j = 0; j < leng; j += 1) {
      dataArr[i - 1][proArr[j]] = valArr[j];
    }
  }

  i += 1;
});

lineReader.on('close', () => {
  dataArr = JSON.stringify(dataArr);
  fs.writeFileSync(path.join(__dirname, 'customer-data.json'), dataArr);
})