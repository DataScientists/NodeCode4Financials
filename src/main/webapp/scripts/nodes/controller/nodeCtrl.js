(function(){
	angular
	  .module('nodeCodeApp.Node')
	  .controller('NodeCtrl',NodeCtrl);
	
	NodeCtrl.$inject = ['$log','ngTableParams','$scope','$filter','$interval','TreeService','MonthYearService', 'uiGridTreeViewConstants'];
	function NodeCtrl($log,NgTableParams,$scope,$filter,$interval,TreeService, MonthYearService, uiGridTreeViewConstants){
		var self = this;
		$scope.monthYears = MonthYearService.prepareDate();
		$scope.periodArray = [1,2,3,6,12];
		$scope.selectedPeriod = MonthYearService.getPeriod();
		self.selectedMonthYear = MonthYearService.getMonthYear().id;
		console.log(self.selectedMonthYear);
		this.currentDate = new Date();
		$scope.data = [];
		self.country = [{id:1,name:'All'},
			   {id:2,name:'India'},
			   {id:3,name:'COTI'}];
		self.filterMonthYear =  function() {
	        const checkMonthYear = _.filter($scope.monthYears, monthYear => {
	                return moment(this.currentDate).format('MMM-YYYY') === monthYear.m;
	            });
	            return checkMonthYear[0].id;
	      }
		 self.incrementMonth = function(delta) {
		    this.currentDate = new Date(
		      this.currentDate.getFullYear(),
		      this.currentDate.getMonth() + delta,
		      this.currentDate.getDate());
		     self.selectedMonthYear = self.filterMonthYear();
		      //MonthYearService.setMonthYear($scope.selectedMonthYear);
		  }
		  self.switchToNextMonth = function(){
		    self.incrementMonth(1);
		  }
		  self.monthYearChanged = function(){
			  console.log(self.selectedMonthYear);
		  }
		  self.switchToPrevMonth = function() {
		    self.incrementMonth(-1);
		  }
		self.getNodeTreeData = function(){
			TreeService.getNodeTree(4).then(function(response){
				if(response.status == 200){
					response.data[0].childNodes[0].India = response.data[0].childNodes[0].inputValue;
					response.data[0].childNodes[0].COTI = response.data[0].childNodes[1].inputValue;
					response.data[0].childNodes[0].childNodes[0].India = response.data[0].childNodes[0].childNodes[0].inputValue;
					response.data[0].childNodes[0].childNodes[1].India = response.data[0].childNodes[0].childNodes[1].inputValue;
					
					
					response.data[0].childNodes[0].childNodes[0].COTI = response.data[0].childNodes[1].childNodes[0].inputValue;
					response.data[0].childNodes[0].childNodes[1].COTI = response.data[0].childNodes[1].childNodes[1].inputValue;
					response.data[0].childNodes[1] = null;
					self.selectedCountry = 1;
					writeoutNode( response.data, 0, $scope.gridOptions.data );
					
					self.filterByCountry(1);
					
				}
			});
		}
		
		self.generateColumn = function(countryId){
			if(countryId == 2){
				 $scope.gridOptions.columnDefs= [
						      { name: 'name', width: '30%' },
						      { name: 'India', width: '30%' }
						     ];
				 
			}else if(countryId == 3){
				$scope.gridOptions.columnDefs= [
				      { name: 'name', width: '30%' },
				      { name: 'COTI', width: '30%' }
				     ];
			}else{
				$scope.gridOptions.columnDefs= [
				      { name: 'name', width: '30%' },
				      { name: 'India', width: '30%' },
				      { name: 'COTI', width: '30%' }
				     ];
			}
		}
		self.getNodeTreeData();
		self.filterByCountry = function(countryId){
			self.generateColumn(countryId);
//			if(countryId == 1){
//				$scope.gridOptions.data = $scope.data;
//			}else{
//				var country = self.country.filter(function(c){ return c.id == countryId});
//				var filteredData = $scope.data.filter(function(d){
//					if (d.region == country[0].name || d.region == 'undefined' || d.region == null){
//						return d;
//					}
//					});
//				$scope.gridOptions.data = filteredData;
//			}
		}
		var writeoutNode = function( childArray, currentLevel, dataArray ){
			  childArray.forEach( function( node ){
				  if(node !== null){
					  if ( node.childNodes !== null && node.childNodes !== 'undefined' && node.childNodes.length > 0 ){
					      node.$$treeLevel = currentLevel;
					    }
					    dataArray.push( node );
					    if(node.childNodes !== null && node.childNodes !== 'undefined'){
					    	writeoutNode( node.childNodes, currentLevel + 1, dataArray );
					    }
				  }
			    
			  });
			  /*Add region as key and input value as region key value*/
//			  $scope.gridOptions.data.forEach(function(d){
//					if(d.region){
//						var c = d.region;
//						d[c] = d.inputValue;
//					}
//				});
			  $scope.data = angular.copy(dataArray);
			};
			
		self.temporaryRegionMapping = function(dataArray){
			
		}	
			
		  $scope.gridOptions = {
				  	data: [],
				    enableSorting: true,
				    enableFiltering: true,
				    showTreeExpandNoChildren: true,
				    columnDefs: [
				      { name: 'name', width: '30%' },
				      { name: 'India', width: '30%' },
				      { name: 'COTI', width: '30%' }
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