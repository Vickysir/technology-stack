/*
 * @Author: your name
 * @Date: 2021-04-01 18:47:03
 * @LastEditTime: 2021-04-01 18:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /technology-stack/自动化测试/Jest/enzyme/__test__/CheckboxWithLabel-test.js
 */
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import CheckboxWithLabel from '../CheckboxWithLabel';

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});