const dbConnection = require('../../config/dbConnection');
var parametroDeBusqueda;
var parametroABuscar;


module.exports = app=>{
    const conexion = dbConnection();

   
    app.post('/libros/editoriales/guardar',(req,res)=>{
        const query = 'INSERT INTO Editorial SET?';
        const Editorial = req.body.nombreEditorialNueva;
        conexion.query(query,{
            Editorial
        },(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/editoriales')
            }
        });
    });

    app.get('/libros/editorial/borrar/:CodEditorial',(req,res)=>{

        const CodEditorial = req.params.CodEditorial;
        conexion.query('DELETE FROM Editorial WHERE CodEditorial = ?',[CodEditorial],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/editoriales')
            }
        });

    });

    app.get('/libros/editorial/editar/:CodEditorial',(req,res)=>{
        const CodEditorial = req.params.CodEditorial;
        conexion.query('SELECT * FROM Editorial WHERE CodEditorial = ?',[CodEditorial],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.render('libros_editoriales_seleccionado.ejs',{
                    editorial: result[0]
                });
            };
        });
    });
    
    app.post('/libros/editoriales/editar_seleccionado/:CodEditorial',(req,res)=>{
        const CodEditorial = req.params.CodEditorial;
        const Editorial = req.body.nombreEditorialNueva;
        const diaActual = new Date();
        conexion.query('UPDATE Editorial SET Editorial = ? WHERE CodEditorial = ?',[Editorial,CodEditorial],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/editoriales')
            }
        });
    });
    
    //****/**** */ */

    app.post('/libros/autores/guardar',(req,res)=>{
        
        const query = 'INSERT INTO Autor SET?';
        const Nombre = req.body.nombreAutorNuevo;
        const Apellido = req.body.apellidoAutorNuevo;
        conexion.query(query,{
            Nombre,
            Apellido
        },(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/autores')
            }
        });
    });

    app.get('/libros/autores/borrar/:CodAutor',(req,res)=>{

        const CodAutor = req.params.CodAutor;
        conexion.query('DELETE FROM Autor WHERE CodAutor = ?',[CodAutor],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/autores')
            }
        });

    });

    app.get('/libros/autores/editar/:CodAutor',(req,res)=>{
        const CodAutor = req.params.CodAutor;
        conexion.query('SELECT * FROM Autor WHERE CodAutor = ?',[CodAutor],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.render('libros_autores_seleccionado.ejs',{
                    autor: result[0]
                });
            };
        });
    });
    
    app.post('/libros/autores/editar_seleccionado/:CodAutor',(req,res)=>{
        const CodAutor= req.params.CodAutor;
        const Nombre = req.body.nombreAutorNuevo;
        const Apellido = req.body.apellidoAutorNuevo;
        conexion.query('UPDATE Autor SET Nombre = ?, Apellido = ? WHERE CodAutor = ?',[Nombre, Apellido, CodAutor],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/libros/autores')
            }
        });
    });


    //******** */


    app.post('/libros/guardar',(req,res)=>{
        
       const Titulo = req.body.titulo;
       var CodAutor = req.body.CodAutor;
       const ISBN = req.body.isbn;
       var CodEditorial = req.body.CodEditorial;
       var AEscritura = req.body.aescritura;
       var CodLibro;

       //////****************Agrego autor nuevo********************/
        if(req.body.autorNuevo=='on'){
           const nombreAutorNuevo= req.body.nombreAutorNuevo;
           const apellidoAutorNuevo = req.body.apellidoAutorNuevo;
           conexion.query('INSERT INTO Autor SET ?',{
            Nombre: nombreAutorNuevo,
            Apellido: apellidoAutorNuevo
           },(err,result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log('Autor agregado con exito');
                }
                
           });
          
        };
        
        /****************************Agrego editorial nueva*****************************/
        if(req.body.editorialNueva=='on'){
            const nombreEditorialNueva = req.body.nombreEditorialNueva;
            conexion.query('INSERT INTO Editorial SET ?',{
                Editorial: nombreEditorialNueva
               },(err,result)=>{
                    if (err){
                        console.log(err);
                    }else{
                        console.log('Editorial agregada con exito');
                        console.log(result);
                    }
                    
               });
            conexion.query('INSERT INTO Libro SET Titulo = ?, ISBN = ?, CodEditorial = (SELECT CodEditorial FROM Editorial ORDER BY CodEditorial DESC LIMIT 1), AEscritura = ?',[Titulo,ISBN,AEscritura],(err,result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log('Libro insertado con exito');
                }
            });
            
        }else{
            conexion.query('INSERT INTO Libro SET?',{
                Titulo,
                ISBN,
                CodEditorial,
                AEscritura
            },(err,result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log('Libro insertado con exito');
                }
            });

        }
        
     
        
       //
        if (req.body.autorNuevo == 'on'){
            conexion.query('INSERT INTO Libroautor (CodLibro, CodAutor) select * from (SELECT CodLibro FROM Libro ORDER BY CodLibro DESC LIMIT 1) as x join (Select CodAutor FROM Autor Order by CodAutor Desc LIMIt 1) as y',(err,result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log('LibroAutor insertado con exito');
                   
                }
            });
        };
        if (req.body.autorNuevo != 'on'){
            conexion.query('INSERT INTO Libroautor SET CodLibro =(SELECT CodLibro FROM Libro ORDER BY CodLibro DESC LIMIT 1), ?',{
                CodAutor
            },(err,result)=>{
                if (err){
                    console.log(err);
                }else{
                    console.log('LibroAutor insertado con exito');
                   
                }
            });
        };
      
        res.redirect('/libros');
    });

 

  app.get('/libros/:ruta',(req,res)=>{
    const queryEditorial = 'Select * from Editorial';
    const queryAutor = 'Select * from Autor'
    const  ruta = req.params.ruta;
    const vista = 'libros_'+ruta+'.ejs';
    var editoriales;
    console.log(vista);
    conexion.query(queryEditorial,(err,result)=>{
        editoriales = result;
    });
    conexion.query(queryAutor,(err,result)=>{
        res.render(vista,{
            editoriales: editoriales,
            autores: result
        });
    });
   

    });

    function buscar(nombreParametro, parametro, subruta,res){
        var query = '';
        const vista = 'libros_'+subruta+'_cod.ejs';
        const queryEditorial = 'Select * from Editorial';
        const queryAutor = 'Select * from Autor'
        var editoriales;
        var autores;

        if (nombreParametro == 'Titulo'){
            query = "SELECT CodLibro, Titulo, ISBN, CodAutor, concat(Apellido,', ',Nombre) as Autor, AEscritura, CodEditorial, Editorial FROM LibroCompleto WHERE "+nombreParametro+" LIKE ?";
            parametro = parametro+'%';
        }else if(nombreParametro=='Todos'){
            query = "SELECT CodLibro, Titulo, ISBN, CodAutor, concat(Apellido,', ',Nombre) as Autor, AEscritura, CodEditorial, Editorial FROM LibroCompleto";

        }else {
            query = "SELECT CodLibro, Titulo, ISBN, CodAutor, concat(Apellido,', ',Nombre) as Autor, AEscritura, CodEditorial, Editorial FROM LibroCompleto WHERE "+nombreParametro+" = ?";
            
           
        }
        
      
        conexion.query(queryEditorial,(err,result)=>{
            editoriales = result;
        });
        conexion.query(queryAutor,(err,result)=>{
            autores = result;
        });
        conexion.query(query,[parametro],(err,result)=>{
            if (err){
                console.error('Error al editar regostro:',err);
                res.status(500).send('Error al editar el registro');
                console.log(err);
            }else{
                console.log('Registro encontrado');
                
                res.render(vista,{
                libros: result,
                editoriales: editoriales,
                autores: autores
                });
            }
            
        });
    };    

    app.post('/libros/:subruta/:nombreParametro',(req,res)=>{
        
        var nombreParametro = req.params.nombreParametro;
        var parametro = req.body.parametro;
        parametroDeBusqueda = nombreParametro;
        parametroABuscar = parametro;
        const subruta = req.params.subruta;
        
        buscar(nombreParametro,parametro,subruta,res);
       
    });

    
  app.get('/libros/borrar/:CodLibro/:CodAutor',(req,res)=>{
    const CodLibro= req.params.CodLibro;
    const CodAutor = req.params.CodAutor;
    const queryLibroAutor= 'DELETE FROM LibroAutor WHERE CodLibro = ? AND CodAutor = ?';
    const queryLibro = 'DELETE FROM Libro WHERE CodLibro = ?';
    conexion.query(queryLibroAutor,[CodLibro,CodAutor],(err,result)=>{
        if(err){
            console.error('Error al borrar el registro',err);
            res.status(500).send('Error al borrar',err)
           
        }else{
            console.log('LibroAutor borrado');
       
        }
       
    });
    conexion.query(queryLibro,[CodLibro],(err,result)=>{
        if(err){
            console.error('Error al borrar el registro',err);
            res.status(500).send('Error al borrar',err)
        }else{
            console.log('Libro borrado');
         
        }
       
    });
    buscar(parametroDeBusqueda,parametroABuscar,'alterar',res);
  });
    
  app.get('/libros/editar/:CodLibro',(req,res)=>{
       
    const CodLibro = req.params.CodLibro;
    var resultadoLibro;
    var editoriales;
    const query = 'select * from LibroCompleto where CodLibro =?';
    const queryEditoriales = 'Select * from Editorial';
    const queryAutores = 'Select * from Autor';
    conexion.query(query,[CodLibro],(err,result)=>{
        if (err){
            console.error('Error al editar regostro:',err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado con exito');
            resultadoLibro = result[0];
            
        }
    });

    conexion.query(queryEditoriales,(err,result)=>{
        if (err){
            console.error('Error al editar regostro:',err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado con exito');
            editoriales = result;
            
        }
    });
    conexion.query(queryAutores,(err,result)=>{
        if (err){
            console.error('Error al editar regostro:',err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado con exito');
            res.render('libros_alterar_seleccionado.ejs',{
                libro: resultadoLibro,
                editoriales: editoriales,
                autores: result

            });
            
        }
    });

   
});


app.post('/libros/alterar/seleccionado/:CodLibro/:CodAutor',(req,res)=>{
   
    const Titulo = req.body.titulo;
    var CodAutorNuevo = req.body.CodAutor;
    var CodAutorViejo = req.params.CodAutor;
    const ISBN = req.body.isbn;
    var CodEditorial = req.body.CodEditorial;
    var AEscritura = req.body.aescritura;
    var CodLibro = req.params.CodLibro;

    const queryLibroAutor= 'DELETE FROM LibroAutor WHERE CodLibro = ? AND CodAutor = ?';
    
    conexion.query(queryLibroAutor,[CodLibro,CodAutorViejo],(err,result)=>{
        if(err){
            console.error('Error al borrar el registro',err);
            res.status(500).send('Error al borrar',err)
           
        }else{
            console.log('LibroAutor borrado');
       
        }
       
    });

    conexion.query('INSERT INTO LibroAutor SET? ',{
        CodLibro,
        CodAutor: CodAutorNuevo
    },(err,result)=>{
        if (err){
            console.log(err);
        }else{
            console.log('LibroAutor insertado con exito');
           
        }
    });
  
    const query = 'UPDATE Libro SET Titulo = ?, ISBN = ?, CodEditorial = ?, AEscritura = ? WHERE CodLibro=?';
    conexion.query(query,[Titulo,ISBN,CodEditorial,AEscritura,CodLibro],(err,result)=>{
        if (err){
            console.error('Error al editar regostro:',err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado con exito');
           // res.redirect('/socios/modificar');
        }
    });
    buscar(parametroDeBusqueda,parametroABuscar,'alterar',res);
});



}