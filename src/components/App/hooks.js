import { useState } from 'react';

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

export const useAppState = () => {
  const navState = useNavState();
  const userState = useUserState();

  return {
    ...navState,
    ...userState,
  };
};