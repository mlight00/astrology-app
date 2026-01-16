import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Moon, Sun } from 'lucide-react';
import './InputForm.css';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'female',
    calendarType: 'solar' // 'solar' | 'lunar'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          <div className="input-group">
            <label><Calendar size={18} /> 생년월일</label>
            <input 
              type="date" 
              name="birthDate" 
              value={formData.birthDate} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
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

        <button type="submit" className="submit-btn bg-wood">
          만세력 산출하기
        </button>
      </form>
    </motion.div>
  );
};

export default InputForm;
