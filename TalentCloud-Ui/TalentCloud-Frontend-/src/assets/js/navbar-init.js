function initNavbarScripts() {
  console.log('[Init] Navbar + UI...');

  if (window.$) {
    $('.dropdown-toggle').dropdown();

    // Si des éléments utilisent des tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Relancer slick sliders si présents
    if ($('.your-carousel-class').length && typeof $.fn.slick === 'function') {
      $('.your-carousel-class').not('.slick-initialized').slick();
    }

    // Ajouter d'autres appels si besoin...
  }
}
