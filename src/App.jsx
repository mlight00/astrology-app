import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import { analyzeDestiny } from './utils/mockApi';
import { Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('input'); // 'input' | 'loading' | 'dashboard'
  const [results, setResults] = useState(null);

  const handleConsultationSubmit = async (formData) => {
    setView('loading');
    try {
      // Analyze data
      const data = await analyzeDestiny(formData);
      setResults(data);
      setView('dashboard');
    } catch (error) {
      console.error("Analysis failed", error);
      setView('input');
    }
  };

  const handleReset = () => {
    setResults(null);
    setView('input');
  };

  return (
    <div className="app-container">
      {/* Background Decor - simple subtle stars/particles */}
      <div className="bg-decor"></div>

      <main>
        {view === 'input' && (
          <div className="hero-section">
            <InputForm onSubmit={handleConsultationSubmit} />
          </div>
        )}

        {view === 'loading' && (
          <div className="loading-screen">
            <Sparkles className="spinner" size={48} color="var(--color-primary)" />
            <p>천문 데이터를 분석 중입니다...</p>
          </div>
        )}

        {view === 'dashboard' && results && (
          <Dashboard data={results} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
