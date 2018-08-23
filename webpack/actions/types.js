// Question types
export const FETCH_QUESTION_USAGE = 'FETCH_QUESTION_USAGE';
export const FETCH_QUESTION_USAGE_FULFILLED = 'FETCH_QUESTION_USAGE_FULFILLED';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_FULFILLED = 'DELETE_QUESTION_FULFILLED';
export const PUBLISH_QUESTION = 'PUBLISH_QUESTION';
export const PUBLISH_QUESTION_FULFILLED = 'PUBLISH_QUESTION_FULFILLED';
export const RETIRE_QUESTION = 'RETIRE_QUESTION';
export const RETIRE_QUESTION_FULFILLED = 'RETIRE_QUESTION_FULFILLED';
export const UPDATE_STAGE_QUESTION = 'UPDATE_STAGE_QUESTION';
export const UPDATE_STAGE_QUESTION_FULFILLED = 'UPDATE_STAGE_QUESTION_FULFILLED';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_FULFILLED = 'SAVE_QUESTION_FULFILLED';
export const SAVE_DRAFT_QUESTION = 'SAVE_DRAFT_QUESTION';
export const SAVE_DRAFT_QUESTION_FULFILLED = 'SAVE_DRAFT_QUESTION_FULFILLED';
export const UPDATE_QUESTION_TAGS = 'UPDATE_QUESTION_TAGS';
export const UPDATE_QUESTION_TAGS_FULFILLED = 'UPDATE_QUESTION_TAGS_FULFILLED';
export const MARK_AS_DUPLICATE = 'MARK_AS_DUPLICATE';
export const MARK_AS_DUPLICATE_FULFILLED = 'MARK_AS_DUPLICATE_FULFILLED';

// Comment types
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_FULFILLED = 'ADD_COMMENT_FULFILLED';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';

// Tutorial Info
export const SET_STEPS = 'SET_STEPS';

// Landing types
export const FETCH_STATS = 'FETCH_STATS';
export const FETCH_STATS_FULFILLED = 'FETCH_STATS_FULFILLED';
export const SET_STATS = 'SET_STATS';

// Preferred Content
export const ADD_PREFERRED = 'ADD_PREFERRED';
export const ADD_PREFERRED_FULFILLED = 'ADD_PREFERRED_FULFILLED';
export const REMOVE_PREFERRED = 'REMOVE_PREFERRED';
export const REMOVE_PREFERRED_FULFILLED = 'REMOVE_PREFERRED_FULFILLED';

// Groups
export const REMOVE_QUESTION_FROM_GROUP = 'REMOVE_QUESTION_FROM_GROUP';
export const REMOVE_QUESTION_FROM_GROUP_FULFILLED = 'REMOVE_QUESTION_FROM_GROUP_FULFILLED';
export const ADD_QUESTION_TO_GROUP = 'ADD_QUESTION_TO_GROUP';
export const ADD_QUESTION_TO_GROUP_FULFILLED = 'ADD_QUESTION_TO_GROUP_FULFILLED';
export const REMOVE_RESPONSE_SET_FROM_GROUP = 'REMOVE_RESPONSE_SET_FROM_GROUP';
export const REMOVE_RESPONSE_SET_FROM_GROUP_FULFILLED = 'REMOVE_RESPONSE_SET_FROM_GROUP_FULFILLED';
export const ADD_RESPONSE_SET_TO_GROUP = 'ADD_RESPONSE_SET_TO_GROUP';
export const ADD_RESPONSE_SET_TO_GROUP_FULFILLED = 'ADD_RESPONSE_SET_TO_GROUP_FULFILLED';
export const REMOVE_SECTION_FROM_GROUP = 'REMOVE_SECTION_FROM_GROUP';
export const REMOVE_SECTION_FROM_GROUP_FULFILLED = 'REMOVE_SECTION_FROM_GROUP_FULFILLED';
export const ADD_SECTION_TO_GROUP = 'ADD_SECTION_TO_GROUP';
export const ADD_SECTION_TO_GROUP_FULFILLED = 'ADD_SECTION_TO_GROUP_FULFILLED';
export const REMOVE_SURVEY_FROM_GROUP = 'REMOVE_SURVEY_FROM_GROUP';
export const REMOVE_SURVEY_FROM_GROUP_FULFILLED = 'REMOVE_SURVEY_FROM_GROUP_FULFILLED';
export const ADD_SURVEY_TO_GROUP = 'ADD_SURVEY_TO_GROUP';
export const ADD_SURVEY_TO_GROUP_FULFILLED = 'ADD_SURVEY_TO_GROUP_FULFILLED';

