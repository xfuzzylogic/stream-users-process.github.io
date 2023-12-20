const { mongoClient, MongoClient, ObjectId } = require('mongodb');
const dbName = 'dbStream';
const uri = 'mongodb+srv://xfuzzylogicstream:WsYaqJf5Z0qSKSb9@dbstream.8t85app.mongodb.net/?retryWrites=true&w=majority';

const mongoOptions = { useNewUrlParser : true };

const state = {
    db: null
};

const connect = async (callback) => {
    if(state.db){
        callback();
    }
    else{   
        const client = new MongoClient(uri);
        await client.connect();

        state.db = client.db(dbName);
        callback();
    }
}

const getDB = () => {
    return state.db;
}

const convertKey = (_id) => {
    return new ObjectId(_id);
}  

module.exports = {connect, getDB, convertKey};
