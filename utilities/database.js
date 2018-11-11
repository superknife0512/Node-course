const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const fetchDatabase = cb => {
    MongoClient.connect('mongodb+srv://superknife0512:Toan1234@node-app-oqduu.gcp.mongodb.net/shop?retryWrites=true').then(client => {
        console.log('connected!');
        _db = client.db();
        cb();
    }).catch(err => {
        console.log(err);
        throw err;
    })
}

const getDatabase = () => {
    if (_db) {
        return _db;
    }
    throw 'no database found'
}

module.exports = {
    fetchDatabase,
    getDatabase
};