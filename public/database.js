const config =  require('./dbConfig.json');
const url = "mongodb+srv://cs260:cs260password@cluster0.vo2ocsb.mongodb.net"

const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});