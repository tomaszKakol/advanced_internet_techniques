import React from "react";
import ItemList from "./common/ItemList";

export default class Home extends React.Component {
  render() {
    return (
      <div className="page-home">
        <ItemList/>
      </div>
    );
  }
}
