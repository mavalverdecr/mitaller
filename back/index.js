const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//Import Routes
const authRoute = require('./routes/auth');
const citasRoute = require('./routes/citas');
const tareasRoute = require('./routes/tareas');
const clientesRoute = require('./routes/clientes');
const vehiculosRoute = require('./routes/vehiculos');


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Conectado a la BD!')
);

//Middlewares
app.use(express.json());
app.use(cors());


//Route middlewares
app.use('/user',authRoute);
app.use('/citas',citasRoute);
app.use('/tareas',tareasRoute);
app.use('/clientes',clientesRoute);
app.use('/vehiculos',vehiculosRoute);

app.listen(3001, () => { console.log('Servidor en marcha!') } );