import './styles/base.scss';

const DESTINATION_DESKTOP_CARDS_PER_PAGE = 3;
const DESTINATION_SMALL_SCREEN_CARDS_PER_PAGE = 2;
const DESTINATION_ACTIVE_PAGE_CLASS = 'destinations__pagination-button--active';
const DESTINATION_SMALL_SCREEN_QUERY = '(max-width: 1023px)';

const destinationSmallScreenMedia = window.matchMedia(DESTINATION_SMALL_SCREEN_QUERY);

const destinationState = {
  currentPage: 0,
};

function getDestinationElements() {
  return {
    cards: document.querySelectorAll('[data-destination-card]'),
    nextButton: document.querySelector('[data-destination-next-button]'),
    pagination: document.querySelector('[data-destination-pagination]'),
    paginationButtons: document.querySelectorAll('[data-destination-page]'),
  };
}

function getDestinationCardsPerPage() {
  if (destinationSmallScreenMedia.matches) {
    return DESTINATION_SMALL_SCREEN_CARDS_PER_PAGE;
  }

  return DESTINATION_DESKTOP_CARDS_PER_PAGE;
}

function getDestinationPageCount(cards) {
  return Math.ceil(cards.length / getDestinationCardsPerPage());
}

function shouldShowDestinationCard(cardIndex, pageIndex) {
  const cardsPerPage = getDestinationCardsPerPage();
  const firstCardIndex = pageIndex * cardsPerPage;
  const lastCardIndex = firstCardIndex + cardsPerPage;

  return cardIndex >= firstCardIndex && cardIndex < lastCardIndex;
}

function updateDestinationCards(cards, pageIndex) {
  cards.forEach(function updateDestinationCard(card, cardIndex) {
    card.hidden = !shouldShowDestinationCard(cardIndex, pageIndex);
  });
}

function getDestinationPaginationLabel(pageIndex, totalCards) {
  const cardsPerPage = getDestinationCardsPerPage();
  const firstCardNumber = pageIndex * cardsPerPage + 1;
  const lastCardNumber = Math.min(firstCardNumber + cardsPerPage - 1, totalCards);

  return `Show destinations ${firstCardNumber} to ${lastCardNumber}`;
}

function updateDestinationPagination(paginationButtons, pageIndex, pageCount, totalCards) {
  paginationButtons.forEach(function updateDestinationPaginationButton(button) {
    const buttonPageIndex = Number(button.dataset.destinationPage);
    const shouldShowButton = buttonPageIndex < pageCount;
    const isActivePage = buttonPageIndex === pageIndex;

    button.hidden = !shouldShowButton;
    button.setAttribute('aria-label', getDestinationPaginationLabel(buttonPageIndex, totalCards));
    button.classList.toggle(DESTINATION_ACTIVE_PAGE_CLASS, isActivePage);

    if (isActivePage) {
      button.setAttribute('aria-current', 'true');
      return;
    }

    button.removeAttribute('aria-current');
  });
}

function showDestinationPage(pageIndex) {
  const { cards, paginationButtons } = getDestinationElements();

  if (cards.length === 0) {
    return;
  }

  const pageCount = getDestinationPageCount(cards);
  destinationState.currentPage = Math.min(pageIndex, pageCount - 1);
  updateDestinationCards(cards, destinationState.currentPage);
  updateDestinationPagination(paginationButtons, destinationState.currentPage, pageCount, cards.length);
}

function showNextDestinationPage() {
  const { cards } = getDestinationElements();

  if (cards.length === 0) {
    return;
  }

  const pageCount = getDestinationPageCount(cards);
  const nextPage = (destinationState.currentPage + 1) % pageCount;

  showDestinationPage(nextPage);
}

function handleDestinationPaginationClick(event) {
  const pageButton = event.target.closest('[data-destination-page]');

  if (!pageButton) {
    return;
  }

  showDestinationPage(Number(pageButton.dataset.destinationPage));
}

function handleDestinationViewportChange() {
  showDestinationPage(destinationState.currentPage);
}

function initDestinations() {
  const { cards, nextButton, pagination } = getDestinationElements();

  if (cards.length === 0 || !nextButton || !pagination) {
    return;
  }

  nextButton.addEventListener('click', showNextDestinationPage);
  pagination.addEventListener('click', handleDestinationPaginationClick);
  destinationSmallScreenMedia.addEventListener('change', handleDestinationViewportChange);
  showDestinationPage(destinationState.currentPage);
}

initDestinations();
