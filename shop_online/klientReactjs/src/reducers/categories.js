/**  
 * Item Categories reducer
 */
export default function categories(state = {}, action) {
  switch (action.type) {
    case 'ITEMS_CATEGORY_SAVE':
      return action.categories;
/**  
 * initial state
 */
    default:
      return state;
  }
}
