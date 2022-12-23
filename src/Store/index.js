const initialState = {
    userID:'loading',
    page:'login',
    tab:0
};

const reducer = (state = initialState, action) => {
  console.log(action);
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
    case 'FEED_POSTS':
      return{
        ...state,
        posts: action.data
      }
    default:
      return state;
  }
  
}

export default reducer