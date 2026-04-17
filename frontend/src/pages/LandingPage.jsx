import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Play, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('student');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-dark-950 px-4">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
            QuizIQ
          </h1>
          <p className="text-gray-400 text-lg">Next-gen real-time assessment platform.</p>
        </div>

        <div className="glass rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="flex space-x-2 mb-8 bg-dark-800/50 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'student' ? 'bg-primary-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Student
            </button>
            <button 
              onClick={() => setActiveTab('teacher')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'teacher' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Teacher
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate(`/${activeTab}/dashboard`); }}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email / Username</label>
              <input type="text" className="w-full bg-dark-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-gray-500" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input type="password" className="w-full bg-dark-800/80 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-gray-500" placeholder="••••••••" />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-dark-800 border-gray-700 text-primary-500 focus:ring-primary-500" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-primary-400 hover:text-primary-300 transition-colors">Forgot Password?</button>
            </div>

            <button type="submit" className={`w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] ${activeTab === 'student' ? 'bg-primary-600 hover:bg-primary-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
              <LogIn className="w-5 h-5" />
              <span>Login as {activeTab === 'student' ? 'Student' : 'Teacher'}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <button 
              onClick={() => setShowJoinModal(true)}
              className="w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 bg-dark-800 hover:bg-dark-700 text-white transition-all border border-gray-700 hover:border-gray-600"
            >
              <Play className="w-5 h-5 text-green-400" />
              <span>Join Quiz (Guest Mode)</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Guest Join Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass max-w-sm w-full p-6 rounded-2xl relative"
            >
              <button 
                onClick={() => setShowJoinModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Key className="w-6 h-6 mr-2 text-primary-400" />
                Join Quiz
              </h3>
              <input 
                type="text" 
                className="w-full bg-dark-800/80 border border-gray-700 rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase mb-4" 
                placeholder="000000" 
                maxLength={6}
              />
              <button 
                onClick={() => navigate('/live-quiz/GUEST')}
                className="w-full py-3 rounded-xl font-bold bg-primary-600 hover:bg-primary-500 text-white transition-all"
              >
                Join Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
