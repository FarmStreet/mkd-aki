import React, {Fragment} from 'react';
import {
  Cell,
  Div,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';

const Home = () => {

  return (
    <Fragment>
      <PanelHeaderSimple right={<Icon24AddOutline onClick={() => {console.log(5)}} />}>
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