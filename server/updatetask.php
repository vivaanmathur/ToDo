<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$name = $_POST['name'];
$taskid = $_POST['taskid'];
$description = $_POST['description'];
$duedate = $_POST['duedate'];


function updateTask($email, $name, $description, $taskid, $duedate) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "UPDATE gestapo SET Name = '$name', Description = '$description', DueDate = '$duedate' WHERE Username = '$email' AND ID = '$taskid';";
    $result = $conn->query($query);
    if($conn->query($query) === TRUE){
        echo "Updated successfully.";
    }
    else{
        echo "Error.";
    }
   
  

  $conn->close();
  

    

}
updateTask($email, $name, $description, $taskid, $duedate);
?>