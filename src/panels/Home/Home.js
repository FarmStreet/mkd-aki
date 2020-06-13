import React, {Fragment, useContext} from 'react';
import {
  Cell,
  Div,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";
import Context from "../../components/App/context";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Home = () => {
  const { groupList } = useContext(Context);

  const router = useRouter();
  const goToGroupAdd = (id) => router.navigate(pages.GROUP_ADD, { groupId: id });
  const goToGroup = (id) => router.navigate(pages.GROUP_MAIN, { groupId: id });

  return (
    <Fragment>
      <PanelHeaderSimple right={<Icon24AddOutline onClick={() => {goToGroupAdd()}} />}>
        Группы
      </PanelHeaderSimple>
      {groupList.length === 0
        ? <Div style={{paddingTop: '30px', margin: '0 15px', textAlign: 'center'}}>
        Вы не состоите ни в одной группе.
        Создайте свою или дождитесь приглашения.
      </Div>
        : <List>
          {
            groupList.map(({ name, id, isLeader }) => (
              <Cell key={id} asideContent={isLeader ? <Icon24Settings onClick={() => goToGroupAdd(id)} /> : ''}
                    description={isLeader ? 'Вы являетесь организатором данной группы' : ''}
                    ><a onClick={() => {goToGroup(id)}}>{name}</a></Cell>))
          }
      </List>}
    </Fragment>
  )
};

export default Home;