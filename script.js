// ==========================================================================
// 💖 PRAGYAN'S BIRTHDAY WEBSITE - INTERACTIVE EXPERIENCE LOGIC
// ==========================================================================

// Force browser to always start from Section 1 on refresh / reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

  // --- State Management ---
  const state = {
    currentStep: 1,
    isCandleBlown: false,
    hasReachedMemories: false,
    viewedMemories: new Set(),
    activeModalIndex: 0,
    isPlayingMusic: false,
    audioCtx: null
  };

  // --- DOM Elements ---
  const elements = {
    // Navigation & Sections
    navSteps: document.querySelectorAll('.nav-step'),
    sections: {
      1: document.getElementById('section1'),
      2: document.getElementById('section2'),
      3: document.getElementById('section3'),
      4: document.getElementById('section4')
    },

    // Hero Section
    heroImage: document.getElementById('heroImage'),
    heroTagline: document.getElementById('heroTagline'),
    heroSubtitle: document.getElementById('heroSubtitle'),
    heroJourneyText: document.getElementById('heroJourneyText'),
    heroReadyPrompt: document.getElementById('heroReadyPrompt'),
    btnGoToCandle: document.getElementById('btnGoToCandle'),

    // Candle Section
    cakeSectionTitle: document.getElementById('cakeSectionTitle'),
    cakeInstructions: document.getElementById('cakeInstructions'),
    candleFlame: document.getElementById('candleFlame'),
    flameHalo: document.getElementById('flameHalo'),
    smokePuff: document.getElementById('smokePuff'),
    cakeInteractive: document.getElementById('cakeInteractive'),
    btnBlowCandle: document.getElementById('btnBlowCandle'),
    blowButtonText: document.getElementById('blowButtonText'),
    blowActionWrap: document.getElementById('blowActionWrap'),
    celebrationPopout: document.getElementById('celebrationPopout'),
    celebrationTitle: document.getElementById('celebrationTitle'),
    celebrationMessage: document.getElementById('celebrationMessage'),
    btnGoToMemories: document.getElementById('btnGoToMemories'),
    nextButtonText: document.getElementById('nextButtonText'),
    balloonContainer: document.getElementById('balloonContainer'),

    // Memories Section
    memoriesGrid: document.getElementById('memoriesGrid'),
    viewedCount: document.getElementById('viewedCount'),
    memoryProgressFill: document.getElementById('memoryProgressFill'),
    btnOpenInbox: document.getElementById('btnOpenInbox'),

    // Modal Lightbox
    modalOverlay: document.getElementById('memoryModalOverlay'),
    modalLoveCanvas: document.getElementById('modalLoveCanvas'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalImg: document.getElementById('modalImg'),
    modalIndexBadge: document.getElementById('modalIndexBadge'),
    modalDateTag: document.getElementById('modalDateTag'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    modalPrevBtn: document.getElementById('modalPrevBtn'),
    modalNextBtn: document.getElementById('modalNextBtn'),
    modalHeartReactBtn: document.getElementById('modalHeartReactBtn'),
    reactCount: document.getElementById('reactCount'),

    // Letter Section
    envelopeBox: document.getElementById('envelopeBox'),
    waxSeal: document.getElementById('waxSeal'),
    parchmentLetter: document.getElementById('parchmentLetter'),
    letterDateStamp: document.getElementById('letterDateStamp'),
    letterSalutation: document.getElementById('letterSalutation'),
    letterBodyParagraphs: document.getElementById('letterBodyParagraphs'),
    letterClosing: document.getElementById('letterClosing'),
    letterSignature: document.getElementById('letterSignature'),
    btnShowerLove: document.getElementById('btnShowerLove'),
    btnReplayJourney: document.getElementById('btnReplayJourney'),

    // Audio & Canvases
    audioToggleBtn: document.getElementById('audioToggleBtn'),
    bgAudio: document.getElementById('bgAudio'),
    ambientCanvas: document.getElementById('ambientCanvas'),
    celebrationCanvas: document.getElementById('celebrationCanvas')
  };

  // ==========================================================================
  // 1. INITIALIZE CONTENT FROM WEBSITE_CONFIG
  // ==========================================================================
  function initContent() {
    if (typeof WEBSITE_CONFIG === 'undefined') return;

    // Load Hero Image with robust fallback
    loadHeroImage();

    // Home Section Texts
    if (WEBSITE_CONFIG.home) {
      if (WEBSITE_CONFIG.home.tagline) elements.heroTagline.textContent = WEBSITE_CONFIG.home.tagline;
      if (WEBSITE_CONFIG.home.subtitle) elements.heroSubtitle.textContent = WEBSITE_CONFIG.home.subtitle;
      if (WEBSITE_CONFIG.home.journeyText) elements.heroJourneyText.textContent = WEBSITE_CONFIG.home.journeyText;
      if (WEBSITE_CONFIG.home.readyPrompt) elements.heroReadyPrompt.textContent = WEBSITE_CONFIG.home.readyPrompt;
      if (WEBSITE_CONFIG.home.buttonText) {
        const textSpan = elements.btnGoToCandle.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = WEBSITE_CONFIG.home.buttonText;
      }
    }

    // Candle Section
    if (WEBSITE_CONFIG.cakeSection) {
      if (WEBSITE_CONFIG.cakeSection.title) elements.cakeSectionTitle.textContent = WEBSITE_CONFIG.cakeSection.title;
      if (WEBSITE_CONFIG.cakeSection.instructions) elements.cakeInstructions.textContent = WEBSITE_CONFIG.cakeSection.instructions;
      if (WEBSITE_CONFIG.cakeSection.blowButtonText) elements.blowButtonText.textContent = WEBSITE_CONFIG.cakeSection.blowButtonText;
      if (WEBSITE_CONFIG.cakeSection.celebrationTitle) elements.celebrationTitle.textContent = WEBSITE_CONFIG.cakeSection.celebrationTitle;
      if (WEBSITE_CONFIG.cakeSection.celebrationMessage) elements.celebrationMessage.textContent = WEBSITE_CONFIG.cakeSection.celebrationMessage;
      if (WEBSITE_CONFIG.cakeSection.nextButtonText) elements.nextButtonText.textContent = WEBSITE_CONFIG.cakeSection.nextButtonText;
    }

    // Memories Section
    renderMemoriesGrid();

    // Love Letter Section
    if (WEBSITE_CONFIG.letter) {
      if (WEBSITE_CONFIG.letter.salutation) elements.letterSalutation.textContent = WEBSITE_CONFIG.letter.salutation;
      if (WEBSITE_CONFIG.letter.dateBadge) elements.letterDateStamp.textContent = WEBSITE_CONFIG.letter.dateBadge;
      if (WEBSITE_CONFIG.letter.closing) elements.letterClosing.textContent = WEBSITE_CONFIG.letter.closing;
      if (WEBSITE_CONFIG.letter.signature) elements.letterSignature.textContent = WEBSITE_CONFIG.letter.signature;

      if (Array.isArray(WEBSITE_CONFIG.letter.paragraphs)) {
        elements.letterBodyParagraphs.innerHTML = WEBSITE_CONFIG.letter.paragraphs
          .map(p => `<p>${p}</p>`)
          .join('');
      }
    }
  }

  // Trigger dynamic pop entrance animation on hero image
  function triggerHeroPop() {
    if (!elements.heroImage) return;
    elements.heroImage.classList.remove('hero-pop-anim');
    void elements.heroImage.offsetWidth;
    elements.heroImage.classList.add('hero-pop-anim');
  }

  // Load Hero Image with local and remote fallback
  function loadHeroImage() {
    const candidates = [
      (typeof WEBSITE_CONFIG !== 'undefined' && WEBSITE_CONFIG.home && WEBSITE_CONFIG.home.heroImage) ? WEBSITE_CONFIG.home.heroImage : null,
      'hero.webp',
      'images/hero.webp',
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&auto=format&fit=crop&q=80'
    ].filter(Boolean);

    let idx = 0;
    function tryLoad() {
      if (idx >= candidates.length) return;
      const src = candidates[idx++];
      const testImg = new Image();
      testImg.onload = () => {
        elements.heroImage.src = src;
        triggerHeroPop();
      };
      testImg.onerror = () => {
        tryLoad();
      };
      testImg.src = src;
    }
    tryLoad();
  }

  // ==========================================================================
  // 2. SCROLL LOCK UTILITY (locks manual scroll on Home & Candle sections)
  // ==========================================================================
  function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function unlockScroll() {
    // Don't unlock if the letter modal is open (it manages its own lock)
    if (document.getElementById('letterInboxModalOverlay')?.classList.contains('active')) return;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  // Block wheel, touch & keyboard manual scroll while on Section 1 (Home) & Section 2 (Candle)
  // Also block scrolling BACK past Section 3 once memories have been reached
  let _lastTouchY = 0;
  function onWheelBlock(e) {
    if (state.currentStep === 1 || state.currentStep === 2) {
      e.preventDefault();
      return;
    }
    // Prevent scrolling back to Section 2 once memories reached
    if (state.hasReachedMemories && e.deltaY < 0) {
      const section3 = elements.sections[3];
      if (section3 && section3.getBoundingClientRect().top >= -5) {
        e.preventDefault();
      }
    }
  }
  function onTouchBlock(e) {
    if (state.currentStep === 1 || state.currentStep === 2) {
      e.preventDefault();
      return;
    }
    // Prevent scrolling back to Section 2 once memories reached
    if (state.hasReachedMemories) {
      const currentTouchY = e.touches[0]?.clientY ?? 0;
      const scrollingUp = currentTouchY > _lastTouchY;
      if (scrollingUp) {
        const section3 = elements.sections[3];
        if (section3 && section3.getBoundingClientRect().top >= -5) {
          e.preventDefault();
        }
      }
    }
  }
  window.addEventListener('touchstart', (e) => { _lastTouchY = e.touches[0]?.clientY ?? 0; }, { passive: true });
  function onKeyBlock(e) {
    if (state.currentStep === 1 || state.currentStep === 2) {
      const blocked = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'];
      if (blocked.includes(e.code) || blocked.includes(e.key) || [32, 33, 34, 35, 36, 38, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
      return;
    }
    // Prevent scrolling back to Section 2 once memories reached
    if (state.hasReachedMemories) {
      const upKeys = ['ArrowUp', 'PageUp'];
      if (upKeys.includes(e.key) || upKeys.includes(e.code)) {
        const section3 = elements.sections[3];
        if (section3 && section3.getBoundingClientRect().top >= -5) {
          e.preventDefault();
        }
      }
    }
  }

  function enableScrollBlock() {
    window.addEventListener('wheel',     onWheelBlock, { passive: false });
    window.addEventListener('touchmove', onTouchBlock, { passive: false });
    window.addEventListener('keydown',   onKeyBlock,   { passive: false });
  }

  function disableScrollBlock() {
    window.removeEventListener('wheel',     onWheelBlock);
    window.removeEventListener('touchmove', onTouchBlock);
    window.removeEventListener('keydown',   onKeyBlock);
  }

  // ==========================================================================
  // 3. SMOOTH AUTO-SCROLLING & SECTION TRANSITIONS
  // ==========================================================================
  function goToSection(stepNumber, behavior = 'smooth') {
    if (stepNumber < 1 || stepNumber > 4) return;
    state.currentStep = stepNumber;

    // Temporarily unlock scroll so window.scrollTo can perform smooth scrolling
    disableScrollBlock();
    unlockScroll();

    const targetSection = elements.sections[stepNumber];
    if (targetSection) {
      const topOffset = targetSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topOffset,
        behavior: behavior
      });
    }

    // ── Scroll lock: lock on Section 1 (Home) and Section 2 (Candle) ──
    if (stepNumber === 1 || stepNumber === 2) {
      if (behavior === 'instant') {
        lockScroll();
        enableScrollBlock();
      } else {
        setTimeout(() => {
          if (state.currentStep === 1 || state.currentStep === 2) {
            lockScroll();
            enableScrollBlock();
          }
        }, 700);
      }
    } else {
      unlockScroll();
      // For Section 3: keep scroll listeners active so backward scroll guard works
      // (the listeners are smart enough to only block when hasReachedMemories + at section3 top)
      setTimeout(() => {
        enableScrollBlock();
      }, 750);
    }

    // Trigger dynamic hero pop animation if arriving at Section 1
    if (stepNumber === 1) {
      triggerHeroPop();
    }

    // Update top progress indicators
    elements.navSteps.forEach(stepEl => {
      const stepVal = parseInt(stepEl.getAttribute('data-step'));
      if (stepVal === stepNumber) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });

    // Check inbox visibility whenever navigating
    setTimeout(updateInboxVisibility, 400);

    // If reaching section 4, trigger envelope opening
    if (stepNumber === 4) {
      setTimeout(() => {
        openLoveLetter();
      }, 700);
    }
  }

  // Floating Inbox Surprise Dock Visibility Handler:
  // Hidden by default on Home & Candle sections, only appears in the last scroll of memories!
  const inboxDock = document.getElementById('inboxSurpriseDock');
  function updateInboxVisibility() {
    if (!inboxDock) return;
    const section3 = elements.sections[3];
    const section4 = elements.sections[4];
    if (!section3) return;

    const s3Rect = section3.getBoundingClientRect();
    const s4Rect = section4 ? section4.getBoundingClientRect() : null;

    // Visible only in lower half / last scroll of Section 3 (Memories),
    // and strictly hidden on Section 1, Section 2, and Section 4!
    const inLowerMemories = s3Rect.top < window.innerHeight * 0.35 && s3Rect.bottom > window.innerHeight * 0.25;
    const notReachedLetter = s4Rect ? s4Rect.top > window.innerHeight * 0.65 : true;

    if (inLowerMemories && notReachedLetter) {
      inboxDock.classList.add('show-inbox');
    } else {
      inboxDock.classList.remove('show-inbox');
    }
  }
  window.addEventListener('scroll', updateInboxVisibility, { passive: true });
  window.addEventListener('resize', updateInboxVisibility, { passive: true });

  // Nav dots click listener: auto-scroll to section
  elements.navSteps.forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const targetStep = parseInt(stepEl.getAttribute('data-step'));
      disableScrollBlock();
      unlockScroll();
      goToSection(targetStep);
      startMusicIfAllowed();
    });
  });

  // Section 1 Ready Button -> Unlocks scroll & goes to Section 2 (Candle)
  elements.btnGoToCandle.addEventListener('click', () => {
    soundFX.playPop();
    startMusicIfAllowed();
    disableScrollBlock();
    unlockScroll();
    goToSection(2);
  });

  // Section 2 Go to Memories Button -> Unlocks scroll & goes to Section 3 (Memories)
  elements.btnGoToMemories.addEventListener('click', () => {
    soundFX.playPop();
    state.hasReachedMemories = true;
    disableScrollBlock();
    unlockScroll();
    goToSection(3);
  });

  // ==========================================================================
  // OTP VERIFICATION FLOW (Gate for the Love Letter)
  // ==========================================================================
  const POWER_AUTOMATE_URL = 'https://aa693af3d8eeeb2882a8583a47eba1.d0.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/02/workflows/903092a183f443db86dd42e53b1c7965/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5kPGvi_LOBOd96XFerTEOHIZmB4NFDYntSBhQruAcHo';

  let _currentOtp = null; // the generated OTP stored in memory

  const otpOverlay    = document.getElementById('otpModalOverlay');
  const otpPhaseSend  = document.getElementById('otpPhaseSend');
  const otpPhaseVerify = document.getElementById('otpPhaseVerify');
  const otpPhaseSuccess = document.getElementById('otpPhaseSuccess');
  const otpSendBtn    = document.getElementById('otpSendBtn');
  const otpSendBtnText = document.getElementById('otpSendBtnText');
  const otpSendError  = document.getElementById('otpSendError');
  const otpInput      = document.getElementById('otpInput');
  const otpVerifyBtn  = document.getElementById('otpVerifyBtn');
  const otpVerifyError = document.getElementById('otpVerifyError');
  const otpResendAction = document.getElementById('otpResendAction');
  const otpCloseBtn   = document.getElementById('otpCloseBtn');

  function generateOtp() {
    // Cryptographically random 6-digit number (100000–999999)
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return String(100000 + (arr[0] % 900000));
  }

  function showOtpPhase(phase) {
    [otpPhaseSend, otpPhaseVerify, otpPhaseSuccess].forEach(p => {
      if (p) { p.style.display = 'none'; p.style.animation = 'none'; }
    });
    if (phase) {
      phase.style.display = '';
      // Re-trigger animation
      requestAnimationFrame(() => { phase.style.animation = ''; });
    }
  }

  function openOtpModal() {
    if (!otpOverlay) return;
    _currentOtp = null;
    showOtpPhase(otpPhaseSend);
    if (otpSendBtnText) otpSendBtnText.textContent = 'Send OTP to My Email 📩';
    if (otpSendBtn) otpSendBtn.disabled = false;
    if (otpSendError) { otpSendError.style.display = 'none'; otpSendError.textContent = ''; }
    if (otpInput) otpInput.value = '';
    if (otpVerifyError) { otpVerifyError.style.display = 'none'; otpVerifyError.textContent = ''; }
    otpOverlay.setAttribute('aria-hidden', 'false');
    otpOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeOtpModal() {
    if (!otpOverlay) return;
    otpOverlay.classList.remove('active');
    otpOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    _currentOtp = null;
  }

  async function sendOtpToEmail() {
    _currentOtp = generateOtp();
    if (otpSendBtn) otpSendBtn.disabled = true;
    if (otpSendBtnText) otpSendBtnText.textContent = 'Sending... ✉️';
    if (otpSendError) { otpSendError.style.display = 'none'; otpSendError.textContent = ''; }

    try {
      const res = await fetch(POWER_AUTOMATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: _currentOtp })
      });

      if (res.ok || res.status === 202) {
        // OTP sent successfully — move to verify phase
        showOtpPhase(otpPhaseVerify);
        if (otpInput) { otpInput.value = ''; otpInput.focus(); }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      _currentOtp = null;
      if (otpSendBtn) otpSendBtn.disabled = false;
      if (otpSendBtnText) otpSendBtnText.textContent = 'Send OTP to My Email 📩';
      if (otpSendError) {
        otpSendError.textContent = "Couldn't send the email 😢 Please check your connection and try again.";
        otpSendError.style.display = '';
      }
    }
  }

  function verifyOtp() {
    const entered = (otpInput ? otpInput.value.trim() : '');
    if (!entered || entered.length !== 6) {
      showOtpInputError('Please enter the full 6-digit code 🔢');
      return;
    }
    if (entered !== _currentOtp) {
      showOtpInputError('That doesn\'t match 💔 Try again!');
      otpInput.classList.add('shake');
      otpInput.addEventListener('animationend', () => otpInput.classList.remove('shake'), { once: true });
      return;
    }
    // ✅ OTP correct!
    showOtpPhase(otpPhaseSuccess);
    soundFX.playFanfare();
    setTimeout(() => {
      closeOtpModal();
      openLetterInboxModal();
    }, 1500);
  }

  function showOtpInputError(msg) {
    if (!otpVerifyError) return;
    otpVerifyError.textContent = msg;
    otpVerifyError.style.display = '';
    setTimeout(() => { if (otpVerifyError) otpVerifyError.style.display = 'none'; }, 3500);
  }

  // Listeners
  if (otpSendBtn)    otpSendBtn.addEventListener('click', sendOtpToEmail);
  if (otpVerifyBtn)  otpVerifyBtn.addEventListener('click', verifyOtp);
  if (otpCloseBtn)   otpCloseBtn.addEventListener('click', closeOtpModal);
  if (otpResendAction) {
    otpResendAction.addEventListener('click', () => {
      showOtpPhase(otpPhaseSend);
      if (otpSendBtnText) otpSendBtnText.textContent = 'Send OTP to My Email 📩';
      if (otpSendBtn) otpSendBtn.disabled = false;
      if (otpSendError) { otpSendError.style.display = 'none'; }
    });
  }
  if (otpInput) {
    otpInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') verifyOtp(); });
    // Only allow numeric input
    otpInput.addEventListener('input', () => {
      otpInput.value = otpInput.value.replace(/\D/g, '').slice(0, 6);
    });
  }
  // Close on backdrop click
  if (otpOverlay) {
    otpOverlay.addEventListener('click', (e) => { if (e.target === otpOverlay) closeOtpModal(); });
  }
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && otpOverlay && otpOverlay.classList.contains('active')) closeOtpModal();
  });

  // ==========================================================================
  // LETTER INBOX MODAL POPUP LOGIC
  // ==========================================================================
  const letterInboxModal = document.getElementById('letterInboxModalOverlay');
  const letterInboxCloseBtn = document.getElementById('letterInboxCloseBtn');
  const letterInboxCloseBtnBottom = document.getElementById('letterInboxCloseBtnBottom');
  const popupEnvelopeBox = document.getElementById('popupEnvelopeBox');
  const popupWaxSeal = document.getElementById('popupWaxSeal');
  const popupBtnShowerLove = document.getElementById('popupBtnShowerLove');

  function openLetterInboxModal() {
    if (!letterInboxModal) return;

    // Populate popup letter content from WEBSITE_CONFIG
    if (typeof WEBSITE_CONFIG !== 'undefined' && WEBSITE_CONFIG.letter) {
      const cfg = WEBSITE_CONFIG.letter;
      const popupSalutation = document.getElementById('popupLetterSalutation');
      const popupDateStamp = document.getElementById('popupLetterDateStamp');
      const popupClosing = document.getElementById('popupLetterClosing');
      const popupSignature = document.getElementById('popupLetterSignature');
      const popupBody = document.getElementById('popupLetterBodyParagraphs');

      if (popupSalutation && cfg.salutation) popupSalutation.textContent = cfg.salutation;
      if (popupDateStamp && cfg.dateBadge) popupDateStamp.textContent = cfg.dateBadge;
      if (popupClosing && cfg.closing) popupClosing.textContent = cfg.closing;
      if (popupSignature && cfg.signature) popupSignature.textContent = cfg.signature;
      if (popupBody && Array.isArray(cfg.paragraphs)) {
        popupBody.innerHTML = cfg.paragraphs.map(p => `<p>${p}</p>`).join('');
      }
    }

    // Reset envelope to closed state each time modal opens
    if (popupEnvelopeBox) popupEnvelopeBox.classList.remove('opened');

    letterInboxModal.classList.add('active');
    letterInboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    soundFX.playChime();
  }

  function closeLetterInboxModal() {
    if (!letterInboxModal) return;
    letterInboxModal.classList.remove('active');
    letterInboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open OTP gate before showing the love letter
  const btnBottomToLetter = document.getElementById('btnBottomToLetter');
  if (btnBottomToLetter) {
    btnBottomToLetter.addEventListener('click', () => {
      openOtpModal();
    });
  }

  // Section 3 floating inbox Button — also goes through OTP gate
  elements.btnOpenInbox.addEventListener('click', () => {
    openOtpModal();
  });

  // Wax seal inside popup opens the envelope
  function openEnvelopePopup() {
    if (popupEnvelopeBox && !popupEnvelopeBox.classList.contains('opened')) {
      popupEnvelopeBox.classList.add('opened');
      soundFX.playFanfare();
      launchShowerLoveParticles();
    }
  }

  if (popupWaxSeal) {
    popupWaxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelopePopup();
    });
  }

  if (popupEnvelopeBox) {
    popupEnvelopeBox.addEventListener('click', () => {
      if (!popupEnvelopeBox.classList.contains('opened')) {
        openEnvelopePopup();
      }
    });
  }

  // Shower Love inside popup
  if (popupBtnShowerLove) {
    popupBtnShowerLove.addEventListener('click', () => {
      soundFX.playFanfare();
      launchShowerLoveParticles();
    });
  }

  // Close buttons
  if (letterInboxCloseBtn) letterInboxCloseBtn.addEventListener('click', closeLetterInboxModal);
  if (letterInboxCloseBtnBottom) letterInboxCloseBtnBottom.addEventListener('click', closeLetterInboxModal);

  // Close on overlay click
  if (letterInboxModal) {
    letterInboxModal.addEventListener('click', (e) => {
      if (e.target === letterInboxModal) closeLetterInboxModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterInboxModal && letterInboxModal.classList.contains('active')) {
      closeLetterInboxModal();
    }
  });

  // Section 4 Replay Journey -> Auto-scrolls back to Section 1
  elements.btnReplayJourney.addEventListener('click', () => {
    soundFX.playPop();
    state.hasReachedMemories = false;
    state.isCandleBlown = false;
    goToSection(1);
  });

  // Scroll Observer: Update active nav dot as user auto-scrolls through sections
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          const id = entry.target.id;
          const stepNum = id === 'section1' ? 1 : id === 'section2' ? 2 : id === 'section3' ? 3 : 4;
          state.currentStep = stepNum;

          elements.navSteps.forEach(stepEl => {
            const stepVal = parseInt(stepEl.getAttribute('data-step'));
            if (stepVal === stepNum) {
              stepEl.classList.add('active');
            } else {
              stepEl.classList.remove('active');
            }
          });

          updateInboxVisibility();

          // Lock scroll on Section 1 (Home) & Section 2 (Candle), unlock on others
          if (stepNum === 1 || stepNum === 2) {
            lockScroll();
            enableScrollBlock();
          } else {
            unlockScroll();
            enableScrollBlock(); // keep listeners for backward scroll guard on Section 3
          }

          // If Section 4 is reached by auto-scroll, open letter
          if (stepNum === 4) {
            setTimeout(() => {
              openLoveLetter();
            }, 600);
          }
        }
      });
    }, { threshold: [0.35] });

    Object.values(elements.sections).forEach(sec => {
      if (sec) sectionObserver.observe(sec);
    });
  }

  // ==========================================================================
  // 3. CANDLE BLOW & CELEBRATION (CRACKERS, BALLOONS, & AUTO-SCROLL)
  // ==========================================================================
  function blowCandle() {
    if (state.isCandleBlown) return;
    state.isCandleBlown = true;

    // Play blow whoosh sound
    soundFX.playBlow();

    // Extinguish flame and emit smoke
    elements.candleFlame.classList.add('blown-out');
    elements.flameHalo.classList.add('blown-out');
    elements.smokePuff.classList.add('animating');

    // Hide blow button smoothly
    elements.blowActionWrap.style.opacity = '0';
    elements.blowActionWrap.style.pointerEvents = 'none';

    // Delay celebration launch slightly for dramatic timing
    setTimeout(() => {
      // Play celebratory chime fanfare
      soundFX.playFanfare();

      // Launch fireworks & crackers explosion on canvas
      launchCelebrationCrackers();

      // Spawn floating balloons
      spawnBalloons(15);

      // Add celebrating class to section 2 for compact backdrop dimming
      elements.sections[2].classList.add('celebrating');

      // Show celebration banner popout
      elements.celebrationPopout.classList.remove('hidden');

      // No auto-scroll: user must click "Let's Recall Our Memories" to proceed.

    }, 400);
  }

  elements.btnBlowCandle.addEventListener('click', blowCandle);
  elements.candleFlame.addEventListener('click', blowCandle);
  elements.cakeInteractive.addEventListener('click', () => {
    if (!state.isCandleBlown) blowCandle();
  });

  // Floating Balloons Generator
  function spawnBalloons(count) {
    const colors = [
      'linear-gradient(135deg, #ff758c, #ff7eb3)',
      'linear-gradient(135deg, #ffd166, #ff9f1c)',
      'linear-gradient(135deg, #a0c4ff, #bdb2ff)',
      'linear-gradient(135deg, #ff99c8, #fcf6bd)',
      'linear-gradient(135deg, #ff5400, #ff0054)'
    ];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.style.left = `${Math.random() * 85 + 5}%`;
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = `${Math.random() * 3 + 5}s`;

        // Click to pop balloon with sound & sparkle burst
        balloon.addEventListener('click', (e) => {
          e.stopPropagation();
          popSingleBalloon(balloon);
        });

        elements.balloonContainer.appendChild(balloon);

        // Remove from DOM after float finishes
        setTimeout(() => {
          if (balloon.parentNode) balloon.remove();
        }, 9000);
      }, i * 300);
    }
  }

  function popSingleBalloon(balloon) {
    soundFX.playPop();
    const rect = balloon.getBoundingClientRect();
    createBurstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    balloon.classList.add('balloon-pop');
    setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, 250);
  }

  // ==========================================================================
  // 4. MEMORIES GALLERY & MODAL LIGHTBOX
  // ==========================================================================
  function renderMemoriesGrid() {
    if (!WEBSITE_CONFIG || !Array.isArray(WEBSITE_CONFIG.memories)) return;
    elements.memoriesGrid.innerHTML = '';

    WEBSITE_CONFIG.memories.forEach((mem, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.setAttribute('data-index', index);

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${mem.image}" alt="${mem.title}" class="memory-card-img" loading="lazy">
          <span class="memory-num-badge">#${index + 1}</span>
          <button class="memory-heart-btn" title="Love this memory">❤️</button>
        </div>
        <div class="card-details">
          <span class="card-date-badge">${mem.date || 'Sweet Memory'}</span>
          <h3 class="card-memory-title">${mem.title}</h3>
          <p class="card-memory-snippet">${mem.description}</p>
          <div class="card-action-bar">
            <span class="relive-text">Tap to relive 💖</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openMemoryModal(index);
      });

      elements.memoriesGrid.appendChild(card);
    });
  }

  // ==========================================================================
  // LIVELY LOVING BACKGROUND ANIMATION FOR MEMORY MODAL
  // ==========================================================================
  const modalLoveCanvas = elements.modalLoveCanvas || document.getElementById('modalLoveCanvas');
  const mlCtx = modalLoveCanvas ? modalLoveCanvas.getContext('2d') : null;
  let modalLoveParticles = [];
  let modalLoveAnimId = null;
  let mlWidth = 0;
  let mlHeight = 0;

  function resizeModalLoveCanvas() {
    if (!modalLoveCanvas) return;
    mlWidth = modalLoveCanvas.width = window.innerWidth;
    mlHeight = modalLoveCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeModalLoveCanvas);

  class ModalLoveParticle {
    constructor(isBurst = false, burstX = null, burstY = null) {
      this.reset(isBurst, burstX, burstY);
    }

    reset(isBurst = false, burstX = null, burstY = null) {
      const types = ['heart', 'heart', 'sparkle', 'emoji', 'bokeh'];
      this.type = types[Math.floor(Math.random() * types.length)];

      const emojis = ['💖', '💕', '✨', '🌸', '💗', '🥰', '💓', '🌷', '💝'];
      this.emoji = emojis[Math.floor(Math.random() * emojis.length)];

      const colors = ['#ff758c', '#ff7eb3', '#ffd166', '#ff4d6d', '#ffffff', '#e0a96d', '#ff99c8'];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      this.isBurst = isBurst;
      if (isBurst) {
        this.x = (burstX !== null) ? burstX : mlWidth / 2 + (Math.random() - 0.5) * 300;
        this.y = (burstY !== null) ? burstY : mlHeight / 2 + (Math.random() - 0.5) * 200;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.8;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1.2;
        this.alpha = 1;
        this.decay = Math.random() * 0.009 + 0.006;
        this.size = Math.random() * 20 + 14;
      } else {
        this.x = Math.random() * mlWidth;
        this.y = mlHeight + Math.random() * 80;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = -(Math.random() * 1.5 + 0.85);
        this.alpha = Math.random() * 0.55 + 0.35;
        this.decay = 0;
        this.size = Math.random() * 18 + 12;
      }

      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.swingPhase = Math.random() * Math.PI * 2;
      this.swingSpeed = Math.random() * 0.025 + 0.015;
    }

    update() {
      if (this.isBurst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02; // gentle float gravity
        this.vx *= 0.99;
        this.alpha -= this.decay;
        this.rotation += this.rotSpeed;
      } else {
        this.swingPhase += this.swingSpeed;
        this.x += this.vx + Math.sin(this.swingPhase) * 1.1;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        if (this.y < -70 || this.x < -70 || this.x > mlWidth + 70) {
          this.reset(false);
        }
      }
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));

      if (this.type === 'heart') {
        const s = this.size;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, s / 4);
        ctx.quadraticCurveTo(0, 0, s / 4, 0);
        ctx.quadraticCurveTo(s / 2, 0, s / 2, s / 3);
        ctx.quadraticCurveTo(s / 2, 0, (3 * s) / 4, 0);
        ctx.quadraticCurveTo(s, 0, s, s / 4);
        ctx.quadraticCurveTo(s, s / 2, (3 * s) / 4, (3 * s) / 4);
        ctx.lineTo(s / 2, s);
        ctx.lineTo(s / 4, (3 * s) / 4);
        ctx.quadraticCurveTo(0, s / 2, 0, s / 4);
        ctx.fill();
      } else if (this.type === 'sparkle') {
        const r = this.size * 0.65;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          const innerAngle = angle + Math.PI / 4;
          ctx.lineTo(Math.cos(innerAngle) * (r * 0.28), Math.sin(innerAngle) * (r * 0.28));
        }
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 'emoji') {
        ctx.font = `${Math.round(this.size * 1.15)}px 'Segoe UI Emoji', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
      } else {
        // Soft glowing bokeh disc
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function startModalLoveAnimation() {
    resizeModalLoveCanvas();
    modalLoveParticles = [];
    // Ambient rising floating particles in background
    for (let i = 0; i < 45; i++) {
      const p = new ModalLoveParticle(false);
      p.y = Math.random() * mlHeight;
      modalLoveParticles.push(p);
    }
    // Opening celebratory burst of loving particles
    triggerModalLoveBurst();

    if (!modalLoveAnimId) {
      animateModalLove();
    }
  }

  function triggerModalLoveBurst(extra = false) {
    if (!mlCtx) return;
    const count = extra ? 40 : 25;
    for (let i = 0; i < count; i++) {
      modalLoveParticles.push(new ModalLoveParticle(true, mlWidth / 2, mlHeight / 2));
    }
  }

  function stopModalLoveAnimation() {
    if (modalLoveAnimId) {
      cancelAnimationFrame(modalLoveAnimId);
      modalLoveAnimId = null;
    }
    if (mlCtx) {
      mlCtx.clearRect(0, 0, mlWidth, mlHeight);
    }
    modalLoveParticles = [];
  }

  function animateModalLove() {
    if (!mlCtx) return;
    mlCtx.clearRect(0, 0, mlWidth, mlHeight);

    for (let i = modalLoveParticles.length - 1; i >= 0; i--) {
      const p = modalLoveParticles[i];
      p.update();
      p.draw(mlCtx);
      if (p.isBurst && p.alpha <= 0) {
        modalLoveParticles.splice(i, 1);
      }
    }

    modalLoveAnimId = requestAnimationFrame(animateModalLove);
  }

  let isModalTransitioning = false;

  function openMemoryModal(index, direction = 0) {
    if (!WEBSITE_CONFIG || !WEBSITE_CONFIG.memories[index]) return;
    if (isModalTransitioning) return;

    const isFirstOpen = !elements.modalOverlay.classList.contains('active');
    state.activeModalIndex = index;
    const mem = WEBSITE_CONFIG.memories[index];

    const applyMemoryData = () => {
      elements.modalImg.src = mem.image;
      elements.modalIndexBadge.textContent = `Memory #${index + 1} of ${WEBSITE_CONFIG.memories.length}`;
      elements.modalDateTag.textContent = mem.date || 'Cherished Moment';
      elements.modalTitle.textContent = mem.title;
      elements.modalDescription.textContent = mem.description;
      elements.reactCount.textContent = 'Loved! ❤️';

      // Mark as viewed
      state.viewedMemories.add(index);
      updateMemoriesProgress();

      // Mark card as viewed in DOM
      const card = elements.memoriesGrid.querySelector(`[data-index="${index}"]`);
      if (card) card.classList.add('viewed');
    };

    if (isFirstOpen || direction === 0) {
      applyMemoryData();
      elements.modalImg.className = 'modal-main-img';
      elements.modalOverlay.classList.add('active');

      if (isFirstOpen) {
        startModalLoveAnimation();
      } else {
        triggerModalLoveBurst();
      }
      soundFX.playPop();
    } else {
      // Smooth animated directional transition between images
      isModalTransitioning = true;
      const modalContentCol = elements.modalTitle ? elements.modalTitle.closest('.modal-content-col') : null;

      // Slide out current image & fade text
      elements.modalImg.classList.add(direction > 0 ? 'trans-out-left' : 'trans-out-right');
      if (modalContentCol) modalContentCol.classList.add('fading');

      setTimeout(() => {
        // Swap content
        applyMemoryData();

        // Position on opposite side invisibly
        elements.modalImg.className = 'modal-main-img ' + (direction > 0 ? 'trans-prep-right' : 'trans-prep-left');
        void elements.modalImg.offsetWidth; // force browser layout reflow

        // Slide into place
        elements.modalImg.className = 'modal-main-img';
        if (modalContentCol) modalContentCol.classList.remove('fading');

        triggerModalLoveBurst();
        soundFX.playPop();

        setTimeout(() => {
          isModalTransitioning = false;
        }, 360);
      }, 160);
    }
  }

  function closeMemoryModal() {
    elements.modalOverlay.classList.remove('active');
    stopModalLoveAnimation();
  }

  function updateMemoriesProgress() {
    const total = (WEBSITE_CONFIG && WEBSITE_CONFIG.memories) ? WEBSITE_CONFIG.memories.length : 20;
    const count = state.viewedMemories.size;
    elements.viewedCount.textContent = count;
    const percentage = Math.min(100, Math.round((count / total) * 100));
    elements.memoryProgressFill.style.width = `${percentage}%`;
  }

  elements.modalCloseBtn.addEventListener('click', closeMemoryModal);
  elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) closeMemoryModal();
  });

  // Modal navigation (Previous / Next) with smooth directional animation
  elements.modalPrevBtn.addEventListener('click', () => {
    const total = WEBSITE_CONFIG.memories.length;
    const newIdx = (state.activeModalIndex - 1 + total) % total;
    openMemoryModal(newIdx, -1);
  });

  elements.modalNextBtn.addEventListener('click', () => {
    const total = WEBSITE_CONFIG.memories.length;
    const newIdx = (state.activeModalIndex + 1) % total;
    openMemoryModal(newIdx, 1);
  });

  elements.modalHeartReactBtn.addEventListener('click', () => {
    soundFX.playChime();
    elements.reactCount.textContent = 'Extra Loved! 💖✨';
    createBurstParticles(window.innerWidth / 2, window.innerHeight / 2);
    triggerModalLoveBurst(true);
  });

  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (!elements.modalOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeMemoryModal();
    if (e.key === 'ArrowLeft') elements.modalPrevBtn.click();
    if (e.key === 'ArrowRight') elements.modalNextBtn.click();
  });

  // ==========================================================================
  // 5. LOVE LETTER ANIMATION & SHOWER
  // ==========================================================================
  function openLoveLetter() {
    elements.envelopeBox.classList.add('opened');
    soundFX.playChime();
  }

  elements.waxSeal.addEventListener('click', openLoveLetter);

  elements.btnShowerLove.addEventListener('click', () => {
    soundFX.playFanfare();
    launchShowerLoveParticles();
  });

  function launchShowerLoveParticles() {
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '💕', '🌸', '✨', '🌹', '💌'][Math.floor(Math.random() * 6)];
        heart.style.position = 'fixed';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = '-50px';
        heart.style.fontSize = `${Math.random() * 24 + 18}px`;
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'transform 3.5s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 3.5s linear';
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg) translateX(${(Math.random() - 0.5) * 150}px)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 4000);
      }, i * 70);
    }
  }

  // ==========================================================================
  // 6. AMBIENT PARTICLES CANVAS (HEARTS, PETALS & SPARKLES)
  // ==========================================================================
  const ambientCanvas = elements.ambientCanvas;
  const aCtx = ambientCanvas.getContext('2d');
  let ambientParticles = [];
  let aWidth = (ambientCanvas.width = window.innerWidth);
  let aHeight = (ambientCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    aWidth = ambientCanvas.width = window.innerWidth;
    aHeight = ambientCanvas.height = window.innerHeight;
    cWidth = celebrationCanvas.width = window.innerWidth;
    cHeight = celebrationCanvas.height = window.innerHeight;
  });

  class AmbientParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * aWidth;
      this.y = aHeight + Math.random() * 100;
      this.size = Math.random() * 10 + 6;
      this.speedY = Math.random() * 1 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;
      this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
      this.color = Math.random() > 0.5 ? '#ff758c' : '#ffd166';
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
      this.rotation += this.rotSpeed;
      if (this.y < -50) this.reset();
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      if (this.type === 'heart') {
        // Draw miniature heart
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, s / 4);
        ctx.quadraticCurveTo(0, 0, s / 4, 0);
        ctx.quadraticCurveTo(s / 2, 0, s / 2, s / 3);
        ctx.quadraticCurveTo(s / 2, 0, (3 * s) / 4, 0);
        ctx.quadraticCurveTo(s, 0, s, s / 4);
        ctx.quadraticCurveTo(s, s / 2, (3 * s) / 4, (3 * s) / 4);
        ctx.lineTo(s / 2, s);
        ctx.lineTo(s / 4, (3 * s) / 4);
        ctx.quadraticCurveTo(0, s / 2, 0, s / 4);
        ctx.fill();
      } else {
        // Draw cute sparkle star
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < 45; i++) {
    ambientParticles.push(new AmbientParticle());
  }

  function animateAmbient() {
    aCtx.clearRect(0, 0, aWidth, aHeight);
    for (let p of ambientParticles) {
      p.update();
      p.draw(aCtx);
    }
    requestAnimationFrame(animateAmbient);
  }
  animateAmbient();

  // Mouse / Touch Sparkle Trail
  window.addEventListener('pointermove', (e) => {
    if (Math.random() > 0.6) {
      const trail = new AmbientParticle();
      trail.x = e.clientX;
      trail.y = e.clientY;
      trail.speedY = Math.random() * 1.5 + 0.5;
      trail.size = Math.random() * 8 + 4;
      ambientParticles.push(trail);
      if (ambientParticles.length > 70) ambientParticles.shift();
    }
  });

  // ==========================================================================
  // 7. CELEBRATION FIREWORKS & CONFETTI ENGINE
  // ==========================================================================
  const celebrationCanvas = elements.celebrationCanvas;
  const cCtx = celebrationCanvas.getContext('2d');
  let celebrationParticles = [];
  let cWidth = (celebrationCanvas.width = window.innerWidth);
  let cHeight = (celebrationCanvas.height = window.innerHeight);

  class CelebrationParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.18;
      this.friction = 0.95;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.size = Math.random() * 5 + 3;
    }
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function launchCelebrationCrackers() {
    const crackerColors = ['#ff758c', '#ffd166', '#06d6a0', '#118ab2', '#ff5400', '#ffffff', '#ff99c8'];
    const burstCount = 8;

    for (let b = 0; b < burstCount; b++) {
      setTimeout(() => {
        const x = Math.random() * (cWidth * 0.8) + cWidth * 0.1;
        const y = Math.random() * (cHeight * 0.5) + cHeight * 0.15;
        soundFX.playCrackerBurst();

        for (let i = 0; i < 60; i++) {
          const color = crackerColors[Math.floor(Math.random() * crackerColors.length)];
          celebrationParticles.push(new CelebrationParticle(x, y, color));
        }
      }, b * 320);
    }
  }

  function createBurstParticles(x, y) {
    const colors = ['#ff758c', '#ffd166', '#fff'];
    for (let i = 0; i < 25; i++) {
      celebrationParticles.push(new CelebrationParticle(x, y, colors[i % colors.length]));
    }
  }

  function animateCelebration() {
    cCtx.clearRect(0, 0, cWidth, cHeight);
    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
      const p = celebrationParticles[i];
      p.update();
      p.draw(cCtx);
      if (p.alpha <= 0) celebrationParticles.splice(i, 1);
    }
    requestAnimationFrame(animateCelebration);
  }
  animateCelebration();

  // ==========================================================================
  // 8. AUDIO SYNTHESIS & MELODY ENGINE (WEB AUDIO API + HTML5 AUDIO)
  // ==========================================================================
  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) state.audioCtx = new AudioCtx();
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  const soundFX = {
    // Gentle Pop Sound (buttons, balloons)
    playPop() {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    },

    // Soft Wind Whoosh for candle blow
    playBlow() {
      const ctx = getAudioContext();
      if (!ctx) return;
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.6);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    },

    // Celebratory Chime
    playChime() {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.65);
      });
    },

    // Fanfare chords on celebration
    playFanfare() {
      const ctx = getAudioContext();
      if (!ctx) return;
      const chords = [
        [523.25, 659.25, 783.99], // C Major
        [587.33, 739.99, 880.00], // D Major
        [659.25, 830.61, 987.77], // E Major
        [783.99, 987.77, 1174.66] // G Major High
      ];
      chords.forEach((chord, step) => {
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + step * 0.18);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + step * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + step * 0.18 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + step * 0.18);
          osc.stop(ctx.currentTime + step * 0.18 + 0.55);
        });
      });
    },

    // Cracker pop sound
    playCrackerBurst() {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
  };

  // Background Romantic Melody Synthesizer / Audio Element Handler
  let synthInterval = null;
  const romanticMelodyNotes = [
    261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
    349.23, 440.00, 523.25, 659.25, // F4, A4, C5, E5
    392.00, 493.88, 587.33, 783.99, // G4, B4, D5, G5
    329.63, 392.00, 493.88, 659.25  // E4, G4, B4, E5
  ];
  let noteIndex = 0;

  function playSynthLullabyStep() {
    if (!state.isPlayingMusic) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const freq = romanticMelodyNotes[noteIndex % romanticMelodyNotes.length];
    noteIndex++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.25);
  }

  function startMusicIfAllowed() {
    if (state.isPlayingMusic) return;
    toggleMusic(true);
  }

  function toggleMusic(forcePlay = null) {
    const shouldPlay = forcePlay !== null ? forcePlay : !state.isPlayingMusic;
    state.isPlayingMusic = shouldPlay;

    if (shouldPlay) {
      elements.audioToggleBtn.classList.add('playing');
      getAudioContext();

      // Try playing external audio element if available
      if (elements.bgAudio) {
        elements.bgAudio.play().catch(() => {
          // If external audio blocked or fails, seamlessly use pleasant Web Audio synthesizer
          if (!synthInterval) synthInterval = setInterval(playSynthLullabyStep, 700);
        });
      } else {
        if (!synthInterval) synthInterval = setInterval(playSynthLullabyStep, 700);
      }
    } else {
      elements.audioToggleBtn.classList.remove('playing');
      if (elements.bgAudio) elements.bgAudio.pause();
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
    }
  }

  elements.audioToggleBtn.addEventListener('click', () => {
    toggleMusic();
  });

  // Start music on FIRST user interaction anywhere (browser autoplay policy requires a gesture).
  // This means music begins the instant they click anything on the home page.
  window.addEventListener('click', () => {
    getAudioContext();
    startMusicIfAllowed();
  }, { once: true });

  // Initialize data
  initContent();

  // Ensure page always starts cleanly from Section 1 (Page 1) on reload / refresh
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  goToSection(1, 'instant');
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // Handle reload and back/forward cache navigations
  window.addEventListener('pageshow', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    goToSection(1, 'instant');
  });

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

});
