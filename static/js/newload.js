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

});