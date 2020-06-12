import React, {useEffect, useContext, Fragment} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {useRoute} from 'react-router5';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import Home from "../../panels/Home/Home";
import {Panel, ScreenSpinner} from "@vkontakte/vkui";
import {pages} from "../../router";
import GroupAdd from "../../panels/GroupAdd/GroupAdd";

import Context from "./context";

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
      <View activePanel={activePanel} popout={popout}>
        <Panel id={pages.HOME} separator={true}>
          <Home/>
        </Panel>
        <Panel id={pages.GROUP_ADD} separator={true}>
          <GroupAdd/>
        </Panel>
      </View>
    </Fragment>
  );
};

export default App;

