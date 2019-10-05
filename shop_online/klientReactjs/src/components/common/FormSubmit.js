import React, { PropTypes } from "react";
import { FormGroup, HelpBlock, Button } from "react-bootstrap";

export default class FormSubmit extends React.Component {
  render() {
    const {error, invalid, submitting, buttonSaveLoading, buttonSave} = this.props;
    return (
      <div>
        {error &&
        <FormGroup validationState="error">
          <HelpBlock>{error}</HelpBlock>
        </FormGroup>}

        <FormGroup className="submit">
          <Button type="submit" bsStyle="primary" disabled={invalid || submitting}>
            {submitting ?
              (buttonSaveLoading ? buttonSaveLoading : 'Saving...') :
              (buttonSave ? buttonSave : 'Save')}
          </Button>
        </FormGroup>
      </div>
    );
  }
}

/** 
 * prop checks
 *  error -> redux-form general `_error` message
 * invalid -> redux-form invalid prop
 * submitting -> redux-form invalid submitting
 * buttonSaveLoading -> save button loading text, default is "Saving..."
 * buttonSave -> save button text, default is "Save"
 */
FormSubmit.propTypes = {
  error: PropTypes.string, 
  invalid: PropTypes.bool,  
  submitting: PropTypes.bool,  
  buttonSaveLoading: PropTypes.string,
  buttonSave: PropTypes.string, 
};
