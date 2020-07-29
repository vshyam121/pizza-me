import { checkProps, findByTestAttr } from '../../../shared/util';
import React from 'react';
import SignedUpMessage from './SignedUpMessage';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<SignedUpMessage {...props} />);
  return component;
};

describe('SignedUpMessage component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'signed-up');
    expect(wrapper.length).toBe(1);
  });
});
