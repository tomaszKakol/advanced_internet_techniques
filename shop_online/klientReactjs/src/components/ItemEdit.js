import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Field, SubmissionError, reduxForm, formValueSelector } from "redux-form";
import { PageHeader, Form, Col, Row, FormGroup } from "react-bootstrap";
import FormField from "./common/FormField";
import FormSubmit from "./common/FormSubmit";

/**
 * Item add/edit page component
 * constructor -> bind <this> to the event method
 * formSubmit(values) -> submit the form
 * ItemEditForm -> decorate the form component
 * mapStateToProps(state, own_props) -> export the connected class
 */
export class ItemEdit extends React.Component {

  constructor(props) {
    super(props);

    
    this.formSubmit = this.formSubmit.bind(this);
  }

  render() {
    const {item, categories, handleSubmit, error, invalid, submitting} = this.props;
    return (
      <div className="page-item-edit">
        <PageHeader>{'Item ' + (item.id ? 'edit' : 'add')}</PageHeader>
        <Form horizontal onSubmit={handleSubmit(this.formSubmit)}>
          <Field component={FormField} name="name" label="Name" doValidate={true}/>
          <Field component={FormField} name="quantity" label="Quantity" doValidate={true}/>
          <FormGroup>
          <Row>
            <Col sm={3}>Category</Col>
            <Col sm={9}>
              <Field name="category" id="category" component="select">
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  );
                })}
              </Field>
            </Col>
          </Row>
          </FormGroup>
          <FormSubmit error={error} invalid={invalid} submitting={submitting} buttonSaveLoading="Saving..."
            buttonSave="Save"/>
        </Form>
      </div>
    );
  }

  formSubmit(values) {
    const {dispatch} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'ITEMS_ADD_EDIT',
        item: {
          id: values.id || 0,
          name: values.name,
          quantity: values.quantity,
          category: { id: parseInt(values.category) }
        },
        callbackError: (error) => {
          reject(new SubmissionError({_error: error}));
        },
        callbackSuccess: () => {
          dispatch(push('/'));
          resolve();
        }
      });
    });
  }
}

const ItemEditForm = reduxForm({
  form: 'item_edit',
  validate: function (values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if(!values.quantity) {
      errors.quantity = 'Quantity is required';
    }
    return errors;
  },
})(ItemEdit);

function mapStateToProps(state, own_props) {
  const item = state.items.find(x => Number(x.id) === Number(own_props.params.id)) || {};
  return {
    item,
    initialValues: item.id ? {...item, category: item.category.id.toString()} : { category: "1"},
    categories: state.categories
  };
}
export default connect(mapStateToProps)(ItemEditForm);
