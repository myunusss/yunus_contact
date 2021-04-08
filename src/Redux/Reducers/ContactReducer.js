import { GET_CONTACT, CREATE_CONTACT, EDIT_CONTACT, DELETE_CONTACT, DETAIL_CONTACT, LOADING_DATA } from '../Actions/ContactActions';

let dataState = {
  contacts: [],
  loading: true
};

export const contactReducer = (state = dataState, action) => {
  
  switch(action.type){
    case LOADING_DATA:
      state = Object.assign({}, state, { loading: action.loading });
      return state;
      break;

    case GET_CONTACT:
      state = Object.assign({}, state, { contacts: action.contacts, loading: action.loading });
      return state;
      break;

    case DETAIL_CONTACT:
      state = Object.assign({}, state, { detail: action.detail, loading: action.loading });
      return state;
      break;

    case CREATE_CONTACT:
      state = Object.assign({}, state, { message: action.message, loading: action.loading });
      return state;
      break;

    case EDIT_CONTACT:
      state = Object.assign({}, state, { message: action.message, loading: action.loading });
      return state;
      break;

    case DELETE_CONTACT:
      return {
        ...state,
        data: action.id
      };
      break;

    default:
      return state;
  }
}