const sessionModel = require('../models/session');

exports.getAll = async (req, res) => {
    try {
        const sessions = await sessionModel.getSessions();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const session = await sessionModel.getSessionById(req.params.id);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const session = await sessionModel.createSession(userId, role);
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const session = await sessionModel.updateSessionUsage(req.params.id);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const message = await sessionModel.deleteSession(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
