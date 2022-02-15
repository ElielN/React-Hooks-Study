import * as types from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER: {
      return { ...state, counter: state.counter + 1 };
    }
    case types.DECREMENT_COUNTER: {
      return { ...state, counter: state.counter - 1 };
    }
  }
  console.log('Action type não encontrada', types.INCREMENT_COUNTER, action.types);
  return { ...state };
};
