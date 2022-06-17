<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];


function showslists($email){

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "SELECT * FROM lists WHERE User = '$email'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
     // output data of each row
  
  while($row = $result->fetch_assoc()) {
      $rows[] = $row;
  }
print json_encode($rows);
        return;
    }
    else{

            print("No lists. Please create a new list.");
     
    }

  $conn->close();
  

    

}
showslists($email);
?>