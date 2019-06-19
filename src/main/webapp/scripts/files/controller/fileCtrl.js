(function(){
	angular
	  .module('nodeCodeApp.File')
	  .controller('FileCtrl',FileCtrl);
	
	FileCtrl.$inject = ['$log','ngTableParams','$scope','$mdDialog','Upload','FileService','$window'];
	function FileCtrl($log,NgTableParams,$scope,$mdDialog,Upload, FileService, $window){
		var self = this;
		var uploadUrl = serverCtx+urls.rest.uploadFile;
		
		self.getFiles = function(){
			FileService.getFiles().then(function(response){
				$scope.files = response;
			});
		}
		
		self.getFiles();
		$scope.showUploadFileDialog  = function(){
			self.newCabinet = {};
			$mdDialog.show({
				scope: $scope,  
				preserveScope: true,
				templateUrl : 'scripts/files/partials/uploadFile.html',
				clickOutsideToClose:false
			});

		}
		self.cancel = function(){
			$mdDialog.cancel();
		}
		
		self.uploadFilePrepare = function(file){
			if(file){
				self.fileJSON = {
						filePath: '/file/',
						file:file
				};
				$scope.uploadFile(self.fileJSON);
			
			}
		}
		// upload on file select or drop
	    $scope.uploadFile = function (fileData) {
	        Upload.upload({
	            url: uploadUrl,
	            data: fileData
	        }).then(function (resp) {
	        	
	        	$scope.file = null;
	        	self.getFiles();
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
	    };
	    
	    self.downloadFile = function(file){
	    	FileService.downloadFile(file).then(function(response){
                if (response.status === 200) {
                    var fileBlob = new Blob([response.data], {type: file.fileType});
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(fileBlob, file.file_name);
                    } else {
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if(saveBlob) {
                            saveBlob(blob, filename);
                        } else {
                            var a = $("<a style='display: none;'/>");
                            var fileUrl = $window.URL.createObjectURL(fileBlob);
                            a.attr("href", fileUrl);
                            a.attr("download", file.file_name);
                            $("body").append(a);
                            a[0].click();
                            $window.URL.revokeObjectURL(fileUrl);
                            a.remove();
                        }
                   }
                }
            });
        }
			  
		
	}
	
})();