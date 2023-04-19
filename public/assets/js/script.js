
/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au) and Stéphane Nahmani (sholby@sholby.net). */
jQuery(function($){
	// $.datepicker.regional['fr'] = {
	// 	closeText: 'Fermer',
	// 	prevText: '&#x3c;Préc',
	// 	nextText: 'Suiv&#x3e;',
	// 	currentText: 'Aujourd\'hui',
	// 	monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
	// 	'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
	// 	monthNamesShort: ['Janv','Fevr','Mars','Avri','Mai','Juin',
	// 	'Juil','Aout','Sept','Octo','Nove','Dece'],
	// 	dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	// 	dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
	// 	dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
	// 	weekHeader: 'Sm',
	// 	dateFormat: 'dd/mm/yy',
	// 	firstDay: 1,
	// 	isRTL: false,
	// 	showMonthAfterYear: false,
	// 	yearSuffix: '',
	// 	minDate: '-120Y',
	// 	maxDate: '+12M +0D',
	// 	numberOfMonths: 2,
	// 	showButtonPanel: true
	// 	};
	// $.datepicker.setDefaults($.datepicker.regional['fr']);
});



// FUNCTION RECAPTCHA GOOGLE ////////////////////////////////////////////////////////
function recaptchaCallback(){
    $('#submit_form').show();
    $('#recaptchaValidity').hide();
}
function recaptchaExpired(){
    $('#recaptchaValidity').show();
    $('#submit_form').hide();
}
function onSubmit(token) {
    document.getElementById("booking-form").submit();
}

/////////////////// JQUERY DATEPICKER ///////////////////////////////

$( function() {
    // $( "#h_booking_leaderPas_dtNaissPas" ).datepicker({
    //     changeMonth: true,
    //     changeYear: true,
    //     dateFormat: 'dd/mm/yyyy',
    //     yearRange: "c-120:c"
    // });
} );




