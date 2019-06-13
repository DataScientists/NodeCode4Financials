(function(){
	angular
	  .module('nodeCodeApp.Node')
	  .controller('NodeCtrl',NodeCtrl);
	
	NodeCtrl.$inject = ['$log','ngTableParams','$scope','$filter'];
	function NodeCtrl($log,NgTableParams,$scope,$filter){
		var self = this;
		
		self.tableParams = new NgTableParams(
				{
				}, 
				{	
	        getData: function(params) {
	        	return [];
	        }
	      });
		self.tableParams.shouldGetData = true;
		 //test tree model 1
        $scope.treeMenu = [{
                "roleName": "Menu",
                "roleId": "menu",
                "collapsed": true,
                "children": [{
                        "roleName": "Group 3",
                        "roleId": "group3",
                        "collapsed": true,
                        "children": []
                    },
                    {
                        "roleName": "Group 4",
                        "roleId": "group4",
                        "collapsed": true,
                        "children": []
                    },
                    {
                        "roleName": "Group 5",
                        "roleId": "group5",
                        "collapsed": true,
                        "children": []
                    },
                    {
                        "roleName": "Group 6",
                        "roleId": "group6",
                        "collapsed": true,
                        "children": [{
                                "roleName": "Block 1",
                                "roleId": "block1",
                                "collapsed": true,
                                "children": []
                            },
                            {
                                "roleName": "Block 2",
                                "roleId": "block2",
                                "collapsed": true,
                                "children": [{
                                        "roleName": "Child 1",
                                        "roleId": "child1",
                                        "collapsed": true,
                                        "children": [{
                                                "roleName": "Livel 1",
                                                "roleId": "livel1",
                                                "collapsed": true,
                                                "children": []
                                            },
                                            {
                                                "roleName": "Livel 2",
                                                "roleId": "livel2",
                                                "collapsed": true,
                                                "children": []
                                            },
                                            {
                                                "roleName": "Livel 3",
                                                "roleId": "livel3",
                                                "collapsed": true,
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "roleName": "Child 2",
                                        "roleId": "child2",
                                        "children": []
                                    },
                                    {
                                        "roleName": "Child 3",
                                        "roleId": "child3",
                                        "children": []
                                    },
                                    {
                                        "roleName": "Child 4",
                                        "roleId": "child4",
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "roleName": "Block 3",
                                "roleId": "block3",
                                "collapsed": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "roleName": "Group 7",
                        "roleId": "group7",
                        "collapsed": true,
                        "children": []
                    },
                    {
                        "roleName": "Group 8",
                        "roleId": "group8",
                        "collapsed": true,
                        "children": []
                    }
                ]
            }

        ];

        $scope.$watch('mytree.currentNode', function(newObj, oldObj) {
            if ($scope.mytree && angular.isObject($scope.mytree.currentNode)) {
                console.log('Node Selected!!');
                console.log($scope.mytree.currentNode);
            }
        }, false);
		
	}
	
})();