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
    case "GET":
        try {
            $sql = "SELECT sh.SENDER, sh.RECEIVER, sh.timestamp, sh.FILENAME, sh.mttype
                    FROM swiftcontent s
                    JOIN swifthead sh ON s.F20_FK = sh.F20
                    WHERE sh.mttype IN ('940', '950')";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($messages) {
                echo json_encode(['success' => true, 'data' => $messages]);
            } else {
                echo json_encode(['success' => false, 'message' => 'No messages found']);
            }
        } catch (Exception $e) {
            error_log('Error fetching messages: ' . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'An error occurred while fetching messages']);
        }
        break;

}
?>
