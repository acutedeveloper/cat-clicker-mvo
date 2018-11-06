// Model
// ## General Purpose of the Model
// To store the and update the list of cats and the number of times they have been clicked.
//
// ## Fundemental Actions
// Input:
// Processing:
// Output:

var catModel = {

	catData: [{
		id: 0,
		catImage: "cat_picture1.jpg",
		clickCount: 0
	},{
		id: 1,
		catImage: "cat_picture2.jpeg",
		clickCount: 0
	},{
		id: 2,
		catImage: "cat_picture3.jpeg",
		clickCount: 0
	},{
		id: 3,
		catImage: "cat_picture4.jpeg",
		clickCount: 0
	},{
		id: 4,
		catImage: "cat_picture5.jpeg",
		clickCount: 0
	}],

	getAllData: function() {
		return this.catData;
	},

	getCatData: function(catId) {
		return this.catData[catId];
	},

	updateCatData: function(catId){
		if(catId) {
			this.catData[catId].clickCount += 1;
			return this.catData[catId].clickCount;
		}
	}
};

// View 1 Clicker itself
// ## General Purpose of a clicker
// The general purpose of this application is to show the number of times a cat clicker has been clicked.
//
// ## Fundemental Actions required to return the final result
// Input:
// Processing:
// Output:

var catClicker = {

	$catClickContainer: $(".catClicks"),
	$clicksCounter: "",
	$catClicker: "",

	render: function(singleCat) {

		// empty the container
		this.$catClickContainer.empty();

		// Setup the new clicker
		var clickerView = `<div class="cat" data-catid="${singleCat.id}">
        <span class="counter">${singleCat.clickCount}</span> clicks
        <br>
        <img class="clicker" src="${singleCat.catImage}">
    </div>`;

		// Append the new clicker view to the DOM
		this.$catClickContainer.append(clickerView);

		this.$catClicker = $(".clicker");
		this.$clicksCounter = $(".counter");

		// Setup the new click event
		this.$catClicker.on("click", function() {
			console.log($(this).parent(".cat").data("catid"));
			octopus.addCount($(this).parent(".cat").data("catid"));
		});
	},

	updateCounter: function(newCount) {
		this.$clicksCounter.text(newCount);
	}
};

// View 2 - List of Clickers
// ## General Purpose of list of Clickers
// Show the list of available cats and the number of time they have been clicked.
//
// ## Fundemental Actions required to show the List
// Input: Data
// Processing:
// Output:

var catList = {

	$catListContainer: $("#catlist"),
	$catListButton: "",

	// Input: Data
	render: function(data) {

		if(data) {
			// Processing:
			data.forEach(function (item, index) {
				// Output:
				this.$catListContainer.append("<button class='button' data-catid='"+ index +"'>cat "+ (index + 1) +"</button>");

			}.bind(this));

			this.$catListButton = $(".button");

			// Setup the click event of the button.
			this.$catListButton.on("click", function() {
				// Get the id of the cat then pass it to the octopus function

				octopus.switchCat($(this).data("catid"));

			});
		}

	}
};

// Octopus
// ## General purpose of the Octopus
// To update the cats inside list View
// To update the data
// To update the counter of the clicker View
//
// Input:
// Processing:
// Output:

var octopus = {
	init: function() {
		// get the data
		var allCatData = catModel.getAllData();
		catList.render(allCatData);
		// setup the list view
		// setup the first cat
		catClicker.render(allCatData[0]);

		// Setup Listeners
		this.setupListeners();
	},

	addCount: function(currentCatId) {
		// The view will call this function when the clicker is clicked.

		// We then want to update the data Model
		catModel.updateCatData(currentCatId);

		// So we need to give the data model an id.
		var allCatData = catModel.getCatData(currentCatId);

		// Then we update the view clicker value with the render function with the updated data value
		catClicker.updateCounter(allCatData.clickCount);
	},

	switchCat: function(newCatId) {

		// get the data from the cat
		var newCatData = catModel.getCatData(newCatId);

		// then pass that data to the view
		catClicker.render(newCatData);
	}
};

octopus.init();
