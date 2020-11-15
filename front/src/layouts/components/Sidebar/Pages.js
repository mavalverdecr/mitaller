import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />
    },
    {
        title: 'Citas',
        href: '/citas',
        icon: <AccessTimeIcon />
    },
    {
        title: 'Tareas',
        href: '/tareas',
        icon: <AssignmentIcon />
    },
];