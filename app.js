// Copyright (c) 2017 by Joe Linoff
// License: MIT Open Source

// This app demonstrates how to create a single page application using
// anulgarjs 1.6.3 routing without a webserver.
var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);

// This controller manages the navigation bar logic.
myApp.controller('navCtrl', ['$scope', function($scope) {
    // Keep track of the last active navigation tab.
    $scope.m_active = null;

    // Activate the selected navigation tab.
    $scope.activate = function(event) {
        // Get the id of the one that the user clicked on.
        // This can duplicate work if the user clicks on the
        // same tab multiple times but this is fast enough
        // that we don't care about that.
        let id = event.target.id;
        if ($scope.m_active != null) {
            $scope.m_active.classList.remove('navtab-active');
            $scope.m_active.classList.add('navtab-inactive');
            $scope.m_active = document.getElementById(id);
        }
        $scope.m_active = event.target;
        $scope.m_active.classList.remove('navtab-inactive');
        $scope.m_active.classList.add('navtab-active');
    };
}]);

// Define the router.
myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            // This is not a real file when no web-server is present.
            templateUrl : 'templates/welcome.html',
            controller  : 'welcomeCtrl'
        })
        .when('/home', { // Note that the href is "#!/home"
            // This is not a real file when no web-server is present.
            templateUrl : 'templates/home.html',
            controller  : 'homeCtrl'
        })
        .when('/about', { // Note that the href is "#!/about"
            // This is not a real file when no web-server is present.
            templateUrl : 'templates/about.html',
            controller  : 'aboutCtrl'
        })
        .when('/contact', { // Note that the href is "#!/contact"
            // This is not a real file when no web-server is present.
            templateUrl : 'templates/contact.html',
            controller  : 'contactCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

myApp.controller('welcomeCtrl', function($scope) {
    var navItems = document.getElementsByClassName('navtab-active');
    for (let i=0; i<navItems.length; i++) {
        let elem = navItems[i];
        elem.classList.remove('navtab-active');
        elem.classList.add('navtab-inactive');
    }
    $scope.url = window.location.href;
    if ($scope.url.endsWith('#!/')) {
        $scope.url = $scope.url.slice(0, $scope.url.length - 3);
    }
});

myApp.controller('homeCtrl', function($scope) {
    $scope.message = 'Oh, give me a home where the javascript roams...';
});

myApp.controller('aboutCtrl', function($scope) {
    // Note: to inject HTML, you must have the $sanitize service
    // avalable.
    var dts = Date();
    $scope.message = `<p>
It's about time <b><code>" + dts.toString() + "</code></b>.
</p>
<p>
Version: 0.0.1
</p>
`;
});

myApp.controller('contactCtrl', function($scope) {
    // Note: to inject HTML, you must have the $sanitize service
    // avalable.
    $scope.message = `<pre>
    Overlord : Big Bob
    Company  : Example, Inc.
    Phone    : 901-555-1212
    Address  : Mister.
    Email    : <a href="mailto:bigbob@example.com">bigbob@example.com</a>
    Website  : <a href="https://example.com">https://example.com</a>
</pre>`;
});
