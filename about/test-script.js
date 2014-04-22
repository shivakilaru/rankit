$(document).ready(function(){

	//Fade In
	setTimeout(function(){
		$('#logo').toggleClass('hidden')
	}, 200);
	setTimeout(function() {
		$('.animation-container').toggleClass('hidden')
	}, 800);
	
	mixpanel.track("About page loaded.");
		
});