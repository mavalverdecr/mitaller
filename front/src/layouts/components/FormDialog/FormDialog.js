//React Native
import React from 'react';
import { useAppl } from '../../../context/ApplContext';

//Material-UI
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = () => {
    
    const { formDialog, setFormDialog, postForm, status } = useAppl();

    const handleClose = () => {
        setFormDialog(
            {
                open: false,
                route: '',
                form: {
                    title: '',
                    fields: [],
                    buttons: []
                },
            }
        )
    }
    
    const handleOnClick = () => {
        postForm()
    }

    const handleOnChange = e => {
        const form = formDialog.form
        form.fields.map(f => {
            if (f.name === e.target.name) {
                f.value = e.target.value
            }
            return f
        })
        setFormDialog({
            open: formDialog.open,
            form
        })
    }

    const handleOnBlur = e => {
        const form = formDialog.form
        const field = form.fields.filter(f => (
            f.name === e.target.name
        ))
        const validar = (field,value,error,mensaje) => {
            const form = formDialog.form

            form.fields.map(f => {
                if (f.name === field.name) {
                    f.error = error
                    f.mensaje = mensaje
                    f.value = value
                }
                return f
            })

            const fieldsError = form.fields.filter(f => (
                f.error === true
            ))

            const fieldsReq = form.fields.filter(f => (
                f.required === true && f.value === ''
            ))

            fieldsError.length > 0 || fieldsReq.length > 0 ? form.buttons[0].disabled = true : form.buttons[0].disabled = false

            return ({
                open: formDialog.open,
                form
            })
        }

        //Validar entrada
        const regex = field[0].validate;

        if (field[0].required && e.target.value === '') { 
            setFormDialog(validar(field[0],e.target.value,true,'Campo obligatorio'))
            return
        } else {
            if (regex && !regex.test(e.target.value.toString().toUpperCase())) {
                setFormDialog(validar(field[0],e.target.value,true,'Formato incorrecto'))
                return
            }
        }
        setFormDialog(validar(field[0],e.target.value,false,''))
    }

    //Formulario
    const form = formDialog.form;
    return (
        <Dialog 
            open={formDialog.open} 
            aria-labelledby="form-dialog-title"
            onClose={handleClose}
        >
            <DialogTitle id="form-dialog-title">{ form.title }</DialogTitle>
            <DialogContent>
                {
                    form.fields.map(field => (
                        <TextField 
                            error={field.error}
                            helperText={field.error ? field.mensaje : null}
                            key={ field.name }
                            name={ field.name }
                            margin="dense"
                            id={ field.name }
                            label={ field.label }
                            type={ field.type }
                            fullWidth
                            onBlur={handleOnBlur} 
                            onChange={handleOnChange}  
                            value={ field.value }
                        />
                    ))
                }                   
            </DialogContent>
            <DialogActions>
                {
                    form.buttons.map(button => (
                        <Button 
                            onClick={handleOnClick} 
                            color="primary"
                            key={button.name}
                            disabled={button.disabled}
                        >
                            {button.name}
                        </Button>
                    ))
                }
            </DialogActions>
        </Dialog>            
    )
}
 
export default FormDialog;