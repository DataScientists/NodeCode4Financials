(function() {
	angular.module('nodeCodeApp.File')
			.service('FileService', FileService);

	FileService.$inject = [ '$http', '$q' ];
	function FileService($http, $q) {
		var apiUrl = 'web/rest/';
		var FileEndpoint = apiUrl + 'appFiles';
		var getFiles= function() {
			return $http.get(FileEndpoint + '/list', {
				cache : false
			}).then(function(response) {
				var data = response.data;
				return data;
			});
		};
		var downloadFile = function(data){
        	var restUrl = FileEndpoint+'/downloadFile';
        	var request =  $http({
        		  method: 'POST',
        		  url: restUrl,
        		  data:data,
        		  responseType: 'arraybuffer'
        	})
        	return request.then(handleSuccess,handleError);
        }
		
		
		
		function handleError(response) {
			if (!angular.isObject(response.data) || !response.data.message) {
				return ($q.reject("An unknown error occurred."));
			}
			return ($q.reject(response.data.message));
		}

		function handleSuccess(response) {
			return (response);
		}

		return {
			getFiles : getFiles,
			downloadFile: downloadFile
		};
	}

})();