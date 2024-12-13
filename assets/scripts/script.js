function handleMouseEnter() {
  this.classList.add('s-card--hovered');
  document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
  this.classList.remove('s-card--hovered');
  document.body.id = '';
}

function handleArrowKeys(event) {
  const activeButton = document.querySelector('.s-controller__button--active');
  let nextButton;

  if (event.key === 'ArrowRight') {
    // Encontra o próximo botão, ou volta ao primeiro se for o último
    nextButton = activeButton.nextElementSibling || document.querySelector('.s-controller__button:first-child');
  } else if (event.key === 'ArrowLeft') {
    // Encontra o botão anterior, ou vai para o último se for o primeiro
    nextButton = activeButton.previousElementSibling || document.querySelector('.s-controller__button:last-child');
  } else {
    return; // Sai se não for seta
  }

  // Chama a função selectCarouselItem para atualizar o carrossel
  selectCarouselItem(nextButton);
}

function addEventListenersToCards() {
  const cardElements = document.getElementsByClassName('s-card');
  
  for (let index = 0; index < cardElements.length; index++) {
    const card = cardElements[index];
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  }
}

// Adiciona o evento de teclado ao documento
document.addEventListener('keydown', handleArrowKeys);
// Adiciona o evento do HTML inicial ser completamente carregado, garantindo que o arquivo Js será executado somente depois que a estrutura do DOM estiver pronta para ser manipulada.
document.addEventListener("DOMContentLoaded", addEventListenersToCards, false);

function selectCarouselItem(selectedButtonElement) {
  const selectedItem = selectedButtonElement.id;
  const carousel = document.querySelector('.s-cards-carousel');
  const transform = carousel.style.transform;
  const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);
  const rotateYDeg = -120 * (Number(selectedItem) - 1);
  const newTransform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);

  carousel.style.transform = newTransform;

  const activeButtonElement = document.querySelector('.s-controller__button--active');
  activeButtonElement.classList.remove('s-controller__button--active');
  selectedButtonElement.classList.add('s-controller__button--active');
}