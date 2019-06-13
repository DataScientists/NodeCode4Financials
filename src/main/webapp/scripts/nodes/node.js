(function(){
	angular
	  .module('nodeCodeApp.Node',['ui.router','angularTreeview'])
	  .config(Config);
	
	Config.$inject = ['$stateProvider'];
	function Config($stateProvider){
	}
	
})();