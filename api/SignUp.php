<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        if (isset($user->usernameSignUp) && isset($user->dateSignUp) && isset($user->passwordSignUp) && isset($user->emailSignUp)) {
            $sql = "INSERT INTO user (code_user, date_naissance, mot_pass, email) VALUES (:code_user, :date_naissance, :mot_pass, :email)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':code_user', $user->usernameSignUp);
            $stmt->bindParam(':date_naissance', $user->dateSignUp);
            $stmt->bindParam(':mot_pass', $user->passwordSignUp);
            $stmt->bindParam(':email', $user->emailSignUp);
            

            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'User registered successfully'];
            } else {
                $response = ['success' => false, 'message' => 'Registration failed'];
            }
        } else {
            $response = ['success' => false, 'message' => 'Missing username or password'];
        }

        echo json_encode($response);
        break;

}
?>
