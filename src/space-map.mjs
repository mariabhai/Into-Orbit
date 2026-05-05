// Initialize space map interactions with dynamic label creation
document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.space-map-list');
  if (listContainer) {
    const pins = listContainer.querySelectorAll('li');
    pins.forEach(pin => {
      const img = pin.querySelector('img');
      const labelText = img.dataset.label;
      let label = null;

      // Create label element with absolute positioning
      const createLabel = () => {
        if (!label) {
          label = document.createElement('p');
          label.textContent = labelText;
          label.style.position = 'absolute';
          label.style.top = '-30px';
          label.style.left = '50%';
          label.style.transform = 'translateX(-50%)';
          label.style.whiteSpace = 'nowrap';
          label.style.color = '#f2f2f2';
          label.style.fontSize = '1.5rem';
          label.style.margin = '0';
          label.style.pointerEvents = 'none';
          pin.appendChild(label);
        }
      };

      // Remove label element
      const removeLabel = () => {
        if (label) {
          label.remove();
          label = null;
        }
      };

      // Hover events
      pin.addEventListener('mouseenter', createLabel);
      pin.addEventListener('mouseleave', removeLabel);

      // Click to toggle label
      pin.addEventListener('click', e => {
        e.stopPropagation();
        if (label) {
          removeLabel();
        } else {
          createLabel();
        }
      });
    });

    // Click outside to close all labels
    document.addEventListener('click', () => {
      pins.forEach(pin => {
        const p = pin.querySelector('p');
        if (p) p.remove();
      });
    });
  }
});
