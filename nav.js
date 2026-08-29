(function(){
  // Theme handling
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch(e){}
  if (saved) root.setAttribute('data-theme', saved);

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
  document.addEventListener('DOMContentLoaded', function(){
    updateToggleIcon();
    var btn = document.querySelector('.theme-toggle');
    if (btn){
      btn.addEventListener('click', function(){
        setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    // Mobile sidebar toggle
    var menuBtn = document.querySelector('.menu-toggle');
    var sidebar = document.querySelector('.sidebar');
    if (menuBtn && sidebar){
      menuBtn.addEventListener('click', function(){
        sidebar.classList.toggle('open');
      });
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
        if (!wasOpen){
          thisGroup.classList.add('open');
        }
      });
    });
  });
})();
