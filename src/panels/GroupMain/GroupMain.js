import React, {Fragment} from 'react';
import {
  Cell,
  Div, FixedLayout, Group,
  List, PanelHeaderContent,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Work from '@vkontakte/icons/dist/24/work';
import Icon24Advertising from '@vkontakte/icons/dist/24/advertising';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const GroupMain = () => {

  const goToHome = () => window.history.back();

  const router = useRouter();
  const goToNewsAdd = (id) => router.navigate(pages.EVENT_ADD, {newId: id});
  const goToNewItem = (id) => router.navigate(pages.NEW_ITEM, {newId: id});
  const goToQuestionItem = (id) => router.navigate(pages.QUESTION_ITEM, {questionId: id});
  const goToVotingItem = (id) => router.navigate(pages.VOTING_ITEM, {votingId: id});
  const goToWorkItem = (id) => router.navigate(pages.WORK_ITEM, {workId: id});

  return (
    <Fragment>
      <PanelHeaderSimple separator={false} left={<Icon24Back onClick={() => {goToHome()}} />} right={<Icon24AddOutline onClick={() => {goToNewsAdd()}} />}>
        <PanelHeaderContent
          aside={<Icon16Dropdown style={{ transform: `rotate(${1 ? '180deg' : '0'})` }} />}
          onClick={() => {}}
        >
          {{
            1: 'Все',
            2: 'Новости',
            3: 'Вопросы',
            4: 'Голосования',
            5: 'Работы',
          }[1]}
        </PanelHeaderContent>
      </PanelHeaderSimple>
      <Group>
        <List>
          <Cell onClick={() => goToNewItem(1)} before={<Icon24Note/>}>Новость</Cell>
          <Cell onClick={() => goToQuestionItem(1)} before={<Icon24Help/>}>Вопрос</Cell>
          <Cell onClick={() => goToVotingItem(1)} before={<Icon24Advertising/>}>Голосование</Cell>
          <Cell onClick={() => goToWorkItem(1)} before={<Icon24Work/>}>Работа</Cell>
        </List>
      </Group>
    </Fragment>
  )
};

export default GroupMain;