/*
 * 竞赛雷达 · 数据源
 * 数据快照：2026-10-26
 *
 * 字段说明：
 * - level: A / B，对应图片中的竞赛分级
 * - cycle: 当前收录的届次与年份
 * - reg / event: { start, end, precision }
 *   precision: "day" | "month"，month 表示官方仅公布到月份
 * - regState: 可选的报名状态覆盖值（open / upcoming / closed / unknown）
 *   仅在官方没有给出统一报名起止日、但可以确认状态时使用
 * - status: official（官方已公布）/ reference（参考上届）/ unknown（待官网确认）
 *
 * 所有时间均尽量取自官方通知；没有官方日期的字段保持 null，不做推算。
 */
const DATA_UPDATED = "2026-10-26";

const CATEGORIES = ["创新创业", "学科基础", "信息技术", "设计艺术", "工程实践", "其他"];

/* 专业方向分组：用于“专业方向”筛选。
 * 条目可用 majors: [] 显式声明可参加的专业方向；
 * 未声明的旧条目按 CATEGORY_MAJOR 兜底映射。 */
const MAJOR_GROUPS = [
  "人工智能与数字技术",
  "婴幼儿托育与学前教育",
  "医护康养",
  "财经商贸",
  "旅游酒店",
  "工程与智能制造",
  "艺术与设计",
  "通用/跨专业"
];

const CATEGORY_MAJOR = {
  创新创业: "通用/跨专业",
  学科基础: "通用/跨专业",
  信息技术: "人工智能与数字技术",
  设计艺术: "艺术与设计",
  工程实践: "工程与智能制造",
  其他: "医护康养"
};

