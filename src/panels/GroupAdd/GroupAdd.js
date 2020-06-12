import React, {Fragment} from 'react';
import {
  Avatar,
  Button,
  Cell,
  Div, FormLayout, FormLayoutGroup, Input,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRouter} from "react-router5";
import {pages} from "../../router";

//  TODO сделать условие вывода для пустых групп

const GroupAdd = () => {

  let error = '';
  const goToHome = () => window.history.back();

  const router = useRouter();
  const goToFriendList = () => router.navigate(pages.FRIEND_LIST);

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />} right={<Icon24DoneOutline/>}>
        Добавить группу
      </PanelHeaderSimple>
      <FormLayout>
        <Input
          type="text"
          top="Название"
          name="name"
          value=""
          onChange={() => {}}
          status={error ? 'error' : 'valid'}
          bottom={error}
        />
        <FormLayoutGroup top="участники">
          <Button mode="commerce" onClick={() => {goToFriendList()}}>Добавить</Button>
          <List>
            <List>
                <Cell removable onRemove={() => {}}>name</Cell>
                <Cell removable onRemove={() => {}}>name</Cell>
                <Cell removable onRemove={() => {}}>name</Cell>
            </List>
          </List>
        </FormLayoutGroup>
      </FormLayout>
    </Fragment>
  )
};

export default GroupAdd;