<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$listid = $_POST['listid'];

function deletelist($email, $listid) {

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # Delete the list
    $query = "DELETE FROM lists WHERE User = '$email' AND ID = '$listid';";
    $result = $conn->query($query);
    if($conn->query($query) === TRUE){
    # Delete the list items

        $query2 = "DELETE FROM gestapo WHERE List = '$listid' AND Username = '$email';";
        $result2 = $conn->query($query2);
        if($conn->query($query2) === TRUE){
            echo "List deleted successfully.";
        }
        else{
            echo "The list was deleted, but an error occured in deleting the tasks associated with that list. ";
        }
    }
    else{
        echo "This list could not be deleted.";
    }
   
  

  $conn->close();
  

    

}
deletelist($email, $listid);
?>