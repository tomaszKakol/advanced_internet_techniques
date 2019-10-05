import React from "react";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import Menu from "./common/Menu";
import "../stylesheets/main.scss";

/**
 *componentWillMount() ->  pre-render logic
 * the first time we load the app, we need that items list
 * in a second time load item categories form edit/ad form

 * render() -> show the loading state while we wait for the app to load
 * function mapStateToProps(state) -> export the connected class
 */
export class App extends React.Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'ITEMS_FETCH_LIST',
      options: {page: this.props -1, size: 10} 
    });
    this.props.dispatch({type: 'ITEMS_FETCH_CATEGORY'});
  }

  render() {
    const {items, children} = this.props;
    if (!items.length) {
      return (
        <ProgressBar active now={100}/>
      );
    }

    return (
      <div className="container">
        <div>
          <Menu/>
        </div>
        <div>
          {children}
        </div>
        <div className="footer">
          <img src="/media/logo.svg"/>
          <span>
            Simple shopping cart apps, AGH 2018
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items || [],
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  };
}
export default connect(mapStateToProps)(App);
