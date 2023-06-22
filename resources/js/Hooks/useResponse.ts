import { useReducer } from "react";

interface IResponse {
  progress: boolean,
  success: boolean,
  error: {
    isError: boolean,
    message: string,
  },
}

interface ResponseAction {
  type: string,
  payload: any | null
}

const responseReducer = (state: IResponse, action: ResponseAction) => {
  const { type, payload } = action;

  switch (type) {
    case "PROGRESS":
      return {
        ...state,
        progress: true,
        success: false,
        error: {
          isError: false,
          message: null
        }
      }
    case "SUCCESS":
      return {
        ...state,
        progress: false,
        success: true,
        error: {
          isError: false,
          message: null
        }
      }
    case "ERROR":
      return {
        ...state,
        progress: false,
        success: false,
        error: {
          isError: true,
          message: payload
        }
      }
    default:
      return state;
  };
}

export const useResponse = () => useReducer(responseReducer, {
  progress: false,
  success: false,
  error: {
    isError: false,
    message: null
  }
})