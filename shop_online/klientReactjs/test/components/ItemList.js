import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import { ItemList } from "../../src/components/common/ItemList";

/**
 * unit tests for the ItemList component
 */
describe('ItemList component', () => {
  describe('render()', () => {
    it('should render the progressbar', () => {
      const props = {items: []};
      const wrapper = shallow(<ItemList {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
