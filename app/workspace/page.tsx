'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiPlay, FiDownload } from 'react-icons/fi';
import CodeEditor from '@/components/editor/CodeEditor';

interface Project {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
}

export default function WorkspacePage() {
  const router = useRouter();
  const { user } = useStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
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
          code: doc.data().code,
          createdAt: doc.data().createdAt?.toDate(),
        });
      });
      setProjects(loadedProjects);
      if (loadedProjects.length > 0) {
        setSelectedProject(loadedProjects[0]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!user || !newProjectName.trim()) return;

    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        userId: user.uid,
        name: newProjectName,
        code: 'module my_module(\n  input clk,\n  input reset,\n  output reg out\n);\n  // Your code here\nendmodule',
        createdAt: new Date(),
      });

      const newProject: Project = {
        id: docRef.id,
        name: newProjectName,
        code: 'module my_module(\n  input clk,\n  input reset,\n  output reg out\n);\n  // Your code here\nendmodule',
        createdAt: new Date(),
      };

      setProjects([...projects, newProject]);
      setSelectedProject(newProject);
      setNewProjectName('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter((p) => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(projects[0] || null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark flex">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>

          {/* Create New Project */}
          <div className="mb-6">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={createProject}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <FiPlus /> New Project
            </motion.button>
          </div>

          {/* Projects List */}
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  selectedProject?.id === project.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 text-left font-semibold"
                  >
                    {project.name}
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 hover:bg-red-500 hover:text-white rounded transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {selectedProject ? (
          <CodeEditor project={selectedProject} onUpdate={() => loadProjects()} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Projects Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first project to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
