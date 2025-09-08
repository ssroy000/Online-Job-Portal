(function () {
	// Check authentication first
	if (!localStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn') !== 'true') {
		window.location.href = 'login.html';
		return;
	}

	const app = document.querySelector('.app');
	const sidebar = document.getElementById('sidebar');
	const sidebarToggle = document.getElementById('sidebarToggle');
	const themeToggle = document.getElementById('themeToggle');
	const userName = document.getElementById('userName');
	const userAvatar = document.getElementById('userAvatar');
	const welcomeMessage = document.getElementById('welcomeMessage');
	const logoutBtn = document.getElementById('logoutBtn');
	const tabs = document.querySelectorAll('.tab');
	const tabPanels = document.querySelectorAll('.tab-panel');
	const jobsList = document.getElementById('jobsList');
	const applicationTimeline = document.getElementById('applicationTimeline');
	const skillsChips = document.getElementById('skillsChips');
	const careerTips = document.getElementById('careerTips');
	const recentApplicantsEl = document.getElementById('recentApplicants');
	const talentGrid = document.getElementById('talentRecommendations');
	const performanceCanvas = document.getElementById('performanceChart');
	const refreshRecommendations = document.getElementById('refreshRecommendations');
	const filterLocation = document.getElementById('filterLocation');
	const filterExperience = document.getElementById('filterExperience');
	const filterType = document.getElementById('filterType');
	const globalSearch = document.getElementById('globalSearch');
	const dropzone = document.getElementById('dropzone');
	const resumeInput = document.getElementById('resumeInput');
	const browseResume = document.getElementById('browseResume');
	const uploadResult = document.getElementById('uploadResult');

	// Get current user
	const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
	
	// Initialize user interface
	function initializeUser() {
		if (currentUser.name) {
			userName.textContent = `${currentUser.name} ▾`;
			userAvatar.src = currentUser.avatar || 'https://i.pravatar.cc/32?img=12';
			welcomeMessage.textContent = `Hi, ${currentUser.name.split(' ')[0]}! Here are your job opportunities today 👋`;
		}
	}
	
	// Logout functionality
	function logout() {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('currentUser');
		window.location.href = 'login.html';
	}
	
	// Event listeners
	if (logoutBtn) logoutBtn.addEventListener('click', logout);
	
	// Theme persistence
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) app.setAttribute('data-theme', savedTheme);
	function toggleTheme() {
		const current = app.getAttribute('data-theme');
		const next = current === 'dark' ? 'light' : 'dark';
		app.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}
	if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

	// Sidebar toggle (mobile)
	if (sidebarToggle) sidebarToggle.addEventListener('click', () => {
		if (window.matchMedia('(max-width: 680px)').matches) {
			sidebar.classList.toggle('open');
		} else {
			// collapse to icon-only mode
			const collapsed = document.body.getAttribute('data-collapsed') === 'true';
			document.body.setAttribute('data-collapsed', (!collapsed).toString());
		}
	});

	// Tabs
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			tabs.forEach(t => t.classList.remove('active'));
			tabPanels.forEach(p => p.classList.remove('active'));
			tab.classList.add('active');
			document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
		});
	});

	// Sample Data
	const allJobs = [
		{ id: 'j1', company: 'Acme Corp', logo: 'https://dummyimage.com/48x48/1e90ff/ffffff&text=A', title: 'Frontend Developer', salary: '$80k - $100k', location: 'Remote', type: 'Full-time', level: 'Mid' },
		{ id: 'j2', company: 'Globex', logo: 'https://dummyimage.com/48x48/111827/ffffff&text=G', title: 'Backend Engineer', salary: '$90k - $120k', location: 'London', type: 'Full-time', level: 'Senior' },
		{ id: 'j3', company: 'Innotech', logo: 'https://dummyimage.com/48x48/0ea5e9/ffffff&text=I', title: 'UX Designer', salary: '$70k - $90k', location: 'New York', type: 'Contract', level: 'Mid' },
		{ id: 'j4', company: 'Soylent', logo: 'https://dummyimage.com/48x48/10b981/ffffff&text=S', title: 'Data Analyst', salary: '$65k - $85k', location: 'Remote', type: 'Part-time', level: 'Entry' },
		{ id: 'j5', company: 'Umbrella', logo: 'https://dummyimage.com/48x48/f59e0b/ffffff&text=U', title: 'DevOps Engineer', salary: '$100k - $130k', location: 'Remote', type: 'Full-time', level: 'Senior' }
	];

	const applicationEvents = [
		{ stage: 'Applied', desc: 'You applied to Frontend Developer at Acme', date: '2025-09-01' },
		{ stage: 'Viewed', desc: 'Recruiter viewed your application', date: '2025-09-02' },
		{ stage: 'Shortlisted', desc: 'You were shortlisted', date: '2025-09-04' },
		{ stage: 'Interview', desc: 'Interview scheduled for Sep 10, 10:00 AM', date: '2025-09-06' },
		{ stage: 'Offer', desc: 'Offer extended 🎉', date: '2025-09-12' }
	];

	const trendingSkills = ['React', 'TypeScript', 'Node.js', 'Tailwind', 'SQL', 'Docker', 'AWS', 'Python', 'Figma'];
	const tips = [
		'Update your resume with measurable achievements.',
		'Add trending skills to increase visibility.',
		'Customize cover letters to each job posting.',
		'Practice interview questions for the role you want.'
	];

	const recentApplicants = [
		{ name: 'Sara Lee', avatar: 'https://i.pravatar.cc/40?img=5', skills: ['React', 'Redux', 'UI'], match: 92 },
		{ name: 'John Park', avatar: 'https://i.pravatar.cc/40?img=13', skills: ['Node', 'Postgres', 'AWS'], match: 88 },
		{ name: 'Mina Kim', avatar: 'https://i.pravatar.cc/40?img=32', skills: ['Python', 'Pandas', 'ETL'], match: 85 }
	];

	const talent = [
		{ name: 'Alex Morgan', role: 'Senior Frontend', skills: ['React', 'TS', 'Vite'] },
		{ name: 'Diego Lopez', role: 'Backend Engineer', skills: ['Go', 'gRPC', 'K8s'] },
		{ name: 'Priya Singh', role: 'Data Scientist', skills: ['PyTorch', 'NLP', 'SQL'] },
		{ name: 'Emma Davis', role: 'Product Designer', skills: ['Figma', 'UXR', 'Motion'] },
		{ name: 'Liam Chen', role: 'DevOps', skills: ['AWS', 'Terraform', 'Docker'] },
		{ name: 'Noah Patel', role: 'ML Engineer', skills: ['Python', 'Airflow', 'VectorDB'] }
	];

	// Bookmarking
	const savedBookmarks = new Set(JSON.parse(localStorage.getItem('bookmarks') || '[]'));
	function saveBookmarks() {
		localStorage.setItem('bookmarks', JSON.stringify(Array.from(savedBookmarks)));
	}

	function renderJobs() {
		const loc = filterLocation.value || '';
		const lvl = filterExperience.value || '';
		const type = filterType.value || '';
		const q = (globalSearch.value || '').toLowerCase();
		const filtered = allJobs.filter(j =>
			(!loc || j.location === loc) && (!lvl || j.level === lvl) && (!type || j.type === type) &&
			(!q || `${j.company} ${j.title} ${j.location}`.toLowerCase().includes(q))
		);
		jobsList.innerHTML = '';
		filtered.forEach(job => {
			const item = document.createElement('div');
			item.className = 'job-card';
			item.innerHTML = `
				<img src="${job.logo}" alt="${job.company}" width="48" height="48" style="border-radius:10px"/>
				<div>
					<div style="font-weight:600">${job.title}</div>
					<div class="job-meta">${job.company} • ${job.location} • ${job.salary}</div>
				</div>
				<div style="display:flex; gap:6px; align-items:center;">
					<button class="bookmark-btn" data-id="${job.id}">${savedBookmarks.has(job.id) ? '★' : '☆'}</button>
					<button class="apply-btn">Apply</button>
				</div>
			`;
			jobsList.appendChild(item);
		});
	}

	function renderTimeline() {
		applicationTimeline.innerHTML = '';
		applicationEvents.forEach(e => {
			const li = document.createElement('li');
			li.innerHTML = `
				<div class="dot"></div>
				<div class="content">
					<div style="font-weight:600;">${e.stage}</div>
					<div class="job-meta">${e.desc}</div>
					<div class="job-meta">${new Date(e.date).toDateString()}</div>
				</div>
			`;
			applicationTimeline.appendChild(li);
		});
	}

	function renderInsights() {
		skillsChips.innerHTML = '';
		trendingSkills.forEach(s => {
			const li = document.createElement('li');
			li.textContent = s;
			skillsChips.appendChild(li);
		});
		careerTips.innerHTML = tips.map(t => `<div>• ${t}</div>`).join('');
	}

	function renderApplicants() {
		recentApplicantsEl.innerHTML = '';
		recentApplicants.forEach(a => {
			const li = document.createElement('li');
			li.className = 'list-item';
			li.innerHTML = `
				<img src="${a.avatar}" alt="${a.name}"/>
				<div>
					<div style="font-weight:600">${a.name}</div>
					<div class="job-meta">${a.skills.join(', ')}</div>
				</div>
				<span class="badge">${a.match}% match</span>
			`;
			recentApplicantsEl.appendChild(li);
		});
	}

	function renderTalent() {
		talentGrid.innerHTML = '';
		talent.forEach(t => {
			const card = document.createElement('div');
			card.className = 'talent-card';
			card.innerHTML = `
				<div style="font-weight:700">${t.name}</div>
				<div class="job-meta">${t.role}</div>
				<div class="chips" style="margin-top:8px">${t.skills.map(s => `<span class="chips li">${s}</span>`).join('')}</div>
			`;
			talentGrid.appendChild(card);
		});
	}

	function renderChart() {
		if (!performanceCanvas) return;
		const ctx = performanceCanvas.getContext('2d');
		const views = [120, 180, 150, 220, 260, 240];
		const applications = [12, 20, 16, 30, 28, 26];
		const W = performanceCanvas.width = performanceCanvas.clientWidth;
		const H = performanceCanvas.height = 160;
		ctx.clearRect(0,0,W,H);
		ctx.lineWidth = 2;

		function drawLine(data, color, yMax) {
			const padding = 20;
			const stepX = (W - padding*2) / (data.length - 1);
			const max = Math.max(...data);
			const scaleY = (H - padding*2) / (yMax || max);
			ctx.beginPath();
			ctx.strokeStyle = color;
			data.forEach((v, i) => {
				const x = padding + i * stepX;
				const y = H - padding - v * scaleY;
				if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
			});
			ctx.stroke();
		}

		// grid
		ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
		ctx.lineWidth = 1;
		for (let y = 20; y < H; y += 28) {
			ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
		}

		drawLine(views, '#1e90ff');
		drawLine(applications, '#10b981', 300);
	}

	// Events and interactions
	[filterLocation, filterExperience, filterType].forEach(el => el.addEventListener('change', renderJobs));
	if (globalSearch) globalSearch.addEventListener('input', () => {
		// Debounce-lite
		clearTimeout(globalSearch._t);
		globalSearch._t = setTimeout(renderJobs, 200);
	});
	if (refreshRecommendations) refreshRecommendations.addEventListener('click', () => {
		allJobs.sort(() => Math.random() - 0.5);
		renderJobs();
	});

	jobsList.addEventListener('click', (e) => {
		const btn = e.target.closest('.bookmark-btn');
		if (btn) {
			const id = btn.getAttribute('data-id');
			if (savedBookmarks.has(id)) savedBookmarks.delete(id); else savedBookmarks.add(id);
			saveBookmarks();
			btn.textContent = savedBookmarks.has(id) ? '★' : '☆';
		}
	});

	// Drag and drop
	function preventDefaults(e){ e.preventDefault(); e.stopPropagation(); }
	['dragenter','dragover','dragleave','drop'].forEach(eventName => {
		dropzone.addEventListener(eventName, preventDefaults, false);
	});
	['dragenter','dragover'].forEach(n => dropzone.addEventListener(n, () => dropzone.classList.add('dragover')));
	['dragleave','drop'].forEach(n => dropzone.addEventListener(n, () => dropzone.classList.remove('dragover')));
	dropzone.addEventListener('drop', (e) => {
		const dt = e.dataTransfer;
		const file = dt.files[0];
		handleResume(file);
	});
	if (browseResume) browseResume.addEventListener('click', () => resumeInput.click());
	resumeInput.addEventListener('change', () => handleResume(resumeInput.files[0]));

	function handleResume(file) {
		if (!file) return;
		const okType = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
		if (!okType.includes(file.type)) { uploadResult.textContent = 'Invalid file type.'; return; }
		if (file.size > 5 * 1024 * 1024) { uploadResult.textContent = 'File too large (max 5MB).'; return; }
		uploadResult.textContent = `Uploaded: ${file.name} (${Math.round(file.size/1024)} KB)`;
	}

	// Initialize user interface
	initializeUser();
	
	// Update sample data based on user role
	function updateDataForUser() {
		if (currentUser.role === 'recruiter') {
			// Show recruiter-specific stats
			document.querySelector('#seekerStats').innerHTML = `
				<div class="card stat">
					<span class="label">Open Job Posts</span>
					<strong class="value">5</strong>
				</div>
				<div class="card stat">
					<span class="label">Total Applicants</span>
					<strong class="value">120</strong>
				</div>
				<div class="card stat">
					<span class="label">Interviews Scheduled</span>
					<strong class="value">8</strong>
				</div>
				<div class="card stat">
					<span class="label">Hires This Month</span>
					<strong class="value">3</strong>
				</div>
			`;
		}
	}
	
	// Initial render
	updateDataForUser();
	renderJobs();
	renderTimeline();
	renderInsights();
	renderApplicants();
	renderTalent();
	renderChart();
	window.addEventListener('resize', renderChart);
})(); 