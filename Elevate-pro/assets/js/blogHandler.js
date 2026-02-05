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
    const wordCount = getWordCount(content)

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
                    ${wordCount>25? truncateWords(content, 25) + `<a data-bs-toggle="modal" data-bs-target="#${truncateWords(title, 1)+date}" class="blog-link">Read More</a> ` : content} 
                  </p>             
                </div>
              </div>
              <div class="modal fade" id="${truncateWords(title, 1)+date}">
                      <div class="modal-dialog modal-dialog-scrollable modal-xl" >
                        <div class="modal-content">
                          <div class="modal-header">

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body d-grid gap-5">
                            <h1 class="text-center">${title}</h1>
                            <img src="${src}" alt="${title}" class="img-fluid mx-auto rounded-2" loading="lazy">
                            <p class="fs-5 px-5 text-dark">${content}</p>
                          </div>
                          
                        </div>
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

function getWordCount(text) {
  if (!text) return 0;

  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function getWeightedWordCount(
  text,
  { longWordLength = 12 } = {}
) {
  if (!text) return 0;

  const words = text.trim().split(/\s+/);

  let count = 0;

  for (const word of words) {
    const clean = word.replace(/[^\w]/g, "");
    if (!clean) continue;

    count += Math.max(1, Math.ceil(clean.length / longWordLength));
  }

  return count;
}
