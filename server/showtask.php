<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$taskid = $_POST['taskid'];

function showtask($email, $taskid) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "SELECT * FROM gestapo WHERE Username = '$email' AND ID = '$taskid'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
  $row = $result->fetch_assoc();
  
  
print json_encode($row);
        return;
    }
    else{

            print("No task found. Please create a new task.");
     
    }

  $conn->close();
  

    

}
showtask($email, $taskid);
?>