const clientModel = require('../models/client');

exports.getAll = async (req, res) => {
    try {
        const data = await clientModel.getClients();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await clientModel.getClientById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const data = await clientModel.createClient(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await clientModel.updateClient(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const message = await clientModel.deleteClient(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
