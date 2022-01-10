const initialState = {
    userID:'',
    page:'login',
    tab:0
};
  
const reducer = (state = initialState, action) => {
  console.log( state, action );

  switch (action.type) {
    case 'UID':
      return{
        ...state,
        userID: action.data
      }
    case 'NAVIGATE':
      return{
        ...state,
        page: action.data
      }
    case 'TAB':
      return{
        ...state,
        tab: action.data
      }
    default:
      return state;
  }
  
}

export default reducer