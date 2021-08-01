const initialState = {
    weathers: [],
    loading: false,
    error: null,
  };
  
  const weathers = (state = initialState, action) => {
    switch (action.type) {
      case "GET_WEATHER_REQUEST":
        return { ...state, loading: true };
      case "GET_WEATHER_SUCCESS":
        return { loading: false, weathers: action.payload };
      case "GET_WEATHER_FAILURE":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default weathers;