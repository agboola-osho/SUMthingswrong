class BlogEntry extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'src', 'date', 'content'];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') ?? '';
    const date = this.getAttribute('date') ?? '';
    const content = this.getAttribute('content') ?? '';
    const src = this.getAttribute('src') ?? '';

    this.innerHTML = `
              <div class="portfolio-wrapper">
                <div class="portfolio-image">
                  <img src="${src}" alt="${title}" class="img-fluid" loading="lazy">
                </div>
                <div class="portfolio-content">
                  <div class="portfolio-header">
                    <h3>${title}</h3>
                    <span class="portfolio-year">${date}</span>
                  </div>
                  <p class="portfolio-description">
                    ${content}
                  </p>
                </div>
              </div>
    `;
  }
}

customElements.define('blog-entry', BlogEntry);


// Adds ... at the end of long pieces of text
function truncateWords(text, maxWords, suffix = '…') {
  if (typeof text !== 'string') return '';
  
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;

  return words.slice(0, maxWords).join(' ') + suffix;
}

