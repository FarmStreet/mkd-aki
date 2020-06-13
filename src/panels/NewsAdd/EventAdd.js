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

const EventAdd = () => {

  const {route: {params: {groupId}}} = useRoute();

  const {addEvent, eventList } = useContext(Context);

  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState('');
  const [voteDesc, setVoteDesc] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [error, setError] = useState('');
  const [descError, setDescError] = useState('');

  const router = useRouter();
  const goToGroupAdd = () => router.navigate(pages.GROUP_ADD);
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

    if (activeTab == 0) {

      if (newDesc.length < 4) {
        setDescError('Слишком короткое описание!');
        return;
      }

      addEvent({
        id: eventList.length,
        type: 1,
        groupId: groupId,
        name: title,
        message: newDesc,
        date: '13.06.2020'
      });
      goToHome();
    }

    if (activeTab == 1) {

      if (voteDesc.length < 4) {
        setDescError('Слишком короткое описание!');
        return;
      }

      addEvent({
        id: eventList.length,
        groupId: groupId,
        type: 3,
        name: title,
        description: voteDesc,
        date: '13.06.2020',
        members: []
      })
      goToHome();
    }
  };

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Создать
      </PanelHeaderSimple>
      <FixedLayout vertical="top">
        <Separator wide />
        <Tabs>
          <TabsItem
            selected={activeTab == 0}
            onClick={() => setActiveTab(0)}
          >новость</TabsItem>
          <TabsItem
            selected={activeTab == 1}
            onClick={() => setActiveTab(1)}
          >опрос</TabsItem>
        </Tabs>
      </FixedLayout>
      {activeTab == 0 ?
        <Div style={{padding: '40px 0'}}>
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
              top="Напишите новость"
              value={newDesc}
              onChange={(e) => setNewDesc(e.currentTarget.value)}
              status={descError ? 'error' : ''}
              bottom={descError}
            />
          </FormLayout>
        </Div>
        : ''}

      {activeTab == 1 ?
        <Div style={{padding: '40px 0'}}>
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
              top="Описание опроса"
              value={voteDesc}
              onChange={(e) => setVoteDesc(e.currentTarget.value)}
              status={descError ? 'error' : ''}
              bottom={descError}/>
          </FormLayout>
        </Div>
        : ''}
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce" onClick={() => add()}>добавить</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  )
};

export default EventAdd;