import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Moon, Sun } from 'lucide-react';
import './InputForm.css';

const InputForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthTime: '',
    gender: 'female',
    calendarType: 'solar',
    // Default to Seoul if not specified
    longitude: 127.0,
    latitude: 37.56,
    timezoneOffset: 9,
    isDst: false
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleLocationSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSearchResults(data);
    } catch (error) {
        console.error("Search failed:", error);
        alert("위치 검색에 실패했습니다.");
    } finally {
        setIsSearching(false);
    }
  };

  const selectLocation = (result) => {
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      
      // Approximate Timezone Calc (Political timezones vary, this is a rough estimate)
      // Korea (KR) is UTC+9 special case (Longitude 127 is naturall UTC+8.5 but uses +9)
      let tz = Math.round(lon / 15);
      if (result.display_name.includes('South Korea') || result.display_name.includes('대한민국')) {
          tz = 9;
      }

      setFormData({
          ...formData,
          latitude: lat,
          longitude: lon,
          timezoneOffset: tz
      });
      setSearchResults([]); // close results
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine YMD into birthDate format for processing
    const y = formData.birthYear;
    const m = formData.birthMonth.toString().padStart(2, '0');
    const d = formData.birthDay.toString().padStart(2, '0');
    
    // Basic validation
    if (!y || !m || !d) {
        alert("생년월일을 정확히 입력해주세요.");
        return;
    }

    const fullData = {
        ...formData,
        birthDate: `${y}-${m}-${d}`
    };
    onSubmit(fullData);
  };

  return (
    <motion.div 
      className="glass-panel form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="expert-header">
        <h2 className="form-title gradient-text">만세력(萬歲曆) 전문가용</h2>
        <span className="badge">Pro Ver.</span>
      </div>
      <p className="form-subtitle">정확한 사주 원국 산출을 위한 정보를 입력해주세요.</p>

      <form onSubmit={handleSubmit} className="consultation-form">
        <div className="input-group">
          <label><User size={18} /> 이름 (명조)</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="이름을 입력하세요"
            required 
          />
        </div>

        <div className="row">
          <div className="input-group" style={{flex: 2}}>
            <label><Calendar size={18} /> 생년월일 (직접 입력)</label>
            <div className="date-inputs">
                <input 
                  type="number" 
                  name="birthYear" 
                  value={formData.birthYear} 
                  onChange={handleChange} 
                  placeholder="YYYY"
                  min="1900" max="2100"
                  required 
                />
                <span>년</span>
                <input 
                  type="number" 
                  name="birthMonth" 
                  value={formData.birthMonth} 
                  onChange={handleChange} 
                  placeholder="MM"
                  min="1" max="12"
                  required 
                />
                <span>월</span>
                <input 
                  type="number" 
                  name="birthDay" 
                  value={formData.birthDay} 
                  onChange={handleChange} 
                  placeholder="DD"
                  min="1" max="31"
                  required 
                />
                <span>일</span>
            </div>
          </div>
          <div className="input-group" style={{flex: 1}}>
            <label><Clock size={18} /> 태어난 시간</label>
            <input 
              type="time" 
              name="birthTime" 
              value={formData.birthTime} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="row">
            <div className="input-group">
            <label>성별 (건명/곤명)</label>
            <div className="radio-group">
                <label className={formData.gender === 'female' ? 'active' : ''}>
                <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={formData.gender === 'female'} 
                    onChange={handleChange} 
                /> 곤명(女)
                </label>
                <label className={formData.gender === 'male' ? 'active' : ''}>
                <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={formData.gender === 'male'} 
                    onChange={handleChange} 
                /> 건명(男)
                </label>
            </div>
            </div>

            <div className="input-group">
            <label>양력/음력</label>
            <div className="radio-group">
                <label className={formData.calendarType === 'solar' ? 'active' : ''}>
                <input 
                    type="radio" 
                    name="calendarType" 
                    value="solar" 
                    checked={formData.calendarType === 'solar'} 
                    onChange={handleChange} 
                /> <Sun size={14} style={{marginRight:4}}/> 양력
                </label>
                <label className={formData.calendarType === 'lunar' ? 'active' : ''}>
                <input 
                    type="radio" 
                    name="calendarType" 
                    value="lunar" 
                    checked={formData.calendarType === 'lunar'} 
                    onChange={handleChange} 
                /> <Moon size={14} style={{marginRight:4}}/> 음력
                </label>
            </div>
            </div>
        </div>

        <div className="row">
             <div className="input-group yajasi-group">
                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        name="useYajasi" 
                        checked={formData.useYajasi || false} 
                        onChange={(e) => setFormData({...formData, useYajasi: e.target.checked})} 
                    />
                    <span>야자시(夜子時) 적용</span>
                </label>
             </div>
        </div>

        <details className="advanced-options">
            <summary>출생지 및 정밀 시간 설정 (선택)</summary>
            
            {/* Address Search Section */}
            <div className="location-search-section">
                <div className="input-group">
                    <label>출생 지역 검색 (시/군/구)</label>
                    <div className="search-box">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleLocationSearch())}
                            placeholder="예: 서울 종로구, New York, Tokyo"
                        />
                        <button type="button" onClick={handleLocationSearch} className="search-btn" disabled={isSearching}>
                            {isSearching ? '검색중...' : '검색'}
                        </button>
                    </div>
                    {searchResults.length > 0 && (
                        <ul className="search-results">
                            {searchResults.map((result, idx) => (
                                <li key={idx} onClick={() => selectLocation(result)}>
                                    <span className="place-name">{result.display_name}</span>
                                    <span className="place-coords">
                                        (Lat: {parseFloat(result.lat).toFixed(2)}, Lon: {parseFloat(result.lon).toFixed(2)})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="row location-details">
                <div className="input-group">
                    <label>경도 (Longitude)</label>
                    <input 
                        type="number" 
                        step="0.0001"
                        name="longitude" 
                        value={formData.longitude} 
                        onChange={handleChange} 
                        placeholder="자동 입력됨"
                    />
                </div>
                <div className="input-group">
                    <label>위도 (Latitude)</label>
                     <input 
                        type="number" 
                        step="0.0001"
                        name="latitude" 
                        value={formData.latitude || 37.56} 
                        onChange={handleChange} 
                        placeholder="자동 입력됨"
                    />
                </div>
                <div className="input-group">
                    <label>표준시 (UTC Offset)</label>
                    <input 
                        type="number" 
                        step="0.5"
                        name="timezoneOffset" 
                        value={formData.timezoneOffset} 
                        onChange={handleChange} 
                        placeholder="자동 계산됨"
                    />
                </div>
                
                <div className="input-group">
                     <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            name="isDst" 
                            checked={formData.isDst || false} 
                            onChange={(e) => setFormData({...formData, isDst: e.target.checked})} 
                        />
                        <span>서머타임</span>
                    </label>
                </div>
            </div>
        </details>

        <button type="submit" className="submit-btn bg-wood">
          만세력 산출하기
        </button>
      </form>
    </motion.div>
  );
};

export default InputForm;
