export const analyzeDestiny = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Determine signature based on topic
  let signature = "대지 위에 깊게 뿌리내린 굳건한 소나무";
  let strategy = [
    "확장을 추구하기보다는 기초를 단단히 다지는 데 집중하세요.",
    "인맥을 활용한 꾸준한 성장이 당신의 핵심 전략입니다.",
    "충동적인 결정을 피하고 특유의 분석력을 믿으세요."
  ];

  if (userData.topic === 'wealth') {
    signature = "산 속에 숨겨진 찬란한 황금";
    strategy = [
      "부는 인내와 장기적인 투자를 통해 완성됩니다.",
      "부동산이나 실물 자산(토[土]의 기운)에 주목하세요.",
      "Action: 지출 내역을 꼼꼼히 기록하여 '수(水)'의 유출을 막으세요."
    ];
  } else if (userData.topic === 'career') {
    signature = "불 속에서 단련된 예리한 검";
    strategy = [
      "당신의 커리어는 정확성과 결단력(금[金])을 요구합니다.",
      "혼란을 정리하고 방향을 제시하는 리더십을 발휘하세요.",
      "Action: 권위를 드러내는 단정하고 구조적인 복장이 도움이 됩니다."
    ];
  }

  return {
    signature,
    elements: {
      wood: 30,
      fire: 20,
      earth: 35,
      metal: 10,
      water: 5
    },
    character: "당신은 주변 사람들에게 안정감을 주는 강한 중심(토[土])을 가지고 있습니다. 야망(목[木])은 크지만, 급격한 변화에 적응하는 유연성(수[水])이 다소 부족할 수 있습니다. 신뢰할 수 있는 사람이지만 때로는 고집스러워 보일 수 있습니다.",
    timing: [
      { age: "24-33", label: "성장의 봄", desc: "배움과 준비를 위한 시기입니다." },
      { age: "34-43", label: "열정의 여름", desc: "커리어의 정점을 향해 달려가는 시기입니다." },
      { age: "44-53", label: "수확의 가을", desc: "지난 노력의 결실을 맺는 시기입니다." }
    ],
    currentTiming: "현재 '열정의 여름' 시기에 와 있습니다. 지금은 기다리기보다 행동해야 할 중요한 때입니다.",
    strategy
  };
};
