// Initialize space map interactions with dynamic label creation
document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.space-map-list');
  if (!listContainer) return;

  const pins = listContainer.querySelectorAll('li');

  pins.forEach((pin, index) => {
    const img = pin.querySelector('img');
    if (!img) return;

    const labelText = img.dataset.label || img.alt;
    let label = null;

    // Make pin keyboard accessible
    pin.setAttribute('role', 'button');
    pin.setAttribute('tabindex', '0');
    pin.setAttribute('aria-label', labelText);
    pin.setAttribute('aria-pressed', 'false');

    // Create label element with absolute positioning
    const createLabel = () => {
      if (!label) {
        label = document.createElement('p');
        label.textContent = labelText;
        label.setAttribute('aria-hidden', 'false');

        // Responsive positioning based on viewport width
        const isMobile = window.innerWidth <= 640;
        const topOffset = isMobile ? '-40px' : '-55px';
        const fontSize = isMobile ? '1rem' : '1.5rem';

        label.style.position = 'absolute';
        label.style.top = topOffset;
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.whiteSpace = 'nowrap';
        label.style.color = '#f2f2f2';
        label.style.fontSize = fontSize;
        label.style.margin = '0';
        label.style.pointerEvents = 'none';
        label.style.border = '0.5px solid #f2f2f2';
        label.style.backgroundColor = 'rgba(0, 29, 54, 0.8)';
        label.style.padding = '5px 10px';
        label.style.borderRadius = '10px';
        pin.appendChild(label);
        pin.setAttribute('aria-pressed', 'true');
      }
    };

    // Remove label element
    const removeLabel = () => {
      if (label) {
        label.remove();
        label = null;
        pin.setAttribute('aria-pressed', 'false');
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

    // Keyboard support (Enter/Space)
    pin.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (label) {
          removeLabel();
        } else {
          createLabel();
        }
      }
      // Close on Escape
      if (e.key === 'Escape' && label) {
        removeLabel();
      }
    });

    // Focus/Blur for better visual feedback
    pin.addEventListener('focus', () => {
      pin.style.outline = '2px solid #ff5e00';
      pin.style.outlineOffset = '2px';
    });

    pin.addEventListener('blur', () => {
      pin.style.outline = 'none';
    });
  });

  // Click outside to close all labels
  document.addEventListener('click', () => {
    pins.forEach(pin => {
      const p = pin.querySelector('p');
      if (p) p.remove();
      pin.setAttribute('aria-pressed', 'false');
    });
  });

  // Close labels on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      pins.forEach(pin => {
        const p = pin.querySelector('p');
        if (p) p.remove();
        pin.setAttribute('aria-pressed', 'false');
      });
    }
  });
});