// Search types
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_FULFILLED = 'FETCH_SEARCH_RESULTS_FULFILLED';
export const FETCH_MORE_SEARCH_RESULTS = 'FETCH_MORE_SEARCH_RESULTS';
export const FETCH_MORE_SEARCH_RESULTS_FULFILLED = 'FETCH_MORE_SEARCH_RESULTS_FULFILLED';
export const FETCH_LAST_SEARCH = 'FETCH_LAST_SEARCH';
export const FETCH_LAST_SEARCH_FULFILLED = 'FETCH_LAST_SEARCH_FULFILLED';
export const SET_LAST_SEARCH = 'SET_LAST_SEARCH';
export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const FETCH_SUGGESTIONS_FULFILLED = 'FETCH_SUGGESTIONS_FULFILLED';

// Notifications
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const FETCH_NOTIFICATIONS_FULFILLED = 'FETCH_NOTIFICATIONS_FULFILLED';
export const READ_NOTIFICATIONS = 'READ_NOTIFICATIONS';
export const READ_NOTIFICATIONS_FULFILLED = 'READ_NOTIFICATIONS_FULFILLED';

// Response Set types
export const FETCH_RESPONSE_SET_USAGE = 'FETCH_RESPONSE_SET_USAGE';
export const FETCH_RESPONSE_SET_USAGE_FULFILLED = 'FETCH_RESPONSE_SET_USAGE_FULFILLED';
export const SAVE_RESPONSE_SET = 'SAVE_RESPONSE_SET';
export const SAVE_RESPONSE_SET_FULFILLED = 'SAVE_RESPONSE_SET_FULFILLED';
export const SAVE_DRAFT_RESPONSE_SET = 'SAVE_DRAFT_RESPONSE_SET';
export const SAVE_DRAFT_RESPONSE_SET_FULFILLED = 'SAVE_DRAFT_RESPONSE_SET_FULFILLED';
export const PUBLISH_RESPONSE_SET = 'PUBLISH_RESPONSE_SET';
export const PUBLISH_RESPONSE_SET_FULFILLED = 'PUBLISH_RESPONSE_SET_FULFILLED';
export const RETIRE_RESPONSE_SET = 'RETIRE_RESPONSE_SET';
export const RETIRE_RESPONSE_SET_FULFILLED = 'RETIRE_RESPONSE_SET_FULFILLED';
export const UPDATE_STAGE_RESPONSE_SET = 'UPDATE_STAGE_RESPONSE_SET';
export const UPDATE_STAGE_RESPONSE_SET_FULFILLED = 'UPDATE_STAGE_RESPONSE_SET_FULFILLED';
export const DELETE_RESPONSE_SET = 'DELETE_RESPONSE_SET';
export const DELETE_RESPONSE_SET_FULFILLED = 'DELETE_RESPONSE_SET_FULFILLED';

// Current user types
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const FETCH_CURRENT_USER_FULFILLED = 'FETCH_CURRENT_USER_FULFILLED';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_FULFILLED = 'SIGN_UP_FULFILLED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';

// Group types
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUPS_FULFILLED = 'FETCH_GROUPS_FULFILLED';
export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_GROUP_FULFILLED = 'CREATE_GROUP_FULFILLED';
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const ADD_USER_TO_GROUP_FULFILLED = 'ADD_USER_TO_GROUP_FULFILLED';
export const REMOVE_USER_FROM_GROUP = 'REMOVE_USER_FROM_GROUP';
export const REMOVE_USER_FROM_GROUP_FULFILLED = 'REMOVE_USER_FROM_GROUP_FULFILLED';

// Section types
export const PUBLISH_SECTION = 'PUBLISH_SECTION';
export const PUBLISH_SECTION_FULFILLED = 'PUBLISH_SECTION_FULFILLED';
export const RETIRE_SECTION = 'RETIRE_SECTION';
export const RETIRE_SECTION_FULFILLED = 'RETIRE_SECTION_FULFILLED';
export const UPDATE_STAGE_SECTION = 'UPDATE_STAGE_SECTION';
export const UPDATE_STAGE_SECTION_FULFILLED = 'UPDATE_STAGE_SECTION_FULFILLED';
export const SAVE_SECTION = 'SAVE_SECTION';
export const SAVE_SECTION_FULFILLED = 'SAVE_SECTION_FULFILLED';
export const SAVE_DRAFT_SECTION = 'SAVE_DRAFT_SECTION';
export const SAVE_DRAFT_SECTION_FULFILLED = 'SAVE_DRAFT_SECTION_FULFILLED';
export const CREATE_SECTION = 'CREATE_SECTION';
export const ADD_SECTION = 'ADD_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';
export const REORDER_SECTION = 'REORDER_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';
export const DELETE_SECTION_FULFILLED = 'DELETE_SECTION_FULFILLED';
export const UPDATE_SECTION_TAGS = 'UPDATE_SECTION_TAGS';
export const UPDATE_SECTION_TAGS_FULFILLED = 'UPDATE_SECTION_TAGS_FULFILLED';
export const UPDATE_PDV = 'UPDATE_PDV';
export const UPDATE_PDV_FULFILLED = 'UPDATE_PDV_FULFILLED';
export const ADD_NESTED_ITEM = 'ADD_NESTED_ITEM';
export const REMOVE_NESTED_ITEM = 'REMOVE_NESTED_ITEM';
export const REORDER_NESTED_ITEM = 'REORDER_NESTED_ITEM';

