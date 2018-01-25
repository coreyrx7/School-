var fs = require('fs');
var file_path = "data/tasks.json"

module.exports = {
    getTaskGroups: function (callback) {

       fs.readFile(file_path, function(error, content)
{
    if (error)
    throw error;
    let tasks = JSON.parse(content);
    callback(tasks);
})
    },

    saveTaskGroups: function (groups, callback) {
        fs.writeFile(file_path, function(error){
            if (error)
            throw error;
            callback(tasks);
        })
    },

    getTaskGroupsByUser: function (userName) {
        getTaskGroups(callback);
    }
}
