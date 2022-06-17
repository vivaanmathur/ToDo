<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$newtaskname = $_POST['newtaskname'];
$listID = $_POST['listID'];
$description = $_POST['description'];
$dueDate = $_POST['dueDate'];


function newtask($email, $newtaskname, $listID){

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  
            $email    = stripslashes($_REQUEST['email']);
    $newtaskname = stripslashes($_REQUEST['newtaskname']);
    $listID = stripslashes($_REQUEST['listID']);
    $description = stripslashes($_REQUEST['description']);
    $dueDate = stripslashes($_REQUEST['dueDate']);
    $email    = mysqli_real_escape_string($conn,$email);
    $newtaskname = mysqli_real_escape_string($conn,$newtaskname);
    $listID = mysqli_real_escape_string($conn,$listID);
    $description = mysqli_real_escape_string($conn,$newtaskname);
  

    
        $query = "INSERT INTO gestapo (Name, Username, List, Description, DueDate) VALUES ('$newtaskname', '$email', '$listID', '$description', '$dueDate')";
        $result = $conn->query($query);
        if($result){
            print("Task created successfully.");
        }
        else{
            print("An unexpected error occured.");
        }


  $conn->close();
  

    

}
newtask($email, $newtaskname, $listID);
?>