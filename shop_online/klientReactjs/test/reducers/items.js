import assert from "assert";
import items from "../../src/reducers/items";

/**
 *  unit tests for the items reducers
 * mocha - http://mochajs.org/#getting-started
 * assert - https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message
 */
 describe('Items reducer', () => {
  describe('ITEMS_LIST_SAVE', () => {
    it('should return a list of items', () => {
      assert.deepEqual(
        items({}, {
          type: 'ITEMS_LIST_SAVE',
          items: [{
            id: 1,
            name: 'Some name',
            quantity: '1',
            category: {id:1, name:"category_test"}
          }],
        }), [{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }]
      );
    });
  });

  describe('ITEMS_ADD_SAVE', () => {
    it('Should return a new item array element', () => {
      assert.deepEqual(
        items([{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }], {
          type: 'ITEMS_ADD_SAVE',
          item: {
            id: 2,
            name: 'Some name 2',
            quantity: '1',
            category: {id:1, name:"category_test"}
          },
        }), [{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }, {
          id: 2,
          name: 'Some name 2',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }]
      );
    });
  });

  describe('ITEMS_EDIT_SAVE', () => {
    it('should return an edited item array element', () => {
      assert.deepEqual(
        items([{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }, {
          id: 2,
          name: 'Some name 2',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }], {
          type: 'ITEMS_EDIT_SAVE',
          item: {
            id: 2,
            name: 'Changed name 2',
            quantity: '1',
            category: {id:1, name:"category_test"}
          },
        }), [{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }, {
          id: 2,
          name: 'Changed name 2',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }]
      );
    });
  });

  describe('ITEMS_DELETE_SAVE', () => {
    it('should return the item array without the deleted element', () => {
      assert.deepEqual(
        items([{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }, {
          id: 2,
          name: 'Some name 2',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }], {
          type: 'ITEMS_DELETE_SAVE',
          item_id: 2,
        }), [{
          id: 1,
          name: 'Some name',
          quantity: '1',
          category: {id:1, name:"category_test"}
        }]
      );
    });
  });
});
