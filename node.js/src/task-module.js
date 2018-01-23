let mongo = require('mongodb');
let url = "mongodb://localhost:27017/organizer"

module.exports = {
    getTaskGroups: function (callback) {

        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;
            db.collection("taskGroups").find({}).toArray(function (error, groups) {
                for (let i = 0; i < groups.length; i++) {
                    let group = groups[i];
                    group._id = undefined;
                }
                console.log(groups);
                db.close();
                callback(groups);
            })
        });
    },

    saveTaskGroups: function (groups, callback) {
        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;

            let groupsUpdated = 0;
            let length = groups.length; 

            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];


                db.collection("taskGroups").updateOne({ id: group.id }), group, function (error, result) {
                    
                    if (error)
                    throw error;

                    db.close();
                    callback();
                    
                    groupsUpdated++;

                   

                    if (groupsUpdated === length) {
                        
                        db.close();
                        callback();
                    }
                }
            }
        });
    },

    getTaskGroupsByUser: function (userName) {
        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;
            db.collection("taskGroups").find({ user: userName }).toArray(function (error, groups) {
                for (let i = 0; i < groups.length; i++) {
                    let group = groups[i];
                    group._id = undefined;
                }
                console.log(groups);
                db.close();
                callback(groups);
            })
        });
    }
}