// Category types
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_FULFILLED = 'FETCH_CATEGORY_FULFILLED';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';

// Response Types
export const FETCH_RESPONSE_TYPE = 'FETCH_RESPONSE_TYPE';
export const FETCH_RESPONSE_TYPE_FULFILLED = 'FETCH_RESPONSE_TYPE_FULFILLED';
export const FETCH_RESPONSE_TYPES = 'FETCH_RESPONSE_TYPES';
export const FETCH_RESPONSE_TYPES_FULFILLED = 'FETCH_RESPONSE_TYPES_FULFILLED';

// Concepts
export const FETCH_CONCEPTS = 'FETCH_CONCEPTS';
export const FETCH_CONCEPTS_FULFILLED = 'FETCH_CONCEPTS_FULFILLED';
export const FETCH_CONCEPTS_REJECTED  = 'FETCH_CONCEPTS_REJECTED';
export const FETCH_CONCEPT_SYSTEMS = 'FETCH_CONCEPT_SYSTEMS';
export const FETCH_CONCEPT_SYSTEMS_FULFILLED = 'FETCH_CONCEPT_SYSTEMS_FULFILLED';
export const FETCH_CONCEPT_SYSTEMS_REJECTED  = 'FETCH_CONCEPT_SYSTEMS_REJECTED';
export const FETCH_TAGS = 'FETCH_TAGS';
export const FETCH_TAGS_FULFILLED = 'FETCH_TAGS_FULFILLED';

// Surveillance System Types
export const FETCH_SURVEILLANCE_SYSTEMS = 'FETCH_SURVEILLANCE_SYSTEMS';
export const FETCH_SURVEILLANCE_SYSTEMS_FULFILLED = 'FETCH_SURVEILLANCE_SYSTEMS_FULFILLED';
export const ADD_SYSTEM = 'ADD_SYSTEM';
export const ADD_SYSTEM_FULFILLED = 'ADD_SYSTEM_FULFILLED';

// Surveillance Program Types
export const FETCH_SURVEILLANCE_PROGRAMS = 'FETCH_SURVEILLANCE_PROGRAMS';
export const FETCH_SURVEILLANCE_PROGRAMS_FULFILLED = 'FETCH_SURVEILLANCE_PROGRAMS_FULFILLED';
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const ADD_PROGRAM_FULFILLED = 'ADD_PROGRAM_FULFILLED';

// Survey types
export const PUBLISH_SURVEY = 'PUBLISH_SURVEY';
export const PUBLISH_SURVEY_FULFILLED = 'PUBLISH_SURVEY_FULFILLED';
export const RETIRE_SURVEY = 'RETIRE_SURVEY';
export const RETIRE_SURVEY_FULFILLED = 'RETIRE_SURVEY_FULFILLED';
export const UPDATE_STAGE_SURVEY = 'UPDATE_STAGE_SURVEY';
export const UPDATE_STAGE_SURVEY_FULFILLED = 'UPDATE_STAGE_SURVEY_FULFILLED';
export const SAVE_SURVEY = 'SAVE_SURVEY';
export const SAVE_SURVEY_FULFILLED = 'SAVE_SURVEY_FULFILLED';
export const SAVE_DRAFT_SURVEY = 'SAVE_DRAFT_SURVEY';
export const SAVE_DRAFT_SURVEY_FULFILLED = 'SAVE_DRAFT_SURVEY_FULFILLED';
export const CREATE_SURVEY = 'CREATE_SURVEY';
export const DELETE_SURVEY = 'DELETE_SURVEY';
export const DELETE_SURVEY_FULFILLED = 'DELETE_SURVEY_FULFILLED';
export const UPDATE_SURVEY_TAGS = 'UPDATE_SURVEY_TAGS';
export const UPDATE_SURVEY_TAGS_FULFILLED = 'UPDATE_SURVEY_TAGS_FULFILLED';
export const CREATE_IMPORT_SESSION = 'CREATE_IMPORT_SESSION';
export const UPDATE_IMPORT_SESSION = 'UPDATE_IMPORT_SESSION';
export const ATTEMPT_IMPORT_FILE = 'ATTEMPT_IMPORT_FILE';
export const FETCH_DUPLICATES = 'FETCH_DUPLICATES';
export const FETCH_DUPLICATES_FULFILLED = 'FETCH_DUPLICATES_FULFILLED';

