import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout";
import { findByTestAttr, checkProps } from "../../../shared/util";

const setUp = (props) => {
  const component = shallow(
    <Layout {...props}>
      <React.Fragment></React.Fragment>
    </Layout>
  );
  return component;
};

describe("Layout component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  describe("Checking proptypes", () => {
    it("Should not throw a warning for prop children object", () => {
        const expectedProps = {
            children: <React.Fragment/>
        }
        const propsErr = checkProps(Layout, expectedProps);
        expect(propsErr).toBeUndefined();
    });

    it("Should not throw a warning for prop children array", () => {
        const expectedProps = {
            children: [<React.Fragment/>, <React.Fragment/>]
        }
        const propsErr = checkProps(Layout, expectedProps);
        expect(propsErr).toBeUndefined();
    });

    it("Should throw a warning for prop children undefined", () => {
      const expectedProps = {
          children: undefined
      }
      const propsErr = checkProps(Layout, expectedProps);
      expect(propsErr).toBeDefined();
  });
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "layout");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a header", () => {
    const wrapper = findByTestAttr(component, "header");
    expect(wrapper.length).toBe(1);
  });

  it("Should render main element", () => {
    const wrapper = findByTestAttr(component, "main");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a footer", () => {
    const wrapper = findByTestAttr(component, "footer");
    expect(wrapper.length).toBe(1);
  });
});
