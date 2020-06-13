import React, {Fragment, useState, useContext} from 'react';
import {
  Cell,
  Div, FixedLayout, Group,
  List, PanelHeaderContent, PanelHeaderContext,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter, useRoute} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Work from '@vkontakte/icons/dist/24/work';
import Icon24Advertising from '@vkontakte/icons/dist/24/advertising';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import {STATUS_LIST} from "../../components/App/constants";
import Context from "../../components/App/context";

const GroupMain = () => {

  const {route: {params: {groupId}}} = useRoute();
  const { eventList } = useContext(Context);
  const filteredEventList = eventList.filter(event => event.groupId == groupId);

  const [isOpen, setIsOpen] = useState(false);
  const [activeOpen, setActiveOpen] = useState(0);

  const goToHome = () => window.history.back();

  const iconList = {
    1: <Icon24Note/>,
    2: <Icon24Help/>,
    3: <Icon24Advertising/>,
    4: <Icon24Work/>,
  };

  const router = useRouter();
  const goToNewsAdd = (id) => router.navigate(pages.EVENT_ADD, {newId: id});
  const goToNewItem = (id) => router.navigate(pages.NEW_ITEM, {newId: id});
  const goToQuestionItem = (id) => router.navigate(pages.QUESTION_ITEM, {questionId: id});
  const goToVotingItem = (id) => router.navigate(pages.VOTING_ITEM, {votingId: id});
  const goToWorkItem = (id) => router.navigate(pages.WORK_ITEM, {workId: id});

  const goList = {
    1: (id) => goToNewItem(id),
    2: (id) => goToQuestionItem(id),
    3: (id) => goToVotingItem(id),
    4: (id) => goToWorkItem(id),
  };

  return (
    <Fragment>
      <PanelHeaderSimple separator={false} left={<Icon24Back onClick={() => {goToHome()}} />} right={<Icon24AddOutline onClick={() => {goToNewsAdd()}} />}>
        <PanelHeaderContent
          aside={<Icon16Dropdown style={{ transform: `rotate(${isOpen ? '180deg' : '0'})` }} />}
          onClick={() => setIsOpen(!isOpen)}
        >
          {STATUS_LIST[activeOpen]}
        </PanelHeaderContent>
      </PanelHeaderSimple>
      <PanelHeaderContext opened={isOpen} onClose={() => setIsOpen(!isOpen)}>
        <List>
          <Cell
            asideContent={activeOpen === 0 ? <Icon24Done fill="var(--accent)" /> : null}
            onClick={() => {setActiveOpen(0); setIsOpen(!isOpen)}}>
            {STATUS_LIST[0]}
          </Cell>
          <Cell
            asideContent={activeOpen === 1 ? <Icon24Done fill="var(--accent)" /> : null}
            onClick={() => {setActiveOpen(1); setIsOpen(!isOpen)}}>
            {STATUS_LIST[1]}
          </Cell>
          <Cell
            asideContent={activeOpen === 2 ? <Icon24Done fill="var(--accent)" /> : null}
            onClick={() => {setActiveOpen(2); setIsOpen(!isOpen)}}>
            {STATUS_LIST[2]}
          </Cell>
          <Cell
            asideContent={activeOpen === 3 ? <Icon24Done fill="var(--accent)" /> : null}
            onClick={() => {setActiveOpen(3); setIsOpen(!isOpen)}}>
            {STATUS_LIST[3]}
          </Cell>
          <Cell
            asideContent={activeOpen === 4 ? <Icon24Done fill="var(--accent)" /> : null}
            onClick={() => {setActiveOpen(4); setIsOpen(!isOpen)}}>
            {STATUS_LIST[4]}
          </Cell>
        </List>
      </PanelHeaderContext>
      <Group>
        <List>
          {filteredEventList.map(({id, type, name, date}) => (activeOpen == type || activeOpen == 0) ? <Cell key={id} onClick={() => goList[type](id)} before={iconList[type]} description={date}>{name}</Cell> : '')}
        </List>
      </Group>
    </Fragment>
  )
};

export default GroupMain;