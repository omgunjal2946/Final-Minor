import React, { useState } from 'react';
import { PlusCircle, Users, BarChart2, Settings, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('quizzes');

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-white/5 flex flex-col p-6">
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-10">Teacher Panel</h2>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<PlayCircle />} label="My Quizzes" active={activeTab === 'quizzes'} onClick={() => setActiveTab('quizzes')} />
          <NavItem icon={<Users />} label="Students" active={activeTab === 'students'} onClick={() => setActiveTab('students')} />
          <NavItem icon={<BarChart2 />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold flex items-center shadow-lg shadow-blue-600/20 transition-all">
            <PlusCircle className="w-5 h-5 mr-2" /> Create Quiz
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <OverviewCard title="Total Quizzes" value="12" subtitle="+2 this week" />
           <OverviewCard title="Active Students" value="148" subtitle="Across all sections" />
           <OverviewCard title="Avg Class Score" value="76%" subtitle="-3% vs last month" />
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">Recent Quizzes Managed</h3>
          <div className="space-y-4">
            <QuizManageRow title="Midterm Computing" status="Active" code="MCQ-991" participants={45} />
            <QuizManageRow title="React Fundamentals" status="Draft" code="---" participants={0} />
            <QuizManageRow title="Algorithm Basics" status="Completed" code="ALG-110" participants={120} />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-gray-400 hover:bg-dark-800 hover:text-white'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function OverviewCard({ title, value, subtitle }) {
  return (
    <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
      <h4 className="text-gray-400 font-medium mb-2">{title}</h4>
      <div className="text-4xl font-black text-white">{value}</div>
      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
}

function QuizManageRow({ title, status, code, participants }) {
  return (
    <div className="flex items-center justify-between p-4 bg-dark-800/40 rounded-xl hover:bg-dark-800 transition-colors border border-white/5">
      <div>
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <div className="flex items-center text-sm text-gray-400 mt-1 space-x-4">
          <span>Code: {code}</span>
          <span>{participants} joined</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Active' ? 'bg-green-500/20 text-green-400' : status === 'Completed' ? 'bg-gray-500/20 text-gray-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {status}
        </span>
        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">Edit</button>
      </div>
    </div>
  );
}
