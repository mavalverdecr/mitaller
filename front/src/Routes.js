//React Native
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useAppl } from './context/ApplContext';

//Views
import Citas from './views/Citas';
import Cliente from './views/Cliente';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import Tareas from './views/Tareas';
import DetalleTarea from './views/DetalleTarea';

//Layouts
import Logged from './layouts/Logged'
import NotLogged from './layouts/NotLogged'

//Components 
import RouteWithLayout from './components/RouteWithLayout'

const Routes = () => {
    
    const { isLogged } = useAppl();
    return (
        <Switch>
            <RouteWithLayout 
                path="/login" 
                component={Login}
                layout={NotLogged}
                private={false}
                isLogged={isLogged}
            />
            <RouteWithLayout 
                path="/signup" 
                component={Signup} 
                layout={NotLogged}
                private={false}  
                isLogged={isLogged}
            />
            <RouteWithLayout 
                path="/dashboard" 
                component={Dashboard} 
                layout={Logged}
                private={true}
                isLogged={isLogged}
            />
            <RouteWithLayout 
                path="/cliente/:id" 
                component={Cliente} 
                layout={Logged}
                private={true}
                isLogged={isLogged}
            />
            <RouteWithLayout 
                path="/citas" 
                component={Citas} 
                layout={Logged}
                private={true}
                isLogged={isLogged}
            />
            <RouteWithLayout 
                path="/tarea/:id" 
                component={DetalleTarea} 
                layout={Logged}
                private={true}
                isLogged={isLogged}
            />            
            <RouteWithLayout 
                path="/tareas" 
                component={Tareas} 
                layout={Logged}
                private={true}
                isLogged={isLogged}
            />
            {
            isLogged ? 
                <Redirect from="/" to="/dashboard" />
            :
                <Redirect from="/" to="/login" />
            }
        </Switch>
    );
}

export default Routes;