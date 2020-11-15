import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ApplContext = React.createContext();

export const useAppl = () => {
    return useContext(ApplContext)
}
export const ApplProvider = (props) => {
    
    const lsToken = localStorage.getItem('token');
    
    //Estados
    const [isLogged, setIsLogged] = useState(lsToken ? true : false);
    const [usuario, setUsuario]  = useState({});
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus]  = useState();
    const [error, setError]  = useState('');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [openMessageBar, setOpenMessageBar] = useState(false);
    const [formDialog, setFormDialog] = useState({
        open: false,
        route: '',
        form: {
            title: '',
            fields: [],
            buttons: []
        },
    });
    
    //Funciones
    const verifyToken = async (token) => {
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'/user/verifyToken',{token});
            if (res.status === 200) return res.data
        } catch {}
    }

    const postForm = async () => {
        setError('')
        setLoading(true)
        
        try {
            const form = formDialog.form 
            const route = form.route 
            const req = {}
            form.fields.map(f=>(req[f.name] = f.value))
            if (route === "user/signup") req["rol"] = 2
            const res = await axios.post(process.env.REACT_APP_API_URL+route,req,{headers: {'auth-token': token}});
            //Control de retorno
            setStatus(res.status);
            setError(res.data.mensaje);
            //Cerrar el form dialog
            setFormDialog({
                open: false,
                route: '',
                form: {
                    title: '',
                    fields: [],
                    buttons: []
                },
            })
        } catch(err) {
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                setStatus(err.response.status)
                setError(err.response.data.mensaje)
            } else {
                setStatus(500)
                setError('Pruebe de nuevo más tarde. Si persiste el error, contacte con el administrador.')
            }
        }
        setLoading(false)
    }

    const signup = async (u) => {
        setError('')
        setStatus(0)
        setLoading(true)
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'/user/signup',{
                nombre: u.nombre,
                apellidos: u.apellidos,
                telefono: u.telefono,
                email: u.email,
                usuario: u.usuario,
                password: u.password,
                repeatPassword: u.repeatPassword,
                rol: u.rol,
            });
            //Control de retorno
            setError(res.data.mensaje);
            setStatus(res.status)
            if (res.status === 200) {
                setUsuario(res.data.usuario);
                setToken(res.data.token)
                localStorage.setItem('token',res.data.token)
                setIsLogged(true);
            }else{
                setIsLogged(false);
            }
        } catch(err) {
            setIsLogged(false);
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                setStatus(err.response.status)
                setError(err.response.data.mensaje)
            } else {
                setStatus(500)
                setError('Pruebe de nuevo más tarde. Si persiste el error, contacte con el administrador.')
            }
        }
        setLoading(false)
    }

    const login = async (usuario,password) => {
        setError('')
        setStatus(0)
        setLoading(true)
        try {
            const res = await axios.post(process.env.REACT_APP_API_URL+'/user/login',{usuario,password});
            //Control de retorno
            setError(res.data.mensaje);
            setStatus(res.status)
            if (res.status === 200) {
                setUsuario(res.data.usuario);
                setToken(res.data.token)
                localStorage.setItem('token',res.data.token)
                setIsLogged(true);
            }else{
                setIsLogged(false);
            }
        } catch(err) {
            setIsLogged(false);
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                setStatus(err.response.status)
                setError(err.response.data.mensaje)
            } else {
                setStatus(500)
                setError('Pruebe de nuevo más tarde. Si persiste el error, contacte con el administrador.')
            }
        }
        setLoading(false)
    }

    const logout = () => {
        setUsuario({});
        localStorage.removeItem('token')
        setIsLogged(false); 
    }

    const comprobarToken = async () => {
        const vfyToken = await verifyToken(lsToken)
        setIsLogged(lsToken && vfyToken ? true : false)
        setUsuario(lsToken && vfyToken ? vfyToken : {})
        setToken(localStorage.getItem('token'))
    }

    useEffect(() => {
        comprobarToken()
    }, [])

    const value = {
        isLogged,
        usuario,
        token,
        mobileSidebarOpen,
        openMessageBar,
        formDialog,
        loading,
        error,
        status,
        setLoading,
        setMobileSidebarOpen,
        setOpenMessageBar,
        setFormDialog,
        setError,
        login,
        logout,
        signup,
        postForm,
    }

    return (
        <ApplContext.Provider value={value}>
            {props.children}
        </ApplContext.Provider>
    );
}