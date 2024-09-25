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
        if (isset($_GET['type'])) {
            try {
                switch ($_GET['type']) {
                    case 'monthly_stats':
                        $sql = "SELECT 
                                    MONTH(sh.timestamp) AS month, 
                                    SUM(CASE WHEN sh.mttype IN ('900', '910') THEN 1 ELSE 0 END) AS positive_responses,
                                    SUM(CASE WHEN sh.mttype IN ('196', '296') THEN 1 ELSE 0 END) AS negative_responses
                                FROM swiftcontent s
                                JOIN swifthead sh ON s.F20_FK = sh.F20
                                WHERE YEAR(sh.timestamp) = YEAR(CURRENT_DATE)
                                GROUP BY MONTH(sh.timestamp)";
                        break;
                    case 'daily_stats':
                        $sql = "SELECT 
                                    HOUR(sh.timestamp) AS hour, 
                                    SUM(CASE WHEN sh.mttype IN ('900', '910') THEN 1 ELSE 0 END) AS positive_responses,
                                    SUM(CASE WHEN sh.mttype IN ('196', '296') THEN 1 ELSE 0 END) AS negative_responses
                                FROM swiftcontent s
                                JOIN swifthead sh ON s.F20_FK = sh.F20
                                WHERE DATE(sh.timestamp) = CURDATE()
                                GROUP BY HOUR(sh.timestamp)";
                        break;
                    case 'weekly_stats':
                        $sql = "SELECT 
                                    DAYOFWEEK(sh.timestamp) AS day, 
                                    SUM(CASE WHEN sh.mttype IN ('900', '910') THEN 1 ELSE 0 END) AS positive_responses,
                                    SUM(CASE WHEN sh.mttype IN ('196', '296') THEN 1 ELSE 0 END) AS negative_responses
                                FROM swiftcontent s
                                JOIN swifthead sh ON s.F20_FK = sh.F20
                                WHERE YEARWEEK(sh.timestamp, 1) = YEARWEEK(CURDATE(), 1)
                                GROUP BY DAYOFWEEK(sh.timestamp)";
                        break;
                    case 'yearly_stats':
                        $sql = "SELECT 
                                    YEAR(sh.timestamp) AS year, 
                                    SUM(CASE WHEN sh.mttype IN ('900', '910') THEN 1 ELSE 0 END) AS positive_responses,
                                    SUM(CASE WHEN sh.mttype IN ('196', '296') THEN 1 ELSE 0 END) AS negative_responses
                                FROM swiftcontent s
                                JOIN swifthead sh ON s.F20_FK = sh.F20
                                GROUP BY YEAR(sh.timestamp)";
                        break;
                    default:
                        throw new Exception("Invalid stats type");
                }

                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($messages) {
                    echo json_encode(['success' => true, 'data' => $messages]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'No data found']);
                }
            } catch (Exception $e) {
                error_log('Error fetching stats: ' . $e->getMessage());
                echo json_encode(['success' => false, 'message' => 'An error occurred while fetching stats']);
            }
        } else {
            // L'ancienne logique reste ici
            try {
                $sql = "SELECT s.FIELDNAME, s.VAL, sh.SENDER, sh.RECEIVER, sh.timestamp, sh.FILENAME, sh.mttype
                        FROM swiftcontent s
                        JOIN swifthead sh ON s.F20_FK = sh.F20
                        WHERE sh.mttype IN ('900', '910', '196', '296')";
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
        }
        break;
}
?>
