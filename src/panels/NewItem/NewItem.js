import React, {Fragment, useContext} from 'react';
import {
  Cell, Div,
  Group, Headline,
  PanelHeaderSimple,
} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Context from "../../components/App/context";
import {useRoute} from "react-router5";

const NewItem = () => {

  const { eventList } = useContext(Context);
  const {route: {params: {newId}}} = useRoute();
  const event = eventList.find(({id}) => id == newId);

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Новость
      </PanelHeaderSimple>
      <Div>
        <Headline weight="medium" style={{marginBottom: 16}}>{(event) ? event.name : ''}</Headline>
      </Div>
      <Group>
        <Cell multiline>
          {(event) ? event.message : ''}
        </Cell>
      </Group>
    </Fragment>
  )
};

export default NewItem;