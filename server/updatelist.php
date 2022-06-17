<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$name = $_POST['name'];
$listid = $_POST['listid'];



function updateList($email, $name, $listid) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "UPDATE lists SET Name = '$name' WHERE User = '$email' AND ID = '$listid';";
    $result = $conn->query($query);
    if($conn->query($query) === TRUE){
        echo "Updated list successfully.";
    }
    else{
        echo "Error.";
    }
   
  

  $conn->close();
  

    

}
updateList($email, $name, $listid);
?>