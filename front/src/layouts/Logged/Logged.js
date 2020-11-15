//React-Native
import React from 'react';
import {useAppl} from '../../context/ApplContext';

//Components
import { Topbar, Sidebar, AddButton, FormDialog, MessageBar } from '../components';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,  
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },  
}))

const Logged = (props) => {
    const classes = useStyles();

    const { children } = props

    const {loading} = useAppl();

    return (
        <div className={classes.root}>              
            <CssBaseline />
            <Backdrop 
                open={loading} 
                className={classes.backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop> 
            <Topbar />
            <Sidebar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
                <AddButton />
                <FormDialog />
                <MessageBar />
            </main>
        </div>
    )
}

export default Logged