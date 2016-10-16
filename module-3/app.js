//app = "";
(function () {
'use strict';

var app = angular.module('ChineseApp', [])
.controller('SearchController', SearchController)
.directive('foundItems', FoundItemsDirective)
.service('ShoppingListItems',ShoppingListItems)
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/');


function FoundItemsDirective(){
	var ddo = {
		templateUrl: 'founditems.html',
		scope: {
			items : '<',
			message: '<', 
			onRemove : '&'
			},
		controller: FoundListDirectiveController,
		controllerAs: 'list',
		bindToController: true
		};
	return ddo;
}

function FoundListDirectiveController(){
	var list = this;

	list.isMessage = function(){
		if(list.message!="") {
			return true;
		}
		return false;
	};
	
}

SearchController.$inject = ['ShoppingListItems'];
function SearchController(ShoppingListItems) {
	var searchCtrl = this;

	
	searchCtrl.items = [];
	searchCtrl.foundItems = [];
	searchCtrl.search_term = "";
	searchCtrl.message = "";



	searchCtrl.isMessage = function(){
		if(searchCtrl.message!="") {
			return true;
		}
		return false;
	};

	searchCtrl.search = function(){
		//console.log('items',searchCtrl.items.menu_items); 
		
		app = this;
		searchCtrl.foundItems = [];
		searchCtrl.message = "";
		if(searchCtrl.search_term=="") {
			searchCtrl.message = "ERROR! ERROR! ERROR! You have to write something to look for.";
		} else {
			var promise = ShoppingListItems.getItems();
			promise.then(function(response){
				searchCtrl.items = response.data;
				for(var i=0; i<searchCtrl.items.menu_items.length;i++){
					var item = searchCtrl.items.menu_items[i];
					//console.log(item);
					//console.log(item.name.indexOf(searchCtrl.search_term));
					if(item.name.toLowerCase().indexOf(searchCtrl.search_term.toLowerCase())!=-1) {
						searchCtrl.foundItems.push(item);
					}
				}
				if(searchCtrl.foundItems.length==0) {
					searchCtrl.message = "No items found.";
				}
			}).catch(function(error){

			});
		}
		
	};

	searchCtrl.removeItem = function(index) {
		searchCtrl.foundItems.splice(index,1);
	}


}


ShoppingListItems.$inject = ['$http','ApiBasePath'];
function ShoppingListItems($http,ApiBasePath){
	var service = this;
	var items = [];
	

	service.getItems = function(){
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			});

		return response;
	};

}



})();
