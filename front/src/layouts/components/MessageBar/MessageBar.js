import React, {useEffect} from 'react'
import {useAppl} from '../../../context/ApplContext'

//Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    message: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
}));

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MessageBar = () => {
    
    const classes = useStyles()

    const {openMessageBar, setOpenMessageBar, error, status} = useAppl();
    
    const handleClose = () => {
        setOpenMessageBar(false)
    }

    useEffect(() => {
        setOpenMessageBar(() => (status && error ? true : false))
    }, [error])

    return (
        <div className={classes.message}>
            <Snackbar 
                open={openMessageBar} 
                autoHideDuration={3000} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={status === 200 ? "success" : "error"}>
                    {error}
                </Alert>
            </Snackbar>    
        </div>    
    )
}

export default MessageBar;