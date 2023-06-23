import { useReducer } from "react";

interface IResponse {
  progress: boolean,
  success: {
    isSuccess: boolean,
    message: any | null,
  },
  error: {
    isError: boolean,
    message: any | null,
  },
}

interface ResponseAction {
  type: string,
  payload: string | null
}

const responseReducer = (state: IResponse, action: ResponseAction) => {
  const { type, payload } = action;

  switch (type) {
    case "PROGRESS":
      return {
        ...state,
        progress: true,
        success: {
          isSuccess: false,
          message: null
        },
        error: {
          isError: false,
          message: null
        }
      }
    case "SUCCESS":
      return {
        ...state,
        progress: false,
        success: {
          isSuccess: true,
          message: payload
        },
        error: {
          isError: false,
          message: null
        }
      }
    case "ERROR":
      return {
        ...state,
        progress: false,
        success: {
          isSuccess: false,
          message: null
        },
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
  success: {
    isSuccess: false,
    message: ""
  },
  error: {
    isError: false,
    message: ""
  }
})