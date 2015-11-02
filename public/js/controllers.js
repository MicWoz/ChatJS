'use strict';

angular.module('myApp.controllers', []).
  controller('loginCtrl', function($scope, $location, $rootScope, $cookies) {
    $scope.submit = function () {
      $location.path('/main');
      $rootScope.nick = $scope.login;
    }
  }).
  controller('main', function($scope, $location, $http, socket, $rootScope) {
    if($rootScope.nick == undefined) $location.path('/');
    $scope.messages = [];

    $scope.submit = function () {
      socket.emit('chat messages', {
        user: $rootScope.nick,
        text: $scope.msg
      });
      $scope.msg = "";
      return false;
    };
    socket.on('message', function(message){
      $scope.messages.push({
        user: message.user,
        text: message.text
      });
    });
    socket.on('ScrollUpdate', function(message){
      ScrollIt();
    });
  }).
  factory('socket', function ($rootScope) {
  var socket = io();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
function ScrollIt() {
  $('body').scrollTop($('body')[0].scrollHeight);
};
