import { checkProps, findByTestAttr } from '../../../shared/util';
import React from 'react';
import OrderSubmissionMessage from './OrderSubmissionMessage';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<OrderSubmissionMessage {...props} />);
  return component;
};

describe('OrderSubmissionMessage component', () => {
  let component;
  let mockFunc;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = findByTestAttr(component, 'order-submission');
    expect(wrapper.length).toBe(1);
  });

  it('Should render thanks message without errors', () => {
    const wrapper = findByTestAttr(component, 'thanks');
    expect(wrapper.length).toBe(1);
  });

  it('Should render orders link without errors', () => {
    const wrapper = findByTestAttr(component, 'orders');
    expect(wrapper.length).toBe(1);
  });
});
