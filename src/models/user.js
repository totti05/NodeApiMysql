// este archivo conectara a la BD 
const mysql = require('mysql');

connection = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'laboratorio'
});

let userModel = {};

	userModel.getUsers = (callback) =>{

		if (connection) {

			connection.query('SELECT * FROM usuario ORDER BY username', (error,rows) => {
				if (error){
					throw error;
				}else {
					callback(null, rows);
				}
			})
		}
	};

 	userModel.insertUser = (datoUsuario, callback) => 
 	{
 		if(connection)
 		{
 			connection.query('INSERT INTO usuario SET ?', datoUsuario, (error, result)=> 
 			{

 				if (error)
 				{
 					throw error;
 				}else
 				{
 					callback(null, result)
 				}
 			}

 				)
 		}

 	};

 	userModel.updateUser = (datoUsuario,callback) => {

	 		if(connection)
	 		{
	 			const sql =  `
	 			UPDATE usuario SET 
	 			username = ${connection.escape(datoUsuario.username)},
	 			password = ${connection.escape(datoUsuario.password)},
	 			nombre = ${connection.escape(datoUsuario.nombre)},
	 			email = ${connection.escape(datoUsuario.email)},
	 			creacion = ${connection.escape(datoUsuario.creacion)},
	 			actualizacion = ${connection.escape(datoUsuario.actualizacion)}
	 			WHERE username 	= ${connection.escape(datoUsuario.username)}
	 			`;
	 			console.log(sql);
	 		connection.query(sql,(error, result) => {
	 			if(error)
	 			{
	 				console.log('2 '+sql);
	 				throw error;

	 			}else
	 			{
	 				callback(null, {
	 					"msg": "succes"

	 				})
	 			}
	 		});
	 	}
	 };
	module.exports = userModel;