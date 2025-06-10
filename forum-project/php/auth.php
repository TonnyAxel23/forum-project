<?php
require_once 'db.php';
session_start();

function registerUser($username, $email, $password) {
    global $pdo;
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);
        return true;
    } catch (PDOException $e) {
        // Handle duplicate username/email
        return false;
    }
}

function loginUser($username, $password) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        return true;
    }
    return false;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function isModerator() {
    return isset($_SESSION['role']) && ($_SESSION['role'] === 'moderator' || $_SESSION['role'] === 'admin');
}

function logoutUser() {
    session_unset();
    session_destroy();
}
?>