localStorage.clear();
$('.edit_load').click(function(){
	var $row = $(this).closest("tr");
    var $cus_name =     $row.find(".td_cus_name").text();
    var $i_container =     $row.find(".td_i_container").text();
    var $i_container_size =     $row.find(".td_i_container_size").text();
    var $i_bill_of =     $row.find(".td_i_bill_of").text();
    var $e_container =     $row.find(".td_e_container").text();
    var $e_container_size =     $row.find(".td_e_container_size").text();
    var $loadtype =     $row.find(".td_loadtype").text();
    var $e_booking =         $row.find(".td_e_booking").text();
    var $vessel =         $row.find(".td_vessel").text();
    var $pickup_terminal =          $row.find(".td_pickup_terminal").text();
    var $return_terminal =         $row.find(".td_return_terminal").text();
    var $vessel_eat =         $row.find(".td_vessel_eat").text();
    var $lfd =         $row.find(".td_lfd").text();
    var $port_apt =         $row.find(".td_port_apt").text();
    var $delivert_apt =         $row.find(".td_delivert_apt").text();
    var $dispached =         $row.find(".td_dispached").text();
    var $driver =         $row.find(".td_driver").text();
    var $dispach =         $row.find(".td_dispach").text();
    var $details_Id =         $row.find(".td_details_Id").text();
    var $cus_id =         $row.find(".td_cus_id").text();
    var $po =         $row.find(".td_po").text();
    var $weight =         $row.find(".td_weight").text();
    var $commidty =         $row.find(".td_commidty").text();
    var $customs_hold =         $row.find(".td_customs_hold").text();
    var $over_weight =         $row.find(".td_over_weight").text();
    var $return_terminal_id =         $row.find(".td_return_terminal_id").text();
    var $pickup_terminal_id =         $row.find(".td_pickup_terminal_id").text();
    var $tri_axl =         $row.find(".td_tri_axl").text();
    var $hazmat =         $row.find(".td_hazmat").text();
    var $live =         $row.find(".td_live").text();
    var $cost =         $row.find(".td_cost").text();
    var $addition_cost =         $row.find(".td_addition_cost").text();
    var $remarks =         $row.find(".td_remarks").text();
    var $drop =        $row.find(".td_drop").text();
    var $flat =        $row.find(".td_flat").text();
    var $street =         $row.find(".td_street").text();
    var $street_1 =         $row.find(".td_street_1").text();
    var $city =         $row.find(".td_city").text();
    var $state =         $row.find(".td_state").text();
    var $country =         $row.find(".td_country").text();
    var $zipcode =        $row.find(".td_zipcode").text();
    var $name =        $row.find(".td_name").text();
    var $email =         $row.find(".td_email").text();
    var $tel =         $row.find(".td_tel").text();
    var $website =         $row.find(".td_website").text();
    var $deliveryNotes =         $row.find(".td_deliveryNotes").text();

    var sendTonewload = {
        workorder_id : $details_Id,
        cus_name : $cus_name,
        i_container: $i_container,
        i_container_size: $i_container_size,
        e_container: $e_container,
        e_container_size: $e_container_size,
        i_bill_of: $i_bill_of,
        loadtype: $loadtype,
        e_booking: $e_booking,
        vessel: $vessel,
        pickup_terminal: $pickup_terminal,
        return_terminal: $return_terminal,
        vessel_eat : $vessel_eat,
        lfd: $lfd,
        port_apt: $port_apt,
        delivert_apt: $delivert_apt,
        dispached : $dispached, 
        driver: $driver,
        dispach: $dispach,
        details_Id: $details_Id,
        cus_id: $cus_id,
        po: $po,
        weight: $weight,
        commidty: $commidty,
        customs_hold: $customs_hold,
        over_weight : $over_weight,
        return_terminal_id : $return_terminal_id,
        pickup_terminal_id: $pickup_terminal_id,
        tri_axl: $tri_axl, 
        hazmat: $hazmat,
        live : $live,
        cost : $cost, 
        addition_cost: $addition_cost,
        remarks: $remarks,
        drop: $drop,
        flat: $flat,
        street: $street,
        street_1: $street_1,
        city: $city,
        state: $state,
        country : $country,
        zipcode : $zipcode,
        name : $name,
        email: $email,
        tel : $tel,
        website : $website,
        deliveryNotes : $deliveryNotes
        };

    localStorage.setItem("sendTonewload", JSON.stringify(sendTonewload));
    window.location.href = "/newload";
    localStorage.setItem("fromDashboard", "YES")
})