// Copyright (c) 2017 by Joe Linoff
// License: MIT Open Source
// Project: https://github.com/jlinoff/aspa-nows

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
        .when('/fileio', { // Note that the href is "#!/fileio"
            // This is not a real file when no web-server is present.
            templateUrl : 'templates/fileio.html',
            controller  : 'fileioCtrl'
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
            // This is not a real file when no web-server is present.
            // Tell them that the page is not valid.
            templateUrl : 'templates/x404.html',
            controller  : 'x404Ctrl'
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
    var now = dts.toString();
    $scope.message = "<p>It's about time <b><code>" + now + '</code></b>.</p><p>Version: 0.0.3</p>';
    $scope.message += '<p>Project: <a href="https://github.com/jlinoff/aspa-nows">https://github.com/jlinoff/aspa-nows</a></p>';
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

myApp.controller('fileioCtrl', ['$scope', '$document', function($scope, $document) {
    // Function to clear the textarea element and the data.
    $scope.clear = function(evt) {
        var obj = $document[0].getElementById('fileio_content');
        obj.value = '';

        var obj1 = $document[0].getElementById('fileio_message');
        obj1.innerHTML = '';
    };

    // Write sample text to the text area to download tests.
    $scope.lorem = function(evt) {
        $scope.clear();
        var obj = $document[0].getElementById('fileio_content');
        obj.value = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
`;
    };

    // Function to upload a file from the local disk using
    // a file selection dialogue from the browser.
    $scope.upload = function(evt) {
        var files = evt.target.files;
        var f = files[0];
        // console.log('filename: ' + escape(f.name));
        // console.log('size    : ' + f.size);
        // console.log('date    : ' + f.lastModifiedDate.toLocaleDateString());
        var reader = new FileReader();
        reader.onload = (function(arg) {
            return function(e) {
                // This is the actual content!
                // Yay! We can read local files.
                //console.log(e.target.result);
                var obj = $document[0].getElementById('fileio_content');
                obj.value = e.target.result;
                var obj1 = $document[0].getElementById('fileio_message');
                obj1.innerHTML =
                    '<pre>' +
                    'uploaded file<br />' +
                    '   name: ' + f.name + '<br />' +
                    '   size: ' + f.size + '<br />' +
                    '   date: ' + f.lastModifiedDate.toLocaleDateString() +
                    '</pre>'
                    ;
            }
        })(f);

        try {
            reader.readAsText(f);
        } catch(err) {
            $scope.clear();
        }
    };

    // Function to download the content in the textarea.
    // It cannot control whether a file save dialogue
    // pops up. That is under the control of the browser.
    $scope.download = function(evt) {
        var path = $document[0].getElementById('fileio_download').value;
        var content = $document[0].getElementById('fileio_content').value;
        var pom = $document[0].createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        pom.setAttribute('download', path);
        pom.style.display = 'none';
        $document[0].body.appendChild(pom);
        pom.click();
        $document[0].body.removeChild(pom);
        
        var obj1 = $document[0].getElementById('fileio_message');
        var now = Date().toString();
        obj1.innerHTML =
            '<pre>' +
            'downloaded file<br />' +
            '   name: ' + path + '<br />' +
            '   size: ' + content.length + '<br />' +
            '   date: ' + now +
            '</pre>'
        ;
    };

    // Show more help.
    $scope.show_more = function() {
        var more = $document[0].getElementById('fileio_more');
        var less = $document[0].getElementById('fileio_less');
        more.style.display = 'inline';
        less.style.display = 'none';
    }

    // Show less help.
    $scope.show_less = function() {
        var more = $document[0].getElementById('fileio_more');
        var less = $document[0].getElementById('fileio_less');
        more.style.display = 'none';
        less.style.display = 'inline';
    }

    var obj = $document[0].getElementById('fileio_upload');
    obj.addEventListener('change', $scope.upload, false);

    var obj1 = $document[0].getElementById('fileio_clear');
    obj1.addEventListener('click', $scope.clear, false);

    var obj2 = $document[0].getElementById('fileio_download_button');
    obj2.addEventListener('click', $scope.download, false);

    var obj3 = $document[0].getElementById('fileio_lorem');
    obj3.addEventListener('click', $scope.lorem, false);

    var obj4 = $document[0].getElementById('fileio_more_button');
    obj4.addEventListener('click', $scope.show_more, false);

    var obj5 = $document[0].getElementById('fileio_less_button');
    obj5.addEventListener('click', $scope.show_less, false);
}]);

myApp.controller('x404Ctrl', function($scope) {
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
