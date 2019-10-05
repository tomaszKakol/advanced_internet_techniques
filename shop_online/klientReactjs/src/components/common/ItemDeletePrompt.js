import React, { PropTypes } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ItemDeletePrompt extends React.Component {

  render() {
    const {show, item, hideDelete, itemDelete} = this.props;
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete the item  <strong>{item.name}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={hideDelete}>No</Button>
          <Button bsStyle="primary" onClick={itemDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ItemDeletePrompt.propTypes = {
  show: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  hideDelete: PropTypes.func.isRequired,
  itemDelete: PropTypes.func.isRequired,
}
