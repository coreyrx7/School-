let mongo = require('mongodb');
let fs = require('fs');

let url = "mongodb://localhost:27017/organizer"

mongo.MongoClient.connect(url, function (error, db) {
    if (error)
        throw error;

    console.log('DB initialization started...')

    let content = fs.readFileSync("./data/tasks.json");
    let groups = JSON.parse(content);

    db.collection("taskGroups").insertMany(groups, function (error, result) {
        console.log('DB initialization finished.');
    
        db.close();
    });

});