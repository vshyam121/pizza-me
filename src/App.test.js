import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';
import { findByTestAttr } from './shared/util';

const setUp = () => {
  const wrapper = shallow(<App />);
  return wrapper;
};

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp({});
  });

  it('Should render without errors', () => {
    const component = findByTestAttr(wrapper, 'layout');
    expect(component.length).toBe(1);
  });

  it('Should render PizzaBuilder without errors', () => {
    const component = findByTestAttr(wrapper, 'pizzaBuilder');
    expect(component.length).toBe(1);
  });

  it('Should render Sidebar without errors', () => {
    const component = findByTestAttr(wrapper, 'sidebar');
    expect(component.length).toBe(1);
  });
});
