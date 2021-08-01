const getWeatherRequest = () => {
    return {
      type: "GET_WEATHER_REQUEST",
    };
  };
  
  const getWeatherSuccess = (weathers) => {
    return {
      type: "GET_WEATHER_SUCCESS",
      payload: weathers,
    };
  };
  
  const getWeatherFailure = (error) => {
    return {
      type: "GET_WEATHER_FAILURE",
      payload: error,
    };
  };
  let city = localStorage.getItem('city');
 
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=695a8f9819a782dae73328a8f7164e3e`;
  
  export const fetchWeathers = () => {
    return (dispatch) => {
      dispatch(getWeatherRequest());
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
        //   const users = data;
        console.log("action",data.main)
          dispatch(getWeatherSuccess(data.main));
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(getWeatherFailure(errorMessage));
        });
    };
  };