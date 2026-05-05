export function initSpaceMap() {
  const listContainer = document.querySelector('.space-map-list');

  // Show and hide labels on hover (desktop) and click (mobile)
  if (listContainer) {
    const pins = listContainer.querySelectorAll('li');

    pins.forEach(pin => {
      const label = pin.querySelector('.hidden');

      // Show label on mouse hover (desktop)
      pin.addEventListener('mouseenter', () => {
        if (label) {
          label.style.display = 'block';
        }
      });

      // Hide label when mouse leaves (desktop)
      pin.addEventListener('mouseleave', () => {
        if (label) {
          label.style.display = 'none';
        }
      });

      // Toggle label on click (mobile/touch)
      pin.addEventListener('click', event => {
        event.stopPropagation();
        if (label) {
          const labelIsShown = label.style.display === 'block';
          label.style.display = labelIsShown ? 'none' : 'block';
        }
      });
    });

    // Close all labels when clicking outside
    document.addEventListener('click', () => {
      pins.forEach(pin => {
        const label = pin.querySelector('.hidden');
        if (label) {
          label.style.display = 'none';
        }
      });
    });
  }
}
