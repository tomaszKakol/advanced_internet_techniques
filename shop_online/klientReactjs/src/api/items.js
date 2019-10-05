import SERVER_BASE_URL from './config';

/** 
 * export default class ApiItems -> API Items static class
 * static getList({page, size = 10}) -> get a list of items
 * static get(id) -> get a item detail 
 * static getCategories() -> get the item categories
 * static addEdit(data) -> add/edit item ,  Call add/update rest service
 * static update(data) -> update a item
 * static delete(id) -> delete a item
 */
export default class ApiItems {

  static getList({page, size = 10}) {
    return fetch(`${SERVER_BASE_URL}/item/list?page=${page}&size=${size}`, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'})
    }).then(response => response.json());
  }

  static get(id) {
    return fetch(`${SERVER_BASE_URL}/item/${id}`, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'})
    }).then(response => response.json());
  }

  static getCategories() {
    return fetch(`${SERVER_BASE_URL}/category/list`, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'})
    }).then(response => response.json());
  }

  static addEdit(data) {
      return fetch(`${SERVER_BASE_URL}/item`, {
        method: !data.id ? 'post' : 'put',
        mode: 'cors',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
      }).then(response => response.json());
  }

  static update(data) {
    return fetch(`${SERVER_BASE_URL}/item`, {
      method: 'put',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(data)
    }).then(response => response.json());
  }

  static delete(id) {
    return fetch(`${SERVER_BASE_URL}/item/${id}`, {
      method: 'delete',
      mode: 'cors',
      headers: new Headers({'content-type': 'application/json'})
    });
  }
}
