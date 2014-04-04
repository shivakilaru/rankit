$(document).ready(function(){

	// === Fade In === //
	$('body').hide();
	$('body').fadeIn(1500);




	/* ===============================
	   ___ _       _           _     
	  / _ \ | ___ | |__   __ _| |___ 
	 / /_\/ |/ _ \| '_ \ / _` | / __|
	/ /_\\| | (_) | |_) | (_| | \__ \
	\____/|_|\___/|_.__/ \__,_|_|___/

	================================= */

	var optionList = new Array();
	var factorList = new Array();
	var combos = new Array();
	var scores = {};







	/* ===============================
	 __                            _ 
	/ _\ ___ _ __ ___  ___ _ __   / |
	\ \ / __| '__/ _ \/ _ \ '_ \  | |
	_\ \ (__| | |  __/  __/ | | | | |
	\__/\___|_|  \___|\___|_| |_| |_|

	================================= */
	function addItem(type) {
		var item = $('#'+type+'-box').val();
		if (item === "") {
		}
		else if (item) {

			if (type == "option") {
				$('#option-list').prepend(
					"<li id='option-item'>" + item + 
						"<a class='delete-option'></a>" + 
					"</li>"
				);
			}
			if (type == "factor") {
				$('#factor-list').prepend(
					"<li id='factor-item'>" + item + 
						"<a class='delete-factor'></a>" + 
						"<input type='range' min='0' max='50' step='1' value='25' class='factor-slider'/>" +
					"</li>"
				);
			}

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

		if ( $('#option-list').children().length < 2 ) {
			$('#go-rank').removeClass('clickable');
		}
	});







	/* ===============================
	 __                            ____  
	/ _\ ___ _ __ ___  ___ _ __   |___ \ 
	\ \ / __| '__/ _ \/ _ \ '_ \    __) |
	_\ \ (__| | |  __/  __/ | | |  / __/ 
	\__/\___|_|  \___|\___|_| |_| |_____|

	================================= */

	$('#go-rank').click(function() {
		beginRanking();
	});

	function beginRanking() {
		for (i = 0; i < $('#option-list').children().length; i++) {
			var optionText = $('#option-list').children().eq(i).text();
			optionList.push(optionText);
		}
		for (i = 0; i < $('#factor-list').children().length; i++) {
			var factorText = $('#factor-list').children().eq(i).text();
			var factorWeight = $('#factor-list').children().eq(i).children('.factor-slider').attr('value');
			var factorInList = new Object();
			factorInList["name"] = factorText;
			factorInList["weight"] = factorWeight;
			factorList.push(factorInList);
		}

		if (optionList.length < 2) {
			return;
		}

		normalizeWeights();

		console.log("Options: " + optionList);
		console.log("Factors:");
		for (f in factorList) {
			console.log(factorList[f]['name'] + ": " + factorList[f]['weight']);
		}

		$('#new-rank-screen-1').hide();
		$('#new-rank-screen-2').show();
	}






	/* ===============================
	              _   _     
	  /\/\   __ _| |_| |__  
	 /    \ / _` | __| '_ \ 
	/ /\/\ \ (_| | |_| | | |
	\/    \/\__,_|\__|_| |_|
	
	================================= */

	function factorial(n) {
		if (n == 0) {
			return 1;
		}
		else {
			return n*factorial(n-1);	
		}
	}

	function normalizeWeights() {
		// Make total weight sum to 1
		var sum = 0.0;
		for (f in factorList) {
			sum = parseFloat(sum) + parseFloat(factorList[f]['weight']);
		}
		for (f in factorList) {
			factorList[f]['weight'] = 1.0 * factorList[f]['weight'] / sum;
		}
	}

		
});