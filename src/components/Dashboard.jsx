import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Shield, Zap, Wind, Droplets } from 'lucide-react';
import './Dashboard.css';

const ElementIcon = ({ type }) => {
  switch(type) {
    case 'wood': return <Wind size={16} />;
    case 'fire': return <Zap size={16} />;
    case 'earth': return <Shield size={16} />;
    case 'metal': return <Sparkles size={16} />;
    case 'water': return <Droplets size={16} />;
    default: return null;
  }
}

const Dashboard = ({ data, onReset }) => {
  const { signature, elements, character, timing, currentTiming, strategy } = data;

  // Calculate conic gradient for Inner Circle
  const total = Object.values(elements).reduce((a, b) => a + b, 0);
  let accumulated = 0;
  const gradientStops = Object.entries(elements).map(([el, val]) => {
    const start = (accumulated / total) * 100;
    accumulated += val;
    const end = (accumulated / total) * 100;
    return `var(--element-${el}) ${start}% ${end}%`;
  }).join(', ');

  const chartStyle = {
    background: `conic-gradient(${gradientStops})`,
  };

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <header className="dashboard-header glass-panel">
        <div className="signature-content">
          <small>운명의 한 줄</small>
          <h1 className="gradient-text">{signature}</h1>
        </div>
        <button className="reset-btn" onClick={onReset}>새로운 상담</button>
      </header>

      <div className="dashboard-grid">
        
        {/* Inner Circle: Character */}
        <motion.div 
          className="card inner-circle-card glass-panel"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header">
            <h3>내면의 원</h3>
            <span>심층 성격 분석</span>
          </div>
          
          <div className="chart-container">
            <div className="element-chart" style={chartStyle}>
              <div className="chart-inner">
                <span className="chart-label">오행 분석</span>
              </div>
            </div>
            <div className="element-legend">
              {Object.entries(elements).map(([el, val]) => (
                <div key={el} className="legend-item">
                  <span className={`dot bg-${el}`}></span>
                  <span className="name capitalize">{el}</span>
                  <span className="value">{val}%</span>
                </div>
              ))}
            </div>
          </div>
          <p className="analysis-text">{character}</p>
        </motion.div>

        {/* Outer Circle: Timing */}
        <motion.div 
          className="card outer-circle-card glass-panel"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3>외면의 원</h3>
            <span>대운 (시간의 흐름)</span>
          </div>
          
          <div className="timeline-container">
             <div className="current-phase">
                <h4>현재 흐름</h4>
                <p>{currentTiming}</p>
             </div>
             <div className="timeline-list">
               {timing.map((t, idx) => (
                 <div key={idx} className="timeline-item">
                   <div className="time-marker"></div>
                   <div className="time-content">
                     <strong>{t.age}</strong>
                     <span>{t.label}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </motion.div>

        {/* Actionable Strategy */}
        <motion.div 
          className="card strategy-card glass-panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>개운법 (전략)</h3>
            <span>실천적인 조언</span>
          </div>
          <div className="strategy-list">
            {strategy.map((item, index) => (
              <div key={index} className="strategy-item">
                <div className="icon-box">
                  <TrendingUp size={20} color="var(--color-accent)" />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
