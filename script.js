// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    try {
        initNavDots();
        initScrollProgress();
        initCounters();
        initCharts();
        initScrollAnimations();
        initPaginatedSections();
        console.log('About to call initRegionTable...');
        initRegionTable();
        console.log('initRegionTable completed');
        initMobileClickHandlers();
        console.log('Mobile click handlers initialized');
    } catch (e) {
        console.error('Error during initialization:', e);
    }
});

// Initialize mobile-friendly click handlers
function initMobileClickHandlers() {
    // Stat cards på side 2
    const statCards = document.querySelectorAll('.stat-card.clickable');
    statCards.forEach(card => {
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr) {
            // Ekstraher type fra onclick="toggleStatDetails('totalt')"
            const match = onclickAttr.match(/toggleStatDetails\(['"](\w+)['"]\)/);
            if (match) {
                const type = match[1];
                card.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    toggleStatDetails(type);
                }, { passive: false });
            }
        }
    });

    // Klikk for detaljer (størrelser)
    const sizeHint = document.querySelector('.clickable-hint[onclick*="toggleSizeDetails"]');
    if (sizeHint) {
        sizeHint.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleSizeDetails();
        }, { passive: false });
    }

    // Close buttons
    const closeButtons = document.querySelectorAll('.detail-close, .region-modal-close, .vunne-tilbud-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.click();
        }, { passive: false });
    });
}

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

    // Nye intro-grafer fra PowerPoint
    createAplHistoriskIntroChart();
    createDivisjonIntroChart();
    createAarsverkIntroChart();

    // Eksisterende grafer
    createHistoriskChart();
    createDivisjonChart();
    createStorrelseChart();
    createTimefordelingChart();
}

// ============================================
// NYE INTRO-GRAFER (fra PowerPoint 2018-2025)
// ============================================

