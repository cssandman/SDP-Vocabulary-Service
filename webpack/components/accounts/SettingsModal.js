import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

import Errors from '../Errors.js';

import currentUserProps from '../../prop-types/current_user_props';
import { surveillanceSystemsProps }from '../../prop-types/surveillance_system_props';
import { surveillanceProgramsProps } from '../../prop-types/surveillance_program_props';

export default class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {email: this.props.currentUser.email,
      id: this.props.currentUser.id,
      firstName: this.props.currentUser.firstName || '',
      lastName: this.props.currentUser.lastName || '',
      lastProgramId: this.props.currentUser.lastProgramId || 1,
      lastSystemId: this.props.currentUser.lastSystemId || 1, errors: {}};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState({email: nextProps.currentUser.email,
        id: nextProps.currentUser.id,
        firstName: nextProps.currentUser.firstName || '',
        lastName: nextProps.currentUser.lastName || '',
        lastProgramId: this.props.currentUser.lastProgramId || 1,
        lastSystemId: this.props.currentUser.lastSystemId || 1});
    }
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Errors errors={this.state.errors} />
            <div className="control-group">
              <label className="control-label" htmlFor="email">E-mail</label>
              <div className="controls">
                <input autoFocus="autofocus" placeholder="" className="form-control input-lg" type="email"
                       value={this.state.email} name="email" id="email" onChange={this.handleChange('email')} />
                <p className="help-block">Please provide your E-mail</p>
              </div>
            </div>
            <div className="field">
              <label className="control-label" htmlFor="firstName">First name</label>
              <input className="form-control input-lg" type="text" name="firstName" id="firstName"
                     value={this.state.firstName} onChange={this.handleChange('firstName')}/>
            </div>

            <div className="field">
              <label className="control-label" htmlFor="lastName">Last name</label>
              <input className="form-control input-lg" type="text" name="lastName" id="lastName"
                     value={this.state.lastName} onChange={this.handleChange('lastName')}/>
            </div>
            <div className="field">
              <label className="control-label" htmlFor="lastProgramId">Surveillance Program</label>
                <select className="form-control" name="lastProgramId" id="lastProgramId" defaultValue={this.state.lastProgramId} onChange={this.handleChange('lastProgramId')} >
                {this.props.surveillancePrograms && _.values(this.props.surveillancePrograms).map((sp) => {
                  return <option key={sp.id} value={sp.id}>{sp.name}</option>;
                })}
                </select>
            </div>
            <div className="field">
              <label className="control-label" htmlFor="lastSystemId">Surveillance System</label>
                <select className="form-control" name="lastSystemId" id="lastSystemId" defaultValue={this.state.lastSystemId} onChange={this.handleChange('lastSystemId')} >
                {this.props.surveillanceSystems && _.values(this.props.surveillanceSystems).map((ss) => {
                  return <option key={ss.id} value={ss.id}>{ss.name}</option>;
                })}
                </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-default" onClick={this.props.closer}>Close</button>
          <button type="button" className="btn btn-primary" onClick={() => this.attemptUpdate() }>Update</button>
        </Modal.Footer>
      </Modal>
    );
  }

  attemptUpdate() {
    const successHandler = () => this.props.closer();
    const failureHandler = (failureResponse) => this.setState({errors: failureResponse.response.data.errors});
    this.props.update(this.state, successHandler, failureHandler);
  }

  handleChange(field) {
    return (event) => {
      let newState = {};
      newState[field] = event.target.value;
      this.setState(newState);
    };
  }
}

SettingsModal.propTypes = {
  currentUser: currentUserProps,
  update: PropTypes.func.isRequired,
  closer: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  surveillanceSystems: surveillanceSystemsProps,
  surveillancePrograms: surveillanceProgramsProps
};
