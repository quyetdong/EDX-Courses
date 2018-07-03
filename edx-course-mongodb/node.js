import mongodb from 'mongodb';

const insertDocuments = (db, callback) => {
  // Get reference to edx-course-docs collection
  const collection = db.collection('edx-course-students')
  // Insert 3 documents
  collection.insert([
    { name : 'Bob', grade: 'A' }, { name : 'John' }, { name : 'Peter' } // 3 documents
  ], (error, result) => {
    if (error) return process.exit(1)
    console.log(result.result.n) // will be 3
    console.log(result.ops.length) // will be 3
    console.log('Inserted 3 documents into the edx-course-students collection')
    callback(result)
  })
}

const findDocuments = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('edx-course-students')
  // Find some documents
  collection.find({}).toArray((error, docs) => {
    if (error) return process.exit(1)
    console.log(2, docs.length) // will be 2 because we removed one document
    console.log(`Found the following documents:`)
    console.dir(docs)
    callback(docs)
  })
}

const MongoClient = mongodb.MongoClient;
const Server = mongodb.Server;
// Connect to URL
const mongoClient = new MongoClient(new Server('localhost', 27017));

// Use connect method to connect to the DB server
mongoClient.connect((error, client) => {
  if (error) return process.exit(1);

  const dbName = 'edx-course-db';
  const db = client.db(dbName);
  console.log('Connection is okay');

  insertDocuments(db, () => {
    findDocuments(db, () => {
      client.close()
    })
  })
})
