import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import $ from 'jquery';

import { saveQuestion } from '../../actions/questions_actions';
import Errors from '../../components/Errors';
import QuestionEdit from '../../components/questions/QuestionEdit';
import ResponseSetList  from '../../components/response_sets/ResponseSetList';
import ResponseSetDragWidget  from '../response_sets/ResponseSetDragWidget';
import { fetchResponseTypes } from '../../actions/response_type_actions';
import { fetchQuestionTypes } from '../../actions/question_type_actions';

class QuestionModalContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {linkedResponseSets: [], showResponseSetWidget: false, showResponseSets: false};
    this.saveNewQuestion = this.saveNewQuestion.bind(this);
    this.closeQuestionModal = this.closeQuestionModal.bind(this);
    this.handleResponseSetsChange = this.handleResponseSetsChange.bind(this);
    this.handleResponseTypeChange = this.handleResponseTypeChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchQuestionTypes();
    this.props.fetchResponseTypes();
  }

  handleResponseSetsChange(newResponseSets){
    this.unsavedState = true;
    this.setState({linkedResponseSets: newResponseSets});
  }

  handleResponseTypeChange(newResponseType){
    if(['Choice', 'Open Choice'].indexOf(newResponseType.name)!==-1){
      this.setState({showResponseSets: true});
    } else {
      this.setState({showResponseSets: false, linkedResponseSets: []});
    }
  }

  saveNewQuestion(newQuestion){
    newQuestion.linkedResponseSets = this.state.linkedResponseSets;
    this.props.saveQuestion(newQuestion, (successResponse) => {
      this.setState({showResponseSetWidget: false, linkedResponseSets: [], errors: null});
      this.props.handleSaveQuestionSuccess(successResponse);
    }, (failureResponse) => {
      this.setState({errors: failureResponse.response.data});
    });
  }

  closeQuestionModal(){
    this.setState({showResponseSets: false, showResponseSetWidget:false, linkedResponseSets: [], errors: null});
    this.props.closeQuestionModal();
  }

  responseSetWidgetBody(){
    return (
      <div className={this.state.showResponseSetWidget ? '' : 'hidden'}>
        <Modal.Body bsStyle='response-set'>
          <div className="row response-set-row">
            <div className="col-md-6 response-set-label">
              <h2>Response Sets</h2>
            </div>
            <div className="col-md-6 response-set-label">
              <h2 className="tags-table-header">Selected Response Sets</h2>
            </div>
          </div>
          <ResponseSetDragWidget selectedResponseSets={this.state.linkedResponseSets}
                                 handleResponseSetsChange={this.handleResponseSetsChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({showResponseSetWidget:false})} bsStyle="primary">Done</Button>
        </Modal.Footer>
      </div>
    );
  }

  questionFormFooter(){
    if(this.state.showResponseSets){
      return (
        <Modal.Footer>
          <Button onClick={() => $('#submit-question-form').click()}>Add Question</Button>
          <Button onClick={() => this.setState({showResponseSetWidget:true})} bsStyle="primary">Response Sets</Button>
        </Modal.Footer>
      );
    } else {
      return (
        <Modal.Footer>
          <Button onClick={() => $('#submit-question-form').click()}>Add Question</Button>
        </Modal.Footer>
      );
    }
  }

  questionFormBody(){
    var responseSetsDiv = (<div></div>);
    var footer = (
      <Modal.Footer>
        <Button onClick={() => $('#submit-question-form').click()}>Add Question</Button>
      </Modal.Footer>
    );
    if(this.state.showResponseSets){
      responseSetsDiv = (
        <div className="row selected_response_sets">
          <div className="col-md-12 response-set-label">
            <h2>Response Sets</h2>
          </div>
          <div className="col-md-8">
              <div className="panel panel-default">
                <div className="panel-body">
                  {this.state.linkedResponseSets.length > 0 ? <ResponseSetList responseSets={this.state.linkedResponseSets} /> : 'No Response Sets selected'}
                </div>
              </div>
          </div>
        </div>
      );
      footer = (
        <Modal.Footer>
          <Button onClick={() => $('#submit-question-form').click()}>Add Question</Button>
          <Button onClick={() => this.setState({showResponseSetWidget:true})} bsStyle="primary">Response Sets</Button>
        </Modal.Footer>
      );
    }
    return (
      <div className={this.state.showResponseSetWidget ? 'hidden' : ''}>
        <Modal.Body bsStyle='question'>
          <QuestionEdit action={'new'}
                        question={{}}
                        questionTypes={this.props.questionTypes}
                        responseTypes={this.props.responseTypes}
                        draftSubmitter ={()=>{}}
                        deleteSubmitter={()=>{}}
                        publishSubmitter ={()=>{}}
                        questionSubmitter={this.saveNewQuestion}
                        handleResponseTypeChange={this.handleResponseTypeChange} />
          {responseSetsDiv}
        </Modal.Body>
        {footer}
      </div>
    );
  }

  render() {
    if(!this.props.questionTypes || !this.props.responseTypes){
      return (
        <div>Loading...</div>
      );
    }
    return (
      <Modal bsStyle='question' show={this.props.showModal} onHide={this.closeQuestionModal} aria-label="New Question">
        <Modal.Header closeButton bsStyle='question'>
          <Modal.Title componentClass="h1">New Question</Modal.Title>
        </Modal.Header>
        <Errors errors={this.state.errors} />
        {this.questionFormBody()}
        {this.responseSetWidgetBody()}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {questionTypes: state.questionTypes, responseTypes: state.responseTypes};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchQuestionTypes, fetchResponseTypes, saveQuestion}, dispatch);
}

QuestionModalContainer.propTypes = {
  route:  PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  saveQuestion: PropTypes.func,
  questionTypes: PropTypes.object,
  responseTypes: PropTypes.object,
  fetchQuestionTypes: PropTypes.func,
  fetchResponseTypes: PropTypes.func,
  closeQuestionModal: PropTypes.func.isRequired,
  handleSaveQuestionSuccess: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModalContainer);