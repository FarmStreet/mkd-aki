import React, {Fragment} from 'react';
import {
  Button,
  Cell,
  Div, FixedLayout, FormLayout, Group,
  List,
  PanelHeaderSimple, Separator, Tabs, TabsItem, Textarea,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const EventAdd = () => {

  const router = useRouter();
  const goToGroupAdd = () => router.navigate(pages.GROUP_ADD);
  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Создать
      </PanelHeaderSimple>
      <FixedLayout vertical="top">
        <Separator wide />
        <Tabs>
          <TabsItem
            selected={true}
            onClick={() => {}}
          >новость</TabsItem>
          <TabsItem
            selected={false}
            onClick={() => {}}
          >опрос</TabsItem>
        </Tabs>
      </FixedLayout>
{/*      <Div style={{padding: '40px 0'}}>
        <FormLayout>
          <Textarea placeholder="Напишите новость" />
        </FormLayout>
      </Div>*/}
      <Div style={{padding: '40px 0'}}>
        <FormLayout>
          <Textarea top="Описание опроса" />
        </FormLayout>
      </Div>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce">добавить</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  )
};

export default EventAdd;