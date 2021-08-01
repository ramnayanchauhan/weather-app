import React, { useEffect, useState, } from 'react'
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Input } from '@material-ui/core'
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

    formControl: {
        margin: theme.spacing(1),
        minWidth: 340,
        maxWidth: 600,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const city = [
    'Pune',
    'Delhi',
    'Faridabad',
    'Chandigarh',
    'Hyderabad',
];
const roles = [
    'User',
];
const accessFeature = [
    'Weather',
    'Export PDF'
];
const Admin = () => {
    const classes = useStyles();
    const [setRoles, updatedSetRoles] = useState([]);
    const [setAccessFeature, updatedAccessFeature] = useState([]);
    const [setCity, updatedCity] = useState("");
    const [formData, updateFormData] = useState({
        user: "",
        password: "",
    });
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleChangeCity = (event) => {
        updatedCity(event.target.value);
    };
    const handleChangeRole = (event) => {
        updatedSetRoles(event.target.value);
    };

    const handleChangeFeature = (event) => {
        updatedAccessFeature(event.target.value);
    };

    const allData = {
        user: formData.user,
        password: formData.password,
        city: setCity,
        role: setRoles,
        feature: setAccessFeature
    }

    const handleSubmit = (event) => {
        fetch('https://rewok-task-default-rtdb.firebaseio.com/allData.json', {

            method: 'POST',
            body: JSON.stringify(allData),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log("response data", data);
                    alert("Form Successfully submitted!!!");
                });

            } else {
                res.json().then(data => {
                    alert(data.error.message);
                });
            }
        });

        event.preventDefault();
    }
    
// Fetchig data from firebase database
useEffect(() => {
    fetch('https://rewok-task-default-rtdb.firebaseio.com/allData.json')
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                console.log("dataa", data);
            });

        } else {
            res.json().then(data => {
                console.log("error dataa", data);
                alert(data.error.message);
            });
        }
    });

},[])

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid>
                <Paper elevation={20} className={classes.paperStyle}>

                    <div>
                        <TextField fullWidth label='User' name="user" placeholder="Enter user" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Password' name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={setCity}
                                onChange={handleChangeCity}
                                input={<Input />}
                                MenuProps={MenuProps}
                            >
                                {city.map((name) => (
                                    <MenuItem key={name} value={name} >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Roles</InputLabel>
                            <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                multiple
                                value={setRoles}
                                onChange={handleChangeRole}
                                input={<Input />}
                                MenuProps={MenuProps}
                            >
                                {roles.map((name) => (
                                    <MenuItem key={name} value={name} >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-name-label">Access Features</InputLabel>
                            <Select
                                labelId="demo-mutiple-name-label"
                                id="demo-mutiple-name"
                                multiple
                                value={setAccessFeature}
                                onChange={handleChangeFeature}
                                input={<Input />}
                                MenuProps={MenuProps}
                            >
                                {accessFeature.map((name) => (
                                    <MenuItem key={name} value={name} >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button type='submit' variant='contained' color='primary'>Save</Button><br />
                    </div>
                </Paper>
            </Grid>
        </form>
    )
}

export default Admin;