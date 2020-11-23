//React Native
import React, { useState, useEffect } from 'react';
import {useAppl} from '../../context/ApplContext'
import axios from 'axios';
import moment from 'moment';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';


//Componentes
import { TarjetaCita } from './components/TarjetaCita';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const Citas = () => {
    const classes = useStyles();

    const { token, setLoading } = useAppl(); 

    //Estado del componente
    const [fechaIni, setFechaIni] = useState(
        () => {
            const fechaHoy = new Date(Date.now())
            const fechaInicioSem = new Date(fechaHoy.getTime() - ((fechaHoy.getDay() - 1) * 1000 * 60 * 60 * 24));
            return new Date(fechaInicioSem.getFullYear(),fechaInicioSem.getMonth(),fechaInicioSem.getDate(),1,0,0) 
        }
    );
    const [fechaFin, setFechaFin] = useState(
        () => {
            const fechaHoy = new Date(Date.now())
            const fechaFinSem = new Date(fechaHoy.getTime() + ((5 - fechaHoy.getDay()) * 1000 * 60 * 60 * 24));
            return new Date(fechaFinSem.getFullYear(),fechaFinSem.getMonth(),fechaFinSem.getDate(),24,59,59) 
        }
    );
    const [citas, setCitas] = useState([]);
    
    useEffect(() => {
        getCitas()
    }, [fechaIni,fechaFin])
 
    const semanaAnt = () => {
        setFechaIni(new Date(fechaIni.getTime() - 7 * 1000 * 60 * 60 * 24))
        setFechaFin(new Date(fechaFin.getTime() - 7 * 1000 * 60 * 60 * 24))
    }
    
    const semanaSig = () => {   
        setFechaIni(new Date(fechaIni.getTime() + 7 * 1000 * 60 * 60 * 24))
        setFechaFin(new Date(fechaFin.getTime() + 7 * 1000 * 60 * 60 * 24))
    }
    
    const getCitas = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/citas',
                {
                    headers: {'auth-token': token},
                    params: {fechaIni,fechaFin}
                }
            ) 
            const citas = res.data.citas
            setCitas(citas);
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const citasLunes = citas.filter( cita => (cita.diaSemana === 1));
    const citasMartes = citas.filter( cita => (cita.diaSemana === 2));
    const citasMiercoles = citas.filter( cita => (cita.diaSemana === 3));
    const citasJueves = citas.filter( cita => (cita.diaSemana === 4));
    const citasViernes = citas.filter( cita => (cita.diaSemana === 5));

    return (
        <Container maxWidth="lg" className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12} style={{alignItems: 'center'},{display:'flex'}}>
                    <IconButton color="primary" aria-label="Atrás" name="ant" onClick={semanaAnt} >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant='h5'>
                        {
                           'Desde ' + moment(fechaIni).format('DD/MM/YYYY') + ' hasta ' + moment(fechaFin).format('DD/MM/YYYY')
                        }
                    </Typography>
                    <IconButton color="primary" aria-label="Adelante" name="sig" onClick={semanaSig}>
                        <ArrowForward />
                    </IconButton> 
                </Grid>
                <Grid item xs={12} sm={1} style={{textAlign: 'center'}}>
                </Grid>
                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                    <Typography variant='h5'>
                        Lunes
                    </Typography> 
                    {
                        citasLunes.map( cita => (
                            <TarjetaCita 
                                key={cita._id}
                                cita={cita}
                            />
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                    <Typography variant='h5'>
                        Martes
                    </Typography> 
                    {
                        citasMartes.map( cita => (
                            <TarjetaCita 
                                key={cita._id}
                                cita={cita}
                            />
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                    <Typography variant='h5'>
                        Miércoles
                    </Typography>
                    {
                        citasMiercoles.map( cita => (
                            <TarjetaCita 
                                key={cita._id}
                                cita={cita}
                            />
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                    <Typography variant='h5'>
                        Jueves
                    </Typography> 
                    {
                        citasJueves.map( cita => (
                            <TarjetaCita 
                                key={cita._id}
                                cita={cita}
                            />
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={2} style={{textAlign: 'center'}}>
                    <Typography variant='h5'>
                        Viernes
                    </Typography> 
                    {
                        citasViernes.map( cita => (
                            <TarjetaCita 
                                key={cita._id}
                                cita={cita}
                            />
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={1} style={{textAlign: 'center'}}>
                </Grid>
            </Grid>
        </Container>
    )    
}

export default Citas;