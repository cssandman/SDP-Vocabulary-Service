import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSearchResults, fetchMoreSearchResults, fetchSuggestions } from '../../actions/search_results_actions';

import SearchResult from '../../components/SearchResult';
import DashboardSearch from '../../components/DashboardSearch';
import SearchManagerComponent from '../../components/SearchManagerComponent';
import currentUserProps from "../../prop-types/current_user_props";
import { surveillanceSystemsProps }from '../../prop-types/surveillance_system_props';
import { surveillanceProgramsProps } from '../../prop-types/surveillance_program_props';

const QUESTION_SEARCH_CONTEXT = 'QUESTION_SEARCH_CONTEXT';

class QuestionSearchContainer extends SearchManagerComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: '',
      programFilter: [],
      systemFilter: [],
      page: 1,
      mostRecentFilter: false,
      type: 'question'
    };
    this.search   = this.search.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.changeFiltersCallback = this.changeFiltersCallback.bind(this);
  }

  componentWillMount() {
    this.search(this.currentSearchParameters());
  }

  componentDidUpdate(_prevProps, prevState) {
    if(prevState.page === this.state.page && prevState.programFilter != undefined && (prevState.programFilter !== this.state.programFilter || prevState.systemFilter !== this.state.systemFilter)) {
      this.props.fetchSearchResults(QUESTION_SEARCH_CONTEXT, this.currentSearchParameters());
    }
  }

  search(searchParameters) {
    searchParameters.type = 'question';
    super.search(searchParameters, QUESTION_SEARCH_CONTEXT);
  }

  loadMore() {
    super.loadMore(QUESTION_SEARCH_CONTEXT);
  }

  render() {
    const searchResults = this.props.searchResults;
    return (
      <div>
        <DashboardSearch search={this.search}
                         surveillanceSystems={this.props.surveillanceSystems}
                         surveillancePrograms={this.props.surveillancePrograms}
                         changeFiltersCallback={this.changeFiltersCallback}
                         searchSource={this.props.searchResults.Source}
                         suggestions={this.props.suggestions}
                         fetchSuggestions={this.props.fetchSuggestions} />
        <div className="load-more-search">
          {searchResults.hits && searchResults.hits.hits.map((q, i) => {
            return (
              <SearchResult key={`${q.Source.versionIndependentId}-${q.Source.updatedAt}-${i}`}
                            type={q.Type}
                            result={q}
                            isEditPage={true}
                            currentUser={this.props.currentUser}
                            handleSelectSearchResult={this.props.handleSelectSearchResult}
                            isSelected={this.props.selectedSearchResults[q.Id]} />
            );
          })}
          {searchResults.hits && searchResults.hits.total > 0 && this.state.page <= Math.floor((searchResults.hits.total-1) / 10) &&
            <button id="load-more-btn" className="button button-action center-block" onClick={this.loadMore}>LOAD MORE</button>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults[QUESTION_SEARCH_CONTEXT] || {},
    surveillanceSystems: state.surveillanceSystems,
    surveillancePrograms: state.surveillancePrograms,
    currentUser: state.currentUser,
    suggestions: state.suggestions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSearchResults, fetchSuggestions, fetchMoreSearchResults}, dispatch);
}

QuestionSearchContainer.propTypes = {
  handleSelectSearchResult: PropTypes.func.isRequired,
  selectedSearchResults: PropTypes.object.isRequired,
  fetchSearchResults: PropTypes.func,
  fetchMoreSearchResults: PropTypes.func,
  fetchSuggestions: PropTypes.func,
  suggestions: PropTypes.array,
  currentUser: currentUserProps,
  searchResults: PropTypes.object,
  surveillanceSystems: surveillanceSystemsProps,
  surveillancePrograms: surveillanceProgramsProps
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSearchContainer);
