import React, {Fragment} from 'react';
import {
  Avatar,
  Button,
  Cell,
  Div, FormLayout, FormLayoutGroup, Group, Input,
  List,
  Header,
  PanelHeaderSimple, FixedLayout,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRouter} from "react-router5";
import {pages} from "../../router";

//  TODO сделать условие вывода для пустых групп

const FriendList = () => {

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Добавить группу
      </PanelHeaderSimple>
      <Group header={<Header mode="secondary">Друзья</Header>} style={{paddingBottom: '70px'}}>
        <List>
          <Cell selectable>Артур Стамбульцян</Cell>
          <Cell selectable>Тимофей Чаптыков</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
          <Cell selectable>Влад Анесов</Cell>
        </List>
      </Group>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="primary">добавить</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  )
};

export default FriendList;