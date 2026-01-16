import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Compass } from 'lucide-react';
import './InputForm.css';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: 'female',
    topic: 'wealth'
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
      <h2 className="form-title gradient-text">사주팔자 전문 상담</h2>
      <p className="form-subtitle">전문적인 운세 분석을 위해 정보를 입력해 주세요.</p>

      <form onSubmit={handleSubmit} className="consultation-form">
        <div className="input-group">
          <label><User size={18} /> 이름</label>
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

        <div className="input-group">
          <label>성별</label>
          <div className="radio-group">
            <label className={formData.gender === 'female' ? 'active' : ''}>
              <input 
                type="radio" 
                name="gender" 
                value="female" 
                checked={formData.gender === 'female'} 
                onChange={handleChange} 
              /> 여성
            </label>
            <label className={formData.gender === 'male' ? 'active' : ''}>
              <input 
                type="radio" 
                name="gender" 
                value="male" 
                checked={formData.gender === 'male'} 
                onChange={handleChange} 
              /> 남성
            </label>
          </div>
        </div>

        <div className="input-group">
          <label><Compass size={18} /> 상담 주제</label>
          <select name="topic" value={formData.topic} onChange={handleChange}>
            <option value="wealth">재물운 (부와 재산)</option>
            <option value="career">직업운 (사업과 승진)</option>
            <option value="relationships">애정운 (결혼과 연애)</option>
            <option value="health">건강운 (신체와 활력)</option>
          </select>
        </div>

        <button type="submit" className="submit-btn bg-wood">
          분석 시작하기
        </button>
      </form>
    </motion.div>
  );
};

export default InputForm;
