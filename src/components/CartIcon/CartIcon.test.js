import { checkProps, findByTestAttr } from "../../shared/util";
import CartIcon from "./CartIcon";
import React from "react";
import { shallow } from "enzyme";

const setUp = (props) => {
  const component = shallow(<CartIcon.WrappedComponent {...props} />);
  return component;
};

describe("CartIcon component", () => {
  describe("Checking proptypes", () => {
    it("Should not throw a warning for correct prop types", () => {
      const expectedProps = {
        numItemsAdded: 0,
        quantity: 0,
        isAuthenticated: "test",
      };
      const propsErr = checkProps(CartIcon.WrappedComponent, expectedProps);
      expect(propsErr).toBeUndefined();
    });

    it("Should throw a warning for incorrect numItemsAdded", () => {
      const expectedProps = {
        numItemsAdded: "test",
        quantity: 0,
        isAuthenticated: "test",
      };
      const propsErr = checkProps(CartIcon.WrappedComponent, expectedProps);
      expect(propsErr).toBeDefined();
    });

    it("Should throw a warning for incorrect quantity", () => {
      const expectedProps = {
        numItemsAdded: 0,
        quantity: "test",
        isAuthenticated: "test",
      };
      const propsErr = checkProps(CartIcon.WrappedComponent, expectedProps);
      expect(propsErr).toBeDefined();
    });

    it("Should throw a warning for incorrect isAuthenticated", () => {
      const expectedProps = {
        numItemsAdded: 0,
        quantity: "test",
        isAuthenticated: false,
      };
      const propsErr = checkProps(CartIcon.WrappedComponent, expectedProps);
      expect(propsErr).toBeDefined();
    });
  });

  describe("Have props", () => {
    let component;

    beforeEach(() => {
      const props = {
        numItemsAdded: 1,
        quantity: 1,
        location: { pathname: "/" },
      };
      component = setUp(props);
    });

    it("Should render container without errors", () => {
      const wrapper = findByTestAttr(component, "cartIconContainer");
      expect(wrapper.length).toBe(1);
    });

    it("Should render navigation item without errors", () => {
      const wrapper = findByTestAttr(component, "navigationItem");
      expect(wrapper.length).toBe(1);
    });

    it("Should render cartIcon without errors", () => {
      const wrapper = findByTestAttr(component, "cartIcon");
      expect(wrapper.length).toBe(1);
    });

    it("Should render numItems without errors", () => {
      const wrapper = findByTestAttr(component, "numItems");
      expect(wrapper.length).toBe(1);
    });

    it("Should render dropdown alert without errors", () => {
      const wrapper = findByTestAttr(component, "itemAdded");
      expect(wrapper.length).toBe(1);
    });
  });
});
