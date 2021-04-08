export const GET_CONTACT = 'GET_CONTACT';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DETAIL_CONTACT = 'DETAIL_CONTACT';
export const LOADING_DATA = 'LOADING_DATA';

import Axios from 'axios';
import { apiConfig } from '../../Core/Settings';

export function getContact() {
  return function (dispatch) {
    dispatch({
      type: LOADING_DATA,
      loading: true
    })
    
    return Axios.get(`${apiConfig.baseUrl}contact`)
    .then((res) => {
      dispatch({
        type: GET_CONTACT,
        contacts: res.data.data,
        loading: false
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CONTACT,
        contacts: null,
        loading: false
      });
    })
  }
}

export function getDetailContact(payload) {
  return (dispatch) => {
    dispatch({
      type: LOADING_DATA,
      loading: true
    })

    return Axios.get(`${apiConfig.baseUrl}contact/${payload.id}`)
    .then((res) => {
      dispatch({
        type: DETAIL_CONTACT,
        detail: res.data.data,
        loading: false
      });
    })
    .catch((err) => {
      dispatch({
        type: DETAIL_CONTACT,
        detail: null,
        loading: false
      });
    })
  }
}

export function createContact(payload) {
  return (dispatch) => {
    const config = { headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }};

    let newData = {
      firstName : payload.firstName,
      lastName : payload.lastName,
      age : payload.age,
      photo : payload.photo
    }
    
    const data = JSON.stringify(newData);

    return Axios.post(`${apiConfig.baseUrl}contact`, data, config)
    .then((res) => {
      dispatch({
        type: CREATE_CONTACT,
        message: res.data.message,
        loading: false
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_CONTACT,
        message: null,
        loading: false
      });
    })
  }
}

export function editContact(payload) {
  return (dispatch) => {
    dispatch({
      type: LOADING_DATA,
      loading: true
    })

    const config = { headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }};

    let newData = {
      firstName : payload.firstName,
      lastName : payload.lastName,
      age : payload.age,
      photo : payload.photo
    }
    
    const data = JSON.stringify(newData);
    
    return Axios.put(`${apiConfig.baseUrl}contact/${payload.id}`, data, config)
    .then((res) => {
      dispatch({
        type: EDIT_CONTACT,
        message: res.data.message,
        loading: false
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_CONTACT,
        message: null,
        loading: false
      });
    })
  }
}

export function deleteContact(payload) {
  return (dispatch) => {
    return Axios.delete(`${apiConfig.baseUrl}contact/${payload.id}`)
    .then((res) => {
      dispatch({
        type: DELETE_CONTACT,
        message: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CONTACT,
        contacts: null,
      });
    })
  }
}