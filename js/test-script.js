$(document).ready(function(){

	//Fade In
	$('body').hide();
	$('body').fadeIn(1500);
	
	$('.logo').click(
		function () {
			window.location='index.html';
	});
	
	$("#print").hover(
	  function () {
		$('#print-title').animate({
			marginTop: '-50px'},
			180);
	  }, 
	  function () {
		$('#print-title').animate({
			marginTop: '-150px'},
			180);
	  } 
	);
	
	$("#screen").hover(
	  function () {
		$('#screen-title').animate({
			marginTop: '-50px'},
			180);
	  }, 
	  function () {
		$('#screen-title').animate({
			marginTop: '-150px'},
			180);
	  } 
	);
	
	$("#photography").hover(
	  function () {
		$('#photo-title').animate({
			marginTop: '-50px'},
			180);
	  }, 
	  function () {
		$('#photo-title').animate({
			marginTop: '-150px'},
			180);
	  } 
	);
		
});