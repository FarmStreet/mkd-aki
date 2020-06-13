import React, {Fragment, useContext} from 'react';
import {
  Button,
  Cell, Div, FormLayout, FormLayoutGroup,
  Group, Header, List,
  PanelHeaderSimple, Progress, Tabs, TabsItem, Counter
} from "@vkontakte/vkui";

import './VotingItem.css';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Context from "../../components/App/context";
import {useRoute} from "react-router5";

const VotingItem = () => {

  const { eventList, groupList } = useContext(Context);
  const {route: {params: {votingId}}} = useRoute();
  const event = eventList.find(({id}) => id == votingId);
  const group = groupList.find(({id}) => id == event.groupId);

  const goToHome = () => window.history.back();

  const getPercentAgree = () => {
    if (!event.members) return 0;

    let agree = 0;
    let all = 0;

    event.members.forEach((member) => {
      all += 1;
      if (member.agree == 1) agree += 1;
    });

    return Math.round(agree / all * 100);
  };
  const getAgree = () => event.members.filter((member) => (member.agree == 1));
  const getDisagree = () => event.members.filter((member) => (member.agree == 0));

  const getPercentActive = (members) => {

  };

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}}/>}>
        Голосование
      </PanelHeaderSimple>
      <Div>
        {(event) ? event.name : ''}
      </Div>
      <Group>
        <Cell multiline style={{background: 'rgba(0, 0, 255, 0.1)', margin: '0 10px'}}>
          {(event) ? event.description : ''}
        </Cell>
        <Div style={{display: 'flex'}}>
          <Button size="l" stretched mode="commerce" style={{marginRight: 8}}>Да</Button>
          <Button size="l" stretched mode="destructive">Нет</Button>
        </Div>
        <Div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {getPercentAgree()}%
            <div className="progress">
              <div className="progress__bar" style={{width: getPercentAgree() + '%'}}/>
            </div>
            {100 - getPercentAgree()}%
          </div>
        </Div>
        {group.isLeader ? <Group header={<Header mode="secondary">участники</Header>}>
          <Tabs mode="buttons">
            <TabsItem style={{width: '45%'}} selected after={<Counter size="s">{getAgree().length}</Counter>}>
              Приняли
            </TabsItem>
            <TabsItem style={{width: '45%'}} after={<Counter size="s">{getDisagree().length}</Counter>}>
              Отказались
            </TabsItem>
          </Tabs>
          <List>
            <Cell>name</Cell>
            {event.members.map(() => {

            })}
          </List>
        </Group> : ''}
      </Group>
    </Fragment>
  )
};

export default VotingItem;