import React from "react";

interface StateObject {
  items: Array<object>;
}

interface ActionObject {
  type: string,
  payload: object
}

const initialState: StateObject = {
  items: []
};

const rootReducer = (state: StateObject = initialState, action: ActionObject) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
