var switchStatus = false;

$('#active_switch').val(switchStatus);

$(".active_tgl").on('change', function() {
    $('#Del_WarningModal').modal('show')
    var this_tr = $(this).closest('tr');
    var this_c_ID = this_tr.find('.c_id').html();
    $('#del_customer_id').html(this_c_ID);
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        $('#warningText').html("Active");
        $('#actionText').html("ActiveNow");
        $('.active_switch').val(switchStatus)
    }
    else {
       switchStatus = $(this).is(':checked');
        $('#warningText').html("Inactive");
        $('#actionText').html("InactiveNow");
       $('.active_switch').val(switchStatus)
    }
});

$("#add_company_name").keypress(function(e){
    var keyCode = e.which;
    if ( !((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) )&& keyCode != 32 && keyCode != 45) {
      e.preventDefault();
    }
});

$("#add_phone").keypress(function (e) {
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
       e.preventDefault();
    }
});

$('#close_modal').on('click', function(){
/*$('#customer_Id').val('')
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
$('#add_motor_C').val('')*/
$('#addCustomerForm').bootstrapValidator('resetForm', true);
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
var actionText = $('warningText').html();
$.ajax({
type: 'post',
url:'/deletecustomer/',
data: {
    'driver_Id': del_ID,
    'actionStr': actionText
},
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
});



//Form Validation
$('#addCustomerForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            company_name: {
                validators: {
                        stringLength: {
                        min: 2,
                        max:50
                    },
                        notEmpty: {
                        message: ''
                    }
                }
            },
             contact_name: {
                validators: {
                	stringLength: {
                        min: 2,
                        max: 50
                    },
                    notEmpty: {
                        message: ''
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: ''
                    },
                    emailAddress: {
                        message: ''
                    }
                }
            },
            ph_no: {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 12
                    },
                    integer: {
                        message: ''
                    },
                    notEmpty: {
                        message: ''
                    }
                }
            },
            street_add_1: {
                validators: {
                    notEmpty: {
                        message: ''
                    }
                }
            },
            street_add_2: {
                validators: {
                    notEmpty: {
                        message: ''
                    }
                }
            },
            City: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: ''
                    }
                }
            },
            State: {
                validators: {
                    notEmpty: {
                        message: ''
                    }
                }
            },
            Country: {
                validators: {
                    notEmpty: {
                        message: ''
                    }
                }
            },
            Zipcode: {
                validators: {
                    notEmpty: {
                        message: ''
                    },
                    stringLength: {
                        min: 5,
                        max: 6,
                    },
                     integer: {
                        message: ''
                    }
                }
            },
            t_id: {
                validators: {
                      stringLength: {
                        min: 4,
                        message:''
                    },
                    notEmpty: {
                        message: ''
                    }
                }
            },
            Carrier: {
                validators: {
                    notEmpty: {
                        message: ''
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
            e.preventDefault();
            var $form  = $(e.target);
            $form.bootstrapValidator('resetForm', true);
    });






