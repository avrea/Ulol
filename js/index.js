

var myApp = angular.module('myApp',[]);

myApp.controller('todoCtrl', ['$scope', function($scope) {
  // Initialize the todo list array
    //if local storage is null save the todolist to local storage
    if (localStorage.getItem("mytodos") == null)
    {
 		$scope.todoList = [ {todoText:'Create app', done:false} ];
       localStorage.setItem("mytodos", angular.toJson($scope.todoList));

    }else
    {
        //set the todolist from local storage
        $scope.todoList = angular.fromJson(localStorage.getItem("mytodos"));
    }



// Add an item function
    $scope.todoAdd = function() {
      //check to see if text has been entered, if not exit
        if ($scope.todoInput == null || $scope.todoInput == ''){return;}

        //if there is text add it to the array
        $scope.todoList.push({todoText:$scope.todoInput, done:false});

        //clear the textbox
        $scope.todoInput = "";

        //resave the list to localstorage
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));

    };

    $scope.remove = function() {
      //copy list
        var oldList = $scope.todoList;
        //clear list
        $scope.todoList = [];
        //cycle through list
        angular.forEach(oldList, function(x) {
          //add any non-done items to todo list
            if (!x.done) $scope.todoList.push(x);
        });
        //update local storage
         localStorage.setItem("mytodos", angular.toJson($scope.todoList));

    };

    //The Update function
    //This waits 100ms to store the data in local storage
    $scope.update = function() {
    //update local storage 100 ms after the checkbox is clicked to allow it to process
    setTimeout(function(){
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));
    },100)


    }

}]);