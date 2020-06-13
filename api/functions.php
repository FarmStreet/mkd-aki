<?php

function checkSign($query_params) {
    foreach ($query_params as $name => $value) {
        if (strpos($name, 'vk_') !== 0) {
            continue;
        }
        $sign_params[$name] = $value;
    }
    ksort($sign_params);
    $sign_params_query = http_build_query($sign_params);
    $sign              = rtrim(strtr(base64_encode(hash_hmac('sha256', $sign_params_query, SECRET_KEY, true)), '+/', '-_'), '=');
    $status            = $sign === $query_params['sign'];
    return $status;
}

function checkToken($user_id, $token) {
    $real_token = md5(md5($user_id) . TOKEN_SALT);
    return $real_token === $token;
}

function wrapResponse($code, $params) {

    $result['code'] = $code;
    if ($params) {
        $result['response'] = $params;
    }
    $response = json_encode($result);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    echo $response;
}