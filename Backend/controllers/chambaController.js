const chambaModel = require('../models/chamba');

exports.getAll = async (req, res) => {
    try {
        const data = await chambaModel.getChambas();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await chambaModel.getChambaById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await chambaModel.createChamba(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await chambaModel.updateChamba(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const message = await chambaModel.deleteChamba(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
