import React from 'react';
import { render } from '@testing-library/react';
import {IntlProvider} from 'react-intl';
import App from './App';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
const localeLangMessages =  navigator.language.startsWith('es') ? localeEsMessages : localeEnMessages;


test('renders learn react link', () => {
  render(
    <IntlProvider locale={navigator.language} messages= { localeLangMessages }>
      <App />
  </IntlProvider>
  );
});
