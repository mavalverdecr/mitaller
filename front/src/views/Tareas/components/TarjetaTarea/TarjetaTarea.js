//React Native
import React, { useState } from 'react';
import { useAppl } from '../../../../context/ApplContext';
import axios from 'axios'
import moment from 'moment';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
  }));

const TarjetaTarea = (props) => {
    const classes = useStyles();
    const [tarea,setTarea] = useState(props.tarea);

    const {setLoading, setError, setStatus, token} = useAppl();

    const avanzarTarea = async () => {
      setError('')
      setLoading(true)
      try {
          const res = await axios.patch(
            process.env.REACT_APP_API_URL+'/tareas/'+tarea._id,
              {
                  estado: tarea.estado + 1
              },
              {
                  headers: {'auth-token': token},
              }
          ) 
          setTarea({
            ...tarea,
            estado: tarea.estado + 1
          })
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

    const retrocederTarea = async () => {
      setError('')
      setLoading(true)
      try {
          const res = await axios.patch(
            process.env.REACT_APP_API_URL+'/tareas/'+tarea._id,
              {
                estado: tarea.estado - 1
              },
              {
                  headers: {'auth-token': token},
              }
          ) 
          setTarea({
            ...tarea,
            estado: tarea.estado - 1
          })
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
              { tarea.matricula }
            </Typography>            
            <Typography component='p'>
              { tarea.descripcion }
            </Typography>            
            <Typography component='p'>
              { 'Fecha de inicio: ' + moment(tarea.fechaInicioEstado).format('DD/MM/YYYY') }
            </Typography>
            <IconButton 
                color="primary" 
                aria-label="Retroceder Tarea"
                onClick={retrocederTarea}
                disabled={tarea.estado === 1}
                >
                <ArrowBack />
            </IconButton>            
            <IconButton 
                color="primary" 
                aria-label="Avanzar Tarea"
                onClick={avanzarTarea}
                disabled={tarea.estado === 3}
            >
                <ArrowForward />
            </IconButton> 
        </Paper> 
    )
}

export default TarjetaTarea;