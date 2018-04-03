const User = require('../models/user');

module.exports = function (app) {
	
	app.get('/', (req,res)=>{
		
		res.render('usuario/login')


	})
	app.get('/user', (req, res)=> {
			User.getUsers((error,data) => {
				if (data)
				{	

					res.status(200).json(data);
				}else
				{
					res.status(500).json({
						succes: false,
						msg:'error interno del servidor'

					})
				}
				
				
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
			//validar primero si existe el dato en la tabla y luego mandar
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