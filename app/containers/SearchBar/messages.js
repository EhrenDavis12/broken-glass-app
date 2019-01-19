/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SearchBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Business name',
  },
  searchLabel: {
    id: `${scope}.searchLabel`,
    defaultMessage: 'Business name',
  },
  button:{
    id: `${scope}.button`,
    defaultMessage: 'Search',
  }
});
