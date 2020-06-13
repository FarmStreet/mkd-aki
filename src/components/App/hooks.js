import { useState } from 'react';
import {EVENT_LIST, GROUP_LIST} from "./constants";

const useNavState = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [popout, setPopout] = useState(null);
  const changeRoute = ({ route }) => {
    if (route) setActivePanel(route.name);
  };

  return { activePanel, popout, setPopout, changeRoute };
};

const useUserState = () => {
  const [user, setUser] = useState(null);

  return { user, setUser };
};

const useCreatingGroupState = () => {
  const [creatingGroup, setCreatingGroup] = useState({
    name: '',
    members: [],
  });

  const setCreatingGroupName = (name) => setCreatingGroup({ name: name, members: creatingGroup.members});
  const addCreatingGroupMembers = (members) => setCreatingGroup({name: creatingGroup.name, members: creatingGroup.members.concat(members)});
  const removeCreatingGroupMember = (memberId) => setCreatingGroup({name: creatingGroup.name, members: creatingGroup.members.filter(({id}) => id !== memberId)});

  return { creatingGroup, setCreatingGroupName, removeCreatingGroupMember, addCreatingGroupMembers, setCreatingGroup };
};

const useGroupState = () => {
  const [groupList, setGroupList] = useState(GROUP_LIST);

  const addGroup = (group) => setGroupList([...groupList, group]);

  return { groupList, addGroup };
};

const useEventState = () => {
  const [eventList, setEventList] = useState(EVENT_LIST);

  return { eventList, setEventList };
};

export const useAppState = () => {
  const navState = useNavState();
  const userState = useUserState();
  const groupState = useGroupState();
  const eventState = useEventState();
  const creatingGroupState = useCreatingGroupState();

  return {
    ...navState,
    ...userState,
    ...groupState,
    ...eventState,
    ...creatingGroupState,
  };
};