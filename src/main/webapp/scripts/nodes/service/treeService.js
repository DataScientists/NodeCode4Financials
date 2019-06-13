(function(){

    angular.module('nodeCodeApp.Node').service('TreeService',TreeService);
    
    function TreeService(){
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
       

        return {
        	getFlatTree:getFlatTree,
        	visit: visit,
        	createTree: createTree
        };

    }
    
})();