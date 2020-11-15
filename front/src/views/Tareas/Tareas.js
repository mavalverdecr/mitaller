//React Native
import React, { useState, useEffect } from 'react';
import {useAppl} from '../../context/ApplContext';
import axios from 'axios';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Componentes
import { TarjetaTarea } from './components/TarjetaTarea';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const Tareas = () => {
    const classes = useStyles();

    const { token,setLoading } = useAppl();

    //Estado del componente
    const [tareas, setTareas] = useState([]);
    
    useEffect(() => {
        getTareas()
    }, [])

    const getTareas = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/tareas',
                {headers: {'auth-token': token}}
            ) 
            const tareas = res.data.tareas
            setTareas(tareas);
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const planificadas = tareas.filter( tarea => (tarea.estado === 1));
    const enCurso = tareas.filter( tarea => (tarea.estado === 2));
    const finalizadas = tareas.filter( tarea => (tarea.estado === 3));

    return (
        <Container maxWidth="lg" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Typography variant='h5'>
                        PLANIFICADO
                    </Typography> 
                    {
                        planificadas.map(tarea => (
                            <TarjetaTarea 
                                key={tarea._id}
                                tarea={tarea}
                                setTareas={setTareas}
                            />
                        ))
                    }
                </Grid>                  
                <Grid item xs={12} sm={4}>
                    <Typography variant='h5'>
                        EN CURSO
                    </Typography>  
                    {
                        enCurso.map(tarea => (
                            <TarjetaTarea 
                                key={tarea._id}
                                tarea={tarea}
                            />
                        ))
                    }                             
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant='h5'>
                        FINALIZADO
                    </Typography> 
                    {
                        finalizadas.map(tarea => (
                            <TarjetaTarea 
                                key={tarea._id}
                                tarea={tarea}
                            />
                        ))
                    }                       
                </Grid>
            </Grid>
        </Container>
    )    
}

export default Tareas;