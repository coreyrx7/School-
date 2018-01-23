var app = angular.module('myOrganizer');

app.controller('mainController', function ($scope, taskService, $interval) {
    $scope.loaded = false;
    
    taskService.getColumns().then(function(response){
        $scope.columns = response;
        $scope.loaded = true;
    })

    $scope.columns = taskService.getColumns();
    $scope.currentDate = getCurrentDate();

function getCurrentDate(){
    let date = new Date();
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
$interval(function(){
    $scope.currentDate = getCurrentDate();
}, 1000);
    

    $scope.deleteClick = function (columnId, taskId) {
        var column = getColumn(columnId)
        //find task index
        for (let j = 0; j < column.tasks.length; j++) {
            let task = column.tasks[j];
            if (task.id === taskId) {
                column.tasks.splice(j, 1);
            }
        }

    }

    $scope.editClick = function (columnId, taskId) {
        let task = taskService.getTask(columnId, taskId);
        task.edit = true;
        task.original = { title: task.title, description: task.description }
    }
    $scope.saveClick = function (columnId, taskId) {
        let task = taskService.getTask(columnId, taskId);
        task.edit = false;
    }
    $scope.cancelClick = function (columnId, taskId) {
        let task = taskService.getTask(columnId, taskId);
        task.title = task.original.title;
        task.description = task.original.description;
        task.edit = false;
    }

   
    $scope.addClick = function (columnId) {
        let column = getColumn(columnId)
        let id = getMaxTaskId(columnId) + 1;
        column.tasks.push({ id: id, title: "", description: "", edit: true });


    }
});
