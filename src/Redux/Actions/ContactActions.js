export const GET_CONTACT = 'GET_CONTACT';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DETAIL_CONTACT = 'DETAIL_CONTACT';

import Axios from 'axios';
import { apiConfig } from '../../Core/Settings';

export function getContact() {
  return (dispatch) => {
    return Axios.get(`${apiConfig.baseUrl}contact`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: GET_CONTACT,
        contacts: res.data.data,
      });
    })
    .catch((err) => {
      console.log('err', err)
      dispatch({
        type: GET_CONTACT,
        contacts: null,
      });
    })
  }
}

export function getDetailContact(payload) {
  return (dispatch) => {
    Axios.get(`${apiConfig.baseUrl}contact/${payload.id}`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: DETAIL_CONTACT,
        detail: res.data.data,
      });
    })
    .catch((err) => {
      console.log('err', err)
      dispatch({
        type: DETAIL_CONTACT,
        detail: null,
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
      console.log(res)
      dispatch({
        type: CREATE_CONTACT,
        message: res.data.message,
      });
    })
    .catch((err) => {
      console.log('err', err)
      dispatch({
        type: CREATE_CONTACT,
        contacts: null,
      });
    })
  }
}

export function editContact(payload) {
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
    
    return Axios.put(`${apiConfig.baseUrl}contact/${payload.id}`, data, config)
    .then((res) => {
      console.log(res)
      dispatch({
        type: EDIT_CONTACT,
        message: res.data.message,
      });
    })
    .catch((err) => {
      console.log('err', err.message)
      dispatch({
        type: EDIT_CONTACT,
        contacts: null,
      });
    })
  }
}

export function deleteContact(payload) {
  console.log(payload)
  return (dispatch) => {
    return Axios.delete(`${apiConfig.baseUrl}contact/${payload.id}`)
    .then((res) => {
      console.log(res)
      dispatch({
        type: DELETE_CONTACT,
        message: res.data.message,
      });
    })
    .catch((err) => {
      console.log('err', err)
      dispatch({
        type: DELETE_CONTACT,
        contacts: null,
      });
    })
  }
}