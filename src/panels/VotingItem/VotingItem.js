import React, {Fragment, useContext, useState} from 'react';
import {
  Button,
  Cell, Div, FormLayout, FormLayoutGroup,
  Group, Header, List,
  PanelHeaderSimple, Progress, Tabs, TabsItem, Counter, Headline
} from "@vkontakte/vkui";

import './VotingItem.css';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Context from "../../components/App/context";
import {useRoute} from "react-router5";

const VotingItem = () => {

  const {eventList, groupList, user, voteAdd, voteList} = useContext(Context);
  const {route: {params: {votingId}}} = useRoute();
  const event = eventList.find(({id}) => id == votingId);
  const filterVoteList = voteList.filter(({id}) => id == (event ? event.id : -1));
  const group = (groupList.find(({id}) => id == (event ? event.groupId : -1))) || {isLeader: 0};

  const [activeMemberList, setActiveMemberList] = useState(1);

  const goToHome = () => window.history.back();

  const getPercentAgree = () => {
    if (!event) return 0;

    let agree = 0;
    let all = 0;

    filterVoteList.forEach((member) => {
      all += 1;
      if (member.isAgree == 1) agree += 1;
    });

    return Math.round(agree / (all || 1) * 100);
  };
  const getAgree = () => event ? filterVoteList.filter((member) => (member.isAgree == 1)) : 0;
  const getDisagree = () => event ? filterVoteList.filter((member) => (member.isAgree == 0)) : 0;

  const getPercentActive = () => Math.round((event ? (filterVoteList.length / group.members.length) : 0) * 100);

  const isVoted = () => event ? event.members.some(({id}) => id == user.id) : false;

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}}/>}>
        Голосование
      </PanelHeaderSimple>
      <Div>
        <Headline weight="medium" style={{marginBottom: 16}}>{(event) ? event.name : ''}</Headline>
      </Div>
      <Group>
        <Cell multiline style={{background: 'rgba(0, 0, 255, 0.1)', margin: '0 10px'}}>
          {(event) ? event.description : ''}
        </Cell>
        {!isVoted() ? <Div style={{display: 'flex'}}>
          <Button onClick={() => voteAdd(user.id, user.name, 1, event.id)} size="l" stretched mode="commerce"
                  style={{marginRight: 8}}>Да</Button>
          <Button onClick={() => voteAdd(user.id, user.name, 0, event.id)} size="l" stretched
                  mode="destructive">Нет</Button>
        </Div> : ''}
        <Group header={<Header>Процент явки - {getPercentActive()}%</Header>}>
          <div style={{display: 'flex', flexDirection: 'row', width: '90%', marginLeft: '5%'}}>
            {getPercentAgree()}%
            <div className="progress">
              <div className="progress__bar" style={{width: getPercentAgree() + '%'}}/>
            </div>
            {100 - getPercentAgree()}%
          </div>
        </Group>
        {group.isLeader ? <Group header={<Header mode="secondary">участники</Header>}>
          <Tabs mode="buttons">
            <TabsItem style={{width: '45%'}} onClick={() => setActiveMemberList(1)} selected={activeMemberList == 1}
                      after={<Counter size="s">{getAgree().length}</Counter>}>
              Приняли
            </TabsItem>
            <TabsItem style={{width: '45%'}} onClick={() => setActiveMemberList(0)} selected={activeMemberList == 0}
                      after={<Counter size="s">{getDisagree().length}</Counter>}>
              Отказались
            </TabsItem>
          </Tabs>
          <List>
            {event ? event.members.map(({id, name, agree}) => activeMemberList == agree ?
              <Cell key={id}>{name}</Cell> : '') : ''}
          </List>
        </Group> : ''}
      </Group>
    </Fragment>
  )
};

export default VotingItem;