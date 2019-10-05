import React from "react";
import { shallow } from "enzyme";
import assert from "assert";
import ItemDeletePrompt from "../../src/components/common/ItemDeletePrompt";

/**
 * unit tests for the ItemDeletePrompt component
 */
describe('ItemDeletePrompt component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {show: true, item: {}, hideItem: ()=>{}, itemDelete: ()=>{}};
      const wrapper = shallow(<ItemDeletePrompt {...props}/>);
      assert.equal(wrapper.length, 1);
    });
  });
});
