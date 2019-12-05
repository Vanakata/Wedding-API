const authRoutes = require('../routes/auth');
const weddingRoutes = require('../routes/all-weddings');
const uploadRouter = require('../routes/upload');
const guestListRouter = require('../routes/guests');
const userWedding = require('../routes/user-wedding');

function initializeRoutes(app) {
    app.use('/auth', authRoutes);
    app.use('/weddings', weddingRoutes);
    app.use('/upload', uploadRouter);
    app.use('/guest-list', guestListRouter);
    app.use('/user', userWedding);
}

module.exports = initializeRoutes;