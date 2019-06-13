(function(){
	angular
	  .module('nodeCodeApp.Node')
	  .controller('NodeCtrl',NodeCtrl);
	
	NodeCtrl.$inject = ['$log','ngTableParams','$scope','$filter','TreeService'];
	function NodeCtrl($log,NgTableParams,$scope,$filter,TreeService){
		var self = this;
		  var TreeFlatModel = function() {

		        this.flatTree = [];

		        this.refresh = function() {
		          this.flatTree = TreeService.getFlatTree();
		        };

		        this.getItemAtIndex = function(index) {
		          return this.flatTree[index];
		        };

		        this.getLength = function() {
		          return this.flatTree.length;
		        };

		        this.refresh();
		      };

		      self.model = new TreeFlatModel();
		      console.log(self.model);
		      self.toggleExpansion = function(node) {
		        node.expanded = node.expanded ? false : true;
		        this.model.refresh();
		      };
		
	}
	
})();