/* ========== 多源 ========== */
const SOURCES = [
    {
        name: '本地源',
        videos: [
            { file: 'assets/video/video.mp4',  label: 'video.mp4' },
        ]
    },
    {
        name: '备用源',
        videos: [
            { file: 'assets/video/video.mp4',  label: 'video.mp4' },
        ]
    },
];

let sourceIdx = 0;
let epIdx = 0;

/* DOM */
const player  = document.getElementById('pl');
const vt      = document.getElementById('vt');
const epNum   = document.getElementById('epNum');
const dl      = document.getElementById('dl');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const grid    = document.getElementById('epGrid');
const totalEl = document.getElementById('totalEp');
const dropdown   = document.getElementById('sourceDropdown');
const trigger    = document.getElementById('sourceTrigger');
const menu       = document.getElementById('sourceMenu');
const sourceLabel = document.getElementById('sourceLabel');

/* ---- 源下拉渲染 + 点击逻辑 ---- */
function renderSourceMenu() {
    menu.innerHTML = '';
    SOURCES.forEach((s, i) => {
        const item = document.createElement('div');
        item.className = 'source-item' + (i === sourceIdx ? ' active' : '');
        item.textContent = s.name;
        item.onclick = (e) => {
            e.stopPropagation();
            switchSource(i);
            dropdown.classList.remove('open');
        };
        menu.appendChild(item);
    });
}
trigger.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
};
/* 点页面其他地方收下拉 */
document.addEventListener('click', () => dropdown.classList.remove('open'));

function switchSource(i) {
    if (i < 0 || i >= SOURCES.length) return;
    sourceIdx = i;
    sourceLabel.textContent = SOURCES[sourceIdx].name;
    /* 保 ep */
    if (epIdx >= SOURCES[sourceIdx].videos.length) epIdx = 0;
    renderSourceMenu();
    applyEp();
    renderGrid();
}

/* ---- 切集 ---- */
function switchTo(e) {
    if (e < 0 || e >= SOURCES[sourceIdx].videos.length) return;
    epIdx = e;
    applyEp();
    renderGrid();
    player.load();
    player.play().catch(()=>{});
}

function applyEp() {
    const v = SOURCES[sourceIdx].videos[epIdx];
    player.src = v.file;
    vt.textContent = v.label;
    epNum.textContent = epIdx + 1;
    dl.href = v.file;
    prevBtn.disabled = (epIdx === 0);
    nextBtn.disabled = (epIdx === SOURCES[sourceIdx].videos.length - 1);
    history.replaceState(null, '', `video_read.html?ep=${epIdx}`);
    totalEl.textContent = SOURCES[sourceIdx].videos.length;
}

/* ---- 选集 grid ---- */
function renderGrid() {
    grid.innerHTML = '';
    SOURCES[sourceIdx].videos.forEach((v, i) => {
        const btn = document.createElement('div');
        btn.className = 'ep-btn' + (i === epIdx ? ' active' : '');
        btn.innerHTML = `<span>第 ${i + 1} 集</span>` +
            (i === epIdx ? '<div class="playon"><i></i><i></i><i></i><i></i></div>' : '');
        btn.onclick = () => switchTo(i);
        grid.appendChild(btn);
    });
}

prevBtn.onclick = () => switchTo(epIdx - 1);
nextBtn.onclick = () => switchTo(epIdx + 1);
player.addEventListener('ended', () => {
    if (epIdx < SOURCES[sourceIdx].videos.length - 1) switchTo(epIdx + 1);
});

/* 初始化 ?ep= */
const params = new URLSearchParams(location.search);
const epFromUrl = parseInt(params.get('ep'));
if (!isNaN(epFromUrl) && epFromUrl >= 0 && epFromUrl < SOURCES[0].videos.length) {
    epIdx = epFromUrl;
}
renderSourceMenu();
sourceLabel.textContent = SOURCES[sourceIdx].name;
applyEp();
renderGrid();