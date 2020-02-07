$(document).ready(function() {


  $(".btn-inline .btn").click(function () {
    var this_txt = $(this).find('.inside_txt').html()
    $('#section_title').html(this_txt)
    $(".btn-inline .btn").removeClass("btn-primary").addClass("btn-default");
    $(this).removeClass("btn-default").addClass("btn-primary");
  });

  var getRedirect = localStorage.getItem("fromDashboard");
  if(getRedirect == "YES"){
    var getFromNewload = JSON.parse(localStorage.getItem("sendTonewload"));
    console.log("getFromNewload",getFromNewload)
    if(getFromNewload.loadtype == "import"){
      $("#I_customer_name").val(getFromNewload.cus_name);
      $("#I_customer_id").val(getFromNewload.cus_id)
      $("#I_container_name").val(getFromNewload.i_container)
      $("#I_container_size").val(getFromNewload.i_container_size)
      $("#I_bill_of_landing").val(getFromNewload.i_bill_of)
      $("#I_po_ref").val(getFromNewload.po)
      $("#I_weight").val(getFromNewload.weight)
      $("#I_commodity").val(getFromNewload.commidty)
      $("#I_vessel_name").val(getFromNewload.vessel)
      $("#I_delivery_Location").val(getFromNewload.dispached)
      $("#I_street_add_1").val(getFromNewload.flat)
      $("#I_street_add_2").val(getFromNewload.street)
      $("#I_city").val(getFromNewload.city)
      $("#I_state").val(getFromNewload.state)
      $("#I_zipcode").val(getFromNewload.zipcode)
      $("#I_country").val(getFromNewload.country)
      $("#I_contact_Name").val(getFromNewload.name)
      $("#I_email").val(getFromNewload.email)
      $("#I_tel_no").val(getFromNewload.tel)
      $("#I_website").val(getFromNewload.website)
      $("#I_delivery_notes").val(getFromNewload.deliveryNotes)
      $("#I_cost").val(getFromNewload.cost)
      $("#I_extra_costs").val(getFromNewload.addition_cost)
      $("#I_remarks").val(getFromNewload.remarks);

      if(getFromNewload.vessel_eat != ""){
        var date    = new Date(getFromNewload.vessel_eat),
        yr      = date.getFullYear(),
        month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
        newDate = yr + '-' + month + '-' + day;
        $("#ETA").val(newDate);
      }
      if(getFromNewload.lfd != ""){
        var date    = new Date(getFromNewload.lfd),
        yr      = date.getFullYear(),
        month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
        newDate = yr + '-' + month + '-' + day;
        $("#LFD").val(newDate);
      }
      if(getFromNewload.port_apt != ""){
        var date    = new Date(getFromNewload.port_apt),
        yr      = date.getFullYear(),
        month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
        newDate = yr + '-' + month + '-' + day;
        $("#PortAPT").val(newDate);
      }
      if(getFromNewload.delivert_apt != ""){
        var date    = new Date(getFromNewload.delivert_apt),
        yr      = date.getFullYear(),
        month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
        day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
        newDate = yr + '-' + month + '-' + day;
        $("#I_delivery_Appointment").val(newDate);
      }

      if(getFromNewload.customs_hold == 'True'){
      $(".I_c_hold_tgl").prop("checked", true)
      $('.I_customs_hold_switch').val('true');
      }
      else{
      $(".I_c_hold_tgl").prop("checked", false);
      $('.I_customs_hold_switch').val('false');
      }

      if(getFromNewload.tri_axl == 'True'){
      $(".I_tri_axle_tgl").prop("checked", true)
      $('.I_tri_axle_switch').val('true');
      }
      else{
      $(".I_tri_axle_tgl").prop("checked", false);
      $('.I_tri_axle_switch').val('false');
      }

      if(getFromNewload.over_weight == 'True'){
      $(".I_over_weight_tgl").prop("checked", true)
      $('.I_over_weight_switch').val('true');
      }
      else{
      $(".I_over_weight_tgl").prop("checked", false);
      $('.I_over_weight_switch').val('false');
      }

      if(getFromNewload.hazmat == 'True'){
      $(".I_hazmat_tgl").prop("checked", true)
      $('.I_hazmat_switch').val('true');
      }
      else{
      $(".I_hazmat_tgl").prop("checked", false);
      $('.I_hazmat_switch').val('false');
      }

      if(getFromNewload.live == 'True'){
      $(".I_live_tgl").prop("checked", true)
      $('.I_live_switch').val('true');
      }
      else{
      $(".I_live_tgl").prop("checked", false);
      $('.I_live_switch').val('false');
      }

      if(getFromNewload.drop == 'True'){
      $(".I_drop_pick_tgl").prop("checked", true)
      $('.I_drop_pick_switch').val('true');
      }
      else{
      $(".I_drop_pick_tgl").prop("checked", false);
      $('.I_drop_pick_switch').val('false');
      }

    }else{
        $(".btn-inline .btn#exp_link" ).trigger( "click" );
        $("#customer_name").val(getFromNewload.cus_name);
        $("#customer_id").val(getFromNewload.cus_id)
        $("#container_name").val(getFromNewload.e_container)
        $("#container_size").val(getFromNewload.e_container_size)
        $("#booking").val(getFromNewload.e_booking)
        $("#po_ref").val(getFromNewload.po)
        $("#weight").val(getFromNewload.weight)
        $("#commodity").val(getFromNewload.commidty)
        $("#vessel_name").val(getFromNewload.vessel)
        $("#delivery_Location").val(getFromNewload.dispached)
        $("#street_add_1").val(getFromNewload.flat)
        $("#street_add_2").val(getFromNewload.street)
        $("#city").val(getFromNewload.city)
        $("#state").val(getFromNewload.state)
        $("#zipcode").val(getFromNewload.zipcode)
        $("#country").val(getFromNewload.country)
        $("#contact_Name").val(getFromNewload.name)
        $("#email").val(getFromNewload.email)
        $("#tel_no").val(getFromNewload.tel)
        $("#website").val(getFromNewload.website)
        $("#delivery_notes").val(getFromNewload.deliveryNotes)
        $("#cost").val(getFromNewload.cost)
        $("#extra_costs").val(getFromNewload.addition_cost)
        $("#remarks").val(getFromNewload.remarks)

        if(getFromNewload.vessel_eat != ""){
          var date    = new Date(getFromNewload.vessel_eat),
          yr      = date.getFullYear(),
          month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
          day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
          newDate = yr + '-' + month + '-' + day;
          $("#E_ETD").val(newDate);
        }
        if(getFromNewload.lfd != ""){
          var date    = new Date(getFromNewload.lfd),
          yr      = date.getFullYear(),
          month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
          day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
          newDate = yr + '-' + month + '-' + day;
          $("#E_Cut-OFF").val(newDate);
        }
        if(getFromNewload.port_apt != ""){
          var date    = new Date(getFromNewload.port_apt),
          yr      = date.getFullYear(),
          month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
          day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
          newDate = yr + '-' + month + '-' + day;
          $("#E_PortAPT").val(newDate);
        }
        if(getFromNewload.delivert_apt != ""){
          var date    = new Date(getFromNewload.delivert_apt),
          yr      = date.getFullYear(),
          month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
          day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
          newDate = yr + '-' + month + '-' + day;
          $("#pickup_Appointment").val(newDate);
        }

        if(getFromNewload.customs_hold == 'True'){
        $(".c_hold_tgl").prop("checked", true)
        $('.customs_hold_switch').val('true');
        }
        else{
        $(".c_hold_tgl").prop("checked", false);
        $('.customs_hold_switch').val('false');
        }

        if(getFromNewload.tri_axl == 'True'){
        $(".tri_axle_tgl").prop("checked", true)
        $('.tri_axle_switch').val('true');
        }
        else{
        $(".tri_axle_tgl").prop("checked", false);
        $('.tri_axle_switch').val('false');
        }

        if(getFromNewload.over_weight == 'True'){
        $(".over_weight_tgl").prop("checked", true)
        $('.over_weight_switch').val('true');
        }
        else{
        $(".over_weight_tgl").prop("checked", false);
        $('.over_weight_switch').val('false');
        }

        if(getFromNewload.hazmat == 'True'){
        $(".hazmat_tgl").prop("checked", true)
        $('.hazmat_switch').val('true');
        }
        else{
        $(".hazmat_tgl").prop("checked", false);
        $('.hazmat_switch').val('false');
        }

        if(getFromNewload.live == 'True'){
        $(".live_tgl").prop("checked", true)
        $('.live_switch').val('true');
        }
        else{
        $(".live_tgl").prop("checked", false);
        $('.live_switch').val('false');
        }

        if(getFromNewload.drop == 'True'){
        $(".drop_pick_tgl").prop("checked", true)
        $('.drop_pick_switch').val('true');
        }
        else{
        $(".drop_pick_tgl").prop("checked", false);
        $('.drop_pick_switch').val('false');
        }
    }
    onload()
    localStorage.setItem("fromDashboard", "NO");
  }else{
    onload()
    localStorage.setItem("fromDashboard", "NO");
  }

  /************ONLOAD**************/
   function onload(){
      //Get Terminals :: START
      $.ajax({
        type: 'get',
        url:'/getPickupTerminals/',
        data: {
          'Terminal_Type': "Pickup"
        },
        success: function(result){
          var array_imp = result.res;
          for(var i=0; i<array_imp.length; i++){
             $('#I_pickup_terminal').append('<option value=' + array_imp[i].id + '>' + array_imp[i].terminal_name + '</option>');
             $('#I_return_terminal').append('<option value=' + array_imp[i].id + '>' + array_imp[i].terminal_name + '</option>');
             //Export
             $('#pickup_terminal').append('<option value=' + array_imp[i].id + '>' + array_imp[i].terminal_name + '</option>');
             $('#return_terminal').append('<option value=' + array_imp[i].id + '>' + array_imp[i].terminal_name + '</option>');
          }
        },
        error: function(res){
        console.log("ERROR RES", res)
        }
      });
    }
    //Get Terminals :: END

/********************************Import Customer ID Search Start ******************************/
  var searchRequest = null;
  var minlength = 3;
    $("#I_customer_name").keyup(function () {
      $('#I_result').html('');
        var that = this,
        value = $(this).val();
        if (value.length >= minlength ) {
          if (searchRequest != null)
              searchRequest.abort();
              searchRequest = $.ajax({
              type: "get",
              url: "getCustomerId/",
              data: {
                'search_keyword' : value
              },
              success: function(result){
                var get_c = result.res
                $.each(get_c, function(key, value){
                  $('#I_result').append('<li class="list-group-item link-class">'+value.id+' - '+value.customer_name+'</li>');
                })
              },
              error: function(err){
                console.log("ERROR RES", err)
              }
          });
        }
    });

    $('#I_result').on('click', 'li', function() {
      var this_ = $(this).text();
      $('#I_customer_id').val(this_.split(' - ')[0]);
      $('#I_customer_name').val(this_.split(' - ')[1]);
      $("#I_result").html('');
    });


   /********************************Import Customer ID Search END ******************************/

       /*******************************Export Customer ID Search Start ******************************/
  var searchRequest = null;
  var minlength = 3;
    $("#customer_name").keyup(function () {
      $('#E_result').html('');
        var that = this,
        value = $(this).val();
        if (value.length >= minlength ) {
          if (searchRequest != null)
              searchRequest.abort();
              searchRequest = $.ajax({
              type: "get",
              url: "getCustomerId/",
              data: {
                'search_keyword' : value
              },
              success: function(result){
                var get_c = result.res
                $.each(get_c, function(key, value){
                  $('#E_result').append('<li class="list-group-item link-class">'+value.id+' - '+value.customer_name+'</li>');
                })
              },
              error: function(err){
                console.log("ERROR RES", err)
              }
          });
        }
    });

    $('#E_result').on('click', 'li', function() {
      var this_ = $(this).text();
      $('#customer_id').val(this_.split(' - ')[0]);
      $('#customer_name').val(this_.split(' - ')[1]);
      $("#E_result").html('');
    });
    /********************************Export Customer ID Search END *****************************/

    /*******************************Switch Toggle Start ******************************/
    var switchStatus = false;

    //IMPORT SWITCH TOGGLE
    $('.I_customs_hold_switch').val(switchStatus);
    $('.I_tri_axle_switch').val(switchStatus);
    $('.I_hazmat_switch').val(switchStatus);
    $('.I_over_weight_switch').val(switchStatus);
    $('.I_live_switch').val(switchStatus);
    $('.I_drop_pick_switch').val(switchStatus);

    $(".I_c_hold_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_customs_hold_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_customs_hold_switch').val(switchStatus)
        }
    });

    $(".I_tri_axle_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_tri_axle_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_tri_axle_switch').val(switchStatus)
        }
    });
    $(".I_hazmat_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_hazmat_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_hazmat_switch').val(switchStatus)
        }
    });
    $(".I_over_weight_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_over_weight_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_over_weight_switch').val(switchStatus)
        }
    });

    $(".I_live_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_live_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_live_switch').val(switchStatus)
        }
    });

    $(".drop_pick_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.I_drop_pick_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.I_drop_pick_switch').val(switchStatus)
        }
    });

    //IMPORT TOGGLE :: END

    //EXPORT SWITCH TOGGLE
    $('.customs_hold_switch').val(switchStatus);
    $('.tri_axle_switch').val(switchStatus);
    $('.hazmat_switch').val(switchStatus);
    $('.over_weight_switch').val(switchStatus);
    $('.live_switch').val(switchStatus);
    $('.drop_pick_switch').val(switchStatus);

    $(".c_hold_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.customs_hold_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           console.log("ELSE", switchStatus);
           $('.customs_hold_switch').val(switchStatus)
        }
    });

    $(".tri_axle_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.tri_axle_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.tri_axle_switch').val(switchStatus)
        }
    });
    $(".hazmat_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.hazmat_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.hazmat_switch').val(switchStatus)
        }
    });
    $(".over_weight_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.over_weight_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.over_weight_switch').val(switchStatus)
        }
    });

    $(".live_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.live_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.live_switch').val(switchStatus)
        }
    });

    $(".drop_pick_tgl").on('change', function() {
        if ($(this).is(':checked')) {
            switchStatus = $(this).is(':checked');
            $('.drop_pick_switch').val(switchStatus)
        }
        else {
           switchStatus = $(this).is(':checked');
           $('.drop_pick_switch').val(switchStatus)
        }
    });
    //EXPORT TOGGLE :: END

   /********************************Switch Toggle END ******************************/

  $('.floating-placeholder input').keyup(function() {
  var input = $(this).val();
  if(input) $(this).parent().addClass('float');
  else $(this).parent().removeClass('float');
  });

  var labels = $('.floating-placeholder label');
  labels.each(function(i) {
    var ph = $(labels[i])
    .siblings('input')
    .first()
    .attr('placeholder');
    $(labels[i]).html(ph);
  });


  $('#ETA').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
  });
  $('#LFD').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
  })
  $('#PortAPT').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
  })
  $('#I_delivery_Appointment').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
  })

   $('#E_ETD').datepicker({
      autoclose: true,
      format: 'yyyy-mm-dd'
    });
    $('#E_Cut-OFF').datepicker({
       autoclose: true,
       format: 'yyyy-mm-dd'
    })
    $('#E_PortAPT').datepicker({
       autoclose: true,
       format: 'yyyy-mm-dd'
    })
    $('#pickup_Appointment').datepicker({
     autoclose: true,
     format: 'yyyy-mm-dd'
    })


