//React Native
import React from 'react';
import { useAppl } from '../../../../context/ApplContext';
import axios from 'axios';
import moment from 'moment';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForward from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
  }));

const TarjetaCita = (props) => {
    const classes = useStyles();
    const { cita } = props;

    const {setLoading, setError, setStatus, token} = useAppl();

    const bajaCita = async id => {
        setError('')
        setLoading(true)
        
        try {
            const res = await axios.delete(
                process.env.REACT_APP_API_URL+'/citas/'+id,
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

    const citaATarea = async cita => {
        setError('')
        setLoading(true)
        try {
            const res = await axios.post(
                process.env.REACT_APP_API_URL+'/tareas/',{
                    matricula: cita.matricula,
                    descripcion: cita.descripcion,                  
                },
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
        <Paper className={classes.paper}>
            <Typography variant='h6'>
              { cita.matricula }
            </Typography>            
            <Typography component='p'>
              { cita.descripcion }
            </Typography>            
            <Typography component='p'>
              { moment(cita.fecha).format('DD/MM/YYYY h:mm') }
            </Typography>
            <IconButton 
                color="secondary" 
                aria-label="Borrar Cita"
                onClick={() => {bajaCita(cita._id)}}
            >
                <DeleteIcon />
            </IconButton>            
            <IconButton 
                color="primary" 
                aria-label="Avanzar cita"
                onClick={() => {citaATarea(cita)}}
            >
                <ArrowForward />
            </IconButton>            
        </Paper> 
    )
}

export default TarjetaCita;