function createAplHistoriskIntroChart() {
    const ctx = document.getElementById('aplHistoriskIntroChart');
    if (!ctx) return;

    // Data fra PowerPoint: Tilbud- og markedsføringstid - APL
    const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'];
    const tilbudPct = [5.3, 5.8, 7.3, 5.3, 4.9, 5.6, 4.7, 5.6];
    const markedPct = [1.9, 2.3, 2.4, 1.9, 2.6, 2.9, 2.8, 2.5];
    const totalPct = [7.2, 8.1, 9.7, 7.2, 7.5, 8.5, 7.5, 8.1];
    const maal = 7.0;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Tilbud %',
                    data: tilbudPct,
                    backgroundColor: '#3d5a4f',
                    borderRadius: 4,
                    stack: 'stack1'
                },
                {
                    label: 'Marked %',
                    data: markedPct,
                    backgroundColor: '#5a9a6e',
                    borderRadius: 4,
                    stack: 'stack1'
                },
                {
                    label: 'Mål 7%',
                    data: Array(years.length).fill(maal),
                    type: 'line',
                    borderColor: '#c9a84a',
                    borderDash: [8, 4],
                    borderWidth: 3,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        afterBody: function(context) {
                            const idx = context[0].dataIndex;
                            return [
                                '',
                                'Totalt: ' + totalPct[idx] + '%',
                                'Årsverk: ' + [15.5, 19.6, 25.1, 18.8, 19.6, 21.9, 18.4, 19.8][idx]
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    stacked: true,
                    max: 12,
                    ticks: {
                        callback: (value) => value + '%'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createDivisjonIntroChart() {
    const ctx = document.getElementById('divisjonIntroChart');
    if (!ctx) return;

    // Data fra PowerPoint: Divisjoner sammenligning
    const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'];
    const aplData = [7.2, 8.1, 9.7, 7.2, 7.5, 8.5, 7.5, 8.1];
    const infraData = [3.7, 4.2, 5.0, 4.0, 3.5, 3.9, 5.2, 4.5];
    const abData = [4.5, 4.1, 5.4, 5.2, 4.3, 4.1, 4.5, 6.9];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'APL',
                    data: aplData,
                    borderColor: '#1a5f3c',
                    backgroundColor: 'rgba(26, 95, 60, 0.2)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#1a5f3c',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    borderWidth: 4
                },
                {
                    label: 'Infrastruktur',
                    data: infraData,
                    borderColor: '#dc3545',
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    borderWidth: 4
                },
                {
                    label: 'A&B',
                    data: abData,
                    borderColor: '#0d6efd',
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    pointRadius: 7,
                    pointHoverRadius: 10,
                    pointBackgroundColor: '#0d6efd',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    borderWidth: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
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
                    min: 0,
                    max: 12,
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

function createAarsverkIntroChart() {
    const ctx = document.getElementById('aarsverkIntroChart');
    if (!ctx) return;

    // Data fra PowerPoint: Årsverk tilbud og marked
    const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'];
    const aplData = [15.5, 19.6, 25.1, 18.8, 19.6, 21.9, 18.4, 19.8];
    const infraData = [10.3, 12.5, 17.2, 13.1, 11.8, 13.8, 15.7, 15.4];
    const abData = [14.4, 14.7, 20.4, 20.4, 19.6, 17.3, 17.9, 31.0];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'APL',
                    data: aplData,
                    backgroundColor: '#1a5f3c',
                    borderRadius: 4
                },
                {
                    label: 'Infrastruktur',
                    data: infraData,
                    backgroundColor: '#dc3545',
                    borderRadius: 4
                },
                {
                    label: 'A&B',
                    data: abData,
                    backgroundColor: '#0d6efd',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.parsed.y} årsverk`
                    }
                }
            },
            scales: {
                y: {
                    max: 35,
                    ticks: {
                        callback: (value) => value
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
    console.log('toggleStatDetails called with type:', type);

    const panel = document.getElementById('detailPanel');
    const title = document.getElementById('detailTitle');
    const content = document.getElementById('detailContent');

    if (!panel || !title || !content) {
        console.error('Detail panel elements not found:', { panel, title, content });
        return;
    }

    if (!DATA || !DATA.timerDetaljer || !DATA.tilbud2025) {
        console.error('DATA not available:', { DATA: !!DATA, timerDetaljer: DATA?.timerDetaljer, tilbud2025: DATA?.tilbud2025 });
        return;
    }

    const d = DATA.timerDetaljer;
    const t = DATA.tilbud2025;
    const a = DATA.alleTimerKategorier || {};

    // Beregn totalt volum (vunnet + tapt + direkte verdi)
    const totalVerdi = t.vunnet.verdi + t.tapt.verdi + t.direkte.verdi;

    const details = {
        totalt: {
            title: 'Tilbudsvolum totalt - ' + t.totalt + ' tilbud',
            items: [
                { label: 'Total tilbudsverdi', value: totalVerdi.toFixed(0) + 'M', sub: 'NOK (vunnet + tapt + direkte)' },
                { label: 'Vunnet', value: t.vunnet.antall + ' stk', sub: t.vunnet.verdi.toFixed(1) + 'M - ' + t.vunnet.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Tapt', value: t.tapt.antall + ' stk', sub: t.tapt.verdi.toFixed(1) + 'M - ' + t.tapt.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Direkte anskaffelse', value: t.direkte.antall + ' stk', sub: t.direkte.verdi.toFixed(1) + 'M - ' + t.direkte.timer.toLocaleString('nb-NO') + ' timer' },
                { label: 'Timer vunnet/tapt/direkte', value: (a.vunnetTaptDirekte || t.totaleTilbudTimer).toLocaleString('nb-NO'), sub: ((a.vunnetTaptDirekte / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'Timer registrert/under arbeid/levert', value: (a.registrertUnderArbeidLevert || 0).toLocaleString('nb-NO'), sub: ((a.registrertUnderArbeidLevert / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'Timer andre divisjoner', value: (a.andreDivisjoner || 0).toLocaleString('nb-NO'), sub: ((a.andreDivisjoner / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'Timer trukket/forkastet', value: (a.trukketForkastet || 0).toLocaleString('nb-NO'), sub: ((a.trukketForkastet / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'Timer prekvalifisert', value: (a.prekvalifisert || 0).toLocaleString('nb-NO'), sub: ((a.prekvalifisert / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'Timer annet/ikke plassert', value: (a.annetIkkePlassert || 0).toLocaleString('nb-NO'), sub: ((a.annetIkkePlassert / a.totalSum) * 100).toFixed(1) + '%' },
                { label: 'TOTAL SUM TIMER', value: (a.totalSum || t.totaleTilbudTimer).toLocaleString('nb-NO'), sub: '100%' },
                { label: 'Total tilbudskostnad', value: t.totalTilbudskostnad.toFixed(1) + 'M', sub: 'NOK' },
                { label: 'Realisert verdi (V+D)', value: t.realisertVerdi.toFixed(1) + 'M', sub: 'NOK' },
                { label: 'Tilbudskost av realisert', value: t.tilbudskostAvRealisert + '%', sub: '' },
                { label: 'Timer vunnet per MNOK', value: (DATA.timerPerMillion?.kunVunnet || '-') + ' timer', sub: 'kun vunnet-timer' },
                { label: 'Timer (V+D) per MNOK', value: (DATA.timerPerMillion?.vunnetOgDirekte || '-') + ' timer', sub: 'vunnet + direkte timer' },
                { label: 'Alle tilbudstimer per MNOK', value: (DATA.timerPerMillion?.alleTilbudstimer || '-') + ' timer', sub: 'inkl. tapte timer' }
            ]
        },
        vunnet: {
            title: 'Vunnet - ' + t.vunnet.antall + ' tilbud',
            items: [
                { label: 'Kontraktsverdi', value: t.vunnet.verdi.toFixed(1) + 'M', sub: 'NOK' },
                { label: 'Timer brukt', value: t.vunnet.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer (alle)', value: DATA.timerPerTilbud.vunnet + ' timer', sub: 'per tilbud' },
                { label: 'Vektet snitt (renset)', value: (DATA.vektetSnitt?.vunnet?.snittTimer || '-') + ' timer', sub: DATA.vektetSnitt?.vunnet ? DATA.vektetSnitt.vunnet.antallMedTimer + ' med timer, ' + DATA.vektetSnitt.vunnet.antallUtenTimer + ' uten' : '' },
                { label: 'Timer per MNOK vunnet', value: (DATA.timerPerMillion?.kunVunnet || '-') + ' timer', sub: 'for å vinne 1 MNOK' },
                { label: 'Tilslag (antall)', value: t.tilslagAntall + '%', sub: 'av konkurranser' },
                { label: 'Tilslag (verdi)', value: t.tilslagVerdi + '%', sub: 'av total verdi' }
            ]
        },
        tapt: {
            title: 'Tapt - ' + t.tapt.antall + ' tilbud',
            items: [
                { label: 'Tapt kontraktsverdi', value: t.tapt.verdi.toFixed(1) + 'M', sub: 'NOK potensial' },
                { label: 'Timer brukt', value: t.tapt.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer (alle)', value: DATA.timerPerTilbud.tapt + ' timer', sub: 'per tilbud' },
                { label: 'Vektet snitt (renset)', value: (DATA.vektetSnitt?.tapt?.snittTimer || '-') + ' timer', sub: DATA.vektetSnitt?.tapt ? DATA.vektetSnitt.tapt.antallMedTimer + ' med timer, ' + DATA.vektetSnitt.tapt.antallUtenTimer + ' uten' : '' },
                { label: 'Andel av tilbudstimer', value: ((t.tapt.timer / t.totaleTilbudTimer) * 100).toFixed(0) + '%', sub: 'brukt på tap' }
            ]
        },
        direkte: {
            title: 'Direkte anskaffelse - ' + t.direkte.antall + ' tilbud',
            items: [
                { label: 'Kontraktsverdi', value: t.direkte.verdi.toFixed(1) + 'M', sub: 'NOK' },
                { label: 'Andel av alle tilbud', value: ((t.direkte.antall / t.totalt) * 100).toFixed(0) + '%', sub: 'av totalt antall' },
                { label: 'Timer brukt', value: t.direkte.timer.toLocaleString('nb-NO'), sub: 'timer totalt' },
                { label: 'Snitt timer (alle)', value: DATA.timerPerTilbud.direkte + ' timer', sub: 'per tilbud' },
                { label: 'Vektet snitt (renset)', value: (DATA.vektetSnitt?.direkte?.snittTimer || '-') + ' timer', sub: DATA.vektetSnitt?.direkte ? DATA.vektetSnitt.direkte.antallMedTimer + ' med timer, ' + DATA.vektetSnitt.direkte.antallUtenTimer + ' uten' : '' }
            ]
        }
    };

    const data = details[type];
    title.textContent = data.title;
    content.innerHTML = data.items.map(item => {
        if (item.label === '---') {
            return '<hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">';
        }
        return `
            <div class="detail-item">
                <div class="detail-item-label">${item.label}</div>
                <div class="detail-item-value">${item.value}</div>
                <div class="detail-item-sub">${item.sub}</div>
            </div>
        `;
    }).join('');

    panel.style.display = 'block';
}

function closeDetailPanel() {
    document.getElementById('detailPanel').style.display = 'none';
}

// Size Details Toggle - oppdatert for ny struktur
function toggleSizeDetails() {
    console.log('toggleSizeDetails called');
    const panel = document.getElementById('sizeDetailsPanel');
    const body = document.getElementById('sizeDetailsBody');

    if (!panel || !body) {
        console.error('sizeDetailsPanel or sizeDetailsBody not found');
        return;
    }

    if (!DATA || !DATA.storrelser) {
        console.error('DATA.storrelser not found');
        return;
    }

    if (panel.style.display === 'none' || panel.style.display === '') {
        body.innerHTML = DATA.storrelser.map(s => {
            const tilslagVerdi = s.tilslagVerdi || s.tilslag; // Bruk tilslagVerdi hvis tilgjengelig
            const tilslagClass = tilslagVerdi >= 70 ? 'good' : tilslagVerdi >= 50 ? 'warning' : 'bad';
            const kostClass = s.tilbudskostAvRealisert <= 2 ? 'good' : s.tilbudskostAvRealisert <= 4 ? 'warning' : 'bad';
            return `
                <tr class="clickable-row" onclick="showVunneTilbud('storrelse', '${s.navn}')" style="cursor: pointer;">
                    <td>${s.label} <span style="font-size: 0.7em; opacity: 0.6;">→</span></td>
                    <td>${s.vunnet + s.tapt + s.direkte}</td>
                    <td class="${tilslagClass}">${tilslagVerdi}%</td>
                    <td>${s.timer.toLocaleString('nb-NO')}</td>
                    <td>${s.verdiVunnetDirekte}M</td>
                    <td class="${kostClass}">${s.tilbudskostAvRealisert}%</td>
                </tr>
            `;
        }).join('');
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

// Eksporter til global scope for onclick
window.toggleSizeDetails = toggleSizeDetails;

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

// Forretningsområder paginering - oppdatert for nye datafelt
function renderFoPage() {
    const container = document.getElementById('foContent');
    const pageNum = document.getElementById('foPageNum');
    const totalPages = document.getElementById('foTotalPages');
    const prevBtn = document.getElementById('foPrevBtn');
    const nextBtn = document.getElementById('foNextBtn');
    const dots = document.getElementById('foPageDots');

    // Bruk forretningsomrader (ny) eller foAlleOmrader (gammel) for bakoverkompatibilitet
    const data = DATA.forretningsomrader || DATA.foAlleOmrader;
    const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
    totalPages.textContent = pages;
    pageNum.textContent = foCurrentPage + 1;

    const start = foCurrentPage * ITEMS_PER_PAGE;
    const pageData = data.slice(start, start + ITEMS_PER_PAGE);

    container.innerHTML = `
        <div class="fo-paginated-grid">
            ${pageData.map(fo => {
                // Støtt både nye og gamle feltnavn
                const tilbudskostAvRealisert = fo.tilbudskostAvRealisert !== undefined ? fo.tilbudskostAvRealisert : null;
                const verdiVunnetDirekte = fo.verdiVunnetDirekte !== undefined ? fo.verdiVunnetDirekte : (fo.verdiVunnet !== undefined ? fo.verdiVunnet : null);
                // Bruk tilslagVerdi (verdi inkl. direkte) hvis tilgjengelig, ellers tilslag (antall)
                const tilslagVerdi = fo.tilslagVerdi !== undefined ? fo.tilslagVerdi : fo.tilslag;
                const foNavn = fo.navn.replace(/'/g, "\\'");

                return `
                <div class="fo-detail-card ${tilslagVerdi < 50 ? 'weak' : ''} clickable-card" onclick="showVunneTilbud('fo', '${foNavn}')">
                    <div class="fo-detail-header">
                        <div class="fo-detail-name">${fo.navn}</div>
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
                            <div class="fo-stat-label">Verdi vunnet + direkte</div>
                            <div class="fo-stat-value">${verdiVunnetDirekte !== null ? verdiVunnetDirekte.toFixed(1) + 'M' : '-'}</div>
                        </div>
                        <div class="fo-stat">
                            <div class="fo-stat-label">Tilbudstimer</div>
                            <div class="fo-stat-value">${fo.timer.toLocaleString('nb-NO')}</div>
                        </div>
                        <div class="fo-stat">
                            <div class="fo-stat-label">Tilbudskost % av realisert</div>
                            <div class="fo-stat-value">${tilbudskostAvRealisert !== null ? tilbudskostAvRealisert.toFixed(1) + '%' : '-'}</div>
                        </div>
                        <div class="fo-stat fo-tilslag-verdi">
                            <div class="fo-stat-label">Tilslag (verdi)</div>
                            <div class="fo-stat-value fo-pct">${tilslagVerdi}%</div>
                        </div>
                    </div>
                </div>
            `}).join('')}
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
    const data = DATA.forretningsomrader || DATA.foAlleOmrader;
    const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
    foCurrentPage = Math.max(0, Math.min(pages - 1, foCurrentPage + delta));
    renderFoPage();
}

function goToFoPage(page) {
    foCurrentPage = page;
    renderFoPage();
}

// Kunde paginering - oppdatert for nye datafelt med tilbudskostMNOK og tilbudskostAvRealisert
function renderKundePage() {
    const body = document.getElementById('kundeTableBody');
    const pageNum = document.getElementById('kundePageNum');
    const totalPages = document.getElementById('kundeTotalPages');
    const prevBtn = document.getElementById('kundePrevBtn');
    const nextBtn = document.getElementById('kundeNextBtn');
    const dots = document.getElementById('kundePageDots');

    // Bruk kunder (ny) eller topKunder (gammel) for bakoverkompatibilitet
    const data = DATA.kunder || DATA.topKunder;
    const perPage = 7;
    const pages = Math.ceil(data.length / perPage);
    totalPages.textContent = pages;
    pageNum.textContent = kundeCurrentPage + 1;

    const start = kundeCurrentPage * perPage;
    const pageData = data.slice(start, start + perPage);

    body.innerHTML = pageData.map(k => {
        // Støtt både nye og gamle feltnavn
        const tilbudskostAvRealisert = k.tilbudskostAvRealisert !== undefined ? k.tilbudskostAvRealisert : null;
        const verdiVunnetDirekte = k.verdiVunnetDirekte !== undefined ? k.verdiVunnetDirekte : (k.verdiVunnet !== undefined ? k.verdiVunnet : 0);
        // Bruk tilslagVerdi (verdi-basert) hvis tilgjengelig, ellers tilslag (antall-basert)
        const tilslagVerdi = k.tilslagVerdi !== undefined ? k.tilslagVerdi : k.tilslag;

        const tilslagClass = tilslagVerdi >= 70 ? 'best' : tilslagVerdi < 50 ? 'bad' : '';
        const kostClass = tilbudskostAvRealisert !== null ? (tilbudskostAvRealisert <= 2 ? 'best' : tilbudskostAvRealisert > 10 ? 'bad' : '') : '';
        const rowClass = tilslagVerdi >= 70 ? 'kunde-best' : tilslagVerdi < 50 ? 'kunde-bad' : '';
        const kundeNavn = k.navn.replace(/'/g, "\\'");

        return `
            <tr class="${rowClass} clickable-row" onclick="showVunneTilbud('kunde', '${kundeNavn}')">
                <td>${k.navn}</td>
                <td>${k.antall}</td>
                <td>${k.vunnet}</td>
                <td>${k.direkte}</td>
                <td class="${tilslagClass}">${tilslagVerdi}%</td>
                <td>${verdiVunnetDirekte}M</td>
                <td>${k.timer.toLocaleString('nb-NO')}</td>
                <td class="${kostClass}">${tilbudskostAvRealisert !== null ? tilbudskostAvRealisert.toFixed(1) + '%' : '-'}</td>
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
    const data = DATA.kunder || DATA.topKunder;
    const pages = Math.ceil(data.length / 7);
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
// REGION TABLE - med drill-down til grupper og kontorer
// ============================================

function initRegionTable() {
    const body = document.getElementById('regionTableBody');
    if (!body) {
        console.error('regionTableBody not found');
        return;
    }

    if (!DATA.regioner || DATA.regioner.length === 0) {
        console.error('DATA.regioner is empty or undefined:', DATA.regioner);
        body.innerHTML = '<tr><td colspan="7">Ingen regioner funnet</td></tr>';
        return;
    }

    console.log('Rendering', DATA.regioner.length, 'regioner');

    body.innerHTML = DATA.regioner.map(r => {
        const tilbudskostAvRealisert = r.tilbudskostAvRealisert !== undefined ? r.tilbudskostAvRealisert : null;
        const regionNavn = r.kortNavn || r.navn;

        const tilslagClass = r.tilslag >= 68 ? 'best' : r.tilslag < 63 ? 'highlight-cell' : '';
        const kostClass = tilbudskostAvRealisert !== null ? (tilbudskostAvRealisert <= 1.5 ? 'best' : tilbudskostAvRealisert > 2 ? 'highlight-cell' : '') : '';

        // Bruk ferdigberegnet antall fra data, eller fall tilbake til filtrering basert på fullt navn
        const grupperCount = r.grupperCount !== undefined ? r.grupperCount : (DATA.grupper ? DATA.grupper.filter(g => g.region === r.navn).length : 0);
        const kontorerCount = r.kontorerCount !== undefined ? r.kontorerCount : (DATA.kontorer ? DATA.kontorer.filter(k => k.region === r.navn).length : 0);

        return `
            <tr>
                <td style="text-transform: capitalize;">
                    ${regionNavn}
                    <div class="region-buttons">
                        <button class="region-drill-btn" onclick="showRegionGrupper('${r.navn}')" title="Vis grupper">
                            Grupper (${grupperCount})
                        </button>
                        <button class="region-drill-btn" onclick="showRegionKontorer('${r.navn}')" title="Vis kontorer">
                            Kontorer (${kontorerCount})
                        </button>
                    </div>
                </td>
                <td>${r.vunnet}</td>
                <td>${r.tapt}</td>
                <td>${r.direkte}</td>
                <td class="${tilslagClass}">${r.tilslag}%</td>
                <td>${r.timer.toLocaleString('nb-NO')}</td>
                <td class="${kostClass}">${tilbudskostAvRealisert !== null ? tilbudskostAvRealisert.toFixed(1) + '%' : '-'}</td>
            </tr>
        `;
    }).join('');
}

// Vis grupper for en region
function showRegionGrupper(regionNavn) {
    const grupper = DATA.grupper ? DATA.grupper.filter(g => g.region === regionNavn) : [];
    grupper.sort((a, b) => b.timer - a.timer);

    const modal = document.createElement('div');
    modal.className = 'region-modal active';
    modal.innerHTML = `
        <div class="region-modal-content">
            <div class="region-modal-header">
                <h2>Grupper i ${regionNavn} (${grupper.length} grupper)</h2>
                <button class="region-modal-close" onclick="this.closest('.region-modal').remove()">✕</button>
            </div>
            <div class="region-modal-body">
                <p class="modal-hint">Klikk på en rad for å se topp 5 vunne tilbud</p>
                <table class="region-detail-table">
                    <thead>
                        <tr>
                            <th>Gruppe</th>
                            <th>Vunnet</th>
                            <th>Tapt</th>
                            <th>Direkte</th>
                            <th>Antall</th>
                            <th>Tilslag %</th>
                            <th>Timer</th>
                            <th>Verdi V+D</th>
                            <th>Tilbudskost %</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${grupper.map(g => {
                            const tilslagClass = g.tilslag >= 70 ? 'good' : g.tilslag < 50 ? 'bad' : 'warning';
                            const kostClass = g.tilbudskostAvRealisert !== null ? (g.tilbudskostAvRealisert <= 2 ? 'good' : g.tilbudskostAvRealisert > 5 ? 'bad' : 'warning') : '';
                            const gruppeNavn = g.navn.replace(/'/g, "\\'");
                            return `
                                <tr class="clickable-row" onclick="showVunneTilbud('gruppe', '${gruppeNavn}')">
                                    <td>${g.navn}</td>
                                    <td>${g.vunnet}</td>
                                    <td>${g.tapt}</td>
                                    <td>${g.direkte}</td>
                                    <td>${g.antall}</td>
                                    <td class="${tilslagClass}">${g.tilslag}%</td>
                                    <td class="highlight">${g.timer.toLocaleString('nb-NO')}</td>
                                    <td>${g.verdiVunnetDirekte ? g.verdiVunnetDirekte.toFixed(1) + ' M' : '-'}</td>
                                    <td class="${kostClass}">${g.tilbudskostAvRealisert !== null ? g.tilbudskostAvRealisert.toFixed(1) + '%' : '-'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Vis kontorer for en region
function showRegionKontorer(regionNavn) {
    const kontorer = DATA.kontorer ? DATA.kontorer.filter(k => k.region === regionNavn) : [];
    kontorer.sort((a, b) => b.timer - a.timer);

    const modal = document.createElement('div');
    modal.className = 'region-modal active';
    modal.innerHTML = `
        <div class="region-modal-content">
            <div class="region-modal-header">
                <h2>Kontorer i ${regionNavn} (${kontorer.length} kontorer)</h2>
                <button class="region-modal-close" onclick="this.closest('.region-modal').remove()">✕</button>
            </div>
            <div class="region-modal-body">
                <p class="modal-hint">Klikk på en rad for å se topp 5 vunne tilbud</p>
                <table class="region-detail-table">
                    <thead>
                        <tr>
                            <th>Kontor</th>
                            <th>Vunnet</th>
                            <th>Tapt</th>
                            <th>Direkte</th>
                            <th>Antall</th>
                            <th>Tilslag %</th>
                            <th>Timer</th>
                            <th>Verdi V+D</th>
                            <th>Tilbudskost %</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${kontorer.map(k => {
                            const tilslagClass = k.tilslag >= 70 ? 'good' : k.tilslag < 50 ? 'bad' : 'warning';
                            const kostClass = k.tilbudskostAvRealisert !== null ? (k.tilbudskostAvRealisert <= 2 ? 'good' : k.tilbudskostAvRealisert > 5 ? 'bad' : 'warning') : '';
                            const kontorNavn = k.navn.replace(/'/g, "\\'");
                            return `
                                <tr class="clickable-row" onclick="showVunneTilbud('kontor', '${kontorNavn}')">
                                    <td>${k.navn}</td>
                                    <td>${k.vunnet}</td>
                                    <td>${k.tapt}</td>
                                    <td>${k.direkte}</td>
                                    <td>${k.antall}</td>
                                    <td class="${tilslagClass}">${k.tilslag}%</td>
                                    <td class="highlight">${k.timer.toLocaleString('nb-NO')}</td>
                                    <td>${k.verdiVunnetDirekte ? k.verdiVunnetDirekte.toFixed(1) + ' M' : '-'}</td>
                                    <td class="${kostClass}">${k.tilbudskostAvRealisert !== null ? k.tilbudskostAvRealisert.toFixed(1) + '%' : '-'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Lukk region modal
function closeRegionModal() {
    const modal = document.getElementById('regionModal');
    if (modal) modal.classList.remove('active');
}

// Vis tilbud for en gruppe, kontor, kunde eller forretningsområde
function showVunneTilbud(type, navn) {
    // Hent tilbud fra riktig datakilde
    let tilbud = [];
    let tittel = '';
    let showKundeColumn = true;
    let showGruppeKontorColumns = false;

    if (type === 'gruppe') {
        tilbud = DATA.tilbudPerGruppe ? DATA.tilbudPerGruppe[navn] || [] : [];
        tittel = 'Alle tilbud - ' + navn;
    } else if (type === 'kontor') {
        tilbud = DATA.tilbudPerKontor ? DATA.tilbudPerKontor[navn] || [] : [];
        tittel = 'Alle tilbud - Kontor ' + navn;
    } else if (type === 'kunde') {
        tilbud = DATA.tilbudPerKunde ? DATA.tilbudPerKunde[navn] || [] : [];
        tittel = 'Alle tilbud - ' + navn;
        showKundeColumn = false;
        showGruppeKontorColumns = true;
    } else if (type === 'fo') {
        tilbud = DATA.tilbudPerFO ? DATA.tilbudPerFO[navn] || [] : [];
        tittel = 'Alle tilbud - ' + navn;
        showGruppeKontorColumns = true;
    } else if (type === 'storrelse') {
        tilbud = DATA.tilbudPerStorrelse ? DATA.tilbudPerStorrelse[navn] || [] : [];
        tittel = 'Alle tilbud - Størrelse ' + navn;
        showGruppeKontorColumns = true;
    }

    // Opprett sub-modal
    const subModal = document.createElement('div');
    subModal.className = 'vunne-tilbud-modal active';

    // Bygg dynamisk header basert på hvilke kolonner som skal vises
    let headerHtml = '<th style="width: 80px;">Status</th>';
    if (showKundeColumn) headerHtml += '<th style="width: 18%;">Kunde</th>';
    headerHtml += '<th style="width: auto;">Emne</th><th style="width: 70px;">Verdi</th><th style="width: 70px;">Timer</th><th style="width: 70px;">Kost %</th>';
    if (showGruppeKontorColumns) headerHtml += '<th style="width: 14%;">Gruppe</th><th style="width: 90px;">Kontor</th>';

    // Bygg dynamisk row basert på hvilke kolonner som skal vises
    // Formater verdi - vis desimaler bare når nødvendig
    const formatVerdi = (v) => {
        if (v >= 10) return Math.round(v).toString();
        if (v >= 1) return v.toFixed(1).replace(/\.0$/, '');
        return v.toFixed(2).replace(/\.?0+$/, '');
    };

    const buildRow = (t) => {
        const statusClass = t.status === 'Vunnet' ? 'status-vunnet' :
                           t.status === 'Tapt' ? 'status-tapt' : 'status-direkte';
        let rowHtml = `<td class="status-cell ${statusClass}">${t.status}</td>`;
        if (showKundeColumn) rowHtml += `<td class="kunde-cell">${t.kunde || ''}</td>`;
        rowHtml += `<td class="emne-cell">${t.emne}</td>`;
        rowHtml += `<td class="verdi-cell">${formatVerdi(t.verdi)}</td>`;
        rowHtml += `<td class="timer-cell">${t.timer}</td>`;
        rowHtml += `<td class="kost-cell">${t.tilbudskostProsent}%</td>`;
        if (showGruppeKontorColumns) {
            rowHtml += `<td>${t.gruppe || ''}</td>`;
            rowHtml += `<td>${t.kontor || ''}</td>`;
        }
        return `<tr>${rowHtml}</tr>`;
    };

    const typeLabel = type === 'gruppe' ? 'gruppen' :
                      type === 'kontor' ? 'kontoret' :
                      type === 'kunde' ? 'kunden' :
                      type === 'storrelse' ? 'størrelsen' : 'forretningsområdet';

    subModal.innerHTML = `
        <div class="vunne-tilbud-content">
            <div class="vunne-tilbud-header">
                <h3>${tittel}</h3>
                <button class="vunne-tilbud-close" onclick="this.closest('.vunne-tilbud-modal').remove()">✕</button>
            </div>
            <div class="vunne-tilbud-body">
                ${tilbud.length > 0 ? `
                    <table class="vunne-tilbud-table">
                        <thead>
                            <tr>${headerHtml}</tr>
                        </thead>
                        <tbody>
                            ${tilbud.map(t => buildRow(t)).join('')}
                        </tbody>
                    </table>
                ` : `
                    <div class="ingen-tilbud">
                        <p>Ingen tilbud registrert for ${typeLabel}.</p>
                    </div>
                `}
            </div>
        </div>
    `;

    document.body.appendChild(subModal);

    // Lukk ved klikk utenfor
    subModal.addEventListener('click', (e) => {
        if (e.target === subModal) subModal.remove();
    });

    // Stopp event bubbling for å ikke lukke parent modal
    subModal.querySelector('.vunne-tilbud-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Eksporter alle onclick-funksjoner til global scope
window.toggleStatDetails = toggleStatDetails;
window.closeDetailPanel = closeDetailPanel;
window.changeFoPage = changeFoPage;
window.goToFoPage = goToFoPage;
window.changeKundePage = changeKundePage;
window.goToKundePage = goToKundePage;
window.changeTapPage = changeTapPage;
window.goToTapPage = goToTapPage;
window.showRegionGrupper = showRegionGrupper;
window.showRegionKontorer = showRegionKontorer;
window.closeRegionModal = closeRegionModal;
window.showVunneTilbud = showVunneTilbud;
