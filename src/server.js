const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// async function generateHash() {
//     const password = "admin123";
//     const hashed = await bcrypt.hash(password, 10);
//     console.log(hashed);
// }

// generateHash();

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const leadRoutes = require('./routes/leadRoutes');
const statsRoutes = require('./routes/statsRoutes');
const pzActivityRoutes = require('./routes/pzActivityRoutes');
const pzAboutRoutes = require('./routes/pzAboutRoutes');
const pzServiceRoutes = require('./routes/pzServiceRoutes');
const pzGalleryRoutes = require('./routes/pzGalleryRoutes');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());

// 🔥 REMOVE THIS (WRONG PLACE)
// const password = "admin123";
// const hashed = await bcrypt.hash(password, 10);
// console.log(hashed);

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/stats', statsRoutes);

// Play Zone
app.use('/api/playzone/activities', pzActivityRoutes);
app.use('/api/playzone/about', pzAboutRoutes);
app.use('/api/playzone/services', pzServiceRoutes);
app.use('/api/playzone/gallery', pzGalleryRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});