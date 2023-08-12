const dbConnection = require('../../config/dbConnection');

module.exports = app=>{
    const conexion = dbConnection();

    
    app.get('/',(req,res)=>{
        
            res.render('index.ejs');
        
    });
    
    app.get('/socios',(req,res)=>{
        
        const query = "SELECT * FROM Provincia"
        
        conexion.query(query,(err,result)=>{
          
            res.render('socios.ejs',{
                provincias: result
            });
        });
      
    
    });

    app.get('/libros',(req,res)=>{
        const queryEditorial = 'Select * from Editorial';
        const queryAutor = 'Select * from Autor'
        var editoriales;
        conexion.query(queryEditorial,(err,result)=>{
            editoriales = result;
        });
        conexion.query(queryAutor,(err,result)=>{
            res.render('libros.ejs',{
                editoriales: editoriales,
                autores: result
            });
        });
       
    
    });

    app.get('/prestamos',(req,res)=>{

        conexion.query('SELECT Titulo, CodLibro, count(Titulo) as Total,  SUM(Prestado) as Prestados from Ejemplar natural join Libro group by Titulo, CodLibro',(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.render('prestamos.ejs',{
                    ejemplares: result
                });
            };
        });
        
       
    });

    

}