import React, {Fragment} from 'react';
import {
  Cell,
  Group,
  PanelHeaderSimple,
} from "@vkontakte/vkui";

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