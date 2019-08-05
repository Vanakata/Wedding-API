const authRoutes = require('../routes/auth');
const weddingRoutes = require('../routes/all-weddings');

function initializeRoutes(app) {
    app.use('/auth', authRoutes);
    app.use('/weddings', weddingRoutes)
}

module.exports = initializeRoutes;