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
	var noFactors = true;

	// @TODO-1: refactor this so we don't need 2 arrays of factors
	var factorNames = new Array();

	var decisions = new Array();
	var decisionCount = 0;

	var scores = {};
	var finalScores = {};

	var choice1, choice2;
	var decisionFactor;

	var winnerResult;
	var progressPercentage;
	var title;



	/* ================================
	    __                _     
	   / /   ____  ____ _(_)___ 
	  / /   / __ \/ __ `/ / __ \
	 / /___/ /_/ / /_/ / / / / /
	/_____/\____/\__, /_/_/ /_/ 
	            /____/          

	================================== */

	//Login code courtesy of saly2k on gethugames.in

	var OAUTHURL	=  'https://accounts.google.com/o/oauth2/auth?';
   var VALIDURL	=  'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
	var SCOPE    	=  'https://www.googleapis.com/auth/userinfo.profile ';
  	var CLIENTID  	=  '406950378888.apps.googleusercontent.com';
	var REDIRECT  	=  'http://dkoleanb.byethost8.com/RankIt/oauth.html';
  	var TYPE      	=  'token';
  	var _url      	=	OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + 
  							'&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
  	var acToken;
 	var tokenType;
  	var expiresIn;
	var user;
  	var loggedIn    =   false;
	
	$('#login').click(function() {
   	var win = window.open(_url, "windowname1", 'width=800, height=600'); 
		var pollTimer   =   window.setInterval(function() { 
	    	try {
	      	console.log(win.document.URL);
	        	if (win.document.URL.indexOf(REDIRECT) != -1) {
	         	window.clearInterval(pollTimer);
	            var url =   win.document.URL;
	            acToken =   gup(url, 'access_token');
	            tokenType = gup(url, 'token_type');
	            expiresIn = gup(url, 'expires_in');
	            win.close();

	            validateToken(acToken);
	        	}
	    	} catch(e) {
	      }
		}, 500);
   });

  	function validateToken(token) {
      $.ajax({
          url: VALIDURL + token,
          data: null,
          success: function(responseText){  
              getUserInfo();
              loggedIn = true;
              // $('#loginText').hide();
              // $('#logoutText').show();
          },  
          dataType: "jsonp"  
      });
  	}

  	function getUserInfo() {
      $.ajax({
          url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
          data: null,
          success: function(resp) {
              user    =   resp;
              console.log(user);
              addUserToDB(user);
              //$('#login').text('Welcome ' + user.name);
              //$('#imgHolder').attr('src', user.picture);
          },
          dataType: "jsonp"
      });
  	}

  	function addUserToDB(user) {
  		var xmlhttp = new XMLHttpRequest();
		var url 	= 	'db-handler.php';
		var vars =  'google_id='+user['id']+'&first='+user['given_name']+
						'&last='+user['family_name'];
		xmlhttp.open('POST', url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(vars);
  	}

  	//credits: http://www.netlobo.com/url_query_string_javascript.html
  	function gup(url, name) {
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\#&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      if( results == null )
          return "";
      else
          return results[1];
  	}

  	function startLogoutPolling() {
      $('#loginText').show();
      $('#logoutText').hide();
      loggedIn = false;
      //$('#uName').text('Welcome ');
      //$('#imgHolder').attr('src', 'none.jpg');
  	}



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

	function addTitle(){
		// Get and Print Title
		title = $('#title-box').val();
		title = title.replace(/^\s+/, '').replace(/\s+$/, '');
		document.getElementById("titleComp").innerHTML = title;
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
		addTitle();

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
			// @TODO-1
			factorNames.push(factorText);
			factorList.push(factorInList);
		}

		// Are there factors present?
		if (factorList.length > 0) {
			noFactors = false;
		}
		// If not, create a "shadow" factor to make the code work.
		else {
			$('#question').text("Which of these is better?");
			var defaultFactor = {"name":'default', "weight":'1'};
			factorList.push(defaultFactor);
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
		if (decisionCount == maxDecisions()) {
			progressPercentage = Math.round(100*(decisionCount/maxDecisions()));
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
			
			progressPercentage = Math.round(100*(decisionCount/maxDecisions()));
			var progressMessage = decisionCount + " comparisons made. Decision " +
			"is " + progressPercentage + "% certain.";


			choice1 = optionList[i];
			choice2 = optionList[j];
			decisionFactor = factorList[k]['name'];
		} while (thisDecisionMadeAlready());

		var decisionString = (choice1 + "." + choice2 + "." + decisionFactor);
		console.log("New decision presented: " + decisionString);
		decisions.push(decisionString);
		decisionCount++;

		$("#choice-1").text(choice1);
		$("#choice-2").text(choice2);
		$("#decision-factor").text(decisionFactor+"?");
		$("#choices").show('fast');
		$("#progress-message").text(progressMessage);
		$("#progress-bar").width(progressPercentage+"%");
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
			
			console.log(option + "'s score for " + factorList[f]['name'] + " is " + 
				scores[option][factor]);
			
			sum += parseFloat(scores[option][factor]) * 
				parseFloat(factorList[f]['weight']);
		}
		console.log(option + "'s total score is " + sum);
		finalScores[option] = sum;
		return sum;
	}

	function displayResults() {
		// Clear old data
		$('#result').empty();
		$('#ranked-results').empty();
		$('#certainty-val').empty();

		addTitle();
		
		// Compute and display updated data
		var winnerScore = 0;
		for (var i = 0; i < optionList.length; i++) {
			var appendString = ("<li class='results'>" + 
				optionList[i] + ": " + 
				getTotalScore(optionList[i]) + "</li>");
			$('#ranked-results').append(appendString);
		}
		for (var i = 0; i < optionList.length; i++) {
			if (finalScores[optionList[i]] > winnerScore) {
				winnerResult = optionList[i];
				winnerScore = finalScores[optionList[i]];
			} 
		}
		$("#result").text(winnerResult);
		$('#certainty-val').text(progressPercentage);

		if (decisionCount == maxDecisions()) {
			$('#finish-ranking').hide();
		}

		// alert(optionList);
		// alert(factorList[0]["name"]);
		// alert(scores);
		displayGraph();
	}

	function displayGraph() {
		// Clear old graph
		$('#graph').empty();

		// Construct dataset
		dataset = new Array();
		for (o in optionList) {
			var option = optionList[o];
			var entry = new Array();
			var entryFactorScores = new Array();
			for (f in factorList) {
				var factor = factorList[f]['name'];
				entryFactorScores.push(Math.floor(scores[option][factor]*factorList[f]['weight']));
			}
			entry.push(entryFactorScores);
			entry.push(option);
			console.log(entry);
			dataset.push(entry);
		}

		// Construct colors array
		var colors = new Array();
		for (f in factorList) {
			switch (f%6) {
				case (0):
					colors.push('#282828');
					break;
				case (1):
					colors.push('#494949');
					break;
				case (2):
					colors.push('#6b6b6b');
					break;
				case (3):
					colors.push('#999999');
					break;
				case (4):
					colors.push('#cecece');
					break;
				default:
					colors.push('#efefef');
					break;
			}
		}

		if (noFactors) {
			// Plain graph
			$("#graph").jqBarGraph({
				data: dataset,
				colors: colors,
				width: 960,
				height: 350,
				legendWidth: 200,
				showValues: false,
			});
		} 
		else {
			// Stacked graph
			$("#graph").jqBarGraph({
				data: dataset,
				colors: colors,
				legends: factorNames,
				legend: true,
				width: 960,
				height: 350,
				legendWidth: 200,
				showValues: false,
		 	});
		}
	}

	// When the user clicks "Finish Ranking"
	$('#finish-ranking').click(function() {
		if (decisionCount == maxDecisions()) {
			alert("Ranking is complete.");
			return;	
		}
		presentNewDecision();
		$("#results-ui").hide('slow');
		$("#compare-ui").show('slow');
	});


	//Creates a POST variable that we can use to access DB without reloading page
	$("#rank-action-container").submit(function(event) {
		
		//Stop form from submitting normally
		event.preventDefault();

		//Prepare variables for database

		var optionStr	 	= 	optionList.toString();
		var factorWeights	=	'';
		var scoreString	=	'';
		var finalScoreStr =	'';

		for (var i = 0; i < factorList.length; ++i) {
			factorWeights	+= factorList[i]['weight'].toString()+',';
		}
		factorWeights = factorWeights.substring(0,factorWeights.length-1);
		factorNames = factorNames.toString();
		
		for (var i = 0; i < optionList.length; ++i) {
			for ( var j = 0; j < factorList.length; ++j) {
				scoreString += scores[optionList[i]][factorList[j]['name']] + ',';
			}
			finalScoreStr += finalScores[optionList[i]] + ',';
		}
		scoreString 	= scoreString.substring(0,scoreString.length-1);
		finalScoreStr = finalScoreStr.substring(0,finalScoreStr.length-1); 

		//Store important variables to recreate Rankit
		var xmlhttp = new XMLHttpRequest();
		var url = 	'db-handler.php';
		var vars = 	'winner='+winnerResult+
						'&progressPercentage='+progressPercentage+
						'&optionStr='+optionStr+
						'&factorNames='+factorNames+
						'&factorWeights='+factorWeights+
						'&scoreString='+scoreString+
						'&finalScoreStr='+finalScoreStr;
		console.log(vars);
		xmlhttp.open('POST', url, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(vars);
	});


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