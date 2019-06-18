(function(){
	angular
	  .module('nodeCodeApp.Node')
	  .controller('NodeCtrl',NodeCtrl);
	
	NodeCtrl.$inject = ['$log','ngTableParams','$scope','$filter','$interval','TreeService', 'uiGridTreeViewConstants'];
	function NodeCtrl($log,NgTableParams,$scope,$filter,$interval,TreeService, uiGridTreeViewConstants){
		var self = this;
		$scope.data = [];
		self.country = [{id:1,name:'All'},
			   {id:2,name:'India'},
			   {id:3,name:'COTI'}];
		self.getNodeTreeData = function(){
			TreeService.getNodeTree(4).then(function(response){
				if(response.status == 200){
					writeoutNode( response.data, 0, $scope.gridOptions.data );
					
				}
			});
		}
		self.getNodeTreeData();
		self.filterByCountry = function(countryId){
			if(countryId == 1){
				$scope.gridOptions.data = $scope.data;
			}else{
				var country = self.country.filter(function(c){ return c.id == countryId});
				console.log(country);
				var filteredData = $scope.data.filter(function(d){
					if (d.region == country[0].name || d.region == 'undefined' || d.region == null){
						return d;
					}
					});
				console.log(filteredData);
				$scope.gridOptions.data = filteredData;
			}
		}
		var writeoutNode = function( childArray, currentLevel, dataArray ){
			  childArray.forEach( function( node ){
			    if ( node.childNodes !== null && node.childNodes !== 'undefined' && node.childNodes.length > 0 ){
			      node.$$treeLevel = currentLevel;
			    }
			    dataArray.push( node );
			    if(node.childNodes !== null && node.childNodes !== 'undefined'){
			    	writeoutNode( node.childNodes, currentLevel + 1, dataArray );
			    }
			  });
			  $scope.data = angular.copy(dataArray);
			};

			
		  $scope.gridOptions = {
				  	data: [],
				    enableSorting: true,
				    enableFiltering: true,
				    showTreeExpandNoChildren: true,
				    columnDefs: [
				      { name: 'name', width: '30%' },
				      { name: 'region', width: '30%' },
				      { name: 'inputValue', width: '30%' }
				     ],
				    onRegisterApi: function( gridApi ) {
				      $scope.gridApi = gridApi;
//				      $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
//				        if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
//				         
//				        }
//				      });
				    }
				  };
		  self.addColumn = function(){
			  	$scope.gridOptions.columnDefs.push({name: 'New Column', width: '30%'});
		  }
		  $scope.expandAll = function(){
			    $scope.gridApi.treeBase.expandAllRows();
			  };
			 
			  $scope.toggleRow = function( rowNum ){
			    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
			  };
			 
			  $scope.toggleExpandNoChildren = function(){
			    $scope.gridOptions.showTreeExpandNoChildren = !$scope.gridOptions.showTreeExpandNoChildren;
			    $scope.gridApi.grid.refresh();
			  };
			  
		
	}
	
})();