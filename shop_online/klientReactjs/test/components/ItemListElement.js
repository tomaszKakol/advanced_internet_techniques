import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import ItemListElement from "../../src/components/common/ItemListElement";

/**
 * Itemunit tests for the ItemListElement component
 */
describe('ItemListElement component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {item: {name: "test", category: {id: 1}}, showDelete: ()=>{}};
      const wrapper = shallow(<ItemListElement {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
