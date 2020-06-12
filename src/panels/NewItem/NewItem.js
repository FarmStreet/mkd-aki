import React, {Fragment} from 'react';
import {
  Cell,
  Div, FixedLayout, Group,
  List, PanelHeaderContent,
  PanelHeaderSimple,
} from "@vkontakte/vkui";
import {pages} from "../../router";
import {useRouter} from "react-router5";

import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Work from '@vkontakte/icons/dist/24/work';
import Icon24Advertising from '@vkontakte/icons/dist/24/advertising';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Note from '@vkontakte/icons/dist/24/note';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const NewItem = () => {

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Новость
      </PanelHeaderSimple>
      <Group>
        <Cell multiline>
          Тут огромный текст Тут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текст
        </Cell>
      </Group>
    </Fragment>
  )
};

export default NewItem;