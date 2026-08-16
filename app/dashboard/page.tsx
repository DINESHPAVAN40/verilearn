'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiLogOut, FiCode, FiBook, FiSettings } from 'react-icons/fi';
import { signOut } from 'firebase/auth';

interface Project {
  id: string;
  name: string;
  createdAt: Date;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    loadProjects();
  }, [user, router]);

  const loadProjects = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'projects'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const loadedProjects: Project[] = [];
      querySnapshot.forEach((doc) => {
        loadedProjects.push({
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt?.toDate(),
        });
      });
      setProjects(loadedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2">Welcome, {user?.displayName}!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Continue learning Verilog</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/workspace">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-lg shadow-lg cursor-pointer"
            >
              <FiCode className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Code Editor</h3>
              <p>Write and test your Verilog code</p>
            </motion.div>
          </Link>
          <Link href="/guides">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-secondary to-accent text-white p-8 rounded-lg shadow-lg cursor-pointer"
            >
              <FiBook className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Guides</h3>
              <p>Learn Verilog with comprehensive guides</p>
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-accent to-pink-500 text-white p-8 rounded-lg shadow-lg cursor-pointer"
          >
            <FiSettings className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Settings</h3>
            <p>Manage your account preferences</p>
          </motion.div>
        </div>

        {/* Recent Projects */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Recent Projects</h2>
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href="/workspace">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.createdAt?.toLocaleDateString()}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No projects yet</p>
              <Link href="/workspace">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Create Your First Project
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
