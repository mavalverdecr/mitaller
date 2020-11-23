//React Native
import React, { useState, useEffect } from 'react';
import {useAppl} from '../../context/ApplContext';
import axios from 'axios';
import moment from 'moment'

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

//Components 
import Tarjeta from './components/Tarjeta'

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
}));

const Dashboard = () => {
    //Clases CSS
    const classes = useStyles();
    
    //Context
    const { token,setLoading } = useAppl();

    //Estado del componente
    const [tareasPlani, setTareasPlani] = useState(0)
    const [tareasEnCurso, setTareasEnCurso] = useState(0)
    const [tareasFinal, setTareasFinal] = useState(0)
    const [citasPdteRecibir, setcitasPdteRecibir] = useState(0)
    const [proximaCita, setProximaCita] = useState("")
    
    const getTareas = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/tareas',
                {headers: {'auth-token': token}}
            ) 
            const tareas = res.data.tareas
            setTareasPlani(tareas.filter( tarea => (tarea.estado === 1)).length);
            setTareasEnCurso(tareas.filter( tarea => (tarea.estado === 2)).length);
            setTareasFinal(tareas.filter( tarea => (tarea.estado === 3)).length);
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const getCitas = async () => {
        setLoading(true)
        try {
            const fechaHoy = new Date(Date.now())
            const fechaIni = new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate(),1,0,0) 
            const fechaFin = new Date(fechaHoy.getFullYear(),fechaHoy.getMonth(),fechaHoy.getDate(),24,59,59) 
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/citas',
                {
                    headers: {'auth-token': token},
                    params: {fechaIni,fechaFin}
                }
            ) 
            const citas = res.data.citas
            setcitasPdteRecibir(citas.length);
            setProximaCita(citas.length > 0 ? citas[0].matricula : "")
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    
    useEffect(() => {
        getTareas()
        getCitas()
        
    }, [])

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Tarjeta 
                        titulo="Tareas"
                        variant="h2"
                        />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Tarjeta 
                        titulo="Planificadas"
                        variant="h5"
                        contenido={tareasPlani}
                        />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Tarjeta 
                        titulo="En curso"
                        variant="h5"
                        contenido={tareasEnCurso}
                        />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Tarjeta 
                        titulo="Finalizadas"
                        variant="h5"
                        contenido={tareasFinal}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Tarjeta 
                        titulo="Citas"
                        variant="h2"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tarjeta 
                        titulo={"Pendientes de recibir a " + moment(Date.now()).format('DD/MM/YYYY')}
                        variant="h5"
                        contenido={citasPdteRecibir}
                        />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tarjeta 
                        titulo="Próxima cita"
                        variant="h5"
                        contenido={proximaCita}
                    />
                </Grid>
            </Grid>
    </Container>
    )    
}

export default Dashboard;