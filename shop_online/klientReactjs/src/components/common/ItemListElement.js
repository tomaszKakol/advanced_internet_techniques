import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon } from "react-bootstrap";

export default class ItemListElement extends React.Component {
  render() {
    const {item, showDelete} = this.props;
    return (
      <tr>
        <td>#{item.id}</td>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.category.name}</td>
        <td>
          <Link to={'item-edit/' + item.id}>
            <Button bsSize="xsmall">
              Edit <Glyphicon glyph="edit"/>
            </Button>
          </Link>
        </td>
        <td>
          <Button bsSize="xsmall" className="item-delete" onClick={() => showDelete(item)}>
            Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    );
  }
}

ItemListElement.propTypes = {
  item: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
}
