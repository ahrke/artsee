import { combineReducers } from 'redux'

const SET_USER = "SET_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_ARTS_DATA = "SET_ARTS_DATA";
const SET_USER_LOCATION = "SET_USER_LOCATION";
const SET_MAP_MARKERS = "SET_MAP_MARKERS";
const SET_DESTINATION = "SET_DESTINATION";
const SET_LOADING = "SET_LOADING";
const SET_RESOLVED = "SET_RESOLVED";
const SET_USERS = "SET_USERS";
const SET_TAG = "SET_TAG";
const SET_FILTER_ARRAY = "SET_FILTER_ARRAY";
const SET_COMMENTS = "SET_COMMENTS";
const SET_NEW_COMMENT = "SET_NEW_COMMENT";
const UPDATE_ART_COMMENTS = "UPDATE_ART_COMMENTS";
const UPDATE_USER_LOCATION = "UPDATE_USER_LOCATION";
const ADD_ART = "ADD_ART";

const initialState = {
  user: null,
  users: {},
  token: null,
  arts: {},
  userLocation: {},
  mapMarkers: [],
  destination: {},
  loading: false,
  resolved: false,
  comments: null
};

const users = (state = {}, action) => {
  switch(action.type) {
    case SET_USER: {
      return Object.assign({}, state, {user: action.user})
    }
    case SET_TOKEN: {
      return Object.assign({}, state, {token: action.token})
    }
    case SET_USERS: {
      let users = {}
      action.users.forEach(user => {
        users[user.id] = user
      })

      return Object.assign({}, state, {...users})
    }
    default:
      return state
  }
}

const arts = (state = {}, action) => {
  switch(action.type) {
    case SET_TAG: {
      return Object.assign({}, state, {[action.id]: {...state[action.id],[action.opt]: action.value }})
    }
    case SET_ARTS_DATA: {
      return Object.assign({}, action.arts)
    }
    case ADD_ART: {
      return Object.assign({}, state, {[action.art.id]: action.art})
    }
    case UPDATE_ART_COMMENTS: {
      return Object.assign({}, state, {[action.id]: {...state[action.id], ['comments']: [...state[action.id].comments, action.comment]}})
    }
    default:
      return state
  }
}

const filterArray = ( state = [], action) => {
  switch(action.type) {
    case SET_FILTER_ARRAY: {
      return action.array
    }
    default:
      return state
  }
}

const maps = (state = {}, action) => {
  switch(action.type) {
    case SET_USER_LOCATION: {
      return Object.assign({}, state, {userLocation: action.userLocation})
    }
    case UPDATE_USER_LOCATION: {
      return Object.assign({}, state, 
        {userLocation: {...state.userLocation, latitude: action.latitude, longitude: action.longitude }}
      )
    }
    case SET_DESTINATION: {
      return Object.assign({}, state, {destination: action.destination})
    }
    default:
      return state
  }
}

const comments = (state = [], action) => {
  switch(action.type) {
    case SET_COMMENTS: {
      return action.comments
    }
    case SET_NEW_COMMENT: {
      return [...state, action.newComment]
    }
    default:
      return state
  }
}

const asyncFetches = (state = false, action) => {
  switch(action.type) {
    case SET_LOADING: {
      return false
    }
    case SET_RESOLVED: {
      return true
    }
    default:
      return state
  }
}

export default combineReducers({
  users,
  arts,
  maps,
  filterArray,
  asyncFetches,
  comments
})