/**
 * Aparna Chakure Portfolio Website Scripts
 * Features: Light/Dark theme switch, responsive navigation, scroll progress,
 * dynamic year, and email copy-to-clipboard toast.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Light / Dark) ---
  const themeToggle = document.getElementById('themeToggle');
  const metaThemeColor = document.getElementById('metaThemeColor');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#ffffff');
    }
  };

  // Initialize theme
  setTheme(getPreferredTheme());

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });

  // Listen to system preference changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- 2. Mobile Navigation Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when clicking any nav link
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // --- 3. Scroll Reading Progress Bar ---
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progressPercent = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }
  }, { passive: true });

  // --- 4. Auto Dynamic Copyright Year ---
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --- 5. Copy Email to Clipboard with Toast ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  copyEmailBtn?.addEventListener('click', async () => {
    const email = copyEmailBtn.getAttribute('data-email') || 'aparnachakure@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      showToast(`✓ Copied to clipboard: ${email}`);
    } catch (err) {
      // Fallback
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast(`✓ Copied: ${email}`);
    }
  });
});
