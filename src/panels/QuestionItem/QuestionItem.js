import React, {Fragment} from 'react';
import {
  Cell,
  Div, FixedLayout, Group,
  List, PanelHeaderContent,
  PanelHeaderSimple,
} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

const QuestionItem = () => {

  const goToHome = () => window.history.back();

  return (
    <Fragment>
      <PanelHeaderSimple left={<Icon24Back onClick={() => {goToHome()}} />}>
        Вопрос
      </PanelHeaderSimple>
      <Div>
        <Cell multiline style={{width: '80%', background: 'rgba(0, 0, 255, 0.1)'}}>
          Тут огромный текст Тут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текст
        </Cell>
      </Div>
      <Div>
        <Cell multiline style={{background: 'rgba(0, 255, 0, 0.1)', marginLeft: '20%'}}>
          Тут огромный текст Тут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текстТут огромный текст
        </Cell>
      </Div>
    </Fragment>
  )
};

export default QuestionItem;