// Current User
export const LOG_OUT = 'LOG_OUT';

// Publisher and admin types
export const FETCH_PUBLISHERS = 'FETCH_PUBLISHERS';
export const FETCH_PUBLISHERS_FULFILLED = 'FETCH_PUBLISHERS_FULFILLED';
export const FETCH_ADMINS = 'FETCH_ADMINS';
export const FETCH_ADMINS_FULFILLED = 'FETCH_ADMINS_FULFILLED';
export const GRANT_ADMIN = 'GRANT_ADMIN';
export const GRANT_ADMIN_FULFILLED = 'GRANT_ADMIN_FULFILLED';
export const REVOKE_ADMIN = 'REVOKE_ADMIN';
export const REVOKE_ADMIN_FULFILLED = 'REVOKE_ADMIN_FULFILLED';
export const GRANT_PUBLISHER = 'GRANT_PUBLISHER';
export const GRANT_PUBLISHER_FULFILLED  = 'GRANT_PUBLISHER_FULFILLED';
export const REVOKE_PUBLISHER = 'REVOKE_PUBLISHER';
export const REVOKE_PUBLISHER_FULFILLED  = 'REVOKE_PUBLISHER_FULFILLED';

// Admin utility types
export const ES_DELETE_AND_SYNC = 'ES_DELETE_AND_SYNC';
export const ES_DELETE_AND_SYNC_FULFILLED = 'ES_DELETE_AND_SYNC_FULFILLED';
export const ES_SYNC = 'ES_SYNC';
export const ES_SYNC_FULFILLED = 'ES_SYNC_FULFILLED';

// Normalized types
export const ADD_ENTITIES = 'ADD_ENTITIES';
export const ADD_ENTITIES_FULFILLED = 'ADD_ENTITIES_FULFILLED';
export const ADD_ENTITIES_PENDING = 'ADD_ENTITIES_PENDING';
export const ADD_ENTITIES_REJECTED = 'ADD_ENTITIES_REJECTED';

// Question types
// ------------------------- QUESTIONS -------------------------------- //
export const QUESTION_REQUEST = "QUESTION_REQUEST";
export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const FETCH_QUESTION_FAILURE = "FETCH_QUESTION_FAILURE";
export const RESET_QUESTION_REQUEST = "RESET_QUESTION_REQUEST";

// Response Set types
// ------------------------- RESPONSE_SETS -------------------------------- //
export const RESPONSE_SET_REQUEST = "RESPONSE_SET_REQUEST";
export const FETCH_RESPONSE_SET_SUCCESS = "FETCH_RESPONSE_SET_SUCCESS";
export const FETCH_RESPONSE_SET_FAILURE = "FETCH_RESPONSE_SET_FAILURE";
export const RESET_RESPONSE_SET_REQUEST = "RESET_RESPONSE_SET_REQUEST";

// Section types
// ------------------------- SECTIONS -------------------------------- //
export const SECTION_REQUEST = "SECTION_REQUEST";
export const FETCH_SECTION_SUCCESS = "FETCH_SECTION_SUCCESS";
export const FETCH_SECTION_FAILURE = "FETCH_SECTION_FAILURE";
export const RESET_SECTION_REQUEST = "RESET_SECTION_REQUEST";
export const FETCH_SECTION_PENDING = "FETCH_SECTION_PENDING";
export const FETCH_SECTION = "FETCH_SECTION";
export const FETCH_SECTION_FULFILLED = "FETCH_SECTION_FULFILLED";
export const FETCH_SECTION_REJECTED = "FETCH_SECTION_REJECTED";

// Survey types
// ------------------------- SURVEYS -------------------------------- //
export const SURVEY_REQUEST = "SURVEY_REQUEST";
export const FETCH_SURVEY_SUCCESS = "FETCH_SURVEY_SUCCESS";
export const FETCH_SURVEY_FAILURE = "FETCH_SURVEY_FAILURE";
export const RESET_SURVEY_REQUEST = "RESET_SURVEY_REQUEST";


// UI Action types
export const SET_RESULT_STYLE = 'SET_RESULT_STYLE';
export const SHOW_RESULT_CONTROL = 'SHOW_RESULT_CONTROL';
export const HIDE_RESULT_CONTROL = 'HIDE_RESULT_CONTROL';
export const TOGGLE_RESULT_CONTROL = 'TOGGLE_RESULT_CONTROL';

// Breadcrumb Actions
export const CLEAR_BREADCRUMB = 'CLEAR_BREADCRUMB';
export const ADD_BREADCRUMB_ITEM = 'ADD_BREADCRUMB_ITEM';
export const REMOVE_BREADCRUMB_ITEM = 'REMOVE_BREADCRUMB_ITEM';
export const SET_BREADCRUMB_PATH = 'SET_BREADCRUMB_PATH';