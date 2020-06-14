import React, {useContext} from 'react';
import axios from "axios";
import bridge from '@vkontakte/vk-bridge';
import {AJAX_CONFIG, API_URL} from "../components/App/constants";
import {changeVkId} from "./help";
import Context from "../components/App/context";

export async function auth(id, name) {

  // response

  async function onSuccess(res) {
    return res.response;
  }

  async function onError(error) {
    console.log(error)
  }

  console.log(window.location.search);

  try {
    const success = await axios.get(API_URL + changeVkId(window.location.search, id) + '&method=user.auth&name=' + name, AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

export async function groupAdd(uid, token, name, members) {

  async function onSuccess(res) {
    return res.response.id;
  }

  async function onError(error) {
    console.log(error)
  }

  let membersString = '';
  members.forEach(member => {
    membersString += '&member[]=' + member['id'];
  });

  try {
    const success = await axios.get(API_URL + '?method=group.add&vk_id=' + uid + '&token=' + token + '&name=' + name + membersString, AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

export async function eventAdd(uid, token, name, msg, groupId, type) {

  async function onSuccess(res) {
    return res.response;
  }

  async function onError(error) {
    console.log(error)
  }

  try {
    const success = await axios.get(API_URL + '?method=event.add&vk_id=' + uid + '&token=' + token + '&name=' + name + '&msg=' + msg + '&group_id=' + groupId + '&type=' + type, AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

export async function voteAdd(uid, token, eventId, isAgree) {

  async function onSuccess(res) {
    return true;
  }

  async function onError(error) {
    console.log(error)
  }

  try {
    const success = await axios.get(API_URL + '?method=vote.add&vk_id=' + uid + '&token=' + token + '&event_id=' + eventId + '&is_agree=' + isAgree, AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

export async function questionAnswer(uid, token, eventId, answer) {

  async function onSuccess(res) {
    return true;
  }

  async function onError(error) {
    console.log(error)
  }

  try {
    const success = await axios.get(API_URL + '?method=question.answer&vk_id=' + uid + '&token=' + token + '&question_id=' + eventId + '&answer=' + answer, AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

function getNewRequestId() {
  return (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
}

export function apiRequest(method, params = {}, accessToken = '', successCallback = undefined, errorCallback = undefined) {
  let requestId = getNewRequestId();
  if (successCallback !== undefined || errorCallback !== undefined) {
    let clb = function callback(e) {
      let vkEvent = e.detail;
      if (!vkEvent) {
        console.error('invalid event', e);
        return;
      }

      let type = vkEvent['type'];
      let data = vkEvent['data'];

      let found = false;
      if ('VKWebAppCallAPIMethodResult' === type && data['request_id'] === requestId) {
        if (successCallback !== undefined) {
          successCallback(data['response']);
        }

        found = true;
      } else if ('VKWebAppCallAPIMethodFailed' === type && data['request_id'] === requestId) {
        if (errorCallback !== undefined) {
          errorCallback(data);
        }

        found = true;
      }

      if (found) {
        bridge.unsubscribe(clb);
      }

    };

    bridge.subscribe(clb);
  }

  params['access_token'] = accessToken;

  if (params['v'] === undefined) {
    params['v'] = '5.110';
  }

  bridge.send('VKWebAppCallAPIMethod', {
    'method': method,
    'params': params,
    'request_id': requestId
  });
}