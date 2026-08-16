'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import { validateVerilog, saveFile } from '@/lib/utils';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { FiSave, FiPlay, FiDownload, FiAlertCircle, FiCheck } from 'react-icons/fi';

interface CodeEditorProps {
  project: {
    id: string;
    name: string;
    code: string;
  };
  onUpdate: () => void;
}

export default function CodeEditor({ project, onUpdate }: CodeEditorProps) {
  const editorRef = useRef(null);
  const [code, setCode] = useState(project.code);
  const [validationResult, setValidationResult] = useState({ valid: true, errors: [] });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    setSaved(false);
  };

  const handleValidate = () => {
    const result = validateVerilog(code);
    setValidationResult(result);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'projects', project.id), {
        code: code,
        updatedAt: new Date(),
      });
      setSaved(true);
      onUpdate();
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    saveFile(`${project.name}.v`, code);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Verilog HDL Code Editor</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleValidate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <FiPlay /> Validate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg transition disabled:opacity-50"
          >
            <FiSave /> {saving ? 'Saving...' : 'Save'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            <FiDownload /> Download
          </motion.button>
          {saved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-500"
            >
              <FiCheck /> Saved
            </motion.div>
          )}
        </div>
      </div>

      {/* Validation Results */}
      {validationResult && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className={`px-6 py-4 border-b ${validationResult.valid ? 'bg-green-50 dark:bg-green-900 border-green-200' : 'bg-red-50 dark:bg-red-900 border-red-200'}`}
        >
          <div className="flex items-start gap-3">
            {validationResult.valid ? (
              <FiCheck className="text-green-500 mt-1" />
            ) : (
              <FiAlertCircle className="text-red-500 mt-1" />
            )}
            <div>
              <p className={validationResult.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                {validationResult.valid ? 'Code is valid!' : 'Validation errors:'}
              </p>
              {validationResult.errors.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index} className={validationResult.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      • {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Editor */}
      <div className="flex-1">
        <Editor
          defaultLanguage="verilog"
          defaultValue={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            fontFamily: "'Fira Code', 'Monaco', monospace",
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