const COMPETITIONS = [
  {
    id: 1,
    name: "中国国际大学生创新大赛",
    short: "国创赛 · 互联网+",
    level: "A",
    category: "创新创业",
    organizer: "教育部等 12 部门",
    format: "团队 3–15 人",
    cycle: "2026 · 总决赛",
    content:
      "设高教主赛道、“青年红色筑梦之旅”赛道、职教赛道、产业赛道、萌芽赛道，覆盖新工科、新医科、新农科、新文科与人工智能等方向。以项目路演、答辩和商业计划评审为主。",
    site: "https://cy.ncss.cn",
    reg: { start: "2026-08-10", end: "2026-09-25", precision: "day" },
    event: { start: "2026-11-01", end: "2026-11-30", precision: "month" },
    schedule:
      "2026 年 8 月 10 日—9 月 25 日 12:00 报名；8—10 月校级初赛、省级复赛；全国总决赛 2026 年 11 月举行。",
    status: "official",
    note: "依据教育部教高函〔2026〕26 号及大赛官网；总决赛具体日期以官网后续通知为准。",
    sources: [
      { title: "教育部：关于举办 2026 年中国国际大学生创新大赛的通知", url: "http://www.moe.gov.cn/srcsite/A08/s5672/202607/t20260731_1445670.html" },
      { title: "中国国际大学生创新大赛官网", url: "https://cy.ncss.cn" }
    ]
  },
  {
    id: 2,
    name: "“挑战杯”全国大学生课外学术科技作品竞赛",
    short: "挑战杯 · 大挑",
    level: "A",
    category: "创新创业",
    organizer: "共青团中央、中国科协、教育部等",
    format: "团队 ≤10 人",
    cycle: "2025 · 第十九届（隔年举办）",
    content:
      "设自然科学类学术论文、哲学社会科学类社会调查报告、科技发明制作三大主体赛，另设“人工智能+”“揭榜挂帅”专项赛。",
    site: "https://2025.tiaozhanbei.net",
    reg: { start: null, end: "2025-06-26", precision: "day" },
    event: { start: "2025-10-31", end: "2025-11-03", precision: "day" },
    schedule:
      "第十九届全国终审决赛于 2025 年 10 月 31 日—11 月 3 日在南京大学举行；校赛、省赛由各校各省组织，作品上传典型截止 2025 年 6 月 26 日 18:00。",
    status: "reference",
    note: "“大挑”隔年举办，2026 年无届次，下一届为 2027 年；时间为 2025 年官方通知，供赛程规律参考。",
    sources: [
      { title: "第十九届“挑战杯”竞赛官网", url: "https://2025.tiaozhanbei.net" },
      { title: "新华社：第十九届“挑战杯”全国终审决赛举行", url: "http://www.news.cn/20251104/843a1f024bfc420fa8a58c474abb9e80/c.html" }
    ]
  },
  {
    id: 3,
    name: "“挑战杯”中国大学生创业计划竞赛",
    short: "挑战杯 · 小挑",
    level: "A",
    category: "创新创业",
    organizer: "共青团中央、教育部等",
    format: "团队 ≤15 人",
    cycle: "2026 · 第十五届",
    content:
      "设先进制造、新一代信息技术、生物医药与健康科技、新能源新材料、现代农业与食品科技、新消费与文化创意、现代服务与社会治理、国际交流合作 8 个赛道。",
    site: "https://www.tiaozhanbei.net",
    reg: { start: null, end: "2026-05-31", precision: "month" },
    event: { start: "2026-11-01", end: "2026-11-30", precision: "month" },
    schedule:
      "校级初赛 2026 年 5 月底前完成，省级复赛 6 月底前完成；全国决赛 2026 年 11 月前在大连理工大学举行。",
    status: "official",
    note: "无全国统一学生报名窗口，报名截止按校赛完成时间标注；全国决赛具体日期以官网为准。",
    sources: [
      { title: "天津工业大学：第十五届“挑战杯”创业计划竞赛通知", url: "https://tw.tiangong.edu.cn/2026/0611/c6344a115685/page.htm" },
      { title: "辽宁省：第十五届“挑战杯”竞赛预通知", url: "https://chuangxin.lnnu.edu.cn/info/1051/1541.htm" }
    ]
  },
  {
    id: 4,
    name: "ICPC 国际大学生程序设计竞赛",
    short: "ACM-ICPC · ICPC",
    level: "A",
    category: "信息技术",
    organizer: "ICPC Foundation / ICPC 亚洲区委员会",
    format: "团队 3 人 + 教练",
    cycle: "2026–2027 · 第 51 届",
    content:
      "三人一机、5 小时现场编程解题，考察算法设计、数据结构与代码实现能力。中国内地设西安、成都、武汉、南京、沈阳、上海、南昌等区域赛。",
    site: "https://icpc.global",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-10-17", end: "2027-01-28", precision: "day" },
    schedule:
      "西安 10/17—18、成都 10/24—25、武汉 10/31—11/1、南京 11/7—8、沈阳 11/14—15、上海 12/5—6、南昌 12/19—20；EC Final 2027 年 1 月 26—28 日杭州。",
    status: "official",
    note: "各区域赛独立报名，无全国统一报名窗口；报名时间与名额以各赛区通知为准。",
    sources: [
      { title: "ICPC 官网 · 区域赛日程", url: "https://icpc.global/regionals/event" },
      { title: "ICPC 北京总部：2026 亚洲区域赛通知", url: "https://icpc.pku.edu.cn/tzgg/f5516ebbc85f414a89224a1adf91a380.htm" }
    ]
  },
  {
    id: 5,
    name: "全国大学生数学建模竞赛",
    short: "国赛 · CUMCM",
    level: "A",
    category: "学科基础",
    organizer: "中国工业与应用数学学会",
    format: "团队 1–3 人",
    cycle: "2026",
    content:
      "72 小时通讯赛，从赛题中任选一题完成数学建模、求解与论文写作，分本科组和高职高专组。",
    site: "https://www.mcm.edu.cn",
    reg: { start: null, end: "2026-09-07", precision: "day" },
    event: { start: "2026-09-10", end: "2026-09-13", precision: "day" },
    schedule:
      "报名截止 2026 年 9 月 7 日 20:00；竞赛于 2026 年 9 月 10 日 18:00—9 月 13 日 20:00 举行。",
    status: "official",
    note: "官方通知未明确报名开始日；校内报名时间以本校通知为准。",
    sources: [
      { title: "全国大学生数学建模竞赛官网", url: "https://www.mcm.edu.cn" },
      { title: "2026 年竞赛官方通知（PDF）", url: "https://www.mcm.edu.cn/upload_cn/node/779/D3txF20S95f4041e22b41b4a1f9e0e22ac8a1389.pdf" }
    ]
  },
  {
    id: 6,
    name: "全国大学生电子设计竞赛",
    short: "电赛 · NUEDC",
    level: "A",
    category: "信息技术",
    organizer: "教育部、工业和信息化部",
    format: "团队 3 人",
    cycle: "2026 · 赛区赛 / 专题赛",
    content:
      "4 天 3 夜半封闭完成电子系统设计与制作；2026 年设赛区赛暨模拟电子系统设计专题赛选拔赛、模拟电子系统设计专题赛决赛。",
    site: "http://nuedc.xjtu.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-07-29", end: "2026-08-27", precision: "day" },
    schedule:
      "赛区赛 7 月 29 日 08:00—8 月 1 日 20:00；模拟电子系统设计专题赛决赛 8 月 23—27 日。",
    status: "official",
    note: "报名由各校、各赛区组织，无全国统一报名窗口；校赛选拔截止以本校通知为准。",
    sources: [
      { title: "全国大学生电子设计竞赛官网", url: "http://nuedc.xjtu.edu.cn" },
      { title: "2026 年赛区赛暨专题赛选拔赛通知", url: "https://www.nuedc-training.com.cn/index/news/details/new_id/351" }
    ]
  },
  {
    id: 7,
    name: "中国大学生医学技术技能大赛",
    short: "医学技术技能大赛",
    level: "B",
    category: "其他",
    organizer: "教育部（第十届）",
    format: "团队 · 校赛选拔",
    cycle: "2026 · 信息待确认",
    content:
      "设临床医学、中医学、护理学、预防医学等赛道，采用个人理论测试与团队多站式临床技能考核，使用标准化病人与仿真模型。",
    site: "https://medu.bjmu.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "2026 年全国组委会通知及全国总决赛时间尚未核实；部分高校已开展校内选拔（如常州大学报名截止 4 月 12 日）。",
    status: "unknown",
    note: "未检索到 2026 年全国组委会官方通知，时间、赛制与主办信息以大赛官网为准。",
    sources: [
      { title: "中国大学生医学技术技能大赛（第十届官网）", url: "https://medu.bjmu.edu.cn" },
      { title: "常州大学：2026 年校内选拔赛通知", url: "https://med.cczu.edu.cn/2026/0409/c18739a413101/page.htm" }
    ]
  },
  {
    id: 8,
    name: "全国大学生机械创新设计大赛",
    short: "机创赛",
    level: "B",
    category: "工程实践",
    organizer: "全国大学生机械创新设计大赛组委会",
    format: "团队 ≤5 人",
    cycle: "2026 · 第十二届",
    content:
      "主题“灵巧·智能，美好生活”。2026 年赛题为特定水产品初加工机械、叶菜洁净化处理包装一体化机械、高性能仿生蝴蝶。",
    site: "https://umic.moocollege.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-07-01", end: "2026-07-31", precision: "month" },
    schedule:
      "各赛区 5 月 10 日前完成预赛、5 月 20 日前报送结果；全国决赛 2026 年 7 月中下旬在哈尔滨工业大学举行。",
    status: "official",
    note: "无全国统一报名窗口，由学校组织校级选拔；决赛具体日期以官网通知为准。",
    sources: [
      { title: "第十二届全国大学生机械创新设计大赛官网", url: "https://umic.moocollege.com" },
      { title: "哈尔滨工业大学：第十二届大赛通知", url: "https://12umic.hit.edu.cn/2025/0321/c20012a364782/page.htm" }
    ]
  },
  {
    id: 9,
    name: "全国大学生结构设计竞赛",
    short: "结构设计竞赛",
    level: "B",
    category: "工程实践",
    organizer: "全国大学生结构设计竞赛委员会",
    format: "团队 3 人",
    cycle: "2026 · 第十九届",
    content:
      "以“勒勒车”为背景，10 小时内用指定竹材现场制作载货模型，并完成坡道、弯道、障碍运输测试与答辩。",
    site: "http://www.structurecontest.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-10-14", end: "2026-10-18", precision: "day" },
    schedule:
      "各省分区赛 4—7 月举行，8 月 18 日前提交参赛信息；全国总决赛 2026 年 10 月 14—18 日在内蒙古科技大学举行。",
    status: "official",
    note: "通过各省分区赛报名，报名时间与名额以各省通知为准。",
    sources: [
      { title: "全国大学生结构设计竞赛官网", url: "http://www.structurecontest.com" },
      { title: "第十九届竞赛通知（PDF）", url: "https://oss.moocollege.com/27834/edit/ef0XGrzi_1767498734584.pdf" }
    ]
  },
  {
    id: 10,
    name: "全国大学生广告艺术大赛",
    short: "大广赛",
    level: "B",
    category: "设计艺术",
    organizer: "教育部高教司指导；中国高等教育学会广告教育专委会等",
    format: "团队 2–5 人",
    cycle: "2026 · 第 18 届",
    content:
      "设平面、视频、动画、互动、广播、策划案、文案、UI、生成式 AI、营销创客、公益等单元，按命题创作并提交作品。",
    site: "https://www.sun-ada.net",
    reg: { start: "2026-05-10", end: "2026-06-12", precision: "day" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "作品线上提交 2026 年 5 月 10 日—6 月 12 日 16:00；各赛区 7 月 5 日前报送全国；全国总评审时间官网未明确。",
    status: "official",
    note: "全国总评审及颁奖日期以官网通知为准，因此比赛进程暂标为待公布。",
    sources: [
      { title: "全国大学生广告艺术大赛官网", url: "https://www.sun-ada.net" },
      { title: "第 18 届大赛参赛办法", url: "https://www.sun-ada.net/home/about_intrs2.html" }
    ]
  },
  {
    id: 11,
    name: "全国大学生智能汽车竞赛",
    short: "智能车竞赛",
    level: "B",
    category: "工程实践",
    organizer: "中国自动化学会",
    format: "团队 3–5 人",
    cycle: "2026 · 第二十一届",
    content:
      "设室内与室外赛道共 11 个竞赛项目，参赛队自主设计、制作智能车并完成竞速或任务挑战。",
    site: "http://www.smartcarrace.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-08-21", end: "2026-12-31", precision: "day" },
    schedule:
      "室内赛道分区赛 7—8 月，全国总决赛 2026 年 8 月 21—23 日在安徽大学；室外赛道区域赛 12 月上旬、总决赛 12 月底。",
    status: "official",
    note: "报名由各校组织（典型截止 6 月 20 日）；室外赛道日程以官网通知为准。",
    sources: [
      { title: "全国大学生智能汽车竞赛官网", url: "http://www.smartcarrace.com" },
      { title: "安徽大学：第二十一届全国总决赛举行", url: "https://www.ahu.edu.cn/2026/0831/c15129a399348/page.htm" }
    ]
  },
  {
    id: 12,
    name: "全国大学生电子商务“创新、创意及创业”挑战赛",
    short: "三创赛",
    level: "B",
    category: "创新创业",
    majors: ["财经商贸", "通用/跨专业"],
    organizer: "全国电子商务产教融合创新联盟、西安交通大学",
    format: "团队 3–5 人",
    cycle: "2026 · 第十六届",
    content:
      "设常规赛、实战赛与国际赛；实战赛覆盖跨境电商、直播电商、乡村振兴、商务大数据、文旅电商、AI 电商等方向。",
    site: "http://www.3chuang.net",
    reg: { start: "2025-10-13", end: "2026-01-20", precision: "day" },
    event: { start: "2026-07-10", end: "2026-11-10", precision: "month" },
    schedule:
      "报名 2025 年 10 月 13 日—2026 年 1 月 20 日；校赛 3 月 11 日—4 月 10 日，省赛 4 月 20 日—6 月 22 日，全国总决赛 7—11 月。",
    status: "official",
    note: "报名开始日期官网流程与通知存在 1 周差异；总决赛具体时间以官网为准。",
    sources: [
      { title: "三创赛官网", url: "http://www.3chuang.net" },
      { title: "西安交通大学：第十六届三创赛报名通知", url: "https://jwc.xjtu.edu.cn/info/1172/9891.htm" }
    ]
  },
  {
    id: 13,
    name: "中国大学生工程实践与创新能力大赛",
    short: "工创赛",
    level: "B",
    category: "工程实践",
    organizer: "教育部工程训练教学指导委员会",
    format: "团队 ≤4 人",
    cycle: "2027 · 第十届",
    content:
      "设工程实践、智能+工程创新、虚拟仿真 3 个赛道 9 个赛项，涵盖太阳能/生物质能电动车、智能搬运、智能分拣、智能救援、飞行器仿真等。",
    site: "http://www.gcxl.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2027-07-01", end: "2027-08-31", precision: "month" },
    schedule:
      "各校 2026 年 9—10 月陆续启动报名，2027 年 3 月前后完成校赛；各省 2027 年 5 月 10 日前完成复赛，全国决赛预计 2027 年 7—8 月。",
    status: "official",
    note: "2027 年第十届预通知已发布；无全国统一报名时间，部分高校 10 月底截止，以本校通知为准。",
    sources: [
      { title: "2027 年第十届工创赛预通知", url: "http://www.gcxl.edu.cn/new/match_news.html?_=aWQjPTE1NQ==" },
      { title: "武汉大学：2027 年工创赛校内选拔通知", url: "https://uc.whu.edu.cn/info/1517/128451.htm" }
    ]
  },
  {
    id: 14,
    name: "全国大学生物流设计大赛",
    short: "物流设计大赛",
    level: "B",
    category: "工程实践",
    organizer: "中国物流与采购联合会",
    format: "团队 5 人（本科组）",
    cycle: "2025 · 第九届（两年一届）",
    content:
      "以企业真实物流案例为赛题，完成物流方案设计、数据分析与优化，提交方案并答辩；设本科组与研究生组。",
    site: "http://dspt.clppx.org.cn/pkIndex/wlsj/wlsjdshome",
    reg: { start: "2025-04-08", end: "2025-04-29", precision: "day" },
    event: { start: "2025-05-01", end: "2025-08-28", precision: "day" },
    schedule:
      "第九届报名 2025 年 4 月 8 日—29 日 16:00；初赛 5—6 月、复赛 6—7 月、决赛 7—8 月。",
    status: "reference",
    note: "赛事两年一届，第十届通知尚未发布；以上为 2025 年第九届官方通知，下一届以官网为准。",
    sources: [
      { title: "第九届全国大学生物流设计大赛官网", url: "http://dspt.clppx.org.cn/pkIndex/wlsj/wlsjdshome" },
      { title: "第九届大赛通知（PDF）", url: "https://gs.shmtu.edu.cn/_upload/article/files/d6/b3/b1e664744d46ae937d058bcb27eb/5b659083-d4d7-4de5-84f3-f32b58271aa2.pdf" }
    ]
  },
  {
    id: 15,
    name: "“外研社·国才杯”“理解当代中国”全国大学生外语能力大赛",
    short: "外研社国才杯",
    level: "B",
    category: "学科基础",
    organizer: "北京外国语大学、外语教学与研究出版社",
    format: "个人为主（部分赛项可团队）",
    cycle: "2026",
    content:
      "设英语组、多语种组、国际中文组；英语组含国际传播综合能力、笔译、短视频、“四新”专项等，口译赛项隔年举办。",
    site: "https://ucc.fltrp.com",
    reg: { start: "2026-06-02", end: null, precision: "day" },
    regState: "closed",
    event: { start: "2026-10-11", end: "2026-12-31", precision: "month" },
    schedule:
      "报名页面 6 月 2 日开放；校赛 4—9 月完成，全国线上初赛 10 月 11 日、笔译省赛 10 月 31 日，全国决赛 12 月举行。",
    status: "official",
    note: "各校报名截止不一，当前报名已基本结束；口译赛项 2026 年不设、2027 年恢复。",
    sources: [
      { title: "2026 年大赛通知（PDF）", url: "https://www.gzcc.edu.cn/sjjxzx/upload/files/2026/9/fbe31067b158fa2c.pdf" },
      { title: "外研社国才杯官网", url: "https://ucc.fltrp.com" }
    ]
  },
  {
    id: 16,
    name: "两岸新锐设计竞赛·华灿奖",
    short: "华灿奖",
    level: "B",
    category: "设计艺术",
    organizer: "中国高等教育学会、中华中山文化交流协会",
    format: "个人/团队 ≤4 人",
    cycle: "2026",
    content:
      "设创意赛道与定向主题赛道，覆盖视觉传达、数字多媒体、产品、环境、时尚、工艺美术等，分高校学生组与青年设计师组。",
    site: "https://www.huacanjiang.com",
    reg: { start: "2026-10-19", end: "2026-11-27", precision: "day" },
    event: { start: "2027-03-01", end: "2027-05-31", precision: "month" },
    schedule:
      "作品征集截至 2026 年 11 月 27 日 17:00；校赛截至 12 月 29 日，赛区赛截至 2027 年 1 月 29 日；全国总决赛 2027 年 3—4 月，颁奖路演 5 月。",
    status: "official",
    note: "2026 年华灿奖通知于 9 月 1 日发布，报名平台 10 月 19 日开放。",
    sources: [
      { title: "2026 年华灿奖通知（PDF）", url: "https://www.sues.edu.cn/_upload/article/files/61/51/b6c496f64e4f99122d49dcf0c786/66013c0e-13fe-42ba-93d7-c7bfa8e64a97.pdf" },
      { title: "中国高等教育学会华灿奖专题", url: "https://www.cahe.edu.cn/site/term/906.html" }
    ]
  },
  {
    id: 17,
    name: "全国大学生创新创业训练计划年会",
    short: "大创年会",
    level: "B",
    category: "创新创业",
    organizer: "教育部高等教育司",
    format: "项目制 · 高校推荐",
    cycle: "2026 · 第十九届",
    content:
      "设大学生创新学术年会、创新创业改革成果展示、创业项目推介三大板块，面向当年结项的国家级大创项目，由高校遴选推荐。",
    site: "http://gjcxcy.bjtu.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-12-01", end: "2026-12-31", precision: "month" },
    schedule:
      "不设公开报名；各高校 10 月中旬前报送材料，第十九届年会 2026 年 12 月在西南交通大学举办。",
    status: "official",
    note: "各校材料报送截止不同，以本校教务部门通知为准。",
    sources: [
      { title: "国家级大学生创新创业训练计划平台", url: "http://gjcxcy.bjtu.edu.cn/NoticeBulletinList.aspx" },
      { title: "中央财经大学：第十九届年会项目推荐通知", url: "https://jwc.cufe.edu.cn/info/1101/8215.htm" }
    ]
  },
  {
    id: 18,
    name: "全国大学生化工设计竞赛",
    short: "化工设计大赛",
    level: "B",
    category: "工程实践",
    organizer: "中国化工学会、中国化工教育协会",
    format: "团队 5 人",
    cycle: "2026 · 第二十届",
    content:
      "每年给定化工产品与工艺命题，完成工艺路线选择、流程模拟、设备设计与选型、车间布置及经济分析，提交完整设计文档并答辩。",
    site: "http://iche.zju.edu.cn",
    reg: { start: "2026-03-01", end: "2026-03-31", precision: "day" },
    event: { start: "2026-08-12", end: "2026-08-17", precision: "day" },
    schedule:
      "报名 3 月 1—31 日（系统开放至 4 月 13 日）；作品 7 月 15 日前提交，赛区决赛 7 月 31 日前完成；全国总决赛 8 月 12—17 日。",
    status: "official",
    note: "报名通知截止 3 月 31 日，官网线上系统实际开放至 4 月 13 日。",
    sources: [
      { title: "第二十届全国大学生化工设计竞赛通知", url: "http://iche.zju.edu.cn/a/sstz/1656.html" }
    ]
  },
  {
    id: 19,
    name: "全国大学生机器人大赛（RoboMaster / ROBOCON）",
    short: "机甲大师 · ROBOCON",
    level: "B",
    category: "工程实践",
    organizer: "全国大学生机器人大赛组委会",
    format: "团队 · 按学校组队",
    cycle: "2027 · RoboMaster 2027 赛季",
    content:
      "含 RoboMaster 机甲大师系列与 ROBOCON 两大系列；自主设计制作机器人，在对抗赛或任务赛中比拼机械、电控与算法能力。",
    site: "https://www.robomaster.com",
    reg: { start: "2026-10-20", end: "2026-10-27", precision: "day" },
    event: { start: "2027-03-01", end: "2027-08-31", precision: "month" },
    schedule:
      "RoboMaster 2027 赛季报名 2026 年 10 月 20 日 15:00—10 月 27 日 15:00（RMUL 至 10 月 30 日）；区域赛 2027 年 3—6 月，总决赛 7—8 月；ROBOCON 2027 报名待发布。",
    status: "official",
    note: "当前为 2027 赛季报名期；ROBOCON 报名通知尚未发布，以官网为准。",
    sources: [
      { title: "RoboMaster 2027 赛季报名公告", url: "https://www.robomaster.com/zh-CN/resource/pages/announcement/1933" },
      { title: "全国大学生机器人大赛官网", url: "https://www.robomaster.com" }
    ]
  },
  {
    id: 20,
    name: "全国大学生市场调查与分析大赛",
    short: "市调大赛",
    level: "B",
    category: "学科基础",
    majors: ["财经商贸", "通用/跨专业"],
    organizer: "中国商业统计学会",
    format: "团队 3–5 人",
    cycle: "2027 · 第十七届",
    content:
      "围绕自选题目或企业命题完成调查方案设计、问卷设计、实地调查、统计分析与报告撰写，并参加答辩；设知识赛、校赛、省赛、总决赛。",
    site: "http://www.china-cssc.org",
    reg: { start: "2026-09-20", end: "2026-10-31", precision: "day" },
    event: { start: "2027-05-08", end: "2027-05-30", precision: "day" },
    schedule:
      "报名 2026 年 9 月 20 日—10 月 31 日（研究生组、留学生组可延至 11 月 15 日）；知识赛 11 月 1—20 日；校赛 2027 年 3 月 22 日前；全国总决赛 2027 年 5 月分三地举行。",
    status: "official",
    note: "总决赛：专科组 5 月 8—9 日、研究生/留学生组 5 月 15—16 日、本科组 5 月 29—30 日。",
    sources: [
      { title: "第十七届全国大学生市场调查与分析大赛通知", url: "http://www.china-cssc.org/show-304-2179-1.html" }
    ]
  },
  {
    id: 21,
    name: "全国大学生先进成图技术与产品信息建模创新大赛",
    short: "成图大赛 · 高教杯",
    level: "B",
    category: "工程实践",
    organizer: "中国图学学会等",
    format: "团队 · 每校每类 1 队",
    cycle: "2026 · 第十九届",
    content:
      "设机械、建筑、道桥、水利、电子、环艺 6 个类别，考察尺规绘图、计算机二维绘图与三维产品信息建模能力，并设国际赛道。",
    site: "http://www.chengtudasai.com",
    reg: { start: "2026-04-01", end: "2026-04-25", precision: "day" },
    event: { start: "2026-07-31", end: "2026-08-03", precision: "day" },
    schedule:
      "省赛报名 4 月 1 日 9:00—4 月 25 日 24:00；省赛 5 月 29—30 日；国赛报名 6 月 5—25 日，全国总决赛 7 月 31 日—8 月 3 日。",
    status: "official",
    note: "省赛、国赛两段报名，国赛需省赛晋级；以上为省赛报名窗口。",
    sources: [
      { title: "第十九届“高教杯”成图大赛第一轮通知", url: "https://jdxy.lzit.edu.cn/info/1230/6004.htm" }
    ]
  },
  {
    id: 22,
    name: "全国三维数字化创新设计大赛",
    short: "3D 大赛",
    level: "B",
    category: "设计艺术",
    organizer: "全国 3D 大赛组委会、国家制造业信息化培训中心等",
    format: "团队 3–7 人",
    cycle: "2026 · 第 19 届",
    content:
      "设数字工业设计、数字人居设计、数字文化设计、元宇宙创建等开放赛项及产业应用赛项，提交三维设计作品并答辩。",
    site: "http://3dds.3ddl.net",
    reg: { start: "2026-04-03", end: "2026-06-30", precision: "day" },
    event: { start: "2026-11-01", end: "2026-12-31", precision: "month" },
    schedule:
      "初赛报名 4 月 3 日—6 月 30 日，作品提交截至 7 月 20 日；复赛/省赛 8—10 月；全国总决赛 2026 年 11—12 月。",
    status: "official",
    note: "作品提交截止早于报名截止，需注意时间节点；总决赛具体日期以官网为准。",
    sources: [
      { title: "2026 第 19 届全国 3D 大赛通知", url: "http://3dds.3ddl.net/index.php?ctl=Informationlist&id=696&met=details" }
    ]
  },
  {
    id: 23,
    name: "“西门子杯”中国智能制造挑战赛",
    short: "CIMC · 西门子杯",
    level: "B",
    category: "工程实践",
    organizer: "中国仿真学会、西门子（中国）",
    format: "团队 1–3 人",
    cycle: "2026 · 第二十届",
    content:
      "面向智能制造工程设计与应用，围绕工业自动化、数字化与智能装备完成方案设计、仿真与实操调试，并答辩评审。",
    site: "http://www.siemenscup-cimc.org.cn",
    reg: { start: "2026-03-01", end: "2026-05-31", precision: "day" },
    event: { start: "2026-07-20", end: "2026-08-31", precision: "month" },
    schedule:
      "报名 3 月 1 日—5 月 31 日；方案提交 6 月 6—30 日；全国初赛 7 月 20 日开赛，全国总决赛 8 月举行。",
    status: "official",
    note: "具体赛项、初赛承办院校及总决赛时间地点以官网正式通知为准。",
    sources: [
      { title: "2026 年第二十届 CIMC 参赛流程", url: "http://www.siemenscup-cimc.org.cn/joinflow/index" },
      { title: "CIMC 大赛官网", url: "http://www.siemenscup-cimc.org.cn" }
    ]
  },
  {
    id: 24,
    name: "中国大学生服务外包创新创业大赛",
    short: "服创大赛",
    level: "B",
    category: "创新创业",
    organizer: "教育部、商务部、无锡市人民政府",
    format: "团队 ≤5 人",
    cycle: "2026 · 第十七届",
    content:
      "设企业命题（A 类）、创业实践（B 类）、OPC 创客（C 类）、人工智能专项（D 类）四个类别，围绕真实产业命题完成方案、开发与答辩。",
    site: "http://www.fwwb.org.cn",
    reg: { start: "2026-02-11", end: "2026-03-20", precision: "day" },
    event: { start: "2026-08-20", end: "2026-08-22", precision: "day" },
    schedule:
      "报名 2 月 11 日—3 月 20 日 16:00；初赛作品 4 月 4—8 日提交；区域赛 5—6 月；全国总决赛 8 月 20—22 日在无锡。",
    status: "official",
    note: "报名曾发布延长通知；具体节点以官网为准。",
    sources: [
      { title: "中国大学生服务外包创新创业大赛官网", url: "http://www.fwwb.org.cn" },
      { title: "关于延长第十七届服创大赛报名时间的通知", url: "http://www.fwwb.org.cn/news/show/609" }
    ]
  },
  {
    id: 25,
    name: "中国大学生计算机设计大赛",
    short: "4C 大赛",
    level: "B",
    category: "信息技术",
    organizer: "中国大学生计算机设计大赛组委会",
    format: "团队 2–9 人",
    cycle: "2026 · 第 19 届",
    content:
      "设软件应用与开发、物联网、大数据、人工智能、信息可视化、数媒设计、计算机音乐等 11 大类，作品经校赛、省赛选拔进入全国决赛。",
    site: "https://jsjds.blcu.edu.cn",
    reg: { start: null, end: "2026-05-30", precision: "day" },
    event: { start: "2026-07-17", end: "2026-08-20", precision: "day" },
    schedule:
      "校赛、省赛 3—5 月由各校组织；国赛平台作品信息填报截止 5 月 30 日；全国决赛 7 月 17 日—8 月 20 日分 6 个赛区举行。",
    status: "official",
    note: "无全国统一报名起止日，各校报名时间不同；截止日为全国平台填报截止。",
    sources: [
      { title: "中国大学生计算机设计大赛官网", url: "https://jsjds.blcu.edu.cn" },
      { title: "2026 年大赛通知及决赛区安排", url: "https://jsjds.blcu.edu.cn/info/1042/2294.htm" }
    ]
  },
  {
    id: 26,
    name: "中国高校计算机大赛（C4）",
    short: "大数据 · 天梯赛 · 移动应用 · 网络技术",
    level: "B",
    category: "信息技术",
    organizer: "全国高等学校计算机教育研究会",
    format: "团队 · 各子赛事不同",
    cycle: "2026",
    content:
      "含大数据挑战赛、团体程序设计天梯赛、移动应用创新赛、网络技术挑战赛四个子赛事，分别聚焦数据建模、团体编程、移动开发与网络攻防。",
    site: "http://www.c4best.cn",
    reg: { start: "2026-03-04", end: "2026-07-15", precision: "day" },
    event: { start: "2026-04-18", end: "2026-11-30", precision: "month" },
    schedule:
      "网络技术挑战赛报名 3 月 4 日—4 月 14 日；天梯赛 4 月 18 日；移动应用创新赛初赛 6 月 30 日截止、11 月决赛；大数据挑战赛 7 月 15 日报名截止、8 月决赛。",
    status: "official",
    note: "四个子赛事独立报名、独立评奖；时间为各子赛事汇总。",
    sources: [
      { title: "中国高校计算机大赛官网", url: "http://www.c4best.cn" },
      { title: "大数据挑战赛官网", url: "https://nercbds.tsinghua.edu.cn/bdc.html" }
    ]
  },
  {
    id: 27,
    name: "蓝桥杯全国软件和信息技术专业人才大赛",
    short: "蓝桥杯",
    level: "B",
    category: "信息技术",
    organizer: "蓝桥杯大赛组委会（中国软件行业协会指导）",
    format: "个人赛",
    cycle: "2027 · 第十八届",
    content:
      "设软件赛、电子赛、人工智能赛、视觉艺术设计赛、数字科技创新赛等，个人参赛，按省赛、全国总决赛两级选拔。",
    site: "https://dasai.lanqiao.cn",
    reg: { start: "2026-10-08", end: "2026-12-18", precision: "day" },
    event: { start: "2027-04-01", end: "2027-06-30", precision: "month" },
    schedule:
      "第十八届报名 2026 年 10 月 8 日—12 月 18 日 14:00；省赛 2027 年 4 月，全国总决赛 2027 年 6 月。",
    status: "official",
    note: "报名时间依据官网及高校转发通知；具体科目比赛日期以官网为准。",
    sources: [
      { title: "蓝桥杯大赛官网", url: "https://dasai.lanqiao.cn" },
      { title: "第十八届蓝桥杯报名通知", url: "https://dasai.lanqiao.cn/notices/1829" }
    ]
  },
  {
    id: 28,
    name: "米兰设计周——中国高校设计学科师生优秀作品展",
    short: "米兰设计周",
    level: "B",
    category: "设计艺术",
    organizer: "中国教育国际交流协会、中国高等教育学会",
    format: "个人/团队 ≤5 人",
    cycle: "2026 · 第十届",
    content:
      "设专项赛场、命题赛场、非命题赛场，覆盖视觉传达、环境设计、产品设计、数字媒体、服装服饰等门类，面向高校师生征集作品。",
    site: "https://www.milan-aap.org.cn",
    reg: { start: null, end: "2026-04-10", precision: "day" },
    event: { start: "2026-04-01", end: "2026-08-31", precision: "month" },
    schedule:
      "线上报名 2025 年 10 月启动，多数院校作品提交截止 2026 年 4 月 10 日；4—5 月省赛评审、5—6 月国赛评审、7—8 月学术活动与颁奖。",
    status: "official",
    note: "第十一届已于 2026 年 10 月 10 日启动，新一轮报名时间以官网为准。",
    sources: [
      { title: "米兰设计周大赛官网", url: "https://www.milan-aap.org.cn" },
      { title: "2026 第十届大赛宣讲", url: "https://www.milan-aap.org.cn/#/article/4424" }
    ]
  },
  {
    id: 29,
    name: "全国大学生地质技能竞赛",
    short: "地质技能大赛",
    level: "B",
    category: "学科基础",
    organizer: "中国地质学会",
    format: "团队 3 人",
    cycle: "2026 · 第八届（两年一届）",
    content:
      "设地质技能综合应用、野外地质技能（含 AI 赛道）、地质标本鉴定、地学知识竞赛等赛项，重点考查地质基础理论与野外实践能力。",
    site: "https://www.geosociety.org.cn",
    reg: { start: null, end: "2026-05-10", precision: "day" },
    event: { start: "2026-08-26", end: "2026-08-28", precision: "day" },
    schedule:
      "意向报名表 5 月 10 日前提交、决赛报名材料 6 月 10 日前提交；8 月 25 日报到，8 月 26—28 日在西南石油大学决赛。",
    status: "official",
    note: "两年一届，无全国统一网上报名起始日；截止日为依据官方通知的意向报名截止。",
    sources: [
      { title: "第八届全国大学生地质技能竞赛一号通知（PDF）", url: "https://geosociety.org.cn/upload/pdf/notice/20260421094954_28.pdf" },
      { title: "中国地质学会官网", url: "https://www.geosociety.org.cn" }
    ]
  },
  {
    id: 30,
    name: "全国大学生光电设计竞赛",
    short: "光电设计竞赛",
    level: "B",
    category: "工程实践",
    organizer: "中国光学学会",
    format: "团队 ≤7 人",
    cycle: "2026 · 第十四届",
    content:
      "设创意设计赛道（创意组、初创组）与“宇瞳杯”光学设计赛道，围绕光电系统与光学设计命题完成方案、实物与答辩。",
    site: "http://gd.moocollege.com",
    reg: { start: null, end: "2026-05-15", precision: "day" },
    event: { start: "2026-06-01", end: "2026-06-30", precision: "month" },
    schedule:
      "区赛 2026 年 5 月底前完成（如西北区报名截止 5 月 15 日）；全国决赛 2026 年 6 月下旬在长春理工大学举行。",
    status: "official",
    note: "第十五届通知已于 2026 年 10 月发布，新一轮时间以官网为准。",
    sources: [
      { title: "全国大学生光电设计竞赛官网", url: "http://gd.moocollege.com" },
      { title: "第十四届全国大学生光电设计竞赛通知（PDF）", url: "https://jsgl.htu.edu.cn/uploads/annex/2026/01/19/1768809016644_FzYLbCS6M4.pdf" }
    ]
  },
  {
    id: 31,
    name: "全国大学生集成电路创新创业大赛",
    short: "集创赛",
    level: "B",
    category: "工程实践",
    organizer: "工业和信息化部人才交流中心",
    format: "团队 1–3 人",
    cycle: "2026 · 第十届",
    content:
      "以企业杯赛形式设置芯片设计、芯片应用、半导体产业链、创新创业成果等赛项，分 A 组（本科及以下）与 B 组（含研究生）。",
    site: "http://www.ciciec.com",
    reg: { start: null, end: "2026-03-31", precision: "day" },
    event: { start: "2026-07-01", end: "2026-07-31", precision: "month" },
    schedule:
      "2026 年 1 月启动报名，3 月 31 日截止；5 月 7 日前提交初赛作品；6—7 月分赛区决赛，7 月下旬全国总决赛（拟）。",
    status: "official",
    note: "报名开始日官方仅表述为“2026 年 1 月”；总决赛为拟定时间，以官网为准。",
    sources: [
      { title: "第十届集创赛正式通知", url: "http://www.ciciec.com/nd.jsp?id=1037" },
      { title: "全国大学生集成电路创新创业大赛官网", url: "http://www.ciciec.com" }
    ]
  },
  {
    id: 32,
    name: "全国大学生金相技能大赛",
    short: "金相大赛",
    level: "B",
    category: "工程实践",
    organizer: "教育部材料类专业教学指导委员会（指导）",
    format: "个人为主 · 团队赛道",
    cycle: "2026 · 第十五届",
    content:
      "设实验技能赛道（金相试样制备与显微组织观察）、综合分析赛道、创新应用赛道，考查材料学科实验技能与综合分析能力。",
    site: "https://www.jxds.tech",
    reg: { start: null, end: "2026-03-31", precision: "day" },
    event: { start: "2026-07-26", end: "2026-07-29", precision: "day" },
    schedule:
      "第十五届报名截止 2026 年 3 月 31 日 18:00；经校赛、省赛选拔，第一赛道全国决赛 7 月 26—29 日在武汉理工大学举行。",
    status: "official",
    note: "第二、第三赛道决赛日期官网未明确；第十六届报名截止 2027 年 3 月 26 日。",
    sources: [
      { title: "全国大学生金相技能大赛官网", url: "https://www.jxds.tech" },
      { title: "第十五届全国大学生金相技能大赛通知（PDF）", url: "https://cdn.jxds.tech/files/20251104/%E5%85%B3%E4%BA%8E%E4%B8%BE%E5%8A%9E%E7%AC%AC%E5%8D%81%E4%BA%94%E5%B1%8A%E5%85%A8%E5%9B%BD%E5%A4%A7%E5%AD%A6%E7%94%9F%E9%87%91%E7%9B%B8%E6%8A%80%E8%83%BD%E5%A4%A7%E8%B5%9B%E7%9A%84%E9%80%9A%E7%9F%A5.pdf" }
    ]
  },
  {
    id: 33,
    name: "全国大学生信息安全竞赛",
    short: "信安大赛 · CISCN",
    level: "B",
    category: "信息技术",
    organizer: "教育部网络空间安全专业教学指导委员会",
    format: "团队 ≤4 人",
    cycle: "2026 · 第十九届",
    content:
      "设作品赛（暨“长城杯”网数智安全大赛）与创新实践能力赛等赛道，提交网络安全作品并答辩，覆盖漏洞挖掘、防护与安全应用。",
    site: "http://www.ciscn.cn",
    reg: { start: "2026-05-29", end: "2026-07-05", precision: "day" },
    event: { start: "2026-08-20", end: "2026-08-22", precision: "day" },
    schedule:
      "作品赛报名及作品提交 2026 年 5 月 29 日—7 月 5 日 24:00；全国决赛 8 月 20—22 日在哈尔滨工业大学举行。",
    status: "official",
    note: "不允许跨校组队；各赛道具体安排以官方通知为准。",
    sources: [
      { title: "全国大学生信息安全竞赛官网", url: "http://www.ciscn.cn" },
      { title: "电子科技大学：第十九届信安大赛报名通知", url: "https://www.scse.uestc.edu.cn/info/1020/18444.htm" }
    ]
  },
  {
    id: 34,
    name: "未来设计师·全国高校数字艺术设计大赛",
    short: "NCDA",
    level: "B",
    category: "设计艺术",
    organizer: "未来设计师大赛组委会",
    format: "个人/团队 ≤6 人",
    cycle: "2026 · 第 14 届",
    content:
      "设非命题、命题、公益、创新创业等赛道，涵盖视觉传达、动画、交互、数字影像、环境设计等门类，按校赛、省赛、国赛三级评审。",
    site: "https://www.ncda.org.cn",
    reg: { start: null, end: "2026-06-20", precision: "day" },
    event: { start: "2026-07-01", end: "2026-08-26", precision: "day" },
    schedule:
      "报名及作品提交截止 2026 年 6 月 20 日；校赛 6 月 20—25 日，省赛 7 月 1 日—8 月 8 日，全国赛 8 月 9—26 日；颁奖 11 月（暂定）。",
    status: "official",
    note: "官方未设统一报名开始日，各校内部截止可能提前。",
    sources: [
      { title: "未来设计师 NCDA 大赛官网", url: "https://www.ncda.org.cn" },
      { title: "长沙学院：2026 年 NCDA 大赛通知", url: "http://ysxy.ccsu.cn/info/1017/29251.htm" }
    ]
  },

  /* ---------------- 人工智能与数字技术 ---------------- */

  {
    id: 35,
    name: "世界职业院校技能大赛 · 人工智能赛道",
    short: "世校赛 · 人工智能",
    level: "A",
    category: "信息技术",
    majors: ["人工智能与数字技术", "通用/跨专业"],
    organizer: "教育部等（世界职业院校技能大赛组委会）",
    format: "团队 · 不限专业",
    cycle: "2026 · 争夺赛（已完赛）",
    content:
      "世校赛按赛道组织。人工智能赛道以团队形式完成数据采集与处理、模型训练与调优、智能应用部署等真实场景任务，并进行现场展示与答辩。",
    site: "https://www.vcsc.org.cn",
    reg: { start: null, end: null, precision: "unknown" },
    regState: "closed",
    event: { start: "2026-09-01", end: "2026-09-30", precision: "month" },
    schedule:
      "依据教育部《2026 年世界职业院校技能大赛实施方案》，2026 年共设 43 个赛道，争夺赛须于 9 月底前完成；排位赛不含人工智能赛道。",
    status: "official",
    note:
      "人工智能赛道、中华传统技艺赛道参赛对象不限专业，普通高中、普通本科在校生亦可参加；2027 年赛道设置与报名时间待新方案发布。竞赛级别按本校认定目录核定。",
    sources: [
      { title: "教育部：2026 年世界职业院校技能大赛实施方案", url: "http://www.moe.gov.cn/srcsite/A07/s7055/202608/t20260820_1447374.html" },
      { title: "世界职业院校技能大赛官网", url: "https://www.vcsc.org.cn" }
    ]
  },
  {
    id: 36,
    name: "金砖国家职业技能大赛 · 人工智能类赛项",
    short: "金砖大赛 · AI",
    level: "B",
    category: "信息技术",
    majors: ["人工智能与数字技术"],
    organizer: "金砖国家职业技能大赛组委会",
    format: "2–3 人团队",
    cycle: "2026 · 第十届",
    content:
      "2026 年设 BRICS-FS-56 人工智能技术应用（2 人赛）、BRICS-FS-57 人工智能多模态与电子设计技术（3 人赛）、BRICS-FS-58 人工智能应用创新（2 人赛），以任务书驱动，考核模型训练、多模态处理与行业应用方案设计。",
    site: "https://www.brskills.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "第十届赛项清单已公布，各赛项报名与国内选拔时间由组委会及各省分批通知，报名通过金砖国家职业技能大赛报名平台提交。",
    status: "official",
    note:
      "公开通知中尚未统一给出各赛项比赛日期，请在国内选拔通知发布后报名；竞赛级别按本校认定目录核定。",
    sources: [
      { title: "金砖国家职业技能大赛公告", url: "http://www.brskills.com" },
      { title: "金砖国家职业技能大赛报名平台", url: "https://www.bricsacademy.org.cn/signup/index" }
    ]
  },
  {
    id: 37,
    name: "华为 ICT 大赛",
    short: "华为 ICT · 第十一届",
    level: "B",
    category: "信息技术",
    majors: ["人工智能与数字技术"],
    organizer: "华为技术有限公司",
    format: "个人/团队 · 校赛选拔",
    cycle: "2026—2027 · 第十一届",
    content:
      "设网络、云、计算（含人工智能方向）等赛道，分实践赛与创新赛，按校赛、省赛、中国总决赛、全球总决赛逐级晋级。",
    site: "https://e.huawei.com/cn/talent/ict-academy/#/ict-contest",
    reg: { start: "2026-08-31", end: "2026-10-31", precision: "day" },
    event: { start: "2026-11-01", end: "2026-12-31", precision: "month" },
    schedule:
      "2026 年 8 月 31 日—10 月 31 日报名；省赛 2026 年 11—12 月；中国总决赛 2027 年 3 月。",
    status: "official",
    note: "报名由各校华为 ICT 学院/相关二级学院组织，校内选拔截止时间通常早于全国报名截止日。",
    sources: [
      { title: "华为 ICT 大赛官网", url: "https://e.huawei.com/cn/talent/ict-academy/#/ict-contest" },
      { title: "西安交通大学：2026—2027 华为 ICT 大赛报名通知", url: "https://se.xjtu.edu.cn/info/1043/4027.htm" }
    ]
  },
  {
    id: 38,
    name: "四川省职业院校技能大赛（高职组）",
    short: "四川省赛",
    level: "B",
    category: "其他",
    majors: ["人工智能与数字技术", "婴幼儿托育与学前教育", "医护康养", "通用/跨专业"],
    organizer: "四川省教育厅",
    format: "团队 · 校赛选拔",
    cycle: "2026 · 赛项待公布",
    content:
      "省级职业院校技能大赛，按赛道（组）设置赛项，覆盖人工智能技术应用、婴幼儿照护、健康养老与婴幼儿托育、护理、电子商务等方向；省赛优胜队伍由省教育厅推荐参加世界职业院校技能大赛。",
    site: "https://sicsve.cdp.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "2026 年 10 月，四川省教育厅启动 2026 年省赛赛道（组）承办申报，各赛项报名与比赛时间由承办院校陆续发布。2025 年省赛“健康养老与婴幼儿托育”赛道高职组于 2026 年 1 月 13—15 日在川南幼儿师范高等专科学校举行。",
    status: "reference",
    note:
      "省赛赛项每年调整，报名一般由本校教务处或二级学院统一组织，务必关注学校通知；竞赛级别按本校认定目录核定。",
    sources: [
      { title: "四川职业教育技能创新中心 · 通知公告", url: "https://sicsve.cdp.edu.cn/go-a262.htm" },
      { title: "2025 年四川省职业院校技能大赛健康养老与婴幼儿托育赛道通知（PDF）", url: "https://sicsve.cdp.edu.cn/webapp/accessory/ueditor/sicsve.cdp.edu.cn/upload/file/2026-01-02/1767323850980088554.pdf" }
    ]
  },

  /* ---------------- 通用 / 跨专业 ---------------- */

  {
    id: 39,
    name: "全国大学生职业规划大赛",
    short: "职业规划大赛",
    level: "A",
    category: "创新创业",
    majors: ["通用/跨专业"],
    organizer: "教育部",
    format: "个人 · 校赛—省赛—全国总决赛",
    cycle: "2026—2027 · 第四届",
    content:
      "设成长赛道与就业赛道，成长赛道分高教组、职教组，提交生涯发展报告或求职简历并现场展示答辩，考查职业目标设定、学习实践行动与岗位胜任力。",
    site: "https://zgs.chsi.com.cn",
    reg: { start: null, end: "2027-01-03", precision: "day" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "教育部 2026 年 10 月 10 日印发通知；报名期 2026 年 10 月—2027 年 1 月，各校截止时间不晚于 2027 年 1 月 3 日；校赛、省赛、全国总决赛依次进行。",
    status: "official",
    note:
      "成长赛道职教组面向职教本科、高职（专科）非毕业年级学生，大一即可参加；报名通过全国大学生职业规划大赛平台提交。",
    sources: [
      { title: "教育部：关于举办第四届全国大学生职业规划大赛的通知", url: "https://hudong.moe.gov.cn/srcsite/A15/s7063/202610/t20261010_1453481.html" },
      { title: "全国大学生职业规划大赛平台", url: "https://zgs.chsi.com.cn" }
    ]
  },

  /* ---------------- 婴幼儿托育与学前教育 ---------------- */

  {
    id: 40,
    name: "世界职业院校技能大赛 · 健康养老与婴幼儿托育赛道",
    short: "世校赛 · 托育",
    level: "A",
    category: "其他",
    majors: ["婴幼儿托育与学前教育", "医护康养"],
    organizer: "教育部等（世界职业院校技能大赛组委会）",
    format: "团队 · 省赛推荐",
    cycle: "2026 · 争夺赛（已完赛）",
    content:
      "面向健康养老与婴幼儿托育领域，考核婴幼儿生活照料、回应性照护、卫生保健与早期发展支持，以及老年照护等综合职业技能。",
    site: "https://www.vcsc.org.cn",
    reg: { start: null, end: null, precision: "unknown" },
    regState: "closed",
    event: { start: "2026-09-26", end: "2026-09-30", precision: "day" },
    schedule:
      "2026 年 9 月 26—30 日举行争夺赛：高职 1 组在湖南民族职业学院，高职 3 组与中职 1 组在长沙民政职业技术学院。",
    status: "official",
    note:
      "参赛名额由各省按省赛成绩推荐，需先通过本校选拔并在省赛取得名次；2027 年安排待新方案发布。竞赛级别按本校认定目录核定。",
    sources: [
      { title: "教育部：2026 年世界职业院校技能大赛实施方案", url: "http://www.moe.gov.cn/srcsite/A07/s7055/202608/t20260820_1447374.html" },
      { title: "世界职业院校技能大赛官网", url: "https://www.vcsc.org.cn" }
    ]
  },
  {
    id: 41,
    name: "世界职业院校技能大赛 · 教育与体育赛道",
    short: "世校赛 · 教育与体育",
    level: "A",
    category: "其他",
    majors: ["婴幼儿托育与学前教育"],
    organizer: "教育部等（世界职业院校技能大赛组委会）",
    format: "团队 · 4 人",
    cycle: "2026 · 争夺赛（已完赛）",
    content:
      "面向教育与体育类专业，以团队形式完成教学活动设计与实施、专业技能展示和现场答辩，考查保教实践与团队协作能力。",
    site: "https://www.vcsc.org.cn",
    reg: { start: null, end: null, precision: "unknown" },
    regState: "closed",
    event: { start: "2026-09-24", end: "2026-09-29", precision: "day" },
    schedule:
      "2026 年 9 月 24—29 日在昆明幼儿师范高等专科学校举行，300 余支队伍参赛。",
    status: "official",
    note:
      "泸州职业技术学院学前教育团队在该赛道获平行组第一、金奖并晋级排位赛（据院校公开报道）；2027 年安排待新方案发布。",
    sources: [
      { title: "教育部：2026 年世界职业院校技能大赛实施方案", url: "http://www.moe.gov.cn/srcsite/A07/s7055/202608/t20260820_1447374.html" },
      { title: "世界职业院校技能大赛官网", url: "https://www.vcsc.org.cn" }
    ]
  },
  {
    id: 42,
    name: "“慧爱杯”全国职业院校托幼职业技能竞赛",
    short: "慧爱杯 · 托幼技能",
    level: "B",
    category: "其他",
    majors: ["婴幼儿托育与学前教育"],
    organizer: "中国人口学会（指导）· 全国托育产教融合共同体",
    format: "高职学生 3 人团体 / 教师个人",
    cycle: "2025—2026 · 第三届（第四届待通知）",
    content:
      "设高职学生赛（3 人团体，覆盖婴幼儿照护、早期发展支持与托育机构实务）与教师数字职业素养赛，采用实操与方案展示结合的方式评审。",
    site: "https://www.ncec.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2025-12-05", end: "2025-12-07", precision: "day" },
    schedule:
      "第三届于 2025 年 12 月 5—7 日在湖北幼儿师范高等专科学校举行；第四届通知尚未发布。",
    status: "reference",
    note:
      "第四届时间未公布，按往届节奏一般在下半年启动报名；属行业赛，报名方式与费用以组委会通知为准。",
    sources: [
      { title: "湖北幼儿师范高等专科学校：第三届“慧爱杯”竞赛", url: "https://www.ncec.edu.cn/2025/1212/c40a18599/page.htm" },
      { title: "河北新闻网：“慧爱杯”托幼职业技能竞赛", url: "https://hbxw.hebnews.cn/news/573751.html" }
    ]
  },
  {
    id: 43,
    name: "金砖国家职业技能大赛 · 幼儿照护赛项",
    short: "金砖大赛 · 幼儿照护",
    level: "B",
    category: "其他",
    majors: ["婴幼儿托育与学前教育"],
    organizer: "金砖国家职业技能大赛组委会",
    format: "团队 · 校赛选拔",
    cycle: "2026 · 第四届",
    content:
      "围绕婴幼儿生活照料、卫生保健、安全照护、早期发展支持与照护方案设计设置任务，考核托育服务人员的综合实操能力。",
    site: "https://www.brskills.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "第四届国内选拔由各校先行遴选，南昌健康职业技术学院校内遴选于 2026 年 9 月 20 日截止；后续赛程以组委会通知为准。",
    status: "reference",
    note: "须经本校遴选推荐，个人无法直接报名；具体赛期以金砖大赛报名平台公告为准。",
    sources: [
      { title: "金砖国家职业技能大赛公告", url: "http://www.brskills.com" },
      { title: "金砖国家职业技能大赛报名平台", url: "https://www.bricsacademy.org.cn/signup/index" }
    ]
  },
  {
    id: 44,
    name: "全国幼儿教师专业基本功比赛",
    short: "幼儿教师基本功",
    level: "B",
    category: "其他",
    majors: ["婴幼儿托育与学前教育"],
    organizer: "全国幼儿教师专业基本功比赛组委会",
    format: "个人 · 作品评审",
    cycle: "2026 · 第十届",
    content:
      "设教学活动设计、玩教具制作、绘画手工、舞蹈声乐、教育随笔等项目，以作品视频与文字材料提交、专家评审为主。",
    site: "http://www.bjxqjy.com.cn",
    reg: { start: "2026-09-08", end: null, precision: "day" },
    regState: "open",
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "第九届作品截止 2026 年 4 月 22 日；第十届作品征选通知于 2026 年 9 月 8 日发布，具体截止日期以官网为准。",
    status: "official",
    note:
      "行业赛事，通常收取评审费；适合积累作品与证书，是否计入本校认定加分以学校规定为准。",
    sources: [
      { title: "全国幼儿教师专业基本功比赛 · 活动公告", url: "http://www.bjxqjy.com.cn/hdgc?nav_id=132" }
    ]
  },
  {
    id: 45,
    name: "大蜀道职业院校技能大赛 · 婴幼儿照护赛项",
    short: "大蜀道 · 婴幼儿照护",
    level: "B",
    category: "其他",
    majors: ["婴幼儿托育与学前教育"],
    organizer: "广元市教育局、广元市人力资源和社会保障局",
    format: "团队 3 人",
    cycle: "2026 · 第四届（已完赛）",
    content:
      "设 A 婴幼儿回应性照护、B 婴幼儿健康照护（保健抚触、气道异物梗阻急救）、C 婴幼儿早期发展支持（亲子活动方案设计与展示）三个模块。",
    site: "https://xqjyx.cbyz.edu.cn",
    reg: { start: null, end: null, precision: "unknown" },
    regState: "closed",
    event: { start: "2026-10-21", end: "2026-10-22", precision: "day" },
    schedule:
      "第四届于 2026 年 10 月 21—22 日在川北幼儿师范高等专科学校举行，为大赛 21 个赛项之一，9 所学校 13 支队伍 39 名选手参赛。",
    status: "official",
    note: "区域（跨市）赛事，一般由院校组队报名，个人参赛需通过本校选拔；下一届时间待通知。",
    sources: [
      { title: "川北幼儿师范高等专科学校：第四届大蜀道婴幼儿照护赛项", url: "https://xqjyx.cbyz.edu.cn/info/26102223190578898" }
    ]
  },

  /* ---------------- 其他专业方向 ---------------- */

  {
    id: 46,
    name: "全国大学生英语竞赛（NECCS）",
    short: "NECCS · D 类",
    level: "B",
    category: "学科基础",
    majors: ["通用/跨专业"],
    organizer: "高等学校大学外语教学研究会、高等学校大学外语教学指导委员会",
    format: "个人 · 笔试（含听力）",
    cycle: "2027 · 待通知（2026 已结束）",
    content:
      "分 A（研究生）、B（英语专业本科）、C（非英语专业本科）、D（体育、艺术及高职高专）四类，D 类适合高职高专学生，考查听力、词汇、阅读、翻译与写作。",
    site: "https://neccs.saikr.com",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: null, end: null, precision: "unknown" },
    schedule:
      "2026 年报名期为 2025 年 12 月 17 日—2026 年 3 月 13 日，省赛报名费 50 元；下一届报名通常在前一年 12 月启动，以官网通知为准。",
    status: "reference",
    note: "报名由本校外语学院/教务处统一组织，需在规定时间内向学校缴费报名。",
    sources: [
      { title: "全国大学生英语竞赛官网", url: "https://neccs.saikr.com" },
      { title: "中南财经政法大学：2026 年 NECCS 报名通知", url: "https://wgyxy.zuel.edu.cn/2026/0304/c10336a423380/page.htm" }
    ]
  },
  {
    id: 47,
    name: "“学创杯”全国大学生创业综合模拟大赛",
    short: "学创杯",
    level: "B",
    category: "创新创业",
    majors: ["财经商贸", "通用/跨专业"],
    organizer: "高等学校国家级实验教学示范中心联席会经济与管理学科组",
    format: "团队 3 人",
    cycle: "2026 · 第十三届（2027 待通知）",
    content:
      "设研究生组、本科组、职教组，通过创业综合模拟软件经营企业，按六个季度决策比拼营收、利润与资金链管理，另设创业计划书评审环节。",
    site: "https://www.xcbds.com",
    reg: { start: "2026-04-30", end: "2026-05-18", precision: "day" },
    event: { start: "2026-06-01", end: "2026-07-10", precision: "month" },
    schedule:
      "2026 年各校报名集中在 4 月 30 日—5 月 18 日；6 月校赛，7 月 10 日前完成省赛推荐；全国总决赛时间由组委会另行通知。",
    status: "reference",
    note: "各校报名与校赛时间不同，以本校通知为准；职教组面向高职（专科）学生。",
    sources: [
      { title: "“学创杯”大赛官网", url: "https://www.xcbds.com" },
      { title: "中北大学：第十三届“学创杯”校赛通知", url: "https://cxcy.nuc.edu.cn/info/1040/6892.htm" }
    ]
  },
  {
    id: 48,
    name: "全国旅游院校服务技能（导游服务）大赛",
    short: "导游服务大赛",
    level: "B",
    category: "其他",
    majors: ["旅游酒店"],
    organizer: "中国旅游协会（指导）· 旅游教育分会、重庆旅游职业学院",
    format: "个人 · 院校组队",
    cycle: "2026 · 第十六届（已闭幕）",
    content:
      "面向旅游院校学生，以导游讲解、才艺展示与现场问答等环节考查导游服务综合技能，按本科、高职、中职组别分别评奖。",
    site: "https://www.cteweb.cn/special/jineng16.html",
    reg: { start: null, end: null, precision: "unknown" },
    regState: "closed",
    event: { start: "2026-05-01", end: "2026-05-24", precision: "month" },
    schedule: "2026 年 3 月 2 日发布通知并开通专题页，5 月 24 日闭幕；下一届时间待通知。",
    status: "official",
    note: "以院校为单位组队报名，个人需通过本校旅游类专业院系选拔；下一届安排以中国旅游教育网为准。",
    sources: [
      { title: "中国旅游教育网：第十六届全国旅游院校服务技能大赛专题", url: "https://www.cteweb.cn/special/jineng16.html" }
    ]
  },
  {
    id: 49,
    name: "全国大学生艺术展演活动",
    short: "大学生艺术展演",
    level: "A",
    category: "设计艺术",
    majors: ["艺术与设计", "通用/跨专业"],
    organizer: "教育部",
    format: "个人/团队 · 校级—省级—全国",
    cycle: "2026—2027 · 第八届",
    content:
      "设艺术表演类（声乐、器乐、舞蹈、戏剧、朗诵）、艺术作品类（绘画、书法、摄影、设计、微电影）与高校美育改革创新优秀案例，逐级选拔后参加全国现场展演。",
    site: "https://hudong.moe.gov.cn",
    reg: { start: null, end: null, precision: "unknown" },
    event: { start: "2026-04-01", end: "2027-12-31", precision: "month" },
    schedule:
      "2026 年 4 月启动，分校级展演、省级展演、全国汇演三个阶段；全国汇演 2027 年在重庆举行。",
    status: "official",
    note:
      "报名由本校团委或艺术学院统一组织，校级截止时间早于省级；非艺术专业学生也可参加艺术作品类与表演类。",
    sources: [
      { title: "教育部：全国第八届大学生艺术展演活动启动", url: "https://hudong.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/202604/t20260417_1434035.html" }
    ]
  }
];
