//React Native
import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Divider,
    ListItem,
    ListItemText
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({ 
    paperSearch: {
        textAlign: "left",
        color: theme.palette.text.secondary,
    },  
    link: {
        textDecoration: "none",
        color: 'white',
    },
}))  

const ResultSearch = (props) => {
    
    const classes = useStyles();
    const clientes = props.clientes;

    return (
      <Paper className={classes.paperSearch}>
        {clientes.map(cliente => (
          <RouterLink 
            key={cliente._id}
            to={'/cliente/' + cliente._id} 
            className={classes.link}
          >
            <ListItem button >
              <ListItemText secondary={cliente.nombre + ' ' + cliente.apellidos} />
            </ListItem>
            <Divider />
          </RouterLink>
        ))}
      </Paper>        
    )
}

export default ResultSearch