<?php
require_once 'db.php';
require_once 'auth.php';

function createReply($threadId, $content) {
    global $pdo;
    
    if (!isLoggedIn()) return false;
    
    $stmt = $pdo->prepare("INSERT INTO replies (content, user_id, thread_id) VALUES (?, ?, ?)");
    return $stmt->execute([$content, $_SESSION['user_id'], $threadId]);
}

function getRepliesByThread($threadId, $page = 1, $perPage = 10) {
    global $pdo;
    
    $offset = ($page - 1) * $perPage;
    
    $sql = "SELECT r.*, u.username
            FROM replies r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.thread_id = ?
            ORDER BY r.created_at ASC
            LIMIT $offset, $perPage";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$threadId]);
    return $stmt->fetchAll();
}

function updateReply($replyId, $content) {
    global $pdo;
    
    if (!isLoggedIn()) return false;
    
    // Check if user owns the reply or is admin/moderator
    $reply = getReplyById($replyId);
    if (!$reply || ($reply['user_id'] != $_SESSION['user_id'] && !isModerator())) {
        return false;
    }
    
    $stmt = $pdo->prepare("UPDATE replies SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE reply_id = ?");
    return $stmt->execute([$content, $replyId]);
}

function deleteReply($replyId) {
    global $pdo;
    
    if (!isLoggedIn()) return false;
    
    // Check if user owns the reply or is admin/moderator
    $reply = getReplyById($replyId);
    if (!$reply || ($reply['user_id'] != $_SESSION['user_id'] && !isModerator())) {
        return false;
    }
    
    $stmt = $pdo->prepare("DELETE FROM replies WHERE reply_id = ?");
    return $stmt->execute([$replyId]);
}

function getReplyById($replyId) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM replies WHERE reply_id = ?");
    $stmt->execute([$replyId]);
    return $stmt->fetch();
}
?>