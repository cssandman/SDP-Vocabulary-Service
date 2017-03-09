import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Routes from "../routes";
import moment from 'moment';
import { responseSetProps } from '../prop-types/response_set_props';
import { questionProps } from '../prop-types/question_props';
import VersionInfo from './VersionInfo';
import { hashHistory } from 'react-router';
import QuestionList  from './QuestionList';
import CodedSetTable from "../components/CodedSetTable";
import currentUserProps from "../prop-types/current_user_props";
import _ from 'lodash';

export default class ResponseSetDetails extends Component {
  render() {
    const {responseSet} = this.props;
    if(!responseSet){
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div id={"response_set_id_"+responseSet.id}>
        <div className="showpage_header_container no-print">
          <ul className="list-inline">
            <li className="showpage_button"><span className="fa fa-arrow-left fa-2x" aria-hidden="true" onClick={hashHistory.goBack}></span></li>
            <li className="showpage_title">Response Set Details {responseSet.status === 'draft' && <text>[DRAFT]</text>}</li>
          </ul>
        </div>
        {this.historyBar(responseSet)}
        {this.mainContent(responseSet)}
      </div>
    );
  }

  historyBar(responseSet) {
    return (
      <div className="col-md-3 nopadding no-print">
        <div className="showpage_sidenav_subtitle">
          <ul className="list-inline">
            <li className="subtitle_icon"><span className="fa fa-history" aria-hidden="true"></span></li>
            <li className="subtitle">History</li>
          </ul>
        </div>
        <VersionInfo versionable={responseSet} versionableType='ResponseSet' />
      </div>
    );
  }

  isRevisable(responseSet) {
    return responseSet.mostRecent === responseSet.version &&
      responseSet.status === 'published' &&
      responseSet.createdBy.id === this.props.currentUser.id;
  }

  isPublishable(responseSet) {
    return this.isEditable(responseSet);
  }

  isEditable(responseSet) {
    return responseSet.mostRecent === responseSet.version &&
      responseSet.status === 'draft' &&
      responseSet.createdBy.id === this.props.currentUser.id;
  }

  isExtendable(responseSet) {
    return responseSet.status === 'published';
  }

  mainContent(responseSet) {
    return (
      <div className="col-md-9 nopadding maincontent">
        {this.props.currentUser && this.props.currentUser.id &&
          <div className="action_bar no-print">
            {this.isRevisable(responseSet) &&
              <Link className="btn btn-default" to={`/responseSets/${responseSet.id}/revise`}>Revise</Link>
            }
            {this.isEditable(responseSet) &&
              <Link className="btn btn-default" to={`/responseSets/${responseSet.id}/edit`}>Edit</Link>
            }
            {this.isExtendable(responseSet) &&
              <Link className="btn btn-default" to={`/responseSets/${responseSet.id}/extend`}>Extend</Link>
            }
            {this.isPublishable(responseSet) &&
              <a className="btn btn-default" href="#" onClick={(e) => {
                e.preventDefault();
                this.props.publishResponseSet(responseSet.id);
                return false;
              }}>Publish</a>
            }
          </div>
        }
        <div className="maincontent-details">
          <h3 className="maincontent-item-name"><strong>Name:</strong> {responseSet.name} </h3>
          <p className="maincontent-item-info">Version: {responseSet.version} - Author: {responseSet.createdBy && responseSet.createdBy.email} </p>
          <div className="basic-c-box panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Details</h3>
            </div>
            <div className="box-content">
              <strong>Description: </strong>
              {responseSet.description}
            </div>
            <div className="box-content">
              <strong>Created: </strong>
              { moment(responseSet.createdAt,'').format('MMMM Do YYYY, h:mm:ss a') }
            </div>
            { responseSet.parent &&
              <div className="box-content">
                <strong>Extended from: </strong>
                <Link to={`/responseSets/${responseSet.parent.id}`}>{ responseSet.parent.name }</Link>
              </div>
            }
            <div className="box-content">
              <strong>OID: </strong>
              {responseSet.oid}
            </div>
          </div>
          <div className="basic-c-box panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Responses</h3>
            </div>
            <div className="box-content">
            <CodedSetTable items={responseSet.responses} itemName={'Response'} />
            </div>
          </div>
          {this.props.questions && this.props.questions.length > 0 &&
            <div className="basic-c-box panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Linked Questions</h3>
              </div>
              <div className="box-content">
                <QuestionList questions={_.keyBy(this.props.questions, 'id')} routes={Routes} />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

ResponseSetDetails.propTypes = {
  responseSet: responseSetProps,
  currentUser: currentUserProps,
  publishResponseSet: PropTypes.func,
  questions: PropTypes.arrayOf(questionProps)
};
