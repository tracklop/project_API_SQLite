// NOTE - Teapot
const Teapot = (req, res) => {
	return res.status(418).send({
		error: "I'm a teapot",
		message:
			"Sorry, I can't brew coffee. I'm a teapot, not a coffee machine. Perhaps, I can offer you a nice cup of tea instead?",
	});
};

// NOTE - Exporting the functions
module.exports = {
	Teapot,
};
