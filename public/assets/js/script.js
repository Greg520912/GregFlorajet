
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




