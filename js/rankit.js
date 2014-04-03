$(document).ready(function(){

	// === Fade In === //
	$('body').hide();
	$('body').fadeIn(1500);


	// === Adding Options and Factors, Screen 1 === //
	function addItem(type) {
		var item = $('#'+type+'-box').val();
		if (item === "") {
		}
		else if (item) {
			$('#'+type+'-list').prepend(
				"<li id='"+type+"-item'>" + item + 
					"<a class='delete-"+type+"'></a>" + 
				"</li>"
			);

			if ( $('#option-list').children().length > 1 ) {
				$('#go-rank').addClass('clickable');
			}
		}
		$('#'+type+'-box').val("");
		$('#'+type+'-box').focus();
	}

	$('#submit-option').click(function() {
		addItem("option");
	});

	$("#submit-factor").click(function() {
		addItem("factor");
	});

	$('#option-box').on('keyup', function(e) {
	    if (e.which == 13) {
	        addItem("option");
	    }
	});

	$('#factor-box').on('keyup', function(e) {
	    if (e.which == 13) {
	        addItem("factor");
	    }
	});

	$('.delete-option, .delete-factor').live('click', function() {
		console.log("Removing " + $(this).parent().text() );
		$(this).parent().remove();

		if ( $('#option-list').children().length > 1 ) {
			$('#go-rank').removeClass('clickable');
		}
	});



	// === Ranking, Screen 2 === //
	$('#go-rank').click(function() {
		beginRanking();
	});

	function beginRanking() {
		var optionList = [];
		var factorList = [];

		for (i = 0; i < $('#option-list').children().length; i++) {
			optionList.push($('#option-list').children()[i].textContent);
		}
		for (i = 0; i < $('#factor-list').children().length; i++) {
			factorList.push($('#factor-list').children()[i].textContent);
		}

		console.log("Options: " + optionList);
		console.log("Factors: " + factorList);

		if (optionList.length < 2) {
			return;
		}

		else {
			$('#new-rank-screen-1').fadeOut();
			$('#new-rank-screen-2').append("<h2>Options</h2>"+optionList+"<br/><br/>");
			$('#new-rank-screen-2').append("<h2>Factors</h2>"+factorList);
			$('#new-rank-screen-2').fadeIn();
		}
	}



		
});