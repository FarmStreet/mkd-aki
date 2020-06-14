import React, {Fragment, useContext} from 'react';
import {
  Button,
  Cell,
  Div, FixedLayout, Gallery, Group, Headline,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";
import Context from "../../components/App/context";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const EnterScreen = () => {
  const {groupList} = useContext(Context);

  const router = useRouter();
  const goToHome = (id) => router.navigate(pages.HOME);

  return (
    <Fragment>
      <Gallery
        slideWidth="100%"
        style={{height: '85vh'}}
        bullets="dark"
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{margin: '0 10%', textAlign: 'center'}}>
            <Headline>Привет!</Headline>
            Это приложение для организации коллективного управления многоквартирными домами.
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{margin: '0 10%', textAlign: 'center'}}>
            <Headline>Здесь вы можете:</Headline>
            Cоздавать свои группы; участвовать в группах; задавать вопросы; отвечать на вопросы; получать новости; участвовать в голосованиях
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{margin: '0 10%', textAlign: 'center'}}>
            Тыкайте на кнопку ниже и начинайте пользоваться приложением!
          </div>
        </div>
      </Gallery>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce" onClick={() => goToHome()}>начать</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  )
};

export default EnterScreen;