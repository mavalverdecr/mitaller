import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { useAppl } from '../../context/ApplContext';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 50,
        padding: theme.spacing(3),
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },  
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },    
}));

const FormLogin = () => {
    
    const classes = useStyles();
    const { login, loading } = useAppl();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleOnChange = e => {    
        if (e.target.name === "usuario") setUsuario(e.target.value)
        if (e.target.name === "password") setPassword(e.target.value)
    } 
    
    //Manejador del click en login
    const handleOnClick = async e => {
        e.preventDefault()
        try {
            await login(usuario, password);
        } catch {}
    }    

    return (
        <div>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField 
                    autoFocus
                    name="usuario"
                    id="usuario"
                    variant="outlined"
                    margin="normal"
                    required
                    label="Usuario"
                    type="text"
                    fullWidth
                    onChange={handleOnChange}  
                    value={usuario}
                    />
                <TextField 
                    name="password"
                    id="password"
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={handleOnChange}  
                    value={password}
                />
                <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleOnClick}
                    disabled={loading}
                >
                    ACCEDER
                </Button>
                <Typography>
                    {"¿Todavía no tiene cuenta? "}           
                    <RouterLink to={'/signup'}>
                        {"Regístrate"}
                    </RouterLink>
                </Typography>
            </form>            
        </div>
    )
}

const Login = () => {
    
    //Clases
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.root} maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <FormLogin />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    ) 
}

export default (Login);