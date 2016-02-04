angular.module("rxjsSocketAngular", ["rx"]);

angular.module("rxjsSocketAngular").controller("mainController", mainController);

mainController.$inject = ["rxService", "rx"];

function mainController(rxService, rx) {
	var vm = this;

	vm.saveZones = saveZones;

	function saveZones() {
		rxService.saveZones();
	}

}




angular.module("rxjsSocketAngular").service("rxService", rxService);

rxService.$inject = [];

function rxService() {
	var service = this;

	service.saveZones = saveZones;

	function saveZones() {
		console.log("saving zones");
	}


}