// Fast Services Car Rental - Bespoke Interactive Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // 2. Hero Video Controls
  const heroVideo = document.getElementById('heroVideo');
  const videoToggle = document.getElementById('videoToggle');

  if (videoToggle && heroVideo) {
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoToggle.innerHTML = '<i class="fas fa-pause"></i>';
        videoToggle.setAttribute('aria-label', 'Pause Hero Background Video');
      } else {
        heroVideo.pause();
        videoToggle.innerHTML = '<i class="fas fa-play"></i>';
        videoToggle.setAttribute('aria-label', 'Play Hero Background Video');
      }
    });
  }

  // 3. Dynamic Typewriter Effect for Hero Headline
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const words = [
      'Luxury Car Fleet.',
      'Mercedes-Benz Saloons.',
      'BMW 5 Series Chauffeurs.',
      'VIP Airport Convoys.',
      'Royal Wedding Fleets.'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200; // Hold full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing next word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 4. Animated Number Counters on Scroll
  const counters = document.querySelectorAll('.stat-counter');
  let countersTriggered = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1800; // ms
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
          clearInterval(timer);
        } else {
          counter.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
        }
      }, stepTime);
    });
  }

  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    const telemetryWrap = document.querySelector('.hero-telemetry-grid');
    if (telemetryWrap) observer.observe(telemetryWrap);
    else runCounters();
  }

  // 5. Interactive Journey Calculator & Estimator
  const calcVehicle = document.getElementById('calcVehicle');
  const calcServiceType = document.getElementById('calcServiceType');
  const calcDate = document.getElementById('calcDate');
  const calcGuests = document.getElementById('calcGuests');
  const calcSummary = document.getElementById('calcSummary');
  const btnDispatchPlanner = document.getElementById('btnDispatchPlanner');

  // Set default tomorrow date for input
  if (calcDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    calcDate.value = tomorrow.toISOString().split('T')[0];
  }

  function updateCalcSummary() {
    if (calcSummary && calcVehicle && calcServiceType) {
      calcSummary.textContent = `${calcVehicle.value} • ${calcServiceType.value}`;
    }
  }

  if (calcVehicle) calcVehicle.addEventListener('change', updateCalcSummary);
  if (calcServiceType) calcServiceType.addEventListener('change', updateCalcSummary);

  if (btnDispatchPlanner) {
    btnDispatchPlanner.addEventListener('click', () => {
      const vehicle = calcVehicle ? calcVehicle.value : 'Mercedes-Benz E-Class';
      const service = calcServiceType ? calcServiceType.value : 'Airport Fast-Track Transfer';
      const date = calcDate ? calcDate.value : 'Upcoming';
      const guests = calcGuests ? calcGuests.value : '1-2 Guests';

      const text = `Hello Fast Services Car Rental! I would like to inquire about reserving a vehicle through your website:%0A%0A• Vehicle: ${encodeURIComponent(vehicle)}%0A• Service: ${encodeURIComponent(service)}%0A• Preferred Date: ${encodeURIComponent(date)}%0A• Party Size: ${encodeURIComponent(guests)}%0A%0APlease let me know vehicle availability and booking confirmation.`;
      
      window.open(`https://wa.me/917980952635?text=${text}`, '_blank');
    });
  }

  // 6. Direct Intake Form (Index Page)
  const directBookingForm = document.getElementById('directBookingForm');
  if (directBookingForm) {
    directBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value || 'Guest';
      const phone = document.getElementById('bookPhone')?.value || '';
      const fleet = document.getElementById('bookFleet')?.value || 'Mercedes-Benz E-Class';
      const details = document.getElementById('bookDetails')?.value || 'Standard Dispatch';

      const msg = `Hello Fast Services Car Rental! New VIP reservation request from website:%0A%0A• Client Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Desired Fleet: ${encodeURIComponent(fleet)}%0A• Trip Details: ${encodeURIComponent(details)}%0A%0APlease confirm availability.`;

      window.open(`https://wa.me/917980952635?text=${msg}`, '_blank');
    });
  }

  // 7. Full Contact Page Form
  const contactBookingForm = document.getElementById('contactBookingForm');
  if (contactBookingForm) {
    contactBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName')?.value || 'Guest';
      const phone = document.getElementById('cPhone')?.value || '';
      const email = document.getElementById('cEmail')?.value || 'Not provided';
      const fleet = document.getElementById('cFleet')?.value || 'Mercedes-Benz E-Class';
      const service = document.getElementById('cService')?.value || 'Airport Fast-Track';
      const date = document.getElementById('cDate')?.value || '';
      const time = document.getElementById('cTime')?.value || '';
      const req = document.getElementById('cMessage')?.value || 'None';

      const msg = `Hello Fast Services Car Rental! New Booking Intake:%0A%0A• Client: ${encodeURIComponent(name)}%0A• WhatsApp: ${encodeURIComponent(phone)}%0A• Email: ${encodeURIComponent(email)}%0A• Car: ${encodeURIComponent(fleet)}%0A• Service: ${encodeURIComponent(service)}%0A• Date & Time: ${encodeURIComponent(date)} at ${encodeURIComponent(time)}%0A• Notes: ${encodeURIComponent(req)}%0A%0APlease confirm my booking.`;

      window.open(`https://wa.me/917980952635?text=${msg}`, '_blank');
    });

    // Auto-select fleet car from URL parameters if present
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('car');
    if (carParam && document.getElementById('cFleet')) {
      const select = document.getElementById('cFleet');
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toLowerCase().includes(carParam.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }

  // 8. Fleet Tab Filter (Fleet Page)
  const filterTabs = document.querySelectorAll('.filter-tab');
  const vehicleCards = document.querySelectorAll('.vehicle-card[data-category]');

  if (filterTabs.length > 0 && vehicleCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        vehicleCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
