import React, { useEffect} from 'react';
import {fetchWeathers } from "../Action/index";
import {connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 205,
    minHeight: 200,
    backgroundColor: '#61c8e4'
  },
  title: {
    fontSize: 22,
  },
});
const WeatherPage = ({weatherData,fetchWeathers}) => {
  let feature = localStorage.getItem('feature');
  let city = localStorage.getItem('city');

  console.log("weaterData",weatherData);

  useEffect(() => {
    fetchWeathers();
  }, [fetchWeathers]);

  const exportPDF = ()=>{
    window.print();
  }

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Today Weather in {city}
        </Typography>
        <Typography variant="h5" component="h2">
          Temparature:{weatherData.weathers.temp} &deg;C
        </Typography>
        <div>
        <Typography variant="h5" component="h5">
          Feels_Like:{weatherData.weathers.feels_like} &deg;C
        </Typography>
        <Typography variant="h5" component="h5">
          Humidity:{weatherData.weathers.humidity} %
        </Typography>
        </div>
        <div> 
         <Button variant='contained' color='primary' disabled={feature !== 'Export PDF'} onClick={exportPDF} >exportPDF</Button><br />
        </div>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weathers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeathers: () => dispatch(fetchWeathers()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps )(WeatherPage);