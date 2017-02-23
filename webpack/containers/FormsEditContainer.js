import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchForm, saveForm, newForm } from '../actions/form_actions';
import { removeQuestion, reorderQuestion, fetchQuestions } from '../actions/questions_actions';
import FormEdit from '../components/FormEdit';
import { fetchResponseSets } from '../actions/response_set_actions';
import QuestionSearchContainer from './QuestionSearchContainer';
import { formProps } from '../prop-types/form_props';
import { questionProps } from '../prop-types/question_props';
import { responseSetProps } from '../prop-types/response_set_props';
import _ from 'lodash';

class FormsEditContainer extends Component {
  componentWillMount() {
    if (this.props.params.formId) {
      this.props.fetchForm(this.props.params.formId);
    }    else {
      this.props.newForm();
      this.props.params.formId = 0;
      this.props.params.action = 'new';
    }
    this.props.fetchResponseSets();
    this.props.fetchQuestions();
  }

  componentDidUpdate() {
    if(this.props.form && this.props.form.formQuestions) {
      this.refs.form.setState(Object.assign(this.refs.form.state, {formQuestions: this.props.form.formQuestions}));
    }
  }

  render() {
    if(!this.props.form || !this.props.questions){
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="container basic-bg">
        <div className="row">
          <div className="col-md-4">
          <QuestionSearchContainer
            allQs={this.props.questions}
            allRs={this.props.responseSets}
            form={this.props.form} />
          </div>
          <FormEdit form={this.props.form}
            responseSets={this.props.responseSets}
            reorderQuestion={this.props.reorderQuestion}
            removeQuestion={this.props.removeQuestion}
            action={this.props.params.action || 'new'}
            formSubmitter={this.props.saveForm}
            route={this.props.route}
            router={this.props.router}
            questions={this.props.questions}
            ref='form'
            />
        </div>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchResponseSets, fetchQuestions, newForm, fetchForm, removeQuestion, reorderQuestion, saveForm}, dispatch);
}
function mapStateToProps(state, ownProps) {
  return {
    form: state.forms[ownProps.params.formId||0],
    responseSets: _.values(state.responseSets),
    questions: _.values(state.questions)
  };
}
FormsEditContainer.propTypes = {
  form: formProps,
  fetchForm: PropTypes.func,
  removeQuestion:  PropTypes.func.isRequired,
  reorderQuestion: PropTypes.func.isRequired,
  fetchResponseSets: PropTypes.func.isRequired,
  newForm: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  questions: PropTypes.arrayOf(questionProps),
  responseSets: PropTypes.arrayOf(responseSetProps),
  saveForm: PropTypes.func.isRequired,
  route:  PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(FormsEditContainer);