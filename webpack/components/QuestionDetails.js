import React, { Component, PropTypes } from 'react';
import { questionProps } from "../prop-types/question_props";
import VersionInfo from "./VersionInfo";
import ResponseSetList from "./ResponseSetList";
import CodedSetTable from "../components/CodedSetTable";
import moment from 'moment';
import _ from 'lodash';
import Routes from "../routes";
import { hashHistory } from 'react-router';
import currentUserProps from "../prop-types/current_user_props";

export default class QuestionDetails extends Component {
  render() {
    const {question} = this.props;
    const {responseSets} = this.props;
    if(!question){
      return (<div>Loading...</div>);
    }

    return (
      <div id={"question_id_"+question.id}>
        <div className="showpage_header_container no-print">
          <ul className="list-inline">
            <li className="showpage_button"><span className="fa fa-arrow-left fa-2x" aria-hidden="true" onClick={hashHistory.goBack}></span></li>
            <li className="showpage_title">Question Details</li>
          </ul>
        </div>
        {this.historyBar(question)}
        {this.mainContent(question, responseSets)}
      </div>
    );
  }

  mainContent(question, responseSets) {
    return (
      <div className="col-md-9 nopadding maincontent">
        {this.props.currentUser && this.props.currentUser.id && question.mostRecent == question.version &&
          <div className="action_bar no-print">
            <a className="btn btn-default" href={`/landing#/questions/${question.id}/revise`}>Revise</a>
          </div>
        }
        <div className="maincontent-details">
          <h3 className="maincontent-item-name"><strong>Name:</strong> {question.content} </h3>
          <p className="maincontent-item-info">Version: {question.version} - Author: {question.createdBy && question.createdBy.email} </p>
          <div className="basic-c-box panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Details</h3>
            </div>
            <div className="box-content">
              <strong>Description: </strong>
              {question.description}
            </div>
            <div className="box-content">
              <strong>Created: </strong>
              { moment(question.createdAt,'').format('MMMM Do YYYY, h:mm:ss a') }
            </div>
            <div className="box-content">
              <strong>Harmonized: </strong>
              {question.harmonized ? 'Yes' : 'No'}
            </div>
            {question.questionType && <div className="box-content">
              <strong>Question Type: </strong>
              {question.questionType.name}
            </div>}
            {question.responsetype && <div className="box-content">
              <strong>Primary Response Type: </strong>
              {question.responsetype.name}
            </div>}
          </div>
          {question.concepts && question.concepts.length > 0 &&
            <div className="basic-c-box panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Concepts</h3>
              </div>
              <div className="box-content">
                <div id="concepts-table">
                  <CodedSetTable items={question.concepts} itemName={'Concept'} />
                </div>
              </div>
            </div>
          }
          {responseSets && responseSets.length > 0 &&
            <div className="basic-c-box panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Linked Response Sets</h3>
              </div>
              <div className="box-content">
                <ResponseSetList responseSets={_.keyBy(responseSets, 'id')} routes={Routes} />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
  historyBar(question) {
    return (
      <div className="col-md-3 nopadding no-print">
        <div className="showpage_sidenav_subtitle">
          <ul className="list-inline">
            <li className="subtitle_icon"><span className="fa fa-history" aria-hidden="true"></span></li>
            <li className="subtitle">History</li>
          </ul>
        </div>
        <VersionInfo versionable={question} versionableType='Question' />
      </div>
    );
  }
}

QuestionDetails.propTypes = {
  question:  questionProps,
  currentUser:   currentUserProps,
  responseSets: PropTypes.array
};
