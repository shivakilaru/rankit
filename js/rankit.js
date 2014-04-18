/* ================================
   ________      __          __    
  / ____/ /___  / /_  ____ _/ /____
 / / __/ / __ \/ __ \/ __ `/ / ___/
/ /_/ / / /_/ / /_/ / /_/ / (__  ) 
\____/_/\____/_.___/\__,_/_/____/  

================================== */

var title;
var winnerResult;
var progressPercentage;

var optionList = new Array();
var noFactors = true;
var factorNames = new Array();
var factorWeights = new Array();	

var decisions = new Array();
var decisionCount = 0;

var scores = {};
var finalScores = {};

var choice1, choice2;
var decisionFactor;



function reloadRankit(in_title, in_winner, in_progressPercentage, in_options, in_noFactors, in_factorNames, in_factorWeights, in_decisions, in_decisionCount, in_scores, in_finalScores) {
	scores = {};
	title = in_title;
	winner = in_winner;
	progressPercentage = parseInt(in_progressPercentage);
	optionList = in_options.split(',');
	if (in_noFactors == '1') noFactors = true;
	else noFactors = false;
	factorNames = in_factorNames.split(',');
	factorWeights = in_factorWeights.split(',');
	decisions = in_decisions.split(',');
	decisionCount = parseInt(in_decisionCount);
	in_scores = in_scores.split(',');

	console.log(optionList);

	for (var i = 0; i< optionList.length; i++) {
		console.log("====UPDATING SCORES FOR NEW PERSON=====: " + i);
		var factorIndex = 0;
		for (var j=(i*factorNames.length); j<((i+1)*factorNames.length); j++) {
			console.log("====UPDATING SCORES FOR NEW FACTOR=====: " + j);
			var option = optionList[i];
			var factor = factorNames[factorIndex];
			var score = in_scores[j];
			if (scores[option] == undefined) {
				scores[option] = {};
			}
			console.log(option + " / " + factor); 
			scores[option][factor] = score;
			console.log(scores);
			factorIndex++;
		}
	}

	finalScores = in_finalScores.split(',');

	displayResults();
	$('#add-ui').hide();
	$("#results-ui").show('slow');
}





/* ================================================================
   _________      __      __  __                ____              
  / ____/ (_)____/ /__   / / / /___ _____  ____/ / /__  __________
 / /   / / / ___/ //_/  / /_/ / __ `/ __ \/ __  / / _ \/ ___/ ___/
/ /___/ / / /__/ ,<    / __  / /_/ / / / / /_/ / /  __/ /  (__  ) 
\____/_/_/\___/_/|_|  /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/  /____/  
                                                                  
 ================================================================ */

$(document).ready(function() {
	// :::::::::::::::::::::::
	// ::                   ::
	// ::     FADE IN       ::
	// ::                   ::
	// :::::::::::::::::::::::
	$('.content-container').removeClass('hidden');

	// :::::::::::::::::::::::
	// ::                   ::
	// ::      LOGIN        ::
	// ::                   ::
	// :::::::::::::::::::::::
	$('#login').click(function() {
		loginClicked();
	});

	// :::::::::::::::::::::::
	// ::                   ::
	// ::      ADD UI       ::
	// ::                   ::
	// :::::::::::::::::::::::
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

	// :::::::::::::::::::::::
	// ::                   ::
	// ::     COMPARE UI    ::
	// ::                   ::
	// :::::::::::::::::::::::
	// When the "Rank!" button is clicked.
	$('#go-rank').click(function() {
		beginDeciding();
	});

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


	// :::::::::::::::::::::::
	// ::                   ::
	// ::    RESULTS UI     ::
	// ::                   ::
	// :::::::::::::::::::::::
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

	// When the user clicks "Save"
	$("#save-rankit").click(function() {
		saveCurrentRankit();
	});

});




/* =========================
    __                _     
   / /   ____  ____ _(_)___ 
  / /   / __ \/ __ `/ / __ \
 / /___/ /_/ / /_/ / / / / /
/_____/\____/\__, /_/_/ /_/ 
            /____/          
========================= */

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

function loginClicked() {
	var win = window.open(_url, "windowname1", 'width=800, height=600'); 
	var pollTimer = window.setInterval(function() { 
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
		} 
		catch(e) {
	  	}
	}, 500);
}

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
	var url = 'db-handler.php';
	var vars = 'google_id='+user['id']+'&first='+user['given_name']+
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

function updateTitle() {
	$('.title').text(title);
}






/* =========================================================
   ______                                         __  ______
  / ____/___  ____ ___  ____  ____ _________     / / / /  _/
 / /   / __ \/ __ `__ \/ __ \/ __ `/ ___/ _ \   / / / // /  
/ /___/ /_/ / / / / / / /_/ / /_/ / /  /  __/  / /_/ // /   
\____/\____/_/ /_/ /_/ .___/\__,_/_/   \___/   \____/___/   
                    /_/                                     
=========================================================== */

