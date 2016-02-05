angular.module("rxjsSocketAngular", ["rx"]);

angular.module("rxjsSocketAngular").controller("mainController", mainController);

mainController.$inject = ["rxService", "rx"];

function mainController(rxService, rx) {
	var vm = this;

	//public variables
	vm.panels = [1];

	//public functions
	vm.saveZones = saveZones;
	vm.deletePanel = deletePanel;
	vm.addPanel = addPanel;

	function deletePanel(index) {
		vm.panels.splice(index, 1);
	}

	function addPanel() {
		vm.panels.push(vm.panels.length + 1);
		console.log(vm.panels);
	}

	function saveZones() {
		rxService.saveZones();
	}
}


/*** Directive ***/
(function() {
	angular.module("rxjsSocketAngular").directive("panel", panel);

	function panel() {
		return {
			restrict: "E",
			replace: true,
			template: "<div>panel data: {{PanelCtrl.zones || 'no data'}}</div>",
			controllerAs: "PanelCtrl",
			bindToController: true,
			controller: panelController,
			link: panelLink,
			scope: {
				id: "="
			}
		};
	}

	panelController.$inject = ["rxService", "rx", "$scope"];

	function panelController(rxService, rx, $scope) {
		var vm = this;

		//private variables
		var newZoneSubscription = null;

		//public variables
		vm.zones = null;

		//public functions
		vm.init = init;
		vm.destroy = destroy;
		vm.saveZones = saveZones;

		function init() {
			var newZoneStream = rxService.getNewZoneStream();
			newZoneSubscription = newZoneStream.subscribe(function (data) {
				console.log(vm.id);
				vm.zones = data;
				if (!$scope.$$phase) {
		            $scope.$apply();
		        }
			});
		}

		function destroy() {
			newZoneSubscription.dispose(); //stops listening to the stream
		}

		function saveZones() {
			rxService.saveZones();
		}

	}

	function panelLink(scope, element, link, ctrl) {
		ctrl.init();
		scope.$on('$destroy', function() {
            ctrl.destroy();
        })

	}

})();



/*** Service ***/
angular.module("rxjsSocketAngular").service("rxService", rxService);

rxService.$inject = [];

function rxService() {
	var service = this;
	var socket = io();

	//private vars
	var newZonesStream = null;

	//public vars
	service.saveZones = saveZones;
	service.getNewZoneStream = getNewZoneStream;


	function saveZones() {
		socket.emit("save-zones");
	}

	function getNewZoneStream () {
		if (!newZonesStream) {
			newZonesStream = Rx.Observable.create(function(observable) {
				socket.on("new-zones", function(data) {
					observable.onNext(data);
				});

				//clean up function
				return function() {
					//$sails.off("new-zones");
					console.log("unsubscribed from stream");
				}
			});
		} 

		return newZonesStream;
	}

	


}