const User = require('../models/user');

module.exports = function (app) {
	
	app.get('/', (req, res)=> {
			User.getUsers((error,data) => {

				res.status(200).json(data);
				
		});
})
};
