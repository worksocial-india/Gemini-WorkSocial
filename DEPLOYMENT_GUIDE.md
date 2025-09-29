# Firebase Deployment Guide for WorkSocial India

## Prerequisites
1. Make sure you have Firebase CLI installed globally:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

## Deployment Steps

### Local Testing
1. Run development server:
   ```
   npm run dev
   ```
   Your app will be available at http://localhost:5174

### Production Deployment
1. Build the project:
   ```
   npm run build
   ```

2. Test the build locally (optional):
   ```
   firebase serve
   ```

3. Deploy to Firebase:
   ```
   firebase deploy
   ```

4. Your live website will be available at:
   ```
   https://worksocial-portal.web.app
   ```

## Project Configuration
- Firebase Project ID: worksocial-portal
- Build Folder: dist (for Vite projects)
- Single Page App: Yes (React Router enabled)

## Troubleshooting
- If you get permission errors, make sure you're logged in: `firebase login`
- If build folder is not found, run `npm run build` first
- For any routing issues, the firebase.json is configured to handle SPA routing

## Environment Variables (if needed)
Create a .env file in your root directory with:
```
VITE_FIREBASE_API_KEY=AIzaSyBGU2qlwJsc8T4e1zoSnZ42NLUYreIlrLA
VITE_FIREBASE_AUTH_DOMAIN=worksocial-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=worksocial-portal
```