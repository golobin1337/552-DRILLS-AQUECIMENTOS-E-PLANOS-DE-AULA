// LINK DE CHECKOUT: cole aqui a URL do Plano Premium na sua plataforma de pagamento.
// Enquanto estiver vazio, os botões levam à seção de oferta.
var CHECKOUT = '';
document.querySelectorAll('[data-checkout]').forEach(function (link) {
  if (CHECKOUT) link.href = CHECKOUT;
});

// CARROSSEL INFINITO: repete os cards até cobrir telas largas e duplica o grupo para o loop não ter emenda.
// Quem pediu menos movimento no sistema vê os cards parados, com rolagem manual.
var carousel = document.querySelector('.carousel');
if (carousel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var track = carousel.querySelector('.carousel-track');
  var group = carousel.querySelector('.carousel-group');
  var cards = Array.prototype.slice.call(group.children);
  for (var i = 0; i < 2; i++) {
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
}
