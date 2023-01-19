<?php
header("Content-Type:text/html;charset=utf-8");
require_once("../../db/db_connect.php");

$favorites = isset($_POST['favorites']) ? $_POST['favorites'] : array();
$eName = isset($_POST['eName']) ? trim($_POST['eName']) : '';
$birthDateY = isset($_POST['birthDateY']) ? trim($_POST['birthDateY']) : '';
$birthDateM = isset($_POST['birthDateM']) ? trim($_POST['birthDateM']) : '';
$birthDateD = isset($_POST['birthDateD']) ? trim($_POST['birthDateD']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phoneNumber  = isset($_POST['phoneNumber']) ? trim($_POST['phoneNumber']) : '';
$sex = isset($_POST['sex']) ? trim($_POST['sex']) : '';
$ageBracket = isset($_POST['ageBracket']) ? trim($_POST['ageBracket']) : '';
$educationLevel = isset($_POST['educationLevel']) ? trim($_POST['educationLevel']) : '';
// $address = isset($_POST['address']) ? trim($_POST['address']) : '';
$jobPosition = isset($_POST['jobPosition']) ? trim($_POST['jobPosition']) : '';
$industry = isset($_POST['industry']) ? trim($_POST['industry']) : '';
$monthlyIncome   = isset($_POST['monthlyIncome']) ? trim($_POST['monthlyIncome']) : '';
$familyMonthlyIncome   = isset($_POST['familyMonthlyIncome']) ? trim($_POST['familyMonthlyIncome']) : '';
$interests = isset($_POST['interests']) ? $_POST['interests'] : array();
$addition = isset($_POST['addition']) ? trim($_POST['addition']) : '';
$doNotPromote = isset($_POST['doNotPromote']) ? trim($_POST['doNotPromote']) : 'N';

if ($birthDateY == '' || $birthDateM == '' || $birthDateD == '') {
  $birthDate = '';
} else {
  $birthDate = $birthDateY . '/' . $birthDateM . '/' . $birthDateD;
}

//判断
$messages = '';
$delimiter = "|";
if (empty($favorites)) {
  $messages .= '請選擇您較喜愛的雜誌' . $delimiter;
}
if ($eName == '') {
  $messages .= '請輸入你的英文姓名' . $delimiter;
}
if (empty($birthDate)) {
  $messages .= '請選擇您出生日期' . $delimiter;
}
if ($email == '') {
  $messages .= '請輸入正確的電郵地址' . $delimiter;
}
if (!preg_match("/(^([A-Za-z0-9]+[-_.]?)+[A-Za-z0-9]+)@(([A-Za-z0-9]+[-_.])+([A-Za-z0-9]+)$)/", $email)) {
  $messages .= '請輸入正確的電郵地址' . $delimiter;
}
if ($phoneNumber == '') {
  $messages .= '請輸入正確的手機號碼' . $delimiter;
}
if (!preg_match("/\d{8}/", $phoneNumber) || strlen($phoneNumber) != 8) {
  $messages .= '請輸入正確的手機號碼' . $delimiter;
}
if (empty($sex)) {
  $messages .= '請選擇您的性别' . $delimiter;
}
if (empty($ageBracket)) {
  $messages .= '請選擇您的年齡' . $delimiter;
}
if (empty($educationLevel)) {
  $messages .= '請選擇您的教育程度' . $delimiter;
}
if (empty($industry)) {
  $messages .= '請選擇您的行業' . $delimiter;
}
if (empty($monthlyIncome)) {
  $messages .= '請選擇您的月薪收入' . $delimiter;
}
if (empty($interests)) {
  $message .= '請選擇您感興趣的資訊' . $delimiter;
}

if ($messages == '') {
  $strSP = "{call OMG_Event.dbo.[usp_WebEditClubMingMember](?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
  $strParam = array(
    array(join(',', $favorites), SQLSRV_PARAM_IN),
    array($eName, SQLSRV_PARAM_IN),
    array($birthDate, SQLSRV_PARAM_IN),
    array($email, SQLSRV_PARAM_IN),
    array($phoneNumber, SQLSRV_PARAM_IN),
    array($sex, SQLSRV_PARAM_IN),
    array($ageBracket, SQLSRV_PARAM_IN),
    array($educationLevel, SQLSRV_PARAM_IN),
    array($jobPosition, SQLSRV_PARAM_IN),
    array($industry, SQLSRV_PARAM_IN),
    array($monthlyIncome, SQLSRV_PARAM_IN),
    array($familyMonthlyIncome, SQLSRV_PARAM_IN),
    array(join(',', $interests), SQLSRV_PARAM_IN),
    array($addition, SQLSRV_PARAM_IN),
    array($doNotPromote, SQLSRV_PARAM_IN),
    array($_SERVER["REMOTE_ADDR"], SQLSRV_PARAM_IN)
  );

  $result = $db->call_query($strSP, $strParam);

  $res = $db->insert_id($result);
  //file_get_contents("")
  if (!$res) {
    $messages = '提交失敗' . $delimiter;
  }
}
if ($messages == '') {
  header("Location:thankyou.html");
} else {
?>
  <!-- html -->
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="js/jquery.js"></script>

  </head>

  <body>
    <div style="">
      <h3>提交失敗！請返回從新提交</h3>
      <?php $msgArr = explode($delimiter, $messages);
      foreach ($msgArr as $msg) {
        echo $msg . '<br/>';
      }
      ?>
    </div>
    <button style="margin-left:150px;cursor:pointer;" onclick="window.history.go(-1);">返回</button>
  </body>

  </html>
<?php
}
?>