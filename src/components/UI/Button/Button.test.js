import { checkProps, findByTestAttr } from '../../../shared/util';
import React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<Button {...props} />);
  return component;
};

describe('Button component', () => {
  describe('Checking proptypes', () => {
    it('Should not throw a warning for correct prop types', () => {
      const expectedProps = {
        disabled: true,
        type: 'test type',
        children: <React.Fragment />,
        onClick: jest.fn(),
      };
      const propsErr = checkProps(Button, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let component;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        disabled: true,
        type: 'test type',
        children: <React.Fragment />,
        onClick: mockFunc,
      };
      component = setUp(props);
    });

    it('Should render without errors', () => {
      const wrapper = findByTestAttr(component, 'button');
      expect(wrapper.length).toBe(1);
    });

    it('Should call onClick when button is clicked', () => {
      const wrapper = findByTestAttr(component, 'button');
      wrapper.simulate('click');
      const callBack = mockFunc.mock.calls.length;
      expect(callBack).toBe(1);
    });
  });
});
