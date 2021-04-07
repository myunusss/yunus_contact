const initialState={
  value: 0
};

export const counterReducer = (state = initialState, action) => {
  
  switch(action.type){
    case 'INCREASE':
      return {
        ...state,
        value: ++state.value
      };
      break;
    case 'DECREASE':
      return {
        ...state,
        value: --state.value
      };
      break;
    default:
      return state;
  }
}