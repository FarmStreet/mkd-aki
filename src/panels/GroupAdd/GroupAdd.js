import React, {Fragment, useState, useContext} from 'react';
import {
  Avatar,
  Button,
  Cell,
  Div, FixedLayout, FormLayout, FormLayoutGroup, Input,
  List,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRouter} from "react-router5";
import {pages} from "../../router";
import Context from "../../components/App/context";
import bridge from '@vkontakte/vk-bridge';
import {APP_ID} from "../../components/App/constants";

//  TODO сделать условие вывода для пустых групп

const GroupAdd = () => {
  const {creatingGroup, setCreatingGroup, setCreatingGroupName, setCreatingGroupMembers, removeCreatingGroupMember, addGroup, groupList, friendList} = useContext(Context);

  const [error, setError] = useState('');

  const goToHome = () => window.history.back();

  const router = useRouter();
  const goToFriendList = () => {

    if (friendList.length == 0) {
      bridge.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": "friends"});
      return;
    }

    router.navigate(pages.FRIEND_LIST);
  };

  const addNewGroup = () => {
    if (creatingGroup.name.length < 4) {
      setError('Слишком короткое название');
      return;
    }

    if (creatingGroup.name.length > 20) {
      setError('Слишком длинное название');
      return;
    }

    addGroup({
      id: groupList.length,
      name: creatingGroup.name,
      members: creatingGroup.members,
      isLeader: 1
    });
    setCreatingGroup({
      name: '',
      members: [],
    });
    goToHome();
  };

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}}/>}>
        Добавить группу
      </PanelHeaderSimple>
      <FormLayout style={{paddingBottom: '60px'}}>
        <Input
          type="text"
          top="Название"
          name="name"
          value={creatingGroup.name}
          onChange={(e) => setCreatingGroupName(e.currentTarget.value)}
          status={error ? 'error' : ''}
          bottom={error}
        />
        <FormLayoutGroup top="участники">
          <Button mode="commerce" onClick={() => {goToFriendList()}}>Добавить</Button>
          <List>
            {creatingGroup.members.map(({id, name}) => <Cell key={id} removable
                                                             onRemove={() => removeCreatingGroupMember(id)}>{name}</Cell>)}
          </List>
        </FormLayoutGroup>
      </FormLayout>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="commerce" onClick={() => addNewGroup()}>готово</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  )
};

export default GroupAdd;