import { GET_CONTACT, CREATE_CONTACT, EDIT_CONTACT, DELETE_CONTACT, DETAIL_CONTACT } from '../Actions/ContactActions';

let dataState = {
  contacts: [],
};

export const contactReducer = (state = dataState, action) => {
  
  switch(action.type){
    case GET_CONTACT:
      state = Object.assign({}, state, { contacts: action.contacts });
      return state;
      break;

    case DETAIL_CONTACT:
      state = Object.assign({}, state, { detail: action.detail });
      return state;
      break;

    case CREATE_CONTACT:
      return {
        ...state,
        data: action.payload
      };
      break;

    case EDIT_CONTACT:
      return {
        ...state,
        data: action.payload
      };
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