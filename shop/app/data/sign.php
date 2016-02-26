<?php
	$result = array('user_name' => 'admin, 'password' => '202cb962ac59075b964b07152d234b70');
$jsonstring = json_encode($result);
header('Content-Type: application/json'); //前面代码容易找到，但是这句是失败无数次在http://stackoverflow.com上找到的。
echo $jsonstring;
?>