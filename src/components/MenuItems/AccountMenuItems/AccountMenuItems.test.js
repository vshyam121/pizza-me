import {
  checkProps,
  findByTestAttr,
  findByElementType,
} from '../../shared/util';
import React from 'react';
import AccountMenuItems from './AccountMenuItems';
import { shallow } from 'enzyme';

const setUp = (props) => {
  const component = shallow(<AccountMenuItems {...props} />);
  return component;
};

describe('AccountMenuItems component', () => {
  describe('Checking proptypes', () => {
    it('Should not throw a warning for correct prop types', () => {
      const expectedProps = {
        isAuthenticated: 'test',
      };
      const propsErr = checkProps(AccountMenuItems, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('User authenticated', () => {
    let component;
    beforeEach(() => {
      const props = {
        isAuthenticated: 'test',
      };
      component = setUp(props);
    });

    it('Should render without errors', () => {
      const wrapper = findByElementType(component, 'Fragment');
      expect(wrapper.length).toBe(1);
    });

    it('Should render my orders navigation item without errors', () => {
      const wrapper = findByTestAttr(component, 'my-orders');
      expect(wrapper.length).toBe(1);
    });

    it('Should render signout navigation item without errors', () => {
      const wrapper = findByTestAttr(component, 'signout');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('User not authenticated', () => {
    let component;
    let mockFunc;
    beforeEach(() => {
      component = setUp();
    });

    it('Should render without errors', () => {
      const wrapper = findByTestAttr(component, 'signin');
      expect(wrapper.length).toBe(1);
    });
  });
});
