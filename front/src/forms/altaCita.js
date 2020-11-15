import moment from 'moment'

export default {
    title: 'Nueva Cita',
    route: '/citas',
    fields: [
        {
            name: 'matricula',
            type: 'text',
            label: 'Matrícula *',
            validate: new RegExp(/^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$/),
            required: true,
            error: false,
            mensaje: '',
            value: '',
        },
        {
            name: 'descripcion',
            type: 'textarea',
            label: 'Descripción *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
            value: '',
        },
        {
            name: 'fecha',
            type: 'date',
            label: 'Fecha de la cita *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
            value: moment(Date.now()).format('YYYY-MM-DD'),
        },
        {
            name: 'hora',
            type: 'time',
            label: 'Hora de la cita *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
            value: moment(Date.now()).format('HH:MM'),
        },
    ],
    buttons: [
        {
            name: 'Guardar',
            action: 'Save',
            disabled: true
        },
    ],
};