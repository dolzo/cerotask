// Middleware para comprobar rol de admin
const checkAdminRole = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole != 'role_admin') {
        return res.status(403).send({
            status: 'error',
            message: 'Acceso no autorizado',
        });
    }
    next();
};

module.exports = checkAdminRole;
