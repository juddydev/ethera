/*
Copyright 2019-2021 (c) Dappros Ltd, registered in England & Wales, registration number 11455432. All rights reserved.
You may not use this file except in compliance with the License.
You may obtain a copy of the License at https://github.com/dappros/ethora/blob/main/LICENSE.
*/

//common fetch requests
export const FETCHING_COMMON_REQUEST = 'FETCHING_COMMON_REQUEST';
export const FETCHING_COMMON_FAILURE = 'FETCHING_COMMON_FAILURE';

//Auth requests
export const FETCHING_USER_LOGIN_SUCCESS = 'FETCHING_USER_LOGIN_SUCCESS';
export const FETCHING_USER_REGISTER_SUCCESS = 'FETCHING_USER_REGISTER_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const WORDPRESS_AUTH = 'WORDPRESS_AUTH';
export const PUSH_SUBSCRIPTION = 'PUSH_SUBSCRIPTION';

//Wallet requests
export const FETCHING_TOKEN_ETHER_BALANCE_SUCCESS =
  'FETCHING_TOKEN_ETHER_BALANCE_SUCCESS';
export const TOKEN_TRANSFER_SUCCESS = 'TOKEN_TRANSFER_SUCCESS';
export const FETCHING_TRANSACTION_SUCCESS = 'FETCHING_TRANSACTION_SUCCESS';
export const FETCHING_WALLET_COMMON_REQUEST = 'FETCHING_WALLET_COMMON_REQUEST';
export const FETCHING_WALLET_COMMON_FAILURE = 'FETCHING_WALLET_COMMON_FAILURE';
export const FETCHING_OTHER_USER_TRANSACTION_SUCCESS =
  'FETCHING_OTHER_USER_TRANSACTION_SUCCESS';

//cancel request
export const CANCEL = 'CANCEL';

// token management
export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

//loading
export const LOADING = 'LOADING';

//initial data
export const INITIAL_DATA = 'INITIAL_DATA';
export const SAVE_INITIAL_DATA = 'SAVE_INITIAL_DATA';

//search text
export const SEND_SEARCH_TEXT = 'SEND_SEARCH_TEXT';

//chat
export const FETCH_CHAT_HEADER = 'FETCH_CHAT_HEADER';
export const IS_ROOM_CREATED = 'IS_ROOM_CREATED';
export const SET_ROSTER = 'SET_ROSTER';
export const SET_RECENT_REALTIME_CHAT = 'SET_RECENT_REALTIME_CHAT';
export const FINAL_MESSAGE_ARRIVED = 'FINAL_MESSAGE_ARRIVED';
export const SHOULD_COUNT = 'SHOULD_COUNT';
export const PARTICIPANT_UPDATE = 'PARTICIPANT_UPDATE';
export const UPDATED_ROASTER = 'UPDATED_ROASTER';
export const TOKEN_AMOUNT_UPDATE = 'TOKEN_AMOUNT_UPDATE';
export const SET_PUSH_DATA = 'SET_PUSH_DATA';
export const UPDATE_MESSAGE_COMPOSING_STATE = 'UPDATE_MESSAGE_COMPOSING_STATE';
export const SET_ROOM_ROLES = 'SET_ROOM_ROLES';

//users
export const FETCHING_ALL_USER_SUCCESS = 'FETCHING_ALL_USER_SUCCESS';

//App Intro
export const SKIP_FOREVER = 'SKIP_FOREVER';

//other users
export const SET_OTHER_USER_VCARD = 'SET_OTHER_USER_VCARD';
export const SET_OTHER_USER_DETAILS = 'SET_OTHER_USER_DETAILS';
export const SET_IS_PREVIOUS_USER = 'SET_IS_PREVIOUS_USER';
export const FETCHING_OTHER_USER_TOKEN_BALANCE_SUCCESS =
  'FETCHING_OTHER_USER_TOKEN_BALANCE_SUCCESS';

//xmpp id constants
export const V_CARD_REQUEST = 'V_CARD_REQUEST';
export const OTHER_USER_V_CARD_REQUEST = 'OTHER_USER_V_CARD_REQUEST';
export const UPDATE_VCARD = 'UPDATE_VCARD';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const IS_COMPOSING = 'IS_COMPOSING';
export const PAUSED_COMPOSING = 'PAUSED_COMPOSING';

//Account Reducer
export const FETCHING_EMAIL_LIST_SUCCESS = 'FETCHING_EMAIL_LIST_SUCCESS';
export const FETCHING_EMAIL_LIST = 'FETCHING_EMAIL_LIST';
export const FETCHING_EMAIL_LIST_FAILURE = 'FETCHING_EMAIL_LIST_FAILURE';
export const FETCHING_ADD_EMAIL_TO_LIST = 'FETCHING_ADD_EMAIL_TO_LIST';
export const FETCHING_ADD_EMAIL_TO_LIST_SUCCESS =
  'FETCHING_ADD_EMAIL_TO_LIST_SUCCESS';
export const FETCHING_ADD_EMAIL_TO_LIST_FAILURE =
  'FETCHING_ADD_EMAIL_TO_LIST_FAILURE';
export const FETCHING_DELETE_EMAIL_FROM_LIST =
  'FETCHING_DELETE_EMAIL_FROM_LIST';
export const FETCHING_DELETE_EMAIL_FROM_LIST_SUCCESS =
  'FETCHING_DELETE_EMAIL_FROM_LIST_SUCCESS';
export const FETCHING_DELETE_EMAIL_FROM_LIST_FAILURE =
  'FETCHING_DELETE_EMAIL_FROM_LIST_SUCCESS';
export const SET_IS_CHECK_PREMIUM = 'SET_IS_CHECK_PREMIUM';
export const SET_IS_PREMIUM = 'SET_IS_PREMIUM';

//Debug reducer
export const ADD_LOG_XMPP = 'ADD_LOG_XMPP';
export const ADD_LOG_API = 'ADD_LOG_API';

export const TOGGLE_DEBUG_MODE = 'TOGGLE_DEBUG_MODE';

// api reducer
export const CHANGE_API_MODE = 'CHANGE_API_MODE';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';

export const SET_OFFSET = 'SET_OFFSET';
export const SET_TOTAL = 'SET_TOTAL';
export const CHANGE_XMPP_DOMAIN = 'CHANGE_XMPP_DOMAIN';
