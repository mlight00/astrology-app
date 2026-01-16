import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './ManseokView.css';

const Pillar = ({ title, data, isDay }) => (
  <div className={`pillar ${isDay ? 'day-pillar' : ''}`}>
    <div className="pillar-header">{title}</div>
    <div className="pillar-body">
      {/* Heavenly Stem (Gan) */}
      <div className={`gan-box bg-${data.gan.element} text-white`}>
        <span className="sipseong-label">{data.gan.sipseong}</span>
        <span className="hanja">{data.gan.char}</span>
        <span className="korean">{data.gan.kor}</span>
      </div>
      {/* Earthly Branch (Ji) */}
      <div className={`ji-box bg-${data.ji.element} text-white`}>
        <span className="sipseong-label">{data.ji.sipseong}</span>
        <span className="hanja">{data.ji.char}</span>
        <span className="korean">{data.ji.kor}</span>
      </div>
    </div>
  </div>
);

const ManseokView = ({ data, onReset }) => {
  const { userInfo, saju, daeWun, analysis } = data;

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
            <span>
                {userInfo.birthDate} {userInfo.birthTime} ({userInfo.calendarType === 'solar' ? '양력' : '음력'}) 
                | {userInfo.gender === 'male' ? '건명(男)' : '곤명(女)'}
                {userInfo.useYajasi ? ' | 야자시 적용' : ''}
            </span>
        </div>
      </header>

      <div className="saju-grid glass-panel">
        {/* 오른쪽에서 왼쪽 순으로 배치: 시, 일, 월, 연 */}
        <Pillar title="시주 (Time)" data={saju.time} />
        <Pillar title="일주 (Day)" data={saju.day} isDay={true} />
        <Pillar title="월주 (Month)" data={saju.month} />
        <Pillar title="연주 (Year)" data={saju.year} />
      </div>

      <div className="analysis-section glass-panel">
        <div className="analysis-row">
            <div className="analysis-item">
                <h4>띠 (Year) / 일지 (Day)</h4>
                <div className="animal-display">
                    <div className="animal-box">
                        <span>띠</span>
                        <p className="animal-text">{analysis.yearAnimal}</p>
                    </div>
                    <div className="animal-divider"></div>
                    <div className="animal-box">
                        <span>일지</span>
                        <p className="animal-text">{analysis.iljiAnimal}</p>
                    </div>
                </div>
            </div>
            <div className="analysis-item">
                <h4>음양 및 패턴</h4>
                <ul className="pattern-list">
                    {analysis.palTong && <li>{analysis.palTong}</li>}
                    {analysis.byeongJon.length > 0 ? (
                        analysis.byeongJon.map((b, i) => <li key={i}>{b}</li>)
                    ) : (
                        <li>특이 패턴 없음</li>
                    )}
                </ul>
            </div>
            <div className="analysis-item">
                <h4>십신(十神) 분포</h4>
                <div className="sipseong-grid">
                    {Object.entries(analysis.sipseongCounts).map(([key, count]) => (
                        <div key={key} className="sipseong-stat">
                            <span>{key}</span>
                            <strong>{count}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {data.timeCorrection && (
        <div className="time-correction-section glass-panel">
            <h4 className="correction-title">진태양시 보정 근거 (Time Correction Logic)</h4>
            <div className="correction-grid">
               <div className="correction-item">
                 <span>입력 좌표</span>
                 <strong>Lat: {data.timeCorrection.inputLocation.lat}, Lng: {data.timeCorrection.inputLocation.lng}</strong>
               </div>
               <div className="correction-item">
                 <span>표준시 적용</span>
                 <strong>{data.timeCorrection.appliedStandardTime} {data.timeCorrection.isDst ? '(DST 적용)' : '(DST 미적용)'}</strong>
               </div>
               <div className="correction-item">
                 <span>경도 보정값</span>
                 <strong>{data.timeCorrection.longitudeCorrection}</strong>
               </div>
               <div className="correction-item">
                 <span>최종 진태양시</span>
                 <strong className="highlight-time">{data.timeCorrection.finalSolarTime}</strong>
               </div>
            </div>
            <div className="correction-reasoning">
                <span>계산 식:</span>
                <code>{data.timeCorrection.calculationReasoning}</code>
            </div>
        </div>
      )}

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
