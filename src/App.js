import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import WeatherPage from './Component/WeatherPage';
import Dashboard from './Component/Dashboard';
import Admin from './Component/Admin';
import SignIn from './Component/SignIn';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/admin" ><Admin /></Route>
          <Route exact path="/login/" ><SignIn /></Route>
          <Route exact path="/user"  ><WeatherPage /></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
