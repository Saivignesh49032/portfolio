# Portfolio Backend with MongoDB

This is a complete backend implementation for a portfolio website's admin panel using Node.js, Express, and MongoDB.

## 🚀 Features

- **MongoDB Integration**: Full CRUD operations with Mongoose ODM
- **Project Management**: Complete API for managing portfolio projects
- **Admin Authentication**: PIN-based authentication system
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling and validation
- **API Documentation**: Well-documented REST API endpoints

## 📁 Project Structure

```
portfolio/
├── models/
│   └── Project.js          # Mongoose schema for projects
├── routes/
│   ├── projectRoutes.js    # CRUD API routes for projects
│   └── authRoutes.js       # Authentication routes
├── server-mongodb.js       # Main server file with MongoDB
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── MONGODB_SETUP.md        # This file
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Database Configuration
DB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Admin Authentication
ADMIN_PIN=260104

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Update the `DB_CONNECTION_STRING` in your `.env` file

### 4. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### Authentication

#### POST /api/auth/login
Authenticate admin with PIN.

**Request:**
```json
{
  "pin": "260104"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "authenticated": true,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/verify
Verify PIN without logging in.

#### GET /api/auth/status
Check authentication service status.

### Projects

#### POST /api/projects
Create a new project.

**Request:**
```json
{
  "title": "My Awesome Project",
  "description": "A description of the project",
  "imageUrl": "https://example.com/image.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://example.com",
  "githubLink": "https://github.com/user/repo",
  "featured": true
}
```

#### GET /api/projects
Get all projects.

**Query Parameters:**
- `featured=true` - Get only featured projects
- `limit=10` - Limit number of results
- `sort=title` - Sort by title
- `sort=oldest` - Sort by creation date (oldest first)

#### GET /api/projects/:id
Get a single project by ID.

#### PUT /api/projects/:id
Update a project by ID.

#### DELETE /api/projects/:id
Delete a project by ID.

## 🔧 Project Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 500 chars),
  imageUrl: String (optional, must be valid URL),
  technologies: [String] (optional, max 10 items),
  liveLink: String (optional, must be valid URL),
  githubLink: String (optional, must be valid URL),
  featured: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## 🚀 Deployment

### Vercel Deployment

1. Update `vercel.json` to use `server-mongodb.js`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server-mongodb.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server-mongodb.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server-mongodb.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. Set environment variables in Vercel dashboard:
   - `DB_CONNECTION_STRING`
   - `ADMIN_PIN`

3. Deploy:
```bash
vercel --prod
```

## 🔒 Security Notes

- Change the default `ADMIN_PIN` in production
- Use strong MongoDB passwords
- Implement rate limiting for production
- Add JWT tokens for better authentication
- Validate all input data
- Use HTTPS in production

## 🐛 Error Handling

All API endpoints include comprehensive error handling:

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid PIN)
- **404**: Not Found (project not found)
- **500**: Internal Server Error

## 📝 Example Usage

### Create a Project
```bash
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-commerce Website",
    "description": "A full-stack e-commerce solution",
    "technologies": ["React", "Node.js", "MongoDB"],
    "liveLink": "https://myecommerce.com",
    "githubLink": "https://github.com/user/ecommerce",
    "featured": true
  }'
```

### Get All Projects
```bash
curl http://localhost:3001/api/projects
```

### Authenticate Admin
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"pin": "260104"}'
```

## 🎯 Next Steps

1. Set up MongoDB Atlas cluster
2. Update environment variables
3. Test all API endpoints
4. Deploy to Vercel
5. Integrate with frontend admin panel
6. Add more security features
7. Implement logging and monitoring
