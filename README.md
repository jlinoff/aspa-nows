# aspa-nows
Angularjs 1.6.3 single page, client side only application with routing that does not need a web-server.

The repository name derives from **A**ngular **S**ingle **P**age client side only **A**pplication with **NO** **W**eb-**S**erver.

This code shows how to create a client-side single page application (SPA) using angular.js v1.6.3 routing in a
single page application without a server. 

I created it because I could not find an example that worked. All of the examples were great if you had
a webserver (`http://`) but they failed with Cross Origin Resource String (CORS) errors if you tried to access them using `file://`.

There were two key challenges to getting it working: getting the the page `href` references right because of the newly introduced default hash prefix: `!` (see [aa077e8](https://github.com/angular/angular.js/commit/aa077e81129c740041438688dff2e8d20c3d7b52) for details), and embedding the template HTML code into `index.html` as `ng-template` scripts to avoid CORS errors. Once those fixes were made, it worked as expected.

Here is the HTML code fragment that shows how to define the `href` links.

```html
<a href="#!/home"    class="navtab-inactive" ng-click="activate($event)">Home</a>
<a href="#!/about"   class="navtab-inactive" ng-click="activate($event)">About</a>
<a href="#!/contact" class="navtab-inactive" ng-click="activate($event)">Contact</a>
```

Here is the HTML code fragment that shows how to embed one of the `ng-template` HTML script templates. See `index.html` for more details.

```html
    <script type="text/ng-template" id="templates/contact.html">
      <div id="contact_page">
        <h2>Contact</h2>
        <!-- Note: to inject HTML, you must have the $sanitize service avalable. -->
        <p ng-bind-html="message"></p>
      </div>
    </script>
```

Here is the javascript code fragment that shows the `$routeProvider`. It is a standard implementation . See `apps.js` for more details.

```javascript
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
            // This is not a real file when no web-server is present.
            // Tell them that the page is not valid.
            templateUrl : 'templates/x404.html',
            controller  : 'x404Ctrl'
        });
});
```

To try it out do this:

```bash
$ git clone https://github.com/jlinoff/aspa-nows.git
$ cd aspa-nows
$ firefox file://$(pwd)
```

You can also server the pages using a web server as follows:

```bash
$ python -m SimpleHTTPServer 8000 &
$ firefox http://localhost:8000
```

Please note that this is not a good approach to use for general applications that use servers because
you cannot organize your template files. It is only useful for cases where no server is available. Perhaps
where you want to provide HTML5 based help on a USB.

There are 6 files.

| File | Description |
| ---- | ----------- |
| angular.js | 1.6.3 |
| angular-route.js | 1.6.3 |
| angular-sanitize.js | 1.6.3 |
| app.js | local implementation |
| index.html | main HTML5 page |
| navbar.css | my lame navbar CSS |

The angular files were obtained directory from the AngularJS project and are not modified.

This project has been tested successfully on the following browsers. It will definitely **not** work on old browers because it requires HTML5.

| Browser | Version |
| ------- | ------- |
| Chrome  | 56.0.2924.87 (64-bit) |
| Firefox | 52.0.2 (64-bit) |
| Safari  | 12603.1.30.0.34 |

### Welcome Page - file:///Users/jlinoff/work/aspa-nows/index.html
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cloud.githubusercontent.com/assets/2991242/24829591/ac6bdcdc-1c29-11e7-9651-c7df1a606b7f.png">

### Welcome Page - http://localhost:8000
This example shows the page with a server: `python -m SimpleHTTPServer 8000`.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cloud.githubusercontent.com/assets/2991242/24829603/c4ca7cd4-1c29-11e7-9ff1-f212204286c6.png">

### Home Page - file:///Users/jlinoff/work/aspa-nows/index.html#!/home
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cloud.githubusercontent.com/assets/2991242/24829592/b2ad1782-1c29-11e7-9376-d83346ac3046.png">

### About Page - file:///Users/jlinoff/work/aspa-nows/index.html#!/about
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cloud.githubusercontent.com/assets/2991242/24829760/d06743da-1c2c-11e7-8674-584ae5c717a9.png">

### Contact Page - file:///Users/jlinoff/work/aspa-nows/index.html#!/contact
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cloud.githubusercontent.com/assets/2991242/24829600/ba6cc7ba-1c29-11e7-9082-e70a1e3609de.png">
