const dbConnection = require('../../config/dbConnection');



module.exports = app=>{
    const conexion = dbConnection();

app.get('/prestamos/libros/detalles/:CodLibro',(req,res)=>{
    const CodLibro = req.params.CodLibro;
    console.log(CodLibro);
    const query = 'SELECT * FROM (SELECT * FROM Libro NATURAL JOIN (SELECT c.CodEjem, c.CodLibro, c.Prestado, c.CodPrestamo, p.CodSocio, p.FPrestamo, p.FDevolucion, p.FTope  from (SELECT e.CodEjem, e.CodLibro, e.Prestado, max(p.CodPrestamo) as CodPrestamo FROM Ejemplar e LEFT JOIN Prestamo p ON p.CodEjem = e.CodEjem where codlibro=1 GROUP BY CodEjem, CodLibro ) c LEFT JOIN Prestamo p on c.CodPrestamo = p.CodPrestamo WHERE CodLibro =1 GROUP BY CodEjem, CodLibro,  CodSocio, FPrestamo, FDevolucion, FTope ) x) y LEFT JOIN Socio s on y.CodSocio = s.CodSocio';
    conexion.query(query,[CodLibro],(err,result)=>{
        if (err){
            console.error('Error al leer el registro:',err);
            res.status(500).send('Error al leer el registro');
        }else{
            
            res.render('prestamos_detalles.ejs',{
               
                ejemplares: result
            });
        }
    });
 
});


app.get('/prestamos/libros/detalles/devolver/:CodEjem/:CodPrestamo',(req,res)=>{
    const CodEjem = req.params.CodEjem;
    const CodPrestamo = req.params.CodPrestamo;
    const FDevolucion = new Date();
    conexion.query('UPDATE Prestamo SET FDevolucion = ? WHERE CodPrestamo = ?',[FDevolucion,CodPrestamo],(err,result)=>{
        if (err){
            console.error('Error al editar el registro:',err);
            res.status(500).send('Error al editar el registro');
        }
    });

    conexion.query('UPDATE Ejemplar SET Prestado = 0 WHERE CodEjem = ?',[CodEjem],(err,result)=>{
        if (err){
            console.error('Error al editar el registro:',err);
            res.status(500).send('Error al editar el registro');
        }
    });
    res.redirect('/prestamos');
});

app.get('/prestamos/libros/detalles/prestar/:CodEjem',(req,res)=>{
    const CodEjem = req.params.CodEjem;
    var socios;
    conexion.query('SELECT * FROM Socio',(err,result)=>{
        if(err){
            console.error('Error al leer el registro:',err);
            res.status(500).send('Error al leer el registro');
        }else{
            socios = result;
        }
    });
    conexion.query('SELECT e.CodEjem, e.CodLibro, l.Titulo, l.ISBN, l.AEscritura from Libro l LEFT JOIN Ejemplar e on l.CodLibro = e.CodLibro WHERE e.CodEjem = ?',[CodEjem],(err,result)=>{
        if(err){
            console.error('Error al leer el registro:',err);
            res.status(500).send('Error al leer el registro');
        }else{
            res.render('prestamos_detalles_prestar.ejs',{
                ejemplar: result[0],
                socios
            });
           

        };
    });
});

app.post('/prestamos/libros/detalles/prestar/:CodEjem',(req,res)=>{
    const CodEjem = req.params.CodEjem;
    const CodSocio = req.body.CodSocio;
    const FPrestamo = new Date();
    const FTope = new Date();
    FTope.setDate(FTope.getDate()+7);
    console.log(CodSocio);
 
    conexion.query('UPDATE Ejemplar SET Prestado = 1 WHERE CodEjem = ?',[CodEjem],(err,result)=>{
        if(err){
            console.error('Error al editar el registro:',err);
            res.status(500).send('Error al editar el registro');
        }
    });
    conexion.query('INSERT INTO Prestamo SET CodSocio = ?, CodEjem = ?, FPrestamo = ?, FTope = ?',[CodSocio,CodEjem,FPrestamo,FTope],(err,result)=>{
        if(err){
            console.error('Error al insertar el registro:',err);
            res.status(500).send('Error al insertar el registro');
        }else{
            res.redirect('/prestamos');
           

        };
    });
});

app.get('/prestamos/ejemplares',(req,res)=>{
    var ejemplares;
    conexion.query('SELECT l.Titulo, l.ISBN, l.AEscritura, e.CodEjem, e.CodLibro, e.Prestado FROM Libro l JOIN Ejemplar e ON l.CodLibro = e.CodLibro ORDER BY Titulo',(err,result)=>{
        if (err){
            console.error('Error al leer el registro:',err);
            res.status(500).send('Error al leer el registro');
        }else{
            ejemplares = result;
        } 
        
    });
    conexion.query('SELECT * FROM Libro',(err,result)=>{
        if (err){
            console.error('Error al leer el registro:',err);
            res.status(500).send('Error al leer el registro');
        }else{
            res.render('prestamos_ejemplares.ejs',{
                libros: result,
                ejemplares
            });
        }
    });


});

app.post('/prestamos/ejemplares/agregar',(req,res)=>{
    const CodLibro = req.body.CodLibro;
    const cantidadDeEjemplares = req.body.cantidadDeEjemplares;
   console.log(cantidadDeEjemplares);
  
    var query = 'INSERT INTO Ejemplar (CodLibro,Prestado) VALUES ';
    for (var i=1;i<=cantidadDeEjemplares;i++){
        
        if (i==cantidadDeEjemplares){
            query = query+'('+CodLibro+', 0)';
        }else{
            query = query+'('+CodLibro+', 0), ';
        }
        
    }
    conexion.query(query,(err,result)=>{
        if (err){
            console.error('Error al insertar el registro:',err);
            res.status(500).send('Error al insertar el registro');
        }else{
            res.redirect('/prestamos/ejemplares');
        }
    });  

});

app.get('/prestamos/ejemplares/borrar/:CodEjem',(req,res)=>{
    const CodEjem = req.params.CodEjem;
    conexion.query('DELETE FROM Ejemplar WHERE CodEjem = ?',[CodEjem],(err,result)=>{
        if (err){
            console.error('Error al borrar el registro:',err);
            res.status(500).send('Error al borrar el registro');
        }else{
            res.redirect('/prestamos/ejemplares');
        }
    });
});

}