// CARROSSEL INFINITO: repete os cards até cobrir telas largas e duplica o grupo para o loop não ter emenda.
document.querySelectorAll('.carousel').forEach(function (carousel) {
  var track = carousel.querySelector('.carousel-track');
  var group = carousel.querySelector('.carousel-group');
  var cards = Array.prototype.slice.call(group.children);
  var repeticoes = cards.length < 6 ? 2 : 0;
  for (var i = 0; i < repeticoes; i++) {
    cards.forEach(function (card) {
      var copy = card.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      group.appendChild(copy);
    });
  }
  var groupCopy = group.cloneNode(true);
  groupCopy.setAttribute('aria-hidden', 'true');
  track.appendChild(groupCopy);
  carousel.classList.add('is-running');
});

// POPUP DE SAÍDA: abre uma vez por sessão e nunca depois de um clique no checkout.
// No computador, quando o mouse sai pelo topo da janela. No celular, no primeiro toque em "voltar".
(function () {
  var popup = document.getElementById('popup-saida');
  if (!popup || !popup.showModal) return;

  var jaMostrou = false;
  try { jaMostrou = sessionStorage.getItem('popupSaida') === '1'; } catch (e) {}

  function encerrar() {
    jaMostrou = true;
    try { sessionStorage.setItem('popupSaida', '1'); } catch (e) {}
  }
  function mostrar() {
    popup.showModal();
    popup.focus();
  }
  function abrir() {
    if (popup.open) return;
    encerrar();
    mostrar();
  }

  popup.addEventListener('click', function (e) {
    var caixa = popup.getBoundingClientRect();
    var foraDaCaixa = e.clientX < caixa.left || e.clientX > caixa.right || e.clientY < caixa.top || e.clientY > caixa.bottom;
    if (e.target.closest('[data-fechar]') || (e.target === popup && foraDaCaixa)) popup.close();
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('a[href*="pay.wiapy.com"]')) encerrar();
  });

  if (location.hash === '#popup-saida') mostrar();

  var inicio = Date.now();
  document.documentElement.addEventListener('mouseout', function (e) {
    if (!jaMostrou && !e.relatedTarget && e.clientY <= 0 && Date.now() - inicio > 3000) abrir();
  });

  if (!window.matchMedia('(hover: none)').matches || !history.pushState || jaMostrou) return;
  var base = null;
  function armarVoltar() {
    if (base !== null) return;
    base = location.href;
    history.pushState({ saida: true }, '');
  }
  document.addEventListener('touchend', armarVoltar, { passive: true });
  document.addEventListener('click', armarVoltar);
  window.addEventListener('popstate', function (e) {
    if (e.state || location.href !== base) return;
    if (jaMostrou) history.back(); else abrir();
  });
})();
