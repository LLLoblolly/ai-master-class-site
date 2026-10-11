(function(){
  /* ========= AI Master Class — shared script =========
     Keeps everything the original nav.js did (theme, mobile menu, sidebar accordion) and adds:
     Course Info group, progress tracking ("mark complete"), last-reviewed dates, page notes, disclaimer.
     EDIT HERE: MS_UPDATED (dates) and MS_NOTES (per-page reminders). */
  var MS_UPDATED = { 'default': 'October 2, 2026' };            // e.g. 'a3-art-of-asking-ai.html': 'November 5, 2026'
  var MS_NOTES = {
    'c3-medicare-insurance.html': 'Medicare costs, plans and deadlines change every year. This lesson is educational only. Confirm details at Medicare.gov or 1-800-MEDICARE before making any decision.',
    'c2a-health-information.html': 'Educational only. AI is not a doctor. For medical decisions, talk with your doctor or pharmacist.',
    'c2b-health-tracking.html': 'Educational only. Do not share more health detail with any AI tool than you are comfortable with.',
    'c4-money-household-admin.html': 'Educational only. This is not tax, legal, or financial advice. Verify important numbers with a qualified professional.'
  };
  var EXTRA_CSS = "/* ===== AI Master Class \u2014 add-on styles (Start Here, FAQ, Glossary, Handouts, progress) ===== */\n.ms-progress{margin:0 4px 14px;padding:10px 12px;border:1px solid var(--border);border-radius:10px;background:var(--bg-subtle);font-size:12.5px;color:var(--text-muted)}\n.ms-progress a{color:var(--text);font-weight:600}\n.ms-bar{height:6px;border-radius:99px;background:var(--border);margin-top:7px;overflow:hidden}\n.ms-bar>i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent),#4FD1C5);transition:width .3s}\n.ms-done::after{content:\" \u2713\";color:#2F8F53;font-weight:700}\n.ms-complete{margin:44px 0 0;padding:16px 18px;border:1px solid var(--border);border-radius:12px;background:var(--bg-subtle);max-width:var(--max-w)}\n.ms-btn{display:inline-block;border:1px solid var(--accent);background:var(--bg);color:var(--accent-dark);border-radius:9px;padding:10px 18px;font-size:14.5px;font-weight:600;cursor:pointer;font-family:inherit}\n.ms-btn:hover{background:var(--accent-soft)}\n.ms-btn.on{background:var(--accent);color:#fff}\n.ms-btn.solid{background:var(--accent);color:#fff}\n.ms-btn.solid:hover{background:var(--accent-dark)}\n.ms-updated{margin:12px 0 0;font-size:12.5px;color:var(--text-faint);max-width:none}\n.ms-note{margin:12px 0 0;font-size:13.5px;color:var(--text-muted);max-width:none}\n.ms-disclaimer{border-top:1px solid var(--border);margin-top:48px;padding:18px 0 0;font-size:12.5px;color:var(--text-faint);max-width:var(--max-w);line-height:1.55}\n.ms-disclaimer a{color:var(--text-muted);text-decoration:underline}\n.door-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:20px 0 10px}\n.door{display:block;border:2px solid var(--border);border-radius:14px;padding:22px 20px;background:var(--bg);box-shadow:var(--card-shadow);color:var(--text)}\n.door:hover{border-color:var(--accent);text-decoration:none}\n.door .door-n{font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--accent-dark)}\n.door h3{margin:6px 0 6px;font-size:19px}\n.door p{margin:0 0 10px;font-size:14.5px;color:var(--text-muted);max-width:none}\n.door .go{font-weight:700;color:var(--accent-dark);font-size:14.5px}\n.path-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:18px 0 26px}\n.path{border:1px solid var(--border);border-radius:12px;padding:16px 18px;background:var(--bg);box-shadow:var(--card-shadow)}\n.path h3{margin:0 0 2px;font-size:16px}\n.path .tracks{font-size:12.5px;font-weight:700;color:var(--accent-dark);letter-spacing:.02em;margin-bottom:6px}\n.path p{margin:0 0 8px;font-size:14px;color:var(--text-muted);max-width:none}\n.path .meta{font-size:12.5px;color:var(--text-faint)}\n.path.featured{border-color:var(--accent);background:var(--accent-soft)}\n.checklist{list-style:none;padding-left:0!important}\n.checklist li{position:relative;padding-left:30px;margin:8px 0}\n.checklist li::before{content:\"\u2713\";position:absolute;left:0;top:0;width:22px;height:22px;border-radius:50%;background:var(--callout-tip-bg);border:1px solid var(--callout-tip-border);color:#2F8F53;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center}\n.faq-group{font-size:12.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-faint);margin:40px 0 10px}\ndetails.q{border:1px solid var(--border);border-radius:10px;margin:8px 0;max-width:var(--max-w);background:var(--bg)}\ndetails.q summary{cursor:pointer;padding:13px 16px;font-weight:600;font-size:15.5px;list-style:none}\ndetails.q summary::-webkit-details-marker{display:none}\ndetails.q summary::before{content:\"\u276f\";display:inline-block;margin-right:10px;color:var(--text-faint);font-size:11px;transition:transform .15s}\ndetails.q[open] summary::before{transform:rotate(90deg)}\ndetails.q .a{padding:0 16px 14px 36px;font-size:15px;color:var(--text)}\ndetails.q .a p{margin:0 0 10px}\n.table-wrap{overflow-x:auto;max-width:100%}\n.table-wrap table{min-width:640px}\n.free{color:#2F8F53;font-weight:700}\n.gloss-search{width:100%;max-width:var(--max-w);padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg-subtle);color:var(--text);font-size:16px;font-family:inherit}\n.gloss-jump{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 6px;max-width:var(--max-w)}\n.gloss-jump a{border:1px solid var(--border);border-radius:7px;padding:3px 9px;font-size:13px;font-weight:600;color:var(--text-muted)}\n.gloss-letter{font-size:22px;font-weight:700;color:var(--accent-dark);margin:30px 0 4px;border-bottom:1px solid var(--border);max-width:var(--max-w)}\ndl.gloss dt{font-weight:700;margin-top:14px}\ndl.gloss dd{margin:2px 0 0;color:var(--text-muted);max-width:var(--max-w)}\ndl.gloss .term.hide{display:none}\n.sheet{border:2px solid var(--border);border-radius:14px;padding:24px 26px;margin:22px 0;background:var(--bg);max-width:var(--max-w)}\n.sheet h2{margin:0 0 4px!important;font-size:24px!important}\n.sheet .sheet-sub{margin:0 0 14px;color:var(--text-muted);font-size:15px}\n.sheet h3{margin:16px 0 6px;font-size:16px}\n.sheet ul,.sheet ol{margin:6px 0}\n.sheet .sheet-foot{margin-top:14px;font-size:12.5px;color:var(--text-faint);border-top:1px dashed var(--border);padding-top:8px}\n.sheet table{margin:8px 0}\n.sheet .light{display:flex;gap:10px;align-items:flex-start;margin:8px 0;padding:10px 12px;border-radius:10px;border:1px solid var(--border)}\n.sheet .light b{flex:none;width:74px}\n.sheet .light.g{background:var(--callout-tip-bg);border-color:var(--callout-tip-border)}\n.sheet .light.y{background:var(--callout-warn-bg);border-color:var(--callout-warn-border)}\n.sheet .light.r{background:#FDECEC;border-color:#E58B8B}\n:root[data-theme=\"dark\"] .sheet .light.r{background:#2E1A1A;border-color:#8C3A3A}\nbody.large-print .sheet{font-size:21px;line-height:1.55}\nbody.large-print .sheet h2{font-size:32px!important}\nbody.large-print .sheet h3{font-size:24px}\nbody.large-print .sheet .sheet-sub{font-size:20px}\n.toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:8px 0 6px}\n.sheet-actions{margin-top:14px}\n.form-card{border:1px solid var(--border);border-radius:14px;padding:22px;background:var(--bg);box-shadow:var(--card-shadow);max-width:var(--max-w);margin:16px 0 28px}\n.form-card label{display:block;font-weight:600;font-size:14.5px;margin:14px 0 5px}\n.form-card input[type=text],.form-card input[type=email],.form-card textarea,.form-card select{width:100%;padding:11px 12px;border:1px solid var(--border);border-radius:9px;background:var(--bg-subtle);color:var(--text);font-size:16px;font-family:inherit}\n.form-card textarea{min-height:110px;resize:vertical}\n.form-card .opt{display:flex;gap:10px;align-items:flex-start;font-weight:400;margin:8px 0}\n.form-card .opt input{margin-top:5px;width:18px;height:18px;flex:none}\n.form-card .fine{font-size:12.5px;color:var(--text-faint);margin:12px 0 0;max-width:none}\n.soon{display:inline-block;margin-left:8px;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;background:var(--callout-warn-bg);border:1px solid var(--callout-warn-border);color:#B0791E;border-radius:99px;padding:2px 9px;vertical-align:middle}\n.thanks{display:none;border:1px solid var(--callout-tip-border);background:var(--callout-tip-bg);border-radius:12px;padding:14px 18px;max-width:var(--max-w);margin:10px 0 18px}\n.cert-wrap{max-width:820px;margin:20px 0}\n.cert{border:10px double var(--accent);border-radius:6px;padding:46px 40px;text-align:center;background:var(--bg)}\n.cert .cert-eyebrow{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent-dark);font-weight:700}\n.cert h2{font-size:34px!important;margin:10px 0!important}\n.cert .cert-name{font-size:30px;font-weight:700;border-bottom:2px solid var(--border);display:inline-block;min-width:60%;padding:6px 14px;margin:14px 0;font-family:Georgia,serif}\n.cert p{margin:6px auto;max-width:560px;text-align:center;color:var(--text-muted)}\n.cert .cert-sig{margin-top:26px;font-size:14px;color:var(--text-muted)}\n@media (max-width:920px){.door-grid,.path-grid{grid-template-columns:1fr}.sheet{padding:18px}.cert{padding:28px 18px}}\n@media print{\n  .topbar,.sidebar,.ms-complete,.ms-disclaimer,.toolbar,.sheet-actions,.no-print,.pager,.crumbs,.page-eyebrow,.page-title,.page-desc{display:none!important}\n  body{background:#fff!important;color:#000!important}\n  main{padding:0!important;max-width:none!important}\n  .layout{display:block}\n  body.print-one .sheet:not(.print-target){display:none!important}\n  .sheet{border:1px solid #999;margin:0;max-width:none;page-break-after:always;color:#000}\n  .sheet .light{border:1px solid #999!important;background:#fff!important}\n  .sheet .sheet-sub,.sheet .sheet-foot{color:#333}\n  body.print-cert .cert-form,body.print-cert .cert-progress{display:none!important}\n  .cert{border-color:#444;color:#000}\n  .cert p{color:#222}\n}\n@media (max-width:640px){.topbar-links a:not([data-ms-start]){display:none}.topbar-links{gap:10px}.topbar-links a{white-space:nowrap}.topbar{gap:10px;padding:0 12px}.topbar .brand{font-size:14px}}\n";

  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch(e){}
  if (saved) root.setAttribute('data-theme', saved);

  // Where is the site root? (works from root pages and from /track-x/ pages)
  var scriptEl = document.currentScript;
  var BASE = '/';
  if (scriptEl && scriptEl.src) {
    BASE = scriptEl.src.replace(/assets\/nav\.js(\?.*)?$/, '');
    if (BASE === scriptEl.src) BASE = scriptEl.src.replace(/[^\/]*$/, '');
  }

  function setTheme(t){
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch(e){}
    updateToggleIcon();
  }
  function currentTheme(){
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function updateToggleIcon(){
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.textContent = currentTheme() === 'dark' ? '☀' : '☾';
  }

  // ---- progress storage (browser only) ----
  var KEY = 'amc_progress_v1';
  function loadProg(){ try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } }
  function saveProg(a){ try { localStorage.setItem(KEY, JSON.stringify(a)); } catch(e){} }
  function norm(href){
    try { return new URL(href, location.href).pathname.replace(/index\.html$/, '').replace(/\.html$/, ''); }
    catch(e){ return href; }
  }
  function fileName(){ var p = location.pathname.split('/').pop(); return p || 'index.html'; }

  document.addEventListener('DOMContentLoaded', function(){
    updateToggleIcon();
    var btn = document.querySelector('.theme-toggle');
    if (btn){
      btn.addEventListener('click', function(){
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    // add-on styles (new pages already carry them inline)
    if (!document.getElementById('ms-css')) {
      var st = document.createElement('style'); st.id = 'ms-css'; st.textContent = EXTRA_CSS;
      document.head.appendChild(st);
    }

    var sidebar = document.querySelector('.sidebar');
    var main = document.querySelector('main');

    // Top bar: add "Start Here" link
    var tl = document.querySelector('.topbar-links');
    if (tl && !tl.querySelector('[data-ms-start]')) {
      var a0 = document.createElement('a');
      a0.href = BASE + 'start-here.html'; a0.textContent = 'Start Here'; a0.setAttribute('data-ms-start','1');
      tl.insertBefore(a0, tl.firstChild);
    }

    // Sidebar: Course Info group
    if (sidebar && !sidebar.querySelector('[data-ms-info]')) {
      var g = document.createElement('div');
      g.className = 'sidebar-group'; g.setAttribute('data-ms-info','1');
      var items = [['start-here.html','Start Here'],['about.html','About the Instructor'],['faq.html','FAQ & Tool Costs'],['glossary.html','Glossary'],['handouts.html','Printable Handouts'],['interest.html','Questions & Express Interest'],['certificate.html','My Progress & Certificate']];
      var html = '<div class="sidebar-group-title"><span>🧭 Course Info</span><span class="chev">❯</span></div><ul class="sidebar-pages">';
      items.forEach(function(it){ html += '<li><a href="'+BASE+it[0]+'">'+it[1]+'</a></li>'; });
      html += '</ul>';
      g.innerHTML = html;
      var home = sidebar.querySelector('.sidebar-home-link');
      if (home && home.nextSibling) sidebar.insertBefore(g, home.nextSibling); else sidebar.appendChild(g);
    }

    // Active link + open the info group when we are on one of its pages
    if (sidebar) {
      var here = norm(location.href);
      sidebar.querySelectorAll('.sidebar-pages a').forEach(function(a){
        if (norm(a.href) === here) {
          a.classList.add('active');
          var grp = a.closest('.sidebar-group'); if (grp) grp.classList.add('open');
        }
      });
    }

    // Which sidebar links are lessons?
    var lessonLinks = [];
    if (sidebar) {
      sidebar.querySelectorAll('.sidebar-group:not([data-ms-info]) .sidebar-pages a').forEach(function(a){
        var t = (a.textContent || '').trim();
        if (/^overview$/i.test(t)) return;
        if (/toolbox/.test(a.getAttribute('href'))) return;
        lessonLinks.push(a);
      });
    }
    function isRequired(a){ return !/track-i\//.test(a.getAttribute('href')); }
    var required = lessonLinks.filter(isRequired);

    function refreshProgress(){
      var prog = loadProg();
      var done = 0;
      lessonLinks.forEach(function(a){
        var d = prog.indexOf(norm(a.href)) !== -1;
        a.classList.toggle('ms-done', d);
        if (d && isRequired(a)) done++;
      });
      var box = document.querySelector('.ms-progress');
      if (box) {
        var pct = required.length ? Math.round(done * 100 / required.length) : 0;
        box.querySelector('.ms-count').textContent = done + ' of ' + required.length + ' lessons complete';
        box.querySelector('.ms-bar>i').style.width = pct + '%';
      }
      document.dispatchEvent(new CustomEvent('ms-progress', {detail:{done:done,total:required.length}}));
    }

    // Sidebar progress box
    if (sidebar && required.length && !sidebar.querySelector('.ms-progress')) {
      var pb = document.createElement('div'); pb.className = 'ms-progress';
      pb.innerHTML = '<a href="'+BASE+'certificate.html"><span class="ms-count"></span></a><div class="ms-bar"><i></i></div>';
      var infoG = sidebar.querySelector('[data-ms-info]');
      if (infoG && infoG.nextSibling) sidebar.insertBefore(pb, infoG.nextSibling); else sidebar.appendChild(pb);
    }

    // Lesson page extras: mark-complete button, last reviewed, page note
    var curLesson = null;
    lessonLinks.forEach(function(a){ if (norm(a.href) === norm(location.href)) curLesson = a; });
    if (main && curLesson && !main.querySelector('.ms-complete')) {
      var wrap = document.createElement('div'); wrap.className = 'ms-complete';
      var fn = fileName();
      var date = MS_UPDATED[fn] || MS_UPDATED['default'];
      var note = MS_NOTES[fn] ? '<p class="ms-note"><strong>Please note:</strong> ' + MS_NOTES[fn] + '</p>' : '';
      wrap.innerHTML = '<button type="button" class="ms-btn">☐ Mark this lesson complete</button>' + note +
        '<p class="ms-updated">Last reviewed: ' + date + '. AI tools change fast — if your screen looks a little different, the app may have been updated.</p>';
      var pager = main.querySelector('.pager');
      if (pager) main.insertBefore(wrap, pager); else main.appendChild(wrap);
      var b = wrap.querySelector('.ms-btn'), key = norm(location.href);
      function paint(){
        var on = loadProg().indexOf(key) !== -1;
        b.classList.toggle('on', on);
        b.textContent = on ? '✓ Completed — tap to undo' : '☐ Mark this lesson complete';
      }
      b.addEventListener('click', function(){
        var p = loadProg(), i = p.indexOf(key);
        if (i === -1) p.push(key); else p.splice(i,1);
        saveProg(p); paint(); refreshProgress();
      });
      paint();
    }

    // Disclaimer footer on every page
    if (main && !main.querySelector('.ms-disclaimer')) {
      var f = document.createElement('div'); f.className = 'ms-disclaimer';
      f.innerHTML = 'AI Master Class is for education only. It is not medical, legal, tax, financial, or insurance advice, and it is not a sales presentation for any product or plan. AI can make mistakes — always check important information with an official source or a qualified professional. Questions? <a href="'+BASE+'interest.html">Contact us</a> · <a href="'+BASE+'faq.html">FAQ</a>';
      main.appendChild(f);
    }

    refreshProgress();

    // Mobile sidebar toggle
    var menuBtn = document.querySelector('.menu-toggle');
    if (menuBtn && sidebar){
      menuBtn.addEventListener('click', function(){ sidebar.classList.toggle('open'); });
      document.addEventListener('click', function(e){
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)){
          sidebar.classList.remove('open');
        }
      });
    }

    // Sidebar group accordion — opening one closes the others
    var allGroups = document.querySelectorAll('.sidebar-group');
    document.querySelectorAll('.sidebar-group-title').forEach(function(title){
      title.addEventListener('click', function(){
        var thisGroup = title.parentElement;
        var wasOpen = thisGroup.classList.contains('open');
        allGroups.forEach(function(g){ g.classList.remove('open'); });
        if (!wasOpen){ thisGroup.classList.add('open'); }
      });
    });
  });
})();
