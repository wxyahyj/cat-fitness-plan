const 动作计划 = {
  0: ["仰卧卷腹（15次 × 2组）", "死虫式（左右交替20次）", "仰卧抬腿（15次 × 2组）", "平板支撑（30秒 × 2组）"], // 星期一
  1: ["原地踏步（3分钟）", "开合跳（20次 × 2组）", "高抬腿（30秒 × 2组）", "体侧伸展（左右各30秒）"], // 星期二
  2: ["俯卧撑（膝盖支撑版，10次 × 2组）", "俯身后摆臂（20次）", "手臂画圈（前后各20圈）", "猫式伸展（30秒）"], // 星期三
  3: ["下犬式（30秒）", "战士一式（左右各30秒）", "坐姿前屈（30秒）", "冥想呼吸（5分钟）"], // 星期四
  4: ["跳舞、散步、逛街、骑车，随心所欲动一动就好 🐾"], // 星期五
  5: ["站立前屈（30秒）", "蝴蝶式（30秒）", "仰卧扭转（左右各30秒）", "冥想呼吸（5分钟）"], // 星期六
  6: ["深蹲（15次 × 2组）", "臀桥（20次 × 2组）", "静态弓步蹲（左右各30秒）", "猫式伸展（30秒）"] // 星期日
};


function 打卡() {
  const table = document.getElementById("打卡记录");
  const row = table.insertRow(-1);
  const dateCell = row.insertCell(0);
  const statusCell = row.insertCell(1);
  const today = new Date().toLocaleDateString();
  dateCell.innerText = today;
  statusCell.innerText = "已打卡 ✅";
  localStorage.setItem(today, "打卡成功");
  显示徽章(); // 打卡后刷新徽章状态
}

function 加载训练内容() {
  const container = document.getElementById("训练内容");
  container.innerHTML = "";

  const 星期 = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

  for (let i = 0; i < 7; i++) {
    const 动作 = 动作计划[i];
    const section = document.createElement("div");
    section.innerHTML = `<div class="day-title">📅 ${星期[i]}</div>` + 动作.map(item => `<p>🐾 ${item}</p>`).join("");
    container.appendChild(section);
  }
}

function 恢复打卡记录() {
  const table = document.getElementById("打卡记录");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const row = table.insertRow(-1);
    row.insertCell(0).innerText = key;
    row.insertCell(1).innerText = value;
  }
}

function 计算连续打卡天数() {
  const dates = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(key)) {
      dates.push(new Date(key));
    }
  }

  dates.sort((a, b) => a - b);

  let maxStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      currentStreak++;
    } else if (diff > 1) {
      currentStreak = 1;
    }
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }
  }

  return maxStreak;
}

function 显示徽章() {
  const streak = 计算连续打卡天数();
  const container = document.getElementById("徽章展示");

  if (streak >= 14) {
    container.innerHTML = "👑 王者猫爪徽章！你是猫猫界的传奇！";
  } else if (streak >= 7) {
    container.innerHTML = "🏅 金猫爪徽章！坚持一周，太棒了喵！";
  } else if (streak >= 3) {
    container.innerHTML = "🎖️ 小猫爪徽章！连续打卡3天，继续加油喵！";
  } else {
    container.innerHTML = "暂无徽章，继续努力喵！😺";
  }
}

// 页面加载时执行
window.onload = function () {
  加载训练内容();
  恢复打卡记录();
  显示徽章();
};
