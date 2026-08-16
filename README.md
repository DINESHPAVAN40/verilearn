# VeriLearn - Modern Verilog Learning Platform

A comprehensive, user-friendly platform for learning Verilog HDL with interactive workspace, guides, and authentication.

## Features

✨ **Modern UI/UX** - Clean, intuitive interface with dark mode support
📚 **Comprehensive Guides** - Complete Verilog documentation and tutorials
💻 **Interactive Workspace** - Code editor with real-time feedback
🔐 **User Authentication** - Secure login and registration with Firebase
💾 **Save & Resume** - Save your work and resume later
🚀 **Cloud Deployment** - Ready for Vercel deployment
📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database & Auth**: Firebase
- **Editor**: Monaco Editor
- **Deployment**: Vercel
- **State Management**: Zustand

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project

### Installation

1. Clone the repository
```bash
git clone https://github.com/DINESHPAVAN40/verilearn.git
cd verilearn
```

2. Install dependencies
```bash
npm install
```

3. Setup Firebase
- Create a Firebase project
- Copy credentials to `.env.local`

```bash
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
```

4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment

### Deploy to Vercel

1. Push to GitHub
```bash
git push origin feature/complete-workspace
```

2. Import project in Vercel
- Go to [Vercel](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Add environment variables from `.env.example`
- Deploy!

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── dashboard/          # User dashboard
│   ├── workspace/          # Code editor workspace
│   ├── guides/             # Learning guides
│   └── api/                # API routes
├── components/
│   ├── auth/               # Authentication components
│   ├── editor/             # Code editor component
│   ├── navbar/             # Navigation bar
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   ├── store.ts            # Zustand store
│   └── utils.ts            # Utilities
└── public/                 # Static assets
```

## Usage

### Create an Account
1. Click "Sign Up" on homepage
2. Enter email and password
3. Verify email
4. Start learning!

### Use Workspace
1. Go to Dashboard → Workspace
2. Write Verilog code
3. Save your project
4. Test your code

### Learn from Guides
1. Navigate to "Guides" section
2. Choose a topic
3. Read detailed explanations
4. Practice with examples

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an [Issue](https://github.com/DINESHPAVAN40/verilearn/issues)
- Email: support@verilearn.dev

## Live Demo

🌐 [Visit VeriLearn](https://verilearn-nine.vercel.app)
