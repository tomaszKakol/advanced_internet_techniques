import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { ItemEdit } from "../../src/components/ItemEdit";

/**
 * unit tests for the ItemEdit component
 */
describe('ItemEdit component', () => {
  describe('render()', () => {
    it('should render the add item form', () => {
      const props = {item: {}, categories: [], handleSubmit: ()=>{}};
      const wrapper = shallow(<ItemEdit {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
