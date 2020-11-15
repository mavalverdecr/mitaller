import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { useAppl } from '../../context/ApplContext';

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const Signup = () => {
    const classes = useStyles()

    const {signup, loading} = useAppl();

    //Estado del componente
    const [nombre,setNombre] = useState('');
    const [apellidos,setApellidos] = useState('');
    const [telefono,setTelefono] = useState('');
    const [email,setEmail] = useState('');
    const [usuario,setUsuario] = useState('');
    const [password,setPassword] = useState('');
    const [repeatPassword,setRepeatPassword] = useState('');

    //Manejardor del cambio en los text field
    const handleOnChange = e => {
        if (e.target.name === "nombre-empleado") setNombre(e.target.value)
        if (e.target.name === "apellidos-empleado") setApellidos(e.target.value)
        if (e.target.name === "telefono-empleado") setTelefono(e.target.value)
        if (e.target.name === "email-empleado") setEmail(e.target.value)
        if (e.target.name === "usuario-empleado") setUsuario(e.target.value)
        if (e.target.name === "password") setPassword(e.target.value)
        if (e.target.name === "repeat-password") setRepeatPassword(e.target.value)
    }
    
    //Manejador del click en signup
    const handleOnClick = async e => {
        e.preventDefault()
        const nuevoUsuario = {
            nombre,
            apellidos,
            telefono,
            email,
            usuario,
            password,
            repeatPassword,
            rol: 1
        }
        try {
            await signup(nuevoUsuario);
        } catch {}
    }
    return (
        <Container maxWidth="md" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}> 
                        <form noValidate>
                            <Typography component="h1" variant="h5">
                                Datos del Usuario
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nombre-empleado"
                                label="Nombre"
                                name="nombre-empleado"
                                autoComplete="nombre-empleado"
                                onChange={handleOnChange}
                                value={nombre}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="apellidos-empleado"
                                label="Apellidos"
                                name="apellidos-empleado"
                                autoComplete="apellidos-empleado"
                                onChange={handleOnChange}
                                value={apellidos}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="telefono-empleado"
                                label="Teléfono"
                                name="telefono-empleado"
                                autoComplete="telefono-empleado"
                                onChange={handleOnChange}
                                value={telefono}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email-empleado"
                                label="Email"
                                name="email-empleado"
                                autoComplete="email-empleado"
                                onChange={handleOnChange}
                                value={email}
                            />                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="usuario-empleado"
                                label="Usuario"
                                name="usuario-empleado"
                                autoComplete="usuario-empleado"
                                onChange={handleOnChange}
                                value={usuario}
                            />                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleOnChange}
                                value={password}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="repeat-password"
                                label="Repetir contraseña"
                                type="password"
                                id="repeat-password"
                                onChange={handleOnChange}
                                value={repeatPassword}
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
                                Registrar
                            </Button>
                            <Typography>
                                {"¿Ya tienes una cuenta? "}           
                                <RouterLink 
                                    to={'/login'} 
                                >
                                    {"Accede"}
                                </RouterLink>
                            </Typography> 
                        </form>            
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )    
}

export default Signup;