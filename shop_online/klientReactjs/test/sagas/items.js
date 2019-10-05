import { call, put } from "redux-saga/effects";
import sinon from 'sinon';
import { expectSaga } from 'redux-saga-test-plan';
import assert from "assert";
import { itemsFetchList, itemsAddEdit, itemsDelete } from "../../src/sagas/items";
import ApiItems from "../../src/api/items";



/**
 * unit tests for the items saga
 */
describe('Items saga', () => {

  describe('itemsFetchList()', () => {
    /**
     *  mock fetch list results
     */
    const serviceResponse = {content:[{name:"item name", quantity: 2, category: {id:1, name:"category Name"}}]};
    sinon.stub(ApiItems, 'getList').returns(serviceResponse);

    it('should return the ITEMS_LIST_SAVE action', () => {
      expectSaga(itemsFetchList, {options: {page:0, size:10}})
        .put({type: 'ITEMS_LIST_SAVE', items: serviceResponse});
    });

  });

  describe('itemsAddEdit() - add', () => {
    /**
     * mock item add response
     */
    const serviceResponse = {
      name:"item name",
      quantity: 2,
      category: {id:1, name:"category Name"}
    };
    sinon.stub(ApiItems, 'addEdit').returns(serviceResponse);

    const action = {
      item: {},
      callbackSuccess: () => {},
    };
    it('should return the ITEMS_ADD_SAVE action', () => {
      expectSaga(itemsAddEdit, action)
        .put({type: 'ITEMS_ADD_SAVE', items: serviceResponse});
    });

  });

  describe('itemsAddEdit() - edit', () => {
    /**
     * response is already mocked for addEdit service
     */
    const serviceResponse = {
      name:"item name",
      quantity: 2,
      category: {id:1, name:"category Name"}
    };

    const action = {
      item: {id: 1},
      callbackSuccess: () => {},
    };

    it('should return the ITEMS_ADD_SAVE action', () => {
      expectSaga(itemsAddEdit, action)
        .put({type: 'ITEMS_EDIT_SAVE', items: serviceResponse});
    });
  });

  describe('itemsDelete()', () => {
    /**
     * mock delete service
     */
    sinon.stub(ApiItems, 'delete').returns({});

    const action = {
      item_id: 1,
    };

    it('should return the ITEMS_DELETE_SAVE action', () => {
      expectSaga(itemsDelete, action)
        .put({type: 'ITEMS_DELETE_SAVE', action});
    });
  });

});
