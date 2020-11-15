//React Native
import React, { useState } from 'react';
import { useAppl } from '../../../../context/ApplContext';
import axios from 'axios';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Vehiculo = (props) => {
    const classes = useStyles();
    //Estado del componente
    const {vehiculo} = props;

    const {usuario, setLoading, setError, setStatus, token} = useAppl();

    const bajaVehiculo = async (id) => {

        setError('')
        setLoading(true)
        
        try {
            const res = await axios.delete(
                process.env.REACT_APP_API_URL+'/vehiculos/'+id,
                {
                    headers: {'auth-token': token},
                }
            ) 
            //setStatus(res.status);
            setError(res.data.mensaje);
        } catch(err) {
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                //setStatus(err.response.status)
                setError(err.response.data.mensaje)
            } else {
                //setStatus(500)
                setError('Pruebe de nuevo más tarde. Si persiste el error, contacte con el administrador.')
            }
        }
        setLoading(false)
    }

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Avatar src="" className={classes.small} />                            
                    </Grid>
                    <Grid item xs={7}>
                        {vehiculo.matricula}                            
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton 
                            color="secondary" 
                            aria-label="Borrar Vehículo"
                            onClick={() => {bajaVehiculo(vehiculo._id)}}
                            disabled={usuario.rol !== 1}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        {vehiculo.marca + ' ' + vehiculo.modelo}
                    </Grid>
                    <Grid item xs={12}>
                        {vehiculo.combustible}
                    </Grid>
                    {vehiculo.proximaCita ? (
                        <Grid item xs={6}>
                            {'Próxima cita: ' + vehiculo.proximaCita}
                        </Grid>
                    ) : null}
                    {vehiculo.proximaCita ? (
                        <Grid item xs={6}>
                            ** Reparación en curso **
                        </Grid>
                    ) : null}
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Vehiculo;