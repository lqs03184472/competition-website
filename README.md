# 竞赛雷达 · COMP RADAR

一个纯静态的全国大学生学科竞赛信息总览页，收录教育部认可的 A / B 类竞赛 **34 项**（对应名单图片中可见的序号 1–34），把报名窗口、比赛时间、竞赛内容集中到一屏，并支持按状态筛选。

> 数据快照：**2026-10-26**。报名与赛事状态在浏览器端按访问当日自动计算。

## 功能

- **34 项竞赛全覆盖**：序号、名称、届次、级别（A / B）、类别、主办单位、参赛形式、竞赛内容。
- **报名时间 + 比赛时间**：分别展示起止区间与当前状态，官方只公布到月份的只显示月份，不虚构具体日期。
- **三类状态筛选**
  - 报名状态：报名中 / 即将开始 / 已截止 / 待公布
  - 赛事进程：进行中 / 未开始 / 已结束 / 待公布
  - 另有竞赛级别（A / B）与竞赛类别（创新创业、学科基础、信息技术、设计艺术、工程实践、其他）筛选
- **搜索**：按竞赛名称、简称、主办单位、关键词检索。
- **排序**：目录序号 / 报名截止最近 / 比赛开始最近。
- **详情展开**：点击列表行展开竞赛内容、时间安排、官网入口与信息来源。
- **链接可分享**：筛选条件同步到 URL（如 `?reg=open&event=live&level=A`），复制即可还原视图。
- **响应式 + 无障碍**：适配桌面 / 平板 / 手机，支持键盘操作、跳转链接与减少动效偏好。

## 技术栈

- HTML5 + CSS3 + 原生 JavaScript（ES2015+）
- **零依赖、零构建、零后端**，直接打开 `index.html` 即可运行
- 数据与视图分离：所有竞赛数据集中在 `assets/js/data.js`

```
comp-radar/
├── index.html              # 页面结构
├── assets/
│   ├── css/
│   │   └── style.css       # 科技蓝主题、布局与动效
│   ├── img/
│   │   └── hero.svg        # 手绘雷达 / 电路网格首页背景
│   └── js/
│       ├── data.js         # 竞赛数据（唯一数据源）
│       └── app.js          # 状态计算、筛选、搜索、排序、渲染
├── .nojekyll               # 让 GitHub Pages 跳过 Jekyll 处理
├── .gitignore
├── LICENSE
└── README.md
```

## 本地运行

无需安装任何依赖。

方式一：直接双击 `index.html` 用浏览器打开。

方式二（推荐，URL 参数体验更完整）：

```bash
# 在项目目录下
python -m http.server 8000
# 打开 http://localhost:8000
```

或使用 Node：

```bash
npx serve .
```

## 部署到 GitHub Pages

1. 新建仓库并推送本项目：

   ```bash
   git init
   git add .
   git commit -m "feat: 竞赛雷达 静态站点"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 仓库 **Settings → Pages**，Source 选择 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)`，保存。
3. 稍等片刻，访问 `https://<你的用户名>.github.io/<仓库名>/`。

> 项目全部使用相对路径，放在仓库根目录或任意子路径下都能正常访问；`.nojekyll` 已包含，无需额外配置。

## 数据维护

所有竞赛信息位于 `assets/js/data.js`，每条记录结构如下：

```js
{
  id: 19,
  name: "中国机器人大赛",
  short: "RoboMaster / ROBOCON",
  level: "B",                       // A | B
  category: "工程实践",
  organizer: "中国自动化学会",
  format: "团队",
  cycle: "2027 赛季",
  content: "竞赛内容简介……",
  site: "https://www.robomaster.com",
  reg:   { start: "2026-10-20", end: "2026-10-27", precision: "day" },   // 报名区间
  event: { start: "2027-05-01", end: "2027-08-31", precision: "month" }, // 比赛区间
  schedule: "报名 → 校赛 → 区域赛 → 全国总决赛",
  status: "official",               // official | reference | unknown
  note: "补充说明……",
  sources: [{ title: "官方通知", url: "https://…" }]
}
```

- `precision: "month"` 表示官方只公布到月份，页面按月初 / 月末判断状态，但只展示年月。
- `start` / `end` 可为 `null`（如报名入口由各校自行组织），此时状态为“待公布”。
- 可选 `regState`：当官方没有统一报名起止日、但可确认状态时（如 `"closed"`），用它覆盖自动计算结果。
- 修改数据后刷新页面即可生效，无需构建。

## 数据说明

- 时间取自各赛事官网、教育部及组委会正式通知；官方仅公布到月份的，页面同样只到月份。
- 多数竞赛没有全国统一报名入口，校赛选拔与材料报送时间由各高校另行通知，请同时关注本校教务 / 团委通知。
- 标注“参考上届”的条目表示本届通知尚未发布，展示的是上届官方时间，仅供参考。
- 赛程可能因承办情况调整，提交前请以官网最新公告为准。

## 说明与声明

本项目为信息聚合展示，与各竞赛主办方无隶属关系，竞赛名称与商标归各自所有者。页面内容仅供备赛参考，最终以官方发布为准。

## License

[MIT](./LICENSE)
