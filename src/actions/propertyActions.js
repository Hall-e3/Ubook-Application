import { createMessage, global_url, tokenConfig } from "./auth";
import axios from "axios";
import {
  CREATE_PROPERTIES_FAIL,
  CREATE_PROPERTIES_LOADING,
  CREATE_PROPERTIES_SUCCESS,
  DELETE_PROPERTIES_FAIL,
  DELETE_PROPERTIES_LOADING,
  DELETE_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAIL,
  GET_PROPERTIES_LOADING,
  GET_PROPERTIES_SUCCESS,
  UPDATE_PROPERTIES_FAIL,
  UPDATE_PROPERTIES_LOADING,
  UPDATE_PROPERTIES_SUCCESS,
} from "./types";

//get properties
export const get_properties = () => async (dispatch, getState) => {
  dispatch({
    type: GET_PROPERTIES_LOADING,
  });
  try {
    const res = await axios.get(
      `${global_url}/properties/`,
      tokenConfig(getState)
    );
    dispatch({
      type: GET_PROPERTIES_SUCCESS,
      payload: res.data.results,
    });
  } catch (error) {
    dispatch({
      type: GET_PROPERTIES_FAIL,
      payload: error?.response.data,
    });
  }
};

//create properties
export const create_properties = (data) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_PROPERTIES_LOADING,
  });
  try {
    const res = await axios.post(
      `${global_url}/properties/`,
      data,
      tokenConfig(getState)
    );
    dispatch({
      type: CREATE_PROPERTIES_SUCCESS,
      payload: res.data.results,
    });
    console.log("it's success");
    dispatch(
      createMessage("Property successfully created", "created_property")
    );
  } catch (error) {
    console.log("it's failed");
    dispatch({
      type: CREATE_PROPERTIES_FAIL,
      payload: error.response?.data,
    });
  }
};

//update properties
export const update_properties = (id, data) => async (dispatch, getState) => {
  console.log(id);
  console.log(data);
  dispatch({
    type: UPDATE_PROPERTIES_LOADING,
  });
  try {
    const res = await axios.patch(
      `${global_url}/properties/${id}/`,
      data,
      tokenConfig(getState)
    );
    dispatch({
      type: UPDATE_PROPERTIES_SUCCESS,
      payload: res.data,
    });
    dispatch(createMessage("Property updated successfully", "update_property"));
  } catch (error) {
    dispatch({
      type: UPDATE_PROPERTIES_FAIL,
      payload: error.response?.data,
    });
  }
};

//delete properties
export const delete_properties = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PROPERTIES_LOADING,
  });
  try {
    await axios.delete(`${global_url}/properties/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_PROPERTIES_SUCCESS,
    });
    dispatch(createMessage("Property deleted successfully", "delete_property"));
  } catch (error) {
    console.log("it's failed");
    dispatch({
      type: DELETE_PROPERTIES_FAIL,
      payload: error.response?.data,
    });
  }
};
