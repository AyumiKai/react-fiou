import { addParameters, addDecorator, configure } from '@storybook/react';
import theme from './theme';

addParameters({
  options: {
    theme
  }
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
