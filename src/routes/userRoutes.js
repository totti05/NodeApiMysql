const User = require('../models/user');

module.exports = function (app) {
	
	app.get('/user', (req, res)=> {
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
			nombre: req.body.nombre,
			email: req.body.email,
			creacion: null,
			actualizacion: null
		}

		User.insertUser(datosUsuario, (error, datos) => {

			if(datos)
			{
				res.status(200).json({
					succes: true,
					msg: 'usuario insertado',
					datos: datos
				})
			}else
			{
				res.status(500).json({
					succes: false,
					msg: 'error datos interno del servidor'

				})

			}
		})
	});


	app.put('/user/:username', (req, res) => {
			/*optional stuff to do after success */
			const datoUsuario =
			{
				username: req.params.username,
				password: req.body.password,
				nombre: req.body.nombre,
				email: req.body.email,
				creacion: null,
				actualizacion: null
			};

		User.updateUser(datoUsuario, (error, datos)=>{

			if(datos)
			{
				res.status(200).json({datos});
			}else
			{
				res.status(500).json({
					succes: false,
					msg: 'error datos interno del servidor'

				});

			}

		});
});

	app.delete('/user/:id', (req,res)=>{
		User.deleteUser(req.params.id, (error, datos)=>{
			if(datos && datos.msg ==='borrado' || datos.msg === 'no existe')
			{
				res.status(200).json({
					success: true,
					datos: datos

				})
			}else
			{
				res.status(500).json({
					msgs:'error'

				})
			}
		});

	});
}