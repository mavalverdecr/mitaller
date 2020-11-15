import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useAppl} from '../../../../../context/ApplContext'
//Material UI
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import ResultSearch from '../ResultSearch'

const useStyles = makeStyles((theme) => ({
    container: {
      zIndex: theme.zIndex.drawer + 555
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
      },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },   
  }));

const Autocomplete = () => {
    const classes = useStyles();

    const { token } = useAppl();

    //Estado del componente
    const [search,setSearch] = useState('');
    const [clientesSearch,setClientesSearch] = useState([]);

    const handleOnChange = e => {
        setSearch(e.target.value)
    }

    const sleep = (delay = 0) => {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

    const handleOnBlur = async () => {
        await sleep(1e2)
        setSearch('')
    }

    const getClientes = async q => {
        try {
            const res = await axios.get(
                process.env.REACT_APP_API_URL+'/clientes',
                {
                    headers: {'auth-token': token},
                    params: {q: search}
                }
            ) 
            setClientesSearch(res.data.clientes)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
      search.length > 2 ? getClientes(search) : setClientesSearch([]);        
    }, [search])

    return (
        <div className={classes.container}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar cliente..."
                  classes={{
                    root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  value={search}
                />
          </div>
          <ResultSearch clientes={clientesSearch}/>
      </div>
    )
}

export default Autocomplete;