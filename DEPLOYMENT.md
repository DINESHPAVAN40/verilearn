# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Firebase project

## Step 1: Prepare Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password)
4. Create Firestore Database (Start in test mode)
5. Copy your Firebase config credentials

## Step 2: Deploy to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Complete VeriLearn platform"
git push origin feature/complete-workspace
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Set environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

6. Click "Deploy"

## Step 3: Configure Firestore Security Rules

In Firebase Console, go to Firestore Database → Rules and update:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Step 4: Post-Deployment

1. Test all features:
   - Sign up and sign in
   - Create a new project
   - Save code
   - Access guides

2. Monitor analytics in Vercel Dashboard

3. Share your app URL with users

## Troubleshooting

### Firebase Connection Issues
- Verify all environment variables are correct
- Check Firebase security rules
- Ensure database is in test mode or rules are properly configured

### Build Errors
- Clear `.next` folder and rebuild
- Check Node version (18+ required)
- Verify all dependencies are installed

### Performance Issues
- Enable Vercel analytics
- Optimize images
- Use CDN for assets

## Support

For issues:
- Check Vercel deployment logs
- Review Firebase error messages
- Visit GitHub Issues
