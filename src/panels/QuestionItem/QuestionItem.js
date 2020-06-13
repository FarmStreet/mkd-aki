import React, {Fragment, useContext} from 'react';
import {
  Cell,
  Div, FixedLayout, Group,
  List, PanelHeaderContent,
  PanelHeaderSimple,
} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRoute} from "react-router5";
import Context from "../../components/App/context";

const QuestionItem = () => {

  const { eventList } = useContext(Context);
  const {route: {params: {questionId}}} = useRoute();
  const event = eventList.find(({id}) => id == questionId);

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Вопрос
      </PanelHeaderSimple>
      <Div>
        {(event) ? event.name : ''}
      </Div>
      <Div>
        <Cell multiline style={{width: '80%', background: 'rgba(0, 0, 255, 0.1)'}}>
          {(event) ? event.question : ''}
        </Cell>
      </Div>
      <Div>
        <Cell multiline style={{background: 'rgba(0, 255, 0, 0.1)', marginLeft: '20%'}}>
          {(event) ? event.answer : ''}
        </Cell>
      </Div>
    </Fragment>
  )
};

export default QuestionItem;