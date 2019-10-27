$('#close_modal').on('click', function(){
$('#addterminalName').val('')
$('#addTerminal_ph').val('')
$('#addTerminal_email').val('')
$('#addStreet_1').val('')
$('#addStreet_2').val('')
$('#addCity').val('')
$('#addState').val('')
$('#add_zipcode').val('')
$('#add_country').val('')
$('#addNewTerminal').css('display', 'block')
$('#updateTerminal').css('display', 'none');
});

//Edit Terminal
$('.edit_terminal').on('click', function(){
$('#addnewTerminalModal').modal('show');
$('#addNewTerminal').css('display', 'none');
$('#updateTerminal').css('display', 'block');
var this_tr = $(this).closest('tr');
var terminal_id = this_tr.find('.terminal_id').html()
var terminal_name = this_tr.find('.terminal_name').html()
var terminal_phone = this_tr.find('.terminal_phone').html()
var terminal_email = this_tr.find('.terminal_email').html()
var terminal_address = this_tr.find('.terminal_address').html()
$('#terminal_Id').val(terminal_id)
$('#addterminalName').val(terminal_name)
$('#addTerminal_ph').val(terminal_phone)
$('#addTerminal_email').val(terminal_email)
$('#addStreet_1').val(terminal_address.split(',')[0])
$('#addStreet_2').val(terminal_address.split(',')[1])
$('#addCity').val(terminal_address.split(',')[2])
$('#addState').val(terminal_address.split(',')[3])
$('#add_zipcode').val(terminal_address.split(',')[5])
$('#add_country').val(terminal_address.split(',')[4])
});

//delete Terminal warning

$('.delete_terminal').click(function(){
$('#Del_WarningModal').modal('show')
var this_tr = $(this).closest('tr');
var terminal_id = this_tr.find('.terminal_id').html();
$('#del_terminal_id').html(terminal_id);
})

$('.deleteConfirm').click(function(){
var del_ID = $('#del_terminal_id').html();
$.ajax({
type: 'post',
url:'/deleteterminal/',
data: {'terminal_Id': del_ID},
success: function(res){
$('#Del_WarningModal').modal('hide');
$('#deleteConfirmModal').modal('show');
$('#response_msg').html(res.msg);
$('#del_terminal_id').html('');
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