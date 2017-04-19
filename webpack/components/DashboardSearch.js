import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { surveillanceSystemsProps }from '../prop-types/surveillance_system_props';
import { surveillanceProgramsProps } from '../prop-types/surveillance_program_props';
import _ from 'lodash';

class DashboardSearch extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerms: '',
      progFilters: [],
      sysFilters: [],
      showAdvSearchModal: false
    };
    this.showAdvSearch = this.showAdvSearch.bind(this);
    this.hideAdvSearch = this.hideAdvSearch.bind(this);
    this.clearAdvSearch = this.clearAdvSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.selectFilters = this.selectFilters.bind(this);
    this.onFormSubmit  = this.onFormSubmit.bind(this);
    this.surveillanceProgramsSelect = this.surveillanceProgramsSelect.bind(this);
    this.surveillanceSystemsSelect = this.surveillanceSystemsSelect.bind(this);
  }

  showAdvSearch() {
    this.setState({ showAdvSearchModal: true });
  }

  hideAdvSearch() {
    this.setState({ showAdvSearchModal: false });
  }

  clearAdvSearch() {
    this.setState({
      progFilters: [],
      sysFilters: []
    });
  }

  selectFilters(e, filterType) {
    let progIds = [];
    // _.values(e.target.selectedOptions).map((opt) => progIds.push(opt.value));
    let newState = {}
    newState[filterType] = _.values(e.target.selectedOptions).map((opt) => opt.value);
    //let newState = {'progFilters' : progIds};
    return this.setState(newState);
    // return this.setState({`${filterType}`: progIds});
  }

  surveillanceProgramsSelect() {
    if (_.isEmpty(this.props.surveillancePrograms)) {
      return <p>No surveillance programs loaded in the database</p>;
    } else {
      return (
        <div className="form-group">
          <label>Select Programs:</label>
          <select multiple className="form-control" id="select-prog" value={this.state.progFilters} onChange={(e) => this.selectFilters(e, 'progFilters')}>
            {this.props.surveillancePrograms && _.values(this.props.surveillancePrograms).map((sp) => {
              return <option key={sp.id} value={sp.id}>{sp.name}</option>;
            })}
          </select>
        </div>
      );
    }
  }

  surveillanceSystemsSelect() {
    if (_.isEmpty(this.props.surveillanceSystems)) {
      return <p>No surveillance systems loaded in the database</p>;
    } else {
      return (
        <div className="form-group">
          <label>Select Systems:</label>
          <select multiple className="form-control" id="select-sys" value={this.state.sysFilters} onChange={(e) => this.selectFilters(e, 'sysFilters')}>
            {this.props.surveillanceSystems && _.values(this.props.surveillanceSystems).map((ss) => {
              return <option key={ss.id} value={ss.id}>{ss.name}</option>;
            })}
          </select>
        </div>
      );
    }
  }

  advSearchModal() {
    return (
      <Modal show={this.state.showAdvSearchModal} onHide={this.hideAdvSearch}>
        <Modal.Header closeButton bsStyle='search'>
          <Modal.Title>Advanced Search Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="adv-filter-modal-body">
            <div className="col-md-6">
              {this.surveillanceProgramsSelect()}
            </div>
            <div className="col-md-6">
              {this.surveillanceSystemsSelect()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.clearAdvSearch} bsStyle="primary">Clear Filters</Button>
          <Button onClick={this.hideAdvSearch} bsStyle="primary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  onInputChange(event){
    this.setState({searchTerms: event.target.value});
  }

  onFormSubmit(event){
    event.preventDefault();
    this.props.search(this.state.searchTerms);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
      {this.advSearchModal()}
      <div className="row">
        <div className="col-md-12">
          <div className="input-group search-group">
            <label htmlFor="search" className="hidden">Search</label>
            <input onChange={this.onInputChange} type="text" id="search" name="search" className="search-input" placeholder="Search..."/>
            <span className="input-group-btn">
              <button id="search-btn" className="search-btn search-btn-default" aria-label="search-btn" type="submit"><i className="fa fa-search search-btn-icon" aria-hidden="true"></i></button>
            </span>
          </div>
          <a className="pull-right" title="Advanced Search" href="#" onClick={(e) => {
            e.preventDefault();
            this.showAdvSearch();
          }}>Advanced</a>
        </div>
      </div>
    </form>
    );
  }
}

DashboardSearch.propTypes = {
  search: PropTypes.func.isRequired,
  surveillanceSystems: surveillanceSystemsProps,
  surveillancePrograms: surveillanceProgramsProps
};

export default DashboardSearch;
