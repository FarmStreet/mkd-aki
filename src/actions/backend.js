import React, {useContext} from 'react';
import axios from "axios";
import bridge from '@vkontakte/vk-bridge';
import {AJAX_CONFIG, API_URL} from "../components/App/constants";
import {changeVkId} from "./help";
import Context from "../components/App/context";

export async function auth(id, params) {

  // response
  // -token -isNew -groupList -eventList -friendList

  async function onSuccess(res) {
    return res;
  }

  async function onError(error) {
    console.log(error)
  }

  try {
    const success = await axios.get(API_URL + changeVkId(params, id) + '&method=user.auth', AJAX_CONFIG);
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}

/*export async function getFriendList(uid, access_token) {

    const {setFriendList} = useContext(Context);

    apiRequest('friends.get', {
        user_id: uid,
        order: 'random',
        fields: 'first_name,last_name',
      }, access_token,
      function(users) {
      let friends = [];
        users.items.forEach(user => {
          user.name = user.first_name + ' ' + user.last_name;
          friends.push({
            id: user.id,
            name: user.name
          })
        });
        setFriendList(friends);
      },
      function(er) {
        return []
      });
}*/

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