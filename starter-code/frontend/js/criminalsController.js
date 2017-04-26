console.log("Criminals.js");

angular.module("TheCriminalsApp", [])
	.controller("CriminalsController", CriminalsController);

CriminalsController.$inject =['$http'];

function CriminalsController($http){
	var self = this;
	self.all=[];
	self.addCriminal = addCriminal;
	self.newCriminal = {};
	self.getCriminals = getCriminals;
	self.deleteCriminal = deleteCriminal;
	self.updateCriminal = updateCriminal;

	getCriminals();
	function getCriminals(){
		$http
			.get('http://localhost:3000/criminals')
			.then(function(response){
				console.log(response);
				self.all = response.data;
			});
	}
	function addCriminal(){
		$http
			.post('http://localhost:3000/criminals', self.newCriminal)
			.then(function(response){
				getCriminals();
			});
			self.newCriminal = {};
	}
	function deleteCriminal(criminal){
		console.log(criminal);
		$http
			.delete('http://localhost:3000/criminals/' + criminal._id)
			.then(function(response){
				console.log(response);
				var index = self.all.indexOf(criminal);
				self.all.splice(index, 1);
			});
	}
	function updateCriminal(criminal){
		console.log(criminal);
		$http
			.put('http://localhost:3000/criminals/' + criminal._id)
			.then(function(response){
				console.log(response);
				criminal.name = name;
				criminal.location = location;
				criminal.status = status;
				getCriminals();
			});
	}
}