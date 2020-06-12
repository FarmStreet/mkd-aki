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

const App = () => {
  const {setUser, popout, setPopout, changeRoute, activePanel} = useContext(Context);
  const {router, route} = useRoute();


  useEffect(() => {

    bridge.send('VKWebAppInit');

    router.subscribe(changeRoute);
    changeRoute({route});
    //setPopout(<ScreenSpinner />);

    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme;
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
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
        <Panel id={pages.HOME} separator={true}>
          <Home/>
        </Panel>
        <Panel id={pages.GROUP_ADD} separator={true}>
          <GroupAdd/>
        </Panel>
        <Panel id={pages.FRIEND_LIST} separator={true}>
          <FriendList/>
        </Panel>
        <Panel id={pages.GROUP_MAIN} separator={false}>
          <GroupMain/>
        </Panel>
        <Panel id={pages.NEW_ITEM} separator={false}>
          <NewItem/>
        </Panel>
      </View>
    </Fragment>
  );
};

export default App;

