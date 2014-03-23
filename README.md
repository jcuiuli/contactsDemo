contactsDemo
============

Notes: The current demo only supports Android as there are platform specific cordova.js files needed.
Another demo might be needed once we evalute the best way to inject cordova .js code (EG via the native app)

What's involved
---------------

The files required are

* /cordova.js - this is the main bootstrap file that loads the plugins. It is platform specific.
* /cordova_plugins.js - this is the cofiguration that specifies the plugins. Cordova.js loads this
* /plugins/ - this folder is where the plugins are stored. Cordova.js loads these files

Cordva must only be loaded when embedded in a native app that supports Cordova. Errors will be thrown otherwise.
The sample app dynamically injects the required Javascript if it finds "isCordova" in the query param of the URL.
This is provided by the sample native app. The real design will probably rely on a cookie instead.

The sample web app is built using Angularjs and follows Angularjs conventions. The code can be found in /js/app.js
Per Cordova documentation, an event listener is added to the "document" object for the "deviceready" event.
Once that is loaded the cordova API is ready for use. It's recommended a timeout is added around this.

findContacts is the method that demonstrates the contacts demo. It requires a single function as a callback with an errors object and a contacts array.

