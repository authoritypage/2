//
// InsightHub Metrics - Script.js
//
// Author: Your Name/Organization
// Version: 1.0.0
//
// Contains:
// - Dynamic data visualization (Bar-Line Chart with gradient)
// - Chart interactivity (tooltip)
// - Responsive chart resizing
// - Mobile navigation toggle
// - Smooth scrolling for anchor links
// - Dynamic year in footer
//

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');
    const body = document.body;

    if (navToggle && mainNav && navList) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Prevents background scroll
        });

        // Close nav when a link is clicked
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- 3. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 4. Data Visualization Logic ---
    const svg = document.querySelector('#data-visualization .chart-svg');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);

    // Mock Data
    const mockData = [
        { year: 2018, datasets: 15000, engagement: 0.3, apiCalls: 50 },
        { year: 2019, datasets: 22000, engagement: 0.5, apiCalls: 75 },
        { year: 2020, datasets: 30000, engagement: 0.7, apiCalls: 100 },
        { year: 2021, datasets: 38000, engagement: 0.9, apiCalls: 130 },
        { year: 2022, datasets: 45000, engagement: 1.1, apiCalls: 160 },
        { year: 2023, datasets: 52000, engagement: 1.3, apiCalls: 200 }
    ];

    let currentMetric = 'datasets'; // Default metric

    const metricSelect = document.getElementById('metric-select');
    if (metricSelect) {
        metricSelect.addEventListener('change', (event) => {
            currentMetric = event.target.value;
            drawChart(); // Redraw chart with new metric
        });
    }

    function drawChart() {
        // Clear previous chart elements
        svg.innerHTML = '';

        const svgWidth = svg.viewBox.baseVal.width;
        const svgHeight = svg.viewBox.baseVal.height;

        const margin = { top: 40, right: 40, bottom: 60, left: 60 }; // Increased margin for labels
        const chartWidth = svgWidth - margin.left - margin.right;
        const chartHeight = svgHeight - margin.top - margin.bottom;

        // Create main chart group
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
        svg.appendChild(g);

        // Scales
        const xValues = mockData.map(d => d.year);
        const yValues = mockData.map(d => d[currentMetric]);

        const xScale = (value) => {
            const minYear = Math.min(...xValues);
            const maxYear = Math.max(...xValues);
            const range = maxYear - minYear;
            return ((value - minYear) / range) * chartWidth;
        };

        const yScale = (value) => {
            const minVal = 0; // Always start Y axis from 0
            const maxVal = Math.max(...yValues) * 1.1; // Add 10% padding above max value
            const range = maxVal - minVal;
            return chartHeight - ((value - minVal) / range) * chartHeight; // Invert Y-axis for SVG
        };

        // Add SVG linear gradient definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        linearGradient.setAttribute('id', 'barGradient');
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '0%');
        linearGradient.setAttribute('x2', '0%');
        linearGradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', 'var(--chart-gradient-start)');
        linearGradient.appendChild(stop1);

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', 'var(--chart-gradient-end)');
        linearGradient.appendChild(stop2);

        defs.appendChild(linearGradient);
        svg.appendChild(defs);

        // Bars
        const barWidth = chartWidth / (mockData.length * 1.5); // Adjust spacing
        mockData.forEach((d, i) => {
            const xPos = xScale(d.year) - (barWidth / 2); // Center bars on year
            const barHeight = chartHeight - yScale(d[currentMetric]);

            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', xPos);
            bar.setAttribute('y', yScale(d[currentMetric]));
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', barHeight);
            bar.setAttribute('fill', 'url(#barGradient)');
            bar.classList.add('bar'); // Add class for CSS styling

            // Add data attributes for tooltip
            bar.dataset.year = d.year;
            bar.dataset.value = d[currentMetric].toLocaleString();
            g.appendChild(bar);

            // Bar hover for tooltip
            bar.addEventListener('mouseenter', (event) => {
                tooltip.style.opacity = 1;
                tooltip.textContent = `Year: ${d.year}, Value: ${d[currentMetric].toLocaleString()}`;
                positionTooltip(event);
            });
            bar.addEventListener('mousemove', (event) => {
                positionTooltip(event);
            });
            bar.addEventListener('mouseleave', () => {
                tooltip.style.opacity = 0;
            });
        });

        // Line (Connecting dots representing another metric or primary metric)
        const linePathData = mockData.map(d => {
            const x = xScale(d.year);
            const y = yScale(d[currentMetric] * 0.9 + 500); // Slight offset or different metric
            return `${x},${y}`;
        }).join(' ');

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        line.setAttribute('points', linePathData);
        line.setAttribute('class', 'line-path'); // Add class for CSS styling
        g.appendChild(line);

        // Axes Labels
        // X-axis (Years)
        xValues.forEach(year => {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', xScale(year));
            text.setAttribute('y', chartHeight + margin.bottom / 2);
            text.textContent = year;
            text.classList.add('axis-label');
            g.appendChild(text);
        });

        // Y-axis grid lines and labels (Simplified, few major grid lines)
        const yAxisSteps = 4; // Number of horizontal grid lines
        for (let i = 0; i <= yAxisSteps; i++) {
            const y = chartHeight - (chartHeight / yAxisSteps) * i;
            const value = (Math.max(...yValues) * 1.1 / yAxisSteps) * i;

            // Grid line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', y);
            line.setAttribute('x2', chartWidth);
            line.setAttribute('y2', y);
            line.classList.add('grid-line');
            g.appendChild(line);

            // Label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', -margin.left / 2 + 5); // Position label left of chart area
            text.setAttribute('y', y);
            text.setAttribute('text-anchor', 'start');
            text.setAttribute('font-size', '12px');
            text.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
            text.textContent = `${value.toFixed(0)}`; // Display whole numbers
            g.appendChild(text);
        }

        // --- Tooltip Positioning ---
        function positionTooltip(event) {
            // Get position relative to the main viewport
            const chartRect = svg.getBoundingClientRect();
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Offset tooltip to not cover the mouse pointer
            let tooltipX = mouseX + 15;
            let tooltipY = mouseY + 15;

            // Ensure tooltip stays within viewport
            if (tooltipX + tooltip.offsetWidth > window.innerWidth) {
                tooltipX = mouseX - tooltip.offsetWidth - 15;
            }
            if (tooltipY + tooltip.offsetHeight > window.innerHeight) {
                tooltipY = mouseY - tooltip.offsetHeight - 15;
            }

            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
        }
    }

    // Initial draw and redraw on window resize
    drawChart();
    window.addEventListener('resize', drawChart);

});
