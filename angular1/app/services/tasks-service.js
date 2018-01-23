var app = angular.module('myOrganizer');
app.service('taskService', function ($http, $timeout) {

    this.columns = [];

    this.getColumns = function () {
       let promise = $http.get("data/tasks.json").then(function (response) {
           this.columns = response.data;
          return $timeout(function () {
               return response.data;
           }, 5000);
            return response.data;
        }, function (error){
            alert('Error');
        });
        return promise
    }
this.getColumn = function (columnId) {
    for (let i = 0; i < this.columns.length; i++) {
        let column = $scope.columns[i];
        if (column.id === columnId) {
            return column;
        }
    }
}

this.getTask = function (columnId, taskId) {
    let column = getColumn(columnId)
    for (let j = 0; j < this.column.tasks.length; j++) {
        let task = column.tasks[j];
        if (task.id === taskId) {
            return task;
        }
    }
}
this.getMaxTaskId = function (columnId) {
    let column = getColumn(columnId);
    let max = column.tasks[0].id;
    for (let i = 1; i < this.column.tasks.length; i++) {
        let task = column.tasks[i];
        if (task.id > max)
            max = task.id;
    }
    return max;
}
});