import { Solar, Lunar } from 'lunar-javascript';

try {
    const year = 1975;
    const month = 2;
    const day = 13;
    const hour = 1;
    const minute = 40;

    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunarDate = solar.getLunar();

    console.log("Checking getEightChar...");
    if (lunarDate.getEightChar) {
        const eightChar = lunarDate.getEightChar();
        console.log("Got EightChar.");
        
        if (eightChar.getYun) {
            console.log("EightChar has getYun.");
            const yun = eightChar.getYun(1);
            console.log("Got Yun object.");
            
            const daYunArr = yun.getDaYun();
            console.log("yun.getDaYun() type:", typeof daYunArr, Array.isArray(daYunArr));
        } else {
            console.log("EightChar does NOT have getYun.");
        }
    } else {
        console.log("lunarDate does NOT have getEightChar.");
    }

} catch (error) {
    console.error("DEBUG ERROR:", error.message);
    console.error(error.stack);
}
