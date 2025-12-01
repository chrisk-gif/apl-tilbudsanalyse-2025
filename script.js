// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavDots();
    initScrollProgress();
    initCounters();
    initCharts();
    initScrollAnimations();
    initPaginatedSections();
    initRegionTable();
});

// Navigation dots
function initNavDots() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.getElementById('navDots');

    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        navDots.appendChild(dot);
    });

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        const dots = document.querySelectorAll('.nav-dot');

        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                dots.forEach(d => d.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    });
}

// Progress bar
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('nb-NO');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('nb-NO');
        }
    }, 16);
}

// Charts
function initCharts() {
    // Set default chart options
    Chart.defaults.color = '#6b7770';
    Chart.defaults.font.family = 'Inter, sans-serif';

    createHistoriskChart();
    createDivisjonChart();
    createStorrelseChart();
    createTimefordelingChart();
}

function createHistoriskChart() {
    const ctx = document.getElementById('historiskChart');
    if (!ctx) return;

    // Historisk data - hardkodet siden det ikke finnes i den nye datastrukturen
    const historiskLabels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'];
    const historiskValues = [7.2, 8.1, 9.7, 7.2, 7.5, 8.5, 7.5, 7.3];
    const maal = 7.0;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: historiskLabels,
            datasets: [
                {
                    label: 'Tilbud + Marked %',
                    data: historiskValues,
                    borderColor: '#3d5a4f',
                    backgroundColor: 'rgba(61, 90, 79, 0.08)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#3d5a4f',
                    borderWidth: 2
                },
                {
                    label: 'Mål 2026',
                    data: Array(historiskLabels.length).fill(maal),
                    borderColor: '#5a9a6e',
                    borderDash: [10, 5],
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.parsed.y}%`
                    }
                }
            },
            scales: {
                y: {
                    min: 5,
                    max: 11,
                    ticks: {
                        callback: (value) => value + '%'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createDivisjonChart() {
    const ctx = document.getElementById('divisjonChart');
    if (!ctx) return;

    // Divisjonsdata - hardkodet
    const divisjonLabels = ['APL', 'Infrastruktur', 'Arkitektur & Bygg'];
    const values2024 = [7.5, 4.5, 5.0];
    const values2025 = [7.3, 4.3, 4.8];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: divisjonLabels,
            datasets: [
                {
                    label: '2024',
                    data: values2024,
                    backgroundColor: '#3d5a4f',
                    borderRadius: 4
                },
                {
                    label: '2025*',
                    data: values2025,
                    backgroundColor: '#5a9a6e',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.parsed.x}%`
                    }
                }
            },
            scales: {
                x: {
                    max: 10,
                    ticks: {
                        callback: (value) => value + '%'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createStorrelseChart() {
    const ctx = document.getElementById('storrelseChart');
    if (!ctx) return;

    const labels = DATA.storrelser.map(s => s.label);
    const tilslag = DATA.storrelser.map(s => s.tilslag);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Tilslagsprosent',
                    data: tilslag,
                    backgroundColor: tilslag.map(v =>
                        v >= 70 ? '#5a9a6e' : v >= 50 ? '#d4b87a' : '#c47a7a'
                    ),
                    borderRadius: 8,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const idx = context.dataIndex;
                            const s = DATA.storrelser[idx];
                            return [
                                `Tilslag: ${s.tilslag}%`,
                                `Vunnet: ${s.vunnet}`,
                                `Tapt: ${s.tapt}`,
                                `Direkte: ${s.direkte}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    max: 100,
                    ticks: {
                        callback: (value) => value + '%'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createTimefordelingChart() {
    const ctx = document.getElementById('timefordeling');
    if (!ctx) return;

    const labels = ['Fakturerbar', 'Tilbud', 'Marked', 'Ledelse', 'Andre'];
    const values = [282835, 21662, 9543, 21322, 23509];
    const colors = ['#5a9a6e', '#3d5a4f', '#5a7a68', '#d4b87a', '#8a948c'];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value.toLocaleString('nb-NO')} timer (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.stat-card, .action-card, .topic, .insight-box, .highlight-box, .finding-card, .challenge-card, .fo-card, .lost-bid, .timer-box, .size-insight, .kontor-insight');

    elements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('.section');
    const currentSection = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top < window.innerHeight / 2;
    });

    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const nextSection = sections[currentSection + 1];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevSection = sections[currentSection - 1];
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// INTERACTIVE FUNCTIONS
// ============================================

// Status 2025 Detail Panel - oppdatert med faktiske tall
function toggleStatDetails(type) {
    const panel = document.getElementById('detailPanel');
    const title = document.getElementById('detailTitle');
    const content = document.getElementById('detailContent');

    const d = DATA.timerDetaljer;
    const t = DATA.tilbud2025;

    const details = {
        totalt: {
            title: 'Fordeling av ' + t.totalt + ' tilbud',
            items: [
                { label: 'Vunnet', value: t.vunnet.antall, sub: t.vunnet.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Tapt', value: t.tapt.antall, sub: t.tapt.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Direkte anskaffelse', value: t.direkte.antall, sub: t.direkte.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Totale tilbudstimer', value: '-', sub: t.totaleTilbudTimer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Tilbudskostnad', value: '-', sub: t.tilbudskostMNOK.toFixed(1) + ' MNOK' }
            ]
        },
        vunnet: {
            title: 'Vunnet - ' + t.vunnet.antall + ' tilbud',
            items: [
                { label: 'Total verdi', value: t.vunnet.verdi + 'M', sub: 'NOK' },
                { label: 'Timer brukt', value: t.vunnet.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer', value: DATA.timerPerTilbud.vunnet, sub: 'per tilbud' },
                { label: 'Tilbudskost', value: t.tilbudskostProsent.toFixed(1) + '%', sub: 'av vunnet verdi' }
            ]
        },
        tapt: {
            title: 'Tapt - ' + t.tapt.antall + ' tilbud',
            items: [
                { label: 'Tapt verdi', value: t.tapt.verdi + 'M', sub: 'NOK potensial' },
                { label: 'Timer brukt', value: t.tapt.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer', value: DATA.timerPerTilbud.tapt, sub: 'per tilbud' },
                { label: 'Tilbudskost', value: ((t.tapt.timer * 4550) / 1e6).toFixed(2) + 'M', sub: 'bortkastet' }
            ]
        },
        direkte: {
            title: 'Direkte anskaffelse - ' + t.direkte.antall + ' tilbud',
            items: [
                { label: 'Total verdi', value: t.direkte.verdi + 'M', sub: 'NOK' },
                { label: 'Andel av alle', value: ((t.direkte.antall / t.totalt) * 100).toFixed(0) + '%', sub: 'av totalt antall' },
                { label: 'Timer brukt', value: t.direkte.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer', value: DATA.timerPerTilbud.direkte, sub: 'per tilbud' }
            ]
        }
    };

    const data = details[type];
    title.textContent = data.title;
    content.innerHTML = data.items.map(item => `
        <div class="detail-item">
            <div class="detail-item-label">${item.label}</div>
            <div class="detail-item-value">${item.value}</div>
            <div class="detail-item-sub">${item.sub}</div>
        </div>
    `).join('');

    panel.style.display = 'block';
}

function closeDetailPanel() {
    document.getElementById('detailPanel').style.display = 'none';
}

// Size Details Toggle - oppdatert for ny struktur
function toggleSizeDetails() {
    const panel = document.getElementById('sizeDetailsPanel');
    const body = document.getElementById('sizeDetailsBody');

    if (panel.style.display === 'none') {
        body.innerHTML = DATA.storrelser.map(s => {
            const tilslagClass = s.tilslag >= 70 ? 'good' : s.tilslag >= 50 ? 'warning' : 'bad';
            const kostClass = s.tilbudskostProsent <= 15 ? 'good' : s.tilbudskostProsent <= 30 ? 'warning' : 'bad';
            return `
                <tr>
                    <td>${s.label}</td>
                    <td>${s.vunnet + s.tapt + s.direkte}</td>
                    <td class="${tilslagClass}">${s.tilslag}%</td>
                    <td>${(s.timerVunnet + s.timerTapt).toLocaleString('nb-NO')}</td>
                    <td>${s.timerVunnet.toLocaleString('nb-NO')}</td>
                    <td>${s.timerTapt.toLocaleString('nb-NO')}</td>
                    <td>${s.verdiVunnet}M</td>
                    <td class="${kostClass}">${s.tilbudskostProsent}%</td>
                </tr>
            `;
        }).join('');
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// ============================================
// PAGINATED SECTIONS
// ============================================

let foCurrentPage = 0;
let kundeCurrentPage = 0;
let tapCurrentPage = 0;
const ITEMS_PER_PAGE = 5;

function initPaginatedSections() {
    renderFoPage();
    renderKundePage();
    renderTapPage();
}

// Forretningsområder paginering
function renderFoPage() {
    const container = document.getElementById('foContent');
    const pageNum = document.getElementById('foPageNum');
    const totalPages = document.getElementById('foTotalPages');
    const prevBtn = document.getElementById('foPrevBtn');
    const nextBtn = document.getElementById('foNextBtn');
    const dots = document.getElementById('foPageDots');

    const data = DATA.foAlleOmrader;
    const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
    totalPages.textContent = pages;
    pageNum.textContent = foCurrentPage + 1;

    const start = foCurrentPage * ITEMS_PER_PAGE;
    const pageData = data.slice(start, start + ITEMS_PER_PAGE);

    container.innerHTML = `
        <div class="fo-paginated-grid">
            ${pageData.map(fo => `
                <div class="fo-detail-card ${fo.tilslag < 50 ? 'weak' : ''}">
                    <div class="fo-detail-header">
                        <div class="fo-detail-name">${fo.navn}</div>
                        <div class="fo-detail-pct">${fo.tilslag}%</div>
                    </div>
                    <div class="fo-detail-stats">
                        <div class="fo-stat">
                            <div class="fo-stat-label">Vunnet</div>
                            <div class="fo-stat-value">${fo.vunnet}</div>
                        </div>
                        <div class="fo-stat">
                            <div class="fo-stat-label">Tapt</div>
                            <div class="fo-stat-value">${fo.tapt}</div>
                        </div>
                        <div class="fo-stat">
                            <div class="fo-stat-label">Timer</div>
                            <div class="fo-stat-value">${fo.timer.toLocaleString('nb-NO')}</div>
                        </div>
                        <div class="fo-stat">
                            <div class="fo-stat-label">Tilbudskost</div>
                            <div class="fo-stat-value">${fo.tilbudskost}%</div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Update buttons
    prevBtn.disabled = foCurrentPage === 0;
    nextBtn.disabled = foCurrentPage >= pages - 1;

    // Update dots
    dots.innerHTML = Array(pages).fill(0).map((_, i) =>
        `<div class="page-dot ${i === foCurrentPage ? 'active' : ''}" onclick="goToFoPage(${i})"></div>`
    ).join('');
}

function changeFoPage(delta) {
    const pages = Math.ceil(DATA.foAlleOmrader.length / ITEMS_PER_PAGE);
    foCurrentPage = Math.max(0, Math.min(pages - 1, foCurrentPage + delta));
    renderFoPage();
}

function goToFoPage(page) {
    foCurrentPage = page;
    renderFoPage();
}

// Kunde paginering - oppdatert for ny struktur
function renderKundePage() {
    const body = document.getElementById('kundeTableBody');
    const pageNum = document.getElementById('kundePageNum');
    const totalPages = document.getElementById('kundeTotalPages');
    const prevBtn = document.getElementById('kundePrevBtn');
    const nextBtn = document.getElementById('kundeNextBtn');
    const dots = document.getElementById('kundePageDots');

    const data = DATA.topKunder;
    const perPage = 7;
    const pages = Math.ceil(data.length / perPage);
    totalPages.textContent = pages;
    pageNum.textContent = kundeCurrentPage + 1;

    const start = kundeCurrentPage * perPage;
    const pageData = data.slice(start, start + perPage);

    body.innerHTML = pageData.map(k => {
        const tilslagClass = k.tilslag >= 70 ? 'best' : k.tilslag < 50 ? 'bad' : '';
        const kostClass = k.tilbudskost <= 10 ? 'best' : k.tilbudskost > 50 ? 'bad' : '';
        const rowClass = k.tilslag >= 70 ? 'kunde-best' : k.tilslag < 50 ? 'kunde-bad' : '';
        return `
            <tr class="${rowClass}">
                <td>${k.navn}</td>
                <td>${k.antall}</td>
                <td>${k.vunnet}</td>
                <td>${k.direkte}</td>
                <td class="${tilslagClass}">${k.tilslag}%</td>
                <td>${k.verdiVunnet}M</td>
                <td>${k.timer}</td>
                <td class="${kostClass}">${k.tilbudskost}%</td>
            </tr>
        `;
    }).join('');

    prevBtn.disabled = kundeCurrentPage === 0;
    nextBtn.disabled = kundeCurrentPage >= pages - 1;

    dots.innerHTML = Array(pages).fill(0).map((_, i) =>
        `<div class="page-dot ${i === kundeCurrentPage ? 'active' : ''}" onclick="goToKundePage(${i})"></div>`
    ).join('');
}

function changeKundePage(delta) {
    const pages = Math.ceil(DATA.topKunder.length / 7);
    kundeCurrentPage = Math.max(0, Math.min(pages - 1, kundeCurrentPage + delta));
    renderKundePage();
}

function goToKundePage(page) {
    kundeCurrentPage = page;
    renderKundePage();
}

// Tap paginering - oppdatert for ny struktur
function renderTapPage() {
    const container = document.getElementById('lostBidsContent');
    const pageNum = document.getElementById('tapPageNum');
    const totalPages = document.getElementById('tapTotalPages');
    const prevBtn = document.getElementById('tapPrevBtn');
    const nextBtn = document.getElementById('tapNextBtn');
    const dots = document.getElementById('tapPageDots');

    const data = DATA.storsteTapte;
    const perPage = 5;
    const pages = Math.ceil(data.length / perPage);
    totalPages.textContent = pages;
    pageNum.textContent = tapCurrentPage + 1;

    const start = tapCurrentPage * perPage;
    const pageData = data.slice(start, start + perPage);
    const maxScore = Math.max(...data.map(d => d.smerteScore));

    container.innerHTML = pageData.map(t => `
        <div class="lost-bid">
            <div class="lost-value">${t.verdi}M</div>
            <div class="lost-info">
                <div class="lost-kunde">${t.kunde}</div>
                <div class="lost-emne">${t.emne}</div>
                <div class="lost-timer">${t.timer} timer brukt | Tilbudskost: ${t.tilbudskost}M</div>
                <div class="lost-bid-score">
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${(t.smerteScore / maxScore) * 100}%"></div>
                    </div>
                    <div class="score-label">Score: ${t.smerteScore.toFixed(1)}</div>
                </div>
            </div>
        </div>
    `).join('');

    prevBtn.disabled = tapCurrentPage === 0;
    nextBtn.disabled = tapCurrentPage >= pages - 1;

    dots.innerHTML = Array(pages).fill(0).map((_, i) =>
        `<div class="page-dot ${i === tapCurrentPage ? 'active' : ''}" onclick="goToTapPage(${i})"></div>`
    ).join('');
}

function changeTapPage(delta) {
    const pages = Math.ceil(DATA.storsteTapte.length / 5);
    tapCurrentPage = Math.max(0, Math.min(pages - 1, tapCurrentPage + delta));
    renderTapPage();
}

function goToTapPage(page) {
    tapCurrentPage = page;
    renderTapPage();
}

// ============================================
// REGION TABLE (enklere versjon uten drill-down)
// ============================================

function initRegionTable() {
    const body = document.getElementById('regionTableBody');
    if (!body) return;

    body.innerHTML = DATA.regioner.map(r => {
        const tilslagClass = r.tilslag >= 68 ? 'best' : r.tilslag < 63 ? 'highlight-cell' : '';
        return `
            <tr>
                <td style="text-transform: capitalize;">${r.navn}</td>
                <td>${r.vunnet}</td>
                <td>${r.tapt}</td>
                <td>${r.direkte}</td>
                <td class="${tilslagClass}">${r.tilslag}%</td>
                <td>${r.tilbudskost}%</td>
            </tr>
        `;
    }).join('');
}
