import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './ManseokView.css';

const Pillar = ({ title, data }) => (
  <div className="pillar">
    <div className="pillar-header">{title}</div>
    <div className="pillar-body">
      <div className={`gan-box bg-${data.gan.element} text-white`}>
        <span className="hanja">{data.gan.char}</span>
        <span className="korean">{data.gan.kor}</span>
      </div>
      <div className={`ji-box bg-${data.ji.element} text-white`}>
        <span className="hanja">{data.ji.char}</span>
        <span className="korean">{data.ji.kor}</span>
      </div>
    </div>
  </div>
);

const ManseokView = ({ data, onReset }) => {
  const { userInfo, saju, daeWun } = data;

  return (
    <motion.div 
      className="manseok-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="manseok-header glass-panel">
        <button className="back-btn" onClick={onReset}>
            <ArrowLeft size={20} /> 재입력
        </button>
        <div className="user-info-display">
            <h2>{userInfo.name} 님의 사주원국</h2>
            <span>{userInfo.birthDate} {userInfo.birthTime} ({userInfo.calendarType === 'solar' ? '양력' : '음력'}) | {userInfo.gender === 'male' ? '건명(男)' : '곤명(女)'}</span>
        </div>
      </header>

      <div className="saju-grid glass-panel">
        {/* 오른쪽에서 왼쪽 순으로 배치: 시, 일, 월, 연 */}
        <Pillar title="시주 (Time)" data={saju.time} />
        <Pillar title="일주 (Day)" data={saju.day} />
        <Pillar title="월주 (Month)" data={saju.month} />
        <Pillar title="연주 (Year)" data={saju.year} />
      </div>

      <div className="daewun-section glass-panel">
        <h3>대운(大運)의 흐름</h3>
        <div className="daewun-scroll">
            {daeWun.map((yun, idx) => (
                <div key={idx} className="daewun-item">
                    <div className="daewun-ganzhi">
                        <span className={`text-${yun.gan.element}`}>{yun.gan.char}</span>
                        <span className={`text-${yun.ji.element}`}>{yun.ji.char}</span>
                    </div>
                    <div className="daewun-age">{yun.startAge}</div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ManseokView;
