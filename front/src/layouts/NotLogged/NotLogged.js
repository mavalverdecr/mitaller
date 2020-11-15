//React-Native
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import { Topbar, MessageBar } from '../components';

//Material-UI
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,    
});

class NotLogged extends Component {

    render () {
        const { children, classes } = this.props
        
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Topbar />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    { children }
                    <MessageBar />
                </main>
            </div>
        )
    }
}

NotLogged.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(NotLogged)