angular.module("rxjsSocketAngular", ["rx"]);

angular.module("rxjsSocketAngular").controller("mainController", mainController);

mainController.$inject = ["rxService", "rx"];

function mainController(rxService, rx) {
	var vm = this;

	vm.saveZones = saveZone;

	function saveZone() {
		console.log("controller saving zone")
	}

}




angular.module("rxjsSocketAngular").service("rxService", rxService);

rxService.$inject = [];

function rxService() {
	var service = this;

	service.test = test;

	function test() {
		console.log("works");
	}


}