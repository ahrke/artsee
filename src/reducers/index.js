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

const initialState = {
  user: null,
  users: {},
  token: null,
  arts: {},
  userLocation: {},
  mapMarkers: [],
  destination: {},
  loading: false,
  resolved: false
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
      return action.value
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
    default:
      return state
  }
}

const maps = (state = {}, action) => {
  switch(action.type) {
    case SET_USER_LOCATION: {
      return Object.assign({}, state, {userLocation: action.userLocation})
    }
    case SET_DESTINATION: {
      return Object.assign({}, state, {destination: action.destination})
    }
    default:
      return state
  }
}

const asyncFetches = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch(action.type) {
    case SET_LOADING: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }
    case SET_RESOLVED: {
      return Object.assign({}, state, {
        isFetching: false,
        items: action.value
      })
    }
    default:
      return state
  }
}

export default combineReducers({
  users,
  arts,
  maps,
  asyncFetches
})