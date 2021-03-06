
(function(){

angular
  .module("nodeCodeApp", [
    "ui.router",
    "ngMaterial",
    "ngStorage",
    "ui.tree",
    "ngTable",
    "ngSanitize",
    "angular-confirm",
    "sticky",
    "ngToast",
    "fsm",
    "angular.filter",
    "ngMessages",
    "ngFileUpload",
    "angular-loading-bar",
    "ui.bootstrap.contextMenu",
    "ui.bootstrap",
    "nodeCodeApp.Tabs",
    "nodeCodeApp.DisplayError",
    "nodeCodeApp.Admin",
    "nodeCodeApp.Login",
    "nodeCodeApp.Logout",
    "nodeCodeApp.Node",
    "nodeCodeApp.JMeter",
    "nodeCodeApp.File"
  ], function($rootScopeProvider){
	  $rootScopeProvider.digestTtl(100);
  })
  .constant('_', window._)
  .config(['$urlRouterProvider', '$stateProvider','$httpProvider',function($urlRouterProvider, $stateProvider,$httpProvider) {
	$httpProvider.interceptors.push('ErrorHandler');
	$httpProvider.interceptors.push('TokenRefreshInterceptor');
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('error', {
        url: '/error',
        templateUrl: 'scripts/error/view/error.html',
        controller: 'ErrorCtrl as vm',
        params:{
        	error:null
        },
        resolve:{
        	error: function($stateParams) {
        		console.log($stateParams.error);
        			return $stateParams.error;
				}
        }
      });
  }])
  .run(configureDefaults)
  .provider({  })
  .service(service)
  .factory('TokenRefreshInterceptor',TokenRefreshInterceptor)
  .factory('ErrorHandler',ErrorHandler)
  .decorator('$mdAria', function mdAriaDecorator($delegate) {
    $delegate.expect = angular.noop;
    $delegate.expectAsync = angular.noop;
    $delegate.expectWithText = angular.noop;
    return $delegate;
  });	

   configureDefaults.$inject = ['ngTableDefaults','$state', '$rootScope','AuthenticationService','dataBeanService','$window','$sessionStorage'];
   function configureDefaults(ngTableDefaults,$state,$rootScope,AuthenticationService,dataBeanService,$window,$sessionStorage) {
	   	$rootScope._ = window._; 
	   	ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [];
        $rootScope.isReadOnly = false; 
        
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        	  event.preventDefault();
        	  $state.get('error').error = { code: 123, description: 'Exception stack trace' };
        	  $state.get('displayError').error = { code: 123, description: 'Exception stack trace' };
        	  return $state.go('displayError');
        });
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27)
                $rootScope.$broadcast("escapePressed", e.target);
        });

        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("documentClicked", e.target);
        });
        
        var windowElement = angular.element($window);
        windowElement.on('beforeunload', function (event) {
            // do whatever you want in here before the page unloads.
            // the following line of code will prevent reload or navigating away.
            event.preventDefault();
        });
        
        $rootScope.$on("$stateChangeStart", function(event, toState){
            if (toState.authenticate){
                var resp = AuthenticationService.checkUserCredentials($sessionStorage.userId);
                if(resp === '1'){
                	$sessionStorage.showLogout = false;
                    dataBeanService.setStatetransitionHasErr('1');
                    $state.go('login', {}, {reload: true});
                    event.preventDefault();
                }
            }
          });
        
   }
   
   ErrorHandler.$inject = ['$injector','$window','$location'];
   function ErrorHandler($injector,$window,$location){
   	return {
   		'requestError': function(rejection) {
   	      if (canRecover(rejection)) {
   	        return responseOrNewPromise
   	      }
   	      return $q.reject(rejection);
   	    }
   	}
   }
   
   TokenRefreshInterceptor.$inject = ['$injector','$window','$rootScope'];
   function TokenRefreshInterceptor($injector,$window,$rootScope){
       return {
           'request': function(config) {
        	   var $sessionStorage = $injector.get('$sessionStorage');
        	   var http = $injector.get('$http');
               if ($sessionStorage.token) {
                   config.headers['X-Auth-Token'] = $sessionStorage.token;
                   http.defaults.headers.common['X-Auth-Token'] = $sessionStorage.token;
               }
               return config;
           },
           'response': function(response) {
        	   var $sessionStorage = $injector.get('$sessionStorage');
        	   var http = $injector.get('$http');
                       var data = response.headers('X-Auth-Token');
                   if(data){
                       var json = angular.fromJson(data);
                       $sessionStorage.token = json.token;
                       http.defaults.headers.common['X-Auth-Token'] = json.token;
                   }
                 return response;
            },
           'responseError': function(response) {
        	   var $sessionStorage = $injector.get('$sessionStorage');
        	   var dataBeanService = $injector.get('dataBeanService');
        	   var $ngToast = $injector.get('ngToast');
        	   var state = $injector.get('$state');
        	   var http = $injector.get('$http');
               if (response.status === 408) {
            	   if($sessionStorage.token){
                   http.defaults.headers.common['X-Auth-Token'] = "";
                   	delete $sessionStorage.userId;
               		delete $sessionStorage.token;
               		delete $sessionStorage.roles;
               		$sessionStorage.isAuthenticated = false;
               		dataBeanService.setStatetransitionHasErr('0');
               		state.go('loginHome', {reload: true});
              		$window.location.href = 'index.html';
                   $ngToast.create({
     	    		  className: 'danger',
     	    		  content: response.headers().errormsg,
           	    	  animation:'slide'
                   });
            	   }
               }else if(response.status === 401){
            	   if($sessionStorage.token){
            		   http.defaults.headers.common['X-Auth-Token'] = "";
                      	delete $sessionStorage.userId;
                  		delete $sessionStorage.token;
                  		delete $sessionStorage.roles;
                  		$sessionStorage.isAuthenticated = false;
                  		dataBeanService.setStatetransitionHasErr('0');
                  		 state.go('loginHome', {reload: true});
                   		$window.location.href = 'index.html';
                      $ngToast.create({
        	    		  className: 'danger',
        	    		  content: response.headers().errormsg,
              	    	  animation:'slide'
                      });
            	   }
               }
               else if(response.status == 403){
      	        	var state = $injector.get('$state');       
      	          	alert("Occideas is in READ-ONLY mode, update/delete action is not premitted.");
      	       }else if(response.status == '417'){
      	    	 var errorMessages = [];
          	   if(response.data){
          		   errorMessages.push(response.data);
          	   }
      	    	 $ngToast.create({
      	    		  className: 'danger',
      	    		  content: errorMessages,
      	    		  dismissButton: true,
      	    		  dismissOnClick:false,
      	    		  animation:'slide'
      	    	 });
      	       }
               else{
            	    /*state.go('error',{
       	            	error:"Response Status returned:"
       	            		+response.status+" "
       	            		+response.statusText+" "
       	            		+response.data});*/
            	   var errorMessages = [];
            	   if(response.message){
            		   errorMessages.push(response.message);
            	   }
            	   if(response.status){
            		   errorMessages.push(response.status);
            	   }
            	   if(response.statusText){
            		   errorMessages.push(response.statusText);
            	   }
            	   if(response.data){
            		   errorMessages.push(response.data);
            	   }
            	   if($rootScope['addErrorTab']){
            		   $rootScope.addErrorTab(errorMessages);
            	   }else{
            		   alert("Response Status returned:"
          	            		+response.status+" "
           	            		+response.statusText+" "
           	            		+response.data);
            	   }
               }
               return response;
           }
       }
   }
   
   service.$inject = ['$state', '$rootScope', 'AuthenticationService', 'dataBeanService', 'ngToast','$window','$sessionStorage'];
   function service ($state, $rootScope, AuthenticationService, dataBeanService, ngToast,$window,$sessionStorage){
       var app = this;
       app.logout = function() {
    	   ngToast.create({
	    		  className: 'success',
	    		  content: 'Logout Successfull", "Goodbye'
	    	 });
           $sessionStorage.userId = null;
           $sessionStorage.token = null;
           $state.go('loginHome', {}, {reload: true});
       };
   }
   
   angular.isUndefinedOrNull = function(val) {
       return angular.isUndefined(val) || val == null || val === "null";
   }
   
})();