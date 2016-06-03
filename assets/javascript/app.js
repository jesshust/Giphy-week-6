

	// British Comedies array
	var comedies = ['Little Britain', 'The Mighty Boosh', 'Peep Show', 'The IT Crowd', 'Blackadder', 'Monty Python', 'Keeping Up Appearances', ];

	//display function
	function displayBritishComedy(){

		var comedy = $(this).attr('data-comedy'); 
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedy + "&api_key=dc6zaTOxFJmzC&limit=10"; 

		

		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

			
			var results = response.data; 

			$('#comedyView').empty();

			for(var i=0; i < results.length; i++){
				var gifDiv = $('<div class = "gif">');  //creates empty img divs for photos

				var rating = results[i].rating.toUpperCase(); 
				console.log(rating);
				if (rating == "") {
						rating = "N/A"; 

				}

				var ratingAssigned = $('<div id="ratings">').text("Rating: " + rating); 
				var comedyImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' + results[i].images.fixed_height_still.url + ' data-animate=' + results[i].images.fixed_height.url + ' data-state="still" class="comedyImage">'); //grab the image
					

				gifDiv.append(ratingAssigned);


				gifDiv.append(comedyImage); 

				$("#comedyView").prepend(gifDiv); 

			}

		});  
	 }


	//adds button
	function renderButtons(){ 

	
		$("#buttonsView").empty(); 

		// loops through comedy images

		for(var i= 0; i <comedies.length; i++){
		
			var a = $("<button>"); 
			a.addClass("comedy"); 
			a.attr("data-comedy", comedies[i]); 
			a.text(comedies[i]); //textbox info
			$("#buttonsView").append(a); //add the button to the page

		} 


	}

	// add the comedy button 

	function createComedy(){

	$('#addComedy').on('click', function(){

		
		//should grab from text box to create button
		var comedy = $("#comedyInput").val(); 
		

		comedies.push(comedy); 
		
		renderButtons();


		// used in example - users can press enter instead of clicking submit
		return false;
	})

	}


	function animateImage() {
		var state=$(this).attr('data-state'); 

		if(state == 'still'){
			$(this).attr('src', $(this).data('animate')); 
			$(this).attr('data-state', 'animate'); 
		} else {
			$(this).attr('src', $(this).data('still')); 
			$(this).attr('data-state', 'still'); 
		}
	 }
	 
		

	//should display comedy images
	$(document).on("click", ".comedy", displayBritishComedy); 
	$(document).on("click", ".comedyImage", animateImage); 
 
	renderButtons();
	createComedy(); 
	


