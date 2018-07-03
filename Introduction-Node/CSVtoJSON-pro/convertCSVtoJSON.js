const fs = require('fs');
const path = require('path');

const convertToJson = (source = 'customer-data.csv') => {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(source)
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
      let obj = {};

      for (let j = 0; j < leng; j += 1) {
        obj[proArr[j]] = valArr[j];
      }
      dataArr.push(obj);
    }

    i += 1;
  });

  lineReader.on('close', () => {
    let json = JSON.stringify(dataArr, null, 2);
    fs.writeFile(path.join(__dirname, 'customer-data.json'), json, 'utf8', function(err) {
      if(err) return console.log('Got error: ', err.message);
      console.log('Data has been written to the file!')
    });
  })
}

convertToJson(process.argv[2]);