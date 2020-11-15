//React Native
import React, {useState, useEffect} from 'react';
import { useAppl } from '../../../../context/ApplContext';
import altaCliente from '../../../../forms/altaCliente';
import moment from 'moment';
import axios from 'axios';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

const DatosPersonales = (props) => {
    const classes = useStyles();
    const {cliente} = props;

    const {usuario, setFormDialog,setLoading, setError, setStatus, token} = useAppl();

    const editarCliente = () => {
        const form = altaCliente
        form.fields.map(f => {
            console.log(f)
            console.log(f.name)
            console.log(cliente[f.name])
            f.value = cliente[f.name]
            return f
        })
        setFormDialog({
            open: true,
            form
        })       
    }

    const bajaCliente = async () => {

        setError('')
        setLoading(true)
        
        try {
            const res = await axios.delete(
                process.env.REACT_APP_API_URL+'/clientes/'+cliente._id,
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
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            DATOS PERSONALES
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField variant="filled" disabled={true} value={cliente.dni} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField variant="filled" disabled={true} value={cliente.nombre} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField variant="filled" disabled={true} value={cliente.apellidos} fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField variant="filled" disabled={true} value={cliente.telefono} fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField variant="filled" disabled={true} value={cliente.email} fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField variant="filled" disabled={true} value={moment(cliente.fechaAlta).format('DD/MM/YYYY')} fullWidth/>
                    </Grid>
                    {cliente.estado === 2 && cliente.fechaBaja !== '' ? (
                        <Grid item xs={12} sm={2}>
                            <TextField variant="filled" disabled={true} value={moment(cliente.fechaBaja).format('DD/MM/YYYY')} fullWidth/>
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        {cliente.estado !== 2 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<EditIcon />}
                                onClick={editarCliente}
                                name="editar"
                                disabled={usuario.rol !== 1}
                            >
                                EDITAR
                            </Button>
                        ) : null}
                        {cliente.estado !== '2' ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={bajaCliente}
                                name="baja"
                                disabled={usuario.rol !== 1}
                            >
                                DAR DE BAJA
                            </Button>
                        ) : null}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

    )
    return null
}

export default DatosPersonales;