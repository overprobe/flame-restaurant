<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['orders'])) {
    $_SESSION['orders'] = [];
}

// Handle GET: return all orders
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($_SESSION['orders']);
    exit;
}

// Handle POST: save new order
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['items']) || !is_array($input['items'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        exit;
    }

    $order = [
        'timestamp' => date('Y-m-d H:i:s'),
        'items' => $input['items']
    ];

    $_SESSION['orders'][] = $order;

    echo json_encode(['status' => 'success']);
}
?>
