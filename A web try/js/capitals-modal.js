document.addEventListener('DOMContentLoaded', () => {

  if (!document.getElementById('capitalModal')) {
    const wrapper = document.createElement('div');
    wrapper.id = 'capitalModal';
    wrapper.className = 'capital-modal';
    wrapper.innerHTML = `
      <div class="modal-backdrop" data-close></div>
      <div class="modal-panel" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Închide" data-close>✕</button>
        
        <!-- Hero image with country tag overlay -->
        <div class="modal-hero" id="modalHero">
          <span class="modal-country-tag" id="modalCountry">Țară</span>
        </div>
        
        <!-- Content section -->
        <div class="modal-content">
          <!-- Title -->
          <h2 class="modal-title" id="modalTitle">Titlu</h2>
          
          <!-- Info pills grid -->
          <div class="modal-info-grid">
            <div class="info-pill">
              <span class="info-icon">👥</span>
              <span class="info-label">Populație</span>
              <span class="info-value" id="modalPop">-</span>
            </div>
            <div class="info-pill">
              <span class="info-icon">🌍</span>
              <span class="info-label">Limbă</span>
              <span class="info-value" id="modalLang">-</span>
            </div>
            <div class="info-pill">
              <span class="info-icon">🏛️</span>
              <span class="info-label">Tară</span>
              <span class="info-value" id="modalLand">-</span>
            </div>
          </div>
          
          <!-- Description -->
          <p class="modal-desc" id="modalDesc">Descriere detaliată...</p>
          
          <!-- Objectives section -->
          <div class="modal-objectives">
            <div class="objectives-header">
              <span class="objectives-icon">🏛️</span>
              <strong>Obiective Turistice</strong>
            </div>
            <div class="modal-tags" id="modalTags"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  const modal = document.getElementById('capitalModal');
  const hero = document.getElementById('modalHero');
  const titleEl = document.getElementById('modalTitle');
  const countryEl = document.getElementById('modalCountry');
  const popEl = document.getElementById('modalPop');
  const langEl = document.getElementById('modalLang');
  const landEl = document.getElementById('modalLand');
  const descEl = document.getElementById('modalDesc');
  const tagsEl = document.getElementById('modalTags');

  function openModalFromCard(card) {
    
    const img = card.querySelector('img');
    const imgSrc = img ? img.getAttribute('src') : '';
    if (imgSrc) {
      hero.style.backgroundImage = `url('${imgSrc}')`;
    }

   
    const h3 = card.querySelector('h3');
    const title = h3 ? h3.textContent.trim() : 'Capitală';
    const countryTag = card.querySelector('.country-tag');
    const country = countryTag ? countryTag.textContent.trim() : '';
    
    titleEl.textContent = title;
    countryEl.textContent = country;

  
    let pop = '-', lang = '-', land = '-';
    const cardInfo = card.querySelector('.card-info');
    if (cardInfo) {
      const paras = Array.from(cardInfo.querySelectorAll('p'));
      paras.forEach((p, idx) => {
        const text = p.textContent.trim();
        if (idx === 0) pop = text.replace(/^[^0-9]+/, '').trim(); // first p = population
        else if (idx === 1) lang = text.replace(/^[^A-Za-zĂÂÎȘȚăâîșț]+/, '').trim(); // second p = language
        else if (idx === 2) land = text.replace(/^[^A-Za-z0-9]+/, '').trim(); // third p = landmark
      });
    }

    const cityInfo = card.querySelector('.city-info');
    if (cityInfo) {
      const items = cityInfo.querySelectorAll('.info-item');
      if (items.length >= 3) {
        const spans = items[0].querySelectorAll('span');
        pop = spans.length > 1 ? spans[1].textContent.trim() : '-';
        const spans2 = items[1].querySelectorAll('span');
        lang = spans2.length > 1 ? spans2[1].textContent.trim() : '-';
        const spans3 = items[2].querySelectorAll('span');
        land = spans3.length > 1 ? spans3[1].textContent.trim() : '-';
      }
    }

    popEl.textContent = pop;
    langEl.textContent = lang;
    landEl.textContent = land;

    // Extract description
    let desc = '-';
    const cardDesc = card.querySelector('.card-description');
    const cityDesc = card.querySelector('.city-description');
    if (cardDesc) desc = cardDesc.textContent.trim();
    else if (cityDesc) desc = cityDesc.textContent.trim();
    else desc = `${title} este capitala ${country || ''}.`;
    
    descEl.textContent = desc;
    tagsEl.innerHTML = '';
    const featureTags = card.querySelectorAll('.feature-tag, .city-tags .tag');
    if (featureTags && featureTags.length > 0) {
      featureTags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = tag.textContent.trim();
        tagsEl.appendChild(span);
      });
    } else {
 
      if (land && land !== '-') {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = land;
        tagsEl.appendChild(span);
      }
    }

    
    modal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  
  document.addEventListener('click', (ev) => {
    // Check if clicking close button or backdrop
    if (ev.target.closest('.modal-close')) {
      closeModal();
      ev.stopPropagation();
      return;
    }

    if (ev.target.closest('.modal-backdrop')) {
      closeModal();
      ev.stopPropagation();
      return;
    }

 
    const card = ev.target.closest('.capital-card, .city-card');
    if (card && !card.closest('.capital-modal')) {
      openModalFromCard(card);
      ev.stopPropagation();
    }
  });

 
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      closeModal();
    }
  });
});
