import { call, put } from "redux-saga/effects";
import ApiItems from "../api/items";

/** 
 * itemsFetchList(action) -> fetch the item's list
 * yield call -> call the api to get the items list
 * yield put -> save the items in state
 * itemsAddEdit(action)  -> add/edit a item 
 * itemsDelete(action)  -> delete a item
 * itemsFetchCategories(action) -> fetch item categories
 */

export function* itemsFetchList(action) {

  const items = yield call(ApiItems.getList, action.options);

  yield put({
    type: 'ITEMS_LIST_SAVE',
    items: items.content,
  });
}

export function* itemsAddEdit(action) {

  const item = yield call(ApiItems.addEdit, action.item);

  yield put({
    type: action.item.id ? 'ITEMS_EDIT_SAVE' : 'ITEMS_ADD_SAVE',
    item: item,
  });

  action.callbackSuccess();  // success
}

export function* itemsDelete(action) {

  yield call(ApiItems.delete, action.item_id);

  yield put({
    type: 'ITEMS_DELETE_SAVE',
    item_id: action.item_id,
  });
}

export function* itemsFetchCategories(action) {

  const categories = yield call(ApiItems.getCategories);

  yield put({
    type: 'ITEMS_CATEGORY_SAVE',
    categories: categories,
  });
}
