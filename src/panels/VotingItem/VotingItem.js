import React, {Fragment} from 'react';
import {
  Button,
  Cell, Div, FormLayout, FormLayoutGroup,
  Group, Header, List,
  PanelHeaderSimple, Progress, Tabs, TabsItem, Counter
} from "@vkontakte/vkui";

import './VotingItem.css';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const VotingItem = () => {

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}}/>}>
        Голосование
      </PanelHeaderSimple>
      <Group>
        <Cell multiline style={{background: 'rgba(0, 0, 255, 0.1)', margin: '0 10px'}}>
          текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текст
        </Cell>
        <Div style={{display: 'flex'}}>
          <Button size="l" stretched mode="commerce" style={{marginRight: 8}}>Да</Button>
          <Button size="l" stretched mode="destructive">Нет</Button>
        </Div>
        <Div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            60%
            <div className="progress">
              <div className="progress__bar" style={{width: '60%'}}/>
            </div>
            40%
          </div>
        </Div>
        <Group header={<Header mode="secondary">участники</Header>}>
          <Tabs mode="buttons">
            <TabsItem style={{width: '45%'}} selected after={<Counter size="s">60</Counter>}>
              Приняли
            </TabsItem>
            <TabsItem style={{width: '45%'}} after={<Counter size="s">40</Counter>}>
              Отказались
            </TabsItem>
          </Tabs>
          <List>
            <Cell>name</Cell>
            <Cell>name</Cell>
            <Cell>name</Cell>
          </List>
        </Group>
      </Group>
    </Fragment>
  )
};

export default VotingItem;