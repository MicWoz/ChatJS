'use strict';

angular.module('myApp', [
  'ngCookies',
  'ngRoute',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngSanitize'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/login',
      controller: 'loginCtrl'
    }).
    when('/main', {
      templateUrl: 'partials/main'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});