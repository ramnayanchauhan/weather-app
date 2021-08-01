import React, { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    paperStyle: {
        width: '467px',
        margin: '20px auto',
        padding: '30px 20px',
        height: '647px',
    },
    birthStyle: {
        margin: theme.spacing(1),
        minWidth: 113,
        maxWidth: 300,
    },
    selectStyle: {
        margin: theme.spacing(1),
        minWidth: 121,
        maxWidth: 300,
    },
}));
const SignIn = () => {
    let history = useHistory();
    const classes = useStyles();
    const [dataList, SetDataList] = useState();
    const [formData, updateFormData] = useState({
        user: "",
        password: "",
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };
    console.log("dataList", dataList);
    
    useEffect(() => {
        fetch('https://rewok-task-default-rtdb.firebaseio.com/allData.json')
            .then(res => {
                console.log("response data ", res);
                if (res.ok) {
                    res.json().then(data => {
                        SetDataList(data)
                    });

                } else {
                    res.json().then(data => {
                    });
                }
            });
    }, [])

    const handleSubmit = (event) => {

        if (formData.user !== '' && formData.password !== '') {
            Object.keys(dataList).forEach(key => {
                const item = dataList[key];
                if (item.role[0] === 'User') {
                    if (item.user === formData.user && item.password === formData.password) {
                        localStorage.setItem('city', item.city);
                        localStorage.setItem('feature', item.feature[1]);
                        if (item.feature[0] === 'Weather') {
                            if (item.feature[0] === 'Weather' && item.feature[1] === 'Export PDF') {
                                alert("Features: Weather and ExportPDF Allows")
                                history.push("/user");
                            } else {
                                alert("Features: Only Weather Allows")
                                history.push("/user");
                            }

                        }
                    }
                    else {
                        // alert("UserId or Password is Not match")
                    }
                }
                if (item.role[0] === 'Admin') {
                    if (item.user === formData.user && item.password === formData.password) {
                        history.push("/admin");
                        alert("Form Successfully submitted!!!");
                    }
                    // else{
                    //     alert("AdminId or Password is Not match")
                    // }
                }
            });
        }
        else {
            alert("All fields are required!!!");
        }
        event.preventDefault();
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid>
                <Paper elevation={20} className={classes.paperStyle}>
                    <Grid align='center'>
                        <h2 >Sign In Your Account</h2>
                    </Grid>

                    <div>
                        <TextField fullWidth label='User' name="user" placeholder="Enter your userId" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Password' name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                    </div>
                    <div>
                        <Button type='submit' variant='contained' color='primary' >Login</Button><br />
                    </div>

                </Paper>
            </Grid>
        </form>
    )
}

export default SignIn;