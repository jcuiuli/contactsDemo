var app = angular.module('ContactsExample', [

     "ngTouch"
    ,"ngAnimate"
    ,"pasvaz.bindonce"
    ,"mobile-angular-ui.scrollable"
]);

app.controller('MainController', function($rootScope, $scope, $timeout, $window, $log, $q){

  $rootScope.loading = true; 
  $scope.contacts = [];
  $scope.cordovaIsReady = false;
  $scope.isCordova = $window.location.href.match(/isCordova/) ? true : false; 
  $scope.isNative  = $window.location.href.match(/isNative/) ? true : false; 
  $scope.isBrowser = (!$scope.isCordova) && (!$scope.isNative);
  $scope.loadTime = 0;
  $scope.rawContacts = [];


  $timeout(function() {
    //alert('isCordova : ' + $scope.isCordova);
    //alert('isCordova loaded : ' + $window.cordova);
    if ($scope.isCordova) {
        //injectCordovaScriptAndroid(); // TODO move to the front of the app.
        document.addEventListener('deviceready', function() {
            $scope.cordovaIsReady = true;
              //alert('cordovaIsReady : ' + $scope.cordovaIsReady);
              //var now = $window.performance.now();
            var start = new Date().getTime();
            var end;
            findContacts(function(error, contacts) {

              //$scope.loadTime = $window.performance.now() - now;
              end = new Date().getTime();
              $scope.loadTime = end - start;

              //alert('done');
                if (error) {
                    //alert('ERROR : findContacts');
                    alert(error);
                }
                else {
                    //alert('SUCCESS : findContacts');
                    $scope.$apply(function() {

                        if (!Array.isArray(contacts)) {return}

                        $scope.rawContacts = contacts;
                        $scope.contacts = contacts.filter(function(item) {
                          // dont include contacts that have no name or phone number
                          return  (
                                    (item.displayName && item.displayName.trim().length) &&
                                    (Array.isArray(item.phoneNumbers))
                                  )

                        },this);
                        //alert(JSON.stringify($scope.contacts[0]));
                        //alert($scope.contacts.length);
                    });
                }
                $scope.$apply(function() {
                    $rootScope.loading = false; 
                });
            });
        }, false);
    }
  },300);
/*
  // demo purposes only
  // probably should be done by native client.
  var injectCordovaScriptAndroid = function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = "/cordova.js"; 
      document.getElementsByTagName('head')[0].appendChild(s);
  };
*/
  var findContacts = function(cb) {

      var options = new ContactFindOptions();
      options.filter = "";          // empty search string returns all contacts
      options.multiple=true;      // return multiple results
      var filter = ["displayName", "name", "phoneNumbers", "emails", "addresses"];

      var onSuccess = function(contacts) {
          cb(null, contacts);
      };

      var onError = function(error) {
          cb(error, null);
      };

      // find contacts
      $log.debug('calling find contacts');
      navigator.contacts.find(filter, onSuccess, onError, options);        
  };
  
});