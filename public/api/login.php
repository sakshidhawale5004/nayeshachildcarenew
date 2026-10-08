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
    
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // Hardcoded credentials for the admin dashboard.
    // NOTE: Change these to your preferred username and password.
    $valid_username = 'admin';
    $valid_password = 'admin_password123';

    if ($username === $valid_username && $password === $valid_password) {
        // In a real application, you'd set a secure HTTP-only cookie here.
        echo json_encode(['success' => true, 'token' => 'mock-secure-token']);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
