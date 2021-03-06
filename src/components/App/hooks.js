import { useState } from 'react';
import {EVENT_LIST, GROUP_LIST, VOTE_LIST} from "./constants";
import {apiRequest} from "../../actions/backend";

const useNavState = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [popout, setPopout] = useState(null);
  const changeRoute = ({ route }) => {
    if (route) setActivePanel(route.name);
  };

  return { activePanel, popout, setPopout, changeRoute };
};

const useUserState = () => {
  const [user, setUser] = useState({id: 171138541, name: 'Александр Муратов'});

  return { user, setUser };
};

const useCreatingGroupState = () => {
  const [creatingGroup, setCreatingGroup] = useState({
    name: '',
    members: [],
  });

  const setCreatingGroupName = (name) => setCreatingGroup({ name: name, members: creatingGroup.members});
  const addCreatingGroupMembers = (members) => setCreatingGroup({name: creatingGroup.name, members: creatingGroup.members.concat(members)});
  const setCreatingGroupMembers = (members) => setCreatingGroup({name: creatingGroup.name, members: members});
  const removeCreatingGroupMember = (memberId) => setCreatingGroup({name: creatingGroup.name, members: creatingGroup.members.filter(({id}) => id !== memberId)});

  return { creatingGroup, setCreatingGroupName, removeCreatingGroupMember, addCreatingGroupMembers, setCreatingGroup, setCreatingGroupMembers };
};

const useGroupState = () => {
  const [groupList, setGroupList] = useState(GROUP_LIST);

  const addGroup = (group) => setGroupList([...groupList, group]);

  return { groupList, addGroup, setGroupList };
};

const useVoteState = () => {
  const [voteList, setVoteList] = useState(VOTE_LIST);

  const addVote = (vote) => setVoteList([...voteList, vote]);

  return { voteList, addVote, setVoteList };
};

const useFriendState = () => {

  const [friendList, setFriendList] = useState([]);

  const updateFriendList = (uid, access_token) => {
    apiRequest('friends.get', {
        user_id: uid,
        order: 'random',
        fields: 'first_name,last_name',
      }, access_token,
      function(users) {
        let friends = [];
        users.items.forEach(user => {
          user.name = user.first_name + ' ' + user.last_name;
          friends.push({
            id: user.id,
            name: user.name
          })
        });
        setFriendList(friends);
      },
      function(er) {
        return []
      });
  };

  return { friendList, setFriendList, updateFriendList };
};

const useEventState = () => {
  const [eventList, setEventList] = useState(EVENT_LIST);

  const vote = (id, name, agree, eventId) =>
  setEventList(eventList.map((event) => {
        if (eventId == event.id) return {
          id: event.id,
          groupId: event.groupId,
          type: event.type,
          name: event.name,
          description: event.description,
          date: event.date,
          members: [...event.members, {id: id, name: name, agree: agree}],
        };
        return event;
      }));
  const addEvent = (event) => setEventList([...eventList, event]);
  const answerQuestion = (id, answer) => setEventList(eventList.map(event => {
    if (event.id == id) return {
      id: event.id,
      type: event.type,
      from: event.from,
      groupId: event.groupId,
      name: event.name,
      question: event.question,
      answer: answer,
      date: event.date
    };
    return event;
  }));

  return { eventList, setEventList, vote, addEvent, answerQuestion };
};

export const useAppState = () => {
  const navState = useNavState();
  const userState = useUserState();
  const groupState = useGroupState();
  const eventState = useEventState();
  const creatingGroupState = useCreatingGroupState();
  const friendState = useFriendState();
  const voteState = useVoteState();

  return {
    ...navState,
    ...userState,
    ...groupState,
    ...eventState,
    ...creatingGroupState,
    ...friendState,
    ...voteState,
  };
};