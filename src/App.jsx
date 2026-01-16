import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ManseokView from './components/ManseokView';
import { calculateManseok } from './utils/manseok';
import { Sparkles } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('input'); // 'input' | 'loading' | 'results'
  const [data, setData] = useState(null);

  const handleConsultationSubmit = (formData) => {
    setView('loading');
    
    // 비동기 처리 시뮬레이션 (계산은 순식이지만 UX를 위해)
    setTimeout(() => {
      try {
        const result = calculateManseok(
          formData.name,
          formData.gender,
          formData.birthDate,
          formData.birthTime,
          formData.calendarType
        );
        setData(result);
        setView('results');
      } catch (error) {
        console.error("Calculation failed", error);
        alert("만세력 산출 중 오류가 발생했습니다. 생년월일을 확인해주세요.");
        setView('input');
      }
    }, 1000);
  };

  const handleReset = () => {
    setData(null);
    setView('input');
  };

  return (
    <div className="app-container">
      {/* Background Decor */}
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
            <p>천기(天機)를 읽어내는 중입니다...</p>
          </div>
        )}

        {view === 'results' && data && (
          <ManseokView data={data} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
