import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function LiveQuiz() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);

  const mockData = [
    { name: 'A', votes: 12 },
    { name: 'B', votes: 45 },
    { name: 'C', votes: 5 },
    { name: 'D', votes: 20 },
  ];

  // Anti-cheat: Tab switching detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchWarnings(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            alert('Multiple tab switches detected. Quiz auto-submitted.');
            navigate('/');
          } else {
            alert(`Warning ${newCount}/3: Please do not switch tabs during a live quiz.`);
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col px-4 py-8 relative">
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center mb-8">
        <div className="glass px-4 py-2 rounded-xl flex items-center shadow-lg shadow-primary-500/10">
          <span className="text-primary-400 font-bold mr-2">Quiz Code:</span>
          <span className="font-mono tracking-widest text-white">{code}</span>
        </div>
        
        <div className={`glass px-4 py-2 rounded-xl flex items-center ${timeLeft < 10 ? 'text-red-400 border-red-500/50' : 'text-blue-400'} transition-colors`}>
          <Clock className={`w-5 h-5 mr-2 ${timeLeft < 10 ? 'animate-pulse' : ''}`} />
          <span className="text-xl font-bold font-mono">{timeLeft}s</span>
        </div>
      </div>

      {tabSwitchWarnings > 0 && (
        <div className="max-w-4xl mx-auto w-full mb-4 bg-orange-500/20 border border-orange-500 text-orange-200 px-4 py-2 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Warning: Tab change detected ({tabSwitchWarnings}/3)
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-6">
        
        {/* Question Area */}
        <div className="flex-[2] flex flex-col space-y-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-blue-500"
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                transition={{ ease: 'linear', duration: 1 }}
              />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed mt-2">
              Which hook is used to manage side effects in React function components?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['useState', 'useEffect', 'useContext', 'useReducer'].map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={`py-4 px-6 rounded-xl text-left text-lg font-medium transition-all transform hover:scale-[1.02] border ${selectedOption === i ? 'bg-primary-600/20 border-primary-500 text-white shadow-lg shadow-primary-500/20' : 'glass border-white/5 text-gray-300 hover:bg-dark-800'}`}
              >
                <span className="text-gray-500 mr-3 font-mono">{String.fromCharCode(65 + i)}</span> 
                {opt}
              </button>
            ))}
          </div>

          <button 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-4 max-w-xs ml-auto shadow-lg shadow-blue-500/20 transition-all"
          >
            Submit Answer
          </button>
        </div>

        {/* Real-time stats sidebar */}
        <div className="flex-1 glass rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-gray-300 mb-6 border-b border-gray-800 pb-2">Live Responses</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip cursor={{ fill: '#1f2937' }} contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="votes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">Total Votes: <span className="text-white font-bold text-lg">82</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
