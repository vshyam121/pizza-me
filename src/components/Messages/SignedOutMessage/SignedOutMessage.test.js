import { checkProps, findByTestAttr } from '../../../shared/util';
import React from 'react';
import SignedOutMessage from './SignedOutMessage';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<SignedOutMessage {...props} />);
  return component;
};

describe('SignedOutMessage component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'signed-out');
    expect(wrapper.length).toBe(1);
  });
});
