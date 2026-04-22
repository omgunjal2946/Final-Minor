import { getQuizzes } from "../services/api";
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, Clock, TrendingUp, Trophy } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-dark-950 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center bg-dark-900/50 p-6 border border-white/5 rounded-2xl shadow-lg backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, Student!</h1>
            <p className="text-gray-400 mt-1">Ready to increase your QuizIQ?</p>
          </div>
          <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center">
            <Zap className="w-5 h-5 mr-2" /> Play Now
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Target />} label="Average Accuracy" value="86%" color="text-green-400" />
          <StatCard icon={<TrendingUp />} label="Global Rank" value="#4,092" color="text-yellow-400" />
          <StatCard icon={<Zap />} label="Speed Score" value="94/100" color="text-blue-400" />
          <StatCard icon={<Trophy />} label="Quizzes Passed" value="38" color="text-purple-400" />
        </div>

        {/* Current Activity & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Quizzes */}
          <div className="lg:col-span-2 glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center"><Activity className="w-6 h-6 mr-2 text-primary-400" /> Recent Progress</h2>
            <div className="space-y-4">
              <QuizRow title="Advanced Mathematics" score="90%" time="12m 40s" date="2 hours ago" />
              <QuizRow title="Data Structures MCQ" score="75%" time="18m 10s" date="1 day ago" />
              <QuizRow title="Logical Reasoning" score="100%" time="9m 20s" date="3 days ago" />
            </div>
          </div>
          
          {/* Join Live Quiz widget */}
          <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-primary-500 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-2">Join Live Quiz</h3>
            <p className="text-gray-400 text-sm mb-6">Enter code provided by teacher</p>
            <input type="text" placeholder="000-000" className="w-full bg-dark-800 border border-gray-700 text-center tracking-widest text-xl py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4" />
            <button className="w-full bg-white text-dark-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Join Server
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass p-6 rounded-2xl border-t border-white/10 relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-current opacity-10 rounded-full ${color}`} />
      <div className={`mb-4 ${color}`}>
        {React.cloneElement(icon, { className: 'w-8 h-8' })}
      </div>
      <h4 className="text-gray-400 text-sm font-medium">{label}</h4>
      <p className="text-3xl font-bold mt-1 text-white">{value}</p>
    </motion.div>
  );
}

function QuizRow({ title, score, time, date }) {
  return (
    <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl hover:bg-dark-800 transition-colors">
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-400 mt-1">{date} • Completed in {time}</p>
      </div>
      <div className="text-right">
        <span className="text-primary-400 font-extrabold text-lg">{score}</span>
      </div>
    </div>
  );
}
