const { createChamba } = require('../models/chamba');

const crearChamba = async (req, res) => {
  try {
    const data = req.body;

    if (!data.clientId || !data.chambeadorId || !data.servicio || !data.descripcion || !data.costAgreed) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const nuevaChamba = await createChamba(data);
    res.status(201).json(nuevaChamba);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear chamba', error: err.message });
  }
};

module.exports = {
  crearChamba
};
