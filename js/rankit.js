$(document).ready(function(){

	// === Fade In === //
	$('body').hide();
	$('body').fadeIn(1500);






	/* ================================
	   ________      __          __    
	  / ____/ /___  / /_  ____ _/ /____
	 / / __/ / __ \/ __ \/ __ `/ / ___/
	/ /_/ / / /_/ / /_/ / /_/ / (__  ) 
	\____/_/\____/_.___/\__,_/_/____/  

	================================== */

	var optionList = new Array();
	var factorList = new Array();
	var decisions = new Array();
	var scores = {};
	var choice1, choice2;
	var decisionFactor;







	/* ================================
	    ___       __    __   __  ______
	   /   | ____/ /___/ /  / / / /  _/
	  / /| |/ __  / __  /  / / / // /  
	 / ___ / /_/ / /_/ /  / /_/ // /   
	/_/  |_\__,_/\__,_/   \____/___/

	================================== */

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







	/* =========================================================
	   ______                                         __  ______
	  / ____/___  ____ ___  ____  ____ _________     / / / /  _/
	 / /   / __ \/ __ `__ \/ __ \/ __ `/ ___/ _ \   / / / // /  
	/ /___/ /_/ / / / / / / /_/ / /_/ / /  /  __/  / /_/ // /   
	\____/\____/_/ /_/ /_/ .___/\__,_/_/   \___/   \____/___/  

	=========================================================== */

	// When the "Rank!" button is clicked.
	$('#go-rank').click(function() {
		beginDeciding();
	});

	function beginDeciding() {
		// Clear arrays.
		optionList = [];
		factorList = [];
		decisions = [];
		scores = {};
		// Create option list.
		for (i = 0; i < $('#option-list').children().length; i++) {
			var optionText = $('#option-list').children().eq(i).text();
			optionList.push(optionText);
		}
		// Are there at least 2 options? If not, inform the user.
		if (optionList.length < 2) {
			alert("Add at least 2 options.");
			return;
		}
		// Create factor list.
		for (i = 0; i < $('#factor-list').children().length; i++) {
			var factorText = $('#factor-list').children().eq(i).text();
			var factorWeight = $('#factor-list').children().eq(i).children('.factor-slider').attr('value');
			var factorInList = new Object();
			factorInList["name"] = factorText;
			factorInList["weight"] = factorWeight;
			factorList.push(factorInList);
		}
		// Make factor weights sum to 0.
		normalizeWeights();
		// Print options, factors, and scores to console.
		console.log("Options: " + optionList);
		console.log("Factors:");
		for (f in factorList) {
			console.log(factorList[f]['name'] + ": " + factorList[f]['weight']);
		}
		console.log("Scores:");
		// Create score list. All options have a starting score of 500 for each factor.
		for (o in optionList) {
			var option = optionList[o];
			scores[option] = {};
			for (f in factorList) {
				var factor = factorList[f]['name'];
				scores[option][factor] = 500;
				console.log(option + " in " + factor + ": " + scores[option][factor]);
			}
		}

		// Hide "Add UI", move to "Compare UI".
		$('#add-ui').hide();
		presentNewDecision();
		$('#compare-ui').show();
	}

	function presentNewDecision() {
		// Have all decisions been made?
		if (decisions.length == maxDecisions()) {
			displayResults();
			$("#compare-ui").hide('slow');
			$("#results-ui").show('slow');
			return;
		}

		// Otherwise, pick a random new decision.
		$("#choices").hide('fast'); 
		do {
			var i = Math.floor(Math.random() * optionList.length);
			var j = i;
			while (j == i) {
				j = Math.floor(Math.random() * optionList.length);
			}
			var k = Math.floor(Math.random() * factorList.length);

			choice1 = optionList[i];
			choice2 = optionList[j];
			decisionFactor = factorList[k]['name'];
		} while (thisDecisionMadeAlready());

		var decisionString = (choice1 + "." + choice2 + "." + decisionFactor);
		console.log("New decision presented: " + decisionString);
		decisions.push(decisionString);

		$("#choice-1").text(choice1);
		$("#choice-2").text(choice2);
		$("#decision-factor").text(decisionFactor+"?");
		$("#choices").show('fast');
	}

	// Take 25% of loser's current factor points and give them to the winner.
	function updateScores(winner, loser, factor) {
		var points = scores[loser][factor]*0.25;
		scores[winner][factor] += points;
		scores[loser][factor] -= points;
		console.log(winner + " beats " + loser + " in " + factor + ". " +
			winner + "'s new score for this factor: " + scores[winner][factor] + ". " +
			loser + "'s new score for this factor: " + scores[loser][factor] 
		);
	}

	// When the user clicks the choice on the left.
	$("#choice-1").click(function() {
		var winner = choice1;
		var loser = choice2;
		updateScores(winner, loser, decisionFactor)
		presentNewDecision();
	});
	
	// When the user clicks the choice on the right.
	$("#choice-2").click(function() {		
		var winner = choice2;
		var loser = choice1;
		updateScores(winner, loser, decisionFactor)
		presentNewDecision();
	});

	// Skip to results.
	$("#skip-to-results").click(function() {
		$("#compare-ui").hide('slow');
		$("#results-ui").show('slow');
		displayResults();
	});







	/* ===============================================
	    ____                  ____          __  ______
	   / __ \___  _______  __/ / /______   / / / /  _/
	  / /_/ / _ \/ ___/ / / / / __/ ___/  / / / // /  
	 / _, _/  __(__  ) /_/ / / /_(__  )  / /_/ // /   
	/_/ |_|\___/____/\__,_/_/\__/____/   \____/___/   
	                                                  
	================================================== */

	// For a given option, calculate total score across all factors.
	function getTotalScore(option) {
		var sum = 0.0;
		for (f in factorList) {
			var factor = factorList[f]['name'];
			console.log(option + "'s score for " + factorList[f]['name'] + " is " + scores[option][factor]);
			sum += parseFloat(scores[option][factor]) * parseFloat(factorList[f]['weight']);
		}
		console.log(option + "'s total score is " + sum);
		return sum;
	}

	function displayResults() {
		for (var i = 0; i < optionList.length; i++) {
			var appendString = ("<li class='result'>" + 
				optionList[i] + ": " + 
				getTotalScore(optionList[i]) + "</li>");
			$('#ranked-results').append(appendString);
		}
	}






	/* ==========================
	   __  ____  _ ___ __       
	  / / / / /_(_) (_) /___  __
	 / / / / __/ / / / __/ / / /
	/ /_/ / /_/ / / / /_/ /_/ / 
	\____/\__/_/_/_/\__/\__, /  
	                   /____/ 
	============================= */

	function factorial(n) {
		if (n == 0) {
			return 1;
		}
		else {
			return (n*factorial(n-1));	
		}
	}

	// EECS 203 HOLLA (the number of ways to choose a items from b items)
	function choose(a,b) {
		return (factorial(a) / (factorial(b) * factorial(a - b)));	
	}

	// Will be used to calculate progress % and "Certainty" value.
	function maxDecisions() {
		return (choose(optionList.length, 2) * factorList.length);	
	}

	// Make total weight sum to 1
	function normalizeWeights() {
		var sum = 0.0;
		for (f in factorList) {
			sum = parseFloat(sum) + parseFloat(factorList[f]['weight']);
		}
		for (f in factorList) {
			factorList[f]['weight'] = 1.0 * factorList[f]['weight'] / sum;
		}
	}

	// Has the current combination of choices and factor already been compared?
	function thisDecisionMadeAlready() {
		for (d in decisions) {
			if (decisions[d] == (choice1 + "." + choice2 + "." + decisionFactor) ||
				decisions[d] == (choice2 + "." + choice1 + "." + decisionFactor) ) { 
				return true;
			}
		}
		return false;
	}
		
});