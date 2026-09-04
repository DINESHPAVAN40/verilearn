# VeriLearn - Modern Verilog Learning Platform

A comprehensive, user-friendly platform for learning Verilog HDL with interactive workspace, guides, and real-time compilation.

## ✨ Features

- 🔐 **User Authentication** - Secure login with Firebase
- 💻 **Interactive Workspace** - Code editor with Monaco Editor
- 🧪 **Live Compilation** - Real-time Verilog simulation
- 📚 **Learning Guides** - Complete tutorials and examples
- 💾 **Project Management** - Save and resume work
- 🎨 **Modern UI** - Clean, responsive design
- 🚀 **Cloud Ready** - Deploy to Vercel instantly
- ⚡ **Fast Performance** - Next.js optimization

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 14 + React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth |
| **Editor** | Monaco Editor |
| **State** | Zustand |
| **Deployment** | Vercel |

## 📋 Project Structure

```
verilearn/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── dashboard/              # User dashboard
│   ├── workspace/              # Code editor
│   ├── guides/                 # Learning guides
│   └── api/                    # API routes
├── components/
│   ├── auth/                   # Auth components
│   ├── editor/                 # Editor component
│   ├── navbar/                 # Navigation
│   └── ui/                     # UI components
├── lib/
│   ├── firebase.ts             # Firebase config
│   ├── store.ts                # Zustand store
│   └── utils.ts                # Utilities
└── public/                     # Static files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (free tier)

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/DINESHPAVAN40/verilearn.git
cd verilearn
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Firebase**
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
# Get credentials from: Firebase Console → Project Settings → General
```

Environment variables needed:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📚 Firebase Setup Guide

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "verilearn"
4. Skip analytics (optional)

### 2. Enable Authentication
```
Firebase Console → Authentication → Get started
→ Email/Password → Enable
```

### 3. Create Firestore Database
```
Firebase Console → Firestore Database → Create database
→ Start in test mode
→ Choose region close to you
```

### 4. Setup Security Rules
```
Firestore → Rules → Update with:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /projects/{projectId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 5. Get Credentials
```
Project Settings → General → Web app config
Copy all values to .env.local
```

## 🎯 Usage Guide

### Create Account
1. Click "Sign Up"
2. Enter email and password
3. Verify email
4. Start learning!

### Use Workspace
1. Dashboard → Workspace
2. Select or create project
3. Write Verilog code (design + testbench)
4. Click "Simulate" to run
5. Save project

### Learn from Guides
1. Navigate to "Guides"
2. Choose topic (Logic Gates, Flip-Flops, FSM, Testbenches)
3. Read explanation
4. Try examples

## 🌐 Deployment to Vercel

### Deploy in 5 Minutes

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin feature/complete-workspace
```

2. **Merge PR**
- Open PR on GitHub
- Click "Merge pull request"

3. **Deploy on Vercel**
- Go to [Vercel](https://vercel.com)
- Click "New Project"
- Select your GitHub repo
- Add environment variables (from .env.local)
- Click "Deploy"

✅ Your app is live!

For detailed deployment steps, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 📖 Learning Path

### Beginner (Week 1)
- Day 1-2: Logic Gates (AND, OR, NOT, XOR)
- Day 3-4: Combinational Logic
- Day 5: Mini project

### Intermediate (Week 2)
- Day 1-2: Flip-Flops & Latches
- Day 3-4: Sequential Logic
- Day 5: Counter project

### Advanced (Week 3)
- Day 1-2: State Machines (FSM)
- Day 3-4: Complex Design
- Day 5: Capstone project

## 💡 Example: AND Gate

**Design:**
```verilog
module and_gate(input a, input b, output y);
  assign y = a & b;
endmodule
```

**Testbench:**
```verilog
`timescale 1ns / 1ps

module testbench;
  reg a, b;
  wire y;
  
  and_gate uut(.a(a), .b(b), .y(y));
  
  initial begin
    $monitor("a=%b b=%b y=%b", a, b, y);
    a=0; b=0; #10;
    a=0; b=1; #10;
    a=1; b=0; #10;
    a=1; b=1; #10;
    $finish;
  end
endmodule
```

## 🔐 Security

**Implemented:**
- ✅ Firebase authentication
- ✅ Firestore security rules
- ✅ User data isolation
- ✅ HTTPS/SSL on Vercel

**Best Practices:**
- Never commit `.env.local`
- Use environment variables for secrets
- Review Firestore rules regularly
- Enable 2FA on Firebase account

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Firebase connection fails | Check `.env.local` credentials |
| Port 3000 in use | Use `npm run dev -- -p 3001` |
| Build errors | Run `npm install` and `npm run build` |
| Cannot save projects | Check Firestore rules and quotas |

## 📝 Environment Variables

Create `.env.local`:
```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - See LICENSE file

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/DINESHPAVAN40/verilearn/issues)
- **Email**: support@verilearn.dev
- **Docs**: Check `/guides` in app

## 🎓 Learning Outcomes

After completing VeriLearn, you'll be able to:
- Write Verilog HDL code
- Design digital circuits
- Create and debug testbenches
- Implement state machines
- Simulate hardware designs
- Understand digital logic

---

**Happy Learning!** 🚀 Start mastering Verilog today!
