(function(){
	angular
	  .module('nodeCodeApp.Node',['ui.router','ui.grid','ui.grid.treeView'])
	  .config(Config);
	
	Config.$inject = ['$stateProvider'];
	function Config($stateProvider){
	}
	
})();