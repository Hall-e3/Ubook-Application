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
} from "../actions/types";

const initialState = {
  create_loading: false,
  get_loading: false,
  update_loading: false,
  delete_loading: false,
  properties: [],
  error: null,
};
export default function property(state = initialState, action) {
  switch (action.type) {
    //get properties
    case GET_PROPERTIES_LOADING:
      return {
        get_loading: true,
      };
    case GET_PROPERTIES_SUCCESS:
      return {
        properties: action.payload,
        get_loading: false,
      };
    case GET_PROPERTIES_FAIL:
      return {
        get_loading: false,
        error: action.payload,
      };

    //create properties
    case CREATE_PROPERTIES_LOADING:
      return {
        create_loading: true,
      };
    case CREATE_PROPERTIES_SUCCESS:
      return {
        properties: [...state.properties, action.payload],
        create_loading: false,
      };
    case CREATE_PROPERTIES_FAIL:
      return {
        create_loading: false,
        error: action.payload,
      };

    //update properties
    case UPDATE_PROPERTIES_LOADING:
      return {
        update_loading: true,
      };
    case UPDATE_PROPERTIES_SUCCESS:
      return {
        properties: state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        ),
        update_loading: false,
      };
    case UPDATE_PROPERTIES_FAIL:
      return {
        update_loading: false,
        error: action.payload,
      };

    //delete properties
    case DELETE_PROPERTIES_LOADING:
      return {
        delete_loading: true,
      };
    case DELETE_PROPERTIES_SUCCESS:
      return {
        properties: state.properties.filter(
          (property) => property.id !== action.payload
        ),
        delete_loading: false,
      };
    case DELETE_PROPERTIES_FAIL:
      return {
        delete_loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
