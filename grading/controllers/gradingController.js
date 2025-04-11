const { updateReview } = require('../models/grading');

const calificar = async (req, res) => {
  try {
    const { chambaId } = req.params;
    const { score, review, reviewerRole } = req.body;

    if (!score || !review || !reviewerRole) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    if (!['cliente', 'chambeador'].includes(reviewerRole)) {
      return res.status(400).json({ message: 'Rol inválido' });
    }

    const updated = await updateReview(chambaId, { score, review }, reviewerRole);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al calificar', error: err.message });
  }
};

module.exports = {
  calificar
};

