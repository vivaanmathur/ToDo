<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$listid = $_POST['listid'];

function showlist($email, $listid) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "SELECT * FROM lists WHERE User = '$email' AND ID = '$listid'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
  $row = $result->fetch_assoc();
  
  
print json_encode($row);
        return;
    }
    else{

            print("No list found.");
     
    }

  $conn->close();
  

    

}
showlist($email, $listid);
?>