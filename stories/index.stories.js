import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Basic from './examples/basic';
import BasicCode from './examples/basic/code.md';
import AsyncValidate from './examples/asyncValidate';
import AsyncValidateCode from './examples/asyncValidate/code.md'


storiesOf('Basic', module).add('Basic example', () => <Basic />, { notes: BasicCode });
storiesOf('Async validate', module).add('Async validate example', () => <AsyncValidate />, { notes: AsyncValidateCode });