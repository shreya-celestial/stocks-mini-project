type action = {
  type: string,
  payload?: object
}
const initial = 'Loading...';

const stockReducer = (state = initial, action: action) => {
  if(action.type === "SET_STOCK")
  {
    return action.payload;
  }
  if(action.type === "ERROR")
  {
    return action.payload;
  }
  return initial
}

export default stockReducer