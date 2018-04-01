const User = require('../models/user');

module.exports = function (app) {
	
	app.get('/', (req, res)=> {
			User.getUsers((error,data) => {

				res.status(200).json(data);
				
		});
})


	app.post('/user', (req, res) => {
		/*optional stuff to do after success */
		const datosUsuario =
		{
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			creacion: null,
			actualizacion: null
		}

		User.insertUser(datosUsuario, (error, datos) => {

			if(datos)
			{
				res.json(200, {
					succes: true,
					msg: 'usuario insertado',
					datos: datos



				})
			}
		})
	});



};
