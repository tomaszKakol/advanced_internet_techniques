import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { itemsFetchList, itemsAddEdit, itemsDelete, itemsFetchCategories } from "./items";

export function* sagas() {
  yield [
    fork(takeLatest, 'ITEMS_FETCH_LIST', itemsFetchList),
    fork(takeLatest, 'ITEMS_ADD_EDIT', itemsAddEdit),
    fork(takeLatest, 'ITEMS_DELETE', itemsDelete),
    fork(takeLatest, 'ITEMS_FETCH_CATEGORY', itemsFetchCategories),
  ];
}
