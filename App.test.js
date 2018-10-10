import React from 'react';
import App from './src/components/App';

import renderer from 'react-test-renderer';
import Search from './src/components/Search';
import Doctor from './src/components/Doctor';

it('renders without crashing', () => {
  const rendered = renderer.create(<Search />).toJSON();
  expect(rendered).toBeTruthy();
});
