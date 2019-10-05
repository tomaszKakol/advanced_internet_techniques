import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Table, Pagination } from "react-bootstrap";
import ItemListElement from "./ItemListElement";
import ItemDeletePrompt from "./ItemDeletePrompt";

export class ItemList extends React.Component {

  constructor(props) {
    super(props);
 /** 
  * default ui local state
  */
    this.state = {
      delete_show: false,
      delete_item: {},
    };

/** 
 * bind <this> to the event method
 */
    this.changePage = this.changePage.bind(this);
    this.showDelete = this.showDelete.bind(this);
    this.hideDelete = this.hideDelete.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
  }

/** 
 * pagination
 */  
  render() {
    const {items, page} = this.props;
    const per_page = 10;
    const pages = Math.ceil(items.length / per_page);
    const start_offset = (page - 1) * per_page;
    let start_count = 0;
/** 
 * show the list of items
 */      
    return (
      <div>
        <Table bordered hover responsive striped>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            if (index >= start_offset && start_count < per_page) {
              start_count++;
              return (
                <ItemListElement key={index} item={item} showDelete={this.showDelete}/>
              );
            }
          })}
          </tbody>
        </Table>

        <Pagination className="items-pagination pull-right" bsSize="medium" maxButtons={10} first last next
          prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage}/>

        <ItemDeletePrompt show={this.state.delete_show} item ={this.state.delete_item}
          hideDelete={this.hideDelete} itemDelete={this.itemDelete} />
      </div>
    );
  }

/** 
 * change the items list' current page
 */  
  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
  } 

/** 
 * show the delete item prompt
 */  
  showDelete(item) {
    // change the local ui state
    this.setState({
      delete_show: true,
      delete_item: item,
    });
  }

/** 
 * hide the delete item prompt
 */    
  hideDelete() {
/** 
 * change the local ui state
 */     
    this.setState({
      delete_show: false,
      delete_item: {},
    });
  }

/** 
 * delete the item
 */  
  itemDelete() {
/** 
 * delete the item
 */  
    this.props.dispatch({
      type: 'ITEMS_DELETE',
      item_id: this.state.delete_item.id,
    });

/** 
 * hide the prompt
 */    
    this.hideDelete();
  }
}

/** 
 * export the connected class
 */
function mapStateToProps(state) {
  return {
    items: state.items,

/** 
 * https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
 * react-router-redux wants you to get the url data by passing the props through a million components instead of
 * reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
 */     
   page: Number(state.routing.locationBeforeTransitions.query.page) || 0,
  };
}
export default connect(mapStateToProps)(ItemList);
