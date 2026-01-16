
import { Solar, Lunar } from 'lunar-javascript';

// Mock manseok.js logic
const ELEMENT_MAP = {
  '甲': 'wood', '乙': 'wood', '寅': 'wood', '卯': 'wood',
  '丙': 'fire', '丁': 'fire', '巳': 'fire', '午': 'fire',
  '戊': 'earth', '己': 'earth', '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '庚': 'metal', '辛': 'metal', '申': 'metal', '酉': 'metal',
  '壬': 'water', '癸': 'water', '亥': 'water', '子': 'water'
};

function calculateManseok(name, gender, birthDate, birthTime, calendarType = 'solar') {
  console.log("Input:", name, gender, birthDate, birthTime, calendarType);

  const dateParts = birthDate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);
  const timeParts = birthTime.split(':');
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  let lunarDate;
  
  if (calendarType === 'solar') {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    lunarDate = solar.getLunar();
  } else {
    lunarDate = Lunar.fromYmdHms(year, month, day, hour, minute, 0);
  }

  // 1. 사주 팔자 (BaZi)
  const yearGan = lunarDate.getYearGan();
  const yearZhi = lunarDate.getYearZhi();
  const monthGan = lunarDate.getMonthGan();
  const monthZhi = lunarDate.getMonthZhi();
  const dayGan = lunarDate.getDayGan();
  const dayZhi = lunarDate.getDayZhi();
  const timeGan = lunarDate.getTimeGan();
  const timeZhi = lunarDate.getTimeZhi();
  
  const pillars = {
    year: { gan: yearGan, ji: yearZhi },
    month: { gan: monthGan, ji: monthZhi },
    day: { gan: dayGan, ji: dayZhi },
    time: { gan: timeGan, ji: timeZhi }
  };

  
  // 2. 대운 계산 (Dae-wun)
  console.log("Calculating Dae-wun...");
  const eightChar = lunarDate.getEightChar();
  const yun = eightChar.getYun(gender === 'male' ? 1 : 0); 
  const daeYunArr = yun.getDaYun(); 
  
  console.log("DaeYun Array Length:", daeYunArr.length);

  const daeWunList = [];
  for (let i = 0; i < 10; i++) {
    if (i >= daeYunArr.length) break;
    const dy = daeYunArr[i];
    
    // Test access
    const ganZhi = dy.getGanZhi();
    console.log(`Index ${i}:`, ganZhi, dy.getStartYear());
    
    daeWunList.push({
      startAge: dy.getStartYear(), 
      gan: { char: ganZhi.substring(0, 1), element: ELEMENT_MAP[ganZhi.substring(0, 1)] },
      ji: { char: ganZhi.substring(1, 2), element: ELEMENT_MAP[ganZhi.substring(1, 2)] }
    });
  }

  console.log("SUCCESS");
}

try {
    console.log("Testing Female...");
    calculateManseok("Test", "female", "1975-02-13", "01:40", "solar");
    
    console.log("\nTesting Male...");
    calculateManseok("Test", "male", "1975-02-13", "01:40", "solar");
} catch (e) {
    console.error("CRASH:", e);
}
