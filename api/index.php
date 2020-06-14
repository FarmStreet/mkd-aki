<?php

require_once "config.php";
require_once "functions.php";
require_once "Classes/Users.php";
require_once "Classes/Groups.php";

$input = $_GET;

if (!isset($input['method'])) die();

$method = $input['method'];

if (!isset($input['vk_id'])) die();

$vk_id = $input['vk_id'];

if ($method == 'user.auth') {

 //   if (!checkSign($input)) die();

    if (!isset($input['name'])) die();

    $user = Users::get($vk_id);
    $is_new = 0;

    if (!$user) {
        Users::create($vk_id, $input['name']);
        $user = Users::get($vk_id);
        $is_new = 1;
    }

    $response['token'] = md5(md5($vk_id) . TOKEN_SALT);
    $response['groupList'] = Groups::getList($vk_id) || [];
    $response['isNew'] = $is_new;

    wrapResponse('ok', $response);
    die();
}