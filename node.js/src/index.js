let http = require('http');
let tasksModule = require('./task-module');
let url = require('url');

function handleGet(request, response) {
    let path = url.parse(request.url).pathname;
    if (path === "/tasks") {
        let user = url.parse(request.url, true).query.user;

        let callback = function (groups) {
            let body = JSON.stringify(groups);
            response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'http://localhost:3000' });
            response.write(body);
            response.end();
        }
        let groups;
        if (user) {
            groups = tasksModule.getTaskGroupsByUser(user, callback);
        } else {
            groups = tasksModule.getTaskGroups(callback);
        }
    }
    else {
        response.statusCode = 404;
        response.write("Not Found")
        response.end();
    }
}
function handlePost(request, response) {
    if (request.url === "/tasks") {

        let body = "";
        request.on("data", function (chunk) {
            body += chunk;
        }).on("end", function () {
            let groups = JSON.parse(body);
            tasksModule.saveTaskGroups(groups, function(){
                response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin':'http://localhost:3000'})
                response.write("ok");
                response.end();
            });
        })
    } else {
        response.statusCode = 404;
        response.write("Not Found")

    }
}

let server = http.createServer(function (request, response) {

    console.log("Request: " + request.url);

    request.method
    switch (request.method) {
        case "GET":
            handleGet(request, response);
            break;
        case "POST":
            handlePost(request, response);
            break;
        default:
            response.statusCode = 403;
            response.write('Not Implemented')
            break;
    }


});

server.listen(5000);

server.on("listening", function () {
    console.log("Server Started...")
})