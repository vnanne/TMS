var switchStatus = false;
$('#active_switch').val(switchStatus);

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
$('#customer_Id').val('')
$('#add_contact_name').val('')
$('#add_company_name').val('')
$('#add_phone').val('')
$('#add_email').val('')
$('#add_street1').val('')
$('#add_street2').val('')
$('#add_city').val('')
$('#add_state').val('')
$('#add_zipcode').val('')
$('#add_country').val('')
$('#add_taxId').val('')
$('#add_motor_C').val('')
$('#add_Now').css('display', 'block')
$('#update_Now').css('display', 'none');
})


$('.edit_customer').on('click', function() {
$('#add_Now').css('display', 'none')
$('#update_Now').css('display', 'block')
$("#addnewCustmrModal").modal('show');
var this_tr = $(this).closest('tr');
var this_c_ID = this_tr.find('.c_id').html();
var this_c_Name = this_tr.find('.customer_name').html();
var this_c_c_name = this_tr.find('.customer_c_name').html();
var this_c_tel_num = this_tr.find('.customer_tel_num').html();
var this_c_email = this_tr.find('.customer_email').html();
var this_c_address = this_tr.find('.customer_address').html();
var this_c_taxId = this_tr.find('.customer_taxID').html();
var this_c_motor_c = this_tr.find('.customer_motor_c').html();
var customer_active = this_tr.find('.customer_active').html();

$('#customer_Id').val(this_c_ID)
$('#add_contact_name').val(this_c_Name)
$('#add_company_name').val(this_c_c_name)
$('#add_phone').val(this_c_tel_num)
$('#add_email').val(this_c_email)
$('#add_street1').val(this_c_address.split(',')[0])
$('#add_street2').val(this_c_address.split(',')[1])
$('#add_city').val(this_c_address.split(',')[2])
$('#add_state').val(this_c_address.split(',')[3])
$('#add_zipcode').val(this_c_address.split(',')[5])
$('#add_country').val(this_c_address.split(',')[4])
$('#add_taxId').val(this_c_taxId)
$('#add_motor_C').val(this_c_motor_c)

if(customer_active == 'True'){
$("#active_tgl").prop("checked", true)
$('#active_switch').val('true');
}
else{
$("#active_tgl").prop("checked", false);
$('#active_switch').val('false');
}

});

/*$('#add_Now').click(function(form){
var send_data = form.serialize()
$.ajax({
type: 'post',
url:'/addcustomer/',
data: send_data,
success: function(res){
console.log("success RES", res)
},
error: function(res){
console.log("ERROR RES", res)
}
})
});

function update_Now(form){
var send_data = form.serialize()
console.log(data)
$.ajax({
type: 'post',
url:'/updatecustomer/',
data: send_data,
success: function(res){
console.log("success RES", res)
},
error: function(res){
console.log("ERROR RES", res)
}
})
}*/

//delete Customer warning

$('.delete_customer').click(function(){
$('#Del_WarningModal').modal('show')
var this_tr = $(this).closest('tr');
var this_c_ID = this_tr.find('.c_id').html();
$('#del_customer_id').html(this_c_ID);
})

$('.deleteConfirm').click(function(){
var del_ID = $('#del_customer_id').html();
$.ajax({
type: 'post',
url:'/deletecustomer/',
data: {'customer_Id': del_ID},
success: function(res){
$('#Del_WarningModal').modal('hide');
$('#deleteConfirmModal').modal('show');
$('#response_msg').html(res.msg);
$('#del_customer_id').html('');
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







