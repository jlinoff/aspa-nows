# aspa-nows
Angularjs 1.6.3 single page application (SPA) that demonstrates routing with no web-server (file://).

The repository name derives from *A*ngular *S*ingle *Page* *A*pplication with *NO* *W*eb-*S*erver.

This code shows how to create a single page application (SPA) using angular.js v1.6.3 routing in a
single page application without a server. 

I created it because I could not find an example that worked. All of the examples were great if you had
a webserver (`http://`) but they failed if you tried to access them using `file://`.

Everything works the same as the standard demos except that you need to use `!` in the hrefs and you
need to put the HTML templates ($routeProvider templateUrl references) in the `index.html` file
to avoid Cross Origin Resource String (CORS) errors.

To try it out do this:

```bash
$ git clone https://github.com/jlinoff/aspa-nows.git
$ cd aspa-nows
$ firefox file://$(pwd)
```

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
