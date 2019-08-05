const authRoutes = require('../routes/auth');

function initializeRoutes(app) {
    app.use('/auth', authRoutes);
    // app.use('/user/upload',)
}

module.exports = initializeRoutes;