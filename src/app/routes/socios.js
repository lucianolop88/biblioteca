const dbConnection = require('../../config/dbConnection');
var parametroDeBusqueda;
var parametroABuscar;

module.exports = app=>{
    const conexion = dbConnection();

    app.get('/socios/ver',(req,res)=>{

        conexion.query('SELECT CodSocio, Nombre, Apellido FROM Socio',(err,result)=>{
            if (err){
                console.error('Error al borrar el leer registro',err);
                res.status(500).send('Error al leer',err)
            }else{

                res.render('socios_ver.ejs',{
                    socios: result
                });
            }
            

        });
    });

    app.get('/socios/buscar',(req,res)=>{
       
        res.render('socios_buscar.ejs');
       
    });

    app.get('/socios/modificar',(req,res)=>{
        res.render('socios_modificar.ejs');
    });

    app.get('/socios/eliminar',(req,res)=>{
        res.render('socios_eliminar.ejs')
    });

    function buscar(nombreParametro, parametro, subruta,res){
        var query = '';
        const vista = 'socios_'+subruta+'_cod.ejs';
      

        if (nombreParametro == 'Apellido'){
            query = "SELECT s.CodSocio, concat(s.Nombre,' ',s.Apellido) as Nombre, s.DNI, s.Direccion, p.Provincia, s.Tel FROM Socio as s left join Provincia as p on s.CodProvincia = p.CodProvincia WHERE "+nombreParametro+" LIKE ?";
            parametro = parametro+'%';
        }else {
            query = "SELECT s.CodSocio, concat(s.Nombre,' ',s.Apellido) as Nombre, s.DNI, s.Direccion, p.Provincia, s.Tel FROM Socio as s left join Provincia as p on s.CodProvincia = p.CodProvincia WHERE "+nombreParametro+" = ?";
            
           
        }
        
         
        conexion.query(query,[parametro],(err,result)=>{
            if (err){
                console.error('Error al leer el registro:',err);
                res.status(500).send('Error al leer el registro');
            }else{
                console.log('Registro editado con exito');
               
                res.render(vista,{
                socios: result
                });
            }
            
        });
    };    

    app.post('/socios/:subruta/:nombreParametro',(req,res)=>{
        var nombreParametro = req.params.nombreParametro;
        var parametro = req.body.parametro;
        parametroDeBusqueda = nombreParametro;
        parametroABuscar = parametro;
        const subruta = req.params.subruta;
        buscar(nombreParametro,parametro,subruta,res);
      
    });

    
    app.post('/socios/guardar',(req,res)=>{
        const DNI = req.body.dni;
        const Nombre = req.body.nombre;
        const Apellido = req.body.apellido;
        const Direccion = req.body.direccion;
        const Tel = req.body.tel;
        const CodProvincia = req.body.CodProvincia;
        
     
        conexion.query('INSERT INTO Socio SET?',{
            DNI,
            Nombre,
            Apellido,
            Direccion,
            CodProvincia,
            Tel
        },(err,result)=>{
            if (err){
                console.error('Error al insertar el registro:',err);
                res.status(500).send('Error al insertar el registro');
            }else{
                res.redirect('/socios');
            }
            
        })
    });

    
    app.get('/socios/modificar/:CodSocio',(req,res)=>{
       
        const CodSocio=req.params.CodSocio;
        var resultadoSocio;
        const query = 'select * from Socio natural join Provincia where CodSocio =?';
        const query2 = 'Select * from Provincia';
        conexion.query(query,[CodSocio],(err,result)=>{
            if (err){
                console.error('Error al leer registro:',err);
                res.status(500).send('Error al leer el registro');
            }else{
                console.log('Registro editado con exito');
                resultadoSocio = result[0];
                
            }
        });

        conexion.query(query2,(err,result)=>{
            if (err){
                console.error('Error al leer regostro:',err);
                res.status(500).send('Error al leer el registro');
            }else{
                console.log('Registro leido con exito');
                res.render('socios_modificar_seleccionado.ejs',{
                    socio: resultadoSocio,
                    provincias: result

                });
                
            }
        });

       
    });

    
    app.post('/socios/modificar/seleccionado/:CodSocio',(req,res)=>{
       
        const CodSocio = req.params.CodSocio;
        const DNI = req.body.dni;
        const Nombre = req.body.nombre;
        const Apellido = req.body.apellido;
        const Direccion = req.body.direccion;
        const Tel = req.body.tel;
        const CodProvincia = req.body.CodProvincia;
      
        const query = 'UPDATE Socio SET DNI = ?, Nombre = ?, Apellido = ?, Direccion = ?, CodProvincia = ?, Tel = ? WHERE CodSocio=?';
        conexion.query(query,[DNI,Nombre,Apellido,Direccion,CodProvincia,Tel,CodSocio],(err,result)=>{
            if (err){
                console.error('Error al editar regostro:',err);
                res.status(500).send('Error al editar el registro');
            }else{
                console.log('Registro editado con exito');
               // res.redirect('/socios/modificar');
            }
        });
        buscar(parametroDeBusqueda,parametroABuscar,'modificar',res);
    });

    app.get('/socios/eliminar/:CodSocio',(req,res)=>{
        const CodSocio= req.params.CodSocio;
        const query= 'DELETE FROM Socio WHERE CodSocio = ?';
    
        conexion.query(query,[CodSocio],(err,result)=>{
            if(err){
                console.error('Error al borrar el registro',err);
                res.status(500).send('Error al borrar',err)
            }else{
                console.log('Registro borrado');
              //  res.redirect('/socios/eliminar');
            }
            
        });
        buscar(parametroDeBusqueda,parametroABuscar,'eliminar',res);
    });
}