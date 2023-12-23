const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const path = require('path');
const db = require('./db');
const { clear, error } = require('console');
const collection = 'Users';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getUsersInfo', async (req, res) => {
    const dataList = await db.getDB().collection(collection).find({}).toArray();
    res.json(dataList);
});

app.post('/', async (req, res) => {
    const userInput = req.body;
    const result = await db.getDB().collection(collection).insertOne(userInput);
    res.json({result: result, document: result[0]});
    console.log(result.insertedId);
});

async function getUsers () {
    const dataList = await db.getDB().collection(collection).find({}).toArray();
    return dataList;
}


app.put('/:id', async (req, res) => {
    const docId = req.params.id;
    const userInput = req.body;

    const result = await db.getDB().collection(collection).findOneAndUpdate(
        {
             _id: db.convertKey(docId)
        }, 
        { 
            $set: 
            {  
                DisplayName: userInput.DisplayName,
                Notes: userInput.Notes,
                ShAccount: userInput.ShAccount,
                SysUserName: userInput.SysUserName,
                TwAccount: userInput.TwAccount,
                Active: userInput.Active
            }
        },
        {
            returnOriginal : true
        }
    );

    res.json(result);
});

db.connect((callback) => {
    if(callback){
        console.log(`error!`);
        process.exit(1);
    }else{
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
});
