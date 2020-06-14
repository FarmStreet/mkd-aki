<?php

require_once "config.php";
require_once "functions.php";
require_once "Classes/Users.php";
require_once "Classes/Groups.php";
require_once "Classes/Vote.php";
require_once "Classes/Events.php";

$input = $_GET;

if (!isset($input['method'])) {
    die();
}

$method = $input['method'];

if (!isset($input['vk_id'])) {
    die();
}

$vk_id = $input['vk_id'];

if ($method == 'user.auth') {

    //   if (!checkSign($input)) die();

    if (!isset($input['name'])) {
        die();
    }

    $user   = Users::get($vk_id);
    $is_new = 0;

    if (!$user) {
        Users::create($vk_id, $input['name']);
        $user   = Users::get($vk_id);
        $is_new = 1;
    }

    $response['token']     = md5(md5($vk_id) . TOKEN_SALT);
    $response['groupList'] = Groups::getList($vk_id) || [];
    $response['eventList'] = Events::getList($vk_id) || [];
    $response['voteList']  = Vote::getList($vk_id) || [];
    $response['isNew']     = $is_new;

    wrapResponse('ok', $response);
    die();
}

if (isset($input['token'])) die();
if (!checkToken($vk_id, $input['token'])) die();

switch ($method) {
    case 'group.add':

        Groups::create($vk_id, $name, $members);
        break;
    case 'event.add':

        if (!isset($input['type'])) return;

        if ($input['type'] == EVENT_TYPE_NEW) {
            Events::addNew($group_id, $name, $message);
        }
        if ($input['type'] == EVENT_TYPE_QUESTION) {
            Events::addQuestion($vk_id, $group_id, $name, $question);
        }
        if ($input['type'] == EVENT_TYPE_VOTING) {
            Events::addVote($group_id, $name, $desc);
        }
        break;
    case 'vote.add':

        Vote::create($vk_id, $vote_id, $is_agree);
        break;
    case 'question.answer':

        Events::setQuestionAnswer($question_id, $answer);
        break;
}