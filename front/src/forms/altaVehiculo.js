export default {
    title: 'Nuevo Vehículo',
    route: '/vehiculos',
    fields: [
        {
            name: 'cliente',
            type: 'text',
            label: 'DNI Cliente *',
            validate: new RegExp(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/),
            required: true,
            error: false,
            mensaje: '',
        },
        {
            name: 'matricula',
            type: 'text',
            label: 'Matrícula *',
            validate: new RegExp(/^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$/),
            required: true,
            error: false,
            mensaje: '',
        },
        {
            name: 'marca',
            type: 'text',
            label: 'Marca *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
        },
        {
            name: 'modelo',
            type: 'text',
            label: 'Modelo *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
        },
        {
            name: 'combustible',
            type: 'text',
            label: 'Combustible *',
            validate: null,
            required: true,
            error: false,
            mensaje: '',
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