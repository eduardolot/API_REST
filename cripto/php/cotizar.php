<?php
if($_SERVER['REQUEST_METHOD']=="POST"){
    $moneda=$_POST['moneda'];
    if(empty($moneda)){
        http_response_code(400);
        echo "Por favor selecciona una opción";
        exit;
    }
    else{
        $data = json_decode( file_get_contents('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms='.$moneda), true );
    foreach($data as $key => $val){
        echo $key." ".$val;
    }
    }
    
}


?>