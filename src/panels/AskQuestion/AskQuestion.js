import React, {Fragment, useState, useContext} from 'react';
import {
  Button,
  Cell,
  Div, FixedLayout, FormLayout, Group, Input,
  List,
  PanelHeaderSimple, Separator, Tabs, TabsItem, Textarea,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRoute, useRouter} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Context from "../../components/App/context";

const AskQuestion = () => {

  const {route: {params: {groupId}}} = useRoute();

  const {addEvent, eventList, user} = useContext(Context);

  const [title, setTitle] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');

  const goToHome = () => window.history.back();

  const add = () => {

    if (title.length < 4) {
      setError('Слишком короткое название!');
      return;
    }

    if (title.length > 20) {
      setError('Слишком длинное название!');
      return;
    }

    if (question.length < 4) {
      setQuestionError('Слишком короткий вопрос!');
      return;
    }

    addEvent({
      id: eventList.length,
      from: user.id,
      groupId: groupId,
      type: 2,
      name: title,
      question: question,
      answer: '',
      date: '13.06.2020',
    });
    goToHome();
  };

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => goToHome()}/>}>
        Задать вопрос
      </PanelHeaderSimple>
      <Div style={{paddingBottom: '40px'}}>
        <FormLayout>
          <Input
            type="text"
            top="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            status={error ? 'error' : ''}
            bottom={error}
          />
          <Textarea
            top="Напишите вопрос"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
            status={questionError ? 'error' : ''}
            bottom={questionError}
          />
        </FormLayout>
      </Div>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce" onClick={() => add()}>задать вопрос</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  );
};

export default AskQuestion;