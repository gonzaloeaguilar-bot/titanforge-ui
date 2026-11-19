(function () {
  const w = window;
  // This file is loaded from TWO places by design — the Next root layout (so
  // every route is measured, not only the catch-all) and the canonical bundle
  // / static shells. Executing twice would double every event, so the second
  // load returns here.
  if (w.__titanEventsLoaded) return;
  w.__titanEventsLoaded = true;
  w.dataLayer = w.dataLayer || [];
  const config = w.TITAN_ANALYTICS_CONFIG || {};
  const eventHistory = [];
  const suppressionReason = analyticsSuppressionReason();
  w.TITAN_ANALYTICS_SUPPRESSION_REASON = suppressionReason;
  document.documentElement.setAttribute('data-titan-events-ready', 'true');
  if (suppressionReason) document.documentElement.setAttribute('data-titan-analytics-suppressed', suppressionReason);

  function analyticsSuppressionReason() {
    if (w.TITAN_ANALYTICS_TEST_MODE === true) return '';
    try {
      const params = new URLSearchParams(w.location.search || '');
      const internalFlag = params.get('titan_internal');
      if (internalFlag === '1') setInternalBrowserOptOut(true);
      if (internalFlag === '0') setInternalBrowserOptOut(false);
      if (internalBrowserOptedOut()) return 'internal_browser';
    } catch (error) {}
    const host = (w.location.hostname || '').toLowerCase();
    const isGa4DebugPreview = config.ga4DebugMode === true
      && Boolean(config.ga4Id)
      && !config.gtmId
      && host.endsWith('.vercel.app');
    if (host === 'localhost' || host === '127.0.0.1' || (host.endsWith('.vercel.app') && !isGa4DebugPreview)) return 'non_production_host';
    if (w.navigator && w.navigator.webdriver === true) return 'webdriver';
    const userAgent = (w.navigator && w.navigator.userAgent) || '';
    if (/HeadlessChrome|Chrome-Lighthouse|Lighthouse|Google-InspectionTool|PageSpeed Insights|Vercelbot/i.test(userAgent)) return 'automated_user_agent';
    return '';
  }

  function setInternalBrowserOptOut(enabled) {
    try {
      if (enabled) {
        w.localStorage.setItem('titan_internal_traffic', '1');
        w.sessionStorage.setItem('titan_internal_traffic', '1');
      } else {
        w.localStorage.removeItem('titan_internal_traffic');
        w.sessionStorage.removeItem('titan_internal_traffic');
      }
    } catch (error) {}
    try {
      document.cookie = enabled
        ? 'titan_analytics_opt_out=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure'
        : 'titan_analytics_opt_out=; Path=/; Max-Age=0; SameSite=Lax; Secure';
    } catch (error) {}
  }

  function internalBrowserOptedOut() {
    try {
      if (w.localStorage.getItem('titan_internal_traffic') === '1') return true;
      if (w.sessionStorage.getItem('titan_internal_traffic') === '1') return true;
    } catch (error) {}
    return /(?:^|;\s*)titan_analytics_opt_out=1(?:;|$)/.test(document.cookie || '');
  }

  function routeGroup(path) {
    if (path === '/') return 'home';
    if (path === '/apply') return 'apply';
    if (path === '/start') return 'selector';
    if (path.startsWith('/resources/')) return 'resource_article';
    if (path === '/resources') return 'resources';
    if (path.startsWith('/for/')) return 'audience';
    if (path.startsWith('/vs/')) return 'comparison';
    if (path.startsWith('/free/')) return 'free_tool';
    if (path === '/shop') return 'shop';
    return path.replace(/^\//, '') || 'unknown';
  }

  function pageIntent(path) {
    if (path === '/apply') return 'apply_for_coaching';
    if (path === '/start') return 'choose_path';
    if (path.startsWith('/for/')) return 'audience_self_identification';
    if (path.startsWith('/vs/')) return 'compare_solution';
    if (path.startsWith('/free/')) return 'lead_magnet_self_check';
    if (path.startsWith('/resources')) return 'learn_first';
    if (path === '/shop') return 'shop_support_tools';
    return 'browse';
  }

  function currentPath() {
    const hash = w.location.hash && w.location.hash.replace(/^#/, '');
    const raw = hash && hash.startsWith('/') ? hash : (w.location.pathname.replace(/\/index\.html$/, '') || '/');
    return raw === '/' ? '/' : raw.replace(/\/$/, '');
  }


  /* ------------------------------------------------------------------ *
   * CROSS-BRAND ANALYTICS CONTRACT  (~/.claude/durable/ANALYTICS_CONTRACT.md)
   *
   * WHY DUAL EMIT, and why nothing is renamed in place.
   * This site had grown 36 private event names — apply_cta_click, shop_click,
   * commercial_scroll, form_field_interaction — so not one funnel question
   * could be asked across FLAS, Geebs, DuPont and Titan with a single query.
   * The fix is NOT a rename: read live from the GA4 Admin API on 2026-09-19,
   * property 545201342 (stream G-JQP049J2YR, titanforgefit.com) has ten KEY
   * EVENTS and most are keyed to those private names —
   *   purchase, generate_lead, shop_click, apply_cta_click,
   *   free_readiness_apply_click, coach_booking_click,
   *   apply_form_submit_attempt, pathfinder_result_apply_click,
   *   close_convert_lead, qualify_lead
   * Renaming any of them in place would silently zero a configured conversion
   * and every report built on it.
   *
   * So each legacy name keeps flowing UNTOUCHED, and the contract event rides
   * alongside under a DIFFERENT name — nothing is counted twice. Retire a
   * legacy leg only after its key event and its reports are repointed.
   *
   * `dual: false` means the shared auto-instrumentation module
   * (/analytics/track.js) already owns that contract event for this page, so
   * only the legacy leg is sent. One writer per event name, always.
   *
   * analytics-legacy-map.json at the repo root is the same table in data form
   * and is what the gate reads; keep the two in step.
   * ------------------------------------------------------------------ */
  const CONTRACT_REQUIRED = {
    page_view: [], section_view: ['section_id'], scroll_depth: ['percent'],
    page_dwell: ['seconds'], cta_click: ['cta_id', 'cta_text', 'cta_position'],
    outbound_click: ['destination_domain', 'link_context'],
    contact_click: ['method'], form_start: ['form_id'],
    form_step: ['form_id', 'step'], form_error: ['form_id', 'error_code', 'field'],
    form_submit: ['form_id'], lead: ['form_id', 'lead_type'],
    media_play: ['media_id', 'media_type'], search: ['search_term'],
    filter_apply: ['filter_name', 'filter_value'],
    item_view: ['item_id', 'item_category'], item_click: ['item_id', 'list_name'],
    share_click: ['channel'], experiment_exposure: ['experiment_id', 'variant'],
    error_shown: ['error_code', 'surface'],
  };

  const CONTRACT_MAP = {
    // The scholarship funnel was invisible to the first pass: the gate could
    // not see events emitted through a wrapper, so these eight never reached
    // the map. Same contract as every other brand — one `lead`, the kind in a
    // parameter.
    scholarship_application_started: { event: "form_start", params: { form_id: "scholarship_application" } },
    scholarship_application_step_completed: { event: "form_step", params: { form_id: "scholarship_application" } },
    scholarship_application_step_viewed: { event: "form_step", params: { form_id: "scholarship_application", step: "viewed" } },
    scholarship_application_submitted: { event: "lead", params: { form_id: "scholarship_application", lead_type: "scholarship_application" } },
    scholarship_lead_captured: { event: "lead", params: { form_id: "scholarship_application", lead_type: "scholarship_lead" } },
    scholarship_coach_profile_opened: { event: "cta_click", params: { cta_kind: "coach_profile" } },
    scholarship_income_range_selected: { event: "form_step", params: { form_id: "scholarship_application", step: "income_range" } },
    scholarship_page_view: { event: "section_view", params: { section_id: "scholarship_page" } },
    about_click: { event: 'cta_click' },
    apply_bridge_click: { event: 'cta_click' },
    apply_cta_click: { event: 'cta_click' },
    apply_form_invalid_submit: { event: 'form_error', params: { error_code: 'validation', field: 'unknown' } },
    apply_form_start: { event: 'form_start' },
    apply_form_submit_attempt: { event: 'form_submit' },
    apply_form_valid_submit: { event: 'form_submit' },
    begin_checkout: { event: 'cta_click' },
    catalog_product_click: { event: 'item_click', params: { list_name: 'titan_shop' } },
    catalog_view: { event: 'section_view', params: { section_id: 'catalog' }, dual: false },
    checkout_handoff: { event: 'cta_click' },
    close_convert_lead: { event: 'lead', params: { lead_type: 'close_convert' } },
    coach_booking_click: { event: 'contact_click', params: { method: 'booking' } },
    coaching_click: { event: 'cta_click' },
    commercial_cta_click: { event: 'cta_click' },
    commercial_engaged: { event: 'page_dwell', dual: false },
    commercial_page_view: { event: 'page_view', dual: false },
    commercial_scroll: { event: 'scroll_depth', dual: false },
    commercial_section_view: { event: 'section_view', dual: false },
    daily_habit_clear: { event: 'cta_click' },
    daily_habit_email_fallback: { event: 'contact_click', params: { method: 'email' } },
    daily_habit_email_submit: { event: 'lead', params: { form_id: 'daily_habit', lead_type: 'lead_magnet' } },
    daily_habit_toggle: { event: 'cta_click' },
    daily_log_anchor_click: { event: 'cta_click' },
    daily_log_anchor_toggle: { event: 'cta_click' },
    daily_log_clear: { event: 'cta_click' },
    daily_planner_anchor_toggle: { event: 'cta_click' },
    daily_planner_clear: { event: 'cta_click' },
    daily_planner_email_fallback: { event: 'contact_click', params: { method: 'email' } },
    daily_planner_email_submit: { event: 'lead', params: { form_id: 'daily_planner', lead_type: 'lead_magnet' } },
    daily_readiness_clear: { event: 'cta_click' },
    daily_readiness_email_fallback: { event: 'contact_click', params: { method: 'email' } },
    daily_readiness_email_submit: { event: 'lead', params: { form_id: 'daily_readiness', lead_type: 'lead_magnet' } },
    daily_readiness_score_select: { event: 'cta_click' },
    debug_preview_probe: { event: 'cta_click', dual: false },
    form_abandon: { event: 'form_step', params: { step: 'abandon' } },
    form_field_interaction: { event: 'form_step' },
    form_impression: { event: 'section_view', params: { section_id: 'form' }, dual: false },
    form_step_attempt: { event: 'form_step', params: { step: 'submit_attempt' } },
    free_readiness_answer: { event: 'form_step', params: { form_id: 'free_readiness', step: 'answer' } },
    free_readiness_apply_click: { event: 'cta_click' },
    free_readiness_complete: { event: 'form_submit', params: { form_id: 'free_readiness' } },
    free_tool_click: { event: 'cta_click' },
    generate_lead: { event: 'lead', params: { lead_type: 'generate_lead' } },
    google_business_profile_click: { event: 'cta_click' },
    internal_route_click: { event: 'cta_click' },
    lead_email_click: { event: 'contact_click', params: { method: 'email' } },
    lead_magnet_submit: { event: 'form_submit', params: { form_id: 'lead_magnet' } },
    lead_server_submit: { event: 'lead', params: { form_id: 'apply', lead_type: 'apply' } },
    local_business_profile_click: { event: 'cta_click' },
    mailto_click: { event: 'contact_click', params: { method: 'email' } },
    membership_checkout_click: { event: 'cta_click' },
    method_click: { event: 'cta_click' },
    page_active_dwell: { event: 'page_dwell', dual: false },
    pathfinder_answer: { event: 'form_step', params: { form_id: 'pathfinder', step: 'answer' } },
    pathfinder_complete: { event: 'form_submit', params: { form_id: 'pathfinder' } },
    pathfinder_cta_click: { event: 'cta_click' },
    pathfinder_result_apply_click: { event: 'cta_click' },
    payment_success: { event: 'lead', params: { form_id: 'checkout', lead_type: 'purchase' } },
    programs_click: { event: 'cta_click' },
    proof_click: { event: 'cta_click' },
    purchase: { event: 'lead', params: { form_id: 'checkout', lead_type: 'purchase' } },
    qualify_lead: { event: 'lead', params: { lead_type: 'qualified' } },
    resource_click: { event: 'cta_click' },
    resource_result_click: { event: 'item_click', params: { list_name: 'resource_search' } },
    resource_search_submit: { event: 'search' },
    resource_topic_select: { event: 'filter_apply', params: { filter_name: 'topic' } },
    shop_click: { event: 'cta_click' },
    shopify_collection_click: { event: 'item_click', params: { list_name: 'titan_shop_collection' } },
    shopify_product_click: { event: 'item_click', params: { list_name: 'titan_shop' } },
    shopify_store_click: { event: 'cta_click' },
  };

  // The four parameters every event on every brand carries. Without them no
  // cross-brand query can group, filter or compare anything. Injected from
  // THIS one helper — a call site that reaches gtag directly bypasses it.
  function pageType(path) {
    const p = path === '/' ? '' : path;
    if (!p) return 'home';
    if (/^\/(privacy|terms|disclaimer|refund-policy|shipping-policy)/.test(p)) return 'legal';
    if (/^\/(apply|contact|start)/.test(p)) return 'form';
    if (/^\/(resources|blog|guides)\/.+/.test(p)) return 'blog';
    if (/^\/(resources|blog|guides)$/.test(p)) return 'listing';
    if (/^\/shop\/.+/.test(p) || /^\/products\//.test(p)) return 'listing_detail';
    if (/^\/(shop|collections)$/.test(p)) return 'listing';
    if (/^\/for\//.test(p)) return 'location';
    if (p.split('/').filter(Boolean).length === 1) return 'service';
    return 'other';
  }

  function sharedBlock(path) {
    let variant = 'control';
    try { variant = document.documentElement.getAttribute('data-variant') || 'control'; } catch (error) {}
    return {
      brand: currentPath() === '/' ? 'titanforge' : 'titan',
      page_type: pageType(path),
      locale: ((document.documentElement.lang || 'en').slice(0, 5) || 'en').toLowerCase(),
      variant: path === '/' ? 'homepage-v2' : variant,
    };
  }

  // One interaction, one contract event. A single click on an /apply link
  // emits TWO legacy names here (internal_route_click AND apply_cta_click) and
  // both map to cta_click, so without this the contract leg counted that click
  // twice — measured in a browser on 2026-09-19 before this guard existed. The
  // legacy legs are untouched; only the second contract twin is dropped.
  let interactionLegs = null;
  let interactionUntil = 0;
  function beginInteraction() {
    interactionLegs = Object.create(null);
    interactionUntil = Date.now() + 400;
  }

  function contractLeg(eventName, payload) {
    const mapped = CONTRACT_MAP[eventName];
    if (!mapped || mapped.dual === false || mapped.event === eventName) return null;
    if (interactionLegs && Date.now() < interactionUntil) {
      if (interactionLegs[mapped.event]) return null;
      interactionLegs[mapped.event] = true;
    }
    const leg = Object.assign({}, payload, mapped.params || {}, { legacy_event: eventName });
    delete leg.event;
    (CONTRACT_REQUIRED[mapped.event] || []).forEach(function (key) {
      if (leg[key] === undefined || leg[key] === '') leg[key] = contractFallback(key, payload);
    });
    return { event: mapped.event, payload: leg };
  }

  // A required contract param that the legacy payload never carried. Guessing
  // is worse than saying so: an "unknown" is visibly a gap in a report, a
  // fabricated value is not.
  function contractFallback(key, payload) {
    if (key === 'cta_id') return String(payload.link_kind || payload.click_source || payload.form_id || 'unknown').slice(0, 60);
    if (key === 'cta_text') return String(payload.link_label || '').slice(0, 80) || '(no label)';
    if (key === 'cta_position') return String(payload.click_source || payload.route_group || 'page').slice(0, 60);
    if (key === 'item_id') return String(payload.product_handle || payload.destination_path || 'unknown').slice(0, 60);
    if (key === 'list_name') return String(payload.click_source || 'unknown').slice(0, 60);
    if (key === 'section_id') return String(payload.section_id || payload.route_group || 'page').slice(0, 60);
    if (key === 'percent') return payload.scroll_percent;
    if (key === 'seconds') return payload.dwell_seconds;
    if (key === 'form_id') return String(payload.form_id || 'unknown').slice(0, 60);
    if (key === 'step') return String(payload.interaction || 'step').slice(0, 40);
    if (key === 'search_term') return String(payload.search_scope || 'unknown').slice(0, 60);
    if (key === 'filter_value') return String(payload.topic || payload.link_kind || 'unknown').slice(0, 60);
    if (key === 'error_code') return 'unknown';
    if (key === 'field') return 'unknown';
    if (key === 'lead_type') return 'unknown';
    if (key === 'method') return 'email';
    if (key === 'media_type') return 'video';
    if (key === 'media_id') return 'unknown';
    if (key === 'item_category') return 'unknown';
    if (key === 'channel') return 'unknown';
    if (key === 'experiment_id') return 'unknown';
    if (key === 'variant') return 'control';
    if (key === 'surface') return String(payload.route_group || 'page').slice(0, 60);
    if (key === 'filter_name') return 'unknown';
    return 'unknown';
  }

  // Tell the shared delegated layer that this interaction is already measured.
  // Most of this site's legacy click names normalise to cta_click, so without
  // the claim /analytics/track.js emits a SECOND cta_click for the same click.
  function claimInteraction() {
    try { if (w.Analytics && typeof w.Analytics.claim === 'function') w.Analytics.claim(400); } catch (error) {}
  }

  function track(eventName, params) {
    if (suppressionReason) {
      if (w.TITAN_ANALYTICS_DEBUG) console.info('[Titan analytics suppressed]', suppressionReason, eventName);
      return null;
    }
    const path = currentPath();
    // The shared cross-brand block (brand, page_type, locale, variant),
    // injected here and nowhere else.
    const payload = Object.assign({
      event: eventName,
      page_path: path,
    }, sharedBlock(path), {
      route_group: routeGroup(path),
      page_intent: pageIntent(path),
      page_title: document.title,
      ts: new Date().toISOString(),
    }, safeParams(params, eventName));

    w.dataLayer.push(payload);
    eventHistory.push(eventName);
    if (eventHistory.length > 12) eventHistory.shift();
    document.documentElement.setAttribute('data-titan-last-event', eventName);
    document.documentElement.setAttribute('data-titan-last-path', path);
    document.documentElement.setAttribute('data-titan-event-history', eventHistory.join(','));
    // /team/* is Steve and Kris's internal board, not audience. The <head>
    // bootstrap (app/lib/gaBootstrap.mjs) keeps GA4 off a page that LOADS on
    // /team; this covers a client-side navigation INTO it after gtag.js is up.
    const gaAllowed = !/^\/team(\/|$)/.test(path);
    if (gaAllowed && typeof w.gtag === 'function') {
      const gaPayload = Object.assign({}, payload);
      delete gaPayload.event;
      w.gtag('event', eventName, gaPayload);
    }
    if (typeof w.va === 'function') {
      const vaPayload = compactPayload(payload);
      delete vaPayload.event;
      w.va('event', eventName, vaPayload);
    }
    if (config.metaEnabled && config.metaPixelId && typeof w.fbq === 'function') {
      const metaEvent = metaEventName(eventName);
      if (metaEvent) w.fbq('track', metaEvent, compactPayload(payload));
    }
    if (w.TITAN_ANALYTICS_DEBUG) console.info('[Titan analytics]', payload);

    // The contract leg. A DIFFERENT event name from the legacy one, so no
    // counter is written twice; see the CONTRACT block above for why both go.
    const contract = contractLeg(eventName, payload);
    if (contract) {
      w.dataLayer.push(Object.assign({ event: contract.event }, contract.payload));
      if (gaAllowed && typeof w.gtag === 'function') w.gtag('event', contract.event, contract.payload);
      if (w.TITAN_ANALYTICS_DEBUG) console.info('[Titan analytics contract]', contract.event, contract.payload);
    }
    return payload;
  }

  w.titanTrackEvent = track;
  // Test seams for the one-interaction-one-contract-event guard. Asserting it
  // through a synthetic click would test the test harness's event dispatch
  // rather than the guard.
  w.titanBeginInteractionForTest = beginInteraction;
  w.titanEndInteractionForTest = function () { interactionLegs = null; interactionUntil = 0; };

  // This bridge intentionally observes interaction shape, never what a visitor
  // typed. The allowlist below keeps GA4 free of email, names, health context,
  // free text, query strings, or any other accidental PII.
  const PRIVATE_PARAM = /(^|_)(name|email|phone|message|comment|text|query|search|value|address|birth|date|goal|blocker|age|budget|plan|lead_id|client_id|health|injury)(_|$)/i;
  function safeParams(value, eventName) {
    const output = {};
    Object.entries(value || {}).forEach(([key, raw]) => {
      if (raw === undefined || raw === null || (PRIVATE_PARAM.test(key) && key !== 'email_to' && !(key === 'value' && ['begin_checkout', 'checkout_handoff', 'payment_success'].includes(eventName)))) return;
      if (typeof raw === 'string') output[key] = raw.slice(0, 120);
      else if (typeof raw === 'number' && Number.isFinite(raw)) output[key] = raw;
      else if (typeof raw === 'boolean') output[key] = raw;
      else if (Array.isArray(raw) && key === 'items') output[key] = raw.map((item) => compactPayload(item));
    });
    return output;
  }

  function compactPayload(value) {
    const output = {};
    Object.entries(value || {}).forEach(([key, raw]) => {
      if (raw === undefined) return;
      if (raw === null || ['string', 'number', 'boolean'].includes(typeof raw)) {
        output[key] = typeof raw === 'string' ? raw.slice(0, 255) : raw;
      }
    });
    return output;
  }

  function metaEventName(eventName) {
    if (eventName === 'page_view') return 'PageView';
    if (eventName === 'generate_lead') return 'Lead';
    if (['shop_click', 'shopify_product_click', 'shopify_collection_click', 'shopify_store_click'].includes(eventName)) return 'ViewContent';
    if (eventName === 'payment_success') return 'Purchase';
    return '';
  }

  let lastPage = '';
  let appTrackedPage = false;
  function trackPage() {
    const path = currentPath();
    if (path === lastPage) return;
    lastPage = path;
    track('page_view');
    setTimeout(setupCommercialJourney, 0);
  }
  w.titanTrackPageView = function () {
    appTrackedPage = true;
    trackPage();
  };

  function linkText(a) {
    return (a.innerText || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  }

  function internalDestination(href) {
    if (!href || !href.startsWith('/') || href.startsWith('//')) return '';
    const noHash = href.split('#')[0] || '/';
    const noQuery = noHash.split('?')[0] || '/';
    return noQuery === '/' ? '/' : noQuery.replace(/\/$/, '');
  }

  function analyticsLinkUrl(href) {
    // Strip all query/hash data. Marketing params are not needed to understand
    // the click and can contain values entered into a prepared mailto URL.
    return String(href || '').split(/[?#]/)[0];
  }

  document.addEventListener('click', function (event) {
    const anchor = event.target && event.target.closest && event.target.closest('a[href]');
    if (!anchor) {
      const button = event.target?.closest?.('button');
      if (currentPath() === '/' && button) {
        claimInteraction();
        beginInteraction();
        track('cta_click', { cta_id: button.getAttribute('data-cta') || (button.classList.contains('nav__burger') ? 'home_menu' : 'home_button'), cta_text: button.getAttribute('aria-label') || linkText(button), cta_position: 'home' });
      }
      return;
    }
    // This layer is about to measure the click, so the shared delegated layer
    // must stay quiet for it or the same click arrives twice as cta_click.
    claimInteraction();
    beginInteraction();
    const href = anchor.getAttribute('href') || '';
    const isExternal = /^https?:\/\//.test(href) && !href.startsWith(w.location.origin);
    const destinationPath = internalDestination(href);
    const sourceNode = anchor.closest('[data-analytics-source]');
    const eventNode = anchor.closest('[data-analytics-event]');
    const kindNode = anchor.closest('[data-analytics-link-kind]');
    const params = {
      // Prepared mailto URLs can contain a lead's name, email, and form context.
      // Only the public destination inbox belongs in analytics.
      cta_id: anchor.getAttribute('data-cta') || undefined,
      link_url: analyticsLinkUrl(href),
      link_label: linkText(anchor),
      destination_path: destinationPath || undefined,
      click_source: sourceNode ? sourceNode.getAttribute('data-analytics-source') : routeGroup(currentPath()),
      link_kind: kindNode ? kindNode.getAttribute('data-analytics-link-kind') : (href === '/apply' ? 'apply' : 'navigation'),
    };

    if (currentPath() === '/') {
      const homeId = anchor.getAttribute('data-cta') || destinationPath.replace(/[^a-z0-9]+/gi, '_') || 'home_link';
      track('cta_click', Object.assign({}, params, { cta_id: homeId, cta_text: linkText(anchor), cta_position: anchor.closest('section')?.getAttribute('data-section') || 'home' }));
      if (/^tel:/i.test(href)) track('contact_click', { method: 'phone', cta_id: homeId });
      if (homeId === 'visit_directions') track('contact_click', { method: 'directions', cta_id: homeId });
      interactionLegs.cta_click = true; // Preserve legacy names without a second contract click.
    }

    if (eventNode) {
      const productHandle = eventNode.getAttribute('data-product-handle');
      const productCategory = eventNode.getAttribute('data-product-category');
      const productAvailable = eventNode.getAttribute('data-product-available');
      const productIntent = eventNode.getAttribute('data-product-intent');
      if (productHandle) params.product_handle = productHandle;
      if (productCategory) params.product_category = productCategory;
      if (productAvailable === 'true' || productAvailable === 'false') params.product_available = productAvailable === 'true';
      if (productIntent) params.product_intent = productIntent;
    }

    if (eventNode) track(eventNode.getAttribute('data-analytics-event'), params);
    if (commercialRoute() && (destinationPath === '/apply' || destinationPath === '/coaching' || destinationPath === '/shop' || eventNode)) {
      track('commercial_cta_click', Object.assign({}, params, { cta_type: destinationPath || eventNode.getAttribute('data-analytics-event') || 'onsite_action' }));
    }
    if (eventNode && eventNode.getAttribute('data-analytics-event') === 'google_business_profile_click') {
      track('local_business_profile_click', Object.assign({}, params, { local_profile: 'google_business_profile' }));
    }
    if (eventNode && eventNode.getAttribute('data-analytics-event') === 'shopify_product_click') {
      track('catalog_product_click', Object.assign({}, params, { catalog: 'titan_shop' }));
      track('checkout_handoff', Object.assign({}, params, { catalog: 'titan_shop' }));
    }
    if (eventNode && eventNode.getAttribute('data-analytics-event') === 'membership_checkout_click') {
      const membership = params.product_intent === 'science_community_app_49_99'
        ? { value: 49.99, item_id: '10939929329948', item_name: 'Titan Forge Science-Based Community + 90-Day FitBudd App' }
        : { value: 24.99, item_id: '10889353036060', item_name: 'Titan Forge Science-Based Community' };
      track('begin_checkout', {
        currency: 'USD',
        value: membership.value,
        product_intent: params.product_intent,
        items: [{ ...membership, price: membership.value, quantity: 1 }],
      });
    }
    if (destinationPath) track('internal_route_click', params);
    if (destinationPath === '/apply') track('apply_cta_click', params);
    if (destinationPath === '/start') track('pathfinder_cta_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'selector' : params.link_kind }));
    if (destinationPath === '/shop') track('shop_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'shop' : params.link_kind }));
    // `method` is a REQUIRED contract param. This click is navigation to the
    // contact page, not a phone/mail/booking action, so it says so rather than
    // borrowing one of the real channels and corrupting the contact mix.
    if (destinationPath === '/contact') track('contact_click', Object.assign({}, params, { method: 'contact_page', link_kind: params.link_kind === 'navigation' ? 'contact' : params.link_kind }));
    if (destinationPath === '/coaching') track('coaching_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'coaching' : params.link_kind }));
    if (destinationPath === '/programs') track('programs_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'programs' : params.link_kind }));
    if (destinationPath === '/method') track('method_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'method' : params.link_kind }));
    if (destinationPath === '/results') track('proof_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'proof' : params.link_kind }));
    if (destinationPath === '/about') track('about_click', Object.assign({}, params, { link_kind: params.link_kind === 'navigation' ? 'about' : params.link_kind }));
    if (destinationPath.startsWith('/resources')) track('resource_click', params);
    if (destinationPath.startsWith('/free/')) track('free_tool_click', params);
    if (/^mailto:/i.test(href)) {
      let inbox = '';
      try { inbox = href.replace(/^mailto:/, '').split('?')[0]; } catch (error) {}
      track('mailto_click', Object.assign({}, params, {
        // Only the public destination inbox — never the lead's own address.
        email_to: inbox,
        link_kind: 'email',
      }));
    }
    if (isExternal) {
      let host = '';
      try { host = new URL(href).hostname; } catch (error) {}
      track('outbound_click', Object.assign({}, params, {
        outbound_host: host,
        // Required contract params. `outbound_host` stays for the existing
        // reports that read it.
        destination_domain: host || 'unknown',
        link_context: params.click_source || routeGroup(currentPath()),
        link_kind: 'outbound',
      }));
    }
  }, true);

  const startedForms = new WeakSet();
  const abandonedForms = new WeakSet();
  const seenFields = new WeakMap();
  const COMMERCIAL_ROUTES = new Set(['/apply', '/coaching', '/shop', '/resources']);
  const FIELD_ALLOWLIST = new Set(['apply-name', 'apply-email', 'apply-age', 'apply-budget', 'apply-goal', 'apply-blocker', 'apply-plan']);
  function commercialRoute() { return COMMERCIAL_ROUTES.has(currentPath()); }
  function formData(form) {
    return { form_id: form.getAttribute('data-analytics-form') || 'unknown', form_source: form.getAttribute('data-analytics-source') || 'form' };
  }
  function safeField(target) {
    const id = target && (target.id || target.name);
    return FIELD_ALLOWLIST.has(id) ? id.replace(/^apply-/, '') : 'other_allowed_form_field';
  }
  function startForm(form) {
    if (!form || startedForms.has(form)) return;
    startedForms.add(form);
    const started = formData(form);
    track('form_start', { form_id: started.form_id, form_source: started.form_source });
    // Compatibility for existing dashboards.
    track('apply_form_start', started);
  }
  document.addEventListener('focusin', function (event) {
    const target = event.target;
    const form = target && target.closest && target.closest('form[data-analytics-form]');
    if (!form) return;
    startForm(form);
    let fields = seenFields.get(form);
    if (!fields) { fields = new Set(); seenFields.set(form, fields); }
    const field = safeField(target);
    if (fields.has(field + ':focus')) return;
    fields.add(field + ':focus');
    track('form_field_interaction', Object.assign(formData(form), { field_id: field, interaction: 'focus' }));
  }, true);
  document.addEventListener('change', function (event) {
    const target = event.target;
    const form = target && target.closest && target.closest('form[data-analytics-form]');
    if (!form) return;
    startForm(form);
    track('form_field_interaction', Object.assign(formData(form), { field_id: safeField(target), interaction: 'complete', is_empty: !target.value }));
  }, true);
  document.addEventListener('invalid', function (event) {
    const target = event.target;
    const form = target && target.closest && target.closest('form[data-analytics-form]');
    if (!form) return;
    track('form_field_interaction', Object.assign(formData(form), { field_id: safeField(target), interaction: 'error' }));
  }, true);
  document.addEventListener('submit', function (event) {
    const form = event.target && event.target.matches && event.target.matches('form[data-analytics-form]') ? event.target : null;
    if (!form) return;
    startForm(form);
    const submitted = formData(form);
    track('form_step_attempt', submitted);
    track('form_submit', { form_id: submitted.form_id, form_source: submitted.form_source });
    track('apply_form_submit_attempt', submitted);
  }, true);

  function setupCommercialJourney() {
    if (!commercialRoute()) return;
    track('commercial_page_view');
    [15, 30, 60, 120].forEach(function (seconds) {
      setTimeout(function () { if (commercialRoute() && document.visibilityState !== 'hidden') track('commercial_engaged', { dwell_seconds: seconds }); }, seconds * 1000);
    });
    const scrollSeen = new Set();
    function reportScroll() {
      const root = document.documentElement;
      const height = Math.max(1, root.scrollHeight - w.innerHeight);
      const percent = Math.min(100, Math.round((w.scrollY || root.scrollTop || 0) / height * 100));
      [25, 50, 75, 90].forEach(function (milestone) {
        if (percent >= milestone && !scrollSeen.has(milestone)) { scrollSeen.add(milestone); track('commercial_scroll', { scroll_percent: milestone }); }
      });
    }
    w.addEventListener('scroll', reportScroll, { passive: true });
    reportScroll();
    if (typeof IntersectionObserver === 'function' && document.querySelectorAll) {
      const observed = new WeakSet();
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || observed.has(entry.target)) return;
          observed.add(entry.target);
          const label = entry.target.getAttribute('data-telemetry-section') || entry.target.id || entry.target.tagName.toLowerCase();
          track('commercial_section_view', { section_id: String(label).slice(0, 80) });
        });
      }, { threshold: 0.5 });
      document.querySelectorAll('main section, main form[data-analytics-form], main .prod, main .applybridge').forEach(function (node) { observer.observe(node); });
    }
    if (currentPath() === '/shop') track('catalog_view', { catalog: 'titan_shop' });
    if (currentPath() === '/apply' && document.querySelectorAll) {
      document.querySelectorAll('form[data-analytics-form]').forEach(function (form) {
        track('form_impression', formData(form));
      });
    }
  }
  function reportAbandon() {
    if (!commercialRoute()) return;
    const form = document.activeElement && document.activeElement.closest && document.activeElement.closest('form[data-analytics-form]');
    if (!form || !startedForms.has(form) || abandonedForms.has(form)) return;
    abandonedForms.add(form);
    const payload = Object.assign(formData(form), { transport: 'beacon' });
    track('form_abandon', payload);
    // A zero-PII beacon keeps abandonment resilient during page teardown. It is
    // intentionally same-origin and the endpoint can safely ignore it until a
    // dedicated collector is enabled.
    if (w.navigator && typeof w.navigator.sendBeacon === 'function') {
      try { w.navigator.sendBeacon('/api/telemetry', JSON.stringify({ event: 'form_abandon', form_id: payload.form_id })); } catch (error) {}
    }
  }
  w.addEventListener('pagehide', reportAbandon);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') reportAbandon();
  });

  ['pushState', 'replaceState'].forEach(function (method) {
    const original = history[method];
    history[method] = function () {
      const result = original.apply(this, arguments);
      setTimeout(function () { if (!appTrackedPage) trackPage(); }, 500);
      return result;
    };
  });
  w.addEventListener('popstate', function () { setTimeout(function () { if (!appTrackedPage) trackPage(); }, 500); });
  w.addEventListener('hashchange', function () { setTimeout(function () { if (!appTrackedPage) trackPage(); }, 500); });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () { if (!appTrackedPage) trackPage(); }, 1500);
    });
  } else {
    setTimeout(function () { if (!appTrackedPage) trackPage(); }, 1500);
  }

  /* ------------------------------------------------------------------ *
   * The shared auto-instrumentation module (~/.claude/durable/analytics/
   * track.js, vendored at /analytics/track.js by analytics-sync.sh).
   *
   * It measures what this bridge never did — section_view, scroll_depth,
   * page_dwell, media_play, search, filter_apply, item_view, error_shown, and
   * clicks on buttons rather than anchors. It is loaded from HERE, from the
   * one file every page already loads, so there is exactly one loader and one
   * init on the site.
   *
   * `disable` names every contract event this bridge already emits itself
   * (directly or as the contract leg of a legacy name). One writer per event
   * name: without it a form_submit would be counted by both layers. Anchor
   * clicks are handled by claimInteraction() instead of a disable, so a click
   * on a <button> — which this bridge does not see — is still measured.
   * ------------------------------------------------------------------ */
  function initSharedAnalytics() {
    if (!w.Analytics || typeof w.Analytics.init !== 'function') return;
    if (w.__titanSharedAnalyticsInit) return;
    w.__titanSharedAnalyticsInit = true;
    w.Analytics.init({
      brand: currentPath() === '/' ? 'titanforge' : 'titan',
      locale: ((document.documentElement.lang || 'en').slice(0, 5) || 'en').toLowerCase(),
      variant: function () { return currentPath() === '/' ? 'homepage-v2' : document.documentElement.getAttribute('data-variant') || 'control'; },
      pageType: function () { return pageType(currentPath()); },
      // page_view: this bridge emits it (trackPage) and the gtag config in the
      //   document head reports the first one.
      // form_start / form_submit / form_step: emitted above, plus the contract
      //   legs of apply_form_start, form_step_attempt and form_field_interaction.
      disable: ['page_view', 'form_start', 'form_submit', 'form_step'],
      sections: '[data-telemetry-section], [data-section], main section, section, [role=region], main > article',
    });
  }

  if (w.Analytics) {
    initSharedAnalytics();
  } else if (document.createElement) {
    const shared = document.createElement('script');
    shared.src = '/analytics/track.js';
    shared.async = false;
    shared.setAttribute('data-titan-shared-analytics', 'true');
    shared.onload = initSharedAnalytics;
    (document.head || document.documentElement).appendChild(shared);
  }

  // A client-side route change is a new page for the reader: without this the
  // second page reports no section_view and no scroll_depth at all, because
  // page one already marked every threshold as sent.
  w.titanResetSharedAnalytics = function () {
    try { if (w.Analytics && typeof w.Analytics.pageView === 'function') w.Analytics.pageView(); } catch (error) {}
  };
})();
