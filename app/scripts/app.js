(function() {
  'use strict';
  angular.module('app', [
      'ngRoute',
      'ngAnimate',
      'ui.bootstrap',
      'easypiechart',
      'textAngular',
      'ui.tree',
      'ngMap',
      'ngTagsInput',
      'app.controllers',
      'app.directives',
      'app.localization',
      'app.nav',
      'app.ui.ctrls',
      'app.ui.directives',
      'app.ui.services',
      'app.ui.map',
      'app.form.validation',
      'app.ui.form.ctrls',
      'app.ui.form.directives',
      'app.tables',
      'app.task',
      'app.chart.ctrls',
      'app.chart.directives',
      'app.page.ctrls',
      'firebase'
    ]).constant('FIREBASE_URL', 'https://outdoola.firebaseio.com/').config([
    '$routeProvider', function($routeProvider) {
      var routes, setRoutes;
      routes = [
        'dashboard',
        'ui/typography',
        'ui/buttons',
        'ui/icons',
        'ui/grids',
        'ui/widgets',
        'ui/components',
        'ui/timeline',
        'ui/nested-lists',
        'ui/pricing-tables',
        'ui/maps',
        'tables/static',
        'tables/dynamic',
        'tables/responsive',
        'forms/elements',
        'forms/layouts',
        'forms/validation',
        'forms/wizard',
        'forms/new-adventure',
        'charts/charts',
        'charts/flot',
        'charts/morris',
        'pages/404',
        'pages/500',
        'pages/blank',
        'pages/forgot-password',
        'pages/invoice',
        'pages/lock-screen',
        'pages/profile',
        // 'pages/signin',
        // 'pages/signup',
        'mail/compose',
        'mail/inbox',
        'mail/single',
        'tasks/tasks',
        'adventures',
        'adventures/new',
        'manage-adventure',
        'pages/landing-page',
        'pages/about',
        'pages/contact'
      ];
      setRoutes = function(route) {
        var config, url;
        url = '/' + route;
        config = {
          templateUrl: 'views/' + route + '.html'
        };
        $routeProvider.when(url, config);
        return $routeProvider;
      };
      routes.forEach(function(route) {
        return setRoutes(route);
      });
      return $routeProvider.when('/', {
        // templateUrl: 'views/pages/landing-page.html'
        redirectTo: 'pages/landing-page'
        // redirectTo: '/pages/blank'
      }).when('/login', {
        templateUrl: '/views/pages/signin.html',
        controller: 'LoginCtrl'
      }).when('/signup', {
        templateUrl: '/views/pages/signup.html',
        controller: 'LoginCtrl'
      }).when('/404', {
        templateUrl: 'views/pages/404.html'
      }).otherwise({
        redirectTo: '/404'
      });
    }
  ]);

}).call(this);
