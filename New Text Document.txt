var express = require('express');
const PORT = process.env.PORT || 3000 ;

var app = express();

app.use( (req , res, next) => {
	if(req.headers['x-forwarded-proto'] === 'http') {
		next();
	}
	else {
		res.redirect(`http://${req.hostname}${req.url}`);
	}
});


app.use(express.static('public'));

app.listen(PORT , () => {
	console.log(`express app is up on port ${PORT}`);
});