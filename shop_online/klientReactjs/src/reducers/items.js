// Items reducer
export default function items(state = {}, action) {
  switch (action.type) {
    case 'ITEMS_LIST_SAVE':
      return action.items;

    case 'ITEMS_ADD_SAVE':
      const item = action.item;
      item.id = item.id || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      return [...state, item];

    case 'ITEMS_EDIT_SAVE':
      return state.map(item =>
        Number(item.id) === Number(action.item.id) ? {...action.item} : item
      );
      break;

    case 'ITEMS_DELETE_SAVE':
      return state.filter(item =>
        Number(item.id) !== Number(action.item_id)
      );

    // initial state
    default:
      return state;
  }
}
