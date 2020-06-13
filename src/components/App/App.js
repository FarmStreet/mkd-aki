import React, {useEffect, useContext, Fragment} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {useRoute} from 'react-router5';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import Home from "../../panels/Home/Home";
import {Group, Panel, ScreenSpinner} from "@vkontakte/vkui";
import {pages} from "../../router";
import GroupAdd from "../../panels/GroupAdd/GroupAdd";

import Context from "./context";
import FriendList from "../../panels/FriendList/FriendList";
import GroupMain from "../../panels/GroupMain/GroupMain";
import NewItem from "../../panels/NewItem/NewItem";
import QuestionItem from "../../panels/QuestionItem/QuestionItem";
import VotingItem from "../../panels/VotingItem/VotingItem";
import EventAdd from "../../panels/NewsAdd/EventAdd";
import AskQuestion from "../../panels/AskQuestion/AskQuestion";
import {auth, getFriendList} from "../../actions/backend";

const App = () => {
  const {user, setUser, popout, setPopout, changeRoute, activePanel, updateFriendList} = useContext(Context);
  const {router, route} = useRoute();


  useEffect(() => {

    bridge.send('VKWebAppInit');

    router.subscribe(changeRoute);
    changeRoute({route});
    setPopout(<ScreenSpinner />);

    bridge.subscribe(async ({detail: {type, data}}) => {
      console.log(type);
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme;
        document.body.attributes.setNamedItem(schemeAttribute);
      }
      if (type === 'VKWebAppAccessTokenReceived') {
        if (data.scope != 'friends') return;

        updateFriendList(user.id, data.access_token);
      }
    });

    async function fetchData() {
      let newUser = await bridge.send('VKWebAppGetUserInfo');
      newUser.name = newUser.first_name + ' ' + newUser.last_name;
      const authData = await auth(user.id, window.location.search);
      setUser(newUser);
      setPopout(null);

    }

     fetchData();
  }, []);

  if (!activePanel) {

    return null;
  }


  return (
    <Fragment>
      <View activePanel={activePanel} popout={popout} header={false}>
        <Panel id={pages.HOME}>
          <Home/>
        </Panel>
        <Panel id={pages.GROUP_ADD}>
          <GroupAdd/>
        </Panel>
        <Panel id={pages.FRIEND_LIST}>
          <FriendList/>
        </Panel>
        <Panel id={pages.GROUP_MAIN}>
          <GroupMain/>
        </Panel>
        <Panel id={pages.NEW_ITEM}>
          <NewItem/>
        </Panel>
        <Panel id={pages.QUESTION_ITEM}>
          <QuestionItem/>
        </Panel>
        <Panel id={pages.VOTING_ITEM}>
          <VotingItem/>
        </Panel>
        <Panel id={pages.EVENT_ADD}>
          <EventAdd/>
        </Panel>
        <Panel id={pages.ASK_QUESTION}>
          <AskQuestion/>
        </Panel>
      </View>
    </Fragment>
  );
};

export default App;

