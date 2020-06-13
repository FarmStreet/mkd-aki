import React, {Fragment, useContext, useState} from 'react';
import {
  Button,
  Cell,
  Div, FixedLayout, FormLayout, Group, Headline,
  List, PanelHeaderContent,
  PanelHeaderSimple, Textarea,
} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRoute} from "react-router5";
import Context from "../../components/App/context";

const QuestionItem = () => {

  const [ answer, setAnswer ] = useState('');
  const [ error, setError ] = useState('');

  const { eventList, groupList, answerQuestion } = useContext(Context);
  const {route: {params: {questionId}}} = useRoute();
  const event = (eventList.find(({id}) => id == questionId)) || {answer: ''};
  const group = (groupList.find(({id}) => id == (event ? event.groupId : -1))) || {isLeader: 0};

  const goToHome = () => window.history.back();

  const add = () => {

    if (answer.length < 4) {
      setError('Слишком короткий ответ');
      return;
    }

    answerQuestion(questionId, answer);
  };

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Вопрос
      </PanelHeaderSimple>
      <Div>
        <Headline weight="medium" style={{marginBottom: 16}}>{(event) ? event.name : ''}</Headline>
      </Div>
      <Div>
        <Cell multiline style={{width: '80%', background: 'rgba(0, 0, 255, 0.1)'}}>
          {(event) ? event.question : ''}
        </Cell>
      </Div>
      <Div>
        {event.answer
          ? <Cell multiline style={{background: 'rgba(0, 255, 0, 0.1)', marginLeft: '20%'}}>
          {(event)
            ? event.answer
            : ''}
        </Cell>
          : (group.isLeader ? <FormLayout style={{paddingBottom: '60px'}}><Textarea
            top="Форма для ответа"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
            status={error ? 'error' : ''}
            bottom={error}
          /></FormLayout> : '')}
      </Div>
      {!event.answer && group.isLeader ? <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce" onClick={() => add()}>ответить</Button>
        </Div>
      </FixedLayout> : ''}
    </Fragment>
  )
};

export default QuestionItem;