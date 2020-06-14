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

    if (!checkSign($input)) die();

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
    $response['groupList'] = Groups::getList($vk_id);
    $response['eventList'] = Events::getList($vk_id);
    $response['voteList']  = Vote::getList($vk_id);
    $response['isNew']     = $is_new;

    wrapResponse('ok', $response);
    die();
}

if (!isset($input['token'])) die();
if (!checkToken($vk_id, $input['token'])) die();

switch ($method) {
    case 'group.add':

        if (!isset($input['name']) || !isset($input['members'])) return;

        $id = Groups::create($vk_id, $input['name'], $input['members']);
        wrapResponse('ok', ['id' => $id]);
        break;
    case 'event.add':

        if (!isset($input['type']) || !isset($input['group_id']) || !isset($input['name']) || !isset($input['msg'])) return;

        if ($input['type'] == EVENT_TYPE_NEW) {
            $res = Events::addNew($input['group_id'], $input['name'], $input['msg']);
            wrapResponse('ok', ['id' => $res['id'] . '-' . EVENT_TYPE_NEW, 'date' => $res['date']]);
        }
        if ($input['type'] == EVENT_TYPE_QUESTION) {
            $res = Events::addQuestion($vk_id, $input['group_id'], $input['name'], $input['msg']);
            wrapResponse('ok', ['id' => $res['id'] . '-' . EVENT_TYPE_QUESTION, 'date' => $res['date']]);
        }
        if ($input['type'] == EVENT_TYPE_VOTING) {
            $res = Events::addVote($input['group_id'], $input['name'], $input['msg']);
            wrapResponse('ok', ['id' => $res['id'] . '-' . EVENT_TYPE_VOTING, 'date' => $res['date']]);
        }
        break;
    case 'vote.add':

        if (!isset($input['vote_id']) || !isset($input['is_agree'])) return;

        $vote_id = explode('-', $input['vote_id'])[0];
        Vote::create($vk_id, $vote_id, $input['is_agree']);
        wrapResponse('ok');
        break;
    case 'question.answer':

        if (!isset($input['question_id']) || !isset($input['answer'])) return;

        $question_id = explode('-', $input['question_id'])[0];
        Events::setQuestionAnswer($question_id, $input['answer']);
        wrapResponse('ok');
        break;
}