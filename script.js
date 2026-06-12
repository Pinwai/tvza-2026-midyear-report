const header = document.querySelector("[data-nav]");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const monthButtons = Array.from(document.querySelectorAll("[data-month]"));
const monthDialog = document.querySelector("[data-month-dialog]");
const closeDialogButton = document.querySelector("[data-close-dialog]");
const dialogKicker = document.querySelector("[data-dialog-kicker]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogSummary = document.querySelector("[data-dialog-summary]");
const dialogSections = document.querySelector("[data-dialog-sections]");
let activeMonthButton = null;

const monthReports = {
  jan: {
    kicker: "2026 年 1 月月報",
    title: "駕訓改革、會勘方法與通學檢核",
    summary:
      "上半年工作從駕訓改革記者會啟動，並同步把地方會勘、標線型人行道與通學環境檢核拉回可檢驗的設計程序。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "完成跨團體駕訓改革記者會協作，提出完整教材、道路駕駛、路考方式、風險感知與全民回訓等方向。",
          "針對公路局以片段簡報回應駕訓改革的狀況，整理出「教材不能只等於題庫或停讓行人章節」的公共論述。",
          "從地方案例檢討紅色鋪面與標線型人行道，指出不能用顏色替代法定行穿線、實體保護或清楚路口設計。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "完成記者會發言順序、訴求分工、集合流程、講稿與手板等對外行動準備。",
          "開始整理年度會務節奏與會員大會前置事項，讓倡議工作與組織治理同步推進。",
          "收到通學環境檢核暨民團共督計畫邀請後，彙整計畫資料與評估指標，準備帶入聯盟意見。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "持續追蹤交通部與公路局是否建立完整駕駛人教材與教練訓練，而非只追加宣導材料。",
          "地方會勘需要求會前圖面、轉彎軌跡、設計依據、會後紀錄與承辦回覆。",
        ],
      },
    ],
  },
  feb: {
    kicker: "2026 年 2 月月報",
    title: "強制險責任、通學會勘與參與程序",
    summary:
      "2 月的核心不是單一政策表態，而是釐清民團參與公共會議時，應有資料、決策範圍與回覆機制，避免倡議被形式化背書。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "針對強制險死亡給付調整，將討論延伸到通膨、風險差別費率、職業駕駛、公司車輛與雇主責任。",
          "通學示範區與學校周邊會勘中，反覆提出會前資料、清楚決策題目、會後紀錄與可追蹤回覆的重要性。",
          "延續人本交通與機車定位討論，主張步行環境、車輛動線、城郊移動與公共運輸不能被切成互相對立的議題。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "整理倡議聯繫資料與通學檢核會議紀錄，作為後續與民代、公部門和地方團體溝通的基礎。",
          "接收並整理新竹人本交通成立與外部合作資訊，擴大地方人本交通網絡。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "強制險後續需追蹤是否建立定期調整、差別費率與運輸業責任，而非停在單次給付金額。",
          "通學與地方會勘需追蹤圖面修正、施工落實與驗收標準。",
        ],
      },
    ],
  },
  mar: {
    kicker: "2026 年 3 月月報",
    title: "大型車責任、高齡駕駛與事故治理",
    summary:
      "3 月把大型車、公車、校園周邊、高齡駕駛與駕訓教育放進同一個安全系統，重點從要求弱勢用路人自保，轉向車輛、道路、業者與政府責任。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "從大型車內輪差與交通安全教育出發，整理強勢用路人應負更高注意與保護義務的論述。",
          "討論 AEB、DMS、DVS、右轉視野死角、職業駕駛訓練與大型車道路駕駛考驗不足等制度缺口。",
          "高齡駕駛事故回應中，同時提出道路工程防護、車輛輔助系統、回訓與移動權保障，避免只用年齡二分法處理。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "處理多個媒體採訪與外部演講邀請，將高齡駕駛、人行道執法與組織未來規劃轉化為對外說明。",
          "長庚大學三重客運事故後，啟動新聞稿與公文草擬，將個案事故拉到業者訓練、勞動條件、校園法規與跨機關責任。",
          "會員大會因通知、帳務與資料尚未完備而延期，保留完整會務資料後再安排正式程序。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "三重客運事故需追蹤公文回函、議員質詢素材使用與業者教育訓練改善。",
          "高齡駕駛需建立醫療、職能治療、警政與監理端通報和再訓練制度。",
        ],
      },
    ],
  },
  apr: {
    kicker: "2026 年 4 月月報",
    title: "罰單制度、公聽會與淡江大橋議題升溫",
    summary:
      "4 月進入政策攻防期，聯盟一方面參與交通罰單制度公聽會，一方面開始把淡江大橋從政治與網路論戰拉回道路規範、車種定位與施工安全。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "無號誌路口、停止與讓路標誌、巷弄減速等討論，形成「不能只靠標誌和罰單補道路設計」的基本立場。",
          "交通罰單制度公聽會主張：罰單數量增加不等於道路更安全，必須同步檢視道路設計、執法資源與制度根因。",
          "淡江大橋初期討論聚焦機車道寬度、分隔式機車道規範、通車前安全風險與官方說明是否完整。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "完成三重客運事故公文寄送與機關回函追蹤，並整理可提供民代質詢的事故脈絡。",
          "確認公聽會代表出席與名義，讓聯盟在制度討論場合維持清楚的政策角色。",
          "回覆 g0v 雙年會座談邀請，並評估是否投入擺攤與後續倡議人力。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "公聽會後需追蹤主管機關是否回應道路設計與執法資源，而非只停在事故數字與罰單數量。",
          "淡江大橋需持續整理規範、竣工紀錄、車道配置與官方說明，避免議題被簡化成族群對立。",
        ],
      },
    ],
  },
  may: {
    kicker: "2026 年 5 月月報",
    title: "高風險駕駛、地方細設與綠蔭人行道",
    summary:
      "5 月是制度意見與工程細節並進的月份：一邊提交高風險駕駛重考意見，一邊在地方設計案提出可落地的道路修正。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "淡江大橋討論擴大到護欄、燈桿基座、排水、隔音牆、施工收尾與官方公關回應，凸顯這是工程、監理與車種定位的複合案例。",
          "高風險駕駛重考意見主張，酒駕、毒駕與重大違規者不能只回到一般駕訓班，應有特殊課程、醫療或戒癮證明與功能評估。",
          "新北學校周邊人本示範設計提出行穿線對位、轉彎半徑、減速平台、車道縮減、照明與實體人行道等具體修正。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "完成吊銷駕照禁考修法意見書整理與提交，將焦點收斂在高風險駕駛重新取得駕照的制度設計。",
          "評估綠蔭人行道、都市林與環境團體合作，保留行人通行空間、無障礙與安全通行的政策界線。",
          "處理下一代白皮書、街道改造、公聽會與政策協調會等外部邀請，分辨簽署、掛名、出席與不出席的不同層次。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "追蹤高風險駕駛制度是否納入差異化課程、醫療戒癮證明、職業駕照門檻與再犯風險管理。",
          "追蹤地方細設案是否依民間意見修圖、施工與驗收，避免成果停在會議紀錄。",
        ],
      },
    ],
  },
  jun: {
    kicker: "2026 年 6 月月報",
    title: "政策承諾書、道路分級與機車定位",
    summary:
      "6 月的重點是把公共論述拉高到道路分級與社會分配：人本交通不能只靠一句口號，也不能忽視城郊、照顧者、機車族與大眾運輸不足的現實。",
    sections: [
      {
        title: "公開議題推進",
        items: [
          "針對公路局新筆試題，提醒工程缺陷不能被包裝成用路人避險責任，題目設計應避免加劇機車與大型車衝突。",
          "針對選舉政策承諾書討論主要道路速限 30、低碳區、停車總量、TOD、社會住宅與公共運輸配套等前提。",
          "重新整理道路分級、主要道路、服務道路、城郊連結與機車定位，主張安全政策必須回到道路階層與實證研究。",
        ],
      },
      {
        title: "工作群協作",
        items: [
          "確認環境日與綠蔭人行道相關行動可掛名但不出席，延續「支持綠蔭，也守住行人通行安全」的立場。",
          "整理對外政策溝通策略：可提出聯盟自己的政策版本，或針對他團版本列出認同與質疑，降低敵意但保留專業界線。",
        ],
      },
      {
        title: "後續追蹤",
        items: [
          "下半年需決定是否另提更完整的人本交通政策版本，涵蓋行人、機車、公共運輸、城郊移動與居住正義。",
          "持續追蹤汽車筆試危險感知影片題、淡江大橋通車前後改善，以及機車安全實證研究缺口。",
        ],
      },
    ],
  },
};

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${visible.target.id}`,
      );
    });
  },
  { rootMargin: "-35% 0px -50% 0px", threshold: [0.12, 0.24, 0.4] },
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const renderReportSections = (sectionsData) => {
  dialogSections.replaceChildren();

  sectionsData.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "dialog-section";

    const heading = document.createElement("h3");
    heading.textContent = section.title;

    const list = document.createElement("ul");
    section.items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    });

    sectionElement.append(heading, list);
    dialogSections.append(sectionElement);
  });
};

const openMonthDialog = (monthKey, trigger) => {
  const report = monthReports[monthKey];
  if (!report || !monthDialog) return;

  activeMonthButton = trigger;
  dialogKicker.textContent = report.kicker;
  dialogTitle.textContent = report.title;
  dialogSummary.textContent = report.summary;
  renderReportSections(report.sections);
  document.body.classList.add("modal-open");
  monthDialog.showModal();
  closeDialogButton.focus();
};

const closeMonthDialog = () => {
  if (!monthDialog?.open) return;

  monthDialog.close();
};

monthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openMonthDialog(button.dataset.month, button);
  });
});

closeDialogButton?.addEventListener("click", closeMonthDialog);

monthDialog?.addEventListener("click", (event) => {
  if (event.target === monthDialog) closeMonthDialog();
});

monthDialog?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  activeMonthButton?.focus();
  activeMonthButton = null;
});
