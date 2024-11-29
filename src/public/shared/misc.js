// UTILITIES

function ha(...elm) { document.head.append(...elm) }
function ba(...elm) { document.body.append(...elm) }
function bp(...elm) { document.body.prepend(...elm) }
function dqs(selector) { return document.querySelector(selector) }
function dqsa(selector) { return document.querySelectorAll(selector) }
function css(str) {
  const s = document.createElement('style')
  s.textContent = str
  ha(s)
}

export function addStylesheets(hrefs, media = 'all') {
  hrefs.forEach(href => {
    // Check if the stylesheet is already added to avoid duplicates
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      document.head.appendChild(link);
    }
  });
}

function removeLinkRelStylesheets() {
  const tags = document.head.querySelectorAll('link')
  for (const t of tags) { 
    if (t.rel === 'stylesheet') t.remove() 
  }
}

// link stylesheet relative to caller file
// using import.meta.url











// Scrolling

function getOffset(el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}

function scrollToTop() {
  // Src: https://stackoverflow.com/a/58944651

  // This prevents the page from scrolling down to where it was previously.
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
  window.scrollTo(0,0);
}

function scrollElmToTop(elm) {
  elm.scrollIntoView({
    behavior: 'smooth', // smooth, auto
    block: 'start',     // start, center, end, nearest
  });
}

function scrollElmToTopIncludingMarginTop(elm) {
  var offsetTop = elm.offsetTop - parseFloat(getComputedStyle(elm).marginTop);
  
  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
}






// Color theme

function getMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  } else {
    return 'light'
  }

  // watch for changes
  // https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
  });
}






// Random num gen

function badPractiseUUID() {
  let a = Math.random()
  a = String(a)
  a = a.substr(2)
  return a
}

// hide Views below each other
// ! this might depend on several situations I have not encountered yet...
// ! reset when hiding all others
// attempt 1
function hideViewsBelow() {
  const bcr = this.root.getBoundingClientRect()
  const cutoffHeightRelToWindow = bcr.y + bcr.height
  
  for (const view of View.list) {
    if (view === this) continue
    const y = view.root.getBoundingClientRect().y
    const cutoffHeightRelativeToVpos = cutoffHeightRelToWindow - y
    view.root.style.height = `${cutoffHeightRelativeToVpos}px`
    console.log(view.root.style.height)
  }
}

function toggleLang() {
  function set(code) {
    document.documentElement.setAttribute("lang", code)
  }

  const lang = document.documentElement.lang
  console.log(lang)

  if (lang === 'en') set('nb')
  else if (lang === 'nb') set('en')
}

// ? rewrite within a class Btn/Txtbtn methods:

function disable(el) {
  el.disabled = true
  el.classList.add('disabled')
}

function enable(el) {
  el.disabled = false
  el.classList.remove('disabled')
}

function highlight(el) {
  if (el) el.classList.add('highlight')
}

function nolight(el) {
  if (el) el.classList.remove('highlight')
}

const loremIpsum = {
  full: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  half: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  quarter: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
} 

export { 
  ha, ba, bp, 
  dqs, dqsa,
  css, removeLinkRelStylesheets,
  getOffset, scrollToTop, scrollElmToTop, 
  scrollElmToTopIncludingMarginTop,
  toggleLang,
  disable, enable,
  highlight, nolight,
  loremIpsum
}