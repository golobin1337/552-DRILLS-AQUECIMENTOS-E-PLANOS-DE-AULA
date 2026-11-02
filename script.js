// LINK DE CHECKOUT: cole aqui a URL do Plano Premium na sua plataforma de pagamento.
// Enquanto estiver vazio, os botões levam à seção de oferta.
var CHECKOUT = '';
document.querySelectorAll('[data-checkout]').forEach(function (link) {
  if (CHECKOUT) link.href = CHECKOUT;
});
