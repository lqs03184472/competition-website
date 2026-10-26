/*
 * 竞赛雷达 · 页面逻辑
 * 依赖 data.js 中的 COMPETITIONS / CATEGORIES / DATA_UPDATED
 * 纯前端：状态按访问当日计算，无任何后端请求。
 */

(function () {
  "use strict";

  /* ---------------- 基础工具 ---------------- */

  const $ = (selector) => document.querySelector(selector);

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));

  const today = (() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  })();

  function parseDate(value, precision, edge) {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    if (precision === "month") {
      return edge === "end"
        ? new Date(year, month, 0, 23, 59, 59, 999)
        : new Date(year, month - 1, 1);
    }
    return edge === "end"
      ? new Date(year, month - 1, day || 1, 23, 59, 59, 999)
      : new Date(year, month - 1, day || 1);
  }

  function bounds(range) {
    if (!range) return { start: null, end: null };
    return {
      start: parseDate(range.start, range.precision, "start"),
      end: parseDate(range.end, range.precision, "end")
    };
  }

  /* ---------------- 状态计算 ---------------- */

  const REG_LABEL = {
    open: "报名中",
    upcoming: "未开始",
    closed: "已截止",
    unknown: "待公布"
  };

  const EVENT_LABEL = {
    live: "进行中",
    upcoming: "未开始",
    ended: "已结束",
    unknown: "待公布"
  };

  const DATA_STATUS_LABEL = {
    official: "官方已公布",
    reference: "参考上届",
    unknown: "待官网确认"
  };

  function regStatus(item) {
    if (item.regState && REG_LABEL[item.regState]) return item.regState;
    const { start, end } = bounds(item.reg);
    if (!start && !end) return "unknown";
    if (start && today < start) return "upcoming";
    if (end && today > end) return "closed";
    return "open";
  }

  function eventStatus(item) {
    const { start, end } = bounds(item.event);
    if (!start && !end) return "unknown";
    if (start && today < start) return "upcoming";
    if (end && today > end) return "ended";
    return "live";
  }

  function fmtRange(range) {
    if (!range || (!range.start && !range.end)) return "待公布";
    const isMonth = range.precision === "month";

    if (range.start && range.end) {
      const s = range.start.split("-");
      const e = range.end.split("-");
      if (isMonth) {
        if (s[0] === e[0] && s[1] === e[1]) return `${s[0]}.${s[1]}`;
        if (s[0] === e[0]) return `${s[0]}.${s[1]} – ${e[1]}`;
        return `${s[0]}.${s[1]} – ${e[0]}.${e[1]}`;
      }
      if (s[0] === e[0]) return `${s[0]}.${s[1]}.${s[2]} – ${e[1]}.${e[2]}`;
      return `${s[0]}.${s[1]}.${s[2]} – ${e[0]}.${e[1]}.${e[2]}`;
    }

    const only = range.end || range.start;
    const p = only.split("-");
    const text = isMonth ? `${p[0]}.${p[1]}` : `${p[0]}.${p[1]}.${p[2]}`;
    return range.end ? `截止 ${text}` : `${text} 起`;
  }

  function precisionTitle(range) {
    if (range && range.precision === "month") return "官方仅公布到月份";
    return "";
  }

  /* ---------------- 筛选配置 ---------------- */

  const FILTERS = [
    {
      key: "reg",
      options: [
        { value: "all", label: "全部" },
        { value: "open", label: "报名中" },
        { value: "upcoming", label: "未开始" },
        { value: "closed", label: "已截止" },
        { value: "unknown", label: "待公布" }
      ],
      test: (item) => regStatus(item)
    },
    {
      key: "event",
      options: [
        { value: "all", label: "全部" },
        { value: "live", label: "进行中" },
        { value: "upcoming", label: "未开始" },
        { value: "ended", label: "已结束" },
        { value: "unknown", label: "待公布" }
      ],
      test: (item) => eventStatus(item)
    },
    {
      key: "level",
      options: [
        { value: "all", label: "全部" },
        { value: "A", label: "A 类" },
        { value: "B", label: "B 类" }
      ],
      test: (item) => item.level
    },
    {
      key: "cat",
      options: [{ value: "all", label: "全部" }, ...CATEGORIES.map((name) => ({ value: name, label: name }))],
      test: (item) => item.category
    }
  ];

  const state = {
    q: "",
    reg: "all",
    event: "all",
    level: "all",
    cat: "all",
    sort: "id"
  };

  const openIds = new Set();

  /* ---------------- 排序 ---------------- */

  const REG_RANK = { open: 0, upcoming: 1, unknown: 2, closed: 3 };
  const EVENT_RANK = { live: 0, upcoming: 1, unknown: 2, ended: 3 };

  function compareDate(a, b, direction) {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    return (a - b) * direction;
  }

  const SORTERS = {
    id: (a, b) => a.id - b.id,
    deadline: (a, b) => {
      const ra = REG_RANK[regStatus(a)];
      const rb = REG_RANK[regStatus(b)];
      if (ra !== rb) return ra - rb;
      const direction = ra === 3 ? -1 : 1;
      return compareDate(bounds(a.reg).end, bounds(b.reg).end, direction) || a.id - b.id;
    },
    start: (a, b) => {
      const ra = EVENT_RANK[eventStatus(a)];
      const rb = EVENT_RANK[eventStatus(b)];
      if (ra !== rb) return ra - rb;
      const direction = ra === 3 ? -1 : 1;
      return compareDate(bounds(a.event).start, bounds(b.event).start, direction) || a.id - b.id;
    }
  };

  /* ---------------- DOM ---------------- */

  const listEl = $("#list");
  const emptyEl = $("#empty");
  const resultCountEl = $("#resultCount");
  const resultHintEl = $("#resultHint");
  const resetBtn = $("#resetFilters");
  const searchEl = $("#search");
  const sortEl = $("#sort");

  /* ---------------- 模板 ---------------- */

  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (error) {
      return "访问官网";
    }
  }

  function detailHTML(item) {
    const statusKey = item.status || "unknown";
    const sourceLinks = (item.sources || [])
      .map(
        (source) =>
          `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a></li>`
      )
      .join("");

    return `
      <div class="detail-grid">
        <div class="detail-col">
          <div class="detail-block">
            <h4>竞赛内容</h4>
            <p>${esc(item.content || "官方暂未公布竞赛内容。")}</p>
          </div>
          <div class="detail-block">
            <h4>时间安排</h4>
            <p>${esc(item.schedule || "官方暂未公布完整时间安排。")}</p>
            ${item.note ? `<p class="detail-note"><strong>说明</strong>${esc(item.note)}</p>` : ""}
          </div>
        </div>
        <aside class="detail-aside">
          <dl class="detail-meta">
            <div>
              <dt>主办单位</dt>
              <dd>${esc(item.organizer)}</dd>
            </div>
            <div>
              <dt>参赛形式</dt>
              <dd>${esc(item.format || "以官方通知为准")}</dd>
            </div>
            <div>
              <dt>竞赛级别</dt>
              <dd>${esc(item.level)} 类 · ${esc(item.category)}</dd>
            </div>
            <div>
              <dt>数据状态</dt>
              <dd>
                <span class="status-inline">
                  <span class="status-dot ${statusKey === "reference" ? "is-reference" : statusKey === "unknown" ? "is-unknown" : ""}" aria-hidden="true"></span>
                  ${esc(DATA_STATUS_LABEL[statusKey] || DATA_STATUS_LABEL.unknown)}
                </span>
              </dd>
            </div>
          </dl>
          <div class="detail-actions">
            ${item.site ? `<a class="btn btn-primary" href="${esc(item.site)}" target="_blank" rel="noopener noreferrer">访问官网 · ${esc(hostOf(item.site))}</a>` : ""}
          </div>
          ${sourceLinks ? `<div class="sources"><span>信息来源</span><ul>${sourceLinks}</ul></div>` : ""}
        </aside>
      </div>
    `;
  }

  function compHTML(item, index) {
    const reg = regStatus(item);
    const event = eventStatus(item);
    const isOpen = openIds.has(item.id);
    const regTitle = precisionTitle(item.reg);
    const eventTitle = precisionTitle(item.event);

    return `
      <article class="comp${isOpen ? " is-open" : ""}" data-id="${item.id}" style="--i:${Math.min(index, 10)}">
        <div class="comp-row">
          <span class="comp-index" aria-hidden="true">${String(item.id).padStart(2, "0")}</span>
          <div class="comp-main">
            <div class="comp-tags">
              <span class="tag-level level-${item.level.toLowerCase()}">${esc(item.level)} 类</span>
              <span class="tag-cat">${esc(item.category)}</span>
              <span class="tag-cycle">${esc(item.cycle)}</span>
            </div>
            <h3 class="comp-name">${esc(item.name)}</h3>
            <p class="comp-sub">${esc(item.short)} · ${esc(item.organizer)}</p>
          </div>
          <div class="comp-dates">
            <div class="date-cell">
              <span class="date-label">报名</span>
              <span class="date-value"${regTitle ? ` title="${regTitle}"` : ""}>${fmtRange(item.reg)}</span>
              <span class="badge badge-${reg}">${REG_LABEL[reg]}</span>
            </div>
            <div class="date-cell">
              <span class="date-label">比赛</span>
              <span class="date-value"${eventTitle ? ` title="${eventTitle}"` : ""}>${fmtRange(item.event)}</span>
              <span class="badge badge-${event}">${EVENT_LABEL[event]}</span>
            </div>
          </div>
          <button class="expand" type="button" data-action="toggle" aria-expanded="${isOpen}" aria-controls="detail-${item.id}" aria-label="${isOpen ? "收起" : "展开"}详情：${esc(item.name)}">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 6 L8 11 L13 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="comp-detail" id="detail-${item.id}"${isOpen ? "" : " hidden"}>
          ${detailHTML(item)}
        </div>
      </article>
    `;
  }

  /* ---------------- 筛选与搜索 ---------------- */

  function normalize(text) {
    return String(text || "").toLowerCase().replace(/\s+/g, "");
  }

  function matches(item) {
    if (state.reg !== "all" && regStatus(item) !== state.reg) return false;
    if (state.event !== "all" && eventStatus(item) !== state.event) return false;
    if (state.level !== "all" && item.level !== state.level) return false;
    if (state.cat !== "all" && item.category !== state.cat) return false;

    if (state.q) {
      const haystack = normalize(
        [
          item.name,
          item.short,
          item.organizer,
          item.category,
          item.cycle,
          item.content,
          item.schedule,
          item.note
        ].join(" ")
      );
      const tokens = state.q.split(/\s+/).filter(Boolean).map(normalize);
      if (!tokens.every((token) => haystack.includes(token))) return false;
    }
    return true;
  }

  function isFiltered() {
    return Boolean(state.q.trim()) || ["reg", "event", "level", "cat"].some((key) => state[key] !== "all");
  }

  function activeLabels() {
    const labels = [];
    FILTERS.forEach((filter) => {
      if (state[filter.key] === "all") return;
      const option = filter.options.find((opt) => opt.value === state[filter.key]);
      if (option) labels.push(option.label);
    });
    if (state.q.trim()) labels.push(`“${state.q.trim()}”`);
    return labels;
  }

  /* ---------------- 渲染 ---------------- */

  function renderChips() {
    document.querySelectorAll(".chips").forEach((wrap) => {
      const filter = FILTERS.find((item) => item.key === wrap.dataset.group);
      if (!filter) return;
      wrap.innerHTML = filter.options
        .map((option) => {
          const count =
            option.value === "all"
              ? COMPETITIONS.length
              : COMPETITIONS.filter((item) => filter.test(item) === option.value).length;
          return `<button class="chip" type="button" data-group="${filter.key}" data-value="${option.value}" aria-pressed="false">${option.label}<span class="count">${count}</span></button>`;
        })
        .join("");
    });
  }

  function updateChips() {
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(state[chip.dataset.group] === chip.dataset.value));
    });
  }

  function render(options) {
    const config = options || {};
    updateChips();

    const items = COMPETITIONS.filter(matches).sort(SORTERS[state.sort] || SORTERS.id);

    listEl.innerHTML = items.map(compHTML).join("");
    resultCountEl.textContent = String(items.length);
    listEl.hidden = items.length === 0;
    emptyEl.hidden = items.length !== 0;
    resetBtn.hidden = !isFiltered();

    const labels = activeLabels();
    resultHintEl.textContent = labels.length ? `· ${labels.join(" / ")}` : "";

    if (config.syncUrl !== false) syncURL();
  }

  function resetAll() {
    state.q = "";
    state.reg = "all";
    state.event = "all";
    state.level = "all";
    state.cat = "all";
    state.sort = "id";
    searchEl.value = "";
    sortEl.value = "id";
    render();
  }

  /* ---------------- URL 同步 ---------------- */

  function syncURL() {
    try {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      ["reg", "event", "level", "cat"].forEach((key) => {
        if (state[key] !== "all") params.set(key, state[key]);
        else params.delete(key);
      });
      if (state.q.trim()) params.set("q", state.q.trim());
      else params.delete("q");
      if (state.sort !== "id") params.set("sort", state.sort);
      else params.delete("sort");
      window.history.replaceState(null, "", url.toString());
    } catch (error) {
      /* 本地 file:// 预览时可能禁用 history，忽略即可 */
    }
  }

  function readURL() {
    try {
      const params = new URLSearchParams(window.location.search);

      FILTERS.forEach((filter) => {
        const value = params.get(filter.key);
        if (value && filter.options.some((option) => option.value === value)) {
          state[filter.key] = value;
        }
      });

      const q = params.get("q");
      if (q) state.q = q;

      const sort = params.get("sort");
      if (sort && SORTERS[sort]) state.sort = sort;
    } catch (error) {
      /* 忽略非法参数 */
    }
  }

  /* ---------------- 统计 ---------------- */

  function updateStats() {
    const total = COMPETITIONS.length;
    const aCount = COMPETITIONS.filter((item) => item.level === "A").length;
    const openCount = COMPETITIONS.filter((item) => regStatus(item) === "open").length;
    const liveCount = COMPETITIONS.filter((item) => eventStatus(item) === "live").length;

    document.querySelectorAll('[data-stat="total"], [data-total]').forEach((el) => {
      el.textContent = String(total);
    });
    document.querySelectorAll('[data-stat="a"]').forEach((el) => {
      el.textContent = String(aCount);
    });
    document.querySelectorAll('[data-stat="open"], [data-open-count]').forEach((el) => {
      el.textContent = String(openCount);
    });
    document.querySelectorAll('[data-stat="live"]').forEach((el) => {
      el.textContent = String(liveCount);
    });

    const updated = (DATA_UPDATED || "").split("-").join(".");
    document.querySelectorAll("[data-updated]").forEach((el) => {
      el.textContent = updated;
    });
  }

  /* ---------------- 事件 ---------------- */

  function init() {
    readURL();
    searchEl.value = state.q;
    sortEl.value = state.sort;

    renderChips();
    updateStats();
    render({ syncUrl: false });

    document.getElementById("filters").addEventListener("click", (event) => {
      const chip = event.target.closest(".chip");
      if (!chip) return;
      state[chip.dataset.group] = chip.dataset.value;
      render();
    });

    let searchTimer = null;
    searchEl.addEventListener("input", () => {
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        state.q = searchEl.value;
        render();
      }, 120);
    });

    sortEl.addEventListener("change", () => {
      state.sort = sortEl.value;
      render();
    });

    resetBtn.addEventListener("click", resetAll);
    $("#emptyReset").addEventListener("click", resetAll);

    listEl.addEventListener("click", (event) => {
      const button = event.target.closest('[data-action="toggle"]');
      if (!button) return;

      const article = button.closest(".comp");
      const detail = article.querySelector(".comp-detail");
      const id = Number(article.dataset.id);
      const isOpen = button.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        openIds.delete(id);
        article.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", `展开详情：${COMPETITIONS.find((item) => item.id === id)?.name || ""}`);
        detail.hidden = true;
      } else {
        openIds.add(id);
        article.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", `收起详情：${COMPETITIONS.find((item) => item.id === id)?.name || ""}`);
        detail.hidden = false;
      }
    });

    document.querySelectorAll("[data-quick]").forEach((link) => {
      link.addEventListener("click", () => {
        resetAll();
        if (link.dataset.quick === "open") {
          state.reg = "open";
          render();
        }
      });
    });

    const header = document.querySelector(".site-header");
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  init();
})();
