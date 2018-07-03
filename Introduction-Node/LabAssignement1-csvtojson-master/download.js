const https = require('https')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')
const csv = require('csvtojson')

const json_file = 'https://gist.githubusercontent.com/azat-co/a3b93807d89fd5f98ba7829f0557e266/raw/43adc16c256ec52264c2d0bc0251369faf02a3e2/gistfile1.txt'
const csv_file = 'https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+1T2018+type@asset+block/customer-data.csv'

const downloadPage = function(url = csv_file) {
  console.log('downloading ', url)

  const fetchPage = function (urlF, callback) {
    https.get(urlF,function(response) {
      let buff = ''
      response.on('data', (chunk) => { 
        buff += chunk
      })
      response.on('end', () => {
        callback(null, buff)
      })
    }).on('error', (error) => {
      console.error(`Got error: ${error.message}`)
      callback(error)
    })
  }

  const folderName = uuidv1()
  fs.mkdirSync(folderName)

  fetchPage(url, function (error, data) {
    if (error) return console.log(error)

    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)  
    fs.writeFileSync(path.join(__dirname, folderName, 'csvfile.csv'), data)
//    console.log('downloading is done in folder ', folderName)
 //   console.log(data)

    const csvFilePath = path.join(__dirname, folderName, 'csvfile.csv')
    var c = 0
    csv().fromFile(csvFilePath)
    .on('json',(jsonObj)=>{
        // combine csv header row and csv line to a json object
        // jsonObj.a ==> 1 or 4
        ++c
    })
    .on('end_parsed',(jsonObjComplete)=>{

        console.log(`CSV to JSON conversion terminated on ${c} records`)
//        console.log(jsonObjComplete[0])
//        console.log(JSON.stringify(jsonObjComplete, null, 2))


        try {
            const parsedData = JSON.parse(JSON.stringify(jsonObjComplete, null, 2))
 //           console.log(parsedData)
        } catch (e) {
            console.error("This is not a JSON object")
            process.exit(1)
        }

        fs.writeFileSync(path.join(__dirname, folderName, 'customer-data.json'), JSON.stringify(jsonObjComplete, null, 2))

    })
    .on('error',(error)=>{
        console.error(`Got error: ${error.message}`)
        callback(error)
    })

  })

  
}

downloadPage(process.argv[2])

