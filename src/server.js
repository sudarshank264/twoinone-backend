const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route files
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const pzActivityRoutes = require('./routes/pzActivityRoutes');
const pzAboutRoutes = require('./routes/pzAboutRoutes');
const pzServiceRoutes = require('./routes/pzServiceRoutes');
const pzGalleryRoutes = require('./routes/pzGalleryRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB(); // Connected to MongoDB

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);

// Play Zone Routes
app.use('/api/playzone/activities', pzActivityRoutes);
app.use('/api/playzone/about', pzAboutRoutes);
app.use('/api/playzone/services', pzServiceRoutes);
app.use('/api/playzone/gallery', pzGalleryRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
