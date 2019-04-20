import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Basic from './examples/basic';
import BasicCode from './examples/basic/code.md';

storiesOf('Basic', module).add('Basic example', () => <Basic />, { notes: BasicCode });
