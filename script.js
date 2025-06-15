document.addEventListener('DOMContentLoaded', () => {

    // --- Processed Data from your CSV file ---
    const incidentsPerYear = [{'year': 1954, 'incidents': 1}, {'year': 1970, 'incidents': 1}, {'year': 1976, 'incidents': 1}, {'year': 1980, 'incidents': 2}, {'year': 1986, 'incidents': 2}, {'year': 1987, 'incidents': 2}, {'year': 1988, 'incidents': 2}, {'year': 1989, 'incidents': 1}, {'year': 1990, 'incidents': 2}, {'year': 1991, 'incidents': 1}, {'year': 1992, 'incidents': 2}, {'year': 1993, 'incidents': 1}, {'year': 1994, 'incidents': 1}, {'year': 1995, 'incidents': 1}, {'year': 1996, 'incidents': 2}, {'year': 1998, 'incidents': 1}, {'year': 2000, 'incidents': 1}, {'year': 2001, 'incidents': 1}, {'year': 2002, 'incidents': 1}, {'year': 2003, 'incidents': 2}, {'year': 2005, 'incidents': 1}, {'year': 2006, 'incidents': 3}, {'year': 2007, 'incidents': 2}, {'year': 2008, 'incidents': 3}, {'year': 2009, 'incidents': 1}, {'year': 2010, 'incidents': 2}, {'year': 2011, 'incidents': 1}, {'year': 2012, 'incidents': 4}, {'year': 2013, 'incidents': 3}, {'year': 2014, 'incidents': 4}, {'year': 2015, 'incidents': 3}, {'year': 2016, 'incidents': 3}, {'year': 2017, 'incidents': 3}, {'year': 2018, 'incidents': 2}, {'year': 2019, 'incidents': 4}, {'year': 2020, 'incidents': 1}, {'year': 2021, 'incidents': 1}, {'year': 2022, 'incidents': 3}, {'year': 2024, 'incidents': 2}];
    const causeData = [{'category': 'Fall-Related', 'count': 57}, {'category': 'Other/Unknown', 'count': 9}, {'category': 'Alcohol Poisoning', 'count': 4}, {'category': 'Drowning', 'count': 3}, {'category': 'Hazing', 'count': 1}];
    const totalIncidents = 74;

    // --- Set Dynamic Year in Footer ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- Populate Cards with Initial Data ---
    document.getElementById('total-incidents').textContent = `${totalIncidents} Total`;
    const latestYearData = incidentsPerYear[incidentsPerYear.length - 1];
    document.getElementById('latest-year-value').textContent = latestYearData.incidents;
    document.getElementById('latest-year-label').textContent = `Incidents in ${latestYearData.year}`;
    
    // --- Populate Cause Breakdown Card ---
    const causeGrid = document.getElementById('cause-breakdown-grid');
    causeData.forEach(item => {
        const categoryClass = `category-${item.category.split('/')[0].toLowerCase().replace('-related', '')}`;
        const breakdownItem = document.createElement('div');
        breakdownItem.classList.add('breakdown-item');
        breakdownItem.innerHTML = `
            <span class="breakdown-label ${categoryClass}">${item.category}</span>
            <span class="breakdown-value">${item.count}</span>
        `;
        causeGrid.appendChild(breakdownItem);
    });


    // --- Main Line Chart Drawing Logic ---
    function drawLineChart(svgElementId, data) {
        const svgContainer = document.getElementById(svgElementId);
        if (!svgContainer) return;
        const svg = svgContainer.querySelector('.chart-svg');
        svg.innerHTML = ''; // Clear previous chart

        const width = svg.viewBox.baseVal.width;
        const height = svg.viewBox.baseVal.height;
        const margin = { top: 10, right: 10, bottom: 20, left: 10 };

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // --- Create Scales ---
        const years = data.map(d => d.year);
        const values = data.map(d => d.incidents);

        const xScale = (year) => {
            const minYear = Math.min(...years);
            const maxYear = Math.max(...years);
            return margin.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;
        };

        const yScale = (value) => {
            const minVal = 0;
            const maxVal = Math.max(...values) * 1.1; // 10% padding at top
            return margin.top + chartHeight - ((value - minVal) / (maxVal - minVal)) * chartHeight;
        };

        // --- Define Gradient ---
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = `<linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:var(--color-chart-fill-start)" />
                            <stop offset="100%" style="stop-color:var(--color-chart-fill-end)" />
                          </linearGradient>`;
        defs.innerHTML = gradient;
        svg.appendChild(defs);

        // --- Draw Grid Lines (minimalist style) ---
        const yMax = Math.max(...values) * 1.1;
        const numGridLines = 3; // Top, middle, bottom
        for (let i = 0; i <= numGridLines; i++) {
            const y = margin.top + (chartHeight / numGridLines) * i;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', margin.left);
            line.setAttribute('y1', y);
            line.setAttribute('x2', width - margin.right);
            line.setAttribute('y2', y);
            line.classList.add('grid-line-y');
            svg.appendChild(line);
        }

        // --- Create Line and Fill Area Paths ---
        const linePathData = data.map(d => `${xScale(d.year)},${yScale(d.incidents)}`).join(' L');
        const areaPathData = `M${xScale(data[0].year)},${height - margin.bottom} L${linePathData} L${xScale(data[data.length - 1].year)},${height - margin.bottom} Z`;

        const fillArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        fillArea.setAttribute('d', areaPathData);
        fillArea.classList.add('chart-fill-area');
        svg.appendChild(fillArea);

        const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        linePath.setAttribute('d', `M${linePathData}`);
        linePath.classList.add('line-path');
        svg.appendChild(linePath);
        
        // --- Add X-Axis Labels ---
        const uniqueYears = [...new Set(data.map(d => Math.floor(d.year / 10) * 10))]; // Decades
        const numLabels = 4;
        const step = Math.ceil(data.length / numLabels);
        for(let i=0; i<data.length; i += step) {
            const year = data[i].year;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', xScale(year));
            text.setAttribute('y', height);
            text.setAttribute('text-anchor', 'middle');
            text.textContent = year;
            text.classList.add('axis-text');
            svg.appendChild(text);
        }
    }

    // --- Initialize and handle resize ---
    function initializeDashboard() {
        drawLineChart('incidents-per-year-chart', incidentsPerYear);
    }

    initializeDashboard();
    window.addEventListener('resize', initializeDashboard);
});
