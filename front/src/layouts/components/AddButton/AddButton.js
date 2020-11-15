//React Native
import React, { useState } from 'react';
import { useAppl } from '../../../context/ApplContext';

//Formularios
import altaCliente from '../../../forms/altaCliente';
import altaCita from '../../../forms/altaCita';
import altaEmpleado from '../../../forms/altaEmpleado';
import altaVehiculo from '../../../forms/altaVehiculo';

//Material UI
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonIcon from '@material-ui/icons/Person';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: theme.zIndex.drawer + 2,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const actions = [
    { icon: <PersonIcon />, name: 'Cliente' , id: 'cliente', nivelAcceso: 0},
    { icon: <DriveEtaIcon />, name: 'Vehículo', id: 'vehiculo', nivelAcceso: 0},
    { icon: <AccessTimeIcon />, name: 'Cita', id: 'cita', nivelAcceso: 0},
    { icon: <AccountBoxIcon />, name: 'Empleado', id: 'empleado',nivelAcceso: 1 },
];

const AddButton = () => {

    const { usuario, setFormDialog } = useAppl();

    //Estado del componente
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open);
    }
    
    const decidirFormulario = id => {
        let form ={}
        switch (id){
            case 'cliente':
                form = altaCliente
                break;
            case 'vehiculo':
                form = altaVehiculo
                break;
            case 'cita':
                form = altaCita
                break;
            case 'empleado':
                form = altaEmpleado 
                break;
            default:
                break;
        }
        
        return {
            open: true,
            form
        }    
    }

    const handleOpenDialog = id =>{
        setFormDialog(decidirFormulario(id))
    }

    const classes = useStyles();

    return (
        <div>
            <Backdrop 
                open={open} 
                onClick={handleToggleOpen}
                className={classes.backdrop}
            />  
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClick={handleToggleOpen}
                open={open}
            >
                {actions.map((action) => (
                    action.nivelAcceso === 0 || action.nivelAcceso === usuario.rol?
                        <SpeedDialAction
                            key={action.id}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => {
                                handleOpenDialog(action.id)
                            }}
                        />
                    : null
                ))}
            </SpeedDial>
        </div>
    )

}

export default AddButton;