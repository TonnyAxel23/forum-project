<?php
require_once 'db.php';
require_once 'auth.php';

function banUser($userId, $reason) {
    global $pdo;
    
    if (!isAdmin()) return false;
    
    $stmt = $pdo->prepare("UPDATE users SET banned = TRUE WHERE user_id = ?");
    return $stmt->execute([$userId]);
}

function unbanUser($userId) {
    global $pdo;
    
    if (!isAdmin()) return false;
    
    $stmt = $pdo->prepare("UPDATE users SET banned = FALSE WHERE user_id = ?");
    return $stmt->execute([$userId]);
}

function deleteContent($contentType, $contentId) {
    global $pdo;
    
    if (!isModerator()) return false;
    
    if ($contentType === 'thread') {
        $stmt = $pdo->prepare("DELETE FROM threads WHERE thread_id = ?");
    } elseif ($contentType === 'reply') {
        $stmt = $pdo->prepare("DELETE FROM replies WHERE reply_id = ?");
    } else {
        return false;
    }
    
    return $stmt->execute([$contentId]);
}

function getReportedContent() {
    global $pdo;
    
    if (!isModerator()) return false;
    
    // In a real implementation, you'd have a reports table
    // This is a simplified version
    $sql = "SELECT 'thread' as type, t.thread_id as id, t.title as title, 
            u.username as author, COUNT(r.reply_id) as reports
            FROM threads t
            JOIN users u ON t.user_id = u.user_id
            JOIN reports r ON r.content_type = 'thread' AND r.content_id = t.thread_id
            GROUP BY t.thread_id
            HAVING COUNT(r.reply_id) > 0
            UNION
            SELECT 'reply' as type, r.reply_id as id, 
            SUBSTRING(r.content, 1, 50) as title, u.username as author, 
            COUNT(rep.report_id) as reports
            FROM replies r
            JOIN users u ON r.user_id = u.user_id
            JOIN reports rep ON rep.content_type = 'reply' AND rep.content_id = r.reply_id
            GROUP BY r.reply_id
            HAVING COUNT(rep.report_id) > 0";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}
?>