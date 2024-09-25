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
        if (isset($user->username) && isset($user->password)) {
            $sql = "SELECT * FROM user WHERE code_user = :code_user AND mot_pass = :mot_pass";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':code_user', $user->username);
            $stmt->bindParam(':mot_pass', $user->password);
            $stmt->execute();
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($userData) {
                $response = ['success' => true, 'message' => 'Login successful'];
            } else {
                $response = ['success' => false, 'message' => 'Invalid credentials'];
            }
        } else {
            $response = ['success' => false, 'message' => 'Missing username or password'];
        }

        echo json_encode($response);
    break;

}
?>
