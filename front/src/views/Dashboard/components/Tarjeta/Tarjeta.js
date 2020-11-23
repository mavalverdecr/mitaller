//React Native
import React from 'react';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },   
}));

const Tarjeta = props => {
    const classes = useStyles();
    const {titulo,variant, contenido} = props;
    return (
        <Paper className={classes.paper}>
            <Typography variant={variant}>
                {titulo}
            </Typography>
            <Typography variant="h1">
                {contenido}
            </Typography>
        </Paper>
    )    
}

export default Tarjeta;