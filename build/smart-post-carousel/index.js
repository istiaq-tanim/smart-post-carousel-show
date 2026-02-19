/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/swiper/modules/a11y.mjs"
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/a11y.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ A11y)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");




function A11y({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: true,
      wrapperLiveRegion: true
    }
  });
  swiper.a11y = {
    clicked: false
  };
  let liveRegion = null;
  let preventFocusHandler;
  let focusTargetSlideEl;
  let visibilityChangedTimestamp = new Date().getTime();
  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(notification, message);
  }
  function getRandomNumber(size = 16) {
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el, role) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el, description) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElControls(el, controls) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-controls', controls);
    });
  }
  function addElLabel(el, label) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el, id) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el, live) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', true);
    });
  }
  function enableEl(el) {
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y;
    const targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
      const prevEls = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.navigation.prevEl);
      const nextEls = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.navigation.nextEl);
      if (nextEls.includes(targetEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (prevEls.includes(targetEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
    }
    if (swiper.pagination && targetEl.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    const params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach(bulletEl => {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bulletEl) + 1));
        }
      }
      if (bulletEl.matches((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }
  const initNavEl = (el, wrapperId, message) => {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  const handlePointerDown = e => {
    if (focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target)) {
      preventFocusHandler = true;
    }
    swiper.a11y.clicked = true;
  };
  const handlePointerUp = () => {
    preventFocusHandler = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  const onVisibilityChange = e => {
    visibilityChangedTimestamp = new Date().getTime();
  };
  const handleFocus = e => {
    if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus) return;
    if (new Date().getTime() - visibilityChangedTimestamp < 100) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(swiper.getSlideIndexWhenGrid(parseInt(slideEl.getAttribute('data-swiper-slide-index'))), 0);
      } else {
        swiper.slideTo(swiper.getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0);
      }
      preventFocusHandler = false;
    });
  };
  const initSlides = () => {
    const params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    const slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach((slideEl, index) => {
        const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
        const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  const init = () => {
    const params = swiper.params.a11y;
    swiper.el.append(liveRegion);

    // Container
    const containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }
    if (params.containerRole) {
      addElRole(containerEl, params.containerRole);
    }

    // Wrapper
    const wrapperEl = swiper.wrapperEl;
    const wrapperId = params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`;
    addElId(wrapperEl, wrapperId);
    if (params.wrapperLiveRegion) {
      const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
      addElLive(wrapperEl, live);
    }

    // Slide
    initSlides();

    // Navigation
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(prevEl);
    if (nextEl) {
      nextEl.forEach(el => initNavEl(el, wrapperId, params.nextSlideMessage));
    }
    if (prevEl) {
      prevEl.forEach(el => initNavEl(el, wrapperId, params.prevSlideMessage));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.addEventListener('visibilitychange', onVisibilityChange);
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion) liveRegion.remove();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(prevEl);
    if (nextEl) {
      nextEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }
    if (prevEl) {
      prevEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    // Tab focus
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('focus', handleFocus, true);
      swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
      swiper.el.removeEventListener('pointerup', handlePointerUp, true);
    }
  }
  on('beforeInit', () => {
    liveRegion = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.c)('span', swiper.params.a11y.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
  });
  on('afterInit', () => {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/autoplay.mjs"
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/autoplay.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autoplay)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayTimeLeft;
  let autoplayStartTime = new Date().getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.find(slideEl => slideEl.classList.contains('swiper-slide-active'));
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
    return currentSlideDelay;
  };
  const getTotalDelay = () => {
    let totalDelay = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0) {
      totalDelay = currentSlideDelay;
    }
    return totalDelay;
  };
  const run = delayForce => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = delayForce;
    if (typeof delay === 'undefined') {
      delay = getTotalDelay();
      autoplayDelayTotal = delay;
      autoplayDelayCurrent = delay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };
  const start = () => {
    autoplayStartTime = new Date().getTime();
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit('autoplayStop');
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit('autoplayPause');
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };
  const onPointerEnter = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('pointerenter', onPointerEnter);
      swiper.el.removeEventListener('pointerleave', onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.addEventListener('visibilitychange', onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on('_freeModeStaticRelease', () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on('_freeModeNoMomentumRelease', () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on('touchEnd', () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on('slideChange', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      autoplayTimeLeft = getTotalDelay();
      autoplayDelayTotal = getTotalDelay();
    }
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/controller.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/controller.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
function Controller({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  swiper.controller = {
    control: undefined
  };
  function LinearSpline(x, y) {
    const binarySearch = function search() {
      let maxIndex;
      let minIndex;
      let guess;
      return (array, val) => {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    let i1;
    let i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t, byController) {
    const controlled = swiper.controller.control;
    let multiplier;
    let controlledTranslate;
    const Swiper = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;

      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }
      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    const Swiper = swiper.constructor;
    const controlled = swiper.controller.control;
    let i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.n)(() => {
            c.updateAutoHeight();
          });
        }
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(c.wrapperEl, () => {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', () => {
    if (typeof window !== 'undefined' && (
    // eslint-disable-line
    typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
      const controlElements = typeof swiper.params.controller.control === 'string' ? [...document.querySelectorAll(swiper.params.controller.control)] : [swiper.params.controller.control];
      controlElements.forEach(controlElement => {
        if (!swiper.controller.control) swiper.controller.control = [];
        if (controlElement && controlElement.swiper) {
          swiper.controller.control.push(controlElement.swiper);
        } else if (controlElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onControllerSwiper = e => {
            swiper.controller.control.push(e.detail[0]);
            swiper.update();
            controlElement.removeEventListener(eventName, onControllerSwiper);
          };
          controlElement.addEventListener(eventName, onControllerSwiper);
        }
      });
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', () => {
    removeSpline();
  });
  on('resize', () => {
    removeSpline();
  });
  on('observerUpdate', () => {
    removeSpline();
  });
  on('setTranslate', (_s, translate, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', (_s, duration, byController) => {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate,
    setTransition
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-cards.mjs"
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cards.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCards)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectCards({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  const setTranslate = () => {
    const {
      slides,
      activeIndex,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.cardsEffect;
    const {
      startTranslate,
      isTouched
    } = swiper.touchEventsData;
    const currentTranslate = rtl ? -swiper.translate : swiper.translate;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideProgress, -4), 4);
      let offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = `translateX(${swiper.minTranslate()}px)`;
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let tY = 0;
      const tZ = -100 * Math.abs(progress);
      let scale = 1;
      let rotate = -params.perSlideRotate * progress;
      let tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      const slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      const isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      const isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = `${(params.rotate || swiper.isHorizontal() ? -25 : 0) * subProgress * Math.abs(progress)}%`;
      }
      if (progress < 0) {
        // next
        tX = `calc(${tX}px ${rtl ? '-' : '+'} (${tXAdd * Math.abs(progress)}%))`;
      } else if (progress > 0) {
        // prev
        tX = `calc(${tX}px ${rtl ? '-' : '+'} (-${tXAdd * Math.abs(progress)}%))`;
      } else {
        tX = `${tX}px`;
      }
      if (!swiper.isHorizontal()) {
        const prevY = tY;
        tY = tX;
        tX = prevY;
      }
      const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;

      /* eslint-disable */
      const transform = `
        translate3d(${tX}, ${tY}, ${tZ}px)
        rotateZ(${params.rotate ? rtl ? -rotate : rotate : 0}deg)
        scale(${scaleString})
      `;
      /* eslint-enable */

      if (params.slideShadows) {
        // Set shadows
        let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl) {
          shadowEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('cards', slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'cards',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      _loopSwapReset: false,
      watchSlidesProgress: true,
      loopAdditionalSlides: swiper.params.cardsEffect.rotate ? 3 : 2,
      centeredSlides: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-coverflow.css"
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/effect-coverflow.css ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/effect-coverflow.mjs"
/*!**********************************************************!*\
  !*** ./node_modules/swiper/modules/effect-coverflow.mjs ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCoverflow)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");





function EffectCoverflow({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  const setTranslate = () => {
    const {
      width: swiperWidth,
      height: swiperHeight,
      slides,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.coverflowEffect;
    const isHorizontal = swiper.isHorizontal();
    const transform = swiper.translate;
    const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    const rotate = isHorizontal ? params.rotate : -params.rotate;
    const translate = params.depth;
    const r = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(swiper);
    // Each slide offset from center
    for (let i = 0, length = slides.length; i < length; i += 1) {
      const slideEl = slides[i];
      const slideSize = slidesSizesGrid[i];
      const slideOffset = slideEl.swiperSlideOffset;
      const centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      const offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
      let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      let translateZ = -translate * Math.abs(offsetMultiplier);
      let stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${r(rotateX)}deg) rotateY(${r(rotateY)}deg) scale(${scale})`;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        let shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
        let shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
        if (!shadowBeforeEl) {
          shadowBeforeEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('coverflow', slideEl, isHorizontal ? 'left' : 'top');
        }
        if (!shadowAfterEl) {
          shadowAfterEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('coverflow', slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'coverflow',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => true,
    overwriteParams: () => ({
      watchSlidesProgress: true
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-creative.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/swiper/modules/effect-creative.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCreative)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectCreative({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  const getTranslateValue = value => {
    if (typeof value === 'string') return value;
    return `${value}px`;
  };
  const setTranslate = () => {
    const {
      slides,
      wrapperEl,
      slidesSizesGrid
    } = swiper;
    const params = swiper.params.creativeEffect;
    const {
      progressMultiplier: multiplier
    } = params;
    const isCenteredSlides = swiper.params.centeredSlides;
    const rotateFix = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.a)(swiper);
    if (isCenteredSlides) {
      const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = `translateX(calc(50% - ${margin}px))`;
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      const slideProgress = slideEl.progress;
      const progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      let originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      const offset = slideEl.swiperSlideOffset;
      const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      const r = [0, 0, 0];
      let custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      let data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach((value, index) => {
        t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(progress * multiplier)}))`;
      });
      // set rotates
      r.forEach((value, index) => {
        let val = data.rotate[index] * Math.abs(progress * multiplier);
        r[index] = val;
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      const translateString = t.join(', ');
      const rotateString = `rotateX(${rotateFix(r[0])}deg) rotateY(${rotateFix(r[1])}deg) rotateZ(${rotateFix(r[2])}deg)`;
      const scaleString = originalProgress < 0 ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})` : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
      const opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`;

      // Set shadows
      if (custom && data.shadow || !custom) {
        let shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl && data.shadow) {
          shadowEl = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('creative', slideEl);
        }
        if (shadowEl) {
          const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'creative',
    swiper,
    on,
    setTranslate,
    setTransition,
    perspective: () => swiper.params.creativeEffect.perspective,
    overwriteParams: () => ({
      watchSlidesProgress: true,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-cube.css"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cube.css ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/effect-cube.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-cube.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectCube)
/* harmony export */ });
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function EffectCube({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  const createSlideShadows = (slideEl, progress, isHorizontal) => {
    let shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    let shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}`.split(' '));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', `swiper-slide-shadow-cube swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}`.split(' '));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    // create new ones
    const isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach(slideEl => {
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  const setTranslate = () => {
    const {
      el,
      wrapperEl,
      slides,
      width: swiperWidth,
      height: swiperHeight,
      rtlTranslate: rtl,
      size: swiperSize,
      browser
    } = swiper;
    const r = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.a)(swiper);
    const params = swiper.params.cubeEffect;
    const isHorizontal = swiper.isHorizontal();
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let wrapperRotate = 0;
    let cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.wrapperEl.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', 'swiper-cube-shadow');
          swiper.wrapperEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = `${swiperWidth}px`;
      } else {
        cubeShadowEl = el.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', 'swiper-cube-shadow');
          el.append(cubeShadowEl);
        }
      }
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
      }
      let slideAngle = slideIndex * 90;
      let round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      const progress = Math.max(Math.min(slideEl.progress, 1), -1);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      const transform = `rotateX(${r(isHorizontal ? 0 : -slideAngle)}deg) rotateY(${r(isHorizontal ? slideAngle : 0)}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = `50% 50% -${swiperSize / 2}px`;
    wrapperEl.style['-webkit-transform-origin'] = `50% 50% -${swiperSize / 2}px`;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${params.shadowScale})`;
      } else {
        const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        const multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        const scale1 = params.shadowScale;
        const scale2 = params.shadowScale / multiplier;
        const offset = params.shadowOffset;
        cubeShadowEl.style.transform = `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${-swiperHeight / 2 / scale2}px) rotateX(-89.99deg)`;
      }
    }
    const zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = `translate3d(0px,0,${zFactor}px) rotateX(${r(swiper.isHorizontal() ? 0 : wrapperRotate)}deg) rotateY(${r(swiper.isHorizontal() ? -wrapperRotate : 0)}deg)`;
    wrapperEl.style.setProperty('--swiper-cube-translate-z', `${zFactor}px`);
  };
  const setTransition = duration => {
    const {
      el,
      slides
    } = swiper;
    slides.forEach(slideEl => {
      slideEl.style.transitionDuration = `${duration}ms`;
      slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(subEl => {
        subEl.style.transitionDuration = `${duration}ms`;
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      const shadowEl = el.querySelector('.swiper-cube-shadow');
      if (shadowEl) shadowEl.style.transitionDuration = `${duration}ms`;
    }
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__.e)({
    effect: 'cube',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.cubeEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      resistanceRatio: 0,
      spaceBetween: 0,
      centeredSlides: false,
      virtualTranslate: true
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-fade.css"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade.css ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/effect-fade.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-fade.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFade)
/* harmony export */ });
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");





function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_3__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_2__.e)({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_0__.e)({
    effect: 'fade',
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/effect-flip.css"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-flip.css ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/effect-flip.mjs"
/*!*****************************************************!*\
  !*** ./node_modules/swiper/modules/effect-flip.mjs ***!
  \*****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EffectFlip)
/* harmony export */ });
/* harmony import */ var _shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-shadow.mjs */ "./node_modules/swiper/shared/create-shadow.mjs");
/* harmony import */ var _shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/effect-init.mjs */ "./node_modules/swiper/shared/effect-init.mjs");
/* harmony import */ var _shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/effect-target.mjs */ "./node_modules/swiper/shared/effect-target.mjs");
/* harmony import */ var _shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/effect-virtual-transition-end.mjs */ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");






function EffectFlip({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  const createSlideShadows = (slideEl, progress) => {
    let shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    let shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('flip', slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = (0,_shared_create_shadow_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('flip', slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  const recreateShadows = () => {
    // Set shadows
    swiper.params.flipEffect;
    swiper.slides.forEach(slideEl => {
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress);
    });
  };
  const setTranslate = () => {
    const {
      slides,
      rtlTranslate: rtl
    } = swiper;
    const params = swiper.params.flipEffect;
    const rotateFix = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.a)(swiper);
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = slides[i];
      let progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      const offset = slideEl.swiperSlideOffset;
      const rotate = -180 * progress;
      let rotateY = rotate;
      let rotateX = 0;
      let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress);
      }
      const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateFix(rotateX)}deg) rotateY(${rotateFix(rotateY)}deg)`;
      const targetEl = (0,_shared_effect_target_mjs__WEBPACK_IMPORTED_MODULE_2__.e)(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_4__.g)(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => {
        shadowEl.style.transitionDuration = `${duration}ms`;
      });
    });
    (0,_shared_effect_virtual_transition_end_mjs__WEBPACK_IMPORTED_MODULE_3__.e)({
      swiper,
      duration,
      transformElements
    });
  };
  (0,_shared_effect_init_mjs__WEBPACK_IMPORTED_MODULE_1__.e)({
    effect: 'flip',
    swiper,
    on,
    setTranslate,
    setTransition,
    recreateShadows,
    getEffectParams: () => swiper.params.flipEffect,
    perspective: () => true,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/free-mode.mjs"
/*!***************************************************!*\
  !*** ./node_modules/swiper/modules/free-mode.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ freeMode)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function freeMode({
  swiper,
  extendParams,
  emit,
  once
}) {
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchStart() {
    if (swiper.params.cssMode) return;
    const translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }
  function onTouchMove() {
    if (swiper.params.cssMode) return;
    const {
      touchEventsData: data,
      touches
    } = swiper;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)()
    });
  }
  function onTouchEnd({
    currentPos
  }) {
    if (swiper.params.cssMode) return;
    const {
      params,
      wrapperEl,
      rtlTranslate: rtl,
      snapGrid,
      touchEventsData: data
    } = swiper;
    // Time diff
    const touchEndTime = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        const lastMoveEvent = data.velocities.pop();
        const velocityEvent = data.velocities.pop();
        const distance = lastMoveEvent.position - velocityEvent.position;
        const time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.h)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      let momentumDuration = 1000 * params.freeMode.momentumRatio;
      const momentumDistance = swiper.velocity * momentumDuration;
      let newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      let doBounce = false;
      let afterBouncePosition;
      const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      let needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        let nextSlide;
        for (let j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', () => {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(() => {
            swiper.setTranslate(afterBouncePosition);
            (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(wrapperEl, () => {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      emit('_freeModeStaticRelease');
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    }
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/grid.mjs"
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/grid.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Grid)
/* harmony export */ });
function Grid({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;
  let wasMultiRow;
  const getSpaceBetween = () => {
    let spaceBetween = swiper.params.spaceBetween;
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
    } else if (typeof spaceBetween === 'string') {
      spaceBetween = parseFloat(spaceBetween);
    }
    return spaceBetween;
  };
  const initSlides = slides => {
    const {
      slidesPerView
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
    slidesPerRow = slidesNumberEvenToRows / rows;
  };
  const unsetSlides = () => {
    if (swiper.slides) {
      swiper.slides.forEach(slide => {
        if (slide.swiperSlideGridSet) {
          slide.style.height = '';
          slide.style[swiper.getDirectionLabel('margin-top')] = '';
        }
      });
    }
  };
  const updateSlide = (i, slide, slides) => {
    const {
      slidesPerGroup
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows,
      fill
    } = swiper.params.grid;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : slides.length;
    // Set slides order
    let newSlideOrderIndex;
    let column;
    let row;
    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.style.order = newSlideOrderIndex;
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.row = row;
    slide.column = column;
    slide.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
    slide.style[swiper.getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && `${spaceBetween}px` : '';
    slide.swiperSlideGridSet = true;
  };
  const updateWrapperSize = (slideSize, snapGrid) => {
    const {
      centeredSlides,
      roundLengths
    } = swiper.params;
    const spaceBetween = getSpaceBetween();
    const {
      rows
    } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style[swiper.getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push(...newSlidesGrid);
    }
  };
  const onInit = () => {
    wasMultiRow = swiper.params.grid && swiper.params.grid.rows > 1;
  };
  const onUpdate = () => {
    const {
      params,
      el
    } = swiper;
    const isMultiRow = params.grid && params.grid.rows > 1;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      numFullColumns = 1;
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (params.grid.fill === 'column') {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    wasMultiRow = isMultiRow;
  };
  on('init', onInit);
  on('update', onUpdate);
  swiper.grid = {
    initSlides,
    unsetSlides,
    updateSlide,
    updateWrapperSize
  };
}




/***/ },

/***/ "./node_modules/swiper/modules/hash-navigation.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/swiper/modules/hash-navigation.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HashNavigation)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function HashNavigation({
  swiper,
  extendParams,
  emit,
  on
}) {
  let initialized = false;
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex(_s, hash) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          const slideWithHash = swiper.slides.find(slideEl => slideEl.getAttribute('data-hash') === hash);
          if (!slideWithHash) return 0;
          const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
          return index;
        }
        return swiper.getSlideIndex((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0]);
      }
    }
  });
  const onHashChange = () => {
    emit('hashChange');
    const newHash = document.location.hash.replace('#', '');
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      const newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
      if (typeof newIndex === 'undefined' || Number.isNaN(newIndex)) return;
      swiper.slideTo(newIndex);
    }
  };
  const setHash = () => {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;
    const activeSlideEl = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`) : swiper.slides[swiper.activeIndex];
    const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, `#${activeSlideHash}` || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  const init = () => {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    const hash = document.location.hash.replace('#', '');
    if (hash) {
      const speed = 0;
      const index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (swiper.params.hashNavigation.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  const destroy = () => {
    if (swiper.params.hashNavigation.watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };
  on('init', () => {
    if (swiper.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/history.mjs"
/*!*************************************************!*\
  !*** ./node_modules/swiper/modules/history.mjs ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ History)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


function History({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });
  let initialized = false;
  let paths = {};
  const slugify = text => {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };
  const getPathValues = urlOverride => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    let location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    const pathArray = location.pathname.slice(1).split('/').filter(part => part !== '');
    const total = pathArray.length;
    const key = pathArray[total - 2];
    const value = pathArray[total - 1];
    return {
      key,
      value
    };
  };
  const setHistory = (key, index) => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!initialized || !swiper.params.history.enabled) return;
    let location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    const slide = swiper.virtual && swiper.params.virtual.enabled ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`) : swiper.slides[index];
    let value = slugify(slide.getAttribute('data-history'));
    if (swiper.params.history.root.length > 0) {
      let root = swiper.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = `${root}/${key ? `${key}/` : ''}${value}`;
    } else if (!location.pathname.includes(key)) {
      value = `${key ? `${key}/` : ''}${value}`;
    }
    if (swiper.params.history.keepQuery) {
      value += location.search;
    }
    const currentState = window.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      window.history.replaceState({
        value
      }, null, value);
    } else {
      window.history.pushState({
        value
      }, null, value);
    }
  };
  const scrollToSlide = (speed, value, runCallbacks) => {
    if (value) {
      for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
        const slide = swiper.slides[i];
        const slideHistory = slugify(slide.getAttribute('data-history'));
        if (slideHistory === value) {
          const index = swiper.getSlideIndex(slide);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };
  const setHistoryPopState = () => {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };
  const init = () => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!swiper.params.history) return;
    if (!window.history || !window.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  const destroy = () => {
    const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
    if (!swiper.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };
  on('init', () => {
    if (swiper.params.history.enabled) {
      init();
    }
  });
  on('destroy', () => {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', () => {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on('slideChange', () => {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/index.mjs"
/*!***********************************************!*\
  !*** ./node_modules/swiper/modules/index.mjs ***!
  \***********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A11y: () => (/* reexport safe */ _a11y_mjs__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Autoplay: () => (/* reexport safe */ _autoplay_mjs__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   Controller: () => (/* reexport safe */ _controller_mjs__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   EffectCards: () => (/* reexport safe */ _effect_cards_mjs__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   EffectCoverflow: () => (/* reexport safe */ _effect_coverflow_mjs__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   EffectCreative: () => (/* reexport safe */ _effect_creative_mjs__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   EffectCube: () => (/* reexport safe */ _effect_cube_mjs__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   EffectFade: () => (/* reexport safe */ _effect_fade_mjs__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   EffectFlip: () => (/* reexport safe */ _effect_flip_mjs__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   FreeMode: () => (/* reexport safe */ _free_mode_mjs__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   Grid: () => (/* reexport safe */ _grid_mjs__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   HashNavigation: () => (/* reexport safe */ _hash_navigation_mjs__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   History: () => (/* reexport safe */ _history_mjs__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   Keyboard: () => (/* reexport safe */ _keyboard_mjs__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Manipulation: () => (/* reexport safe */ _manipulation_mjs__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   Mousewheel: () => (/* reexport safe */ _mousewheel_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Navigation: () => (/* reexport safe */ _navigation_mjs__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Pagination: () => (/* reexport safe */ _pagination_mjs__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   Parallax: () => (/* reexport safe */ _parallax_mjs__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Scrollbar: () => (/* reexport safe */ _scrollbar_mjs__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Thumbs: () => (/* reexport safe */ _thumbs_mjs__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   Virtual: () => (/* reexport safe */ _virtual_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Zoom: () => (/* reexport safe */ _zoom_mjs__WEBPACK_IMPORTED_MODULE_7__["default"])
/* harmony export */ });
/* harmony import */ var _virtual_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtual.mjs */ "./node_modules/swiper/modules/virtual.mjs");
/* harmony import */ var _keyboard_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard.mjs */ "./node_modules/swiper/modules/keyboard.mjs");
/* harmony import */ var _mousewheel_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mousewheel.mjs */ "./node_modules/swiper/modules/mousewheel.mjs");
/* harmony import */ var _navigation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigation.mjs */ "./node_modules/swiper/modules/navigation.mjs");
/* harmony import */ var _pagination_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagination.mjs */ "./node_modules/swiper/modules/pagination.mjs");
/* harmony import */ var _scrollbar_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scrollbar.mjs */ "./node_modules/swiper/modules/scrollbar.mjs");
/* harmony import */ var _parallax_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./parallax.mjs */ "./node_modules/swiper/modules/parallax.mjs");
/* harmony import */ var _zoom_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./zoom.mjs */ "./node_modules/swiper/modules/zoom.mjs");
/* harmony import */ var _controller_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controller.mjs */ "./node_modules/swiper/modules/controller.mjs");
/* harmony import */ var _a11y_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./a11y.mjs */ "./node_modules/swiper/modules/a11y.mjs");
/* harmony import */ var _history_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./history.mjs */ "./node_modules/swiper/modules/history.mjs");
/* harmony import */ var _hash_navigation_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hash-navigation.mjs */ "./node_modules/swiper/modules/hash-navigation.mjs");
/* harmony import */ var _autoplay_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./autoplay.mjs */ "./node_modules/swiper/modules/autoplay.mjs");
/* harmony import */ var _thumbs_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./thumbs.mjs */ "./node_modules/swiper/modules/thumbs.mjs");
/* harmony import */ var _free_mode_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./free-mode.mjs */ "./node_modules/swiper/modules/free-mode.mjs");
/* harmony import */ var _grid_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./grid.mjs */ "./node_modules/swiper/modules/grid.mjs");
/* harmony import */ var _manipulation_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./manipulation.mjs */ "./node_modules/swiper/modules/manipulation.mjs");
/* harmony import */ var _effect_fade_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./effect-fade.mjs */ "./node_modules/swiper/modules/effect-fade.mjs");
/* harmony import */ var _effect_cube_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./effect-cube.mjs */ "./node_modules/swiper/modules/effect-cube.mjs");
/* harmony import */ var _effect_flip_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./effect-flip.mjs */ "./node_modules/swiper/modules/effect-flip.mjs");
/* harmony import */ var _effect_coverflow_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./effect-coverflow.mjs */ "./node_modules/swiper/modules/effect-coverflow.mjs");
/* harmony import */ var _effect_creative_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./effect-creative.mjs */ "./node_modules/swiper/modules/effect-creative.mjs");
/* harmony import */ var _effect_cards_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./effect-cards.mjs */ "./node_modules/swiper/modules/effect-cards.mjs");
























/***/ },

/***/ "./node_modules/swiper/modules/keyboard.mjs"
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/keyboard.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



/* eslint-disable consistent-return */
function Keyboard({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true,
      speed: undefined
    }
  });
  function handle(event) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtl
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea'))) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
        return undefined;
      }
      const el = swiper.el;
      const swiperWidth = el.clientWidth;
      const swiperHeight = el.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    const speed = swiper.params.keyboard.speed;
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext(speed);
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev(speed);
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext(speed);
      if (isPageUp || isArrowUp) swiper.slidePrev(speed);
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }
  on('init', () => {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable,
    disable
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/manipulation.mjs"
/*!******************************************************!*\
  !*** ./node_modules/swiper/modules/manipulation.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Manipulation)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function appendSlide(slides) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  const appendElement = slideEl => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, slideEl);
      slidesEl.append(tempDOM.children[0]);
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, '');
    } else {
      slidesEl.append(slideEl);
    }
  };
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}

function prependSlide(slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  if (params.loop) {
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndex + 1;
  const prependElement = slideEl => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, slideEl);
      slidesEl.prepend(tempDOM.children[0]);
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(tempDOM, '');
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) prependElement(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}

function addSlide(index, slides) {
  const swiper = this;
  const {
    params,
    activeIndex,
    slidesEl
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  const baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  const slidesBuffer = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = swiper.slides[i];
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) slidesEl.append(slides[i]);
    }
    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }
  for (let i = 0; i < slidesBuffer.length; i += 1) {
    slidesEl.append(slidesBuffer[i]);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeSlide(slidesIndexes) {
  const swiper = this;
  const {
    params,
    activeIndex
  } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndexBuffer;
  let indexToRemove;
  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

function removeAllSlides() {
  const swiper = this;
  const slidesIndexes = [];
  for (let i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}

function Manipulation({
  swiper
}) {
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper)
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/mousewheel.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/mousewheel.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mousewheel)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



/* eslint-disable consistent-return */
function Mousewheel({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: 'swiper-no-mousewheel'
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  let timeout;
  let lastScrollTime = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  let lastEventBeforeSnap;
  const recentWheelEvents = [];
  function normalize(e) {
    // Reasonable defaults
    const PIXEL_STEP = 10;
    const LINE_HEIGHT = 40;
    const PAGE_HEIGHT = 800;
    let sX = 0;
    let sY = 0; // spinX, spinY
    let pX = 0;
    let pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    }

    // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).
    if (newEvent.delta >= 6 && (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    }
    // If user is scrolling towards the end:
    //   If the slider hasn't hit the latest slide or
    //   if the slider is a loop and
    //   if the slider isn't moving right now:
    //     Go to next slide and
    //     emit a scroll event.
    // Else (the user is scrolling towards the beginning) and
    // if the slider hasn't hit the first slide or
    // if the slider is a loop and
    // if the slider isn't moving right now:
    //   Go to prev slide and
    //   emit a scroll event.
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    }
    // If you got here is because an animation has been triggered so store the current time
    lastScrollTime = new window.Date().getTime();
    // Return false as a default
    return false;
  }
  function releaseScroll(newEvent) {
    const params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }
    return false;
  }
  function handle(event) {
    let e = event;
    let disableParentSwiper = true;
    if (!swiper.enabled) return;

    // Ignore event if the target or its parents have the swiper-no-mousewheel class
    if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
    const params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    const targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    let delta = 0;
    const rtlFactor = swiper.rtlTranslate ? -1 : 1;
    const data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;

    // Get the scroll positions
    let positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

    // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      // Register the new event in a variable which stores the relevant data
      const newEvent = {
        time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event
      };

      // Keep the most recent events
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }

      const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
      recentWheelEvents.push(newEvent);

      // If there is at least one previous recorded event:
      //   If direction has changed or
      //   if the scroll is quicker than the previous one:
      //     Animate the slider.
      // Else (this is the first time the wheel is moved):
      //     Animate the slider.
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }

      // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:

      // If we recently snapped after a momentum scroll, then ignore wheel events
      // to give time for the deceleration to finish. Stop ignoring after 500 msecs
      // or if it's a new scroll (larger delta or inverse sign as last event before
      // an end-of-momentum snap).
      const newEvent = {
        time: (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;
        let position = swiper.getTranslate() + delta * params.sensitivity;
        const wasBeginning = swiper.isBeginning;
        const wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: newEvent.direction < 0 ? 'next' : 'prev',
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          // When wheel scrolling starts with sticky (aka snap) enabled, then detect
          // the end of a momentum scroll by storing recent (N=15?) wheel events.
          // 1. do all N events have decreasing or same (absolute value) delta?
          // 2. did all N events arrive in the last M (M=500?) msecs?
          // 3. does the earliest event have an (absolute value) delta that's
          //    at least P (P=1?) larger than the most recent event's delta?
          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
          // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
          // Snap immediately and ignore remaining wheel events in this scroll.
          // See comment above for "remaining wheel events in this scroll" determination.
          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
          clearTimeout(timeout);
          timeout = undefined;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }

          const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          const firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(newEvent);
          if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
            // We're at the end of the deceleration of a momentum scroll, so there's no need
            // to wait for more events. Snap ASAP on the next tick.
            // Also, because there's some remaining momentum we'll bias the snap in the
            // direction of the ongoing scroll because it's better UX for the scroll to snap
            // in the same direction as the scroll instead of reversing to snap.  Therefore,
            // if it's already scrolled more than 20% in the current direction, keep going.
            const snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = newEvent;
            recentWheelEvents.splice(0);
            timeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
              if (swiper.destroyed || !swiper.params) return;
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }

          if (!timeout) {
            // if we get here, then we haven't detected the end of a momentum scroll, so
            // we'll consider a scroll "complete" when there haven't been any wheel events
            // for 500ms.
            timeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
              if (swiper.destroyed || !swiper.params) return;
              const snapToThreshold = 0.5;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        }

        // Emit event
        if (!ignoreWheelEvents) emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplay.disableOnInteraction) swiper.autoplay.stop();
        // Return page scroll on edge positions
        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
          return true;
        }
      }
    }
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  }
  function events(method) {
    let targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]('mouseenter', handleMouseEnter);
    targetEl[method]('mouseleave', handleMouseLeave);
    targetEl[method]('wheel', handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events('addEventListener');
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events('removeEventListener');
    swiper.mousewheel.enabled = false;
    return true;
  }
  on('init', () => {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on('destroy', () => {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable,
    disable
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/navigation.css"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/navigation.css ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/navigation.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/navigation.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



const arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: true,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg
  };
  function getEl(el) {
    let res;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === 'string' && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    // if (Array.isArray(res) && res.length === 1) res = res[0];
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(el);
    el.forEach(subEl => {
      if (subEl) {
        subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
        if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update() {
    // Update Navigation Buttons
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const initButton = (el, dir) => {
      if (el) {
        if (params.addIcons && el.matches('.swiper-button-next,.swiper-button-prev') && !el.querySelector('svg')) {
          const tempEl = document.createElement('div');
          (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(tempEl, arrowSvg);
          el.appendChild(tempEl.querySelector('svg'));
          tempEl.remove();
        }
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(' '));
      }
    };
    nextEl.forEach(el => initButton(el, 'next'));
    prevEl.forEach(el => initButton(el, 'prev'));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(' '));
    };
    nextEl.forEach(el => destroyButton(el, 'next'));
    prevEl.forEach(el => destroyButton(el, 'prev'));
  }
  on('init', () => {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    if (swiper.enabled) {
      update();
      return;
    }
    [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.add(swiper.params.navigation.lockClass));
  });
  on('click', (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(nextEl);
    prevEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find(pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(' '));
    init();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(' '));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/pagination.css"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/pagination.css ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/swiper/modules/pagination.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/modules/pagination.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");




function Pagination({
  swiper,
  extendParams,
  on,
  emit
}) {
  const pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: number => number,
      formatFractionTotal: number => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl) return;
    bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function getMoveDirection(prevIndex, nextIndex, length) {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return 'next';
    } else if (nextIndex === prevIndex - 1) {
      return 'previous';
    }
    return;
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === 'next') {
        swiper.slideNext();
      } else if (moveDirection === 'previous') {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    // Current/Total
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.i)(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
        el.forEach(subEl => {
          subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(bulletEl => {
        const classesToRemove = [...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`)].map(s => typeof s === 'string' && s.includes(' ') ? s.split(' ') : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el.length > 1) {
        bullets.forEach(bullet => {
          const bulletIndex = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.j)(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(' '));
          } else if (swiper.isElement) {
            bullet.setAttribute('part', 'bullet');
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(' '));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
          }
          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(bullet => {
          bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === 'fraction') {
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.currentClass)).forEach(fractionEl => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.totalClass)).forEach(totalEl => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === 'progressbar') {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.progressbarFillClass)).forEach(progressEl => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === 'custom' && params.renderCustom) {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(subEl, params.renderCustom(swiper, current + 1, total));
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render() {
    // Render Container
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el = swiper.pagination.el;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          // prettier-ignore
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el.forEach(subEl => {
      if (params.type !== 'custom') {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.s)(subEl, paginationHTML || '');
      }
      if (params.type === 'bullets') {
        swiper.pagination.bullets.push(...subEl.querySelectorAll((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_0__.c)(params.bulletClass)));
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', el[0]);
    }
  }
  function init() {
    swiper.params.pagination = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_1__.c)(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        el = el.find(subEl => {
          if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.d)(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        });
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(...(params.clickableClass || '').split(' '));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || '').split(' '));
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
  }
  on('changeDirection', () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
    el.forEach(subEl => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', () => {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    update();
  });
  on('snapGridLengthChange', () => {
    render();
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass));
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.m)(el);
      el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/parallax.mjs"
/*!**************************************************!*\
  !*** ./node_modules/swiper/modules/parallax.mjs ***!
  \**************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parallax)
/* harmony export */ });
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function Parallax({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    parallax: {
      enabled: false
    }
  });
  const elementsSelector = '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]';
  const setTransform = (el, progress) => {
    const {
      rtl
    } = swiper;
    const rtlFactor = rtl ? -1 : 1;
    const p = el.getAttribute('data-swiper-parallax') || '0';
    let x = el.getAttribute('data-swiper-parallax-x');
    let y = el.getAttribute('data-swiper-parallax-y');
    const scale = el.getAttribute('data-swiper-parallax-scale');
    const opacity = el.getAttribute('data-swiper-parallax-opacity');
    const rotate = el.getAttribute('data-swiper-parallax-rotate');
    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }
    if (x.indexOf('%') >= 0) {
      x = `${parseInt(x, 10) * progress * rtlFactor}%`;
    } else {
      x = `${x * progress * rtlFactor}px`;
    }
    if (y.indexOf('%') >= 0) {
      y = `${parseInt(y, 10) * progress}%`;
    } else {
      y = `${y * progress}px`;
    }
    if (typeof opacity !== 'undefined' && opacity !== null) {
      const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      el.style.opacity = currentOpacity;
    }
    let transform = `translate3d(${x}, ${y}, 0px)`;
    if (typeof scale !== 'undefined' && scale !== null) {
      const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      transform += ` scale(${currentScale})`;
    }
    if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
      const currentRotate = rotate * progress * -1;
      transform += ` rotate(${currentRotate}deg)`;
    }
    el.style.transform = transform;
  };
  const setTranslate = () => {
    const {
      el,
      slides,
      progress,
      snapGrid,
      isElement
    } = swiper;
    const elements = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(el, elementsSelector);
    if (swiper.isElement) {
      elements.push(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(swiper.hostEl, elementsSelector));
    }
    elements.forEach(subEl => {
      setTransform(subEl, progress);
    });
    slides.forEach((slideEl, slideIndex) => {
      let slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl.querySelectorAll(`${elementsSelector}, [data-swiper-parallax-rotate]`).forEach(subEl => {
        setTransform(subEl, slideProgress);
      });
    });
  };
  const setTransition = (duration = swiper.params.speed) => {
    const {
      el,
      hostEl
    } = swiper;
    const elements = [...el.querySelectorAll(elementsSelector)];
    if (swiper.isElement) {
      elements.push(...hostEl.querySelectorAll(elementsSelector));
    }
    elements.forEach(parallaxEl => {
      let parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = `${parallaxDuration}ms`;
    });
  };
  on('beforeInit', () => {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', () => {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', (_swiper, duration) => {
    if (!swiper.params.parallax.enabled) return;
    setTransition(duration);
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/scrollbar.mjs"
/*!***************************************************!*\
  !*** ./node_modules/swiper/modules/scrollbar.mjs ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scrollbar)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");
/* harmony import */ var _shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/create-element-if-not-defined.mjs */ "./node_modules/swiper/shared/create-element-if-not-defined.mjs");
/* harmony import */ var _shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/classes-to-selector.mjs */ "./node_modules/swiper/shared/classes-to-selector.mjs");





function Scrollbar({
  swiper,
  extendParams,
  on,
  emit
}) {
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  let isTouched = false;
  let timeout = null;
  let dragTimeout = null;
  let dragStartPos;
  let dragSize;
  let trackSize;
  let divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: `swiper-scrollbar-horizontal`,
      verticalClass: `swiper-scrollbar-vertical`
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar,
      rtlTranslate: rtl
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    const params = swiper.params.scrollbar;
    const progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
    let newSize = dragSize;
    let newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
      dragEl.style.width = `${newSize}px`;
    } else {
      dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
      dragEl.style.height = `${newSize}px`;
    }
    if (params.hide) {
      clearTimeout(timeout);
      el.style.opacity = 1;
      timeout = setTimeout(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
  }
  function updateSize() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    const {
      scrollbar
    } = swiper;
    const {
      dragEl,
      el
    } = scrollbar;
    dragEl.style.width = '';
    dragEl.style.height = '';
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }
    if (swiper.isHorizontal()) {
      dragEl.style.width = `${dragSize}px`;
    } else {
      dragEl.style.height = `${dragSize}px`;
    }
    if (divider >= 1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
    if (swiper.params.scrollbar.hide) {
      el.style.opacity = 0;
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
    }
  }
  function getPointerPosition(e) {
    return swiper.isHorizontal() ? e.clientX : e.clientY;
  }
  function setDragPosition(e) {
    const {
      scrollbar,
      rtlTranslate: rtl
    } = swiper;
    const {
      el
    } = scrollbar;
    let positionRatio;
    positionRatio = (getPointerPosition(e) - (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    isTouched = true;
    dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
    e.preventDefault();
    e.stopPropagation();
    wrapperEl.style.transitionDuration = '100ms';
    dragEl.style.transitionDuration = '100ms';
    setDragPosition(e);
    clearTimeout(dragTimeout);
    el.style.transitionDuration = '0ms';
    if (params.hide) {
      el.style.opacity = 1;
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = 'none';
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el,
      dragEl
    } = scrollbar;
    if (!isTouched) return;
    if (e.preventDefault && e.cancelable) e.preventDefault();else e.returnValue = false;
    setDragPosition(e);
    wrapperEl.style.transitionDuration = '0ms';
    el.style.transitionDuration = '0ms';
    dragEl.style.transitionDuration = '0ms';
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e) {
    const params = swiper.params.scrollbar;
    const {
      scrollbar,
      wrapperEl
    } = swiper;
    const {
      el
    } = scrollbar;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = '';
      wrapperEl.style.transitionDuration = '';
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    const {
      scrollbar,
      params
    } = swiper;
    const el = scrollbar.el;
    if (!el) return;
    const target = el;
    const activeListener = params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    const passiveListener = params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    target[eventMethod]('pointerdown', onDragStart, activeListener);
    document[eventMethod]('pointermove', onDragMove, activeListener);
    document[eventMethod]('pointerup', onDragEnd, passiveListener);
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('off');
  }
  function init() {
    const {
      scrollbar,
      el: swiperEl
    } = swiper;
    swiper.params.scrollbar = (0,_shared_create_element_if_not_defined_mjs__WEBPACK_IMPORTED_MODULE_2__.c)(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: 'swiper-scrollbar'
    });
    const params = swiper.params.scrollbar;
    if (!params.el) return;
    let el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = document.querySelectorAll(params.el);
      if (!el.length) return;
    } else if (!el) {
      el = params.el;
    }
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
      el = swiperEl.querySelector(params.el);
    }
    if (el.length > 0) el = el[0];
    el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    let dragEl;
    if (el) {
      dragEl = el.querySelector((0,_shared_classes_to_selector_mjs__WEBPACK_IMPORTED_MODULE_3__.c)(swiper.params.scrollbar.dragClass));
      if (!dragEl) {
        dragEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.scrollbar.dragClass);
        el.append(dragEl);
      }
    }
    Object.assign(scrollbar, {
      el,
      dragEl
    });
    if (params.draggable) {
      enableDraggable();
    }
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.lockClass));
    }
  }
  function destroy() {
    const params = swiper.params.scrollbar;
    const el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass));
    }
    disableDraggable();
  }
  on('changeDirection', () => {
    if (!swiper.scrollbar || !swiper.scrollbar.el) return;
    const params = swiper.params.scrollbar;
    let {
      el
    } = swiper.scrollbar;
    el = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.m)(el);
    el.forEach(subEl => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', () => {
    if (swiper.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock changeDirection', () => {
    updateSize();
  });
  on('setTranslate', () => {
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    setTransition(duration);
  });
  on('enable disable', () => {
    const {
      el
    } = swiper.scrollbar;
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.lockClass));
    }
  });
  on('destroy', () => {
    destroy();
  });
  const enable = () => {
    swiper.el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    init();
    updateSize();
    setTranslate();
  };
  const disable = () => {
    swiper.el.classList.add(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(...(0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.k)(swiper.params.scrollbar.scrollbarDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.scrollbar, {
    enable,
    disable,
    updateSize,
    setTranslate,
    init,
    destroy
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/thumbs.mjs"
/*!************************************************!*\
  !*** ./node_modules/swiper/modules/thumbs.mjs ***!
  \************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Thumb)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Thumb({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  let initialized = false;
  let swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function isVirtualEnabled() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return false;
    return thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled;
  }
  function onThumbClick() {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const clickedIndex = thumbsSwiper.clickedIndex;
    const clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    let slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init() {
    const {
      thumbs: thumbsParams
    } = swiper.params;
    if (initialized) return false;
    initialized = true;
    const SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      if (thumbsParams.swiper.destroyed) {
        initialized = false;
        return false;
      }
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if ((0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.p)(thumbsParams.swiper)) {
      const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    if (isVirtualEnabled()) {
      swiper.thumbs.swiper.on('virtualUpdate', () => {
        update(false, {
          autoScroll: false
        });
      });
    }
    return true;
  }
  function update(initial, p) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;

    // Activate thumbs
    let thumbsToActivate = 1;
    const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach(slideEl => slideEl.classList.remove(thumbActiveClass));
    if (thumbsSwiper.params.loop || isVirtualEnabled()) {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach(slideEl => {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (let i = 0; i < thumbsToActivate; i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + i]) {
          thumbsSwiper.slides[swiper.realIndex + i].classList.add(thumbActiveClass);
        }
      }
    }
    if (p?.autoScroll ?? true) {
      autoScroll(initial ? 0 : undefined);
    }
  }
  function autoScroll(slideSpeed) {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    const slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
    const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      const currentThumbsIndex = thumbsSwiper.activeIndex;
      let newThumbsIndex;
      let direction;
      if (thumbsSwiper.params.loop) {
        const newThumbsSlide = thumbsSwiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') === `${swiper.realIndex}`);
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) ;
        thumbsSwiper.slideTo(newThumbsIndex, slideSpeed);
      }
    }
  }
  on('beforeInit', () => {
    const {
      thumbs
    } = swiper.params;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
      const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
      const getThumbsElementAndInit = () => {
        const thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init();
          update(true);
        } else if (thumbsElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onThumbsSwiper = e => {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener(eventName, onThumbsSwiper);
            init();
            update(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener(eventName, onThumbsSwiper);
        }
        return thumbsElement;
      };
      const watchForThumbsToAppear = () => {
        if (swiper.destroyed) return;
        const thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init();
      update(true);
    }
  });
  on('slideChange update resize observerUpdate', () => {
    update();
  });
  on('setTransition', (_s, duration) => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', () => {
    const thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init,
    update
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/virtual.mjs"
/*!*************************************************!*\
  !*** ./node_modules/swiper/modules/virtual.mjs ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Virtual)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Virtual({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      slidesPerViewAutoSlideSize: 320,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  let cssModeTimeout;
  const document = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  const tempDOM = document.createElement('div');
  function renderSlide(slide, index) {
    const params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // eslint-disable-next-line
    let slideEl;
    if (params.renderSlide) {
      slideEl = params.renderSlide.call(swiper, slide, index);
      if (typeof slideEl === 'string') {
        (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(tempDOM, slideEl);
        slideEl = tempDOM.children[0];
      }
    } else if (swiper.isElement) {
      slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('swiper-slide');
    } else {
      slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.slideClass);
    }
    slideEl.setAttribute('data-swiper-slide-index', index);
    if (!params.renderSlide) {
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.s)(slideEl, slide);
    }
    if (params.cache) {
      swiper.virtual.cache[index] = slideEl;
    }
    return slideEl;
  }
  function update(force, beforeInit, forceActiveIndex) {
    const {
      slidesPerGroup,
      centeredSlides,
      slidesPerView,
      loop: isLoop,
      initialSlide
    } = swiper.params;
    if (beforeInit && !isLoop && initialSlide > 0) {
      return;
    }
    const {
      addSlidesBefore,
      addSlidesAfter,
      slidesPerViewAutoSlideSize
    } = swiper.params.virtual;
    const {
      from: previousFrom,
      to: previousTo,
      slides,
      slidesGrid: previousSlidesGrid,
      offset: previousOffset
    } = swiper.virtual;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }
    const activeIndex = typeof forceActiveIndex === 'undefined' ? swiper.activeIndex || 0 : forceActiveIndex;
    let offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
    let slidesPerViewNumeric;
    if (slidesPerView === 'auto') {
      if (slidesPerViewAutoSlideSize) {
        let swiperSize = swiper.size;
        if (!swiperSize) {
          swiperSize = swiper.isHorizontal() ? swiper.el.getBoundingClientRect().width : swiper.el.getBoundingClientRect().height;
        }
        slidesPerViewNumeric = Math.max(1, Math.ceil(swiperSize / slidesPerViewAutoSlideSize));
      } else {
        slidesPerViewNumeric = 1;
      }
    } else {
      slidesPerViewNumeric = slidesPerView;
    }
    let slidesAfter;
    let slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerViewNumeric / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerViewNumeric / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerViewNumeric + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerViewNumeric : slidesPerGroup) + addSlidesBefore;
    }
    let from = activeIndex - slidesBefore;
    let to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0];
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0];
    }
    Object.assign(swiper.virtual, {
      from,
      to,
      offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore,
      slidesAfter
    });
    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit('virtualUpdate');
    }
    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach(slideEl => {
          slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
        });
      }
      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset,
        from,
        to,
        slides: function getSlides() {
          const slidesToRender = [];
          for (let i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()
      });
      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    const prependIndexes = [];
    const appendIndexes = [];
    const getSlideIndex = index => {
      let slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        // eslint-disable-next-line
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };
    if (force) {
      swiper.slides.filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`)).forEach(slideEl => {
        slideEl.remove();
      });
    } else {
      for (let i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          const slideIndex = getSlideIndex(i);
          swiper.slides.filter(el => el.matches(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`)).forEach(slideEl => {
            slideEl.remove();
          });
        }
      }
    }
    const loopFrom = isLoop ? -slides.length : 0;
    const loopTo = isLoop ? slides.length * 2 : slides.length;
    for (let i = loopFrom; i < loopTo; i += 1) {
      if (i >= from && i <= to) {
        const slideIndex = getSlideIndex(i);
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(slideIndex);
        } else {
          if (i > previousTo) appendIndexes.push(slideIndex);
          if (i < previousFrom) prependIndexes.push(slideIndex);
        }
      }
    }
    appendIndexes.forEach(index => {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
        const index = prependIndexes[i];
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort((a, b) => b - a);
      prependIndexes.forEach(index => {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(slideEl => {
      slideEl.style[offsetProp] = `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`;
    });
    onRendered();
  }
  function appendSlide(slides) {
    if (typeof slides === 'object' && 'length' in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    const activeIndex = swiper.activeIndex;
    let newActiveIndex = activeIndex + 1;
    let numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      const cache = swiper.virtual.cache;
      const newCache = {};
      Object.keys(cache).forEach(cachedIndex => {
        const cachedEl = cache[cachedIndex];
        const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
        if (cachedElIndex) {
          cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    let activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
          // shift cache indexes
          Object.keys(swiper.virtual.cache).forEach(key => {
            if (key > slidesIndexes) {
              swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
              swiper.virtual.cache[key - 1].setAttribute('data-swiper-slide-index', key - 1);
              delete swiper.virtual.cache[key];
            }
          });
        }
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
        // shift cache indexes
        Object.keys(swiper.virtual.cache).forEach(key => {
          if (key > slidesIndexes) {
            swiper.virtual.cache[key - 1] = swiper.virtual.cache[key];
            swiper.virtual.cache[key - 1].setAttribute('data-swiper-slide-index', key - 1);
            delete swiper.virtual.cache[key];
          }
        });
      }
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', () => {
    if (!swiper.params.virtual.enabled) return;
    let domSlidesAssigned;
    if (typeof swiper.passedParams.virtual.slides === 'undefined') {
      const slides = [...swiper.slidesEl.children].filter(el => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
      if (slides && slides.length) {
        swiper.virtual.slides = [...slides];
        domSlidesAssigned = true;
        slides.forEach((slideEl, slideIndex) => {
          slideEl.setAttribute('data-swiper-slide-index', slideIndex);
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = swiper.params.virtual.slides;
    }
    swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    update(false, true);
  });
  on('setTranslate', () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(() => {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', () => {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode) {
      (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide,
    prependSlide,
    removeSlide,
    removeAllSlides,
    update
  });
}




/***/ },

/***/ "./node_modules/swiper/modules/zoom.mjs"
/*!**********************************************!*\
  !*** ./node_modules/swiper/modules/zoom.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Zoom)
/* harmony export */ });
/* harmony import */ var _shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



function Zoom({
  swiper,
  extendParams,
  on,
  emit
}) {
  const window = (0,_shared_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  extendParams({
    zoom: {
      enabled: false,
      limitToOriginalSize: false,
      maxRatio: 3,
      minRatio: 1,
      panOnMouseMove: false,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  });
  swiper.zoom = {
    enabled: false
  };
  let currentScale = 1;
  let isScaling = false;
  let isPanningWithMouse = false;
  let mousePanStart = {
    x: 0,
    y: 0
  };
  const mousePanSensitivity = -3; // Negative to invert pan direction
  let fakeGestureTouched;
  let fakeGestureMoved;
  const evCache = [];
  const gesture = {
    originX: 0,
    originY: 0,
    slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    imageEl: undefined,
    imageWrapEl: undefined,
    maxRatio: 3
  };
  const image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  const velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };
  let scale = 1;
  Object.defineProperty(swiper.zoom, 'scale', {
    get() {
      return scale;
    },
    set(value) {
      if (scale !== value) {
        const imageEl = gesture.imageEl;
        const slideEl = gesture.slideEl;
        emit('zoomChange', value, imageEl, slideEl);
      }
      scale = value;
    }
  });
  function getDistanceBetweenTouches() {
    if (evCache.length < 2) return 1;
    const x1 = evCache[0].pageX;
    const y1 = evCache[0].pageY;
    const x2 = evCache[1].pageX;
    const y2 = evCache[1].pageY;
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance;
  }
  function getMaxRatio() {
    const params = swiper.params.zoom;
    const maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    if (params.limitToOriginalSize && gesture.imageEl && gesture.imageEl.naturalWidth) {
      const imageMaxRatio = gesture.imageEl.naturalWidth / gesture.imageEl.offsetWidth;
      return Math.min(imageMaxRatio, maxRatio);
    }
    return maxRatio;
  }
  function getScaleOrigin() {
    if (evCache.length < 2) return {
      x: null,
      y: null
    };
    const box = gesture.imageEl.getBoundingClientRect();
    return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x - window.scrollX) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y - window.scrollY) / currentScale];
  }
  function getSlideSelector() {
    return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  }
  function eventWithinSlide(e) {
    const slideSelector = getSlideSelector();
    if (e.target.matches(slideSelector)) return true;
    if (swiper.slides.filter(slideEl => slideEl.contains(e.target)).length > 0) return true;
    return false;
  }
  function eventWithinZoomContainer(e) {
    const selector = `.${swiper.params.zoom.containerClass}`;
    if (e.target.matches(selector)) return true;
    if ([...swiper.hostEl.querySelectorAll(selector)].filter(containerEl => containerEl.contains(e.target)).length > 0) return true;
    return false;
  }

  // Events
  function onGestureStart(e) {
    if (e.pointerType === 'mouse') {
      evCache.splice(0, evCache.length);
    }
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    evCache.push(e);
    if (evCache.length < 2) {
      return;
    }
    fakeGestureTouched = true;
    gesture.scaleStart = getDistanceBetweenTouches();
    if (!gesture.slideEl) {
      gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
      if (!gesture.imageWrapEl) {
        gesture.imageEl = undefined;
        return;
      }
      gesture.maxRatio = getMaxRatio();
    }
    if (gesture.imageEl) {
      const [originX, originY] = getScaleOrigin();
      gesture.originX = originX;
      gesture.originY = originY;
      gesture.imageEl.style.transitionDuration = '0ms';
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    if (!eventWithinSlide(e)) return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache[pointerIndex] = e;
    if (evCache.length < 2) {
      return;
    }
    fakeGestureMoved = true;
    gesture.scaleMove = getDistanceBetweenTouches();
    if (!gesture.imageEl) {
      return;
    }
    zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
    }
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function onGestureEnd(e) {
    if (!eventWithinSlide(e)) return;
    if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
    const params = swiper.params.zoom;
    const zoom = swiper.zoom;
    const pointerIndex = evCache.findIndex(cachedEv => cachedEv.pointerId === e.pointerId);
    if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
    if (!fakeGestureTouched || !fakeGestureMoved) {
      return;
    }
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!gesture.imageEl) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale > 1 && gesture.slideEl) {
      gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    } else if (zoom.scale <= 1 && gesture.slideEl) {
      gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    }
    if (zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
      gesture.slideEl = undefined;
    }
  }
  let allowTouchMoveTimeout;
  function allowTouchMove() {
    swiper.touchEventsData.preventTouchMoveFromPointerMove = false;
  }
  function preventTouchMove() {
    clearTimeout(allowTouchMoveTimeout);
    swiper.touchEventsData.preventTouchMoveFromPointerMove = true;
    allowTouchMoveTimeout = setTimeout(() => {
      if (swiper.destroyed) return;
      allowTouchMove();
    });
  }
  function onTouchStart(e) {
    const device = swiper.device;
    if (!gesture.imageEl) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    const event = evCache.length > 0 ? evCache[0] : e;
    image.touchesStart.x = event.pageX;
    image.touchesStart.y = event.pageY;
  }
  function onTouchMove(e) {
    const isMouseEvent = e.pointerType === 'mouse';
    const isMousePan = isMouseEvent && swiper.params.zoom.panOnMouseMove;
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) {
      return;
    }
    const zoom = swiper.zoom;
    if (!gesture.imageEl) {
      return;
    }
    if (!image.isTouched || !gesture.slideEl) {
      if (isMousePan) onMouseMove(e);
      return;
    }
    if (isMousePan) {
      onMouseMove(e);
      return;
    }
    if (!image.isMoved) {
      image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      image.startX = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(gesture.imageWrapEl, 'x') || 0;
      image.startY = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(gesture.imageWrapEl, 'y') || 0;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      gesture.imageWrapEl.style.transitionDuration = '0ms';
    }
    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
    image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
    const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
    if (touchesDiff > 5) {
      swiper.allowClick = false;
    }
    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        allowTouchMove();
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    preventTouchMove();
    image.isMoved = true;
    const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
    const {
      originX,
      originY
    } = gesture;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
    }
    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
    }

    // Velocity
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTouchEnd() {
    const zoom = swiper.zoom;
    evCache.length = 0;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    let momentumDurationX = 300;
    let momentumDurationY = 300;
    const momentumDistanceX = velocity.x * momentumDurationX;
    const newPositionX = image.currentX + momentumDistanceX;
    const momentumDistanceY = velocity.y * momentumDurationY;
    const newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY;
    // Define if we need image drag
    const scaledWidth = image.width * zoom.scale;
    const scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
    gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
  }
  function onTransitionEnd() {
    const zoom = swiper.zoom;
    if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
      if (gesture.imageEl) {
        gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
      }
      if (gesture.imageWrapEl) {
        gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
      }
      gesture.slideEl.classList.remove(`${swiper.params.zoom.zoomedSlideClass}`);
      zoom.scale = 1;
      currentScale = 1;
      gesture.slideEl = undefined;
      gesture.imageEl = undefined;
      gesture.imageWrapEl = undefined;
      gesture.originX = 0;
      gesture.originY = 0;
    }
  }
  function onMouseMove(e) {
    // Only pan if zoomed in and mouse panning is enabled
    if (currentScale <= 1 || !gesture.imageWrapEl) return;
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
    const currentTransform = window.getComputedStyle(gesture.imageWrapEl).transform;
    const matrix = new window.DOMMatrix(currentTransform);
    if (!isPanningWithMouse) {
      isPanningWithMouse = true;
      mousePanStart.x = e.clientX;
      mousePanStart.y = e.clientY;
      image.startX = matrix.e;
      image.startY = matrix.f;
      image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      return;
    }
    const deltaX = (e.clientX - mousePanStart.x) * mousePanSensitivity;
    const deltaY = (e.clientY - mousePanStart.y) * mousePanSensitivity;
    const scaledWidth = image.width * currentScale;
    const scaledHeight = image.height * currentScale;
    const slideWidth = gesture.slideWidth;
    const slideHeight = gesture.slideHeight;
    const minX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
    const maxX = -minX;
    const minY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
    const maxY = -minY;
    const newX = Math.max(Math.min(image.startX + deltaX, maxX), minX);
    const newY = Math.max(Math.min(image.startY + deltaY, maxY), minY);
    gesture.imageWrapEl.style.transitionDuration = '0ms';
    gesture.imageWrapEl.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
    mousePanStart.x = e.clientX;
    mousePanStart.y = e.clientY;
    image.startX = newX;
    image.startY = newY;
    image.currentX = newX;
    image.currentY = newY;
  }
  function zoomIn(e) {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (e && e.target) {
        gesture.slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
      }
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    gesture.maxRatio = getMaxRatio();
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.touchAction = 'none';
    }
    gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
    let touchX;
    let touchY;
    let offsetX;
    let offsetY;
    let diffX;
    let diffY;
    let translateX;
    let translateY;
    let imageWidth;
    let imageHeight;
    let scaledWidth;
    let scaledHeight;
    let translateMinX;
    let translateMinY;
    let translateMaxX;
    let translateMaxY;
    let slideWidth;
    let slideHeight;
    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.pageX;
      touchY = e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }
    const prevScale = currentScale;
    const forceZoomRatio = typeof e === 'number' ? e : null;
    if (currentScale === 1 && forceZoomRatio) {
      touchX = undefined;
      touchY = undefined;
      image.touchesStart.x = undefined;
      image.touchesStart.y = undefined;
    }
    const maxRatio = getMaxRatio();
    zoom.scale = forceZoomRatio || maxRatio;
    currentScale = forceZoomRatio || maxRatio;
    if (e && !(currentScale === 1 && forceZoomRatio)) {
      slideWidth = gesture.slideEl.offsetWidth;
      slideHeight = gesture.slideEl.offsetHeight;
      offsetX = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(gesture.slideEl).left + window.scrollX;
      offsetY = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.f)(gesture.slideEl).top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
      imageHeight = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      if (prevScale > 0 && forceZoomRatio && typeof image.currentX === 'number' && typeof image.currentY === 'number') {
        translateX = image.currentX * zoom.scale / prevScale;
        translateY = image.currentY * zoom.scale / prevScale;
      } else {
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;
      }
      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }
      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    if (forceZoomRatio && zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
    }
    image.currentX = translateX;
    image.currentY = translateY;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
  }
  function zoomOut() {
    const zoom = swiper.zoom;
    const params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.slideEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0];
      } else {
        gesture.slideEl = swiper.slides[swiper.activeIndex];
      }
      let imageEl = gesture.slideEl.querySelector(`.${params.containerClass}`);
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0,_shared_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(gesture.imageEl, `.${params.containerClass}`)[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    gesture.maxRatio = getMaxRatio();
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = '';
      swiper.wrapperEl.style.touchAction = '';
    }
    zoom.scale = 1;
    currentScale = 1;
    image.currentX = undefined;
    image.currentY = undefined;
    image.touchesStart.x = undefined;
    image.touchesStart.y = undefined;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
    gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
    gesture.slideEl = undefined;
    gesture.originX = 0;
    gesture.originY = 0;
    if (swiper.params.zoom.panOnMouseMove) {
      mousePanStart = {
        x: 0,
        y: 0
      };
      if (isPanningWithMouse) {
        isPanningWithMouse = false;
        image.startX = 0;
        image.startY = 0;
      }
    }
  }

  // Toggle Zoom
  function zoomToggle(e) {
    const zoom = swiper.zoom;
    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }
  function getListeners() {
    const passiveListener = swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    const activeListenerWithCapture = swiper.params.passiveListeners ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener,
      activeListenerWithCapture
    };
  }

  // Attach/Detach Events
  function enable() {
    const zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();

    // Scale image
    swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
      swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  function disable() {
    const zoom = swiper.zoom;
    if (!zoom.enabled) return;
    zoom.enabled = false;
    const {
      passiveListener,
      activeListenerWithCapture
    } = getListeners();

    // Scale image
    swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(eventName => {
      swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  on('init', () => {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    disable();
  });
  on('touchStart', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', (_s, e) => {
    if (!swiper.zoom.enabled) return;
    onTouchEnd();
  });
  on('doubleTap', (_s, e) => {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', () => {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable,
    disable,
    in: zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}




/***/ },

/***/ "./node_modules/swiper/shared/classes-to-selector.mjs"
/*!************************************************************!*\
  !*** ./node_modules/swiper/shared/classes-to-selector.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ classesToSelector)
/* harmony export */ });
function classesToSelector(classes = '') {
  // Escape all CSS selector special characters
  return `.${classes.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
}




/***/ },

/***/ "./node_modules/swiper/shared/create-element-if-not-defined.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/shared/create-element-if-not-defined.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ createElementIfNotDefined)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('div', checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}




/***/ },

/***/ "./node_modules/swiper/shared/create-shadow.mjs"
/*!******************************************************!*\
  !*** ./node_modules/swiper/shared/create-shadow.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ createShadow)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function createShadow(suffix, slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}${suffix ? ` swiper-slide-shadow-${suffix}` : ''}`;
  const shadowContainer = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.g)(slideEl);
  let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(' ').join('.')}`);
  if (!shadowEl) {
    shadowEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.c)('div', shadowClass.split(' '));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}




/***/ },

/***/ "./node_modules/swiper/shared/effect-init.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/shared/effect-init.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectInit)
/* harmony export */ });
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on('beforeInit', () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate _virtualUpdated', () => {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      swiper.slides.forEach(slideEl => {
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => shadowEl.remove());
      });
      // create new one
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}




/***/ },

/***/ "./node_modules/swiper/shared/effect-target.mjs"
/*!******************************************************!*\
  !*** ./node_modules/swiper/shared/effect-target.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectTarget)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function effectTarget(effectParams, slideEl) {
  const transformEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.g)(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style['-webkit-backface-visibility'] = 'hidden';
  }
  return transformEl;
}




/***/ },

/***/ "./node_modules/swiper/shared/effect-virtual-transition-end.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/swiper/shared/effect-virtual-transition-end.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ effectVirtualTransitionEnd)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides
}) {
  const {
    activeIndex
  } = swiper;
  const getSlide = el => {
    if (!el.parentElement) {
      // assume shadow root
      const slide = swiper.slides.find(slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode);
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter(transformEl => {
        const el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach(el => {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.o)(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}




/***/ },

/***/ "./node_modules/swiper/shared/ssr-window.esm.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/swiper/shared/ssr-window.esm.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getWindow),
/* harmony export */   g: () => (/* binding */ getDocument)
/* harmony export */ });
/**
 * SSR Window 5.0.1
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2025, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: June 27, 2025
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}
function extend(target = {}, src = {}) {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ''
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
function getDocument() {
  const doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}




/***/ },

/***/ "./node_modules/swiper/shared/swiper-core.mjs"
/*!****************************************************!*\
  !*** ./node_modules/swiper/shared/swiper-core.mjs ***!
  \****************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Swiper),
/* harmony export */   d: () => (/* binding */ defaults)
/* harmony export */ });
/* harmony import */ var _ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");



let support;
function calcSupport() {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  return {
    smoothScroll: document.documentElement && document.documentElement.style && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support = getSupport();
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const platform = window.navigator.platform;
  const ua = userAgent || window.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === 'Win32';
  let macos = platform === 'MacIntel';

  // iPadOs 13 fix
  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  }

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }

  // Export object
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

let browser;
function calcBrowser() {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    const ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      const [major, minor] = ua.split('Version/')[1].split(' ')[0].split('.').map(num => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

function Resize({
  swiper,
  on,
  emit
}) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(entries => {
      animationFrame = window.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };
  on('init', () => {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const attach = (target, options = {}) => {
    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    const observer = new ObserverFunc(mutations => {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: swiper.isElement || (typeof options.childList === 'undefined' ? true : options).childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.d)(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    // Observe container
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });

    // Observe wrapper
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach(observer => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

/* eslint-disable no-underscore-dangle */

var eventsEmitter = {
  on(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    function onceHandler(...args) {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(eventHandler => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};

function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }

  // Subtract paddings
  width = width - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-left') || 0, 10) - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-right') || 0, 10);
  height = height - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-top') || 0, 10) - parseInt((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}

function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  const swiperSize = swiper.size - offsetBefore - offsetAfter;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;

  // reset margins
  slides.forEach(slideEl => {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-before', '');
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-after', '');
  }

  // set cssMode offsets
  if (params.cssMode) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-slides-offset-before', `${offsetBefore}px`);
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-slides-offset-after', `${offsetAfter}px`);
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }

  // Calc slides
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide = slides[i];
    if (slide) {
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide, slides);
      }
      if ((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(slide, 'display') === 'none') continue; // eslint-disable-line
    }

    if (isVirtual && params.slidesPerView === 'auto') {
      if (params.virtual.slidesPerViewAutoSlideSize) {
        slideSize = params.virtual.slidesPerViewAutoSlideSize;
      }
      if (slideSize && slide) {
        if (params.roundLengths) slideSize = Math.floor(slideSize);
        slide.style[swiper.getDirectionLabel('width')] = `${slideSize}px`;
      }
    } else if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slide.style[swiper.getDirectionLabel('width')] = ``;
      }
      const slideStyles = getComputedStyle(slide);
      const currentTransform = slide.style.transform;
      const currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(slide, 'width', true) : (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.i)(slide, 'height', true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slide) {
        slide.style[swiper.getDirectionLabel('width')] = `${slideSize}px`;
      }
    }
    if (slide) {
      slide.swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    // Check if snapToSlideEdge should be applied
    const isFractionalSlidesPerView = params.slidesPerView !== 'auto' && params.slidesPerView % 1 !== 0;
    const shouldSnapToSlideEdge = params.snapToSlideEdge && !params.loop && (params.slidesPerView === 'auto' || isFractionalSlidesPerView);

    // Calculate the last allowed snap index when snapToSlideEdge is enabled
    // This ensures minimum slides are visible at the end
    let lastAllowedSnapIndex = snapGrid.length;
    if (shouldSnapToSlideEdge) {
      let minVisibleSlides;
      if (params.slidesPerView === 'auto') {
        // For 'auto' mode, calculate how many slides fit based on actual sizes
        minVisibleSlides = 1;
        let accumulatedSize = 0;
        for (let i = slidesSizesGrid.length - 1; i >= 0; i -= 1) {
          accumulatedSize += slidesSizesGrid[i] + (i < slidesSizesGrid.length - 1 ? spaceBetween : 0);
          if (accumulatedSize <= swiperSize) {
            minVisibleSlides = slidesSizesGrid.length - i;
          } else {
            break;
          }
        }
      } else {
        minVisibleSlides = Math.floor(params.slidesPerView);
      }
      lastAllowedSnapIndex = Math.max(slidesLength - minVisibleSlides, 0);
    }
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (shouldSnapToSlideEdge) {
        // When snapToSlideEdge is enabled, only keep snaps up to lastAllowedSnapIndex
        if (i <= lastAllowedSnapIndex) {
          newSlidesGrid.push(slidesGridItem);
        }
      } else if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        // When snapToSlideEdge is disabled, keep snaps that fit within scrollable area
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      // Only add edge-aligned snap if snapToSlideEdge is not enabled
      if (!shouldSnapToSlideEdge) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : swiper.getDirectionLabel('marginRight');
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(slideEl => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map(snap => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (offsetBefore || 0) + (offsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.b)(wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit('slidesUpdated');
  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}

function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = index => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach(slide => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}

function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  // eslint-disable-next-line
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

function updateProgress(translate) {
  const swiper = this;
  if (typeof translate === 'undefined') {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

const toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = selector => {
    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.find(slideEl => slideEl.column === activeIndex);
      nextSlide = slides.find(slideEl => slideEl.column === activeIndex + 1);
      prevSlide = slides.find(slideEl => slideEl.column === activeIndex - 1);
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      // Next Slide
      nextSlide = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.r)(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }

      // Prev Slide
      prevSlide = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.t)(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach(slideEl => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}

const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        // init later
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl && !lazyEl.lazyPreloaderManaged) lazyEl.remove();
          }
        });
      }
    }
    // Skip removal if managed by React/Vue component
    if (lazyEl && !lazyEl.lazyPreloaderManaged) lazyEl.remove();
  }
};
const unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};
const preload = swiper => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};

function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = aIndex => {
    let realIndex = aIndex - swiper.virtual.slidesBefore;
    if (realIndex < 0) {
      realIndex = swiper.virtual.slides.length + realIndex;
    }
    if (realIndex >= swiper.virtual.slides.length) {
      realIndex -= swiper.virtual.slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;

  // Get real index
  let realIndex;
  if (swiper.virtual && params.virtual.enabled) {
    if (params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else {
      realIndex = activeIndex;
    }
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find(slideEl => slideEl.column === activeIndex);
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute('data-swiper-slide-index'), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute('data-swiper-slide-index');
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }
}

function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach(pathEl => {
      if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};

function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  let currentTranslate = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.l)(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

function setTranslate(translate, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

function minTranslate() {
  return -this.snapGrid[0];
}

function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.u)({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth'
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}

var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};

function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : '';
  }
  swiper.emit('setTransition', duration, byController);
}

function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && dir === 'reset') {
    swiper.emit(`slideResetTransition${step}`);
  } else if (runCallbacks && activeIndex !== previousIndex) {
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === 'next') {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}

function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'Start'
  });
}

function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'End'
  });
}

var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};

function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate = -snapGrid[snapIndex];
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);
  let direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset';

  // initial virtual
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  // Update Index
  if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.u)({
          swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth'
      });
    }
    return true;
  }
  const browser = getBrowser();
  const isSafari = browser.isSafari;
  if (isVirtual && !initial && isSafari && swiper.isElement) {
    swiper.virtual.update(false, false, slideIndex);
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}

function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides,
        slidesOffsetBefore,
        slidesOffsetAfter
      } = swiper.params;
      const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (bothDirections && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (bothDirections) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && bothDirections && swiper.params.slidesPerView !== 'auto' && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? 'prev' : 'next' : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? 'next' : 'prev';
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === 'next' ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === 'next' ? swiper.realIndex : undefined
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}

/* eslint no-unused-vars: "off" */
function slideNext(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'next'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slidePrev(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'prev'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map(val => normalize(val));
  const isFreeMode = params.freeMode && params.freeMode.enabled;
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && (params.cssMode || isFreeMode)) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideReset(speed, runCallbacks = true, internal) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideToClosest(speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      swiper.slideToLoop(realIndex);
    } else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex((0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};

function loopCreate(slideRealIndex, initial) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute('data-swiper-slide-index', index);
    });
  };
  const clearBlankSlides = () => {
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideBlankClass}`);
    slides.forEach(el => {
      el.remove();
    });
    if (slides.length > 0) {
      swiper.recalcSlides();
      swiper.updateSlides();
    }
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) {
    clearBlankSlides();
  }
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = amountOfSlides => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('swiper-slide', [params.slideBlankClass]) : (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else {
    initSlides();
  }
  const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
  swiper.loopFix({
    slideRealIndex,
    direction: bothDirections ? undefined : 'next',
    initial
  });
}

function loopFix({
  slideRealIndex,
  slideTo = true,
  direction,
  setTranslate,
  activeSlideIndex,
  initial,
  byController,
  byMousewheel
} = {}) {
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides,
    slidesOffsetBefore,
    slidesOffsetAfter,
    initialSlide
  } = params;
  const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo) {
      if (!bothDirections && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (bothDirections && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === 'auto') {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (bothDirections && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters');
  } else if (gridEnabled && params.grid.fill === 'row') {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.v)('Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`');
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
  let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(slides.find(el => el.classList.contains(params.slideActiveClass)));
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === 'next' || !direction;
  const isPrev = direction === 'prev' || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (bothDirections && typeof setTranslate === 'undefined' ? -slidesPerView / 2 + 0.5 : 0);
  // prepend last slides before start
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i = slides.length - 1; i >= 0; i -= 1) {
          if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
        }
        // slides.forEach((slide, slideIndex) => {
        //   if (slide.column === colIndexToPrepend) prependSlidesIndexes.push(slideIndex);
        // });
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    if (isInitialOverflow) {
      slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
    }
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide, slideIndex) => {
          if (slide.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (swiper.params.effect === 'cards' && slides.length < slidesPerView + loopedSlides * 2) {
    if (appendSlidesIndexes.includes(activeSlideIndex)) {
      appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
    if (prependSlidesIndexes.includes(activeSlideIndex)) {
      prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach(c => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
      });
    }
  }
  swiper.emit('loopFix');
}

function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach(slideEl => {
    const index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach(slideEl => {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach(slideEl => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}

var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};

function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)() || el === (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event, startX) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart(event) {
  const swiper = this;
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === 'pointerdown') {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === 'touchstart' && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === 'touchstart') {
    // don't proceed touch event
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === 'wrapper') {
    if (!(0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.w)(targetEl, swiper.wrapperEl)) return;
  }
  if ('which' in e && e.which === 3) return;
  if ('button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === 'mouse' || e.pointerType !== 'mouse' && !targetEl.matches(data.focusableElements))) {
    document.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}

function onTouchMove(event) {
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === 'pointermove') {
    if (data.touchId !== null) return; // return from pointer if we use touch
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === 'touchmove') {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
      return;
    } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
      return;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== 'mouse') {
    document.activeElement.blur();
  }
  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === 'touchmove' && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === 'next' && swiper.allowSlideNext || swiper.touchesDirection === 'prev' && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  let loopFixed;
  new Date().getTime();
  if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
      swiper.loopFix({
        direction: 'prev',
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === 'touchend' || e.type === 'touchcancel';
  if (!isTouchEvent) {
    if (data.touchId !== null) return; // return from pointer if we use touch
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(e.type)) {
    const proceed = ['pointercancel', 'contextmenu'].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }

  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  const touchEndTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  const timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.h)();
  (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.n)(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }

  // Find current slide
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment] !== 'undefined') {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}

function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = 'auto';
  }
}

const events = (swiper, method) => {
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const swiperMethod = method;
  if (!el || typeof el === 'string') return;

  // Touch Events
  document[domMethod]('touchstart', swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]('touchstart', swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]('pointerdown', swiper.onTouchStart, {
    passive: false
  });
  document[domMethod]('touchmove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('pointermove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('touchend', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerup', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointercancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('touchcancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerout', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerleave', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('contextmenu', swiper.onTouchEnd, {
    passive: true
  });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
  } else {
    swiper[swiperMethod]('observerUpdate', onResize, true);
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  events(swiper, 'on');
}
function detachEvents() {
  const swiper = this;
  events(swiper, 'off');
}
var events$1 = {
  attachEvents,
  detachEvents
};

const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();

  // Get breakpoint for window/container width and update parameters
  const breakpointsBase = params.breakpointsBase === 'window' || !params.breakpointsBase ? params.breakpointsBase : 'container';
  const breakpointContainer = ['window', 'container'].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
  const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
    if (typeof breakpointParams[prop] === 'undefined') return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit('breakpoint', breakpointParams);
}

function getBreakpoint(breakpoints, base = 'window', containerEl) {
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  let breakpoint = false;
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints).map(point => {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

var breakpoints = {
  setBreakpoint,
  getBreakpoint
};

function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach(item => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(classNames => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper;
  // prettier-ignore
  const suffixes = prepareClasses(['initialized', params.direction, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}

function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === 'string') return;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}

var classes = {
  addClasses,
  removeClasses
};

function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var checkOverflow$1 = {
  checkOverflow
};

var defaults = {
  init: true,
  direction: 'horizontal',
  oneWayMovement: false,
  swiperElementNodeName: 'SWIPER-CONTAINER',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: 'swiper',
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  snapToSlideEdge: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-blank',
  slideActiveClass: 'swiper-slide-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideFullyVisibleClass: 'swiper-slide-fully-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  wrapperClass: 'swiper-wrapper',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};

function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== 'object' || moduleParams === null) {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === 'navigation' && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (['pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(allModulesParams, obj);
  };
}

/* eslint no-param-reassign: "off" */
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params);
    if (el && !params.el) params.el = el;
    const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
    if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document.querySelectorAll(params.el).forEach(containerEl => {
        const newParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers;
    }

    // Swiper Instance
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach(mod => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });

    // Extend defaults with modules params
    const swiperParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, defaults, allModulesParams);

    // Extend defaults with passed params
    swiper.params = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, swiper.params);
    swiper.passedParams = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(eventName => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.j)(slides[0]);
    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.j)(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === index));
  }
  getSlideIndexWhenGrid(index) {
    if (this.grid && this.params.grid && this.params.grid.rows > 1) {
      if (this.params.grid.fill === 'column') {
        index = Math.floor(index / this.params.grid.rows);
      } else if (this.params.grid.fill === 'row') {
        index = index % Math.ceil(this.slides.length / this.params.grid.rows);
      }
    }
    return index;
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit('enable');
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit('disable');
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(' ').filter(className => {
      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit('_containerClasses', cls.join(' '));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return '';
    return slideEl.className.split(' ').filter(className => {
      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(' ');
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach(slideEl => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit('_slideClass', slideEl, classNames);
    });
    swiper.emit('_slideClasses', updates);
  }
  slidesPerViewDynamic(view = 'current', exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === 'number') return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit('update');
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach(slideEl => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });
    swiper.emit('changeDirection');
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
    swiper.rtl = direction === 'rtl';
    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'rtl';
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'ltr';
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;

    // Find el
    let el = element || swiper.params.el;
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        // Children needs to return slot items
        return res;
      }
      return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(el, getWrapperSelector())[0];
    };
    // Find Wrapper
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.c)('div', swiper.params.wrapperClass);
      el.append(wrapperEl);
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.e)(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'direction') === 'rtl',
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(el, 'direction') === 'rtl'),
      wrongRTL: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.q)(wrapperEl, 'display') === '-webkit-box'
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }

    // Slide To Initial Slide
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate(undefined, true);
    }

    // Attach events
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener('load', e => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);

    // Init Flag
    swiper.initialized = true;
    preload(swiper);

    // Emit
    swiper.emit('init');
    swiper.emit('afterInit');
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
      return null;
    }
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== 'string') {
        el.removeAttribute('style');
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute('style');
      }
      if (slides && slides.length) {
        slides.forEach(slideEl => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute('style');
          slideEl.removeAttribute('data-swiper-slide-index');
        });
      }
    }
    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(eventName => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== 'string') {
        swiper.el.swiper = null;
      }
      (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.y)(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.x)(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach(prototypeGroup => {
  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);




/***/ },

/***/ "./node_modules/swiper/shared/update-on-virtual-data.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/swiper/shared/update-on-virtual-data.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getChangedParams),
/* harmony export */   g: () => (/* binding */ getParams),
/* harmony export */   m: () => (/* binding */ mountSwiper),
/* harmony export */   u: () => (/* binding */ updateOnVirtualData)
/* harmony export */ });
/* harmony import */ var _update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./update-swiper.mjs */ "./node_modules/swiper/shared/update-swiper.mjs");
/* harmony import */ var _swiper_core_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swiper-core.mjs */ "./node_modules/swiper/shared/swiper-core.mjs");



function getParams(obj = {}, splitEvents = true) {
  const params = {
    on: {}
  };
  const events = {};
  const passedParams = {};
  (0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(params, _swiper_core_mjs__WEBPACK_IMPORTED_MODULE_1__.d);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = _update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.p.map(key => key.replace(/_/, ''));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach(key => {
    if (typeof obj[key] === 'undefined') return;
    if (allowedParams.indexOf(key) >= 0) {
      if ((0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.i)(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        (0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(params[key], obj[key]);
        (0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.e)(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      if (splitEvents) {
        events[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach(key => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events
  };
}

function mountSwiper({
  el,
  nextEl,
  prevEl,
  paginationEl,
  scrollbarEl,
  swiper
}, swiperParams) {
  if ((0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.n)(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if ((0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.a)(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if ((0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.b)(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}

function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
  const keys = [];
  if (!oldParams) return keys;
  const addKey = key => {
    if (keys.indexOf(key) < 0) keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join('') !== childrenKeys.join('')) addKey('children');
    if (oldChildren.length !== children.length) addKey('children');
  }
  const watchParams = _update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.p.filter(key => key[0] === '_').map(key => key.replace(/_/, ''));
  watchParams.forEach(key => {
    if (key in swiperParams && key in oldParams) {
      if ((0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.i)(swiperParams[key]) && (0,_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_0__.i)(oldParams[key])) {
        const newKeys = Object.keys(swiperParams[key]);
        const oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach(newKey => {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach(oldKey => {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    }
  });
  return keys;
}

const updateOnVirtualData = swiper => {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  swiper.emit('_virtualUpdated');
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};




/***/ },

/***/ "./node_modules/swiper/shared/update-swiper.mjs"
/*!******************************************************!*\
  !*** ./node_modules/swiper/shared/update-swiper.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ needsPagination),
/* harmony export */   b: () => (/* binding */ needsScrollbar),
/* harmony export */   c: () => (/* binding */ attrToProp),
/* harmony export */   d: () => (/* binding */ uniqueClasses),
/* harmony export */   e: () => (/* binding */ extend),
/* harmony export */   i: () => (/* binding */ isObject),
/* harmony export */   n: () => (/* binding */ needsNavigation),
/* harmony export */   p: () => (/* binding */ paramsList),
/* harmony export */   u: () => (/* binding */ updateSwiper),
/* harmony export */   w: () => (/* binding */ wrapperClass)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/swiper/shared/utils.mjs");


/* underscore in name -> watch for changes */
const paramsList = ['eventsPrefix', 'injectStyles', 'injectStylesUrls', 'modules', 'init', '_direction', 'oneWayMovement', 'swiperElementNodeName', 'touchEventsTarget', 'initialSlide', '_speed', 'cssMode', 'updateOnWindowResize', 'resizeObserver', 'nested', 'focusableElements', '_enabled', '_width', '_height', 'preventInteractionOnTransition', 'userAgent', 'url', '_edgeSwipeDetection', '_edgeSwipeThreshold', '_freeMode', '_autoHeight', 'setWrapperSize', 'virtualTranslate', '_effect', 'breakpoints', 'breakpointsBase', '_spaceBetween', '_slidesPerView', 'maxBackfaceHiddenSlides', '_grid', '_slidesPerGroup', '_slidesPerGroupSkip', '_slidesPerGroupAuto', '_centeredSlides', '_centeredSlidesBounds', '_slidesOffsetBefore', '_slidesOffsetAfter', 'normalizeSlideIndex', '_centerInsufficientSlides', '_snapToSlideEdge', '_watchOverflow', 'roundLengths', 'touchRatio', 'touchAngle', 'simulateTouch', '_shortSwipes', '_longSwipes', 'longSwipesRatio', 'longSwipesMs', '_followFinger', 'allowTouchMove', '_threshold', 'touchMoveStopPropagation', 'touchStartPreventDefault', 'touchStartForcePreventDefault', 'touchReleaseOnEdges', 'uniqueNavElements', '_resistance', '_resistanceRatio', '_watchSlidesProgress', '_grabCursor', 'preventClicks', 'preventClicksPropagation', '_slideToClickedSlide', '_loop', 'loopAdditionalSlides', 'loopAddBlankSlides', 'loopPreventsSliding', '_rewind', '_allowSlidePrev', '_allowSlideNext', '_swipeHandler', '_noSwiping', 'noSwipingClass', 'noSwipingSelector', 'passiveListeners', 'containerModifierClass', 'slideClass', 'slideActiveClass', 'slideVisibleClass', 'slideFullyVisibleClass', 'slideNextClass', 'slidePrevClass', 'slideBlankClass', 'wrapperClass', 'lazyPreloaderClass', 'lazyPreloadPrevNext', 'runCallbacksOnInit', 'observer', 'observeParents', 'observeSlideChildren',
// modules
'a11y', '_autoplay', '_controller', 'coverflowEffect', 'cubeEffect', 'fadeEffect', 'flipEffect', 'creativeEffect', 'cardsEffect', 'hashNavigation', 'history', 'keyboard', 'mousewheel', '_navigation', '_pagination', 'parallax', '_scrollbar', '_thumbs', 'virtual', 'zoom', 'control'];

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object' && !o.__swiper__;
}
function extend(target, src) {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];else extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === 'undefined' && typeof params.navigation.prevEl === 'undefined';
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === 'undefined';
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === 'undefined';
}
function uniqueClasses(classNames = '') {
  const classes = classNames.split(' ').map(c => c.trim()).filter(c => !!c);
  const unique = [];
  classes.forEach(c => {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}
function attrToProp(attrName = '') {
  return attrName.replace(/-[a-z]/g, l => l.toUpperCase().replace('-', ''));
}
function wrapperClass(className = '') {
  if (!className) return 'swiper-wrapper';
  if (!className.includes('swiper-wrapper')) return `swiper-wrapper ${className}`;
  return className;
}

function updateSwiper({
  swiper,
  slides,
  passedParams,
  changedParams,
  nextEl,
  prevEl,
  scrollbarEl,
  paginationEl
}) {
  const updateParams = changedParams.filter(key => key !== 'children' && key !== 'direction' && key !== 'wrapperClass');
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && !passedParams.thumbs.swiper.destroyed && currentParams.thumbs && (!currentParams.thumbs.swiper || currentParams.thumbs.swiper.destroyed)) {
    needThumbsInit = true;
  }
  if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes('pagination') && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes('scrollbar') && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes('navigation') && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = mod => {
    if (!swiper[mod]) return;
    swiper[mod].destroy();
    if (mod === 'navigation') {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = undefined;
      currentParams[mod].nextEl = undefined;
      swiper[mod].prevEl = undefined;
      swiper[mod].nextEl = undefined;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = undefined;
      swiper[mod].el = undefined;
    }
  };
  if (changedParams.includes('loop') && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach(key => {
    if (isObject(currentParams[key]) && isObject(passedParams[key])) {
      Object.assign(currentParams[key], passedParams[key]);
      if ((key === 'navigation' || key === 'pagination' || key === 'scrollbar') && 'enabled' in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === 'navigation' || key === 'pagination' || key === 'scrollbar')) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes('controller') && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes('children') && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  } else if (changedParams.includes('virtual') && virtual && currentParams.virtual.enabled) {
    if (slides) virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes('children') && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized) thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === 'string')) {
      paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');
      paginationEl.part.add('pagination');
      swiper.el.appendChild(paginationEl);
    }
    if (paginationEl) currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === 'string')) {
      scrollbarEl = document.createElement('div');
      scrollbarEl.classList.add('swiper-scrollbar');
      scrollbarEl.part.add('scrollbar');
      swiper.el.appendChild(scrollbarEl);
    }
    if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === 'string') {
        nextEl = document.createElement('div');
        nextEl.classList.add('swiper-button-next');
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(nextEl, swiper.navigation.arrowSvg);
        nextEl.part.add('button-next');
        swiper.el.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === 'string') {
        prevEl = document.createElement('div');
        prevEl.classList.add('swiper-button-prev');
        (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.s)(prevEl, swiper.navigation.arrowSvg);
        prevEl.part.add('button-prev');
        swiper.el.appendChild(prevEl);
      }
    }
    if (nextEl) currentParams.navigation.nextEl = nextEl;
    if (prevEl) currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes('direction')) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}




/***/ },

/***/ "./node_modules/swiper/shared/utils.mjs"
/*!**********************************************!*\
  !*** ./node_modules/swiper/shared/utils.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getRotateFix),
/* harmony export */   b: () => (/* binding */ setCSSProperty),
/* harmony export */   c: () => (/* binding */ createElement),
/* harmony export */   d: () => (/* binding */ elementParents),
/* harmony export */   e: () => (/* binding */ elementChildren),
/* harmony export */   f: () => (/* binding */ elementOffset),
/* harmony export */   g: () => (/* binding */ getSlideTransformEl),
/* harmony export */   h: () => (/* binding */ now),
/* harmony export */   i: () => (/* binding */ elementOuterSize),
/* harmony export */   j: () => (/* binding */ elementIndex),
/* harmony export */   k: () => (/* binding */ classesToTokens),
/* harmony export */   l: () => (/* binding */ getTranslate),
/* harmony export */   m: () => (/* binding */ makeElementsArray),
/* harmony export */   n: () => (/* binding */ nextTick),
/* harmony export */   o: () => (/* binding */ elementTransitionEnd),
/* harmony export */   p: () => (/* binding */ isObject),
/* harmony export */   q: () => (/* binding */ elementStyle),
/* harmony export */   r: () => (/* binding */ elementNextAll),
/* harmony export */   s: () => (/* binding */ setInnerHTML),
/* harmony export */   t: () => (/* binding */ elementPrevAll),
/* harmony export */   u: () => (/* binding */ animateCSSModeScroll),
/* harmony export */   v: () => (/* binding */ showWarning),
/* harmony export */   w: () => (/* binding */ elementIsChildOf),
/* harmony export */   x: () => (/* binding */ extend),
/* harmony export */   y: () => (/* binding */ deleteProps)
/* harmony export */ });
/* harmony import */ var _ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ssr-window.esm.mjs */ "./node_modules/swiper/shared/ssr-window.esm.mjs");


function classesToTokens(classes = '') {
  return classes.trim().split(' ').filter(c => !!c.trim());
}

function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach(key => {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle(el) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis = 'x') {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle(el);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }
  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend(...args) {
  const to = Object(args[0]);
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? 'next' : 'prev';
  const isOutOfBound = (current, target) => {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowRoot && slideEl.shadowRoot.querySelector('.swiper-slide-transform') || slideEl;
}
function elementChildren(element, selector = '') {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const children = [...element.children];
  if (window.HTMLSlotElement && element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter(el => el.matches(selector));
}
function elementIsChildOfSlot(el, slot) {
  // Breadth-first search through all parent's children and assigned elements
  const elementsQueue = [slot];
  while (elementsQueue.length > 0) {
    const elementToCheck = elementsQueue.shift();
    if (el === elementToCheck) {
      return true;
    }
    elementsQueue.push(...elementToCheck.children, ...(elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : []), ...(elementToCheck.assignedElements ? elementToCheck.assignedElements() : []));
  }
}
function elementIsChildOf(el, parent) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  let isChild = parent.contains(el);
  if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    isChild = children.includes(el);
    if (!isChild) {
      isChild = elementIsChildOfSlot(el, parent);
    }
  }
  return isChild;
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
    // err
  }
}
function createElement(tag, classes = []) {
  const el = document.createElement(tag);
  el.classList.add(...(Array.isArray(classes) ? classes : classesToTokens(classes)));
  return el;
}
function elementOffset(el) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  const document = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.g)();
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = el === window ? window.scrollY : el.scrollTop;
  const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return undefined;
}
function elementParents(el, selector) {
  const parents = []; // eslint-disable-line
  let parent = el.parentElement; // eslint-disable-line
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener('transitionend', fireCallBack);
  }
  if (callback) {
    el.addEventListener('transitionend', fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window = (0,_ssr_window_esm_mjs__WEBPACK_IMPORTED_MODULE_0__.a)();
  if (includeMargins) {
    return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
  }
  return el.offsetWidth;
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter(e => !!e);
}
function getRotateFix(swiper) {
  return v => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 0.001;
    }
    return v;
  };
}
function setInnerHTML(el, html = '') {
  if (typeof trustedTypes !== 'undefined') {
    el.innerHTML = trustedTypes.createPolicy('html', {
      createHTML: s => s
    }).createHTML(html);
  } else {
    el.innerHTML = html;
  }
}




/***/ },

/***/ "./node_modules/swiper/swiper-react.mjs"
/*!**********************************************!*\
  !*** ./node_modules/swiper/swiper-react.mjs ***!
  \**********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Swiper: () => (/* binding */ Swiper),
/* harmony export */   SwiperSlide: () => (/* binding */ SwiperSlide),
/* harmony export */   useSwiper: () => (/* binding */ useSwiper),
/* harmony export */   useSwiperSlide: () => (/* binding */ useSwiperSlide)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _shared_swiper_core_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/swiper-core.mjs */ "./node_modules/swiper/shared/swiper-core.mjs");
/* harmony import */ var _shared_update_on_virtual_data_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/update-on-virtual-data.mjs */ "./node_modules/swiper/shared/update-on-virtual-data.mjs");
/* harmony import */ var _shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/update-swiper.mjs */ "./node_modules/swiper/shared/update-swiper.mjs");
/**
 * Swiper React 12.1.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2026 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 28, 2026
 */






function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function isChildSwiperSlide(child) {
  return child.type && child.type.displayName && child.type.displayName.includes('SwiperSlide');
}
function processChildren(c) {
  const slides = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(c).forEach(child => {
    if (isChildSwiperSlide(child)) {
      slides.push(child);
    } else if (child.props && child.props.children) {
      processChildren(child.props.children).forEach(slide => slides.push(slide));
    }
  });
  return slides;
}
function getChildren(c) {
  const slides = [];
  const slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': []
  };
  react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(c).forEach(child => {
    if (isChildSwiperSlide(child)) {
      slides.push(child);
    } else if (child.props && child.props.slot && slots[child.props.slot]) {
      slots[child.props.slot].push(child);
    } else if (child.props && child.props.children) {
      const foundSlides = processChildren(child.props.children);
      if (foundSlides.length > 0) {
        foundSlides.forEach(slide => slides.push(slide));
      } else {
        slots['container-end'].push(child);
      }
    } else {
      slots['container-end'].push(child);
    }
  });
  return {
    slides,
    slots
  };
}

function renderVirtual(swiper, slides, virtualData) {
  if (!virtualData) return null;
  const getSlideIndex = index => {
    let slideIndex = index;
    if (index < 0) {
      slideIndex = slides.length + index;
    } else if (slideIndex >= slides.length) {
      // eslint-disable-next-line
      slideIndex = slideIndex - slides.length;
    }
    return slideIndex;
  };
  const style = swiper.isHorizontal() ? {
    [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`
  } : {
    top: `${virtualData.offset}px`
  };
  const {
    from,
    to
  } = virtualData;
  const loopFrom = swiper.params.loop ? -slides.length : 0;
  const loopTo = swiper.params.loop ? slides.length * 2 : slides.length;
  const slidesToRender = [];
  for (let i = loopFrom; i < loopTo; i += 1) {
    if (i >= from && i <= to) {
      slidesToRender.push(slides[getSlideIndex(i)]);
    }
  }
  return slidesToRender.map((child, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
      swiper,
      style,
      key: child.props.virtualIndex || child.key || `slide-${index}`
    });
  });
}

function useIsomorphicLayoutEffect(callback, deps) {
  // eslint-disable-next-line
  if (typeof window === 'undefined') return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(callback, deps);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(callback, deps);
}

const SwiperSlideContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const useSwiperSlide = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SwiperSlideContext);
};
const SwiperContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const useSwiper = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SwiperContext);
};

const Swiper = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  className,
  tag: Tag = 'div',
  wrapperTag: WrapperTag = 'div',
  children,
  onSwiper,
  ...rest
} = {}, externalElRef) => {
  let eventsAssigned = false;
  const [containerClasses, setContainerClasses] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('swiper');
  const [virtualData, setVirtualData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [breakpointChanged, setBreakpointChanged] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const initializedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const swiperElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const swiperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const oldPassedParamsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const oldSlides = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const nextElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const prevElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const paginationElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const scrollbarElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    params: swiperParams,
    passedParams,
    rest: restProps,
    events
  } = (0,_shared_update_on_virtual_data_mjs__WEBPACK_IMPORTED_MODULE_2__.g)(rest);
  const {
    slides,
    slots
  } = getChildren(children);
  const onBeforeBreakpoint = () => {
    setBreakpointChanged(!breakpointChanged);
  };
  Object.assign(swiperParams.on, {
    _containerClasses(swiper, classes) {
      setContainerClasses(classes);
    }
  });
  const initSwiper = () => {
    // init swiper
    Object.assign(swiperParams.on, events);
    eventsAssigned = true;
    const passParams = {
      ...swiperParams
    };
    delete passParams.wrapperClass;
    swiperRef.current = new _shared_swiper_core_mjs__WEBPACK_IMPORTED_MODULE_1__.S(passParams);
    if (swiperRef.current.virtual && swiperRef.current.params.virtual.enabled) {
      swiperRef.current.virtual.slides = slides;
      const extendWith = {
        cache: false,
        slides,
        renderExternal: setVirtualData,
        renderExternalUpdate: false
      };
      (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.e)(swiperRef.current.params.virtual, extendWith);
      (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.e)(swiperRef.current.originalParams.virtual, extendWith);
    }
  };
  if (!swiperElRef.current) {
    initSwiper();
  }

  // Listen for breakpoints change
  if (swiperRef.current) {
    swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
  }
  const attachEvents = () => {
    if (eventsAssigned || !events || !swiperRef.current) return;
    Object.keys(events).forEach(eventName => {
      swiperRef.current.on(eventName, events[eventName]);
    });
  };
  const detachEvents = () => {
    if (!events || !swiperRef.current) return;
    Object.keys(events).forEach(eventName => {
      swiperRef.current.off(eventName, events[eventName]);
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      if (swiperRef.current) swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
    };
  });

  // set initialized flag
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!initializedRef.current && swiperRef.current) {
      swiperRef.current.emitSlidesClasses();
      initializedRef.current = true;
    }
  });

  // mount swiper
  useIsomorphicLayoutEffect(() => {
    if (externalElRef) {
      externalElRef.current = swiperElRef.current;
    }
    if (!swiperElRef.current) return;
    if (swiperRef.current.destroyed) {
      initSwiper();
    }
    (0,_shared_update_on_virtual_data_mjs__WEBPACK_IMPORTED_MODULE_2__.m)({
      el: swiperElRef.current,
      nextEl: nextElRef.current,
      prevEl: prevElRef.current,
      paginationEl: paginationElRef.current,
      scrollbarEl: scrollbarElRef.current,
      swiper: swiperRef.current
    }, swiperParams);
    if (onSwiper && !swiperRef.current.destroyed) onSwiper(swiperRef.current);
    // eslint-disable-next-line
    return () => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.destroy(true, false);
      }
    };
  }, []);

  // watch for params change
  useIsomorphicLayoutEffect(() => {
    attachEvents();
    const changedParams = (0,_shared_update_on_virtual_data_mjs__WEBPACK_IMPORTED_MODULE_2__.a)(passedParams, oldPassedParamsRef.current, slides, oldSlides.current, c => c.key);
    oldPassedParamsRef.current = passedParams;
    oldSlides.current = slides;
    if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
      (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.u)({
        swiper: swiperRef.current,
        slides,
        passedParams,
        changedParams,
        nextEl: nextElRef.current,
        prevEl: prevElRef.current,
        scrollbarEl: scrollbarElRef.current,
        paginationEl: paginationElRef.current
      });
    }
    return () => {
      detachEvents();
    };
  });

  // update on virtual update
  useIsomorphicLayoutEffect(() => {
    (0,_shared_update_on_virtual_data_mjs__WEBPACK_IMPORTED_MODULE_2__.u)(swiperRef.current);
  }, [virtualData]);

  // bypass swiper instance to slides
  function renderSlides() {
    if (swiperParams.virtual) {
      return renderVirtual(swiperRef.current, slides, virtualData);
    }
    return slides.map((child, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
        swiper: swiperRef.current,
        swiperSlideIndex: index
      });
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, _extends({
    ref: swiperElRef,
    className: (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.d)(`${containerClasses}${className ? ` ${className}` : ''}`)
  }, restProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SwiperContext.Provider, {
    value: swiperRef.current
  }, slots['container-start'], /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrapperTag, {
    className: (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.w)(swiperParams.wrapperClass)
  }, slots['wrapper-start'], renderSlides(), slots['wrapper-end']), (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.n)(swiperParams) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: prevElRef,
    className: "swiper-button-prev"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: nextElRef,
    className: "swiper-button-next"
  })), (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.b)(swiperParams) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: scrollbarElRef,
    className: "swiper-scrollbar"
  }), (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.a)(swiperParams) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: paginationElRef,
    className: "swiper-pagination"
  }), slots['container-end']));
});
Swiper.displayName = 'Swiper';

const SwiperSlide = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({
  tag: Tag = 'div',
  children,
  className = '',
  swiper,
  zoom,
  lazy,
  virtualIndex,
  swiperSlideIndex,
  ...rest
} = {}, externalRef) => {
  const slideElRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [slideClasses, setSlideClasses] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('swiper-slide');
  const [lazyLoaded, setLazyLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  function updateClasses(_s, el, classNames) {
    if (el === slideElRef.current) {
      setSlideClasses(classNames);
    }
  }
  useIsomorphicLayoutEffect(() => {
    if (typeof swiperSlideIndex !== 'undefined') {
      slideElRef.current.swiperSlideIndex = swiperSlideIndex;
    }
    if (externalRef) {
      externalRef.current = slideElRef.current;
    }
    if (!slideElRef.current || !swiper) {
      return;
    }
    if (swiper.destroyed) {
      if (slideClasses !== 'swiper-slide') {
        setSlideClasses('swiper-slide');
      }
      return;
    }
    swiper.on('_slideClass', updateClasses);
    // eslint-disable-next-line
    return () => {
      if (!swiper) return;
      swiper.off('_slideClass', updateClasses);
    };
  });
  useIsomorphicLayoutEffect(() => {
    if (swiper && slideElRef.current && !swiper.destroyed) {
      setSlideClasses(swiper.getSlideClasses(slideElRef.current));
    }
  }, [swiper]);
  const slideData = {
    isActive: slideClasses.indexOf('swiper-slide-active') >= 0,
    isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
    isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0,
    isNext: slideClasses.indexOf('swiper-slide-next') >= 0
  };
  const renderChildren = () => {
    return typeof children === 'function' ? children(slideData) : children;
  };
  const onLoad = () => {
    setLazyLoaded(true);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, _extends({
    ref: slideElRef,
    className: (0,_shared_update_swiper_mjs__WEBPACK_IMPORTED_MODULE_3__.d)(`${slideClasses}${className ? ` ${className}` : ''}`),
    "data-swiper-slide-index": virtualIndex,
    onLoad: onLoad
  }, rest), zoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SwiperSlideContext.Provider, {
    value: slideData
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "swiper-zoom-container",
    "data-swiper-zoom": typeof zoom === 'number' ? zoom : undefined
  }, renderChildren(), lazy && !lazyLoaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "swiper-lazy-preloader",
    ref: node => {
      if (node) node.lazyPreloaderManaged = true;
    }
  }))), !zoom && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SwiperSlideContext.Provider, {
    value: slideData
  }, renderChildren(), lazy && !lazyLoaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "swiper-lazy-preloader",
    ref: node => {
      if (node) node.lazyPreloaderManaged = true;
    }
  })));
});
SwiperSlide.displayName = 'SwiperSlide';




/***/ },

/***/ "./node_modules/swiper/swiper.css"
/*!****************************************!*\
  !*** ./node_modules/swiper/swiper.css ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/ContentArea/General.js"
/*!***********************************************!*\
  !*** ./src/components/ContentArea/General.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: "Content Area General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/ContentArea/Style.js"
/*!*********************************************!*\
  !*** ./src/components/ContentArea/Style.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Content Area Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/Excerpt/General.js"
/*!*******************************************!*\
  !*** ./src/components/Excerpt/General.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Excerpt General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/Excerpt/Style.js"
/*!*****************************************!*\
  !*** ./src/components/Excerpt/Style.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Excerpt Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/ImageSection/General.js"
/*!************************************************!*\
  !*** ./src/components/ImageSection/General.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: "Image General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/ImageSection/Style.js"
/*!**********************************************!*\
  !*** ./src/components/ImageSection/Style.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: "Image Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/Inspector/Inspector.js"
/*!***********************************************!*\
  !*** ./src/components/Inspector/Inspector.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_usePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/usePanel */ "./src/hooks/usePanel.js");
/* harmony import */ var _PostCarousel_General__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../PostCarousel/General */ "./src/components/PostCarousel/General.js");
/* harmony import */ var _PostCarousel_Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../PostCarousel/Slider */ "./src/components/PostCarousel/Slider.js");
/* harmony import */ var _QueryBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../QueryBuilder */ "./src/components/QueryBuilder/index.js");
/* harmony import */ var _NavigationArrow_General__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../NavigationArrow/General */ "./src/components/NavigationArrow/General.js");
/* harmony import */ var _NavigationArrow_Style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../NavigationArrow/Style */ "./src/components/NavigationArrow/Style.js");
/* harmony import */ var _Pagination_General__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Pagination/General */ "./src/components/Pagination/General.js");
/* harmony import */ var _Pagination_Style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Pagination/Style */ "./src/components/Pagination/Style.js");
/* harmony import */ var _ContentArea_General__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ContentArea/General */ "./src/components/ContentArea/General.js");
/* harmony import */ var _ContentArea_Style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ContentArea/Style */ "./src/components/ContentArea/Style.js");
/* harmony import */ var _ImageSection_General__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../ImageSection/General */ "./src/components/ImageSection/General.js");
/* harmony import */ var _ImageSection_Style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../ImageSection/Style */ "./src/components/ImageSection/Style.js");
/* harmony import */ var _TitleArea_General__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../TitleArea/General */ "./src/components/TitleArea/General.js");
/* harmony import */ var _TitleArea_Style__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../TitleArea/Style */ "./src/components/TitleArea/Style.js");
/* harmony import */ var _Taxonomy_General__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Taxonomy/General */ "./src/components/Taxonomy/General.js");
/* harmony import */ var _Taxonomy_Style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Taxonomy/Style */ "./src/components/Taxonomy/Style.js");
/* harmony import */ var _MetaData_General__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../MetaData/General */ "./src/components/MetaData/General.js");
/* harmony import */ var _MetaData_Style__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../MetaData/Style */ "./src/components/MetaData/Style.js");
/* harmony import */ var _ReadMore_General__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../ReadMore/General */ "./src/components/ReadMore/General.js");
/* harmony import */ var _ReadMore_Style__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../ReadMore/Style */ "./src/components/ReadMore/Style.js");
/* harmony import */ var _Excerpt_General__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../Excerpt/General */ "./src/components/Excerpt/General.js");
/* harmony import */ var _Excerpt_Style__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../Excerpt/Style */ "./src/components/Excerpt/Style.js");
/* harmony import */ var _SocialShare_General__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../SocialShare/General */ "./src/components/SocialShare/General.js");
/* harmony import */ var _SocialShare_Style__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../SocialShare/Style */ "./src/components/SocialShare/Style.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../common/CustomTabs/CustomTabs */ "./src/components/common/CustomTabs/CustomTabs.js");
/* harmony import */ var _common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../common/CustomToggle/CustomToggle */ "./src/components/common/CustomToggle/CustomToggle.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__);






























function Inspector({
  attributes,
  setAttributes
}) {
  const {
    openPanel,
    togglePanel
  } = (0,_hooks_usePanel__WEBPACK_IMPORTED_MODULE_2__.usePanel)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Post Carousel",
      opened: openPanel === "carousel",
      onToggle: () => togglePanel("carousel"),
      initialOpen: true,
      children: openPanel === "carousel" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
        GeneralTab: _PostCarousel_General__WEBPACK_IMPORTED_MODULE_3__["default"],
        SliderTab: _PostCarousel_Slider__WEBPACK_IMPORTED_MODULE_4__["default"],
        attributes: attributes,
        setAttributes: setAttributes,
        displayIcon: true,
        initialTab: "general"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Query Builder",
      opened: openPanel === "query",
      onToggle: () => togglePanel("query"),
      children: openPanel === "query" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_QueryBuilder__WEBPACK_IMPORTED_MODULE_5__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Navigation Arrow",
      opened: openPanel === "navigation",
      onToggle: () => togglePanel("navigation"),
      initialOpen: true,
      children: openPanel === "navigation" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
        GeneralTab: _NavigationArrow_General__WEBPACK_IMPORTED_MODULE_6__["default"],
        StyleTab: _NavigationArrow_Style__WEBPACK_IMPORTED_MODULE_7__["default"],
        attributes: attributes,
        setAttributes: setAttributes,
        displayIcon: true,
        initialTab: "general"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Pagination Dots",
      opened: openPanel === "pagination",
      onToggle: () => togglePanel("pagination"),
      initialOpen: true,
      children: openPanel === "pagination" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
        GeneralTab: _Pagination_General__WEBPACK_IMPORTED_MODULE_8__["default"],
        StyleTab: _Pagination_Style__WEBPACK_IMPORTED_MODULE_9__["default"],
        attributes: attributes,
        setAttributes: setAttributes,
        displayIcon: true,
        initialTab: "general"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Content Area",
      opened: openPanel === "content",
      onToggle: () => togglePanel("content"),
      initialOpen: true,
      children: openPanel === "content" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
        GeneralTab: _ContentArea_General__WEBPACK_IMPORTED_MODULE_10__["default"],
        StyleTab: _ContentArea_Style__WEBPACK_IMPORTED_MODULE_11__["default"],
        attributes: attributes,
        setAttributes: setAttributes,
        displayIcon: true,
        initialTab: "general"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Image and Video",
      opened: openPanel === "image",
      onToggle: () => togglePanel("image"),
      children: openPanel === "image" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Show Featured Image", "smart-post-carousel"),
          value: attributes.showFeaturedImage,
          attributesKey: "showFeaturedImage",
          setAttributes: setAttributes
        }), attributes.showFeaturedImage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _ImageSection_General__WEBPACK_IMPORTED_MODULE_12__["default"],
          StyleTab: _ImageSection_Style__WEBPACK_IMPORTED_MODULE_13__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Title",
      opened: openPanel === "title",
      onToggle: () => togglePanel("title"),
      children: openPanel === "title" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Show Title", "smart-post-carousel"),
          value: attributes.showTitle,
          attributesKey: "showTitle",
          setAttributes: setAttributes
        }), attributes.showTitle && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _TitleArea_General__WEBPACK_IMPORTED_MODULE_14__["default"],
          StyleTab: _TitleArea_Style__WEBPACK_IMPORTED_MODULE_15__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Taxonomy",
      opened: openPanel === "taxonomy",
      onToggle: () => togglePanel("taxonomy"),
      children: openPanel === "taxonomy" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Taxonomy", "smart-post-carousel"),
          value: attributes.showTaxonomy,
          attributesKey: "showTaxonomy",
          setAttributes: setAttributes
        }), attributes.showTaxonomy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _Taxonomy_General__WEBPACK_IMPORTED_MODULE_16__["default"],
          StyleTab: _Taxonomy_Style__WEBPACK_IMPORTED_MODULE_17__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Meta Data",
      opened: openPanel === "metadata",
      onToggle: () => togglePanel("metadata"),
      children: openPanel === "metadata" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Meta data", "smart-post-carousel"),
          value: attributes.showMetaData,
          attributesKey: "showMetaData",
          setAttributes: setAttributes
        }), attributes.showMetaData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _MetaData_General__WEBPACK_IMPORTED_MODULE_18__["default"],
          StyleTab: _MetaData_Style__WEBPACK_IMPORTED_MODULE_19__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Excerpt",
      opened: openPanel === "excerpt",
      onToggle: () => togglePanel("excerpt"),
      children: openPanel === "excerpt" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Excerpt", "smart-post-carousel"),
          value: attributes.showExcerpt,
          attributesKey: "showExcerpt",
          setAttributes: setAttributes
        }), attributes.showExcerpt && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _Excerpt_General__WEBPACK_IMPORTED_MODULE_22__["default"],
          StyleTab: _Excerpt_Style__WEBPACK_IMPORTED_MODULE_23__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Read More",
      opened: openPanel === "readMore",
      onToggle: () => togglePanel("readMore"),
      children: openPanel === "readMore" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Read More Button", "smart-post-carousel"),
          value: attributes.showReadMore,
          attributesKey: "showReadMore",
          setAttributes: setAttributes
        }), attributes.showReadMore && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _ReadMore_General__WEBPACK_IMPORTED_MODULE_20__["default"],
          StyleTab: _ReadMore_Style__WEBPACK_IMPORTED_MODULE_21__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: "Social Share",
      opened: openPanel === "socialShare",
      onToggle: () => togglePanel("socialShare"),
      children: openPanel === "socialShare" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_28__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_26__.__)("Social Share", "smart-post-carousel"),
          value: attributes.showSocialShare,
          attributesKey: "showSocialShare",
          setAttributes: setAttributes
        }), attributes.showSocialShare && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_29__.jsx)(_common_CustomTabs_CustomTabs__WEBPACK_IMPORTED_MODULE_27__["default"], {
          GeneralTab: _SocialShare_General__WEBPACK_IMPORTED_MODULE_24__["default"],
          StyleTab: _SocialShare_Style__WEBPACK_IMPORTED_MODULE_25__["default"],
          attributes: attributes,
          setAttributes: setAttributes,
          displayIcon: true,
          initialTab: "general"
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inspector);

/***/ },

/***/ "./src/components/MarqueCarousel/MarqueCarousel.js"
/*!*********************************************************!*\
  !*** ./src/components/MarqueCarousel/MarqueCarousel.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MarqueeCarousel)
/* harmony export */ });
/* harmony import */ var _common_Postcard_PostCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/Postcard/PostCard */ "./src/components/common/Postcard/PostCard.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function MarqueeCarousel({
  attributes,
  posts
}) {
  const {
    speed,
    direction
  } = attributes;
  if (!posts || posts.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "carousel-empty",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        children: "No posts available"
      })
    });
  }
  const animationDuration = `${Math.round(3000 / speed)}s`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "sp-smart-post-carousel-marquee-wrapper",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "sp-smart-post-carousel-marquee-track",
      style: {
        "--duration": animationDuration,
        "--direction": direction === "right" ? "reverse" : "normal"
      },
      children: [...posts, ...posts].map((post, idx) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "sp-smart-post-carousel-marquee-item",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_common_Postcard_PostCard__WEBPACK_IMPORTED_MODULE_0__["default"], {
          post: post,
          attributes: attributes
        })
      }, idx))
    })
  });
}

/***/ },

/***/ "./src/components/MetaData/General.js"
/*!********************************************!*\
  !*** ./src/components/MetaData/General.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "MetaData General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/MetaData/Style.js"
/*!******************************************!*\
  !*** ./src/components/MetaData/Style.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "MetaData Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/NavigationArrow/General.js"
/*!***************************************************!*\
  !*** ./src/components/NavigationArrow/General.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/CustomToggle/CustomToggle */ "./src/components/common/CustomToggle/CustomToggle.js");
/* harmony import */ var _common_SelectDropDown_SelectDropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/SelectDropDown/SelectDropDown */ "./src/components/common/SelectDropDown/SelectDropDown.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/CustomRangeControl/CustomRangeControl */ "./src/components/common/CustomRangeControl/CustomRangeControl.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







function General() {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__.useAttributes)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Visibility on Hover", "smart-post-carousel"),
      value: attributes.visibilityOnHover,
      attributesKey: "visibilityOnHover",
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_SelectDropDown_SelectDropDown__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "Arrow Icon Style",
      attributes: attributes.arrowStyle,
      attributesKey: "arrowStyle",
      setAttributes: setAttributes,
      options: _const__WEBPACK_IMPORTED_MODULE_4__.arrowIconOptions
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Size",
      attributeKey: "iconSize",
      min: 0,
      max: 200,
      defaultValue: 16,
      showUnit: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Width",
      attributeKey: "iconWidth",
      min: 0,
      max: 200,
      defaultValue: 40,
      showUnit: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Height",
      attributeKey: "iconHeight",
      min: 0,
      max: 200,
      defaultValue: 40,
      showUnit: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Space Between Arrows",
      attributeKey: "spaceBetweenArrow",
      min: 0,
      max: 200,
      defaultValue: 100,
      showUnit: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Horizontal Position",
      attributeKey: "horizontalPosition",
      min: -200,
      max: 200,
      defaultValue: 44,
      showUnit: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Vertical Position",
      attributeKey: "verticalPosition",
      min: 0,
      max: 200,
      defaultValue: 50,
      showUnit: true
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/NavigationArrow/Style.js"
/*!*************************************************!*\
  !*** ./src/components/NavigationArrow/Style.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _common_CustomColorPicker_CustomColorPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/CustomColorPicker/CustomColorPicker */ "./src/components/common/CustomColorPicker/CustomColorPicker.js");
/* harmony import */ var _common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/CustomToggleGroupControl/CustomToggleGroupControl */ "./src/components/common/CustomToggleGroupControl/CustomToggleGroupControl.js");
/* harmony import */ var _smart_post_carousel_assets_borderIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../smart-post-carousel/assets/borderIcon */ "./src/smart-post-carousel/assets/borderIcon.js");
/* harmony import */ var _common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/CustomRangeControl/CustomRangeControl */ "./src/components/common/CustomRangeControl/CustomRangeControl.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








function Style() {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__.useAttributes)();
  const {
    navArrowStyleType,
    borderColor,
    borderStyle
  } = attributes;
  const {
    label,
    attributeKey,
    defaultValue
  } = _const__WEBPACK_IMPORTED_MODULE_1__.colorConfig[navArrowStyleType];
  const {
    label: bgLabel,
    attributeKey: bgAttributeKey,
    defaultValue: bgDefaultValue
  } = _const__WEBPACK_IMPORTED_MODULE_1__.backGroundColorConfig[navArrowStyleType];
  const hasBorder = borderStyle !== "none";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      attributesKey: "navArrowStyleType",
      setAttributes: setAttributes,
      items: [{
        label: "Normal",
        value: "normal"
      }, {
        label: "Hover",
        value: "hover"
      }]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomColorPicker_CustomColorPicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: label,
      defaultValue: defaultValue,
      onChange: value => setAttributes({
        [attributeKey]: value
      }),
      value: attributes[attributeKey]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomColorPicker_CustomColorPicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: bgLabel,
      defaultValue: bgDefaultValue,
      onChange: value => setAttributes({
        [bgAttributeKey]: value
      }),
      value: attributes[bgAttributeKey]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Border", "smart-post-carousel"),
      attributes: attributes,
      attributesKey: "borderStyle",
      setAttributes: setAttributes,
      items: [{
        label: "None",
        value: "none"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_smart_post_carousel_assets_borderIcon__WEBPACK_IMPORTED_MODULE_5__.SolidBorder, {}),
        value: "solid"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_smart_post_carousel_assets_borderIcon__WEBPACK_IMPORTED_MODULE_5__.DashedBorder, {}),
        value: "dashed"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_smart_post_carousel_assets_borderIcon__WEBPACK_IMPORTED_MODULE_5__.DottedBorder, {}),
        value: "dotted"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_smart_post_carousel_assets_borderIcon__WEBPACK_IMPORTED_MODULE_5__.DoubleBorder, {}),
        value: "double"
      }]
    }), hasBorder && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
        label: "Border Width",
        attributeKey: "borderWidth",
        min: 0,
        max: 10,
        defaultValue: 1,
        showUnit: true,
        step: 1
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomColorPicker_CustomColorPicker__WEBPACK_IMPORTED_MODULE_3__["default"], {
        label: label,
        defaultValue: defaultValue,
        onChange: value => setAttributes({
          borderColor: value
        }),
        value: borderColor
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: "Border Radius",
      attributeKey: "borderRadius",
      min: 0,
      max: 300,
      defaultValue: 50,
      showUnit: true,
      step: 1
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/Pagination/General.js"
/*!**********************************************!*\
  !*** ./src/components/Pagination/General.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Pagination General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/Pagination/Style.js"
/*!********************************************!*\
  !*** ./src/components/Pagination/Style.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: "Pagination Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/PostCarousel/ContentOrientations.js"
/*!************************************************************!*\
  !*** ./src/components/PostCarousel/ContentOrientations.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _common_Layouts_Layouts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Layouts/Layouts */ "./src/components/common/Layouts/Layouts.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function ContentOrientations({
  label = "",
  attributes,
  setAttributes,
  attributesKey,
  onChange = false
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_common_Layouts_Layouts__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    setAttributes: setAttributes,
    attributesKey: attributesKey,
    displayActive: true,
    grid: 4,
    label: label,
    onChange: onChange,
    items: _const__WEBPACK_IMPORTED_MODULE_0__.OrientationItems
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentOrientations);

/***/ },

/***/ "./src/components/PostCarousel/General.js"
/*!************************************************!*\
  !*** ./src/components/PostCarousel/General.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/CustomRangeControl/CustomRangeControl */ "./src/components/common/CustomRangeControl/CustomRangeControl.js");
/* harmony import */ var _common_CustomSelection_CustomSelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/CustomSelection/CustomSelection */ "./src/components/common/CustomSelection/CustomSelection.js");
/* harmony import */ var _common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/CustomToggle/CustomToggle */ "./src/components/common/CustomToggle/CustomToggle.js");
/* harmony import */ var _common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/CustomToggleGroupControl/CustomToggleGroupControl */ "./src/components/common/CustomToggleGroupControl/CustomToggleGroupControl.js");
/* harmony import */ var _common_Layouts_Layouts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/Layouts/Layouts */ "./src/components/common/Layouts/Layouts.js");
/* harmony import */ var _ContentOrientations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ContentOrientations */ "./src/components/PostCarousel/ContentOrientations.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);











function General() {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__.useAttributes)();
  const orientationHandler = newValue => {
    setAttributes({
      contentOrientation: newValue
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_Layouts_Layouts__WEBPACK_IMPORTED_MODULE_8__["default"], {
      attributes: attributes,
      setAttributes: setAttributes,
      attributesKey: "carouselStyle",
      items: _const__WEBPACK_IMPORTED_MODULE_1__.LayoutItems
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Partial Slide View", "smart-post-carousel"),
      value: attributes.partialView,
      attributesKey: "partialView",
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_ContentOrientations__WEBPACK_IMPORTED_MODULE_9__["default"], {
      label: "Content Orientation",
      attributes: attributes,
      setAttributes: setAttributes,
      attributesKey: "contentOrientation",
      onChange: orientationHandler
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: "Columns",
      attributeKey: "columns",
      min: 0,
      max: 10,
      defaultValue: 3,
      showUnit: false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: "Number of Slides",
      attributeKey: "numberOfSlides",
      min: 0,
      max: 10,
      defaultValue: 3,
      showDevice: false,
      showUnit: false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: "Height",
      attributeKey: "height",
      min: 0,
      max: 1200,
      defaultValue: 642
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: "Gap",
      attributeKey: "gap",
      min: 0,
      max: 100,
      defaultValue: 24
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Content Alignment", "smart-post-carousel"),
      attributes: attributes,
      attributesKey: "contentAlignment",
      setAttributes: setAttributes,
      items: [{
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__.AlignLeft, {}),
        value: "flex-start"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__.AlignCenter, {}),
        value: "center"
      }, {
        label: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__.AlignRight, {}),
        value: "flex-end"
      }]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomSelection_CustomSelection__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: "Link Open In",
      options: _const__WEBPACK_IMPORTED_MODULE_1__.linkOpen,
      attributeKey: "linkOpen",
      inline: false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Preloader", "smart-post-carousel"),
      value: attributes.preloader,
      attributesKey: "preloader",
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Equal Height", "smart-post-carousel"),
      value: attributes.equalHeight,
      attributesKey: "equalHeight",
      setAttributes: setAttributes
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/PostCarousel/Slider.js"
/*!***********************************************!*\
  !*** ./src/components/PostCarousel/Slider.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/CustomRangeControl/CustomRangeControl */ "./src/components/common/CustomRangeControl/CustomRangeControl.js");
/* harmony import */ var _common_CustomSelection_CustomSelection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/CustomSelection/CustomSelection */ "./src/components/common/CustomSelection/CustomSelection.js");
/* harmony import */ var _common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/CustomToggle/CustomToggle */ "./src/components/common/CustomToggle/CustomToggle.js");
/* harmony import */ var _common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/CustomToggleGroupControl/CustomToggleGroupControl */ "./src/components/common/CustomToggleGroupControl/CustomToggleGroupControl.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








function Slider() {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__.useAttributes)();
  const {
    carouselStyle
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("AutoPlay", "smart-post-carousel"),
      value: attributes.autoPlay,
      attributesKey: "autoPlay",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "AutoPlay Delay",
      attributeKey: "delay",
      min: 0,
      max: 5000,
      defaultValue: 2000,
      step: 50,
      showDevice: false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "Carousel Speed",
      attributeKey: "speed",
      min: 0,
      max: 5000,
      defaultValue: 600,
      step: 50,
      showDevice: false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggleGroupControl_CustomToggleGroupControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Content Alignment", "smart-post-carousel"),
      attributes: attributes,
      attributesKey: "direction",
      setAttributes: setAttributes,
      items: [{
        label: "Right to Left",
        value: "right"
      }, {
        label: "Left to Right",
        value: "left"
      }]
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomRangeControl_CustomRangeControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: "Slide to Scroll",
      attributeKey: "slideGroup",
      min: 0,
      max: 100,
      defaultValue: 1,
      showReset: false,
      showUnit: false
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pause on Hover", "smart-post-carousel"),
      value: attributes.onHover,
      attributesKey: "onHover",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomSelection_CustomSelection__WEBPACK_IMPORTED_MODULE_4__["default"], {
      label: "Animation Effect",
      options: _const__WEBPACK_IMPORTED_MODULE_1__.animationEffect,
      attributeKey: "effect"
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Adaptive Height", "smart-post-carousel"),
      value: attributes.adaptiveHeight,
      attributesKey: "adaptiveHeight",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Infinite Loop", "smart-post-carousel"),
      value: attributes.infiniteLoop,
      attributesKey: "infiniteLoop",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tab and Key Navigation", "smart-post-carousel"),
      value: attributes.keyNavigation,
      attributesKey: "keyNavigation",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("MouseWheel Control", "smart-post-carousel"),
      value: attributes.mouseWheelControl,
      attributesKey: "mouseWheelControl",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Free Scroll Mode", "smart-post-carousel"),
      value: attributes.freeScroll,
      attributesKey: "freeScroll",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Navigation Arrow", "smart-post-carousel"),
      value: attributes.navigationArrow,
      attributesKey: "navigationArrow",
      setAttributes: setAttributes
    }), carouselStyle === "standard" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_common_CustomToggle_CustomToggle__WEBPACK_IMPORTED_MODULE_5__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pagination Dots", "smart-post-carousel"),
      value: attributes.paginationDots,
      attributesKey: "paginationDots",
      setAttributes: setAttributes
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ },

/***/ "./src/components/QueryBuilder/index.js"
/*!**********************************************!*\
  !*** ./src/components/QueryBuilder/index.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function QueryBuilder() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
      children: "QueryBuilder"
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QueryBuilder);

/***/ },

/***/ "./src/components/ReadMore/General.js"
/*!********************************************!*\
  !*** ./src/components/ReadMore/General.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "ReadMore General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/ReadMore/Style.js"
/*!******************************************!*\
  !*** ./src/components/ReadMore/Style.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "ReadMore Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/Renderer/CarouselRenderer.js"
/*!*****************************************************!*\
  !*** ./src/components/Renderer/CarouselRenderer.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SwiperCarousel_SwiperCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SwiperCarousel/SwiperCarousel */ "./src/components/SwiperCarousel/SwiperCarousel.js");
/* harmony import */ var _MarqueCarousel_MarqueCarousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MarqueCarousel/MarqueCarousel */ "./src/components/MarqueCarousel/MarqueCarousel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function CarouselRenderer({
  carouselStyle,
  posts,
  attributes
}) {
  const carouselComponents = {
    standard: _SwiperCarousel_SwiperCarousel__WEBPACK_IMPORTED_MODULE_0__["default"],
    ticker: _MarqueCarousel_MarqueCarousel__WEBPACK_IMPORTED_MODULE_1__["default"]
  };
  const CarouselComponent = carouselComponents[carouselStyle];
  if (!CarouselComponent) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(CarouselComponent, {
    attributes: attributes,
    posts: posts
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CarouselRenderer);

/***/ },

/***/ "./src/components/SocialShare/General.js"
/*!***********************************************!*\
  !*** ./src/components/SocialShare/General.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Social General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/SocialShare/Style.js"
/*!*********************************************!*\
  !*** ./src/components/SocialShare/Style.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Social Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/SwiperCarousel/SwiperCarousel.js"
/*!*********************************************************!*\
  !*** ./src/components/SwiperCarousel/SwiperCarousel.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SwiperCarousel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.css");
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/navigation */ "./node_modules/swiper/modules/navigation.css");
/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/css/pagination */ "./node_modules/swiper/modules/pagination.css");
/* harmony import */ var swiper_css_effect_fade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/css/effect-fade */ "./node_modules/swiper/modules/effect-fade.css");
/* harmony import */ var swiper_css_effect_cube__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper/css/effect-cube */ "./node_modules/swiper/modules/effect-cube.css");
/* harmony import */ var swiper_css_effect_flip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swiper/css/effect-flip */ "./node_modules/swiper/modules/effect-flip.css");
/* harmony import */ var swiper_css_effect_coverflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper/css/effect-coverflow */ "./node_modules/swiper/modules/effect-coverflow.css");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! swiper/react */ "./node_modules/swiper/swiper-react.mjs");
/* harmony import */ var _common_Postcard_PostCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/Postcard/PostCard */ "./src/components/common/Postcard/PostCard.js");
/* harmony import */ var _hooks_useDevice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/useDevice */ "./src/hooks/useDevice.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils */ "./utils/index.js");
/* harmony import */ var _SwiperNavigationButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SwiperNavigationButton */ "./src/components/SwiperCarousel/SwiperNavigationButton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__);















const EFFECT_MODULES = {
  fade: swiper_modules__WEBPACK_IMPORTED_MODULE_8__.EffectFade,
  cube: swiper_modules__WEBPACK_IMPORTED_MODULE_8__.EffectCube,
  flip: swiper_modules__WEBPACK_IMPORTED_MODULE_8__.EffectFlip,
  cover: swiper_modules__WEBPACK_IMPORTED_MODULE_8__.EffectCoverflow
};
function SwiperCarousel({
  attributes,
  posts
}) {
  const {
    columns,
    gap,
    autoPlay,
    delay,
    speed,
    direction,
    slideGroup,
    onHover,
    effect,
    adaptiveHeight,
    infiniteLoop,
    keyNavigation,
    mouseWheelControl,
    freeScroll,
    navigationArrow,
    paginationDots,
    arrowStyle,
    visibilityOnHover,
    iconSize
  } = attributes;
  const swiperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const deviceType = (0,_hooks_useDevice__WEBPACK_IMPORTED_MODULE_11__.useDeviceType)();
  const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
  const slidePerView = columns[normalizedDeviceType] || 1;
  const gapBetweenSlide = gap[normalizedDeviceType] || 8;
  const slideGroupNumber = slideGroup[normalizedDeviceType] || 1;
  const autoplayDelay = Number(delay) || 3000;
  const transitionSpeed = Number(speed) || 600;
  const isChunkedEffect = _utils__WEBPACK_IMPORTED_MODULE_12__.CHUNKED_EFFECTS.includes(effect);
  const isEffectSlide = !Object.keys(EFFECT_MODULES).includes(effect);
  const swiperNextButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const swiperPrevButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Chunk posts for fade/cube/flip
  const allPosts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (isChunkedEffect) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_12__.arrayChunk)(posts, slidePerView);
    }
    return posts;
  }, [posts, slidePerView, isChunkedEffect]);

  // Build modules based on effect and autoplay
  const swiperModules = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const base = [swiper_modules__WEBPACK_IMPORTED_MODULE_8__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_8__.Pagination, swiper_modules__WEBPACK_IMPORTED_MODULE_8__.Keyboard, swiper_modules__WEBPACK_IMPORTED_MODULE_8__.Mousewheel, swiper_modules__WEBPACK_IMPORTED_MODULE_8__.FreeMode, swiper_modules__WEBPACK_IMPORTED_MODULE_8__.Autoplay];
    if (EFFECT_MODULES[effect]) base.push(EFFECT_MODULES[effect]);
    return base;
  }, [autoPlay, effect]);

  // Effect-specific props
  const effectProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    switch (effect) {
      case "cube":
        return {
          cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        };
      case "cover":
        return {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }
        };
      case "flip":
        return {
          flipEffect: {
            slideShadows: true
          }
        };
      case "fade":
        return {
          fadeEffect: {
            crossFade: true
          }
        };
      default:
        return {};
    }
  }, [effect]);
  const swiperKey = `${slidePerView}-${gapBetweenSlide}-${slideGroupNumber}-${effect}-${adaptiveHeight}-${keyNavigation}-${mouseWheelControl}-${freeScroll}-${navigationArrow}-${paginationDots}`;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.params.autoplay.pauseOnMouseEnter = onHover;
    }
  }, [onHover]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!swiperRef.current) return;
    if (!swiperRef.current.autoplay) return;
    if (autoPlay) {
      swiperRef.current.autoplay.start();
    } else {
      swiperRef.current.autoplay.stop();
    }
  }, [autoPlay]);

  // Render Slides Based on Swiper Effect

  const renderSlides = () => {
    if (isChunkedEffect) {
      return allPosts.map((chunk, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(swiper_react__WEBPACK_IMPORTED_MODULE_9__.SwiperSlide, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          style: {
            display: "flex",
            gap: gapBetweenSlide
          },
          children: chunk.map(post => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_common_Postcard_PostCard__WEBPACK_IMPORTED_MODULE_10__["default"], {
              post: post,
              attributes: attributes
            })
          }, post.id))
        })
      }, i));
    }
    return posts.map(post => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(swiper_react__WEBPACK_IMPORTED_MODULE_9__.SwiperSlide, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_common_Postcard_PostCard__WEBPACK_IMPORTED_MODULE_10__["default"], {
        post: post,
        attributes: attributes
      })
    }, post.id));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
    className: "sp-smart-post-carousel",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(swiper_react__WEBPACK_IMPORTED_MODULE_9__.Swiper, {
      onSwiper: swiper => swiperRef.current = swiper,
      modules: swiperModules,
      autoHeight: adaptiveHeight || false,
      slidesPerView: isChunkedEffect ? 1 : effect === "cover" ? slidePerView : slidePerView,
      spaceBetween: effect === "cube" ? 0 : gapBetweenSlide,
      navigation: {
        nextEl: swiperNextButtonRef.current,
        prevEl: swiperPrevButtonRef.current,
        enabled: true
      },
      pagination: paginationDots ? {
        clickable: true
      } : false,
      slidesPerGroup: freeScroll ? 1 : isEffectSlide ? slideGroupNumber : 1,
      autoplay: autoPlay ? {
        delay: autoplayDelay,
        disableOnInteraction: false,
        pauseOnMouseEnter: onHover,
        reverseDirection: direction === "left"
      } : false,
      loop: isEffectSlide && infiniteLoop && slideGroupNumber <= 1,
      speed: transitionSpeed,
      effect: _utils__WEBPACK_IMPORTED_MODULE_12__.EFFECT_MAP[effect] || "slide",
      ...effectProps,
      keyboard: keyNavigation ? {
        enabled: true,
        onlyInViewport: true
      } : false,
      mousewheel: mouseWheelControl ? {
        forceToAxis: false,
        sensitivity: 1,
        releaseOnEdges: true,
        thresholdDelta: 50
      } : false,
      freeMode: freeScroll ? {
        enabled: true,
        sticky: true,
        momentum: true,
        momentumRatio: 0.25,
        momentumVelocityRatio: 0.5
      } : false,
      children: renderSlides()
    }, swiperKey), navigationArrow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SwiperNavigationButton__WEBPACK_IMPORTED_MODULE_13__["default"], {
      iconStyle: arrowStyle,
      visibilityOnHover: visibilityOnHover,
      swiperNextButtonRef: swiperNextButtonRef,
      swiperPrevButtonRef: swiperPrevButtonRef
    })]
  });
}

/***/ },

/***/ "./src/components/SwiperCarousel/SwiperNavigationButton.js"
/*!*****************************************************************!*\
  !*** ./src/components/SwiperCarousel/SwiperNavigationButton.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const */ "./src/const/index.js");
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _hooks_useDevice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useDevice */ "./src/hooks/useDevice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function SwiperNavigationButton({
  iconStyle,
  swiperNextButtonRef,
  swiperPrevButtonRef,
  visibilityOnHover
}) {
  const {
    attributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__.useAttributes)();
  const Icon = _const__WEBPACK_IMPORTED_MODULE_0__.arrowIcons[iconStyle];
  const deviceType = (0,_hooks_useDevice__WEBPACK_IMPORTED_MODULE_2__.useDeviceType)();
  const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
  const {
    iconSize,
    iconWidth,
    iconHeight,
    spaceBetweenArrow,
    verticalPosition,
    horizontalPosition,
    iconBackGroundColor,
    iconBackGroundHoverColor,
    iconColor,
    iconHoverColor,
    borderStyle,
    borderWidth,
    borderColor
  } = attributes;
  const hasBorder = borderStyle !== "none";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: `sp-smart-post-carousel-swiper-nav-arrow ${visibilityOnHover ? "visible-on-hover" : ""}`,
    style: {
      "--iconBackGroundHeight": `${iconHeight[normalizedDeviceType]}px`,
      "--iconBackGroundWidth": `${iconWidth[normalizedDeviceType]}px`,
      "--spaceBetweenArrows": `${spaceBetweenArrow[normalizedDeviceType]}%`,
      "--spaceBetweenArrows": `${spaceBetweenArrow[normalizedDeviceType]}%`,
      "--verticalPosition": `${verticalPosition[normalizedDeviceType]}%`,
      "--horizontalPosition": `${horizontalPosition[normalizedDeviceType]}px`,
      "--iconBackGroundColor": iconBackGroundColor,
      "--iconBackGroundHoverColor": iconBackGroundHoverColor,
      "--iconColor": iconColor,
      "--iconHoverColor": iconHoverColor,
      ...(hasBorder && {
        "--borderStyle": borderStyle
      }),
      ...(hasBorder && {
        "--borderWidth": borderWidth
      }),
      ...(hasBorder && {
        "--borderColor": borderColor
      })
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: `sp-smart-post-carousel-swiper-nav-arrow-btn prev-btn ${hasBorder ? "has-border" : ""}`,
      ref: swiperPrevButtonRef,
      style: {
        fontSize: `${iconSize[normalizedDeviceType]}px`
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Icon, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "sp-smart-post-carousel-swiper-nav-arrow-btn next-btn",
      ref: swiperNextButtonRef,
      style: {
        fontSize: `${iconSize[normalizedDeviceType]}px`
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Icon, {})
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwiperNavigationButton);

/***/ },

/***/ "./src/components/Taxonomy/General.js"
/*!********************************************!*\
  !*** ./src/components/Taxonomy/General.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Taxonomy General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/Taxonomy/Style.js"
/*!******************************************!*\
  !*** ./src/components/Taxonomy/Style.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Taxonomy Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/TitleArea/General.js"
/*!*********************************************!*\
  !*** ./src/components/TitleArea/General.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function General() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "Title General"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (General);

/***/ },

/***/ "./src/components/TitleArea/Style.js"
/*!*******************************************!*\
  !*** ./src/components/TitleArea/Style.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Style() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: "title Style"
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ },

/***/ "./src/components/common/CustomColorPicker/CustomColorPicker.js"
/*!**********************************************************************!*\
  !*** ./src/components/common/CustomColorPicker/CustomColorPicker.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomColorPicker/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function CustomColorPicker({
  label,
  value,
  onChange,
  defaultValue = "#f05e31"
}) {
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const anchorRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const handleColorChange = value => {
    onChange(value.hex);
  };
  const handleReset = () => {
    onChange(defaultValue);
    setIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "custom-color-picker-control",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "color-picker-control",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "range-label",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            children: label
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "range-measure",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__.ResetIcon, {
              style: {
                cursor: "pointer"
              },
              onClick: handleReset
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "color",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                onClick: () => {
                  setIsOpen(!isOpen);
                },
                ref: anchorRef,
                style: {
                  cursor: "pointer"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  fill: value
                })
              })
            })]
          })
        })]
      })
    }), isOpen && anchorRef.current && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
      placement: "left-end",
      onClose: () => setIsOpen(false),
      className: "color-popover",
      usePortal: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
        color: value,
        onChangeComplete: handleColorChange,
        enableAlpha: true
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomColorPicker);

/***/ },

/***/ "./src/components/common/CustomColorPicker/editor.scss"
/*!*************************************************************!*\
  !*** ./src/components/common/CustomColorPicker/editor.scss ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/CustomRangeControl/CustomRangeControl.js"
/*!************************************************************************!*\
  !*** ./src/components/common/CustomRangeControl/CustomRangeControl.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RangeHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RangeHeader */ "./src/components/common/CustomRangeControl/RangeHeader.js");
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _hooks_useRangeHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/useRangeHandler */ "./src/hooks/useRangeHandler.js");
/* harmony import */ var _hooks_useRangeValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/useRangeValue */ "./src/hooks/useRangeValue.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomRangeControl/editor.scss");
/* harmony import */ var _hooks_useDevice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/useDevice */ "./src/hooks/useDevice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








function CustomRangeControl({
  label = "Space Between Lists",
  attributeKey = "spaceBetween",
  min = 0,
  max = 100,
  defaultValue = 0,
  nestedKey = null,
  unit = "px",
  showReset = true,
  showDevice = true,
  showUnit = false,
  step = 1
}) {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_2__.useAttributes)();
  const deviceType = (0,_hooks_useDevice__WEBPACK_IMPORTED_MODULE_6__.useDeviceType)();

  // Get current value using custom hook
  const {
    value,
    activeSubKey
  } = (0,_hooks_useRangeValue__WEBPACK_IMPORTED_MODULE_4__.useRangeValue)({
    attributes,
    attributeKey,
    nestedKey,
    deviceType,
    defaultValue
  });

  // Handle changes and reset using custom hook
  const {
    handleChange,
    handleReset
  } = (0,_hooks_useRangeHandler__WEBPACK_IMPORTED_MODULE_3__.useRangeHandler)({
    attributes,
    setAttributes,
    attributeKey,
    nestedKey,
    activeSubKey,
    defaultValue
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "custom-range-control",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_RangeHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
      label: label,
      unit: unit,
      showReset: showReset,
      showDevice: showDevice,
      onReset: handleReset,
      showUnit: showUnit
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "input-range",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RangeControl, {
        max: max,
        min: min,
        value: value,
        onChange: newValue => handleChange(newValue),
        step: step
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomRangeControl);

/***/ },

/***/ "./src/components/common/CustomRangeControl/DeviceDropDown.js"
/*!********************************************************************!*\
  !*** ./src/components/common/CustomRangeControl/DeviceDropDown.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useDevice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/useDevice */ "./src/hooks/useDevice.js");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function DeviceDropdown() {
  const closeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const deviceType = (0,_hooks_useDevice__WEBPACK_IMPORTED_MODULE_3__.useDeviceType)();
  const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      closeRef.current?.();
    }, 300);
  };
  const changeDevice = device => {
    const canvas = document.getElementsByClassName("edit-site-visual-editor__editor-canvas");
    const store = canvas.length > 0 ? "core/edit-site" : "core/edit-post";
    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)(store).__experimentalSetPreviewDeviceType(device);
  };
  const getCurrentIcon = () => {
    switch (normalizedDeviceType) {
      case "mobile":
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.MobileIcon, {});
      case "tablet":
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.TabIcon, {});
      default:
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.TelevisionIcon, {});
    }
  };
  const getColor = device => normalizedDeviceType === device ? "#8e56e9ff" : "#8C8F94";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
    popoverProps: {
      placement: "bottom-center"
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "device-toggle",
      style: {
        cursor: "pointer"
      },
      onMouseEnter: () => {
        handleMouseEnter();
        if (!isOpen) onToggle();
      },
      onMouseLeave: handleMouseLeave,
      children: getCurrentIcon()
    }),
    renderContent: ({
      onClose
    }) => {
      closeRef.current = onClose;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "device-buttons",
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          onClick: () => {
            changeDevice("Desktop");
            onClose();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.TelevisionIcon, {
            color: getColor("desktop")
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          onClick: () => {
            changeDevice("Tablet");
            onClose();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.TabIcon, {
            color: getColor("tablet")
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          onClick: () => {
            changeDevice("Mobile");
            onClose();
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_4__.MobileIcon, {
            color: getColor("mobile")
          })
        })]
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeviceDropdown);

/***/ },

/***/ "./src/components/common/CustomRangeControl/RangeHeader.js"
/*!*****************************************************************!*\
  !*** ./src/components/common/CustomRangeControl/RangeHeader.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _DeviceDropDown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeviceDropDown */ "./src/components/common/CustomRangeControl/DeviceDropDown.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function RangeHeader({
  label,
  unit,
  showReset,
  showDevice,
  onReset,
  showUnit
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "range-control",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "range-label",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          children: label
        }), showDevice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "desktop",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_DeviceDropDown__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "range-measure",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          children: [showReset && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_0__.ResetIcon, {
            style: {
              cursor: "pointer"
            },
            onClick: onReset
          }), showUnit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "pixel",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
              children: unit
            })
          })]
        })
      })]
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RangeHeader);

/***/ },

/***/ "./src/components/common/CustomRangeControl/editor.scss"
/*!**************************************************************!*\
  !*** ./src/components/common/CustomRangeControl/editor.scss ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/CustomSelection/CustomSelection.js"
/*!******************************************************************!*\
  !*** ./src/components/common/CustomSelection/CustomSelection.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../hooks/useAttributes */ "./src/hooks/useAttributes.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomSelection/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




function CustomSelection({
  label,
  options,
  inline = true,
  attributeKey = "",
  subKey = ""
}) {
  const {
    attributes,
    setAttributes
  } = (0,_hooks_useAttributes__WEBPACK_IMPORTED_MODULE_1__.useAttributes)();
  const handleChange = newValue => {
    if (subKey) {
      setAttributes({
        [attributeKey]: {
          ...attributes[attributeKey],
          [subKey]: newValue
        }
      });
    } else {
      setAttributes({
        [attributeKey]: newValue
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: `selector-control custom-selector ${inline ? "inline" : ""}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "selector-label",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      options: options,
      onChange: value => handleChange(value),
      value: subKey ? attributes[attributeKey][subKey] : attributes[attributeKey]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomSelection);

/***/ },

/***/ "./src/components/common/CustomSelection/editor.scss"
/*!***********************************************************!*\
  !*** ./src/components/common/CustomSelection/editor.scss ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/CustomTabs/CustomTabs.js"
/*!********************************************************!*\
  !*** ./src/components/common/CustomTabs/CustomTabs.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomTabs/editor.scss");
/* harmony import */ var _tabConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabConfig */ "./src/components/common/CustomTabs/tabConfig.js");
/* harmony import */ var _TabRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabRenderer */ "./src/components/common/CustomTabs/TabRenderer.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






// Main CustomTabs Component

const CustomTabs = ({
  attributes,
  setAttributes,
  displayIcon = true,
  initialTab = "general",
  verticalPosition = true,
  props = "",
  ...tabComponents
}) => {
  const [tabName, setTabName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialTab);
  const tabs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => _tabConfig__WEBPACK_IMPORTED_MODULE_3__.tabOrder.filter(({
    componentKey
  }) => tabComponents[componentKey]).map(({
    key
  }) => {
    const config = _tabConfig__WEBPACK_IMPORTED_MODULE_3__.tabConfigs[key];
    const Icon = config.icon;
    return {
      name: key,
      title: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
        className: "sp-smart-post-carousel-tab-panel-title",
        children: [displayIcon && Icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Icon, {}), " ", config.label]
      }),
      className: config.className
    };
  }), [tabComponents, displayIcon]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TabPanel, {
    className: "sp-smart-post-carousel-tab-panel",
    activeClass: "active-tab",
    initialTabName: tabName,
    onSelect: setTabName,
    tabs: tabs,
    children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TabRenderer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tab: tab,
      tabComponents: tabComponents,
      attributes: attributes,
      setAttributes: setAttributes,
      props: props,
      verticalPosition: verticalPosition
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomTabs);

/***/ },

/***/ "./src/components/common/CustomTabs/TabRenderer.js"
/*!*********************************************************!*\
  !*** ./src/components/common/CustomTabs/TabRenderer.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const TabRenderer = ({
  tab,
  tabComponents,
  attributes,
  setAttributes,
  props,
  verticalPosition
}) => {
  const componentMap = {
    layout: 'LayoutTab',
    carousel: 'CarouselTab',
    general: 'GeneralTab',
    preset: 'Preset',
    style: 'StyleTab',
    visibility: 'VisibilityTab',
    advanced: 'AdvancedTab',
    slider: 'SliderTab'
  };
  const componentKey = componentMap[tab.name];
  const Component = tabComponents[componentKey];
  if (!Component) return null;
  const componentProps = {
    attributes,
    setAttributes,
    props
  };
  if (['layout', 'carousel', 'general'].includes(tab.name)) {
    componentProps.verticalPosition = verticalPosition;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {
    ...componentProps
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabRenderer);

/***/ },

/***/ "./src/components/common/CustomTabs/editor.scss"
/*!******************************************************!*\
  !*** ./src/components/common/CustomTabs/editor.scss ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/CustomTabs/icons.js"
/*!***************************************************!*\
  !*** ./src/components/common/CustomTabs/icons.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvancedIcon: () => (/* binding */ AdvancedIcon),
/* harmony export */   CarouselIcon: () => (/* binding */ CarouselIcon),
/* harmony export */   GeneralIcon: () => (/* binding */ GeneralIcon),
/* harmony export */   LayoutsIcon: () => (/* binding */ LayoutsIcon),
/* harmony export */   SliderIcon: () => (/* binding */ SliderIcon),
/* harmony export */   StyleIcon: () => (/* binding */ StyleIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const GeneralIcon = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-block-icon",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: 17,
      height: 16,
      viewBox: "0 0 17 16",
      fill: "none",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M8.5 11.3125C6.6735 11.3125 5.1875 9.82653 5.1875 8C5.1875 6.17347 6.6735 4.6875 8.5 4.6875C10.3265 4.6875 11.8125 6.17347 11.8125 8C11.8125 9.82653 10.3265 11.3125 8.5 11.3125ZM8.5 6.25C7.53503 6.25 6.75 7.03506 6.75 8C6.75 8.96494 7.53503 9.75 8.5 9.75C9.46497 9.75 10.25 8.96494 10.25 8C10.25 7.03506 9.46497 6.25 8.5 6.25Z"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M14.8646 8.9685C14.9618 8.32649 14.9618 7.67351 14.8646 7.0315C15.8575 6.4375 16.1328 5.21484 15.5844 4.27063L15.2719 3.72937C14.7163 2.76709 13.4868 2.43122 12.5204 2.97272C12.0133 2.5672 11.448 2.24033 10.8435 2.00313C10.8285 0.895938 9.92314 0 8.81249 0H8.18749C7.07683 0 6.17149 0.895938 6.15642 2.00313C5.55199 2.24033 4.98672 2.5672 4.47961 2.97272C3.51314 2.43122 2.28364 2.76709 1.72805 3.72937L1.41555 4.27063C0.867173 5.21484 1.14252 6.4375 2.13533 7.0315C2.03816 7.67351 2.03816 8.32649 2.13533 8.9685C1.18364 9.535 0.860111 10.7673 1.41555 11.7294L1.72805 12.2706C2.28364 13.2329 3.51314 13.5688 4.47961 13.0273C4.98672 13.4328 5.55199 13.7597 6.15642 13.9969C6.17152 15.1041 7.07683 16 8.18749 16H8.81249C9.92314 16 10.8285 15.1041 10.8435 13.9969C11.448 13.7597 12.0133 13.4328 12.5204 13.0273C13.4868 13.5688 14.7163 13.233 15.2719 12.2707L15.5844 11.7294C16.1399 10.7673 15.8163 9.535 14.8646 8.9685ZM14.2313 10.9481L13.9188 11.4894C13.7895 11.7132 13.5023 11.7902 13.2785 11.6609L12.817 11.3945C12.6701 11.3097 12.4996 11.275 12.3313 11.2956C12.163 11.3163 12.006 11.3911 11.8839 11.5088C11.3111 12.0614 10.6068 12.4686 9.84711 12.6865C9.68405 12.7333 9.54065 12.8319 9.43856 12.9674C9.33648 13.1028 9.28127 13.2679 9.28127 13.4375V13.9688C9.28127 14.2272 9.07099 14.4375 8.81252 14.4375H8.18752C7.92905 14.4375 7.71877 14.2272 7.71877 13.9688V13.4375C7.71877 13.2679 7.66356 13.1028 7.56147 12.9674C7.45939 12.8319 7.31598 12.7333 7.15292 12.6865C6.39321 12.4686 5.68889 12.0614 5.11611 11.5088C4.99407 11.3911 4.83703 11.3163 4.66871 11.2956C4.50039 11.275 4.32994 11.3097 4.18308 11.3945L3.72155 11.6609C3.49777 11.7902 3.21049 11.7132 3.08124 11.4894L2.76874 10.9481C2.63949 10.7243 2.71645 10.437 2.9403 10.3078L3.40067 10.042C3.54744 9.95724 3.66268 9.82709 3.72901 9.67114C3.79534 9.51519 3.80916 9.3419 3.76839 9.17741C3.67327 8.79359 3.62502 8.39747 3.62502 7.99997C3.62502 7.60247 3.67327 7.20634 3.76839 6.82256C3.80917 6.65807 3.79535 6.48479 3.72903 6.32884C3.6627 6.17289 3.54747 6.04273 3.40071 5.958L2.9403 5.69219C2.69924 5.54688 2.66017 5.25781 2.76874 5.05188L3.08124 4.51062C3.21049 4.28678 3.49774 4.20988 3.72155 4.33906L4.18308 4.6055C4.32993 4.69028 4.50038 4.72498 4.6687 4.70436C4.83701 4.68374 4.99404 4.60891 5.11608 4.49119C5.68889 3.93862 6.39321 3.53138 7.15292 3.31347C7.31598 3.2667 7.45939 3.16812 7.56147 3.03264C7.66356 2.89716 7.71877 2.73214 7.71877 2.5625V2.03125C7.71877 1.77278 7.92905 1.5625 8.18752 1.5625H8.81252C9.07099 1.5625 9.28127 1.77278 9.28127 2.03125V2.5625C9.28127 2.73214 9.33648 2.89716 9.43856 3.03264C9.54065 3.16812 9.68405 3.2667 9.84711 3.31347C10.6068 3.53138 11.3111 3.93862 11.884 4.49119C12.006 4.60891 12.163 4.68374 12.3313 4.70436C12.4997 4.72498 12.6701 4.69028 12.817 4.6055L13.2785 4.33906C13.5023 4.20988 13.7895 4.28678 13.9188 4.51062L14.2313 5.05188C14.3399 5.25781 14.3008 5.54688 14.0597 5.69219L13.5993 5.958C13.4526 6.04273 13.3373 6.17289 13.271 6.32884C13.2047 6.48479 13.1909 6.65807 13.2316 6.82256C13.3269 7.20778 13.3751 7.60314 13.375 7.99997C13.375 8.39744 13.3268 8.79359 13.2316 9.17741C13.1909 9.3419 13.2047 9.51519 13.271 9.67114C13.3374 9.82709 13.4526 9.95724 13.5994 10.042L14.0598 10.3078C14.2836 10.437 14.3605 10.7243 14.2313 10.9481Z"
      })]
    })
  });
};
const StyleIcon = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-block-icon",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      fill: "none",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
        clipPath: "url(#clip0_14036_3246)",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M3.75195 9.00403C3.23502 9.00403 2.81445 8.58347 2.81445 8.06653C2.81445 7.54959 3.23502 7.12903 3.75195 7.12903C4.26889 7.12903 4.68945 7.54959 4.68945 8.06653C4.68945 8.58347 4.26889 9.00403 3.75195 9.00403ZM8.00195 4.75403C7.48502 4.75403 7.06445 4.33347 7.06445 3.81653C7.06445 3.29959 7.48502 2.87903 8.00195 2.87903C8.51889 2.87903 8.93945 3.29959 8.93945 3.81653C8.93945 4.33347 8.51889 4.75403 8.00195 4.75403ZM11.0067 5.99931C10.4897 5.99931 10.0692 5.57875 10.0692 5.06181C10.0692 4.54487 10.4897 4.12431 11.0067 4.12431C11.5236 4.12431 11.9442 4.54487 11.9442 5.06181C11.9442 5.57875 11.5236 5.99931 11.0067 5.99931ZM4.99723 5.99931C4.4803 5.99931 4.05973 5.57875 4.05973 5.06181C4.05973 4.54487 4.4803 4.12431 4.99723 4.12431C5.51417 4.12431 5.93473 4.54487 5.93473 5.06181C5.93473 5.57875 5.51417 5.99931 4.99723 5.99931Z"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M6.75473 15.936C6.61298 15.936 6.4702 15.9211 6.32833 15.891C4.56364 15.5152 2.95886 14.5353 1.80961 13.1319C0.643922 11.7084 0.00195312 9.90941 0.00195312 8.06644C0.00195312 5.93241 0.832203 3.92531 2.33977 2.41491C3.84711 0.90475 5.8522 0.0707185 7.98567 0.0664372L8.00183 0.0664062C12.3929 0.0664062 15.9801 3.63369 16.0018 8.026C16.002 8.06919 16.0019 8.11234 16.0015 8.15547C15.9903 9.18038 15.5787 10.1415 14.8425 10.8617C14.1102 11.5782 13.1426 11.9727 12.1178 11.9727H9.87695C9.27386 11.9727 8.7832 12.4634 8.7832 13.0665V13.9041C8.7832 14.52 8.50864 15.0955 8.02992 15.483C7.66383 15.7793 7.21505 15.936 6.75473 15.936ZM8.00183 1.62891H7.9888C4.44642 1.636 1.56445 4.52388 1.56445 8.06644C1.56445 11.0868 3.70483 13.7347 6.65377 14.3627C6.84445 14.4034 6.98183 14.3211 7.04683 14.2684C7.11177 14.2159 7.2207 14.0986 7.2207 13.9041V13.0664C7.2207 11.6017 8.4123 10.4102 9.87695 10.4102H12.1178C13.384 10.4102 14.4254 9.39103 14.439 8.13834V8.13828C14.4394 8.10353 14.4395 8.06871 14.4394 8.03381C14.4219 4.49956 11.535 1.62891 8.00183 1.62891Z"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
          id: "clip0_14036_3246",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            width: 16,
            height: 16,
            fill: "white"
          })
        })
      })]
    })
  });
};
const CarouselIcon = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-block-icon",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
        clipPath: "url(#clip0_16854_32763)",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M3.75 8.9375C3.23306 8.9375 2.8125 8.51694 2.8125 8C2.8125 7.48306 3.23306 7.0625 3.75 7.0625C4.26694 7.0625 4.6875 7.48306 4.6875 8C4.6875 8.51694 4.26694 8.9375 3.75 8.9375ZM8 4.6875C7.48306 4.6875 7.0625 4.26694 7.0625 3.75C7.0625 3.23306 7.48306 2.8125 8 2.8125C8.51694 2.8125 8.9375 3.23306 8.9375 3.75C8.9375 4.26694 8.51694 4.6875 8 4.6875ZM11.0047 5.93278C10.4878 5.93278 10.0672 5.51222 10.0672 4.99528C10.0672 4.47834 10.4878 4.05778 11.0047 4.05778C11.5217 4.05778 11.9422 4.47834 11.9422 4.99528C11.9422 5.51222 11.5217 5.93278 11.0047 5.93278ZM4.99528 5.93278C4.47834 5.93278 4.05778 5.51222 4.05778 4.99528C4.05778 4.47834 4.47834 4.05778 4.99528 4.05778C5.51222 4.05778 5.93278 4.47834 5.93278 4.99528C5.93278 5.51222 5.51222 5.93278 4.99528 5.93278Z",
          fill: "var(--smart-post-secondary)"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M6.75278 15.8696C6.61103 15.8696 6.46825 15.8547 6.32638 15.8246C4.56169 15.4488 2.95691 14.4689 1.80766 13.0655C0.641969 11.642 0 9.843 0 8.00003C0 5.866 0.83025 3.85891 2.33781 2.3485C3.84516 0.838344 5.85025 0.00431224 7.98372 3.09944e-05L7.99988 0C12.3909 0 15.9782 3.56728 15.9999 7.95959C16.0001 8.00278 16 8.04594 15.9995 8.08906C15.9883 9.11397 15.5767 10.0751 14.8406 10.7953C14.1083 11.5118 13.1406 11.9063 12.1158 11.9063H9.875C9.27191 11.9063 8.78125 12.397 8.78125 13.0001V13.8377C8.78125 14.4536 8.50669 15.0291 8.02797 15.4166C7.66188 15.7129 7.21309 15.8696 6.75278 15.8696ZM7.99988 1.5625H7.98684C4.44447 1.56959 1.5625 4.45747 1.5625 8.00003C1.5625 11.0203 3.70288 13.6683 6.65181 14.2963C6.8425 14.337 6.97988 14.2547 7.04488 14.202C7.10981 14.1495 7.21875 14.0322 7.21875 13.8377V13C7.21875 11.5353 8.41034 10.3438 9.875 10.3438H12.1158C13.3821 10.3438 14.4234 9.32463 14.4371 8.07194V8.07187C14.4375 8.03712 14.4376 8.0023 14.4374 7.96741C14.4199 4.43316 11.533 1.5625 7.99988 1.5625Z",
          fill: "var(--smart-post-secondary)"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
          id: "clip0_16854_32763",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            width: 16,
            height: 16,
            fill: "white"
          })
        })
      })]
    })
  });
};
const LayoutsIcon = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-block-icon",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
        clipPath: "url(#clip0_16842_32757)",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M5.625 8.00004C5.625 9.30961 6.69043 10.375 8 10.375C8.95007 10.375 9.80676 9.81107 10.1826 8.93839C10.3191 8.62138 10.6868 8.47501 11.0038 8.61149C11.2404 8.71342 11.3818 8.94376 11.3818 9.18583C11.3818 9.26835 11.3654 9.35221 11.3307 9.43278C10.7572 10.7644 9.44983 11.625 8 11.625C6.00122 11.625 4.375 9.99882 4.375 8.00004C4.375 6.56901 5.23279 5.2664 6.56042 4.68144C6.87634 4.54228 7.24524 4.68546 7.3844 5.00138C7.52356 5.31718 7.38037 5.68607 7.06445 5.82536C6.19006 6.21061 5.625 7.06425 5.625 8.00004ZM5.8125 13.8102L5.8125 14.125C5.8125 15.1589 6.65356 16 7.6875 16L8.3125 16C9.34644 16 10.1875 15.1589 10.1875 14.125L10.1875 13.8102C10.1875 13.7275 10.2396 13.6524 10.3204 13.6191L10.3318 13.6143C10.4128 13.5807 10.5031 13.5967 10.5616 13.6553L10.7842 13.8778C11.1383 14.232 11.6093 14.427 12.11 14.427C12.6108 14.427 13.0817 14.232 13.4358 13.8778L13.8778 13.436C14.2319 13.0818 14.427 12.6109 14.427 12.1101C14.427 11.6093 14.2319 11.1383 13.8778 10.7842L13.6553 10.5617C13.5967 10.5032 13.5806 10.413 13.6143 10.3319L13.6193 10.3196C13.6523 10.2397 13.7274 10.1875 13.8102 10.1875L14.125 10.1875C15.1588 10.1875 16 9.34635 16 8.31254L16 7.68754C16 6.9091 15.5101 6.20316 14.7812 5.93082C14.4579 5.80985 14.0979 5.97404 13.9771 6.2974C13.8562 6.62089 14.0204 6.98087 14.3437 7.1016C14.5867 7.19242 14.75 7.42789 14.75 7.68754L14.75 8.31254C14.75 8.65714 14.4696 8.93754 14.125 8.93754L13.8102 8.93754C13.2194 8.93754 12.6908 9.29301 12.4636 9.84318L12.46 9.85209C12.2314 10.4024 12.3536 11.0277 12.7714 11.4455L12.9939 11.6681C13.1119 11.7862 13.177 11.943 13.177 12.11C13.177 12.277 13.1119 12.434 12.9939 12.552L12.552 12.9939C12.434 13.112 12.277 13.177 12.11 13.177C11.9431 13.177 11.7861 13.112 11.6681 12.9939L11.4456 12.7714C11.028 12.3538 10.403 12.2315 9.85303 12.4596L9.84314 12.4637C9.29297 12.691 8.9375 13.2194 8.9375 13.8102L8.9375 14.125C8.9375 14.4696 8.6571 14.75 8.3125 14.75L7.6875 14.75C7.3429 14.75 7.0625 14.4696 7.0625 14.125L7.0625 13.8102C7.0625 13.2194 6.70703 12.691 6.15686 12.4638L6.14539 12.459C5.59753 12.2315 4.97217 12.3537 4.55444 12.7714L4.33191 12.9941C4.08826 13.2377 3.69177 13.2377 3.448 12.9939L3.0061 12.552C2.88806 12.434 2.823 12.277 2.823 12.1101C2.823 11.9432 2.88806 11.7862 3.0061 11.6681L3.22864 11.4456C3.64636 11.0279 3.76855 10.4025 3.54016 9.85233L3.53662 9.84391C3.30908 9.29301 2.78064 8.93754 2.18982 8.93754L1.875 8.93754C1.5304 8.93754 1.25 8.65714 1.25 8.31254L1.25 7.68754C1.25 7.34293 1.5304 7.06254 1.875 7.06254L2.18982 7.06254C2.78052 7.06254 3.30908 6.70695 3.53625 6.15678L3.53992 6.14799C3.76855 5.5977 3.64636 4.97233 3.22864 4.55448L3.0061 4.33195C2.88794 4.21378 2.823 4.05692 2.823 3.88993C2.823 3.72306 2.88806 3.56608 3.0061 3.44804L3.448 3.00614C3.69177 2.76237 4.08826 2.76237 4.33191 3.00614L4.55444 3.22868C4.97217 3.6464 5.59753 3.76859 6.1477 3.54008L6.15478 3.53715C6.70703 3.30912 7.0625 2.78056 7.0625 2.18986L7.0625 1.87504C7.0625 1.53043 7.34289 1.25004 7.6875 1.25004L8.3125 1.25004C8.58716 1.25004 8.8269 1.4257 8.90906 1.68729C9.01245 2.01664 9.36328 2.19975 9.69263 2.09635C10.0218 1.99284 10.205 1.64201 10.1016 1.31278C9.85498 0.527627 9.13599 3.87013e-05 8.3125 3.87373e-05L7.6875 3.87646e-05C6.65369 3.88098e-05 5.8125 0.841103 5.8125 1.87504L5.8125 2.18986C5.8125 2.27262 5.76038 2.3477 5.67969 2.38102L5.67053 2.3848C5.58716 2.41935 5.49695 2.40336 5.43835 2.34477L5.21582 2.12223C4.48474 1.39115 3.29517 1.39115 2.56409 2.12223L2.12219 2.56413C1.76807 2.91825 1.573 3.38908 1.573 3.88993C1.573 4.39079 1.76807 4.86161 2.12219 5.21574L2.34473 5.43827C2.40332 5.49687 2.41931 5.58708 2.38574 5.66813L2.38061 5.68034C2.34766 5.76041 2.27258 5.81254 2.18982 5.81254L1.875 5.81254C0.841064 5.81254 -4.08544e-07 6.6536 -3.63349e-07 7.68754L-3.3603e-07 8.31254C-2.9084e-07 9.34635 0.841064 10.1875 1.875 10.1875L2.18982 10.1875C2.27258 10.1875 2.34766 10.2397 2.38098 10.3204L2.38586 10.3321C2.41931 10.4128 2.40332 10.5031 2.34473 10.5617L2.12219 10.7842C1.76807 11.1383 1.573 11.6093 1.573 12.11C1.573 12.6109 1.76807 13.0817 2.12219 13.436L2.56409 13.8778C3.29517 14.6089 4.48462 14.6089 5.2157 13.8778L5.43835 13.6553C5.49683 13.5967 5.58704 13.5806 5.66809 13.6143L5.68164 13.6199C5.76038 13.6524 5.8125 13.7275 5.8125 13.8102ZM9.38229 3.97262L12.8 0.548421C13.5311 -0.182658 14.7206 -0.182658 15.4516 0.548422C16.1827 1.2795 16.1827 2.46895 15.4521 3.19955L12.0284 6.63094C11.9558 6.70382 11.8662 6.75753 11.7677 6.78744L9.30746 7.53475C9.08932 7.60103 8.85251 7.54329 8.68942 7.38411C8.56711 7.26485 8.50082 7.10286 8.50082 6.93673C8.50082 6.88106 8.50827 6.82503 8.52353 6.76986L9.22238 4.24727C9.25107 4.14339 9.30612 4.04879 9.38229 3.97262ZM13.5644 3.32174L12.6804 2.4377L10.3831 4.73934L10.0316 6.0085L11.2544 5.63704L13.5644 3.32174ZM14.5678 2.31612C14.8115 2.07247 14.8115 1.67599 14.5678 1.43233C14.3241 1.18856 13.9276 1.18856 13.6843 1.43185L13.5634 1.55294L14.4474 2.43685L14.5678 2.31612Z",
          fill: "var(--smart-post-secondary)"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
          id: "clip0_16842_32757",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            width: 16,
            height: 16,
            fill: "white"
          })
        })
      })]
    })
  });
};
const AdvancedIcon = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-block-icon",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: 16,
      height: 16,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
        clipPath: "url(#a)",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "m14.666 6.667-1.6-.267c-.088-.267-.177-.533-.355-.8l.889-1.333c.178-.178.089-.445-.09-.623L12.267 2.4c-.088-.178-.355-.178-.533 0l-1.333.889c-.267-.178-.534-.267-.8-.356l-.267-1.6C9.244 1.067 9.066.89 8.89.89H7.11a.801.801 0 0 0-.533.533L6.31 2.933c-.267.09-.533.267-.8.356L4.178 2.4a.43.43 0 0 0-.623 0L2.311 3.733c-.178.09-.178.356 0 .623L3.2 5.689c-.09.178-.267.444-.356.8l-1.51.178c-.268.089-.445.266-.445.533v1.778c0 .266.177.444.444.444l1.6.267c.089.267.178.533.356.8l-.89 1.333c-.266.178-.266.445-.088.622l1.333 1.334a.547.547 0 0 0 .622.089l1.334-.89c.266.179.533.267.8.356l.266 1.6c.09.267.267.445.445.445h1.778c.266 0 .444-.178.444-.445l.267-1.6c.266-.089.533-.177.8-.355l1.333.889c.178.177.445.089.622-.09l1.245-1.244a.547.547 0 0 0 .089-.622l-.89-1.333c.179-.267.267-.534.356-.8l1.6-.267c.267-.089.445-.267.445-.444V7.289c-.09-.356-.267-.533-.534-.622Zm-6.666 4a2.58 2.58 0 0 1-2.578-2.578A2.58 2.58 0 0 1 8 5.51a2.58 2.58 0 0 1 2.578 2.578A2.58 2.58 0 0 1 8 10.667Z"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
          id: "a",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M0 0h16v16H0z"
          })
        })
      })]
    })
  });
};
const SliderIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
  className: "sp-smart-post-block-icon",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M10.52 11.8011C10.52 11.1053 11.0886 10.5283 11.7928 10.5283C12.497 10.5283 13.0656 11.1053 13.0656 11.8011C13.0656 12.5053 12.497 13.0739 11.7928 13.0739C11.0886 13.0739 10.52 12.5055 10.52 11.8011Z"
      //   fill="#F05D31"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M11.8177 15.0001H4.18143C2.42506 15.0001 0.999512 13.5831 0.999512 11.8182C0.999512 10.0618 2.42506 8.63623 4.18143 8.63623H11.8179C13.5741 8.63643 14.9997 10.0619 14.9997 11.8182C14.9997 13.5831 13.5741 15.0001 11.8177 15.0001ZM11.8177 9.90921H4.18143C3.12925 9.91776 2.27223 10.7662 2.27223 11.8184C2.27223 12.879 3.12921 13.7276 4.18143 13.7276H11.8179C12.8701 13.7276 13.7271 12.879 13.7271 11.8184C13.7269 10.7662 12.8699 9.91763 11.8177 9.90921Z"
      //   fill="#F05D31"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M5.47132 4.20734C5.47132 4.90315 4.90277 5.48011 4.19855 5.48011C3.50274 5.48011 2.92578 4.90315 2.92578 4.20734C2.92578 3.50313 3.50274 2.93457 4.19855 2.93457C4.90291 2.93457 5.47132 3.50317 5.47132 4.20734Z"
      //   fill="#F05D31"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M11.8177 7.36372H4.18143C2.42506 7.36372 0.999512 5.94685 0.999512 4.18192C0.999512 2.42555 2.42506 1 4.18143 1H11.8179C13.5741 1 14.9997 2.42555 14.9997 4.18192C14.9997 5.94672 13.5741 7.36372 11.8177 7.36372ZM11.8177 2.27285H4.18143C3.12925 2.2814 2.27223 3.12982 2.27223 4.18205C2.27223 5.24264 3.12921 6.09126 4.18143 6.09126H11.8179C12.8701 6.09126 13.7271 5.24268 13.7271 4.18205C13.7269 3.12986 12.8699 2.28127 11.8177 2.27285Z"
      //   fill="#F05D31"
    })]
  })
});

/***/ },

/***/ "./src/components/common/CustomTabs/tabConfig.js"
/*!*******************************************************!*\
  !*** ./src/components/common/CustomTabs/tabConfig.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabConfigs: () => (/* binding */ tabConfigs),
/* harmony export */   tabOrder: () => (/* binding */ tabOrder)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./src/components/common/CustomTabs/icons.js");

const tabConfigs = {
  layout: {
    name: 'layout',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.LayoutsIcon,
    label: 'Layouts',
    className: 'sp-smart-post-carousel-general-tab'
  },
  carousel: {
    name: 'carousel',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.CarouselIcon,
    label: 'Carousel',
    className: 'sp-smart-post-carousel-general-tab'
  },
  general: {
    name: 'general',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.GeneralIcon,
    label: 'General',
    className: 'sp-smart-post-carousel-general-tab'
  },
  style: {
    name: 'style',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.StyleIcon,
    label: 'Style',
    className: 'sp-smart-post-carousel-style-tab'
  },
  visibility: {
    name: 'visibility',
    icon: null,
    label: 'Visibility',
    className: 'sp-smart-post-carousel-visibility-tab'
  },
  advanced: {
    name: 'advanced',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.AdvancedIcon,
    label: 'Advanced',
    className: 'sp-smart-post-carousel-advanced-tab'
  },
  slider: {
    name: 'slider',
    icon: _icons__WEBPACK_IMPORTED_MODULE_0__.SliderIcon,
    label: 'Slider',
    className: 'sp-smart-post-carousel-advanced-tab'
  }
};
const tabOrder = [{
  key: 'layout',
  componentKey: 'LayoutTab'
}, {
  key: 'carousel',
  componentKey: 'CarouselTab'
}, {
  key: 'general',
  componentKey: 'GeneralTab'
}, {
  key: 'preset',
  componentKey: 'Preset'
}, {
  key: 'style',
  componentKey: 'StyleTab'
}, {
  key: 'visibility',
  componentKey: 'VisibilityTab'
}, {
  key: 'advanced',
  componentKey: 'AdvancedTab'
}, {
  key: 'slider',
  componentKey: 'SliderTab'
}];

/***/ },

/***/ "./src/components/common/CustomToggle/CustomToggle.js"
/*!************************************************************!*\
  !*** ./src/components/common/CustomToggle/CustomToggle.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomToggle/editor.scss");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function CustomToggle({
  label = "",
  value = false,
  attributesKey = "",
  setAttributes,
  onChange,
  updated = false
}) {
  const handleChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newValue => {
    if (typeof onChange === "function") {
      onChange(newValue);
      return;
    }
    setAttributes?.({
      [attributesKey]: newValue
    });
  }, [onChange, setAttributes, attributesKey]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: `sp-smart-post-carousel-toggle sp-smart-post-carousel-component-mb ${updated ? "toggle-update" : ""}`,
    children: [updated && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "sp-smart-post-carousel-toggle-left",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__.DndTitleIcon, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: "sp-smart-post-carousel-component-title",
        children: label
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
      label: updated ? "" : label,
      checked: value,
      onChange: handleChange
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(CustomToggle));

/***/ },

/***/ "./src/components/common/CustomToggle/editor.scss"
/*!********************************************************!*\
  !*** ./src/components/common/CustomToggle/editor.scss ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/CustomToggleGroupControl/CustomToggleGroupControl.js"
/*!************************************************************************************!*\
  !*** ./src/components/common/CustomToggleGroupControl/CustomToggleGroupControl.js ***!
  \************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/CustomToggleGroupControl/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const CustomToggleGroupControl = ({
  attributes,
  attributesKey,
  setAttributes,
  label = "",
  items = [],
  border = false,
  flexStyle = false,
  onClick,
  hasDivider = true,
  extraClass = ""
}) => {
  const value = attributes?.[attributesKey];
  const handleChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => {
    if (onClick) {
      onClick(newValue);
    } else {
      setAttributes({
        [attributesKey]: newValue
      });
    }
  }, [onClick, setAttributes, attributesKey]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp-smart-post-carousel-toggle-button-group-wrapper sp-smart-post-carousel-component-mb",
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "sp-smart-post-carousel-header",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "sp-smart-post-carousel-component-title",
        children: label
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControl, {
      className: `sp-smart-post-carousel-toggle-button-group sp-smart-post-carousel-component-mb${label ? "" : " sp-negative-space"}${flexStyle ? " sp-smart-post-carousel-d-flex button-style-2" : ""}`,
      value: value,
      onChange: handleChange,
      isBlock: true,
      __nextHasNoMarginBottom: true,
      __next40pxDefaultSize: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: `sp-smart-post-carousel-toggle-button-group-list${border ? " has-border" : ""}${hasDivider ? " sp-has-divider" : ""} ${extraClass}`,
        children: items.map(item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalToggleGroupControlOption, {
          value: item.value,
          label: item.label,
          showTooltip: !!item.tooltip,
          "aria-label": item.tooltip || item.label
        }, item.value))
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(CustomToggleGroupControl));

/***/ },

/***/ "./src/components/common/CustomToggleGroupControl/editor.scss"
/*!********************************************************************!*\
  !*** ./src/components/common/CustomToggleGroupControl/editor.scss ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/Layouts/Layouts.js"
/*!**************************************************!*\
  !*** ./src/components/common/Layouts/Layouts.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/Layouts/editor.scss");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);





function Layout({
  icon,
  value,
  label,
  isActive,
  onClick
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: `sp-smart-post-carousel-layout-card ${isActive ? "active" : "inactive"}`,
    onClick: onClick,
    children: [isActive && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "active-symbol",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__.RightSymbolIcon, {})
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "sp-smart-layout-img",
      children: icon
    }), label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: "sp-smart-post-carousel-layout-title",
      children: label
    })]
  });
}
function Layouts({
  attributes,
  setAttributes,
  attributesKey,
  label = "",
  grid = 2,
  items,
  onChange
}) {
  const handleActive = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newValue => {
    if (newValue === attributes[attributesKey]) return;
    onChange?.(newValue);
    setAttributes({
      [attributesKey]: newValue
    });
  }, [attributes, attributesKey, onChange, setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp-smart-post-carousel-layout-picker sp-smart-post-carousel-panel-pb",
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
      className: "sp-smart-post-carousel-component-title",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: `sp-smart-post-carousel-layouts grid-${grid}`,
      children: items.map(({
        icon,
        value,
        label
      }) => {
        const isActive = value === attributes[attributesKey];
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Layout, {
          icon: typeof icon === "function" ? icon(attributes) : icon,
          value: value,
          label: label,
          isActive: isActive,
          onClick: () => handleActive(value)
        }, value);
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(Layouts));

/***/ },

/***/ "./src/components/common/Layouts/editor.scss"
/*!***************************************************!*\
  !*** ./src/components/common/Layouts/editor.scss ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/components/common/Postcard/CategoryList.js"
/*!********************************************************!*\
  !*** ./src/components/common/Postcard/CategoryList.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function CategoryList({
  categories,
  className = ""
}) {
  if (!categories || categories.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "sp-smart-post-carousel-category",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
      className: `sp-smart-post-carousel-category-list ${className}`,
      children: categories.map(category => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: "sp-smart-post-carousel-category-list-item",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          href: `/category/${category.slug}`,
          className: "sp-smart-post-carousel-category-list-badge",
          title: category?.cat_name,
          children: category?.cat_name
        })
      }, category.term_id))
    })
  });
}

/***/ },

/***/ "./src/components/common/Postcard/MetaItem.js"
/*!****************************************************!*\
  !*** ./src/components/common/Postcard/MetaItem.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MetaItem)
/* harmony export */ });
/* harmony import */ var _smart_post_carousel_assets_metaIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/metaIcon */ "./src/smart-post-carousel/assets/metaIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function MetaItem({
  icon,
  text
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
    className: "sp-smart-post-carousel-card-meta-item",
    children: [_smart_post_carousel_assets_metaIcon__WEBPACK_IMPORTED_MODULE_0__.ICONS[icon], /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "sp-smart-post-carousel-card-meta-item-text",
      children: text
    })]
  });
}

/***/ },

/***/ "./src/components/common/Postcard/PostCard.js"
/*!****************************************************!*\
  !*** ./src/components/common/Postcard/PostCard.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils */ "./utils/index.js");
/* harmony import */ var _hooks_useDevice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hooks/useDevice */ "./src/hooks/useDevice.js");
/* harmony import */ var _CategoryList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CategoryList */ "./src/components/common/Postcard/CategoryList.js");
/* harmony import */ var _MetaItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MetaItem */ "./src/components/common/Postcard/MetaItem.js");
/* harmony import */ var _ReadingTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReadingTime */ "./src/components/common/Postcard/ReadingTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function PostCard({
  post,
  attributes
}) {
  const title = post?.title;
  const imageAlt = post?.image_alt || "featured image";
  const deviceType = (0,_hooks_useDevice__WEBPACK_IMPORTED_MODULE_1__.useDeviceType)();
  const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
  const {
    height,
    contentAlignment,
    equalHeight
  } = attributes;
  const author = post?._embedded?.author?.[0]?.name || post?.author || "Salah Uddin";
  const postDate = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getPostDate)(post);
  const commentsCount = post?.comment_count?.all || 0;
  const views = post?.view_count || 0;
  const likes = post?.like_count || 0;
  const image = post?.post_thumbnail_url || "http://localhost:10038/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png";

  // orientation class
  const orientation = attributes?.contentOrientation || "orientation_one";
  const cardClassName = `sp-smart-post-carousel-card ${orientation}${equalHeight ? " equal-height" : ""}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: cardClassName,
    style: {
      "--cardHeight": !equalHeight ? `${height[normalizedDeviceType]}px` : undefined
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "sp-smart-post-carousel-card-image",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
        src: image,
        alt: imageAlt
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp-smart-post-carousel-overlay-category",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_CategoryList__WEBPACK_IMPORTED_MODULE_2__["default"], {
          categories: post.category
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "sp-smart-post-carousel-date",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "sp-smart-post-carousel-day",
          children: postDate.day
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
          className: "sp-smart-post-carousel-month-year",
          children: [postDate.month, " ", postDate.year]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "sp-smart-post-carousel-template-content",
      style: {
        "--alignment": `${contentAlignment}`
      },
      children: [orientation !== "orientation_three" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_CategoryList__WEBPACK_IMPORTED_MODULE_2__["default"], {
        categories: post.category
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
        className: "sp-smart-post-carousel-card-title",
        dangerouslySetInnerHTML: {
          __html: title
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "sp-smart-post-carousel-card-meta-wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MetaItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          icon: "author",
          text: author
        }), orientation !== "orientation_two" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MetaItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          icon: "date",
          text: postDate.meta
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MetaItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          icon: "comments",
          text: commentsCount
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MetaItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          icon: "views",
          text: views
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_MetaItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          icon: "likes",
          text: likes
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ReadingTime__WEBPACK_IMPORTED_MODULE_4__.ReadingTime, {
          content: post.content,
          attributes: attributes
        })]
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostCard);

/***/ },

/***/ "./src/components/common/Postcard/ReadingTime.js"
/*!*******************************************************!*\
  !*** ./src/components/common/Postcard/ReadingTime.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReadingTime: () => (/* binding */ ReadingTime)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TotalTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TotalTime */ "./src/components/common/Postcard/TotalTime.js");
/* harmony import */ var _smart_post_carousel_assets_metaIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/metaIcon */ "./src/smart-post-carousel/assets/metaIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const ReadingTime = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(({
  content,
  attributes
}) => {
  const {
    metaReadingTimePostfix = "read",
    metaPerMin = {
      unit: "words",
      value: 200
    }
  } = attributes;
  if (!content) return null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
    className: "sp-smart-post-carousel-card-meta-item",
    children: [_smart_post_carousel_assets_metaIcon__WEBPACK_IMPORTED_MODULE_2__.ICONS["clock"], /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "sp-smart-post-carousel-card-meta-item-text",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TotalTime__WEBPACK_IMPORTED_MODULE_1__.TotalTime, {
        content: content,
        metaPrefix: metaReadingTimePostfix,
        metaPerMin: metaPerMin
      })
    })]
  });
});

/***/ },

/***/ "./src/components/common/Postcard/TotalTime.js"
/*!*****************************************************!*\
  !*** ./src/components/common/Postcard/TotalTime.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TotalTime: () => (/* binding */ TotalTime)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils */ "./utils/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const TotalTime = ({
  content,
  metaPrefix,
  metaPerMin
}) => {
  const {
    words,
    chars
  } = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.countWordAndCharacter)(content);
  const unit = metaPerMin?.unit || "words";
  const perMin = Number(metaPerMin?.value || 200);
  const total = unit === "chars" ? chars : words;
  const minutes = Math.max(1, Math.ceil(total / perMin));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [minutes, " Min ", metaPrefix]
  });
};

/***/ },

/***/ "./src/components/common/SelectDropDown/SelectDropDown.js"
/*!****************************************************************!*\
  !*** ./src/components/common/SelectDropDown/SelectDropDown.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./src/components/common/SelectDropDown/editor.scss");
/* harmony import */ var _SelectDropDownField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectDropDownField */ "./src/components/common/SelectDropDown/SelectDropDownField.js");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







function SelectDropDown({
  label,
  options,
  attributes,
  setAttributes,
  attributesKey,
  onClick = null,
  className = "",
  onClose
}) {
  const [isPopoverOpen, setIsPopoverOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const buttonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "sp-smart-post-carousel-dropdown-wrapper",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)(label, "smart-post-carousel")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ref: buttonRef,
      onClick: () => setIsPopoverOpen(prev => !prev),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_3__.PopUpIcon, {
        isActive: isPopoverOpen
      })
    }), isPopoverOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, {
      anchor: buttonRef.current,
      onClose: () => setIsPopoverOpen(false),
      placement: "bottom-start",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SelectDropDownField__WEBPACK_IMPORTED_MODULE_2__["default"], {
        options: options,
        attributes: attributes,
        setAttributes: setAttributes,
        attributesKey: attributesKey,
        className: className,
        onClick: onClick,
        onClose: onClose
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectDropDown);

/***/ },

/***/ "./src/components/common/SelectDropDown/SelectDropDownField.js"
/*!*********************************************************************!*\
  !*** ./src/components/common/SelectDropDown/SelectDropDownField.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const SelectDropDownField = ({
  options,
  attributes,
  setAttributes,
  attributesKey,
  onClick = null,
  className = "",
  onClose
}) => {
  const selectHandler = value => {
    if (onClick) {
      onClick(value);
    } else {
      setAttributes({
        [attributesKey]: value
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
    className: `sp-smart-post-carousel-select-dropdown ${className}`,
    children: options?.map((option, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
      className: `sp-smart-post-carousel-select-dropdown-option ${attributes === option.value ? "active" : ""}`,
      onClick: () => {
        selectHandler(option.value);
        if (typeof onClose === "function") {
          onClose();
        }
      },
      children: [option.label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        children: option.label
      }), option.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        children: option.icon
      })]
    }, index))
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectDropDownField);

/***/ },

/***/ "./src/components/common/SelectDropDown/editor.scss"
/*!**********************************************************!*\
  !*** ./src/components/common/SelectDropDown/editor.scss ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/const/index.js"
/*!****************************!*\
  !*** ./src/const/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutItems: () => (/* binding */ LayoutItems),
/* harmony export */   OrientationItems: () => (/* binding */ OrientationItems),
/* harmony export */   animationEffect: () => (/* binding */ animationEffect),
/* harmony export */   arrowIconOptions: () => (/* binding */ arrowIconOptions),
/* harmony export */   arrowIcons: () => (/* binding */ arrowIcons),
/* harmony export */   backGroundColorConfig: () => (/* binding */ backGroundColorConfig),
/* harmony export */   colorConfig: () => (/* binding */ colorConfig),
/* harmony export */   linkOpen: () => (/* binding */ linkOpen)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../smart-post-carousel/assets/arrowIcons */ "./src/smart-post-carousel/assets/arrowIcons.js");
/* harmony import */ var _smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../smart-post-carousel/assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var _smart_post_carousel_assets_orientationIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../smart-post-carousel/assets/orientationIcon */ "./src/smart-post-carousel/assets/orientationIcon/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const LayoutItems = [{
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__.CarouselStandardIcon, {
      value: activeValue.carouselStyle === "standard"
    });
  },
  label: "Standard",
  value: "standard"
}, {
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_icon__WEBPACK_IMPORTED_MODULE_2__.CarouselTickerIcon, {
      value: activeValue.carouselStyle === "ticker"
    });
  },
  label: "Ticker",
  value: "ticker"
}];
const OrientationItems = [{
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_orientationIcon__WEBPACK_IMPORTED_MODULE_3__.OrientationOneIcon, {
      value: activeValue.contentOrientation === "orientation_one"
    });
  },
  value: "orientation_one"
}, {
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_orientationIcon__WEBPACK_IMPORTED_MODULE_3__.OrientationTwoIcon, {
      value: activeValue.contentOrientation === "orientation_two"
    });
  },
  value: "orientation_two"
}, {
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_orientationIcon__WEBPACK_IMPORTED_MODULE_3__.OrientationThreeIcon, {
      value: activeValue.contentOrientation === "orientation_three"
    });
  },
  value: "orientation_three"
}, {
  icon: activeValue => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_orientationIcon__WEBPACK_IMPORTED_MODULE_3__.OrientationFourIcon, {
      value: activeValue.contentOrientation === "orientation_four"
    });
  },
  value: "orientation_four"
}];
const linkOpen = [{
  label: "Current Tab",
  value: "currentTab"
}, {
  label: "New tab",
  value: "newTab"
}];
const animationEffect = [{
  label: "Slide",
  value: "slide"
}, {
  label: "Coverflow",
  value: "cover"
}, {
  label: "Fade",
  value: "fade"
}, {
  label: "Cube",
  value: "cube"
}, {
  label: "Flip",
  value: "flip"
}];
const arrowIcons = {
  "chevron-solid": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronSolid,
  "chevron-outline": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronOutline,
  "chevron-bold": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronBold,
  "double-chevron": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.DoubleChevron,
  "arrow-solid": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowSolid,
  "arrow-outline": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowOutline,
  "arrow-minimal": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowMinimal,
  "chevron-border-line": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronBorderLine,
  "double-chevron-outline": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.DoubleChevronOutline,
  "triangle-outline": _smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.TriangleOutline
};
const arrowIconOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Chevron Solid", "smart-post-carousel"),
  value: "chevron-solid",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronSolid, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Chevron Outline", "smart-post-carousel"),
  value: "chevron-outline",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronOutline, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Chevron Bold", "smart-post-carousel"),
  value: "chevron-bold",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronBold, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Double Chevron", "smart-post-carousel"),
  value: "double-chevron",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.DoubleChevron, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Arrow Solid", "smart-post-carousel"),
  value: "arrow-solid",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowSolid, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Arrow Outline", "smart-post-carousel"),
  value: "arrow-outline",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowOutline, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Arrow Minimal", "smart-post-carousel"),
  value: "arrow-minimal",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ArrowMinimal, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Chevron Border Line", "smart-post-carousel"),
  value: "chevron-border-line",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.ChevronBorderLine, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Double Chevron Outline", "smart-post-carousel"),
  value: "double-chevron-outline",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.DoubleChevronOutline, {})
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Triangle Outline", "smart-post-carousel"),
  value: "triangle-outline",
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_smart_post_carousel_assets_arrowIcons__WEBPACK_IMPORTED_MODULE_1__.TriangleOutline, {})
}];
const colorConfig = {
  normal: {
    label: "Color",
    attributeKey: "iconColor",
    defaultValue: "#ffffff"
  },
  hover: {
    label: "Color",
    attributeKey: "iconHoverColor",
    defaultValue: "#ffffff"
  }
};
const backGroundColorConfig = {
  normal: {
    label: "Background Color",
    attributeKey: "iconBackGroundColor",
    defaultValue: "#4e4f52"
  },
  hover: {
    label: "Hover Background Color",
    attributeKey: "iconBackGroundHoverColor",
    defaultValue: "#4e6e3e"
  }
};

/***/ },

/***/ "./src/context/AttributesContext.js"
/*!******************************************!*\
  !*** ./src/context/AttributesContext.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributesContext: () => (/* binding */ AttributesContext),
/* harmony export */   AttributesProvider: () => (/* binding */ AttributesProvider)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const AttributesContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();
const AttributesProvider = ({
  attributes,
  setAttributes,
  children
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AttributesContext.Provider, {
    value: {
      attributes,
      setAttributes
    },
    children: children
  });
};

/***/ },

/***/ "./src/context/PanelContext.js"
/*!*************************************!*\
  !*** ./src/context/PanelContext.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelContext: () => (/* binding */ PanelContext),
/* harmony export */   PanelProvider: () => (/* binding */ PanelProvider)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const PanelContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();
function PanelProvider({
  children
}) {
  const [openPanel, setOpenPanel] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("carousel");
  const togglePanel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(panelName => {
    setOpenPanel(prev => prev === panelName ? "" : panelName);
  }, []);
  const value = {
    openPanel,
    togglePanel
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(PanelContext.Provider, {
    value: value,
    children: children
  });
}

/***/ },

/***/ "./src/context/index.js"
/*!******************************!*\
  !*** ./src/context/index.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributesProvider: () => (/* reexport safe */ _AttributesContext__WEBPACK_IMPORTED_MODULE_1__.AttributesProvider),
/* harmony export */   PanelProvider: () => (/* reexport safe */ _PanelContext__WEBPACK_IMPORTED_MODULE_0__.PanelProvider)
/* harmony export */ });
/* harmony import */ var _PanelContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelContext */ "./src/context/PanelContext.js");
/* harmony import */ var _AttributesContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AttributesContext */ "./src/context/AttributesContext.js");



/***/ },

/***/ "./src/hooks/useApi.js"
/*!*****************************!*\
  !*** ./src/hooks/useApi.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function useApi(queryParams = {
  posts_per_page: 1
}) {
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const formData = new FormData();
    formData.append("action", "sp_get_posts");
    formData.append("nonce", sp_smart_post_block_localize.nonce);
    formData.append("queryData", JSON.stringify(queryParams));
    fetch(sp_smart_post_block_localize.ajax_url, {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(res => {
      if (res.success) {
        setPosts(res.data.posts);
      }
    }).catch(error => {
      /* eslint-disable */console.error(...oo_tx(`1032743959_24_4_24_49_11`, "Error fetching posts:", error));
    }).finally(() => {
      setLoading(false);
    });
  }, [JSON.stringify(queryParams)]);
  return {
    posts,
    loading
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useApi);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x27f4ea=_0x5cf7;function _0x36d9(){var _0x2a7840=['690392SBBGXD','ninjaSuppressConsole','level','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_connected','map','_isNegativeZero','getWebSocketClass','_Symbol','5016Girvng','cappedElements','props','negativeInfinity','astro','split','_socket','count','10.0.2.2','forEach','message','85491CEGaSW','getOwnPropertyNames','[object\\x20BigInt]','onopen','expo','depth','stack','prototype','_dateToString','_sortProps','setter','undefined','autoExpandMaxDepth','_reconnectTimeout','[object\\x20Array]','_propertyName','_isPrimitiveType','url','match','_setNodeQueryPath','_p_name','_objectToString','bigint','reducedLimits','env','constructor','[object\\x20Set]','String','_hasSymbolPropertyOnItsPath','196xjkxBf','osName','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_connectAttemptCount','resetOnProcessingTimeAverageMs','parent','_ws','_p_','_getOwnPropertyDescriptor','_sendErrorMessage','replace','readyState','get','data','totalStrLength','reducePolicy','function','_additionalMetadata','angular','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','Map','elements','current','_type','autoExpandPropertyCount','endsWith','isExpressionToEvaluate','resetWhenQuietMs','_isMap','_inBrowser','_blacklistedProperty','host','_maxConnectAttemptCount','1.0.0','_hasSetOnItsPath','length','_setNodeLabel','_ninjaIgnoreNextError','negativeZero','Symbol','disabledLog','127.0.0.1','RegExp','origin','[object\\x20Date]','bound\\x20Promise','index','iterator','trace','react-native','_HTMLAllCollection','autoExpand','object','funcName','_console_ninja','node','WebSocket','log','some','_console_ninja_session','versions','disabledTrace','push','call','unknown','timeStamp','_addObjectProperty','_connecting','POSITIVE_INFINITY','startsWith','hostname','next.js','modules','noFunctions','serialize','positiveInfinity','expressionsToEvaluate','_disposeWebsocket','process','concat','_isArray','charAt','capped','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','_setNodePermissions','name','gateway.docker.internal','\\x20browser','import(\\x27path\\x27)','performance','_addFunctionsNode','onmessage','stackTraceLimit','getOwnPropertyDescriptor','10816xJVhzh','_webSocketErrorDocsLink','_WebSocket','allStrLength','remix','_hasMapOnItsPath','resolveGetters','cappedProps','getOwnPropertySymbols','substr','_connectToHostNow','_consoleNinjaAllowedToStart','toString','_processTreeNodeResult','_quotedRegExp','bind','Boolean','string','strLength','dockerizedApp','eventReceivedCallback','sortProps','autoExpandPreviousObjects','global','android','HTMLAllCollection','location','catch','reduceOnAccumulatedProcessingTimeMs','includes','send','reload','6410qFSoKL','_inNextEdge','\\x20server','default','array','defaultLimits','ws://','unref','test','1771338722557','_allowedToSend','_keyStrRegExp','NEXT_RUNTIME','args','hasOwnProperty',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"MSI\",\"192.168.69.130\"],'','Number','Promise','NEGATIVE_INFINITY','_extendedWarning','root_exp_id','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','valueOf','https://tinyurl.com/37x8b79t','close','time','Buffer','_capIfString','fromCharCode','perf_hooks','console','reduceOnCount','_numberRegExp','perLogpoint','_attemptToReconnectShortly','resolve','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','autoExpandLimit','_WebSocketClass','hits','Set','[object\\x20Map]','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','reduceLimits','_setNodeExpressionPath','78anopaZ','_setNodeId','import(\\x27url\\x27)','_cleanNode','_allowedToConnectOnSend','coverage','_addLoadNode','284330UEndtY','nodeModules',\"c:\\\\Users\\\\USER\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.515\\\\node_modules\",'_regExpToString','_treeNodePropertiesBeforeFullValue','value','_treeNodePropertiesAfterFullValue','_isUndefined',',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','symbol','edge','number','toUpperCase','date','isArray','_getOwnPropertyNames','null','_addProperty','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','now','hrtime','warn','toLowerCase','stringify','error','475200jRFXVC','_isPrimitiveWrapperType','onerror','pop','12429FzEnku','_undefined','onclose','type','_isSet'];_0x36d9=function(){return _0x2a7840;};return _0x36d9();}(function(_0x247d5a,_0x341b8b){var _0x3f55d1=_0x5cf7,_0x36495b=_0x247d5a();while(!![]){try{var _0x14d248=-parseInt(_0x3f55d1(0x1dc))/0x1*(-parseInt(_0x3f55d1(0x18e))/0x2)+-parseInt(_0x3f55d1(0x20e))/0x3*(parseInt(_0x3f55d1(0x130))/0x4)+-parseInt(_0x3f55d1(0x1e3))/0x5+-parseInt(_0x3f55d1(0x1fc))/0x6+-parseInt(_0x3f55d1(0x219))/0x7+-parseInt(_0x3f55d1(0x205))/0x8+parseInt(_0x3f55d1(0x200))/0x9*(parseInt(_0x3f55d1(0x1ae))/0xa);if(_0x14d248===_0x341b8b)break;else _0x36495b['push'](_0x36495b['shift']());}catch(_0x4c7c25){_0x36495b['push'](_0x36495b['shift']());}}}(_0x36d9,0xf1d4b));function z(_0x22e966,_0x2a08d4,_0x1d9d5f,_0x18eca4,_0x226865,_0x14e3c8){var _0x3d90b1=_0x5cf7,_0x4c08d3,_0x3dfd9f,_0x48683c,_0x7da6d3;this[_0x3d90b1(0x1a5)]=_0x22e966,this[_0x3d90b1(0x14f)]=_0x2a08d4,this['port']=_0x1d9d5f,this['nodeModules']=_0x18eca4,this[_0x3d90b1(0x1a1)]=_0x226865,this[_0x3d90b1(0x1a2)]=_0x14e3c8,this[_0x3d90b1(0x1b8)]=!0x0,this[_0x3d90b1(0x1e0)]=!0x0,this[_0x3d90b1(0x209)]=!0x1,this[_0x3d90b1(0x173)]=!0x1,this['_inNextEdge']=((_0x3dfd9f=(_0x4c08d3=_0x22e966[_0x3d90b1(0x17e)])==null?void 0x0:_0x4c08d3[_0x3d90b1(0x231)])==null?void 0x0:_0x3dfd9f[_0x3d90b1(0x1ba)])==='edge',this[_0x3d90b1(0x14d)]=!((_0x7da6d3=(_0x48683c=this[_0x3d90b1(0x1a5)][_0x3d90b1(0x17e)])==null?void 0x0:_0x48683c[_0x3d90b1(0x16c)])!=null&&_0x7da6d3['node'])&&!this['_inNextEdge'],this[_0x3d90b1(0x1d5)]=null,this['_connectAttemptCount']=0x0,this[_0x3d90b1(0x150)]=0x14,this['_webSocketErrorDocsLink']=_0x3d90b1(0x1c6),this[_0x3d90b1(0x139)]=(this[_0x3d90b1(0x14d)]?_0x3d90b1(0x1c4):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this[_0x3d90b1(0x18f)];}z[_0x27f4ea(0x220)][_0x27f4ea(0x20c)]=async function(){var _0x4e9ea2=_0x27f4ea,_0x1bd897,_0x37180d;if(this[_0x4e9ea2(0x1d5)])return this[_0x4e9ea2(0x1d5)];let _0x5520cf;if(this['_inBrowser']||this[_0x4e9ea2(0x1af)])_0x5520cf=this[_0x4e9ea2(0x1a5)][_0x4e9ea2(0x168)];else{if((_0x1bd897=this['global'][_0x4e9ea2(0x17e)])!=null&&_0x1bd897[_0x4e9ea2(0x190)])_0x5520cf=(_0x37180d=this[_0x4e9ea2(0x1a5)][_0x4e9ea2(0x17e)])==null?void 0x0:_0x37180d[_0x4e9ea2(0x190)];else try{_0x5520cf=(await new Function('path',_0x4e9ea2(0x22a),'nodeModules',_0x4e9ea2(0x183))(await(0x0,eval)(_0x4e9ea2(0x188)),await(0x0,eval)(_0x4e9ea2(0x1de)),this[_0x4e9ea2(0x1e4)]))[_0x4e9ea2(0x1b1)];}catch{try{_0x5520cf=require(require('path')['join'](this['nodeModules'],'ws'));}catch{throw new Error(_0x4e9ea2(0x1d9));}}}return this[_0x4e9ea2(0x1d5)]=_0x5520cf,_0x5520cf;},z[_0x27f4ea(0x220)][_0x27f4ea(0x198)]=function(){var _0x80449b=_0x27f4ea;this[_0x80449b(0x173)]||this[_0x80449b(0x209)]||this[_0x80449b(0x133)]>=this[_0x80449b(0x150)]||(this[_0x80449b(0x1e0)]=!0x1,this[_0x80449b(0x173)]=!0x0,this[_0x80449b(0x133)]++,this[_0x80449b(0x136)]=new Promise((_0x3afb54,_0x4b1721)=>{var _0x5882d6=_0x80449b;this['getWebSocketClass']()['then'](_0xa2a631=>{var _0x427cc4=_0x5cf7;let _0x50f21b=new _0xa2a631(_0x427cc4(0x1b4)+(!this[_0x427cc4(0x14d)]&&this[_0x427cc4(0x1a1)]?_0x427cc4(0x186):this['host'])+':'+this['port']);_0x50f21b[_0x427cc4(0x1fe)]=()=>{var _0x4a2b6b=_0x427cc4;this[_0x4a2b6b(0x1b8)]=!0x1,this[_0x4a2b6b(0x17d)](_0x50f21b),this[_0x4a2b6b(0x1d1)](),_0x4b1721(new Error('logger\\x20websocket\\x20error'));},_0x50f21b[_0x427cc4(0x21c)]=()=>{var _0x765837=_0x427cc4;this[_0x765837(0x14d)]||_0x50f21b['_socket']&&_0x50f21b['_socket'][_0x765837(0x1b5)]&&_0x50f21b[_0x765837(0x214)]['unref'](),_0x3afb54(_0x50f21b);},_0x50f21b[_0x427cc4(0x202)]=()=>{var _0x1f14a0=_0x427cc4;this[_0x1f14a0(0x1e0)]=!0x0,this['_disposeWebsocket'](_0x50f21b),this['_attemptToReconnectShortly']();},_0x50f21b[_0x427cc4(0x18b)]=_0x20f72d=>{var _0x2c8687=_0x427cc4;try{if(!(_0x20f72d!=null&&_0x20f72d[_0x2c8687(0x13d)])||!this[_0x2c8687(0x1a2)])return;let _0x31e1bb=JSON['parse'](_0x20f72d[_0x2c8687(0x13d)]);this['eventReceivedCallback'](_0x31e1bb['method'],_0x31e1bb[_0x2c8687(0x1bb)],this[_0x2c8687(0x1a5)],this[_0x2c8687(0x14d)]);}catch{}};})['then'](_0x47392a=>(this[_0x5882d6(0x209)]=!0x0,this[_0x5882d6(0x173)]=!0x1,this[_0x5882d6(0x1e0)]=!0x1,this[_0x5882d6(0x1b8)]=!0x0,this['_connectAttemptCount']=0x0,_0x47392a))['catch'](_0x557458=>(this['_connected']=!0x1,this[_0x5882d6(0x173)]=!0x1,console[_0x5882d6(0x1f8)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x5882d6(0x18f)]),_0x4b1721(new Error(_0x5882d6(0x143)+(_0x557458&&_0x557458[_0x5882d6(0x218)])))));}));},z['prototype'][_0x27f4ea(0x17d)]=function(_0x1f0a2c){var _0x4bf2ff=_0x27f4ea;this[_0x4bf2ff(0x209)]=!0x1,this['_connecting']=!0x1;try{_0x1f0a2c[_0x4bf2ff(0x202)]=null,_0x1f0a2c[_0x4bf2ff(0x1fe)]=null,_0x1f0a2c[_0x4bf2ff(0x21c)]=null;}catch{}try{_0x1f0a2c[_0x4bf2ff(0x13b)]<0x2&&_0x1f0a2c[_0x4bf2ff(0x1c7)]();}catch{}},z['prototype'][_0x27f4ea(0x1d1)]=function(){var _0x341bb2=_0x27f4ea;clearTimeout(this['_reconnectTimeout']),!(this[_0x341bb2(0x133)]>=this['_maxConnectAttemptCount'])&&(this[_0x341bb2(0x226)]=setTimeout(()=>{var _0x43bebd=_0x341bb2,_0x5a79f4;this[_0x43bebd(0x209)]||this[_0x43bebd(0x173)]||(this[_0x43bebd(0x198)](),(_0x5a79f4=this[_0x43bebd(0x136)])==null||_0x5a79f4[_0x43bebd(0x1a9)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x341bb2(0x226)]['unref']&&this[_0x341bb2(0x226)]['unref']());},z[_0x27f4ea(0x220)]['send']=async function(_0x1313ed){var _0x479ef0=_0x27f4ea;try{if(!this[_0x479ef0(0x1b8)])return;this[_0x479ef0(0x1e0)]&&this[_0x479ef0(0x198)](),(await this[_0x479ef0(0x136)])[_0x479ef0(0x1ac)](JSON[_0x479ef0(0x1fa)](_0x1313ed));}catch(_0x11a87c){this[_0x479ef0(0x1c2)]?console[_0x479ef0(0x1f8)](this['_sendErrorMessage']+':\\x20'+(_0x11a87c&&_0x11a87c['message'])):(this[_0x479ef0(0x1c2)]=!0x0,console['warn'](this[_0x479ef0(0x139)]+':\\x20'+(_0x11a87c&&_0x11a87c['message']),_0x1313ed)),this[_0x479ef0(0x1b8)]=!0x1,this['_attemptToReconnectShortly']();}};function H(_0x43f896,_0x3f2f5a,_0x564161,_0x3241a8,_0x188d9c,_0x4c2c16,_0x44730f,_0x647db1=ne){var _0x3bb3cc=_0x27f4ea;let _0x1007b5=_0x564161[_0x3bb3cc(0x213)](',')[_0x3bb3cc(0x20a)](_0xc6ed03=>{var _0x401a03=_0x3bb3cc,_0x3c5a4a,_0x19fd6e,_0x46c009,_0x48f9f6,_0x4f2fb0,_0x3aa464,_0x5e5b35,_0x28c6b8;try{if(!_0x43f896[_0x401a03(0x16b)]){let _0x12ab8a=((_0x19fd6e=(_0x3c5a4a=_0x43f896[_0x401a03(0x17e)])==null?void 0x0:_0x3c5a4a[_0x401a03(0x16c)])==null?void 0x0:_0x19fd6e['node'])||((_0x48f9f6=(_0x46c009=_0x43f896['process'])==null?void 0x0:_0x46c009['env'])==null?void 0x0:_0x48f9f6[_0x401a03(0x1ba)])===_0x401a03(0x1ed);(_0x188d9c===_0x401a03(0x177)||_0x188d9c===_0x401a03(0x192)||_0x188d9c===_0x401a03(0x212)||_0x188d9c===_0x401a03(0x142))&&(_0x188d9c+=_0x12ab8a?_0x401a03(0x1b0):_0x401a03(0x187));let _0x1e2f73='';_0x188d9c==='react-native'&&(_0x1e2f73=(((_0x5e5b35=(_0x3aa464=(_0x4f2fb0=_0x43f896[_0x401a03(0x21d)])==null?void 0x0:_0x4f2fb0[_0x401a03(0x178)])==null?void 0x0:_0x3aa464['ExpoDevice'])==null?void 0x0:_0x5e5b35[_0x401a03(0x131)])||'emulator')['toLowerCase'](),_0x1e2f73&&(_0x188d9c+='\\x20'+_0x1e2f73,(_0x1e2f73===_0x401a03(0x1a6)||_0x1e2f73==='emulator'&&((_0x28c6b8=_0x43f896[_0x401a03(0x1a8)])==null?void 0x0:_0x28c6b8[_0x401a03(0x176)])===_0x401a03(0x216))&&(_0x3f2f5a=_0x401a03(0x216)))),_0x43f896[_0x401a03(0x16b)]={'id':+new Date(),'tool':_0x188d9c},_0x44730f&&_0x188d9c&&!_0x12ab8a&&(_0x1e2f73?console[_0x401a03(0x169)](_0x401a03(0x1f5)+_0x1e2f73+_0x401a03(0x1eb)):console[_0x401a03(0x169)](_0x401a03(0x208)+(_0x188d9c[_0x401a03(0x181)](0x0)[_0x401a03(0x1ef)]()+_0x188d9c[_0x401a03(0x197)](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x401a03(0x1d3)));}let _0xb4d9e8=new z(_0x43f896,_0x3f2f5a,_0xc6ed03,_0x3241a8,_0x4c2c16,_0x647db1);return _0xb4d9e8[_0x401a03(0x1ac)][_0x401a03(0x19d)](_0xb4d9e8);}catch(_0x442a97){return console[_0x401a03(0x1f8)](_0x401a03(0x132),_0x442a97&&_0x442a97[_0x401a03(0x218)]),()=>{};}});return _0xd71c01=>_0x1007b5[_0x3bb3cc(0x217)](_0x107bc8=>_0x107bc8(_0xd71c01));}function _0x5cf7(_0x4902ba,_0x15b27a){var _0x36d92a=_0x36d9();return _0x5cf7=function(_0x5cf752,_0xb98aab){_0x5cf752=_0x5cf752-0x12c;var _0xc44896=_0x36d92a[_0x5cf752];return _0xc44896;},_0x5cf7(_0x4902ba,_0x15b27a);}function ne(_0x555c7e,_0x5dc757,_0x561da1,_0x9c004d){var _0x1a4a8b=_0x27f4ea;_0x9c004d&&_0x555c7e===_0x1a4a8b(0x1ad)&&_0x561da1[_0x1a4a8b(0x1a8)]['reload']();}function b(_0xfaeee1){var _0x56d18c=_0x27f4ea,_0x188689,_0x5b92be;let _0x239e1b=function(_0x3eb629,_0x35dec7){return _0x35dec7-_0x3eb629;},_0x4baa4c;if(_0xfaeee1[_0x56d18c(0x189)])_0x4baa4c=function(){var _0x208582=_0x56d18c;return _0xfaeee1['performance'][_0x208582(0x1f6)]();};else{if(_0xfaeee1[_0x56d18c(0x17e)]&&_0xfaeee1[_0x56d18c(0x17e)][_0x56d18c(0x1f7)]&&((_0x5b92be=(_0x188689=_0xfaeee1['process'])==null?void 0x0:_0x188689[_0x56d18c(0x231)])==null?void 0x0:_0x5b92be['NEXT_RUNTIME'])!=='edge')_0x4baa4c=function(){var _0x408a1c=_0x56d18c;return _0xfaeee1[_0x408a1c(0x17e)][_0x408a1c(0x1f7)]();},_0x239e1b=function(_0x10287d,_0x486a40){return 0x3e8*(_0x486a40[0x0]-_0x10287d[0x0])+(_0x486a40[0x1]-_0x10287d[0x1])/0xf4240;};else try{let {performance:_0x173e16}=require(_0x56d18c(0x1cc));_0x4baa4c=function(){var _0x2af0e6=_0x56d18c;return _0x173e16[_0x2af0e6(0x1f6)]();};}catch{_0x4baa4c=function(){return+new Date();};}}return{'elapsed':_0x239e1b,'timeStamp':_0x4baa4c,'now':()=>Date[_0x56d18c(0x1f6)]()};}function X(_0x5acfc3,_0x43f290,_0x403f1a){var _0xc745c8=_0x27f4ea,_0xdb41c8,_0x409db3,_0x56987f,_0x522b44,_0x101e79,_0x272ca2,_0x16bceb;if(_0x5acfc3['_consoleNinjaAllowedToStart']!==void 0x0)return _0x5acfc3[_0xc745c8(0x199)];let _0x525d88=((_0x409db3=(_0xdb41c8=_0x5acfc3['process'])==null?void 0x0:_0xdb41c8[_0xc745c8(0x16c)])==null?void 0x0:_0x409db3[_0xc745c8(0x167)])||((_0x522b44=(_0x56987f=_0x5acfc3[_0xc745c8(0x17e)])==null?void 0x0:_0x56987f['env'])==null?void 0x0:_0x522b44[_0xc745c8(0x1ba)])===_0xc745c8(0x1ed),_0x288ae3=!!(_0x403f1a===_0xc745c8(0x161)&&((_0x101e79=_0x5acfc3['expo'])==null?void 0x0:_0x101e79[_0xc745c8(0x178)]));function _0x5badf3(_0x4edc3a){var _0x169944=_0xc745c8;if(_0x4edc3a[_0x169944(0x175)]('/')&&_0x4edc3a[_0x169944(0x149)]('/')){let _0x55c867=new RegExp(_0x4edc3a['slice'](0x1,-0x1));return _0x48fd8b=>_0x55c867['test'](_0x48fd8b);}else{if(_0x4edc3a['includes']('*')||_0x4edc3a[_0x169944(0x1ab)]('?')){let _0x42f4be=new RegExp('^'+_0x4edc3a[_0x169944(0x13a)](/\\./g,String[_0x169944(0x1cb)](0x5c)+'.')[_0x169944(0x13a)](/\\*/g,'.*')[_0x169944(0x13a)](/\\?/g,'.')+String[_0x169944(0x1cb)](0x24));return _0x169184=>_0x42f4be['test'](_0x169184);}else return _0xbfa32d=>_0xbfa32d===_0x4edc3a;}}let _0x1b436a=_0x43f290[_0xc745c8(0x20a)](_0x5badf3);return _0x5acfc3[_0xc745c8(0x199)]=_0x525d88||!_0x43f290,!_0x5acfc3[_0xc745c8(0x199)]&&((_0x272ca2=_0x5acfc3['location'])==null?void 0x0:_0x272ca2[_0xc745c8(0x176)])&&(_0x5acfc3[_0xc745c8(0x199)]=_0x1b436a[_0xc745c8(0x16a)](_0x2f1a62=>_0x2f1a62(_0x5acfc3[_0xc745c8(0x1a8)][_0xc745c8(0x176)]))),_0x288ae3&&!_0x5acfc3[_0xc745c8(0x199)]&&!((_0x16bceb=_0x5acfc3['location'])!=null&&_0x16bceb['hostname'])&&(_0x5acfc3[_0xc745c8(0x199)]=!0x0),_0x5acfc3[_0xc745c8(0x199)];}function J(_0x1b84cf,_0x22cb75,_0x10c330,_0x425029,_0x513131,_0x475afa){var _0x214696=_0x27f4ea;_0x1b84cf=_0x1b84cf,_0x22cb75=_0x22cb75,_0x10c330=_0x10c330,_0x425029=_0x425029,_0x513131=_0x513131,_0x513131=_0x513131||{},_0x513131[_0x214696(0x1b3)]=_0x513131[_0x214696(0x1b3)]||{},_0x513131[_0x214696(0x230)]=_0x513131[_0x214696(0x230)]||{},_0x513131['reducePolicy']=_0x513131[_0x214696(0x13f)]||{},_0x513131['reducePolicy'][_0x214696(0x1d0)]=_0x513131[_0x214696(0x13f)][_0x214696(0x1d0)]||{},_0x513131[_0x214696(0x13f)]['global']=_0x513131[_0x214696(0x13f)]['global']||{};let _0x5f34e7={'perLogpoint':{'reduceOnCount':_0x513131[_0x214696(0x13f)][_0x214696(0x1d0)][_0x214696(0x1ce)]||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x513131[_0x214696(0x13f)][_0x214696(0x1d0)][_0x214696(0x1aa)]||0x64,'resetWhenQuietMs':_0x513131[_0x214696(0x13f)][_0x214696(0x1d0)][_0x214696(0x14b)]||0x1f4,'resetOnProcessingTimeAverageMs':_0x513131['reducePolicy'][_0x214696(0x1d0)][_0x214696(0x134)]||0x64},'global':{'reduceOnCount':_0x513131['reducePolicy'][_0x214696(0x1a5)][_0x214696(0x1ce)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x513131[_0x214696(0x13f)][_0x214696(0x1a5)][_0x214696(0x1aa)]||0x12c,'resetWhenQuietMs':_0x513131['reducePolicy']['global'][_0x214696(0x14b)]||0x32,'resetOnProcessingTimeAverageMs':_0x513131[_0x214696(0x13f)][_0x214696(0x1a5)][_0x214696(0x134)]||0x64}},_0x1d7dff=b(_0x1b84cf),_0x48727a=_0x1d7dff['elapsed'],_0x5593f0=_0x1d7dff[_0x214696(0x171)];function _0x34ed1d(){var _0x1a49de=_0x214696;this[_0x1a49de(0x1b9)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x1a49de(0x1cf)]=/^(0|[1-9][0-9]*)$/,this[_0x1a49de(0x19c)]=/'([^\\\\']|\\\\')*'/,this[_0x1a49de(0x201)]=_0x1b84cf[_0x1a49de(0x224)],this[_0x1a49de(0x162)]=_0x1b84cf['HTMLAllCollection'],this['_getOwnPropertyDescriptor']=Object[_0x1a49de(0x18d)],this[_0x1a49de(0x1f2)]=Object[_0x1a49de(0x21a)],this['_Symbol']=_0x1b84cf[_0x1a49de(0x157)],this['_regExpToString']=RegExp[_0x1a49de(0x220)]['toString'],this[_0x1a49de(0x221)]=Date[_0x1a49de(0x220)][_0x1a49de(0x19a)];}_0x34ed1d[_0x214696(0x220)][_0x214696(0x17a)]=function(_0x4ed169,_0x7dca5e,_0x1ea1e7,_0x4ca839){var _0x5819cb=_0x214696,_0x2fffed=this,_0xd92b7e=_0x1ea1e7['autoExpand'];function _0x5f2c45(_0x5e761f,_0x4e1bc2,_0x2961a8){var _0x1114dc=_0x5cf7;_0x4e1bc2[_0x1114dc(0x203)]='unknown',_0x4e1bc2[_0x1114dc(0x1fb)]=_0x5e761f['message'],_0x552ab6=_0x2961a8[_0x1114dc(0x167)][_0x1114dc(0x146)],_0x2961a8[_0x1114dc(0x167)]['current']=_0x4e1bc2,_0x2fffed[_0x1114dc(0x1e7)](_0x4e1bc2,_0x2961a8);}let _0x238fcb,_0x5ae890,_0x16e6f7=_0x1b84cf[_0x5819cb(0x206)];_0x1b84cf[_0x5819cb(0x206)]=!0x0,_0x1b84cf[_0x5819cb(0x1cd)]&&(_0x238fcb=_0x1b84cf[_0x5819cb(0x1cd)][_0x5819cb(0x1fb)],_0x5ae890=_0x1b84cf[_0x5819cb(0x1cd)][_0x5819cb(0x1f8)],_0x238fcb&&(_0x1b84cf[_0x5819cb(0x1cd)][_0x5819cb(0x1fb)]=function(){}),_0x5ae890&&(_0x1b84cf['console'][_0x5819cb(0x1f8)]=function(){}));try{try{_0x1ea1e7['level']++,_0x1ea1e7[_0x5819cb(0x163)]&&_0x1ea1e7[_0x5819cb(0x1a4)][_0x5819cb(0x16e)](_0x7dca5e);var _0x16cf4c,_0x36291a,_0x424803,_0x54ac07,_0xd48a44=[],_0x4c8309=[],_0x1661dc,_0x24a5e8=this[_0x5819cb(0x147)](_0x7dca5e),_0x2d0e3c=_0x24a5e8===_0x5819cb(0x1b2),_0x5193fe=!0x1,_0x23c775=_0x24a5e8===_0x5819cb(0x140),_0x6e364c=this[_0x5819cb(0x229)](_0x24a5e8),_0x527786=this['_isPrimitiveWrapperType'](_0x24a5e8),_0x236245=_0x6e364c||_0x527786,_0x2e2de3={},_0x2236a3=0x0,_0x18b840=!0x1,_0x552ab6,_0x5056dd=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x1ea1e7[_0x5819cb(0x21e)]){if(_0x2d0e3c){if(_0x36291a=_0x7dca5e[_0x5819cb(0x153)],_0x36291a>_0x1ea1e7[_0x5819cb(0x145)]){for(_0x424803=0x0,_0x54ac07=_0x1ea1e7[_0x5819cb(0x145)],_0x16cf4c=_0x424803;_0x16cf4c<_0x54ac07;_0x16cf4c++)_0x4c8309[_0x5819cb(0x16e)](_0x2fffed[_0x5819cb(0x1f4)](_0xd48a44,_0x7dca5e,_0x24a5e8,_0x16cf4c,_0x1ea1e7));_0x4ed169[_0x5819cb(0x20f)]=!0x0;}else{for(_0x424803=0x0,_0x54ac07=_0x36291a,_0x16cf4c=_0x424803;_0x16cf4c<_0x54ac07;_0x16cf4c++)_0x4c8309['push'](_0x2fffed[_0x5819cb(0x1f4)](_0xd48a44,_0x7dca5e,_0x24a5e8,_0x16cf4c,_0x1ea1e7));}_0x1ea1e7[_0x5819cb(0x148)]+=_0x4c8309[_0x5819cb(0x153)];}if(!(_0x24a5e8===_0x5819cb(0x1f3)||_0x24a5e8===_0x5819cb(0x224))&&!_0x6e364c&&_0x24a5e8!==_0x5819cb(0x12e)&&_0x24a5e8!==_0x5819cb(0x1c9)&&_0x24a5e8!==_0x5819cb(0x22f)){var _0x260439=_0x4ca839[_0x5819cb(0x210)]||_0x1ea1e7[_0x5819cb(0x210)];if(this['_isSet'](_0x7dca5e)?(_0x16cf4c=0x0,_0x7dca5e['forEach'](function(_0x3545fe){var _0x4f7e9a=_0x5819cb;if(_0x2236a3++,_0x1ea1e7[_0x4f7e9a(0x148)]++,_0x2236a3>_0x260439){_0x18b840=!0x0;return;}if(!_0x1ea1e7[_0x4f7e9a(0x14a)]&&_0x1ea1e7[_0x4f7e9a(0x163)]&&_0x1ea1e7[_0x4f7e9a(0x148)]>_0x1ea1e7[_0x4f7e9a(0x1d4)]){_0x18b840=!0x0;return;}_0x4c8309[_0x4f7e9a(0x16e)](_0x2fffed[_0x4f7e9a(0x1f4)](_0xd48a44,_0x7dca5e,'Set',_0x16cf4c++,_0x1ea1e7,function(_0x28ca76){return function(){return _0x28ca76;};}(_0x3545fe)));})):this[_0x5819cb(0x14c)](_0x7dca5e)&&_0x7dca5e[_0x5819cb(0x217)](function(_0x430279,_0xddf0da){var _0x3b56da=_0x5819cb;if(_0x2236a3++,_0x1ea1e7[_0x3b56da(0x148)]++,_0x2236a3>_0x260439){_0x18b840=!0x0;return;}if(!_0x1ea1e7['isExpressionToEvaluate']&&_0x1ea1e7[_0x3b56da(0x163)]&&_0x1ea1e7[_0x3b56da(0x148)]>_0x1ea1e7[_0x3b56da(0x1d4)]){_0x18b840=!0x0;return;}var _0x352a13=_0xddf0da[_0x3b56da(0x19a)]();_0x352a13[_0x3b56da(0x153)]>0x64&&(_0x352a13=_0x352a13['slice'](0x0,0x64)+'...'),_0x4c8309[_0x3b56da(0x16e)](_0x2fffed[_0x3b56da(0x1f4)](_0xd48a44,_0x7dca5e,'Map',_0x352a13,_0x1ea1e7,function(_0x1916ea){return function(){return _0x1916ea;};}(_0x430279)));}),!_0x5193fe){try{for(_0x1661dc in _0x7dca5e)if(!(_0x2d0e3c&&_0x5056dd[_0x5819cb(0x1b6)](_0x1661dc))&&!this[_0x5819cb(0x14e)](_0x7dca5e,_0x1661dc,_0x1ea1e7)){if(_0x2236a3++,_0x1ea1e7[_0x5819cb(0x148)]++,_0x2236a3>_0x260439){_0x18b840=!0x0;break;}if(!_0x1ea1e7[_0x5819cb(0x14a)]&&_0x1ea1e7[_0x5819cb(0x163)]&&_0x1ea1e7[_0x5819cb(0x148)]>_0x1ea1e7[_0x5819cb(0x1d4)]){_0x18b840=!0x0;break;}_0x4c8309[_0x5819cb(0x16e)](_0x2fffed[_0x5819cb(0x172)](_0xd48a44,_0x2e2de3,_0x7dca5e,_0x24a5e8,_0x1661dc,_0x1ea1e7));}}catch{}if(_0x2e2de3['_p_length']=!0x0,_0x23c775&&(_0x2e2de3[_0x5819cb(0x22d)]=!0x0),!_0x18b840){var _0x57a7fe=[][_0x5819cb(0x17f)](this[_0x5819cb(0x1f2)](_0x7dca5e))[_0x5819cb(0x17f)](this['_getOwnPropertySymbols'](_0x7dca5e));for(_0x16cf4c=0x0,_0x36291a=_0x57a7fe[_0x5819cb(0x153)];_0x16cf4c<_0x36291a;_0x16cf4c++)if(_0x1661dc=_0x57a7fe[_0x16cf4c],!(_0x2d0e3c&&_0x5056dd['test'](_0x1661dc[_0x5819cb(0x19a)]()))&&!this['_blacklistedProperty'](_0x7dca5e,_0x1661dc,_0x1ea1e7)&&!_0x2e2de3[typeof _0x1661dc!='symbol'?_0x5819cb(0x137)+_0x1661dc[_0x5819cb(0x19a)]():_0x1661dc]){if(_0x2236a3++,_0x1ea1e7['autoExpandPropertyCount']++,_0x2236a3>_0x260439){_0x18b840=!0x0;break;}if(!_0x1ea1e7['isExpressionToEvaluate']&&_0x1ea1e7['autoExpand']&&_0x1ea1e7[_0x5819cb(0x148)]>_0x1ea1e7[_0x5819cb(0x1d4)]){_0x18b840=!0x0;break;}_0x4c8309[_0x5819cb(0x16e)](_0x2fffed[_0x5819cb(0x172)](_0xd48a44,_0x2e2de3,_0x7dca5e,_0x24a5e8,_0x1661dc,_0x1ea1e7));}}}}}if(_0x4ed169['type']=_0x24a5e8,_0x236245?(_0x4ed169[_0x5819cb(0x1e8)]=_0x7dca5e[_0x5819cb(0x1c5)](),this[_0x5819cb(0x1ca)](_0x24a5e8,_0x4ed169,_0x1ea1e7,_0x4ca839)):_0x24a5e8===_0x5819cb(0x1f0)?_0x4ed169['value']=this[_0x5819cb(0x221)][_0x5819cb(0x16f)](_0x7dca5e):_0x24a5e8===_0x5819cb(0x22f)?_0x4ed169[_0x5819cb(0x1e8)]=_0x7dca5e[_0x5819cb(0x19a)]():_0x24a5e8===_0x5819cb(0x15a)?_0x4ed169['value']=this[_0x5819cb(0x1e6)][_0x5819cb(0x16f)](_0x7dca5e):_0x24a5e8===_0x5819cb(0x1ec)&&this[_0x5819cb(0x20d)]?_0x4ed169[_0x5819cb(0x1e8)]=this['_Symbol'][_0x5819cb(0x220)][_0x5819cb(0x19a)][_0x5819cb(0x16f)](_0x7dca5e):!_0x1ea1e7['depth']&&!(_0x24a5e8==='null'||_0x24a5e8===_0x5819cb(0x224))&&(delete _0x4ed169[_0x5819cb(0x1e8)],_0x4ed169[_0x5819cb(0x182)]=!0x0),_0x18b840&&(_0x4ed169[_0x5819cb(0x195)]=!0x0),_0x552ab6=_0x1ea1e7[_0x5819cb(0x167)][_0x5819cb(0x146)],_0x1ea1e7['node'][_0x5819cb(0x146)]=_0x4ed169,this['_treeNodePropertiesBeforeFullValue'](_0x4ed169,_0x1ea1e7),_0x4c8309['length']){for(_0x16cf4c=0x0,_0x36291a=_0x4c8309[_0x5819cb(0x153)];_0x16cf4c<_0x36291a;_0x16cf4c++)_0x4c8309[_0x16cf4c](_0x16cf4c);}_0xd48a44[_0x5819cb(0x153)]&&(_0x4ed169['props']=_0xd48a44);}catch(_0xeed0f8){_0x5f2c45(_0xeed0f8,_0x4ed169,_0x1ea1e7);}this[_0x5819cb(0x141)](_0x7dca5e,_0x4ed169),this['_treeNodePropertiesAfterFullValue'](_0x4ed169,_0x1ea1e7),_0x1ea1e7[_0x5819cb(0x167)]['current']=_0x552ab6,_0x1ea1e7[_0x5819cb(0x207)]--,_0x1ea1e7[_0x5819cb(0x163)]=_0xd92b7e,_0x1ea1e7['autoExpand']&&_0x1ea1e7['autoExpandPreviousObjects'][_0x5819cb(0x1ff)]();}finally{_0x238fcb&&(_0x1b84cf[_0x5819cb(0x1cd)][_0x5819cb(0x1fb)]=_0x238fcb),_0x5ae890&&(_0x1b84cf['console'][_0x5819cb(0x1f8)]=_0x5ae890),_0x1b84cf[_0x5819cb(0x206)]=_0x16e6f7;}return _0x4ed169;},_0x34ed1d[_0x214696(0x220)]['_getOwnPropertySymbols']=function(_0x4596fa){var _0x5925e1=_0x214696;return Object[_0x5925e1(0x196)]?Object['getOwnPropertySymbols'](_0x4596fa):[];},_0x34ed1d[_0x214696(0x220)][_0x214696(0x204)]=function(_0x92d40f){var _0x1ac919=_0x214696;return!!(_0x92d40f&&_0x1b84cf['Set']&&this[_0x1ac919(0x22e)](_0x92d40f)===_0x1ac919(0x12d)&&_0x92d40f[_0x1ac919(0x217)]);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x14e)]=function(_0x763159,_0x18e9ad,_0xd5905d){var _0x27605f=_0x214696;if(!_0xd5905d[_0x27605f(0x194)]){let _0x5a0af9=this[_0x27605f(0x138)](_0x763159,_0x18e9ad);if(_0x5a0af9&&_0x5a0af9['get'])return!0x0;}return _0xd5905d['noFunctions']?typeof _0x763159[_0x18e9ad]==_0x27605f(0x140):!0x1;},_0x34ed1d[_0x214696(0x220)][_0x214696(0x147)]=function(_0x5f197d){var _0x3b9da1=_0x214696,_0x254abb='';return _0x254abb=typeof _0x5f197d,_0x254abb===_0x3b9da1(0x164)?this['_objectToString'](_0x5f197d)===_0x3b9da1(0x227)?_0x254abb=_0x3b9da1(0x1b2):this['_objectToString'](_0x5f197d)===_0x3b9da1(0x15c)?_0x254abb=_0x3b9da1(0x1f0):this[_0x3b9da1(0x22e)](_0x5f197d)===_0x3b9da1(0x21b)?_0x254abb=_0x3b9da1(0x22f):_0x5f197d===null?_0x254abb=_0x3b9da1(0x1f3):_0x5f197d['constructor']&&(_0x254abb=_0x5f197d[_0x3b9da1(0x12c)][_0x3b9da1(0x185)]||_0x254abb):_0x254abb===_0x3b9da1(0x224)&&this[_0x3b9da1(0x162)]&&_0x5f197d instanceof this[_0x3b9da1(0x162)]&&(_0x254abb=_0x3b9da1(0x1a7)),_0x254abb;},_0x34ed1d[_0x214696(0x220)][_0x214696(0x22e)]=function(_0x4b3483){var _0x59323a=_0x214696;return Object['prototype'][_0x59323a(0x19a)][_0x59323a(0x16f)](_0x4b3483);},_0x34ed1d['prototype'][_0x214696(0x229)]=function(_0x3f12cc){var _0x14181c=_0x214696;return _0x3f12cc==='boolean'||_0x3f12cc==='string'||_0x3f12cc===_0x14181c(0x1ee);},_0x34ed1d['prototype'][_0x214696(0x1fd)]=function(_0x24d083){var _0x824253=_0x214696;return _0x24d083===_0x824253(0x19e)||_0x24d083===_0x824253(0x12e)||_0x24d083===_0x824253(0x1bf);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x1f4)]=function(_0x52c9ee,_0x3dbfa6,_0x54d057,_0x695d62,_0x1e5016,_0x5936ab){var _0x3e21d7=this;return function(_0x59ef4f){var _0x27ad85=_0x5cf7,_0x20a41f=_0x1e5016[_0x27ad85(0x167)][_0x27ad85(0x146)],_0x40b5f5=_0x1e5016[_0x27ad85(0x167)][_0x27ad85(0x15e)],_0x4b6f6b=_0x1e5016[_0x27ad85(0x167)][_0x27ad85(0x135)];_0x1e5016[_0x27ad85(0x167)][_0x27ad85(0x135)]=_0x20a41f,_0x1e5016['node'][_0x27ad85(0x15e)]=typeof _0x695d62==_0x27ad85(0x1ee)?_0x695d62:_0x59ef4f,_0x52c9ee[_0x27ad85(0x16e)](_0x3e21d7['_property'](_0x3dbfa6,_0x54d057,_0x695d62,_0x1e5016,_0x5936ab)),_0x1e5016[_0x27ad85(0x167)]['parent']=_0x4b6f6b,_0x1e5016[_0x27ad85(0x167)]['index']=_0x40b5f5;};},_0x34ed1d[_0x214696(0x220)][_0x214696(0x172)]=function(_0xff3dff,_0x328e71,_0x95c09a,_0x4ef89f,_0x5bbcff,_0xedb075,_0x2f75dd){var _0x33a8a3=_0x214696,_0x5283e9=this;return _0x328e71[typeof _0x5bbcff!=_0x33a8a3(0x1ec)?_0x33a8a3(0x137)+_0x5bbcff[_0x33a8a3(0x19a)]():_0x5bbcff]=!0x0,function(_0x811f2b){var _0x1ebac6=_0x33a8a3,_0x5659b7=_0xedb075['node'][_0x1ebac6(0x146)],_0x5b64e5=_0xedb075['node'][_0x1ebac6(0x15e)],_0x4ebd6c=_0xedb075['node'][_0x1ebac6(0x135)];_0xedb075[_0x1ebac6(0x167)]['parent']=_0x5659b7,_0xedb075[_0x1ebac6(0x167)][_0x1ebac6(0x15e)]=_0x811f2b,_0xff3dff[_0x1ebac6(0x16e)](_0x5283e9['_property'](_0x95c09a,_0x4ef89f,_0x5bbcff,_0xedb075,_0x2f75dd)),_0xedb075[_0x1ebac6(0x167)]['parent']=_0x4ebd6c,_0xedb075[_0x1ebac6(0x167)][_0x1ebac6(0x15e)]=_0x5b64e5;};},_0x34ed1d[_0x214696(0x220)]['_property']=function(_0x18b315,_0x3918ec,_0x5dfa18,_0x5319c6,_0x2d8fa5){var _0x53ed2c=_0x214696,_0x379c68=this;_0x2d8fa5||(_0x2d8fa5=function(_0x3ca008,_0x4b4854){return _0x3ca008[_0x4b4854];});var _0x3d7ff1=_0x5dfa18[_0x53ed2c(0x19a)](),_0x30d254=_0x5319c6['expressionsToEvaluate']||{},_0x155442=_0x5319c6[_0x53ed2c(0x21e)],_0x554fd1=_0x5319c6[_0x53ed2c(0x14a)];try{var _0x3237a0=this[_0x53ed2c(0x14c)](_0x18b315),_0x4e6244=_0x3d7ff1;_0x3237a0&&_0x4e6244[0x0]==='\\x27'&&(_0x4e6244=_0x4e6244[_0x53ed2c(0x197)](0x1,_0x4e6244[_0x53ed2c(0x153)]-0x2));var _0x30807e=_0x5319c6[_0x53ed2c(0x17c)]=_0x30d254[_0x53ed2c(0x137)+_0x4e6244];_0x30807e&&(_0x5319c6[_0x53ed2c(0x21e)]=_0x5319c6[_0x53ed2c(0x21e)]+0x1),_0x5319c6[_0x53ed2c(0x14a)]=!!_0x30807e;var _0x5e0092=typeof _0x5dfa18==_0x53ed2c(0x1ec),_0x4ca784={'name':_0x5e0092||_0x3237a0?_0x3d7ff1:this[_0x53ed2c(0x228)](_0x3d7ff1)};if(_0x5e0092&&(_0x4ca784['symbol']=!0x0),!(_0x3918ec===_0x53ed2c(0x1b2)||_0x3918ec==='Error')){var _0x509ba0=this['_getOwnPropertyDescriptor'](_0x18b315,_0x5dfa18);if(_0x509ba0&&(_0x509ba0['set']&&(_0x4ca784[_0x53ed2c(0x223)]=!0x0),_0x509ba0[_0x53ed2c(0x13c)]&&!_0x30807e&&!_0x5319c6[_0x53ed2c(0x194)]))return _0x4ca784['getter']=!0x0,this[_0x53ed2c(0x19b)](_0x4ca784,_0x5319c6),_0x4ca784;}var _0x14805b;try{_0x14805b=_0x2d8fa5(_0x18b315,_0x5dfa18);}catch(_0x485eec){return _0x4ca784={'name':_0x3d7ff1,'type':_0x53ed2c(0x170),'error':_0x485eec[_0x53ed2c(0x218)]},this[_0x53ed2c(0x19b)](_0x4ca784,_0x5319c6),_0x4ca784;}var _0x2cab07=this[_0x53ed2c(0x147)](_0x14805b),_0x5f522f=this[_0x53ed2c(0x229)](_0x2cab07);if(_0x4ca784[_0x53ed2c(0x203)]=_0x2cab07,_0x5f522f)this[_0x53ed2c(0x19b)](_0x4ca784,_0x5319c6,_0x14805b,function(){var _0x2cdcf4=_0x53ed2c;_0x4ca784[_0x2cdcf4(0x1e8)]=_0x14805b['valueOf'](),!_0x30807e&&_0x379c68['_capIfString'](_0x2cab07,_0x4ca784,_0x5319c6,{});});else{var _0x18c4f5=_0x5319c6[_0x53ed2c(0x163)]&&_0x5319c6[_0x53ed2c(0x207)]<_0x5319c6[_0x53ed2c(0x225)]&&_0x5319c6[_0x53ed2c(0x1a4)]['indexOf'](_0x14805b)<0x0&&_0x2cab07!==_0x53ed2c(0x140)&&_0x5319c6[_0x53ed2c(0x148)]<_0x5319c6[_0x53ed2c(0x1d4)];_0x18c4f5||_0x5319c6[_0x53ed2c(0x207)]<_0x155442||_0x30807e?this[_0x53ed2c(0x17a)](_0x4ca784,_0x14805b,_0x5319c6,_0x30807e||{}):this[_0x53ed2c(0x19b)](_0x4ca784,_0x5319c6,_0x14805b,function(){var _0x9606df=_0x53ed2c;_0x2cab07==='null'||_0x2cab07===_0x9606df(0x224)||(delete _0x4ca784[_0x9606df(0x1e8)],_0x4ca784[_0x9606df(0x182)]=!0x0);});}return _0x4ca784;}finally{_0x5319c6[_0x53ed2c(0x17c)]=_0x30d254,_0x5319c6['depth']=_0x155442,_0x5319c6[_0x53ed2c(0x14a)]=_0x554fd1;}},_0x34ed1d['prototype'][_0x214696(0x1ca)]=function(_0x26ccea,_0x6e0d21,_0x5a73cf,_0x21a5ae){var _0x38dead=_0x214696,_0x3514b6=_0x21a5ae['strLength']||_0x5a73cf[_0x38dead(0x1a0)];if((_0x26ccea===_0x38dead(0x19f)||_0x26ccea===_0x38dead(0x12e))&&_0x6e0d21['value']){let _0x4b9a3f=_0x6e0d21[_0x38dead(0x1e8)][_0x38dead(0x153)];_0x5a73cf[_0x38dead(0x191)]+=_0x4b9a3f,_0x5a73cf['allStrLength']>_0x5a73cf[_0x38dead(0x13e)]?(_0x6e0d21[_0x38dead(0x182)]='',delete _0x6e0d21[_0x38dead(0x1e8)]):_0x4b9a3f>_0x3514b6&&(_0x6e0d21[_0x38dead(0x182)]=_0x6e0d21[_0x38dead(0x1e8)][_0x38dead(0x197)](0x0,_0x3514b6),delete _0x6e0d21['value']);}},_0x34ed1d[_0x214696(0x220)][_0x214696(0x14c)]=function(_0x4c3992){var _0x2533b1=_0x214696;return!!(_0x4c3992&&_0x1b84cf[_0x2533b1(0x144)]&&this['_objectToString'](_0x4c3992)===_0x2533b1(0x1d8)&&_0x4c3992[_0x2533b1(0x217)]);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x228)]=function(_0x3eeb2c){var _0x20c0cd=_0x214696;if(_0x3eeb2c[_0x20c0cd(0x22b)](/^\\d+$/))return _0x3eeb2c;var _0x387e31;try{_0x387e31=JSON['stringify'](''+_0x3eeb2c);}catch{_0x387e31='\\x22'+this['_objectToString'](_0x3eeb2c)+'\\x22';}return _0x387e31[_0x20c0cd(0x22b)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x387e31=_0x387e31['substr'](0x1,_0x387e31[_0x20c0cd(0x153)]-0x2):_0x387e31=_0x387e31['replace'](/'/g,'\\x5c\\x27')[_0x20c0cd(0x13a)](/\\\\\"/g,'\\x22')[_0x20c0cd(0x13a)](/(^\"|\"$)/g,'\\x27'),_0x387e31;},_0x34ed1d[_0x214696(0x220)][_0x214696(0x19b)]=function(_0x30b649,_0x4ffe49,_0x5f6329,_0x38e972){var _0x4d8b4d=_0x214696;this['_treeNodePropertiesBeforeFullValue'](_0x30b649,_0x4ffe49),_0x38e972&&_0x38e972(),this[_0x4d8b4d(0x141)](_0x5f6329,_0x30b649),this[_0x4d8b4d(0x1e9)](_0x30b649,_0x4ffe49);},_0x34ed1d[_0x214696(0x220)]['_treeNodePropertiesBeforeFullValue']=function(_0x5576c4,_0x3ebbfb){var _0x4c4b0a=_0x214696;this[_0x4c4b0a(0x1dd)](_0x5576c4,_0x3ebbfb),this['_setNodeQueryPath'](_0x5576c4,_0x3ebbfb),this['_setNodeExpressionPath'](_0x5576c4,_0x3ebbfb),this['_setNodePermissions'](_0x5576c4,_0x3ebbfb);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x1dd)]=function(_0x20825e,_0x33577b){},_0x34ed1d['prototype'][_0x214696(0x22c)]=function(_0x25683b,_0x4784b5){},_0x34ed1d[_0x214696(0x220)][_0x214696(0x154)]=function(_0x33bded,_0x1ca65a){},_0x34ed1d[_0x214696(0x220)][_0x214696(0x1ea)]=function(_0x5224eb){var _0x1075ea=_0x214696;return _0x5224eb===this[_0x1075ea(0x201)];},_0x34ed1d[_0x214696(0x220)][_0x214696(0x1e9)]=function(_0x3bf243,_0x46d534){var _0x3c71e5=_0x214696;this[_0x3c71e5(0x154)](_0x3bf243,_0x46d534),this['_setNodeExpandableState'](_0x3bf243),_0x46d534[_0x3c71e5(0x1a3)]&&this['_sortProps'](_0x3bf243),this[_0x3c71e5(0x18a)](_0x3bf243,_0x46d534),this[_0x3c71e5(0x1e2)](_0x3bf243,_0x46d534),this[_0x3c71e5(0x1df)](_0x3bf243);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x141)]=function(_0x49892b,_0x2c9fcb){var _0x367b88=_0x214696;try{_0x49892b&&typeof _0x49892b['length']==_0x367b88(0x1ee)&&(_0x2c9fcb[_0x367b88(0x153)]=_0x49892b[_0x367b88(0x153)]);}catch{}if(_0x2c9fcb[_0x367b88(0x203)]==='number'||_0x2c9fcb['type']===_0x367b88(0x1bf)){if(isNaN(_0x2c9fcb[_0x367b88(0x1e8)]))_0x2c9fcb['nan']=!0x0,delete _0x2c9fcb[_0x367b88(0x1e8)];else switch(_0x2c9fcb[_0x367b88(0x1e8)]){case Number[_0x367b88(0x174)]:_0x2c9fcb[_0x367b88(0x17b)]=!0x0,delete _0x2c9fcb[_0x367b88(0x1e8)];break;case Number[_0x367b88(0x1c1)]:_0x2c9fcb[_0x367b88(0x211)]=!0x0,delete _0x2c9fcb['value'];break;case 0x0:this[_0x367b88(0x20b)](_0x2c9fcb[_0x367b88(0x1e8)])&&(_0x2c9fcb[_0x367b88(0x156)]=!0x0);break;}}else _0x2c9fcb[_0x367b88(0x203)]===_0x367b88(0x140)&&typeof _0x49892b['name']==_0x367b88(0x19f)&&_0x49892b[_0x367b88(0x185)]&&_0x2c9fcb[_0x367b88(0x185)]&&_0x49892b[_0x367b88(0x185)]!==_0x2c9fcb[_0x367b88(0x185)]&&(_0x2c9fcb[_0x367b88(0x165)]=_0x49892b[_0x367b88(0x185)]);},_0x34ed1d['prototype'][_0x214696(0x20b)]=function(_0x227af0){return 0x1/_0x227af0===Number['NEGATIVE_INFINITY'];},_0x34ed1d['prototype'][_0x214696(0x222)]=function(_0x27dce3){var _0x331cd8=_0x214696;!_0x27dce3[_0x331cd8(0x210)]||!_0x27dce3[_0x331cd8(0x210)][_0x331cd8(0x153)]||_0x27dce3[_0x331cd8(0x203)]===_0x331cd8(0x1b2)||_0x27dce3['type']===_0x331cd8(0x144)||_0x27dce3[_0x331cd8(0x203)]===_0x331cd8(0x1d7)||_0x27dce3[_0x331cd8(0x210)]['sort'](function(_0x1994d2,_0x317377){var _0x4191d5=_0x331cd8,_0x35525d=_0x1994d2[_0x4191d5(0x185)][_0x4191d5(0x1f9)](),_0x18ffb7=_0x317377[_0x4191d5(0x185)][_0x4191d5(0x1f9)]();return _0x35525d<_0x18ffb7?-0x1:_0x35525d>_0x18ffb7?0x1:0x0;});},_0x34ed1d[_0x214696(0x220)][_0x214696(0x18a)]=function(_0x5a52d9,_0x252462){var _0x1838f0=_0x214696;if(!(_0x252462[_0x1838f0(0x179)]||!_0x5a52d9['props']||!_0x5a52d9[_0x1838f0(0x210)]['length'])){for(var _0x25c031=[],_0x4fa983=[],_0x345970=0x0,_0x29561b=_0x5a52d9[_0x1838f0(0x210)][_0x1838f0(0x153)];_0x345970<_0x29561b;_0x345970++){var _0x18ce7d=_0x5a52d9[_0x1838f0(0x210)][_0x345970];_0x18ce7d[_0x1838f0(0x203)]==='function'?_0x25c031['push'](_0x18ce7d):_0x4fa983[_0x1838f0(0x16e)](_0x18ce7d);}if(!(!_0x4fa983[_0x1838f0(0x153)]||_0x25c031['length']<=0x1)){_0x5a52d9[_0x1838f0(0x210)]=_0x4fa983;var _0x1e2b92={'functionsNode':!0x0,'props':_0x25c031};this['_setNodeId'](_0x1e2b92,_0x252462),this[_0x1838f0(0x154)](_0x1e2b92,_0x252462),this['_setNodeExpandableState'](_0x1e2b92),this[_0x1838f0(0x184)](_0x1e2b92,_0x252462),_0x1e2b92['id']+='\\x20f',_0x5a52d9[_0x1838f0(0x210)]['unshift'](_0x1e2b92);}}},_0x34ed1d['prototype'][_0x214696(0x1e2)]=function(_0x34b99c,_0x45eb99){},_0x34ed1d[_0x214696(0x220)]['_setNodeExpandableState']=function(_0x5b55c3){},_0x34ed1d[_0x214696(0x220)][_0x214696(0x180)]=function(_0x58cc5e){var _0xf4ba55=_0x214696;return Array[_0xf4ba55(0x1f1)](_0x58cc5e)||typeof _0x58cc5e==_0xf4ba55(0x164)&&this[_0xf4ba55(0x22e)](_0x58cc5e)===_0xf4ba55(0x227);},_0x34ed1d[_0x214696(0x220)][_0x214696(0x184)]=function(_0x29d75c,_0xe2d021){},_0x34ed1d[_0x214696(0x220)][_0x214696(0x1df)]=function(_0xa023c9){var _0x589591=_0x214696;delete _0xa023c9[_0x589591(0x12f)],delete _0xa023c9[_0x589591(0x152)],delete _0xa023c9[_0x589591(0x193)];},_0x34ed1d['prototype'][_0x214696(0x1db)]=function(_0x2562a9,_0x2d27a2){};let _0x28f581=new _0x34ed1d(),_0x502a66={'props':_0x513131[_0x214696(0x1b3)][_0x214696(0x210)]||0x64,'elements':_0x513131[_0x214696(0x1b3)][_0x214696(0x145)]||0x64,'strLength':_0x513131[_0x214696(0x1b3)]['strLength']||0x400*0x32,'totalStrLength':_0x513131[_0x214696(0x1b3)][_0x214696(0x13e)]||0x400*0x32,'autoExpandLimit':_0x513131[_0x214696(0x1b3)]['autoExpandLimit']||0x1388,'autoExpandMaxDepth':_0x513131[_0x214696(0x1b3)][_0x214696(0x225)]||0xa},_0x13ef23={'props':_0x513131[_0x214696(0x230)][_0x214696(0x210)]||0x5,'elements':_0x513131['reducedLimits'][_0x214696(0x145)]||0x5,'strLength':_0x513131['reducedLimits'][_0x214696(0x1a0)]||0x100,'totalStrLength':_0x513131[_0x214696(0x230)]['totalStrLength']||0x100*0x3,'autoExpandLimit':_0x513131[_0x214696(0x230)][_0x214696(0x1d4)]||0x1e,'autoExpandMaxDepth':_0x513131['reducedLimits']['autoExpandMaxDepth']||0x2};if(_0x475afa){let _0x29800f=_0x28f581[_0x214696(0x17a)][_0x214696(0x19d)](_0x28f581);_0x28f581[_0x214696(0x17a)]=function(_0x10fd5b,_0x3e4059,_0x54184b,_0x152e04){return _0x29800f(_0x10fd5b,_0x475afa(_0x3e4059),_0x54184b,_0x152e04);};}function _0x2b3bff(_0x12d8f0,_0x4cf31e,_0x573668,_0x6b9276,_0x430332,_0x9e1f91){var _0x317b69=_0x214696;let _0x120eeb,_0x5a07b2;try{_0x5a07b2=_0x5593f0(),_0x120eeb=_0x10c330[_0x4cf31e],!_0x120eeb||_0x5a07b2-_0x120eeb['ts']>_0x5f34e7['perLogpoint'][_0x317b69(0x14b)]&&_0x120eeb[_0x317b69(0x215)]&&_0x120eeb[_0x317b69(0x1c8)]/_0x120eeb[_0x317b69(0x215)]<_0x5f34e7[_0x317b69(0x1d0)][_0x317b69(0x134)]?(_0x10c330[_0x4cf31e]=_0x120eeb={'count':0x0,'time':0x0,'ts':_0x5a07b2},_0x10c330[_0x317b69(0x1d6)]={}):_0x5a07b2-_0x10c330['hits']['ts']>_0x5f34e7[_0x317b69(0x1a5)][_0x317b69(0x14b)]&&_0x10c330[_0x317b69(0x1d6)]['count']&&_0x10c330[_0x317b69(0x1d6)]['time']/_0x10c330[_0x317b69(0x1d6)][_0x317b69(0x215)]<_0x5f34e7['global'][_0x317b69(0x134)]&&(_0x10c330['hits']={});let _0x371293=[],_0x57f51c=_0x120eeb[_0x317b69(0x1da)]||_0x10c330[_0x317b69(0x1d6)]['reduceLimits']?_0x13ef23:_0x502a66,_0x1bcf5c=_0x91ed01=>{var _0x1aa6af=_0x317b69;let _0xc556ae={};return _0xc556ae[_0x1aa6af(0x210)]=_0x91ed01['props'],_0xc556ae[_0x1aa6af(0x145)]=_0x91ed01[_0x1aa6af(0x145)],_0xc556ae['strLength']=_0x91ed01[_0x1aa6af(0x1a0)],_0xc556ae[_0x1aa6af(0x13e)]=_0x91ed01[_0x1aa6af(0x13e)],_0xc556ae['autoExpandLimit']=_0x91ed01[_0x1aa6af(0x1d4)],_0xc556ae[_0x1aa6af(0x225)]=_0x91ed01[_0x1aa6af(0x225)],_0xc556ae['sortProps']=!0x1,_0xc556ae['noFunctions']=!_0x22cb75,_0xc556ae[_0x1aa6af(0x21e)]=0x1,_0xc556ae[_0x1aa6af(0x207)]=0x0,_0xc556ae['expId']=_0x1aa6af(0x1c3),_0xc556ae['rootExpression']='root_exp',_0xc556ae[_0x1aa6af(0x163)]=!0x0,_0xc556ae['autoExpandPreviousObjects']=[],_0xc556ae[_0x1aa6af(0x148)]=0x0,_0xc556ae[_0x1aa6af(0x194)]=_0x513131['resolveGetters'],_0xc556ae[_0x1aa6af(0x191)]=0x0,_0xc556ae[_0x1aa6af(0x167)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xc556ae;};for(var _0x1b0099=0x0;_0x1b0099<_0x430332[_0x317b69(0x153)];_0x1b0099++)_0x371293['push'](_0x28f581[_0x317b69(0x17a)]({'timeNode':_0x12d8f0===_0x317b69(0x1c8)||void 0x0},_0x430332[_0x1b0099],_0x1bcf5c(_0x57f51c),{}));if(_0x12d8f0===_0x317b69(0x160)||_0x12d8f0===_0x317b69(0x1fb)){let _0x2d5716=Error[_0x317b69(0x18c)];try{Error[_0x317b69(0x18c)]=0x1/0x0,_0x371293[_0x317b69(0x16e)](_0x28f581['serialize']({'stackNode':!0x0},new Error()[_0x317b69(0x21f)],_0x1bcf5c(_0x57f51c),{'strLength':0x1/0x0}));}finally{Error[_0x317b69(0x18c)]=_0x2d5716;}}return{'method':_0x317b69(0x169),'version':_0x425029,'args':[{'ts':_0x573668,'session':_0x6b9276,'args':_0x371293,'id':_0x4cf31e,'context':_0x9e1f91}]};}catch(_0x40679d){return{'method':_0x317b69(0x169),'version':_0x425029,'args':[{'ts':_0x573668,'session':_0x6b9276,'args':[{'type':_0x317b69(0x170),'error':_0x40679d&&_0x40679d[_0x317b69(0x218)]}],'id':_0x4cf31e,'context':_0x9e1f91}]};}finally{try{if(_0x120eeb&&_0x5a07b2){let _0x27a114=_0x5593f0();_0x120eeb['count']++,_0x120eeb[_0x317b69(0x1c8)]+=_0x48727a(_0x5a07b2,_0x27a114),_0x120eeb['ts']=_0x27a114,_0x10c330['hits'][_0x317b69(0x215)]++,_0x10c330[_0x317b69(0x1d6)][_0x317b69(0x1c8)]+=_0x48727a(_0x5a07b2,_0x27a114),_0x10c330[_0x317b69(0x1d6)]['ts']=_0x27a114,(_0x120eeb['count']>_0x5f34e7['perLogpoint'][_0x317b69(0x1ce)]||_0x120eeb['time']>_0x5f34e7['perLogpoint']['reduceOnAccumulatedProcessingTimeMs'])&&(_0x120eeb[_0x317b69(0x1da)]=!0x0),(_0x10c330['hits']['count']>_0x5f34e7['global'][_0x317b69(0x1ce)]||_0x10c330['hits'][_0x317b69(0x1c8)]>_0x5f34e7[_0x317b69(0x1a5)][_0x317b69(0x1aa)])&&(_0x10c330[_0x317b69(0x1d6)][_0x317b69(0x1da)]=!0x0);}}catch{}}}return _0x2b3bff;}function G(_0x434b91){var _0x257403=_0x27f4ea;if(_0x434b91&&typeof _0x434b91=='object'&&_0x434b91[_0x257403(0x12c)])switch(_0x434b91['constructor']['name']){case _0x257403(0x1c0):return _0x434b91[_0x257403(0x1bc)](Symbol[_0x257403(0x15f)])?Promise[_0x257403(0x1d2)]():_0x434b91;case _0x257403(0x15d):return Promise[_0x257403(0x1d2)]();}return _0x434b91;}((_0xb12d58,_0x1c1888,_0x4be2b0,_0x6defa5,_0x3edf33,_0x39ddf7,_0x2e212d,_0x35551d,_0x1eb46e,_0x4e3e05,_0x219815,_0x40c102)=>{var _0x47ee38=_0x27f4ea;if(_0xb12d58[_0x47ee38(0x166)])return _0xb12d58[_0x47ee38(0x166)];let _0x41d96a={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!X(_0xb12d58,_0x35551d,_0x3edf33))return _0xb12d58[_0x47ee38(0x166)]=_0x41d96a,_0xb12d58[_0x47ee38(0x166)];let _0x5cf254=b(_0xb12d58),_0x211417=_0x5cf254['elapsed'],_0x120ed8=_0x5cf254[_0x47ee38(0x171)],_0x4d12ad=_0x5cf254[_0x47ee38(0x1f6)],_0x40a67f={'hits':{},'ts':{}},_0xbddbd0=J(_0xb12d58,_0x1eb46e,_0x40a67f,_0x39ddf7,_0x40c102,_0x3edf33===_0x47ee38(0x177)?G:void 0x0),_0x391c84=(_0x3a42bb,_0x4e5be3,_0x29339e,_0x59a5b4,_0x4e05b6,_0xeaaf9e)=>{var _0x5a78e6=_0x47ee38;let _0x2a987d=_0xb12d58[_0x5a78e6(0x166)];try{return _0xb12d58[_0x5a78e6(0x166)]=_0x41d96a,_0xbddbd0(_0x3a42bb,_0x4e5be3,_0x29339e,_0x59a5b4,_0x4e05b6,_0xeaaf9e);}finally{_0xb12d58[_0x5a78e6(0x166)]=_0x2a987d;}},_0x486373=_0x41f49c=>{_0x40a67f['ts'][_0x41f49c]=_0x120ed8();},_0x375f8a=(_0x586b6b,_0x281c49)=>{var _0x42f9bc=_0x47ee38;let _0x1de228=_0x40a67f['ts'][_0x281c49];if(delete _0x40a67f['ts'][_0x281c49],_0x1de228){let _0x3d4aab=_0x211417(_0x1de228,_0x120ed8());_0x3b4188(_0x391c84(_0x42f9bc(0x1c8),_0x586b6b,_0x4d12ad(),_0x39ea0c,[_0x3d4aab],_0x281c49));}},_0x36a5c5=_0x538015=>{var _0x2867b1=_0x47ee38,_0x3d1b72;return _0x3edf33===_0x2867b1(0x177)&&_0xb12d58[_0x2867b1(0x15b)]&&((_0x3d1b72=_0x538015==null?void 0x0:_0x538015[_0x2867b1(0x1bb)])==null?void 0x0:_0x3d1b72['length'])&&(_0x538015[_0x2867b1(0x1bb)][0x0]['origin']=_0xb12d58[_0x2867b1(0x15b)]),_0x538015;};_0xb12d58[_0x47ee38(0x166)]={'consoleLog':(_0x51ed74,_0xe11fc)=>{var _0x38ecd1=_0x47ee38;_0xb12d58[_0x38ecd1(0x1cd)]['log'][_0x38ecd1(0x185)]!==_0x38ecd1(0x158)&&_0x3b4188(_0x391c84(_0x38ecd1(0x169),_0x51ed74,_0x4d12ad(),_0x39ea0c,_0xe11fc));},'consoleTrace':(_0x137d17,_0x1d312d)=>{var _0x51cf82=_0x47ee38,_0x5b8a58,_0x41a828;_0xb12d58[_0x51cf82(0x1cd)][_0x51cf82(0x169)][_0x51cf82(0x185)]!==_0x51cf82(0x16d)&&((_0x41a828=(_0x5b8a58=_0xb12d58['process'])==null?void 0x0:_0x5b8a58[_0x51cf82(0x16c)])!=null&&_0x41a828['node']&&(_0xb12d58[_0x51cf82(0x155)]=!0x0),_0x3b4188(_0x36a5c5(_0x391c84(_0x51cf82(0x160),_0x137d17,_0x4d12ad(),_0x39ea0c,_0x1d312d))));},'consoleError':(_0x1f78e4,_0x2b1ba8)=>{var _0x13a967=_0x47ee38;_0xb12d58[_0x13a967(0x155)]=!0x0,_0x3b4188(_0x36a5c5(_0x391c84(_0x13a967(0x1fb),_0x1f78e4,_0x4d12ad(),_0x39ea0c,_0x2b1ba8)));},'consoleTime':_0x1a9247=>{_0x486373(_0x1a9247);},'consoleTimeEnd':(_0x5d368a,_0x200ddf)=>{_0x375f8a(_0x200ddf,_0x5d368a);},'autoLog':(_0x5d21fe,_0x1d28a4)=>{var _0x262f79=_0x47ee38;_0x3b4188(_0x391c84(_0x262f79(0x169),_0x1d28a4,_0x4d12ad(),_0x39ea0c,[_0x5d21fe]));},'autoLogMany':(_0x3c9460,_0x1c3a81)=>{_0x3b4188(_0x391c84('log',_0x3c9460,_0x4d12ad(),_0x39ea0c,_0x1c3a81));},'autoTrace':(_0x1e8e77,_0x45393a)=>{var _0x10935e=_0x47ee38;_0x3b4188(_0x36a5c5(_0x391c84(_0x10935e(0x160),_0x45393a,_0x4d12ad(),_0x39ea0c,[_0x1e8e77])));},'autoTraceMany':(_0x5e24f4,_0x2f9fe6)=>{var _0xfcca09=_0x47ee38;_0x3b4188(_0x36a5c5(_0x391c84(_0xfcca09(0x160),_0x5e24f4,_0x4d12ad(),_0x39ea0c,_0x2f9fe6)));},'autoTime':(_0x5efb2d,_0x485584,_0x2bb811)=>{_0x486373(_0x2bb811);},'autoTimeEnd':(_0x43da21,_0x51b33a,_0x2ed8c7)=>{_0x375f8a(_0x51b33a,_0x2ed8c7);},'coverage':_0x188923=>{var _0x35709e=_0x47ee38;_0x3b4188({'method':_0x35709e(0x1e1),'version':_0x39ddf7,'args':[{'id':_0x188923}]});}};let _0x3b4188=H(_0xb12d58,_0x1c1888,_0x4be2b0,_0x6defa5,_0x3edf33,_0x4e3e05,_0x219815),_0x39ea0c=_0xb12d58[_0x47ee38(0x16b)];return _0xb12d58[_0x47ee38(0x166)];})(globalThis,_0x27f4ea(0x159),'52246',_0x27f4ea(0x1e5),'webpack',_0x27f4ea(0x151),_0x27f4ea(0x1b7),_0x27f4ea(0x1bd),_0x27f4ea(0x1be),'','1',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}});");
  } catch (e) {
    console.error(e);
  }
}
; /* istanbul ignore next */
function oo_oo(/**@type{any}**/i, /**@type{any}**/...v) {
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tr(/**@type{any}**/i, /**@type{any}**/...v) {
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tx(/**@type{any}**/i, /**@type{any}**/...v) {
  try {
    oo_cm().consoleError(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_ts(/**@type{any}**/v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_te(/**@type{any}**/v, /**@type{any}**/i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v;
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ },

/***/ "./src/hooks/useAttributes.js"
/*!************************************!*\
  !*** ./src/hooks/useAttributes.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAttributes: () => (/* binding */ useAttributes)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_AttributesContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AttributesContext */ "./src/context/AttributesContext.js");


const useAttributes = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AttributesContext__WEBPACK_IMPORTED_MODULE_1__.AttributesContext);
  if (!context) {
    throw new Error("useTab must be used within TabProvider");
  }
  return context;
};

/***/ },

/***/ "./src/hooks/useDevice.js"
/*!********************************!*\
  !*** ./src/hooks/useDevice.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDeviceType: () => (/* binding */ useDeviceType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

const useDeviceType = () => {
  const {
    deviceType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const coreEditor = select("core/editor");
    if (!coreEditor?.getDeviceType) {
      return {
        deviceType: "Desktop"
      };
    }
    return {
      deviceType: coreEditor.getDeviceType()
    };
  }, []);
  return deviceType || "Desktop";
};

/***/ },

/***/ "./src/hooks/usePanel.js"
/*!*******************************!*\
  !*** ./src/hooks/usePanel.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePanel: () => (/* binding */ usePanel)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_PanelContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/PanelContext */ "./src/context/PanelContext.js");


const usePanel = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PanelContext__WEBPACK_IMPORTED_MODULE_1__.PanelContext);
  if (!context) {
    throw new Error("usePanel must be used within PanelProvider");
  }
  return context;
};

/***/ },

/***/ "./src/hooks/useRangeHandler.js"
/*!**************************************!*\
  !*** ./src/hooks/useRangeHandler.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRangeHandler: () => (/* binding */ useRangeHandler)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const useRangeHandler = ({
  attributes,
  setAttributes,
  attributeKey,
  nestedKey,
  activeSubKey,
  defaultValue
}) => {
  const handleChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newValue => {
    const currentAttr = attributes?.[attributeKey];

    // ---------- SIMPLE NUMBER ATTRIBUTE ----------
    if (typeof currentAttr === "number") {
      setAttributes({
        [attributeKey]: newValue
      });
      return;
    }

    // ---------- NESTED STRUCTURE ----------
    if (nestedKey) {
      setAttributes({
        [attributeKey]: {
          ...currentAttr,
          [nestedKey]: {
            ...(currentAttr?.[nestedKey] || {}),
            [activeSubKey]: newValue
          }
        }
      });
      return;
    }

    // ---------- RESPONSIVE STRUCTURE ----------
    setAttributes({
      [attributeKey]: {
        ...(currentAttr || {}),
        [activeSubKey]: newValue
      }
    });
  }, [attributes, setAttributes, attributeKey, nestedKey, activeSubKey]);

  // Reset only current device value (not all devices)
  const handleReset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const currentAttr = attributes?.[attributeKey];

    // simple number
    if (typeof currentAttr === "number") {
      setAttributes({
        [attributeKey]: defaultValue
      });
      return;
    }

    // nested
    if (nestedKey) {
      setAttributes({
        [attributeKey]: {
          ...currentAttr,
          [nestedKey]: {
            ...(currentAttr?.[nestedKey] || {}),
            [activeSubKey]: defaultValue
          }
        }
      });
      return;
    }

    // responsive
    setAttributes({
      [attributeKey]: {
        ...(currentAttr || {}),
        [activeSubKey]: defaultValue
      }
    });
  }, [attributes, setAttributes, attributeKey, nestedKey, activeSubKey, defaultValue]);
  return {
    handleChange,
    handleReset
  };
};

/***/ },

/***/ "./src/hooks/useRangeValue.js"
/*!************************************!*\
  !*** ./src/hooks/useRangeValue.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRangeValue: () => (/* binding */ useRangeValue)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const useRangeValue = ({
  attributes,
  attributeKey,
  nestedKey,
  deviceType,
  defaultValue
}) => {
  const normalizedDeviceType = deviceType?.toLowerCase() || "desktop";
  const activeSubKey = normalizedDeviceType;
  const value = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const attribute = attributes?.[attributeKey];

    // ---------- NESTED ----------
    if (nestedKey) {
      const nested = attribute?.[nestedKey];

      // nested responsive object
      if (typeof nested === "object" && nested !== null) {
        return nested[activeSubKey] ?? defaultValue;
      }

      // nested single value
      if (nested !== undefined) {
        return nested;
      }
      return defaultValue;
    }

    // ---------- RESPONSIVE ----------
    if (typeof attribute === "object" && attribute !== null) {
      return attribute[activeSubKey] ?? defaultValue;
    }

    // ---------- NORMAL ----------
    if (typeof attribute === "number") {
      return attribute;
    }
    return defaultValue;
  }, [attributes, attributeKey, nestedKey, activeSubKey, defaultValue]);
  return {
    value,
    activeSubKey
  };
};

/***/ },

/***/ "./src/smart-post-carousel/assets/arrowIcons.js"
/*!******************************************************!*\
  !*** ./src/smart-post-carousel/assets/arrowIcons.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrowMinimal: () => (/* binding */ ArrowMinimal),
/* harmony export */   ArrowOutline: () => (/* binding */ ArrowOutline),
/* harmony export */   ArrowSolid: () => (/* binding */ ArrowSolid),
/* harmony export */   ChevronBold: () => (/* binding */ ChevronBold),
/* harmony export */   ChevronBorderLine: () => (/* binding */ ChevronBorderLine),
/* harmony export */   ChevronOutline: () => (/* binding */ ChevronOutline),
/* harmony export */   ChevronSolid: () => (/* binding */ ChevronSolid),
/* harmony export */   DoubleChevron: () => (/* binding */ DoubleChevron),
/* harmony export */   DoubleChevronOutline: () => (/* binding */ DoubleChevronOutline),
/* harmony export */   TriangleOutline: () => (/* binding */ TriangleOutline)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ChevronSolid = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 8 14",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M7.49995 6.40003L1.89995 0.700024C1.49995 0.300024 0.899951 0.300024 0.499951 0.700024C0.0999514 1.10002 0.0999514 1.70002 0.499951 2.10002L5.39995 7.00003L0.499951 11.9C0.299951 12.1 0.199951 12.3 0.199951 12.6C0.199951 13.2 0.599951 13.6 1.19995 13.6C1.49995 13.6 1.69995 13.5 1.89995 13.3L7.59995 7.60003C7.89995 7.40003 7.89995 6.80002 7.49995 6.40003Z"
  })
});
const ChevronOutline = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 10 18",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M1.25005 17.25C1.05823 17.25 0.866234 17.1767 0.719797 17.0302C0.426734 16.7372 0.426734 16.2626 0.719797 15.9697L7.68955 8.99998L0.719797 2.03023C0.426734 1.73716 0.426734 1.2626 0.719797 0.969727C1.01286 0.676852 1.48742 0.676664 1.7803 0.969727L9.2803 8.46973C9.57336 8.76279 9.57336 9.23735 9.2803 9.53023L1.7803 17.0302C1.63386 17.1767 1.44186 17.25 1.25005 17.25Z"
  })
});
const ChevronBold = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 10 15",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M9.35391 8.29922L2.97891 14.6742C2.53828 15.1148 1.82578 15.1148 1.38984 14.6742L0.330469 13.6148C-0.110156 13.1742 -0.110156 12.4617 0.330469 12.0258L4.84922 7.50703L0.330469 2.98828C-0.110156 2.54766 -0.110156 1.83516 0.330469 1.39922L1.38516 0.330469C1.82578 -0.110156 2.53828 -0.110156 2.97422 0.330469L9.34922 6.70547C9.79453 7.14609 9.79453 7.85859 9.35391 8.29922Z"
  })
});
const DoubleChevron = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 14 14",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M6.34237 13.3157C5.97377 12.9471 5.97377 12.3607 6.34237 11.992L11.3271 7.00727L6.34237 2.0225C5.97377 1.6539 5.97377 1.06746 6.34237 0.698816C6.71097 0.330212 7.29741 0.330212 7.66605 0.698816L13.3126 6.34541C13.6813 6.71401 13.6813 7.30045 13.3126 7.66909L7.66609 13.3157C7.29749 13.676 6.71105 13.676 6.34237 13.3157Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M0.687342 13.3158C0.318738 12.9471 0.318738 12.3607 0.687342 11.9921L5.67211 7.0073L0.687342 2.01421C0.318738 1.64561 0.318738 1.05917 0.687342 0.690529C1.05595 0.321888 1.64238 0.321925 2.01103 0.690529L7.65765 6.33708C8.02626 6.70569 8.02626 7.29213 7.65765 7.66077L2.01103 13.3074C1.65078 13.676 1.05598 13.676 0.687342 13.3158Z"
  })]
});
const ArrowSolid = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M1.5387 9.5107H11.016L7.83315 12.9702C7.27005 13.5773 7.31411 14.5371 7.92618 15.1002C8.53337 15.6633 9.50048 15.6266 10.0562 15.0194L15.577 9.0212C15.8414 8.7323 15.9712 8.36993 15.9712 8.00024C15.9712 7.63055 15.839 7.26577 15.577 6.97928L10.0562 0.981084C9.49797 0.373899 8.53337 0.334726 7.92618 0.900287C7.31163 1.46339 7.2676 2.42313 7.83315 3.03032L11.016 6.48978H1.5387C0.706242 6.48978 0.0280762 7.16063 0.0280762 8.0004C0.0280762 8.84017 0.70384 9.51102 1.5387 9.51102V9.5107Z"
  })
});
const ArrowOutline = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 18 16",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.489 9.73014H2.05357C0.0195797 9.73014 0.0195797 6.28366 2.05357 6.28366H11.489L8.60752 3.40218C7.19503 1.98969 9.62451 -0.496291 11.037 0.972699L17.026 6.96166C17.6475 7.52665 17.6475 8.48715 17.026 9.10864C15.0485 11.0861 13.0145 13.0636 11.037 15.0976C9.62451 16.5101 7.13853 14.0806 8.60752 12.6116L11.489 9.73014ZM13.636 8.82614L9.22902 13.2896C8.60752 13.8546 9.79401 15.0411 10.4155 14.4196C12.393 12.4421 14.427 10.4646 16.4045 8.43065C16.6305 8.20465 16.6305 7.80915 16.4045 7.58315L10.4155 1.59419C9.85051 0.972699 8.66402 2.15919 9.22902 2.78069L13.636 7.18766H2.05357C1.20607 7.18766 1.20607 8.82614 2.05357 8.82614H13.636Z"
  })
});
const ArrowMinimal = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mask", {
    id: "mask0_17641_14652",
    style: {
      maskType: "luminance"
    },
    maskUnits: "userSpaceOnUse",
    x: 0,
    y: 0,
    width: 24,
    height: 24,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M0 0H24V24H0V0Z",
      fill: "white"
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
    mask: "url(#mask0_17641_14652)",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M14.5 21.4993C14.372 21.4993 14.244 21.4503 14.146 21.3533C13.951 21.1583 13.951 20.8412 14.146 20.6462L22.793 11.9992L14.147 3.35325C13.952 3.15825 13.952 2.84125 14.147 2.64625C14.342 2.45125 14.659 2.45125 14.854 2.64625L23.854 11.6462C24.049 11.8412 24.049 12.1582 23.854 12.3532L14.854 21.3533C14.756 21.4503 14.628 21.4993 14.5 21.4993Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M23.5 12.4993H0.5C0.224 12.4993 0 12.2753 0 11.9993C0 11.7233 0.224 11.4993 0.5 11.4993H23.5C23.776 11.4993 24 11.7233 24 11.9993C24 12.2753 23.776 12.4993 23.5 12.4993Z"
    })]
  })]
});
const ChevronBorderLine = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 10 16",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M9.10076 6.80249L3.29436 0.996084C2.63187 0.334234 1.56115 0.334718 0.899298 0.996084C0.238376 1.65701 0.236804 2.7293 0.899771 3.39114L5.5082 7.99998L0.899367 12.6088C0.238445 13.2688 0.236873 14.3425 0.89984 15.0034C1.55931 15.6639 2.6312 15.6669 3.29446 15.0034L9.10086 9.19703C9.42123 8.87775 9.59686 8.4528 9.59686 7.99994C9.59686 7.54756 9.42124 7.12212 9.10086 6.80241L9.10076 6.80249ZM8.41654 8.51336L2.61013 14.3198C2.32662 14.6033 1.86683 14.6033 1.58332 14.3198C1.29981 14.0372 1.29981 13.5769 1.58332 13.2934L6.87683 7.99994L1.58332 2.70684C1.29981 2.42379 1.29981 1.96354 1.58332 1.68051C1.86637 1.39652 2.32755 1.39747 2.61013 1.68004L8.41654 7.48644C8.69973 7.77012 8.69973 8.22975 8.41654 8.51325V8.51336Z"
  })
});
const DoubleChevronOutline = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M4.68926 7.33426C4.95939 7.74031 4.95939 8.26528 4.68926 8.66963L0.897206 14.3696C0.747699 14.5939 0.734108 14.8793 0.861528 15.1171C0.98895 15.355 1.2353 15.5011 1.50373 15.5011L3.69877 15.5011C4.3002 15.5011 4.85745 15.2021 5.19044 14.7026L9.01647 8.95166C9.40043 8.37402 9.40043 7.62818 9.01647 7.05054L5.19045 1.2996C4.85745 0.800113 4.3002 0.501098 3.69877 0.501098L1.50373 0.501098C1.2353 0.501098 0.988951 0.648907 0.86153 0.88506C0.734109 1.12121 0.7477 1.40834 0.897208 1.6326L4.68926 7.33426ZM1.31175 1.12631C1.33044 1.09233 1.3865 1.01078 1.50543 1.01078L3.69877 1.01078C4.1286 1.01078 4.52786 1.22485 4.76571 1.58163L8.59174 7.33426C8.86187 7.74031 8.86187 8.26528 8.59174 8.66963L4.76571 14.4206C4.52785 14.779 4.1286 14.9914 3.69877 14.9914L1.50373 14.9914C1.3848 14.9914 1.32874 14.9099 1.31005 14.8759C1.29136 14.8419 1.25568 14.7502 1.32024 14.6516L5.11399 8.95166C5.49795 8.37402 5.49795 7.62818 5.11399 7.05054L1.32194 1.35057C1.25738 1.25203 1.29306 1.16199 1.31175 1.12631Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M10.6204 7.33426C10.8905 7.74031 10.8905 8.26528 10.6204 8.66963L6.82835 14.3696C6.67884 14.5939 6.66525 14.8793 6.79267 15.1171C6.92009 15.355 7.16644 15.5011 7.43487 15.5011L9.62991 15.5011C10.2313 15.5011 10.7886 15.2021 11.1216 14.7026L14.9459 8.95166C15.3299 8.37402 15.3299 7.62818 14.9459 7.05054L11.1199 1.2996C10.7869 0.800113 10.2296 0.501098 9.62821 0.501098L7.43317 0.501098C7.16474 0.501098 6.91839 0.648907 6.79097 0.88506C6.66355 1.12291 6.67714 1.40834 6.82665 1.6326L10.6204 7.33426ZM7.24289 1.12631C7.26158 1.09233 7.31765 1.01078 7.43657 1.01078L9.62991 1.01078C10.0597 1.01078 10.459 1.22485 10.6969 1.58163L14.5229 7.33426C14.793 7.74031 14.793 8.26528 14.5229 8.66963L10.6968 14.4206C10.459 14.779 10.0597 14.9914 9.62991 14.9914L7.43487 14.9914C7.31595 14.9914 7.25988 14.9099 7.24119 14.8759C7.2225 14.8419 7.18683 14.7502 7.25139 14.6516L11.0451 8.95166C11.4291 8.37402 11.4291 7.62818 11.0451 7.05054L7.25309 1.35057C7.18683 1.25203 7.2242 1.16199 7.24289 1.12631Z"
  })]
});
const TriangleOutline = ({
  ...props
}) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 10 12",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M9.49388 5.55745L1.14605 0.340058C0.985044 0.239429 0.782513 0.233825 0.616667 0.326556C0.450567 0.418268 0.3479 0.592775 0.3479 0.782568V11.2174C0.3479 11.4071 0.450567 11.5817 0.616667 11.6739C0.695896 11.7172 0.782513 11.7391 0.86964 11.7391C0.965682 11.7391 1.06173 11.7126 1.14605 11.6599L9.49388 6.44247C9.64622 6.34694 9.73921 6.18007 9.73921 5.99996C9.73921 5.81985 9.64622 5.65298 9.49388 5.55745ZM1.39138 10.276V1.72389L8.23284 5.99996L1.39138 10.276Z"
  })
});

/***/ },

/***/ "./src/smart-post-carousel/assets/borderIcon.js"
/*!******************************************************!*\
  !*** ./src/smart-post-carousel/assets/borderIcon.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashedBorder: () => (/* binding */ DashedBorder),
/* harmony export */   DottedBorder: () => (/* binding */ DottedBorder),
/* harmony export */   DoubleBorder: () => (/* binding */ DoubleBorder),
/* harmony export */   SolidBorder: () => (/* binding */ SolidBorder)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const SolidBorder = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "48",
  height: "25",
  viewBox: "0 0 48 25",
  fill: "none",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "9.44434",
    y: "6.05566",
    width: "29",
    height: "13",
    stroke: "#2F2F2F",
    fill: "transparent"
  })
});
const DashedBorder = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "49",
  height: "25",
  viewBox: "0 0 49 25",
  fill: "none",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "9.69417",
    y: "6.139",
    width: "29.8333",
    height: "12.8333",
    stroke: "#2F2F2F",
    "stroke-width": "1.16667",
    "stroke-miterlimit": "2.9238",
    "stroke-dasharray": "3.89 2.33",
    fill: "transparent"
  })
});
const DottedBorder = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "41",
  height: "19",
  viewBox: "0 0 41 19",
  fill: "none",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "5.721",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "8.894",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "12.067",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "15.24",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "18.413",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "21.587",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "24.76",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "27.933",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "31.106",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "34.279",
    cy: "3.729",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "5.721",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "8.894",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "12.067",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "15.24",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "18.413",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "21.587",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "24.76",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "27.933",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "31.106",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "34.279",
    cy: "16.271",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "5.721",
    cy: "6.646",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "5.721",
    cy: "10",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "5.721",
    cy: "13.354",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "34.279",
    cy: "6.646",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "34.279",
    cy: "10",
    r: "0.729",
    fill: "#1E1E1E"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: "34.279",
    cy: "13.354",
    r: "0.729",
    fill: "#1E1E1E"
  })]
});
const DoubleBorder = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "31",
  height: "15",
  viewBox: "0 0 31 15",
  fill: "none",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "1.33322",
    y: "0.944553",
    width: "29.2222",
    height: "13.2222",
    stroke: "#2F2F2F",
    "stroke-width": "0.777778",
    fill: "transparent"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
    x: "2.79434",
    y: "2.35",
    width: "26.3",
    height: "10.3",
    stroke: "#2F2F2F",
    "stroke-width": "0.7",
    fill: "transparent"
  })]
});

/***/ },

/***/ "./src/smart-post-carousel/assets/icon.js"
/*!************************************************!*\
  !*** ./src/smart-post-carousel/assets/icon.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlignCenter: () => (/* binding */ AlignCenter),
/* harmony export */   AlignLeft: () => (/* binding */ AlignLeft),
/* harmony export */   AlignRight: () => (/* binding */ AlignRight),
/* harmony export */   CarouselStandardIcon: () => (/* binding */ CarouselStandardIcon),
/* harmony export */   CarouselTickerIcon: () => (/* binding */ CarouselTickerIcon),
/* harmony export */   DndTitleIcon: () => (/* binding */ DndTitleIcon),
/* harmony export */   MobileIcon: () => (/* binding */ MobileIcon),
/* harmony export */   PopUpIcon: () => (/* binding */ PopUpIcon),
/* harmony export */   PostCarouselBlockIcon: () => (/* binding */ PostCarouselBlockIcon),
/* harmony export */   ResetIcon: () => (/* binding */ ResetIcon),
/* harmony export */   RightSymbolIcon: () => (/* binding */ RightSymbolIcon),
/* harmony export */   TabIcon: () => (/* binding */ TabIcon),
/* harmony export */   TelevisionIcon: () => (/* binding */ TelevisionIcon),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const PostCarouselBlockIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  id: "Layer_1",
  viewBox: "0 0 800 800",
  width: 80,
  height: 80,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("style", {
      children: ".sp-st0{fill:var(--sp-smart-primary-2-600)}"
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    d: "M534.2 402.2H265.9c-30.5 0-55.3-24.8-55.3-55.3V179.2c0-30.5 24.8-55.3 55.3-55.3h268.3c30.5 0 55.4 24.8 55.4 55.3v167.7c0 30.5-24.8 55.3-55.4 55.3ZM265.8 167.4c-6.5 0-11.7 5.3-11.7 11.7v167.7c0 6.5 5.3 11.7 11.7 11.7h268.3c6.5 0 11.7-5.3 11.7-11.7V179.1c0-6.5-5.2-11.7-11.7-11.7H265.8ZM500.6 484.3H232.3c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h268.3c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1ZM433.5 551.4H232.3c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h201.2c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1ZM739.2 402.2h-49.8c-30.5 0-55.4-24.8-55.4-55.3V179.2c0-30.5 24.8-55.3 55.4-55.3h49.8c12.1 0 21.8 9.8 21.8 21.8s-9.8 21.8-21.8 21.8h-49.8c-6.5 0-11.7 5.3-11.7 11.7v167.7c0 6.5 5.2 11.7 11.7 11.7h49.8c12.1 0 21.8 9.8 21.8 21.8s-9.8 21.8-21.8 21.8ZM722.9 484.3h-67.1c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h67.1c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1ZM722.9 551.4h-67.1c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h67.1c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1ZM110.6 402.2H60.8c-12 0-21.8-9.8-21.8-21.8s9.8-21.8 21.8-21.8h49.8c6.5 0 11.7-5.3 11.7-11.7V179.2c0-6.5-5.3-11.7-11.7-11.7H60.8c-12 0-21.8-9.8-21.8-21.8s9.8-21.8 21.8-21.8h49.8c30.5 0 55.3 24.8 55.3 55.3v167.7c0 30.5-24.8 55.3-55.3 55.3ZM113.9 484.3H63.6c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h50.3c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1ZM97.2 551.4H63.7c-11.1 0-20.1-9-20.1-20.1s9-20.1 20.1-20.1h33.5c11.1 0 20.1 9 20.1 20.1s-9 20.1-20.1 20.1Z",
    className: "sp-st0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: 315.5,
    cy: 645.3,
    r: 30.2,
    className: "sp-st0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: 400,
    cy: 645.3,
    r: 30.2,
    className: "sp-st0"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
    cx: 484.5,
    cy: 645.3,
    r: 30.2,
    className: "sp-st0"
  })]
});
const DndTitleIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 26,
  fill: "none",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "none",
    d: "M0 2a2 2 0 0 1 2-2h18v26H2a2 2 0 0 1-2-2V2Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M8.964 8.822a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M8.847 8.822c-.004.456-.29.881-.724 1.036-.44.157-.93.021-1.23-.336a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.152-.509c.515.104.888.56.892 1.083.001.151.236.151.234 0a1.355 1.355 0 0 0-.88-1.257 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.481.866.726 1.416.616a1.352 1.352 0 0 0 1.065-1.309c0-.151-.235-.151-.236 0ZM8.964 13a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M8.847 13c-.004.456-.29.881-.724 1.036-.44.157-.93.02-1.23-.337a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.152-.508c.515.104.888.559.892 1.083.001.15.236.15.234 0a1.354 1.354 0 0 0-.88-1.258 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.482.866.727 1.416.617a1.352 1.352 0 0 0 1.065-1.31c0-.15-.235-.15-.236 0ZM8.964 17.178a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M8.847 17.177c-.004.456-.29.882-.724 1.036-.44.157-.93.021-1.23-.336a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.152-.508c.515.104.888.559.892 1.082.001.152.236.152.234 0a1.355 1.355 0 0 0-.88-1.257 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.482.866.727 1.416.616a1.352 1.352 0 0 0 1.065-1.309c0-.15-.235-.15-.236 0ZM13.476 8.822a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M13.359 8.822c-.004.456-.291.881-.725 1.036-.439.157-.93.021-1.23-.336a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.153-.509c.514.104.888.56.892 1.083 0 .151.235.151.234 0a1.354 1.354 0 0 0-.881-1.257 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.481.866.726 1.417.616a1.352 1.352 0 0 0 1.064-1.309c0-.151-.234-.151-.235 0ZM13.476 13a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M13.359 13c-.004.456-.291.881-.725 1.036-.439.157-.93.02-1.23-.337a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.153-.508c.514.104.888.559.892 1.083 0 .15.235.15.234 0a1.354 1.354 0 0 0-.881-1.258 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.482.866.727 1.417.617a1.352 1.352 0 0 0 1.064-1.31c0-.15-.234-.15-.235 0ZM13.476 17.178a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "#4B4744",
    d: "M13.359 17.177c-.004.456-.291.882-.725 1.036-.439.157-.93.021-1.23-.336a1.11 1.11 0 0 1-.09-1.274 1.11 1.11 0 0 1 1.153-.508c.514.104.888.559.892 1.082 0 .152.235.152.234 0a1.355 1.355 0 0 0-.881-1.257 1.343 1.343 0 0 0-1.483.403 1.35 1.35 0 0 0-.116 1.547c.293.482.866.727 1.417.616a1.352 1.352 0 0 0 1.064-1.309c0-.15-.234-.15-.235 0Z"
  })]
});
const CarouselStandardIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 120,
    height: 80,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 118.5,
      height: 78.5,
      x: 0.75,
      y: 0.75,
      fill: "#fff",
      rx: 1.917
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 118.5,
      height: 78.5,
      x: 0.75,
      y: 0.75,
      stroke: value ? "#1A74E4" : "#8796A1",
      strokeWidth: 1.5,
      rx: 1.917
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M19.498 18.667h22.337c.456 0 .831.372.831.831v15.803a.834.834 0 0 1-.831.832H19.498a.834.834 0 0 1-.832-.832V19.498c0-.459.376-.831.832-.831Zm4.797 4.274a2.213 2.213 0 1 1 .002 4.425 2.213 2.213 0 0 1-.002-4.425Zm-3.704-2.352h20.151v11.223c-4.017-.7-6.13-6.347-8.651-6.347-2.688 0-6.253 6.347-8.176 6.347-1.633 0-1.789-1.68-3.324-2.44v-8.783Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 3.333,
      x: 18.666,
      y: 40.133,
      fill: "#58707F",
      rx: 1.667
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 2.333,
      x: 18.666,
      y: 47.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16.615,
      height: 2.333,
      x: 18.666,
      y: 52.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M48.832 18.667h22.336c.457 0 .832.372.832.831v15.803a.834.834 0 0 1-.832.832H48.832a.834.834 0 0 1-.832-.832V19.498c0-.459.375-.831.832-.831Zm4.797 4.274a2.213 2.213 0 1 1 .001 4.425 2.213 2.213 0 0 1-.001-4.425Zm-3.704-2.352h20.151v11.223c-4.017-.7-6.13-6.347-8.652-6.347-2.687 0-6.253 6.347-8.175 6.347-1.634 0-1.79-1.68-3.324-2.44v-8.783Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 3.333,
      x: 48,
      y: 40.133,
      fill: "#58707F",
      rx: 1.667
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 2.333,
      x: 48,
      y: 47.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16.615,
      height: 2.333,
      x: 48,
      y: 52.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M78.165 18.667H100.5c.457 0 .832.372.832.831v15.803a.834.834 0 0 1-.832.832H78.165a.834.834 0 0 1-.832-.832V19.498c0-.459.375-.831.832-.831Zm4.797 4.274a2.213 2.213 0 1 1 .001 4.425 2.213 2.213 0 0 1-.001-4.425Zm-3.704-2.352h20.151v11.223c-4.017-.7-6.13-6.347-8.652-6.347-2.687 0-6.253 6.347-8.175 6.347-1.634 0-1.79-1.68-3.324-2.44v-8.783Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 3.333,
      x: 77.333,
      y: 40.133,
      fill: "#58707F",
      rx: 1.667
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 24,
      height: 2.333,
      x: 77.333,
      y: 47.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16.615,
      height: 2.333,
      x: 77.333,
      y: 52.467,
      fill: "#58707F",
      rx: 1.167
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      stroke: "#718491",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2.4,
      d: "M106.667 41.333 112 36l-5.333-5.333M13.334 30.667 8 36l5.334 5.334"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.333,
      height: 5.333,
      x: 49.334,
      y: 60,
      fill: "#9EA9B2",
      rx: 2.667
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.333,
      height: 5.333,
      x: 57.334,
      y: 60,
      fill: "#58707F",
      rx: 2.667
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.333,
      height: 5.333,
      x: 65.334,
      y: 60,
      fill: "#9EA9B2",
      rx: 2.667
    })]
  });
};
const CarouselTickerIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 120,
    height: 80,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 118.4,
      height: 78.4,
      x: 0.8,
      y: 0.8,
      fill: "#fff",
      rx: 1.867
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 118.4,
      height: 78.4,
      x: 0.8,
      y: 0.8,
      stroke: value ? "#1A74E4" : "#8796A1",
      strokeWidth: 1.6,
      rx: 1.867
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M30.502 27.939c.456 0 .832.372.832.831v15.803a.834.834 0 0 1-.832.832L15 45.338v-5.942c.33-.34.67-.71 1.017-1.089 1.571-1.707 3.285-3.57 4.74-3.57 1.168 0 2.248 1.21 3.47 2.58 1.417 1.588 3.025 3.39 5.183 3.767V29.86L15 29.838v-1.9h15.502Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      d: "M15.176 34.424a2.2 2.2 0 0 0-.176-.865v1.73c.113-.266.176-.559.176-.865ZM15.004 49.405h14.665a1.665 1.665 0 0 1 0 3.33H15.004v-3.33ZM15.004 56.735h15.165a1.165 1.165 0 0 1 0 2.33H15.004v-2.33ZM15.004 63.065h9.165a1.165 1.165 0 0 1 0 2.33h-9.165v-2.33Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M37.499 27.939h22.336c.457 0 .832.372.832.831v15.803a.834.834 0 0 1-.832.832H37.5a.834.834 0 0 1-.832-.832V28.77c0-.459.375-.831.832-.831Zm4.797 4.273a2.213 2.213 0 1 1 .001 4.426 2.213 2.213 0 0 1-.001-4.425Zm-3.704-2.351h20.151v11.223c-4.017-.7-6.13-6.347-8.652-6.347-2.687 0-6.253 6.347-8.175 6.347-1.634 0-1.79-1.68-3.324-2.44V29.86Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      d: "M36.667 51.072c0-.921.746-1.667 1.667-1.667H59a1.667 1.667 0 1 1 0 3.333H38.334c-.92 0-1.667-.746-1.667-1.666ZM36.667 57.905c0-.645.522-1.167 1.167-1.167H59.5a1.167 1.167 0 1 1 0 2.334H37.834a1.167 1.167 0 0 1-1.167-1.167ZM36.667 62.905c0-.645.522-1.167 1.167-1.167h14.282a1.167 1.167 0 1 1 0 2.334H37.834a1.167 1.167 0 0 1-1.167-1.167Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M66.832 27.939h22.336c.457 0 .832.372.832.831v15.803a.834.834 0 0 1-.832.832H66.832a.834.834 0 0 1-.832-.832V28.77c0-.459.375-.831.832-.831Zm4.797 4.273a2.213 2.213 0 1 1 .001 4.426 2.213 2.213 0 0 1-.001-4.425Zm-3.704-2.351h20.151v11.223c-4.017-.7-6.13-6.347-8.652-6.347-2.687 0-6.253 6.347-8.175 6.347-1.634 0-1.79-1.68-3.324-2.44V29.86Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      d: "M66 51.072c0-.921.746-1.667 1.667-1.667h20.666a1.667 1.667 0 1 1 0 3.333H67.667c-.92 0-1.667-.746-1.667-1.666ZM66 57.905c0-.645.522-1.167 1.167-1.167h21.666a1.167 1.167 0 1 1 0 2.334H67.167A1.167 1.167 0 0 1 66 57.904ZM66 62.905c0-.645.522-1.167 1.167-1.167h14.282a1.167 1.167 0 1 1 0 2.334H67.167A1.167 1.167 0 0 1 66 62.904Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      fillRule: "evenodd",
      d: "M100.962 32.212a2.213 2.213 0 1 1 .002 4.426 2.213 2.213 0 0 1-.002-4.425Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      d: "M96.165 45.405a.834.834 0 0 1-.832-.832V28.77c0-.459.376-.831.832-.831h8.668v1.922h-7.575v8.782c1.535.76 1.69 2.44 3.324 2.44 1.059 0 2.617-1.925 4.251-3.655v7.977h-8.668ZM95.334 51.072c0-.921.746-1.667 1.666-1.667h7.853v3.333H97c-.92 0-1.666-.746-1.666-1.666ZM95.334 57.905c0-.645.522-1.167 1.166-1.167h8.353v2.334H96.5a1.167 1.167 0 0 1-1.166-1.167ZM95.334 62.905c0-.645.522-1.167 1.166-1.167h8.353v2.334H96.5a1.167 1.167 0 0 1-1.166-1.167Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#718491",
      fillRule: "evenodd",
      d: "M79.834 15.333c0-.368.298-.666.666-.666h.667c.368 0 .666.298.666.666V16a.667.667 0 0 1-.666.667H80.5a.667.667 0 0 1-.666-.667v-.667ZM75.167 15.333c0-.368.299-.666.667-.666h2c.368 0 .666.298.666.666V16a.667.667 0 0 1-.666.667h-2a.667.667 0 0 1-.667-.667v-.667ZM69.167 15.333c0-.368.299-.666.667-.666h3.333c.368 0 .667.298.667.666V16a.667.667 0 0 1-.667.667h-3.333a.667.667 0 0 1-.667-.667v-.667Z",
      clipRule: "evenodd"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#718491",
      d: "M45.874 11.04a1 1 0 1 0-1.414-1.414l-5.334 5.334a1 1 0 0 0 0 1.414l5.334 5.333a1 1 0 0 0 1.414-1.414l-3.626-3.626H67.5a.667.667 0 0 0 .667-.667v-.667a.667.667 0 0 0-.667-.666H42.247l3.627-3.627Z"
    })]
  });
};
const RightSymbolIcon = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 12,
  height: 12,
  fill: "none",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
    clipPath: "url(#a)",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#fff",
      d: "M6.028 0H6a6.03 6.03 0 0 0-4.817 2.422A5.95 5.95 0 0 0 0 6c0 1.146.324 2.26.938 3.221a6.017 6.017 0 0 0 2.434 2.174A5.942 5.942 0 0 0 6 12H6.028C9.32 11.984 12 9.292 12 6S9.32.016 6.028 0Zm3.55 4.727L5.815 8.492a.857.857 0 0 1-1.22 0L2.42 6.318a.865.865 0 0 1 .61-1.473c.231 0 .448.09.611.253l1.564 1.564 3.154-3.154a.857.857 0 0 1 .61-.253c.23 0 .447.09.61.253.163.163.253.38.253.61 0 .23-.09.447-.253.61Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#fff",
      d: "M9.579 4.727 5.814 8.492a.857.857 0 0 1-1.22 0L2.42 6.318a.865.865 0 0 1 .61-1.473c.231 0 .448.09.611.253l1.564 1.564 3.154-3.154a.857.857 0 0 1 .61-.253c.23 0 .447.09.61.253.163.163.253.38.253.61 0 .23-.09.447-.253.61Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#1A74E4",
      d: "M6.028 0H6a6.03 6.03 0 0 0-4.817 2.422A5.95 5.95 0 0 0 0 6c0 1.146.324 2.26.938 3.221a6.017 6.017 0 0 0 2.434 2.174A5.942 5.942 0 0 0 6 12H6.028C9.32 11.984 12 9.292 12 6S9.32.016 6.028 0Zm3.55 4.727L5.815 8.492a.857.857 0 0 1-1.22 0L2.42 6.318a.865.865 0 0 1 .61-1.473c.231 0 .448.09.611.253l1.564 1.564 3.154-3.154a.857.857 0 0 1 .61-.253c.23 0 .447.09.61.253.163.163.253.38.253.61 0 .23-.09.447-.253.61Z"
    })]
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
      id: "a",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fill: "#fff",
        d: "M0 0h12v12H0z"
      })
    })
  })]
});
function MobileIcon({
  color = "#8C8F94"
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "14",
    height: "12",
    viewBox: "0 0 14 12",
    fill: "currentColor",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M6.286 0H1.714C1.082 0 .571.67.571 1.5v9c0 .83.51 1.5 1.143 1.5h4.572c.632 0 1.142-.67 1.142-1.5v-9c0-.83-.51-1.5-1.142-1.5ZM4.762 11H3.238v-.5h1.524v.5Zm2-1.5H1.238v-8h5.524v8Z",
      fill: color
    })
  });
}
function TelevisionIcon({
  color = "#8C8F94"
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "12",
    viewBox: "0 0 14 12",
    fill: "none",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M12.5714 0H1.14286C0.511905 0 0 0.503906 0 1.125V8.625C0 9.24609 0.511905 9.75 1.14286 9.75H5.71428L5.33333 10.875H3.61905C3.30238 10.875 3.04762 11.1258 3.04762 11.4375C3.04762 11.7492 3.30238 12 3.61905 12H10.0952C10.4119 12 10.6667 11.7492 10.6667 11.4375C10.6667 11.1258 10.4119 10.875 10.0952 10.875H8.38095L8.00001 9.75H12.5714C13.2024 9.75 13.7143 9.24609 13.7143 8.625V1.125C13.7143 0.503906 13.2024 0 12.5714 0ZM12.1905 8.25H1.52381V1.5H12.1905V8.25Z",
      fill: color
    })
  });
}
function TabIcon({
  color = "#8C8F94"
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "14",
    height: "12",
    viewBox: "0 0 14 12",
    fill: "currentColor",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M9.428 0H2.571C1.623 0 .857.67.857 1.5v9c0 .83.766 1.5 1.714 1.5h6.857c.949 0 1.715-.67 1.715-1.5v-9c0-.83-.766-1.5-1.715-1.5ZM7.143 11H4.857v-.5h2.286v.5Zm3-1.5H1.857v-8h8.286v8Z",
      fill: color
    })
  });
}
const ResetIcon = props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  width: 14,
  height: 14,
  viewBox: "0 0 14 14",
  fill: "none",
  ...props,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
    clipPath: "url(#clip0_13968_266)",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M2.26612 4.11595C3.37829 2.2925 5.49847 1.20166 7.74998 1.50927C10.7824 1.92355 12.9048 4.71765 12.4905 7.75006C12.0762 10.7825 9.2821 12.9049 6.24972 12.4906C3.99821 12.183 2.24836 10.5634 1.66601 8.5085M2.02244 2.49303L2.04627 4.36557L3.84791 4.2143",
      stroke: "#949494",
      strokeWidth: 1.75,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "transparent"
    })
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
      id: "clip0_13968_266",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
        width: 14,
        height: 14,
        fill: "white"
      })
    })
  })]
});
const AlignLeft = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M8.4 14.8v.5H.5v-.5h7.9ZM.5 1.2V.7h7.9v.5H.5Zm15 7H.5v-.5h15v.5Z"
  })
});
const AlignCenter = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  fill: "none",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "currentColor",
    d: "M12.4.2H3.6v1.5h8.9V.2h-.1ZM0 7.2v1.5h16V7.2H0Zm3.6 8.6h8.9v-1.5H3.6v1.5Z"
  })
});
const AlignRight = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 80,
  height: 24,
  fill: "none",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
    fill: "currentColor",
    stroke: "currentColor",
    d: "M47.5 18.8v.5h-7.9v-.5h7.9Zm0-13.6h-7.9v-.5h7.9v.5Zm0 6.6v.5h-15v-.5h15Z"
  })
});
const PopUpIcon = ({
  isActive
}) => {
  const bgColor = isActive ? "var(--sp-smart-primary-2-400)" : "transparent";
  const lineColor = isActive ? "#FFFFFF" : "#2F2F2F";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: bgColor,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: "22.4",
      height: "22.4",
      x: "0.8",
      y: "0.8",
      fill: bgColor,
      rx: "3.2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: "22.4",
      height: "22.4",
      x: "0.8",
      y: "0.8",
      stroke: lineColor,
      "stroke-width": "1.6",
      rx: "3.2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: lineColor,
      d: "M19.584 7.938a.813.813 0 0 0-.813-.813H11.32a2.439 2.439 0 0 0-4.598 0H5.23a.813.813 0 0 0 0 1.625h1.493a2.439 2.439 0 0 0 4.598 0h7.451a.813.813 0 0 0 .813-.813ZM19.584 16.063a.813.813 0 0 0-.813-.813h-1.493a2.439 2.439 0 0 0-4.597 0H5.229a.813.813 0 0 0 0 1.625h7.452a2.439 2.439 0 0 0 4.597 0h1.493a.813.813 0 0 0 .813-.813Z"
    })]
  });
};
function Circle({
  fill
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: fill,
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
      cx: "12",
      cy: "12",
      r: "11.5",
      fill: fill,
      stroke: "#DDDDDD"
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);

/***/ },

/***/ "./src/smart-post-carousel/assets/metaIcon.js"
/*!****************************************************!*\
  !*** ./src/smart-post-carousel/assets/metaIcon.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ICONS: () => (/* binding */ ICONS)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ICONS = {
  author: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M7.36829 3.2237C7.36829 4.24106 6.54354 5.0658 5.52619 5.0658C4.50882 5.0658 3.68408 4.24106 3.68408 3.2237C3.68408 2.20633 4.50882 1.38159 5.52619 1.38159C6.54354 1.38159 7.36829 2.20633 7.36829 3.2237Z",
      stroke: "#4e6e3e",
      "stroke-width": "0.789474"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M6.44747 6.44739H4.60537C3.33366 6.44739 2.30273 7.47832 2.30273 8.75002C2.30273 9.25872 2.7151 9.67107 3.22379 9.67107H7.82905C8.33775 9.67107 8.7501 9.25872 8.7501 8.75002C8.7501 7.47832 7.71917 6.44739 6.44747 6.44739Z",
      stroke: "#4e6e3e",
      "stroke-width": "0.789474",
      "stroke-linejoin": "round"
    })]
  }),
  date: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
      "clip-path": "url(#clip0_11065_138337)",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M8.2895 0.921082V1.84213M2.76318 0.921082V1.84213",
        stroke: "#4e6e3e",
        "stroke-width": "0.789474",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M4.60506 7.82892L4.60505 6.14671C4.60505 6.05843 4.54208 5.98682 4.4644 5.98682H4.14453M6.27663 7.82892L6.90041 6.14763C6.92956 6.06902 6.86753 5.98682 6.77906 5.98682H5.98664",
        stroke: "#4e6e3e",
        "stroke-width": "0.789474",
        "stroke-linecap": "round"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M1.15137 5.63833C1.15137 3.6317 1.15137 2.62837 1.728 2.00498C2.30464 1.38159 3.23271 1.38159 5.08887 1.38159H5.96387C7.82002 1.38159 8.74812 1.38159 9.32474 2.00498C9.90137 2.62837 9.90137 3.6317 9.90137 5.63833V5.87486C9.90137 7.88151 9.90137 8.88481 9.32474 9.50822C8.74812 10.1316 7.82002 10.1316 5.96387 10.1316H5.08887C3.23271 10.1316 2.30464 10.1316 1.728 9.50822C1.15137 8.88481 1.15137 7.88151 1.15137 5.87486V5.63833Z",
        stroke: "#4e6e3e",
        "stroke-width": "0.789474",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M2.76318 3.6842H8.2895",
        stroke: "#4e6e3e",
        "stroke-width": "0.789474",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
        id: "clip0_11065_138337",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
          width: "11.0526",
          height: "11.0526",
          fill: "white"
        })
      })
    })]
  }),
  comments: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "13",
    height: "13",
    viewBox: "0 0 13 13",
    fill: "none",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M12.1667 6.08057C12.1667 9.16244 9.55462 11.6611 6.33333 11.6611C5.95458 11.6617 5.57687 11.6266 5.20482 11.5568C4.93703 11.5064 4.80312 11.4813 4.70964 11.4956C4.61616 11.5099 4.48369 11.5803 4.21874 11.7212C3.46925 12.1198 2.5953 12.2606 1.75481 12.1042C2.07427 11.7113 2.29244 11.2399 2.38871 10.7345C2.44704 10.4253 2.3025 10.125 2.08602 9.90514C1.10278 8.90671 0.5 7.56131 0.5 6.08057C0.5 2.99875 3.11204 0.5 6.33333 0.5C9.55462 0.5 12.1667 2.99875 12.1667 6.08057Z",
      stroke: "#4e6e3e",
      "stroke-linejoin": "round"
    })
  }),
  views: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "#4e6e3e",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M12,19.8c-5.1,0-8.8-4.4-10.2-6.4c-0.3-0.5-0.6-0.8-0.6-1.4s0.3-0.9,0.6-1.4C3.2,8.7,6.9,4.2,12,4.2s8.8,4.4,10.2,6.4v0   L21.5,11l0.6-0.4c0.3,0.5,0.6,0.8,0.6,1.4s-0.2,0.9-0.6,1.4C20.8,15.3,17.1,19.8,12,19.8z M12,5.8c-4.4,0-7.7,4-8.9,5.7   c-0.2,0.3-0.3,0.4-0.3,0.5s0.1,0.2,0.3,0.5c1.2,1.7,4.6,5.7,8.9,5.7s7.7-4,8.9-5.7c0.2-0.3,0.3-0.4,0.3-0.5s-0.1-0.2-0.3-0.5   l0.6-0.4l-0.6,0.4C19.7,9.8,16.4,5.8,12,5.8z"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M12,15.8c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C15.8,14.1,14.1,15.8,12,15.8z M12,9.8   c-1.2,0-2.2,1-2.2,2.2c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2C14.2,10.8,13.2,9.8,12,9.8z"
      })
    })]
  }),
  likes: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "100",
    height: "100",
    viewBox: "0 0 100 100",
    fill: "#4e6e3e",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      "clip-path": "url(#clip0_20749_9902)",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M89.5313 12.5585C78.2422 3.06629 60.8008 4.49207 50 15.4882C39.1992 4.49207 21.7578 3.04676 10.4688 12.5585C-4.21873 24.9218 -2.07029 45.078 8.39846 55.7616L42.6563 90.6639C44.6094 92.6561 47.2266 93.7694 50 93.7694C52.793 93.7694 55.3907 92.6757 57.3438 90.6835L91.6016 55.7811C102.051 45.0975 104.238 24.9413 89.5313 12.5585ZM84.9219 49.1796L50.6641 84.0819C50.1953 84.5507 49.8047 84.5507 49.336 84.0819L15.0781 49.1796C7.94924 41.9139 6.50393 28.1639 16.5039 19.746C24.1016 13.3593 35.8203 14.3163 43.1641 21.7968L50 28.7694L56.836 21.7968C64.2188 14.2772 75.9375 13.3593 83.4961 19.7264C93.4766 28.1444 91.9922 41.9725 84.9219 49.1796Z",
        fill: "#4e6e3e"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
        id: "clip0_20749_9902",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
          width: "100",
          height: "100",
          fill: "white"
        })
      })
    })]
  }),
  clock: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24",
    fill: "#4e6e3e",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M12,22.8C6.1,22.8,1.2,17.9,1.2,12S6.1,1.2,12,1.2S22.8,6.1,22.8,12S17.9,22.8,12,22.8z M12,2.8c-5.1,0-9.2,4.1-9.2,9.2   s4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2S17.1,2.8,12,2.8z"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("g", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M14,14.8c-0.2,0-0.4-0.1-0.5-0.2l-2-2c-0.1-0.1-0.2-0.3-0.2-0.5V8c0-0.4,0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8v3.7l1.8,1.8   c0.3,0.3,0.3,0.8,0,1.1C14.4,14.7,14.2,14.8,14,14.8z"
      })
    })]
  })
};

/***/ },

/***/ "./src/smart-post-carousel/assets/orientationIcon/index.js"
/*!*****************************************************************!*\
  !*** ./src/smart-post-carousel/assets/orientationIcon/index.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrientationFourIcon: () => (/* binding */ OrientationFourIcon),
/* harmony export */   OrientationOneIcon: () => (/* binding */ OrientationOneIcon),
/* harmony export */   OrientationThreeIcon: () => (/* binding */ OrientationThreeIcon),
/* harmony export */   OrientationTwoIcon: () => (/* binding */ OrientationTwoIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const OrientationOneIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 56,
    height: 56,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 54.5,
      height: 54.5,
      x: 0.75,
      y: 0.75,
      fill: "#fff",
      rx: 3.25
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 54.5,
      height: 54.5,
      x: 0.75,
      y: 0.75,
      stroke: value ? "#1A74E4" : "#8796A1",
      strokeWidth: 1.2,
      rx: 3.25
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 42,
      height: 27,
      x: 7,
      y: 7,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.023,
      height: 1,
      x: 7,
      y: 36.5,
      fill: "#58707F",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.023,
      height: 1,
      x: 13.977,
      y: 36.5,
      fill: "#58707F",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 28,
      height: 2,
      x: 7,
      y: 38.5,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 7,
      y: 42.5,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 7,
      y: 45,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16,
      height: 1.5,
      x: 7,
      y: 47.5,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("defs", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("clipPath", {
        id: "a",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          fill: "#fff",
          d: "M39 5h12v12H39z"
        })
      })
    })]
  });
};
const OrientationTwoIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 56,
    height: 56,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      fill: "#fff",
      rx: 2.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      stroke: value ? "#1A74E4" : "#8796A1",
      rx: 2.5,
      strokeWidth: 1.2
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 42,
      height: 27,
      x: 7,
      y: 7,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.023,
      height: 1,
      x: 7,
      y: 36.5,
      fill: "#58707F",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 5.023,
      height: 1,
      x: 13.977,
      y: 36.5,
      fill: "#58707F",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 28,
      height: 2,
      x: 7,
      y: 38.5,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 7,
      y: 42.5,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 7,
      y: 45,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16,
      height: 1.5,
      x: 7,
      y: 47.5,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 12,
      height: 10,
      x: 9,
      y: 21,
      fill: "#9EA9B2",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
      opacity: 0.9,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        fill: "#fff",
        d: "M9 21.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V26H9v-4.5Z"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
        width: 8,
        height: 1,
        x: 11,
        y: 23,
        fill: "#58707F",
        rx: 0.5
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 8,
      height: 1,
      x: 11,
      y: 28,
      fill: "#fff",
      rx: 0.5
    })]
  });
};
const OrientationThreeIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 56,
    height: 56,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      fill: "#fff",
      rx: 2.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      stroke: value ? "#1A74E4" : "#8796A1",
      rx: 2.5,
      strokeWidth: 1.2
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 42,
      height: 28.5,
      x: 7,
      y: 7,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#9EA9B2",
      d: "M22 32a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v3.5H22V32Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 8,
      height: 1,
      x: 24,
      y: 33,
      fill: "#fff",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 28,
      height: 2,
      x: 14,
      y: 38.5,
      fill: "#58707F",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 9,
      y: 42.5,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 38,
      height: 1.5,
      x: 9,
      y: 45,
      fill: "#58707F",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16,
      height: 1.5,
      x: 20,
      y: 47.5,
      fill: "#58707F",
      rx: 0.75
    })]
  });
};
const OrientationFourIcon = ({
  value
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 56,
    height: 56,
    fill: "none",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      fill: "#fff",
      rx: 2.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 55,
      height: 55,
      x: 0.5,
      y: 0.5,
      stroke: value ? "#1A74E4" : "#8796A1",
      rx: 2.5,
      strokeWidth: 1.2
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#58707F",
      d: "M7 7a1 1 0 0 1 1-1h40a1 1 0 0 1 1 1v24.5H7V7Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      fill: "#9EA9B2",
      d: "M7 31.5h42V49a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V31.5Z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 28,
      height: 2,
      x: 11,
      y: 35.5,
      fill: "#fff",
      rx: 1
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 34,
      height: 1.5,
      x: 11,
      y: 39.5,
      fill: "#fff",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 34,
      height: 1.5,
      x: 11,
      y: 42,
      fill: "#fff",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 16,
      height: 1.5,
      x: 11,
      y: 44.5,
      fill: "#fff",
      rx: 0.75
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 12,
      height: 4,
      x: 35,
      y: 8,
      fill: "#9EA9B2",
      rx: 0.5
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      width: 8,
      height: 1,
      x: 37,
      y: 9.5,
      fill: "#fff",
      rx: 0.5
    })]
  });
};

/***/ },

/***/ "./src/smart-post-carousel/block.json"
/*!********************************************!*\
  !*** ./src/smart-post-carousel/block.json ***!
  \********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/smart-post-carousel","version":"0.1.0","title":"Smart Post Carousel","category":"smart-post-carousel","description":"Display posts in a responsive carousel with smooth navigation.","example":{},"supports":{"html":false,"align":["wide","full"]},"attributes":{"showReadMore":{"type":"boolean","default":false},"showTitle":{"type":"boolean","default":false},"partialView":{"type":"boolean","default":false},"showTaxonomy":{"type":"boolean","default":false},"showMetaData":{"type":"boolean","default":false},"showExcerpt":{"type":"boolean","default":false},"showSocialShare":{"type":"boolean","default":false},"showFeaturedImage":{"type":"boolean","default":false},"carouselStyle":{"type":"string","default":"standard"},"contentOrientation":{"type":"string","default":"orientation_one"},"columns":{"type":"object","default":{"desktop":3,"tablet":2,"mobile":1}},"height":{"type":"object","default":{"desktop":642,"tablet":642,"mobile":642}},"gap":{"type":"object","default":{"desktop":24,"tablet":48,"mobile":24}},"slideGroup":{"type":"object","default":{"desktop":1,"tablet":1,"mobile":1}},"autoPlay":{"type":"boolean","default":true},"delay":{"type":"number","default":2000},"speed":{"type":"number","default":600},"direction":{"type":"string","default":"right"},"contentAlignment":{"type":"string","default":"flex-start"},"preloader":{"type":"boolean","default":false},"equalHeight":{"type":"boolean","default":false},"onHover":{"type":"boolean","default":false},"linkOpen":{"type":"string","default":"newTab"},"effect":{"type":"string","default":"slide"},"adaptiveHeight":{"type":"boolean","default":false},"infiniteLoop":{"type":"boolean","default":true},"keyNavigation":{"type":"boolean","default":true},"freeScroll":{"type":"boolean","default":false},"navigationArrow":{"type":"boolean","default":true},"paginationDots":{"type":"boolean","default":true},"numberOfSlides":{"type":"number","default":3},"arrowStyle":{"type":"string","default":"chevron-solid"},"visibilityOnHover":{"type":"boolean","default":false},"iconSize":{"type":"number","default":{"desktop":16,"tablet":16,"mobile":16}},"iconWidth":{"type":"number","default":{"desktop":40,"tablet":40,"mobile":40}},"iconHeight":{"type":"number","default":{"desktop":40,"tablet":40,"mobile":40}},"spaceBetweenArrow":{"type":"number","default":{"desktop":100,"tablet":100,"mobile":100}},"horizontalPosition":{"type":"number","default":{"desktop":44,"tablet":0,"mobile":0}},"verticalPosition":{"type":"number","default":{"desktop":50,"tablet":50,"mobile":50}},"navArrowStyleType":{"type":"string","default":"normal"},"iconColor":{"type":"string","default":"#fff"},"iconHoverColor":{"type":"string","default":"#fff"},"iconBackGroundColor":{"type":"string","default":"#4e4f52"},"iconBackGroundHoverColor":{"type":"string","default":"#4e6e3e"},"borderStyle":{"type":"string","default":"none"},"borderWidth":{"type":"number","default":{"desktop":0,"tablet":0,"mobile":0}},"borderColor":{"type":"string","default":"#11111"},"borderRadius":{"type":"number","default":{"desktop":50,"tablet":50,"mobile":50}}},"render":"file:./render.php","textdomain":"smart-post-carousel","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ },

/***/ "./src/smart-post-carousel/edit.js"
/*!*****************************************!*\
  !*** ./src/smart-post-carousel/edit.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Inspector_Inspector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Inspector/Inspector */ "./src/components/Inspector/Inspector.js");
/* harmony import */ var _components_Renderer_CarouselRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Renderer/CarouselRenderer */ "./src/components/Renderer/CarouselRenderer.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../context */ "./src/context/index.js");
/* harmony import */ var _hooks_useApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useApi */ "./src/hooks/useApi.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/smart-post-carousel/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







function Edit({
  attributes,
  setAttributes
}) {
  //using Custom Hooks to Fetching posts

  const {
    numberOfSlides
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)();
  const {
    posts,
    loading
  } = (0,_hooks_useApi__WEBPACK_IMPORTED_MODULE_4__["default"])({
    posts_per_page: numberOfSlides
  });
  const renderContent = () => {
    if (loading) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        children: "Loading posts..."
      });
    }
    if (!posts || posts.length === 0) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        children: "No posts found."
      });
    }
    return (
      /*#__PURE__*/
      // Use Shared Renderer for Swiper and Marquee Carousel
      (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Renderer_CarouselRenderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
        carouselStyle: attributes.carouselStyle,
        attributes: attributes,
        posts: posts
      })
    );
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_context__WEBPACK_IMPORTED_MODULE_3__.AttributesProvider, {
      attributes: attributes,
      setAttributes: setAttributes,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_context__WEBPACK_IMPORTED_MODULE_3__.PanelProvider, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Inspector_Inspector__WEBPACK_IMPORTED_MODULE_1__["default"], {
          attributes: attributes,
          setAttributes: setAttributes
        })
      }), renderContent()]
    })
  });
}

/***/ },

/***/ "./src/smart-post-carousel/editor.scss"
/*!*********************************************!*\
  !*** ./src/smart-post-carousel/editor.scss ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/smart-post-carousel/index.js"
/*!******************************************!*\
  !*** ./src/smart-post-carousel/index.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/smart-post-carousel/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/smart-post-carousel/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/smart-post-carousel/block.json");
/* harmony import */ var _assets_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/icon */ "./src/smart-post-carousel/assets/icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_assets_icon__WEBPACK_IMPORTED_MODULE_4__.PostCarouselBlockIcon, {})
});

/***/ },

/***/ "./src/smart-post-carousel/style.scss"
/*!********************************************!*\
  !*** ./src/smart-post-carousel/style.scss ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./utils/index.js"
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHUNKED_EFFECTS: () => (/* binding */ CHUNKED_EFFECTS),
/* harmony export */   EFFECT_MAP: () => (/* binding */ EFFECT_MAP),
/* harmony export */   arrayChunk: () => (/* binding */ arrayChunk),
/* harmony export */   countWordAndCharacter: () => (/* binding */ countWordAndCharacter),
/* harmony export */   getPostDate: () => (/* binding */ getPostDate),
/* harmony export */   stripComments: () => (/* binding */ stripComments)
/* harmony export */ });
const stripComments = (content = "") => {
  if (!content) return "";
  return content.replace(/<!--\s*wp:[\s\S]*?-->/g, "").replace(/<!--\s*\/wp:[\s\S]*?-->/g, "").replace(/<\/?[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
};
const countWordAndCharacter = (content = "") => {
  const text = stripComments(content);
  return {
    words: text ? text.split(" ").length : 0,
    chars: text.length
  };
};
const getPostDate = post => {
  let date = null;

  // API custom structured date
  if (post.post_date?.month && post.post_date?.day && post.post_date?.year) {
    date = new Date(`${post.post_date?.month}-${post.post_date?.day}-${post.post_date?.year}`);
  }
  // WordPress default
  else if (post.date) {
    date = new Date(post.date);
  }

  // fallback
  else {
    dateObj = new Date();
  }
  return {
    day: date.toLocaleDateString("en-US", {
      day: "2-digit"
    }),
    month: date.toLocaleDateString("en-US", {
      month: "short"
    }),
    monthFull: date.toLocaleDateString("en-US", {
      month: "long"
    }),
    year: date.toLocaleDateString("en-US", {
      year: "numeric"
    }),
    full: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }),
    meta: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  };
};

// These effects need chunked posts
const CHUNKED_EFFECTS = ["fade", "cube", "flip"];
const EFFECT_MAP = {
  cover: "coverflow",
  fade: "fade",
  cube: "cube",
  flip: "flip"
};

// Chunk array into groups
const arrayChunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"smart-post-carousel/index": 0,
/******/ 			"smart-post-carousel/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunksmart_post_carousel"] = globalThis["webpackChunksmart_post_carousel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["smart-post-carousel/style-index"], () => (__webpack_require__("./src/smart-post-carousel/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map