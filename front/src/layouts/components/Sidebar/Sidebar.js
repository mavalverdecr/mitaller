import React from 'react';
import { useAppl } from '../../../context/ApplContext';

import { NavLink as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { 
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import pages from './Pages'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  }, 
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  }
}));

const Sidebar = () => {
  
  const { mobileSidebarOpen, setMobileSidebarOpen } = useAppl();

  const handleDrawerToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const classes = useStyles();
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {
          pages.map(page=>(
            <RouterLink 
              key={page.title}
              to={page.href} 
              className={classes.link}
            >
              <ListItem button >
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            </RouterLink>
          ))
        }
     </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileSidebarOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )

}

export default Sidebar;