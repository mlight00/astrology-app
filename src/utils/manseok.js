import { Solar, Lunar, LunarSolarConverter } from 'lunar-javascript';

// 천간 (Heavenly Stems)
const CHEONGAN = ['갑(甲)', '을(乙)', '병(丙)', '정(丁)', '무(戊)', '기(己)', '경(庚)', '신(辛)', '임(壬)', '계(癸)'];
// 지지 (Earthly Branches)
const JIJI = ['자(子)', '축(丑)', '인(寅)', '묘(卯)', '진(辰)', '사(巳)', '오(午)', '미(未)', '신(申)', '유(酉)', '술(戌)', '해(亥)'];
const JIJI_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 오행 (Five Elements) - 목, 화, 토, 금, 수
const ELEMENT_MAP = {
  '甲': 'wood', '乙': 'wood', '寅': 'wood', '卯': 'wood',
  '丙': 'fire', '丁': 'fire', '巳': 'fire', '午': 'fire',
  '戊': 'earth', '己': 'earth', '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '庚': 'metal', '辛': 'metal', '申': 'metal', '酉': 'metal',
  '壬': 'water', '癸': 'water', '亥': 'water', '子': 'water'
};

const ELEMENT_KOREAN = {
  'wood': '목(木)',
  'fire': '화(火)',
  'earth': '토(土)',
  'metal': '금(金)',
  'water': '수(水)'
};

// 십신(Ten Gods) 계산을 위한 매핑 (일간 기준)
// 간단한 매핑 로직은 복잡하므로, 여기서는 MVP를 위해 라이브러리 데이터를 활용하거나 간소화된 로직 사용
// lunar-javascript가 십신을 직접 제공하지 않을 경우, 일간 대비 오행/음양 관계를 계산해야 함.
// 이번 단계에서는 정확한 간지 산출에 집중.

export const calculateManseok = (name, gender, birthDate, birthTime, calendarType = 'solar') => {
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
    // 음력 입력인 경우 (평달 가정, 윤달 처리는 추후 고도화 가능)
    lunarDate = Lunar.fromYmdHms(year, month, day, hour, minute, 0);
  }

  // 1. 사주 팔자 (BaZi)
  // lunar-javascript의 getBaZi()는 [YearGan, YearZhi, MonthGan, MonthZhi...] 형태의 배열을 반환하지 않고
  // 각 기둥 객체를 반환하는 메소드들을 사용해야 함.
  
  const bazi = lunarDate.getBaZi(); // [0]: YearGan, [1]: YearZhi, [2]: MonthGan...
  
  const pillars = {
    year: { gan: bazi[0], ji: bazi[1] },
    month: { gan: bazi[2], ji: bazi[3] },
    day: { gan: bazi[4], ji: bazi[5] },
    time: { gan: bazi[6], ji: bazi[7] }
  };

  // 한글 매핑 및 오행 추가
  const enrichedPillars = {};
  ['year', 'month', 'day', 'time'].forEach((key) => {
    const p = pillars[key];
    enrichedPillars[key] = {
      gan: { 
        char: p.gan, 
        kor: getKoreanChar(p.gan, true), 
        element: ELEMENT_MAP[p.gan] 
      },
      ji: { 
        char: p.ji, 
        kor: getKoreanChar(p.ji, false), 
        element: ELEMENT_MAP[p.ji] 
      }
    };
  });

  // 2. 대운 계산 (Dae-wun)
  // 대운수 계산 (간략화된 로직 또는 라이브러리 기능 활용)
  // lunar-javascript에 대운 계산 기능이 포함되어 있음 (Yun)
  const yun = lunarDate.getYun(gender === 'male' ? 1 : 0); // 1: Man, 0: Woman
  const daeYun = yun.getDaYun();
  
  const daeWunList = [];
  // 대운은 보통 10개 정도 보여줌
  const daeYunArr = daeYun.getDaYun();
  
  // 라이브러리 버전에 따라 사용법이 다를 수 있어 안전하게 인덱스 순회
  for (let i = 0; i < 10; i++) {
    if (i >= daeYunArr.length) break;
    const dy = daeYunArr[i];
    daeWunList.push({
      startAge: dy.getStartYear(), // 대운 시작 나이
      gan: { char: dy.getGanZhi().substring(0, 1), element: ELEMENT_MAP[dy.getGanZhi().substring(0, 1)] },
      ji: { char: dy.getGanZhi().substring(1, 2), element: ELEMENT_MAP[dy.getGanZhi().substring(1, 2)] }
    });
  }

  return {
    userInfo: { name, gender, birthDate, birthTime, calendarType },
    saju: enrichedPillars,
    daeWun: daeWunList
  };
};

function getKoreanChar(char, isGan) {
  // 간단한 매핑 헬퍼
  const gans = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const gansKor = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  const jis = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const jisKor = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

  if (isGan) {
    const idx = gans.indexOf(char);
    return idx >= 0 ? gansKor[idx] : char;
  } else {
    const idx = jis.indexOf(char);
    return idx >= 0 ? jisKor[idx] : char;
  }
}
