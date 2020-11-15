//React Native
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useAppl } from '../../context/ApplContext';

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

//Componentes
import DatosPersonales from './components/DatosPersonales';
import Vehiculo from './components/Vehiculo';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
}));

const Cliente = (props) => {
    const classes = useStyles();
    
    //Estado appl
    const {token, setLoading} = useAppl();
    //Estado del componente
    const [cliente, setCliente] = useState({});
    const [vehiculos, setVehiculos] = useState([]);
        
    const getCliente = async () => {
        setLoading(true)
        const pathname = props.location.pathname;
        const clientID = pathname.substr(pathname.lastIndexOf('/') + 1)
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/clientes/'+clientID,
                {
                    headers: {'auth-token': token},
                }
            ) 
            setCliente(res.data.cliente)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const getVehiculos = async () => {
        setLoading(true)
        const pathname = props.location.pathname;
        const clientID = pathname.substr(pathname.lastIndexOf('/') + 1)
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/vehiculos/'+clientID,
                {
                    headers: {'auth-token': token},
                }
            ) 
            setVehiculos(res.data.vehiculos)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    
    useEffect(() => {
        getCliente();
        getVehiculos();
    },[])

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={3}>
                <DatosPersonales cliente={cliente} />
                {
                    vehiculos.length > 0 ?
                        vehiculos.map( vehiculo => (
                            <Vehiculo 
                                key={vehiculo._id} 
                                vehiculo={vehiculo} 
                            />
                        ))
                    : null
                }
            </Grid>
        </Container>
    )    
}

export default Cliente;