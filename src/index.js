const app = require('./config/server');
require('./app/routes/biblioteca')(app);
require('./app/routes/socios')(app);
require('./app/routes/libros')(app);
require('./app/routes/prestamos')(app);



//iniciar servidor

app.listen(app.get('port'),()=>{
    console.log('Activo en puerto', app.get('port'));
});