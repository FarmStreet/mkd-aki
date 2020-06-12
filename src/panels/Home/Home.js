import React, {Fragment} from 'react';
import {
  Cell,
  Div,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';

const Home = () => {

  const router = useRouter();
  const goToGroupAdd = () => router.navigate(pages.GROUP_ADD);

  return (
    <Fragment>
      <PanelHeaderSimple right={<Icon24AddOutline onClick={() => goToGroupAdd()} />}>
        Группы
      </PanelHeaderSimple>
{/*      <Div style={{paddingTop: '30px', margin: '0 15px', textAlign: 'center'}}>
        Вы не состоите ни в одной группе.
        Создайте свою или дождитесь приглашения.
      </Div>*/}
      <List>
        <Cell onClick={() => {}} description="Вы являетесь организатором данной группы">Группа дома №3</Cell>
        <Cell onClick={() => {}}>Группа дома №4</Cell>
      </List>
    </Fragment>
  )
};

export default Home;