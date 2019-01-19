/*
 * TextBox Messages
 *
 * This contains all the text for the TextBox component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TextBox';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    eng: 'YO YO YO',
    defaultMessage: 'This is the TextBox component!',
  },
});
