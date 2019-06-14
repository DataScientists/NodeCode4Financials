(function(){

    angular.module('nodeCodeApp.Node').service('TreeService',TreeService);
    
    TreeService.$inject = ['$http', '$q'];
    
    function TreeService($http, $q){
    	 var tree = createTree();

         getFlatTree = function() {
           let flatList = [];
           let depth = 0;

           visit(tree, depth, flatList);

           return flatList;
         }

         function visit(node, depth, flatList) {
           node.depth = depth;
           if (flatList) {
             flatList.push(node);
           }

           if (!node.expanded) {
             return;
           }

           if (node.children) {
             node.children.forEach(function(child) {
               visit(child, depth + 1, flatList);
             });
           }
         }

         function createTree() {
           var tree = {
             name: "Root",
             children: [],
             expanded: true
           };
           for (var i = 0; i < 2; i++) {
             var childrenNodes = [];
             for (var children = 0; children < 2; children++) {
               childrenNodes.push({
                   name: "Child-" + children,
                   
                 });
             }
             tree.children.push({
               name: "Node-" + i,
               children: childrenNodes
             });
           }
           return tree;
         }
       
         function getNodeTree(idNode) {
             var restUrl = "";
             
             restUrl = 'web/rest/node/getNodeTree?id=' + idNode;
             //restUrl = 'web/rest/note/findById?id=' + idNode;
             
             var request = $http({
               method: 'GET',
               url: restUrl
             });
             return request.then(handleSuccess, handleError);
           }
         var getNodesData = function() {
 			return $http.get('/rma/data/data.json', {
 				cache : false
 			}).then(function(response) {
 				var data = response.data;
 				return data;
 			});
 		};
         function handleError(response) {
             if(!angular.isObject(response.data) || !response.data.message) {
               return ($q.reject("An unknown error occurred."));
             }
             return ($q.reject(response.data.message));
           }

           function handleSuccess(response) {
             return (response);
           }
        return {
        	getNodesData: getNodesData,
        	getNodeTree:getNodeTree,
        	getFlatTree:getFlatTree,
        	visit: visit,
        	createTree: createTree
        };

    }
    
    
    
})();