function beginDeciding() {
	// Clear arrays.
	title = $('#title-box').val();
	optionList = [];
	factorNames = [];
	factorWeights = [];
	decisions = [];
	decisionCount = 0;
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
		factorNames.push(factorText);
		factorWeights.push(factorWeight);
	}

	// Are there factors present?
	if (factorNames.length > 0) {
		noFactors = false;
	}
	// If not, create a "shadow" factor to make the code work.
	else {
		$('#question').text("Which of these is better?");
		var defaultFactorName = 'default';
		var defaultFactorWeight = 1;
		factorNames.push(defaultFactorName);
		factorWeights.push(defaultFactorWeight);
	}

	// Make factor weights sum to 0.
	normalizeWeights();
	// Print options, factors, and scores to console.
	console.log("Options: " + optionList);
	console.log("Factors:");
	for (f in factorNames) {
		console.log(factorNames[f] + ": " + factorWeights[f]);
	}
	console.log("Scores:");
	// Create score list. All options have a starting score of 500 for each factor.
	for (o in optionList) {
		var option = optionList[o];
		scores[option] = {};
		for (f in factorNames) {
			var factor = factorNames[f];
			scores[option][factor] = 500;
			console.log(option + " in " + factor + ": " + scores[option][factor]);
		}
	}

	// Hide "Add UI", move to "Compare UI".
	$('#add-ui').hide();
	presentNewDecision();
	updateTitle();
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
		var k = Math.floor(Math.random() * factorNames.length);
		
		progressPercentage = Math.round(100*(decisionCount/maxDecisions()));
		var progressMessage = decisionCount + " comparisons made. Decision " +
		"is " + progressPercentage + "% certain.";


		choice1 = optionList[i];
		choice2 = optionList[j];
		decisionFactor = factorNames[k];
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
	for (f in factorNames) {
		var factor = factorNames[f];
		
		console.log(option + "'s score for " + factorNames[f] + " is " + 
			scores[option][factor]);
		
		sum += parseFloat(scores[option][factor]) * 
			parseFloat(factorWeights[f]);
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
	updateTitle();
	$("#result").text(winnerResult);
	$('#certainty-val').text(progressPercentage);

	if (decisionCount == maxDecisions()) {
		$('#finish-ranking').hide();
	}

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
		for (f in factorNames) {
			var factor = factorNames[f];
			entryFactorScores.push(Math.floor(scores[option][factor]*factorWeights[f]));
		}
		entry.push(entryFactorScores);
		entry.push(option);
		console.log(entry);
		dataset.push(entry);
	}

	// Construct colors array
	var colors = new Array();
	for (f in factorNames) {
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
	console.log(optionList.length);
	return (choose(optionList.length, 2) * factorNames.length);	
}

// Make total weight sum to 1
function normalizeWeights() {
	var sum = 0.0;
	for (f in factorNames) {
		sum = parseFloat(sum) + parseFloat(factorWeights[f]);
	}
	for (f in factorNames) {
		factorWeights[f] = 1.0 * factorWeights[f] / sum;
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





/* =======================================================
   _____                     ____              __   _ __ 
  / ___/____ __   _____     / __ \____ _____  / /__(_) /_
  \__ \/ __ `/ | / / _ \   / /_/ / __ `/ __ \/ //_/ / __/
 ___/ / /_/ /| |/ /  __/  / _, _/ /_/ / / / / ,< / / /_  
/____/\__,_/ |___/\___/  /_/ |_|\__,_/_/ /_/_/|_/_/\__/  
                                                         
======================================================= */

// Save to DB via POST without reloading page
function saveCurrentRankit() {
	// Convert Rankit variables to strings for storage in DB.
	var optionStr = optionList.toString();
	var noFactorsStr = noFactors ? 1 : 0;
	var factorNamesStr = factorNames.toString();
	var factorWeightsStr = factorWeights.toString();
	var decisionsStr = decisions.toString();
	var scoresStr = '';
	var finalScoresStr = '';
	
	for (var i = 0; i < optionList.length; ++i) {
		for ( var j = 0; j < factorNames.length; ++j) {
			scoresStr += scores[optionList[i]][factorNames[j]] + ',';
		}
		finalScoresStr += finalScores[optionList[i]] + ',';
	}

	scoresStr = scoresStr.substring(0,scoresStr.length-1);
	finalScoresStr = finalScoresStr.substring(0,finalScoresStr.length-1); 

	// Store important variables to recreate Rankit
	var vars = 	'title='+title+
				'&winner='+winnerResult+
				'&progressPercentage='+progressPercentage+
				'&optionStr='+optionStr+
				'&noFactorsStr='+noFactorsStr+
				'&factorNamesStr='+factorNamesStr+
				'&factorWeightsStr='+factorWeightsStr+
				'&decisionsStr='+decisionsStr+
				'&decisionCount='+decisionCount+
				'&scoresStr='+scoresStr+
				'&finalScoresStr='+finalScoresStr;

	console.log(vars);

	$.ajax({
	    url: 'db-handler.php',
	    data: vars,
	    cache: false,
	    type: 'POST',
	    // dataType: "json",
        contentType: 'application/x-www-form-urlencoded, charset=utf-8',
	    success: function(data){
	 		window.console && console.log("POST success"); 
	    	window.console && console.log(data);
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	        console.log("ERROR: " + jqXHR.responseText);
	    },
	    failure: function(result) {
            console.log("FAILED");
            console.log(result);
        }
	  });

	alert("Rankit saved!");
}
	
