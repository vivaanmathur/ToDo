<?php
 header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$password = $_POST['password'];
$func = $_POST['func'];



function signup($email, $password){

       $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }
    
  

    # First we will check if the user already exists.
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
        print("User already exists.");
        return;
    }
    else{
        # If the user doesn't exist, we will create a new user.
        
            $email    = stripslashes($_REQUEST['email']);
    $password = stripslashes($_REQUEST['password']);
    $email    = mysqli_real_escape_string($conn,$email);
    $password = mysqli_real_escape_string($conn,$password);

    $password = password_hash($password, PASSWORD_BCRYPT);
    $create_datetime = date("Y-m-d H:i:s");
    
        $query = "INSERT INTO users (email, password, create_datetime) VALUES ('$email', '$password', '$create_datetime')";
        $result = $conn->query($query);
        if($result){
            print("Welcome! You were signed up successfully.");
        }
        else{
            print("An unexpected error occured.");
        }
    }

  $conn->close();
  

    

}

function login($email, $password){
    

    $conn = new mysqli("localhost","id18467873_gestapu","1aRcP**u8!8(B+q^","id18467873_gestapo");
    if ($conn->connect_error){
        echo "An unexpected error occured.";
    }

    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($query);
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $hash = $row['password'];
        if(password_verify($password, $hash)){
            print("Welcome! You were logged in successfully.");
        }
        else{
            print("Incorrect password.");
        }
    }
    else{
        print("User does not exist.");
    }

}

if($func=="signup"){
   signup($email, $password);
}
elseif($func=="login"){
login($email, $password);
}
?>