import React, {Fragment, useContext, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar,
  Button,
  Cell,
  Div, FormLayout, FormLayoutGroup, Group, Input,
  List,
  Header,
  PanelHeaderSimple, FixedLayout,
} from "@vkontakte/vkui";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon24DoneOutline from '@vkontakte/icons/dist/24/done_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {useRouter} from "react-router5";
import {pages} from "../../router";
import Context from "../../components/App/context";
import {APP_ID, FRIEND_LIST} from "../../components/App/constants";

//  TODO сделать условие вывода для пустых групп

const FriendList = () => {
  const {addCreatingGroupMembers, creatingGroup, friendList} = useContext(Context);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [newMembers, setNewMembers] = useState([]);

  if (!friendList) {
    bridge.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": "friends"});
  }

  const toggleMember = (member) => {

    if (newMembers.some(({id}) => id == member.id)) return setNewMembers(newMembers.filter(({id}) => id !== member.id));

    return setNewMembers([...newMembers, member]);
  };

  const goToHome = () => window.history.back();

  const isIssetMember = (memberId) => creatingGroup.members.some(({id}) => id == memberId);

  async function addMembers() {
    if (isActiveButton || !newMembers) return;
    setIsActiveButton(true);
    addCreatingGroupMembers(newMembers);
    goToHome();
  }

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Добавить группу
      </PanelHeaderSimple>
      <Group header={<Header mode="secondary">Друзья</Header>} style={{paddingBottom: '70px'}}>
        <List>
          {friendList.map(({id, name}) => isIssetMember(id) ? '' : <Cell onChange={() => toggleMember({id: id, name: name})} key={id} selectable>{name}</Cell>)}
        </List>
      </Group>
      <FixedLayout vertical="bottom">
        <Div style={{margin: '8px'}}>
          <Button size="xl" mode="primary" onClick={() => addMembers()}>добавить</Button>
        </Div>
      </FixedLayout>
    </Fragment>
  );
};

export default FriendList;