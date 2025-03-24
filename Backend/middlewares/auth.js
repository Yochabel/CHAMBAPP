const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, 'secretkey');
        req.user = verified;

        // Verificar si la sesión ha expirado
        const session = await pool.query('SELECT * FROM Sessions WHERE User_ID = $1', [req.user.id]);

        if (!session.rows.length) {
            return res.status(403).json({ error: 'Sesión no válida' });
        }

        const sessionData = session.rows[0];
        if (new Date(sessionData.dateexpires) < new Date()) {
            return res.status(403).json({ error: 'Sesión expirada' });
        }

        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};
