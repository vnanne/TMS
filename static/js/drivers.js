$('#licence_issue').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
})
$('#licence_expiry').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
})
$('#dob').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
})
var switchStatus = false;
$('#haz_switch').val(switchStatus);
$('#tank_switch').val(switchStatus);
$('#dual_endors_switch').val(switchStatus);
$('#active_switch').val(switchStatus);

$("#haz_tgl").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#haz_switch').val(switchStatus)
        console.log("line at 23", $('#haz_switch').val())
    }
    else {
       switchStatus = $(this).is(':checked');
       $('#haz_switch').val(switchStatus)
       console.log("line at 28", $('#haz_switch').val())
    }
});

$("#tank_tgl").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#tank_switch').val(switchStatus)
    }
    else {
       switchStatus = $(this).is(':checked');
       $('#tank_switch').val(switchStatus)
    }
});

$("#dual_E_tgl").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#dual_endors_switch').val(switchStatus)
    }
    else {
       switchStatus = $(this).is(':checked');
       $('#dual_endors_switch').val(switchStatus)
    }
});

$("#active_tgl").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#active_switch').val(switchStatus)
    }
    else {
       switchStatus = $(this).is(':checked');
       $('#active_switch').val(switchStatus)
    }
});

$('#close_modal').on('click', function(){
    $('#driver_Id').val('')
    $('#contact_name').val('')
    $('#dob').val('')
    $('#ph_no').val('')
    $('#email').val('')
    $('#street_add_1').val('')
    $('#street_add_2').val('')
    $('#city').val('')
    $('#state').val('')
    $('#zipcode').val('')
    $('#country').val('')
    $('#tax_ID').val('')
    $('#driver_lience').val('')
    $('#licence_issue').val('')
    $('#licence_expiry').val('')
    $('#addNewDriver').css('display', 'block')
    $('#updateDriver').css('display', 'none');
});

//Edit Terminal
$('.edit_driver').on('click', function(){
$('#addnewDriverModal').modal('show');
$('#addNewDriver').css('display', 'none');
$('#updateDriver').css('display', 'block');
var this_tr = $(this).closest('tr');
var driver_id = this_tr.find('.driver_id').html()
var driver_name = this_tr.find('.driver_name').html()
var driver_dob = this_tr.find('.driver_dob').html()
var driver_phone = this_tr.find('.driver_phone').html()
var driver_email = this_tr.find('.driver_email').html()
var driver_address = this_tr.find('.driver_address').html()
var driver_licence = this_tr.find('.driver_licence').html()
var driver_l_issue = this_tr.find('.driver_l_issue').html()
var driver_l_expiry = this_tr.find('.driver_l_expiry').html()
var driver_hazmat = this_tr.find('.driver_hazmat').html()
var driver_dual = this_tr.find('.driver_dual').html()
var driver_tank = this_tr.find('.driver_tank').html()
var driver_active = this_tr.find('.driver_active').html()
var driver_ssn_tax_id = this_tr.find('.driver_ssn_tax_id').html()
$('#driver_Id').val(driver_id)
$('#contact_name').val(driver_name)
$('#dob').val(driver_dob)
$('#ph_no').val(driver_phone)
$('#email').val(driver_email)
$('#street_add_1').val(driver_address.split(',')[0])
$('#street_add_2').val(driver_address.split(',')[1])
$('#city').val(driver_address.split(',')[2])
$('#state').val(driver_address.split(',')[3])
$('#zipcode').val(driver_address.split(',')[5])
$('#country').val(driver_address.split(',')[4])
$('#tax_ID').val(driver_ssn_tax_id)
$('#driver_lience').val(driver_licence)
$('#licence_issue').val(driver_l_issue)
$('#licence_expiry').val(driver_l_expiry)

$('#haz_switch').val(switchStatus);
$('#tank_switch').val(switchStatus);
$('#dual_endors_switch').val(switchStatus);
$('#active_switch').val(switchStatus);
if(driver_hazmat == 'True'){
$("#haz_tgl").prop("checked", true)
$('#haz_switch').val('true');
}
else{
$("#haz_tgl").prop("checked", false);
$('#haz_switch').val('false');
}
if(driver_tank == 'True'){
$("#tank_tgl").prop("checked", true)
$('#tank_switch').val('true');
}
else{
$("#tank_tgl").prop("checked", false);
$('#tank_switch').val('false');
}

if(driver_dual == 'True'){
$("#dual_E_tgl").prop("checked", true)
$('#dual_endors_switch').val('true');
}
else{
$("#dual_E_tgl").prop("checked", false);
$('#dual_endors_switch').val('false');
}

if(driver_active == 'True'){
$("#active_tgl").prop("checked", true)
$('#active_switch').val('true');
}
else{
$("#active_tgl").prop("checked", false);
$('#active_switch').val('false');
}
//$('#zipcode').val(terminal_address.split(',')[4])
//$('#zipcode').val(terminal_address.split(',')[4])
});

//delete Terminal warning

$('.delete_driver').click(function(){
$('#Del_WarningModal').modal('show')
var this_tr = $(this).closest('tr');
var driver_id = this_tr.find('.driver_id').html();
$('#del_driver_id').html(driver_id);
});

$('.deleteConfirm').click(function(){
var del_ID = $('#del_driver_id').html();
$.ajax({
type: 'post',
url:'/deletedriver/',
data: {'driver_Id': del_ID},
success: function(res){
$('#Del_WarningModal').modal('hide');
$('#deleteConfirmModal').modal('show');
$('#response_msg').html(res.msg);
$('#del_driver_id').html('');
},
error: function(res){
console.log("ERROR RES", res)
}
})
});

$('#del_response_close').click(function(){
$('#deleteConfirmModal').modal('hide');
location.reload();
})