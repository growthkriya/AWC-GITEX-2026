<?php
// PHP 7.4+. Store personal data outside the public web root.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
function respond($code, $ok, $message)
{
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(405, false, 'POST required.');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) respond(413, false, 'Request too large.');
function field($key, $max)
{
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) respond(400, false, 'Invalid input.');
    $v = trim($v);
    if (strlen($v) > $max) respond(400, false, 'A field is too long.');
    return $v;
}
if (field('website', 200) !== '') respond(400, false, 'Invalid submission.');
$name = field('name', 120);
$email = field('email', 180);
$company = field('company', 150);
$phone = field('phone', 40);
$interest = field('interest', 100);
$message = field('message', 2000);
$consent = field('consent', 10);
$allowed = ['Enterprise Applications', 'Cloud & Digital Transformation', 'AI & Intelligent Automation', 'Data Analytics & Business Intelligence', 'Digital Engineering', 'Managed IT Services', 'Other'];
if (!$name || !$company || !filter_var($email, FILTER_VALIDATE_EMAIL) || !in_array($interest, $allowed, true) || $consent !== 'yes') respond(422, false, 'Please complete the required fields and consent.');
$dir = getenv('AWC_LEAD_DIR') ?: dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) . DIRECTORY_SEPARATOR . 'awc-private-leads';
if (!is_dir($dir) && !@mkdir($dir, 0700, true)) respond(500, false, 'Unable to save enquiry. Please contact us by email.');
$root = realpath($_SERVER['DOCUMENT_ROOT']);
$real = realpath($dir);
if (!$root || !$real || $real === $root || strpos($real, $root . DIRECTORY_SEPARATOR) === 0) respond(500, false, 'Lead storage configuration error.');
$record = ['id' => bin2hex(random_bytes(12)), 'received_at' => gmdate('c'), 'name' => $name, 'email' => $email, 'company' => $company, 'phone' => $phone, 'interest' => $interest, 'message' => $message, 'consent' => true, 'source' => 'GITEX 2026'];
$file = $real . DIRECTORY_SEPARATOR . 'leads.jsonl';
$line = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE) . PHP_EOL;
if (@file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) respond(500, false, 'Unable to save enquiry. Please contact us by email.');
@chmod($file, 0600);
respond(200, true, 'Thank you! Your enquiry has been received. Our team will be in touch.');
