<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $file = 'requests.json';
    
    $current_data = [];
    if (file_exists($file)) {
        $json_content = file_get_contents($file);
        $current_data = json_decode($json_content, true) ?? [];
    }

    $new_entry = [
        'id' => uniqid(),
        'created_at' => date('c'),
        'parent_name' => $data['parent_name'] ?? '',
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'therapy' => $data['therapy'] ?? '',
        'message' => $data['message'] ?? ''
    ];

    // Prepend the new entry to show newest first
    array_unshift($current_data, $new_entry);

    if (file_put_contents($file, json_encode($current_data, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write to file']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
