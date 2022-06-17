<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$newlistname = $_POST['newlistname'];



function newlist($email, $newlistname){

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the list name already exists
    $query = "SELECT * FROM lists WHERE Name = '$newlistname' AND User = '$email'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
        print("A list with this name already exists. Please try again.");
        return;
    }
    else{
        # If the list name doesn't exist, we will create a new list name.
        
            $email    = stripslashes($_REQUEST['email']);
    $newlistname = stripslashes($_REQUEST['newlistname']);
    $email    = mysqli_real_escape_string($conn,$email);
    $newlistname = mysqli_real_escape_string($conn,$newlistname);


    
        $query = "INSERT INTO lists (Name, User) VALUES ('$newlistname', '$email')";
        $result = $conn->query($query);
        if($result){
            print("List created successfully.");
        }
        else{
            print("An unexpected error occured.");
        }
    }

  $conn->close();
  

    

}
newlist($email, $newlistname);
?>