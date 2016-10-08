(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
 	var toBuyCtrl = this;

 	toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

 	toBuyCtrl.buyItem = function(index) {

 		ShoppingListCheckOffService.itemBought(index);
 	};

 	toBuyCtrl.checkItems = function() {
		if(toBuyCtrl.items.length>0){
			return true;
		} else {
			return false;
		}
	};


}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
	var alreadyBoughtCtrl = this;

	alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

	alreadyBoughtCtrl.checkItems = function() {
		if(alreadyBoughtCtrl.items.length>0){
			return true;
		} else {
			return false;
		}
	};


}

function ShoppingListCheckOffService(){
	var service = this;
	var bought = [];
	var tobuy = [
		{name:'cookies' , quantity: 10},
		{name:'chips' , quantity: 20},
		{name:'big cookies' , quantity: 30},
		{name:'mini-cookies' , quantity: 40},
		{name:'mini-cookies' , quantity: 40},
	];

	service.getToBuyItems = function(){
		return tobuy;
	};

	service.getBoughtItems = function(){
		return bought;
	};

	service.itemBought = function(index) {
		var item = tobuy.splice(index,1);
		//console.log(item);
		bought.push(item[0]);
	};

}

})();
