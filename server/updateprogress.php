<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$taskid = $_POST['taskid'];
$progress = $_POST['progress'];

function changeProgress($email, $taskid, $progress) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "UPDATE gestapo SET PROGRESS = $progress WHERE Username = '$email' AND ID = '$taskid';";
    $result = $conn->query($query);
    if($conn->query($query) === TRUE){
        echo "Progress updated successfully.";
    }
    else{
        echo "Error.";
    }
   
  

  $conn->close();
  

    

}
changeProgress($email, $taskid, $progress);
?>