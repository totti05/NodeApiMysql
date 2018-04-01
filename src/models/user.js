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

	module.exports = userModel;