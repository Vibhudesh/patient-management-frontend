# Patient Management App - Render Deployment Guide

## Prerequisites
- Render account
- Git repository with your code

## Step 1: Deploy Backend Service

1. **Create a new Web Service on Render**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Set the following:
     - **Name**: `patient-management-backend`
     - **Root Directory**: `patient-management/patient-service`
     - **Runtime**: `Java`
     - **Build Command**: `mvn clean package -DskipTests`
     - **Start Command**: `java -jar target/patient-service-0.0.1-SNAPSHOT.jar`

2. **Add Environment Variables**
   - `DB_URL`: Will be set automatically when you create the database
   - `DB_USER`: Will be set automatically
   - `DB_PASSWORD`: Will be set automatically
   - `PORT`: Leave empty (Render sets this automatically)
   - `ALLOWED_ORIGINS`: `https://your-frontend-service-name.onrender.com`

3. **Create PostgreSQL Database**
   - Go to "New +" → "PostgreSQL"
   - Name: `patient-management-db`
   - Link it to your backend service

## Step 2: Deploy Frontend Service

1. **Create a new Static Site on Render**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your Git repository
   - Set the following:
     - **Name**: `patient-management-frontend`
     - **Root Directory**: `pattient-management-frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

2. **Add Environment Variables**
   - `VITE_API_URL`: `https://your-backend-service-name.onrender.com`

## Step 3: Update URLs

After deployment, update the following files with your actual service URLs:

1. **Backend** (`application.properties`):
   ```
   ALLOWED_ORIGINS=https://your-frontend-service-name.onrender.com
   ```

2. **Frontend** (Environment Variable):
   ```
   VITE_API_URL=https://your-backend-service-name.onrender.com
   ```

## Step 4: Test the Application

1. Visit your frontend URL
2. Use the demo credentials:
   - Email: `admin@example.com`
   - Password: `password`

## Troubleshooting

- **Build Failures**: Check the build logs in Render dashboard
- **Database Connection**: Ensure the database is properly linked to your backend service
- **CORS Issues**: Verify the `ALLOWED_ORIGINS` environment variable is set correctly
- **API Calls**: Check that `VITE_API_URL` points to your backend service URL

## Environment Variables Reference

### Backend
- `DB_URL`: PostgreSQL connection string
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `PORT`: Server port (set by Render)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs

### Frontend
- `VITE_API_URL`: Backend service URL 