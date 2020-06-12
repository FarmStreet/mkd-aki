import React, {Fragment} from 'react';
import {
  Button,
  Cell,
  Div, FormLayout, FormLayoutGroup, Input,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';

//  TODO сделать условие вывода для пустых групп

const GroupAdd = () => {

  let error = '';

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {console.log(5)}} />} right={<Icon24DoneOutline/>}>
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
          <Button mode="commerce">Добавить</Button>
          <List>
            <Cell>тест</Cell>
          </List>
        </FormLayoutGroup>
      </FormLayout>
    </Fragment>
  )
};

export default GroupAdd;