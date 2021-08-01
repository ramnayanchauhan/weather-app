import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core'
const Dashboard = () => {
    let history = useHistory();
    const handlerLogin = () => {
        history.push("/login");
    }
    return (
        <div>
            <h1>Welcome To Dashboard</h1>
            <div>
                <Button variant='contained' color='primary'onClick={handlerLogin} >Login</Button><br />
            </div>
        </div>
    )
}
export default Dashboard;