// THE SCRIPT THAT CHECKS IF THE KEY PRESSED IS A NUMERIC OR DECIMAL VALUE.
    //     $('.floatValue').keypress(function (event) {
    //         return isNumber(event, this)
    //     });
    // function isNumber(evt, element) {
    //     var charCode = (evt.which) ? evt.which : event.keyCode
    //     if (
    //         (charCode != 46 || $(element).val().indexOf('.') != -1) && // Check dot and only once.
    //         (charCode < 48 || charCode > 57))
    //         return false;
    //     return true;
    // }
    $(".floatValue").on("keyup", function(){
      var valid = /^\d{0,4}(\.\d{0,2})?$/.test(this.value),
      val = this.value;
      if(!valid){
          alert("Allow only float type!");
          this.value = val.substring(0, val.length - 1);
      }
    });

    // validate IMPORT form on keyup and submit

    jQuery.validator.addMethod("alphanumeric", function(value, element) {
      return this.optional(element) || /^[a-z0-9\\]+$/i.test(value);
    }, "Letters and numbers only please");

    $("#importForm").validate({
      rules: {
        I_customer_id: "required",
        I_container_name: {
          required: true,
          alphanumeric: true,
          maxlength: 11
        },
        I_container_size: "required",
        I_bill_of_landing: {
          required: true,
          alphanumeric: true,
          maxlength: 30
        },
        I_po_ref: {
          required: true,
          maxlength: 30
        }, //changed I_po&ref to I_po_ref ('not change in backend')
        I_weight: {
          required: true,
          alphanumeric: true,
          maxlength: 15
        },
        I_commodity: {
          required: true,
          maxlength: 150
        },
        I_vessel_name: {
          required: true,
          alphanumeric: true,
          maxlength: 120
        },
        I_pickup_terminal: "required",
        I_return_terminal: "required",
        ETA: "required",
        LFD: "required",
        I_PortAPT: "required",
        I_delivery_Appointment: "required",
        I_delivery_Location: {
          required: true,
          maxlength: 50
        },
        I_street_add_1: {
          required: true,
          maxlength: 50
        },
        I_street_add_2:{
          required: true,
          maxlength: 50
        },
        I_city: {
          required: true,
          maxlength: 50
        },
        I_state: {
          required: true,
          maxlength: 50
        },
        I_zipcode: {
          required: true,
          digits:true,
          maxlength: 6
        },
        I_country: {
          required: true,
          maxlength: 50
        },
        I_contact_Name: {
          required: true,
          maxlength: 20
        },
        I_email: {
          required: true,
          email: true,
          maxlength: 70
        },
        I_tel_no: {
          required: true,
          digits:true,
          maxlength: 12
        },
        I_website:{
          required: true,
          url: true
        },
        I_delivery_notes:{
          required: true,
          maxlength: 250
        },
        I_cost: {
          required: true
          // maxlength: 250
        },
        I_extra_costs: "required",
        I_remarks: {
          required: true,
          maxlength: 250
        },
      },
      messages: {
        I_customer_id: {
          required: "Please enter customer id"
        },
        I_container_name: {
          required: "Please enter container name",
          maxlength: "Please enter no more than 11 characters"
        },
        I_container_size:{
          required: "Select a container size"
        },
        I_bill_of_landing:{
          required: "Please enter bill of landing",
          maxlength: "Please enter no more than 30 characters"
        },
        I_po_ref: {
          required: "Please enter po&ref",
          maxlength: "Please enter no more than 30 characters"
        }, //changed I_po&ref to I_po_ref ('not change in backend')
        I_weight:{
          required: "Please enter weight",
          maxlength: "Please enter no more than 15 characters"
        },
        I_commodity: {
          required: "Please enter commodity",
          maxlength: "Please enter no more than 150 characters"
        },
        I_vessel_name: {
          required: "Please enter vessel name",
          maxlength: "Please enter no more than 120 characters"
        },
        I_pickup_terminal: {
          required: "Select a pickup terminal"
        },
        I_return_terminal: {
          required: "Select a return terminal"
        },
        ETA:{
          required: "Select ETA date"
        },
        LFD: {
          required: "Select LFD date"
        },
        I_PortAPT: {
          required: "Select port APT date"
        },
        I_delivery_Appointment:{
          required: "Select delivery appointment date"
        },
        I_delivery_Location: {
          required: "Please enter delivery location",
          maxlength: "Please enter no more than 50 characters"
        },
        I_street_add_1:{
          required: "Please enter house number",
          maxlength: "Please enter no more than 50 characters"
        },
        I_street_add_2:{
          required: "Please enter street address",
          maxlength: "Please enter no more than 50 characters"
        },
        I_city: {
          required: "Please enter city",
          maxlength: "Please enter no more than 50 characters"
        },
        I_state:{
          required: "Please enter state",
          maxlength: "Please enter no more than 50 characters"
        },
        I_zipcode:{
          required: "Please enter zipcode",
          digits: "please enter 6 digits only",
          maxlength: "Please enter no more than 6 characters"
        },
        I_country: {
          required: "Please enter country",
          maxlength: "Please enter no more than 50 characters"
        },
        I_contact_Name:{
          required: "Please enter contact name",
          maxlength: "Please enter no more than 20 characters"
        },
        I_email: {
          required: "Please enter a email address",
          email: "Please enter in a valid email format",
          maxlength: "Please enter no more than 70 characters"
        },
        I_tel_no: {
          required: "Please enter telephone number",
          maxlength: "Please enter no more than 12 characters"
        },
        I_website:{
          required: "Please enter website",
          url: "please enter a valid URL"
        },
        I_delivery_notes:{
          required: "Please enter delivery notes",
          maxlength: "Please enter no more than 250 characters"
        },
        I_cost:{
          required: "Please enter cost"
        },
        I_extra_costs: {
          required: "Please enter extra costs"
        },
        I_remarks:{
          required: "Please enter remarks",
          maxlength: "Please enter no more than 50 characters"
        }
      }
    });


    // validate EXPORT form on keyup and submit
    $("#exportForm").validate({
      rules: {
        customer_id: "required",
        container_name: {
          required: true,
          alphanumeric: true,
          maxlength: 11
        },
        container_size: "required",
        booking: {
          required: true,
          alphanumeric: true,
          maxlength: 30
        },
        po_ref: {
          required: true,
          maxlength: 30
        }, //changed I_po&ref to I_po_ref ('not change in backend')
        weight: {
          required: true,
          alphanumeric: true,
          maxlength: 15
        },
        commodity: {
          required: true,
          maxlength: 150
        },
        vessel_name: {
          required: true,
          alphanumeric: true,
          maxlength: 120
        },
        SSL: "required",
        pickup_terminal: "required",
        return_terminal: "required",
        ETD: "required",
        Cut_OFF: "required",
        PortAPT: "required",
        pickup_Appointment: "required",
        delivery_Location: {
          required: true,
          maxlength: 50
        },
        street_add_1: {
          required: true,
          maxlength: 50
        },
        street_add_2:{
          required: true,
          maxlength: 50
        },
        city: {
          required: true,
          maxlength: 50
        },
        state: {
          required: true,
          maxlength: 50
        },
        zipcode: {
          required: true,
          digits:true,
          maxlength: 6
        },
        country: {
          required: true,
          maxlength: 50
        },
        contact_Name: {
          required: true,
          maxlength: 20
        },
        email: {
          required: true,
          email: true,
          maxlength: 70
        },
        tel_no: {
          required: true,
          digits:true,
          maxlength: 12
        },
        website:{
          required: true,
          url: true
        },
        delivery_notes:{
          required: true,
          maxlength: 250
        },
        cost: {
          required: true
          // maxlength: 250
        },
        extra_costs: "required",
        remarks: {
          required: true,
          maxlength: 250
        },
      },
      messages: {
        customer_id: {
          required: "Please enter customer id"
        },
        container_name: {
          required: "Please enter container name",
          maxlength: "Please enter no more than 11 characters"
        },
        container_size:{
          required: "Select a container size"
        },
        booking:{
          required: "Please enter bill of landing",
          maxlength: "Please enter no more than 30 characters"
        },
        po_ref: {
          required: "Please enter po&ref",
          maxlength: "Please enter no more than 30 characters"
        }, //changed I_po&ref to I_po_ref ('not change in backend')
        weight:{
          required: "Please enter weight",
          maxlength: "Please enter no more than 15 characters"
        },
        commodity: {
          required: "Please enter commodity",
          maxlength: "Please enter no more than 150 characters"
        },
        vessel_name: {
          required: "Please enter vessel name",
          maxlength: "Please enter no more than 120 characters"
        },
        SSL: {
          required: "Select a SSL"
        },
        pickup_terminal: {
          required: "Select a pickup terminal"
        },
        return_terminal: {
          required: "Select a return terminal"
        },
        ETD:{
          required: "Select ETA date"
        },
        Cut_OFF: {
          required: "Select LFD date"
        },
        PortAPT: {
          required: "Select port APT date"
        },
        pickup_Appointment:{
          required: "Select delivery appointment date"
        },
        delivery_Location: {
          required: "Please enter delivery location",
          maxlength: "Please enter no more than 50 characters"
        },
        street_add_1:{
          required: "Please enter house number",
          maxlength: "Please enter no more than 50 characters"
        },
        street_add_2:{
          required: "Please enter street address",
          maxlength: "Please enter no more than 50 characters"
        },
        city: {
          required: "Please enter city",
          maxlength: "Please enter no more than 50 characters"
        },
        state:{
          required: "Please enter state",
          maxlength: "Please enter no more than 50 characters"
        },
        zipcode:{
          required: "Please enter zipcode",
          digits: "please enter 6 digits only",
          maxlength: "Please enter no more than 6 characters"
        },
        country: {
          required: "Please enter country",
          maxlength: "Please enter no more than 50 characters"
        },
        contact_Name:{
          required: "Please enter contact name",
          maxlength: "Please enter no more than 20 characters"
        },
        email: {
          required: "Please enter a email address",
          email: "Please enter in a valid email format",
          maxlength: "Please enter no more than 70 characters"
        },
        tel_no: {
          required: "Please enter telephone number",
          maxlength: "Please enter no more than 12 characters"
        },
        website:{
          required: "Please enter website",
          url: "please enter a valid URL"
        },
        delivery_notes:{
          required: "Please enter delivery notes",
          maxlength: "Please enter no more than 250 characters"
        },
        cost:{
          required: "Please enter cost"
        },
        extra_costs: {
          required: "Please enter extra costs"
        },
        remarks:{
          required: "Please enter remarks",
          maxlength: "Please enter no more than 50 characters"
        }

      }
    });







});