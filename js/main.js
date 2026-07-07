(function () {
  'use strict';

  // Resume modal
  var modal = document.getElementById('resume-modal');
  var resumeBtn = document.getElementById('resume-btn');
  var closeBtn = document.getElementById('modal-close');

  function openModal() {
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  if (resumeBtn && modal) {
    resumeBtn.addEventListener('click', openModal);
  }

  var resumeTextBtn = document.getElementById('resume-text-btn');
  if (resumeTextBtn && modal) {
    resumeTextBtn.addEventListener('click', openModal);
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('open')) {
        closeModal();
      } else if (projectModal && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    }
  });

  // Theme toggle
  var toggle = document.getElementById('theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    if (toggle) {
      var icon = toggle.querySelector('.theme-toggle-icon');
      if (icon) {
        icon.innerHTML = dark ? '&#x2600;&#xFE0F;' : '&#x1F319;';
      }
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function setTheme(dark) {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    applyTheme(dark);
  }

  // Initialize: check localStorage, then system preference
  var stored = localStorage.getItem('theme');
  if (stored) {
    applyTheme(stored === 'dark');
  } else {
    applyTheme(prefersDark.matches);
  }

  // Listen for system preference changes (only when no stored preference)
  prefersDark.addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // Toggle click
  if (toggle) {
    var isFlipping = false;
    toggle.addEventListener('click', function () {
      if (isFlipping) return;
      isFlipping = true;
      var icon = toggle.querySelector('.theme-toggle-icon');
      if (icon) {
        icon.classList.add('flipping');
        var isDark = !document.body.classList.contains('dark-mode');
        setTimeout(function () {
          setTheme(isDark);
        }, 150);
        setTimeout(function () {
          icon.classList.remove('flipping');
          isFlipping = false;
        }, 300);
      } else {
        var isDark = !document.body.classList.contains('dark-mode');
        setTheme(isDark);
        isFlipping = false;
      }
    });
  }

  // Highlight placeholders like [PRODUCT], [FEATURE], [SYSTEM], [ACTION]
  function highlightPlaceholders(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) { nodes.push(walker.currentNode); }
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var text = node.textContent;
      if (/\[[A-Z]+\d*(?:\s+\d+)?\]/.test(text)) {
        var span = document.createElement('span');
        span.innerHTML = text.replace(
          /(\[[A-Z]+\d*(?:\s+\d+)?\])/g,
          '<span class="placeholder">$1</span>'
        );
        node.parentNode.replaceChild(span, node);
      }
    }
  }

  // Project modal
  var projectModal = document.getElementById('project-modal');
  var projectModalClose = document.getElementById('project-modal-close');
  var projectModalContent = document.getElementById('project-modal-content');

  var projectData = {
    'product-concept': {
      title: 'Product Concept',
      detail: [
        '<div style="margin-bottom:1.5rem;">',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:0 0 0.25rem 0;">The Problem</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">The feature documentation originally existed as a single page buried within another product\'s reference documentation. Because it never had a dedicated home and was frequently moved between doc sets, users often ran into broken links, outdated information, and missing guidance. Both internal and external users struggled to find accurate, up-to-date documentation.</p>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-top:0.75rem;">Although the product manager wanted a standalone docs space, there was initial pushback from the technical writing team because the product did not have enough documentation to justify its own space.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">The Solution</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">To address this, I rebuilt the documentation from the ground up. I worked closely with engineering to document core concepts and workflows, reviewed community-reported issues, and tested configurations myself to better understand the user experience. Using this research, I expanded and restructured the content into a dedicated documentation set with clearer navigation and updated guidance.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">Results</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">Created a centralized, evergreen source of truth for the feature; improved discoverability and reduced broken references across resources; delivered clearer, more complete guidance for both internal and external users; and launched a standalone docs set that became the second most viewed documentation space, with 3.75 million views since January 2026 (as of May 2026).</p>',
        '</div>',
        '<div style="display:flex;gap:0;border-bottom:1px solid var(--color-border);margin:1.25rem 0 0;">',
          '<button class="modal-tab-btn active" data-mtab="rendered" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid var(--color-accent);cursor:pointer;color:var(--color-text);">Rendered</button>',
          '<button class="modal-tab-btn" data-mtab="markdown" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;color:var(--color-text-muted);">Markdown</button>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="rendered" style="display:block;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;background:var(--color-card-bg);border-bottom:1px solid var(--color-border);font-size:0.8rem;color:var(--color-text-muted);">',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></span>',
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">patriciasantaana.com / product-feature / concepts / how-it-works</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h1 style="font-size:2rem;margin-bottom:0.5rem;">How it works</h1>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:1rem;">[FEATURE] can be issued in three primary ways depending on which products or features are in use. Each method is designed to balance security with seamless visitor experience.</p>',
              '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">',
                '<thead>',
                  '<tr>',
                    '<th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Product</th>',
                    '<th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Feature type(s)</th>',
                  '</tr>',
                '</thead>',
                '<tbody>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Product A</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Feature 1</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Product B</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Feature 2</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Product C</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Feature 3</td>',
                  '</tr>',
                '</tbody>',
              '</table>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Available [FEATURES]</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Refer to the following documentation for more information on the different [FEATURE] types:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Feature 1</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Feature 2</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Feature 3</li>',
              '</ul>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Limitations</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[FEATURES] cannot support the following:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Browser extensions that modify the browser&#39;s User-Agent value or Web APIs such as Canvas and WebGL.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Implementations where a domain serves a [FEATURE] originally requested for another domain.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; [FEATURE] cannot be embedded in cross-origin iframes.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Client software where the solve request of a [FEATURE] comes from a different IP than the original IP it was issued to. For example, if you receive the [FEATURE] from one IP and interact with it from another IP, the solve is not valid and you may encounter a loop.</li>',
              '</ul>',
              '<hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">[FEATURE]</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">A [FEATURE] page acts as a gate between the visitor and your website or application while [SYSTEM] verifies the authenticity of the visitor.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The [FEATURE] page intercepts the visitor from getting to the destination URL by holding the request and evaluating the browser environment for automated signals, and serving a [FEATURE]. The visitor cannot reach their destination without passing the [FEATURE]. Based on the signals indicated by their browser environment, the visitor may be asked to perform an interaction such as checking a box or selecting a button for further probing.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">You can implement a [FEATURE] page to your website or application by creating an [ACTION].</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[FEATURE] is triggered by an [ACTION].</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The level of interactivity and visibility of the [FEATURE] page depends on the [ACTION] that you select for your website or application.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Actions</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The following [FEATURE] types are available:</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">[FEATURE 1]</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">With [FEATURE 1], [SYSTEM] makes the determination on whether or not the visitor is automated based on the limited information attained from their browser signals via an injected JavaScript. Then, it presents a [FEATURE] page that requires no interaction from a visitor except the JavaScript processed by their browser.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The visitor must wait until their browser finishes processing the JavaScript, which typically takes less than five seconds.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">If the visitor passes the [FEATURE], the original request continues to the destination URL. If the [FEATURE] fails or cannot be completed, the visitor is presented with another [FEATURE] page.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">[FEATURE 2]</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[FEATURE 2] is when [SYSTEM] dynamically chooses the appropriate type of [FEATURE] served to the visitor based on the characteristics of a request from the signals indicated by their browser. This helps avoid CAPTCHAs, which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Most human visitors are automatically verified and the [FEATURE] page will display <strong>Successful</strong>. However, if [SYSTEM] detects non-human attributes from the visitor&#39;s browser, they may be required to interact with the [FEATURE] to solve it.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[SYSTEM] recommends [FEATURE 2] for most [ACTIONS]. Unless there are specific compatibility issues, do not use other [FEATURE] types.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Warning</strong><br>Using [FEATURE] along with [PRODUCT] may cause loops. Refer to [PRODUCT] troubleshooting for more information.</div>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">[FEATURE 3]</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[FEATURE 3] requires a visitor to interact with the feature to pass.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[SYSTEM] always recommends using [FEATURE 2].</p>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">',
'---\ncontent_type: concept\ntitle: How it works\ndescription: How [SYSTEM] issues [FEATURES] through [PRODUCT].\nsidebar:\n  order: 1\n---\n\n[FEATURE] can be issued in three primary ways depending on which products or features are in use. Each method is designed to balance security with seamless visitor experience.\n\n| Product | Feature type(s) |\n| ------- | --------------- |\n| Product A | Feature 1 |\n| Product B | Feature 2 |\n| Product C | Feature 3 |\n\n---\n\n## Available [FEATURES]\n\nRefer to the following pages for more information on the different [FEATURE] types:\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n---\n\n## Limitations\n\n[FEATURES] cannot support the following:\n\n- Browser extensions that modify the browser\'s User-Agent value or Web APIs such as Canvas and WebGL.\n- Implementations where a domain serves a [FEATURE] originally requested for another domain.\n- [FEATURE] cannot be embedded in cross-origin iframes.\n- Client software where the solve request of a [FEATURE] comes from a different IP than the original IP it was issued to. For example, if you receive the [FEATURE] from one IP and interact with it from another IP, the solve is not valid and you may encounter a loop.\n\n---\n\n## [FEATURE]\n\nA [FEATURE] page acts as a gate between the visitor and your website or application while [SYSTEM] verifies the authenticity of the visitor.\n\nThe [FEATURE] page intercepts the visitor from getting to the destination URL by holding the request and evaluating the browser environment for automated signals, and serving a [FEATURE]. The visitor cannot reach their destination without passing the [FEATURE]. Based on the signals indicated by their browser environment, the visitor may be asked to perform an interaction such as checking a box or selecting a button for further probing.\n\nYou can implement a [FEATURE] page to your website or application by creating an [ACTION].\n\n[FEATURE] is triggered by an [ACTION].\n\nThe level of interactivity and visibility of the [FEATURE] page depends on the [ACTION] that you select for your website or application.\n\n### Actions\n\nThe following [FEATURE] types are available:\n\n#### [FEATURE 1]\n\nWith [FEATURE 1], [SYSTEM] makes the determination on whether or not the visitor is automated based on the limited information attained from their browser signals via an injected JavaScript. Then, it presents a [FEATURE] page that requires no interaction from a visitor except the JavaScript processed by their browser.\n\nThe visitor must wait until their browser finishes processing the JavaScript, which typically takes less than five seconds.\n\nIf the visitor passes the [FEATURE], the original request continues to the destination URL. If the [FEATURE] fails or cannot be completed, the visitor is presented with another [FEATURE] page.\n\n#### [FEATURE 2]\n\n[FEATURE 2] is when [SYSTEM] dynamically chooses the appropriate type of [FEATURE] served to the visitor based on the characteristics of a request from the signals indicated by their browser. This helps avoid CAPTCHAs, which also reduces the lifetimes of human time spent solving CAPTCHAs acrossthe Internet.\n\nMost human visitors are automatically verified andthe [FEATURE] page will display **Successful**. However, if [SYSTEM] detects non-human attributes fromthe visitor\'s browser, they may be required to interact withthe [FEATURE] to solve it.\n\n[SYSTEM] recommends [FEATURE 2] for most [ACTIONS]. Unless there are specific compatibility issues, do not use other [FEATURE] types.\n\n:::caution\nUsing [FEATURE] along with [PRODUCT] may cause loops. Refer to [PRODUCT] troubleshooting for more information.\n:::\n\n#### [FEATURE 3]\n\n[FEATURE 3] requires a visitor to interact with the feature to pass.\n\n[SYSTEM] always recommends using [FEATURE 2].',
            '</pre>',
          '</div>',
        '</div>'
      ].join('')
    },
    'get-started-guide': {
      title: 'Get Started Guide',
      detail: [
        '<div style="margin-bottom:1.5rem;">',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:0 0 0.25rem 0;">The Problem</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">Many developers were embedding the product  without validating tokens server-side, leaving applications vulnerable despite appearing protected. The existing onboarding documentation lacked clear guidance on the complete implementation process, leading to frequent misconfigurations and support issues.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">The Solution</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">I rewrote the get started documentation with a security-first focus, clearly outlining the role of sitekeys and secret keys and providing a step-by-step implementation flow. The new documentation included setup options through the dashboard UI, API, and Terraform, along with guidance for mobile integrations, migrations, and security best practices.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">Results</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">Reduced support tickets related to implementation misconfiguration; fewer negative forum posts and developer complaints; and increased positive feedback around onboarding clarity and usability.</p>',
        '</div>',
        '<div style="display:flex;gap:0;border-bottom:1px solid var(--color-border);margin:1.25rem 0 0;">',
          '<button class="modal-tab-btn active" data-mtab="rendered" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid var(--color-accent);cursor:pointer;color:var(--color-text);">Rendered</button>',
          '<button class="modal-tab-btn" data-mtab="markdown" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;color:var(--color-text-muted);">Markdown</button>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="rendered" style="display:block;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;background:var(--color-card-bg);border-bottom:1px solid var(--color-border);font-size:0.8rem;color:var(--color-text-muted);">',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></span>',
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">patriciasantaana.com / product / get-started</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h1 style="font-size:2rem;margin-bottom:0.5rem;">Get started</h1>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:1rem;">Set up [PRODUCT] to verify visitors without a traditional CAPTCHA.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[PRODUCT] protects your website forms from bots. It works in two steps: a JavaScript widget runs [ACTIONS] in the visitor\'s browser and produces a token, then your server sends that token to [SYSTEM] to confirm it is valid. This guide covers how to set up both steps.</p>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Prerequisites</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Before you begin, you must have:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; A [SYSTEM] account</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; A website or web application to protect</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Basic knowledge of HTML and your preferred server-side language</li>',
              '</ul>',
              '<hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Process</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">A [PRODUCT] widget is an instance of [PRODUCT] embedded on your webpage. Each widget has a <strong>sitekey</strong> (a public identifier you place in your HTML) and a <strong>secret key</strong> (a private credential your server uses to validate tokens).</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Each widget gets its own unique sitekey and secret key pair, and options for configurations.</p>',
              '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">',
                '<thead><tr><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Component</th><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Description</th></tr></thead>',
                '<tbody>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Sitekey</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Public key used to invoke the [PRODUCT] widget on your site.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Secret key</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Private key used for server-side token validation.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Configurations</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Mode, hostnames, appearance settings, and other options.</td></tr>',
                '</tbody>',
              '</table>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Important</strong><br>Regardless of how you create and manage your widgets, you will still need to embed the widget on your webpage and validate the token on your server.</div>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Implementing [PRODUCT] involves two essential components that work together:</p>',
              '<ol style="list-style:none;padding-left:0;margin-bottom:1rem;counter-reset:num;">',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">1.</span> <strong>Client-side:</strong> Embed the widget &mdash; Add the [PRODUCT] widget to your webpage to [ACTION] visitors and generate tokens. A token is a string (up to 2,048 characters) generated when the visitor completes a [ACTION].</li>',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">2.</span> <strong>Server-side:</strong> Validate the token &mdash; Send tokens to [SYSTEM]\'s Siteverify API to confirm they are authentic and have not been tampered with.</li>',
              '</ol>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">[PRODUCT] is designed to be an independent service. You can use [PRODUCT] on any website, regardless of whether it is proxied through the [SYSTEM] network. This allows for flexible deployment across multi-cloud environments, on-premises infrastructure, or sites using other CDNs. The client-side widget and server-side validation steps are completely self-contained.</p>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Implementation</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Follow the steps below to implement [PRODUCT].</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">1. Create your widget</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">First, you must create a [PRODUCT] widget to get your sitekey and secret key.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Select your preferred implementation method:</p>',
              '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin:1rem 0;">',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">UI dashboard</span>',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">API</span>',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">Terraform</span>',
              '</div>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">2. Embed the widget</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Add the [PRODUCT] widget to your webpage forms and applications.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Refer to Embed the widget to learn more about implicit and explicit rendering methods.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Testing</strong><br>You can test your [PRODUCT] widget on your webpage without triggering an actual [ACTION] by using a testing sitekey.</div>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">3. Validate tokens</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Implement server-side validation to verify the tokens generated by your widgets.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Refer to Validate the token to secure your implementation with proper token verification.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Testing</strong><br>You can test the dummy token generated with testing sitekey via Siteverify API with the testing secret key. Your production secret keys will reject dummy tokens.</div>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Additional implementation options</h2>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Mobile configuration</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Special considerations are necessary for mobile applications and WebView implementations.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Migration from other services</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">If you are currently using an alternate service, [PRODUCT] can be a drop-in replacement. You can copy and paste our script wherever you have deployed the existing script today.</p>',
              '<hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Security requirements</h2>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Server-side validation is mandatory.</strong> It is critical to enforce [PRODUCT] tokens with the Siteverify API. The [PRODUCT] token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation. You must call Siteverify to complete your [PRODUCT] configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in Analytics.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Tokens expire after 300 seconds (5 minutes).</strong> Each token can only be validated once. Expired or used tokens must be replaced with fresh [ACTIONS].</li>',
              '</ul>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Best practices</h2>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Security</h3>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Protect your secret keys. Never expose secret keys in client-side code.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Rotate your keys regularly. Use API or dashboard to rotate secret keys periodically.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Restrict your hostnames. Only allow widgets on domains that you control.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Monitor the usage. Use analytics to detect unusual patterns.</li>',
              '</ul>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Operational</h3>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Use descriptive names. Name widgets based on their purpose, such as "Login Form" or "Contact Page".</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Separate your environments. Use different widgets for development, staging, and production.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Keep track of which widgets are used at which locations.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Store your widget configurations in version control when using Terraform.</li>',
              '</ul>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">',
'---\ntitle: Get started\ncontent_type: get-started\ndescription: Set up [PRODUCT] to verify visitors without a traditional CAPTCHA.\nsidebar:\n  order: 4\n---\n\n[PRODUCT] protects your website forms from bots. It works in two steps: a JavaScript widget runs [ACTIONS] in the visitor\'s browser and produces a token, then your server sends that token to [SYSTEM] to confirm it is valid. This guide covers how to set up both steps.\n\n## Prerequisites\n\nBefore you begin, you must have:\n\n- A [SYSTEM] account\n- A website or web application to protect\n- Basic knowledge of HTML and your preferred server-side language\n\n---\n\n## Process\n\nA [PRODUCT] widget is an instance of [PRODUCT] embedded on your webpage. Each widget has a <GlossaryTooltip term="sitekey">sitekey</GlossaryTooltip> (a public identifier you place in your HTML) and a <GlossaryTooltip term="secret key">secret key</GlossaryTooltip> (a private credential your server uses to validate tokens).\n\nEach widget gets its own unique sitekey and secret key pair, and options for configurations.\n\n| Component | Description |\n| --- | --- |\n| Sitekey | Public key used to invoke the [PRODUCT] widget on your site. |\n| Secret key | Private key used for server-side token validation. |\n| Configurations | Mode, hostnames, appearance settings, and other options. |\n\n:::note[Important]\nRegardless of how you create and manage your widgets, you will still need to embed the widget on your webpage and validate the token on your server.\n:::\n\nImplementing [PRODUCT] involves two essential components that work together:\n\n1. Client-side: Embed the widget\n\n   Add the [PRODUCT] widget to your webpage to [ACTION] visitors and generate tokens. A token is a string (up to 2,048 characters) generated when the visitor completes a [ACTION].\n\n2. Server-side: Validate the token\n\n   Send tokens to [SYSTEM]\'s Siteverify API to confirm they are authentic and have not been tampered with.\n\n[PRODUCT] is designed to be an independent service. You can use [PRODUCT] on any website, regardless of whether it is proxied through the [SYSTEM] network. This allows for flexible deployment across multi-cloud environments, on-premises infrastructure, or sites using other CDNs. The client-side widget and server-side validation steps are completely self-contained.\n\n---\n\n## Implementation\n\nFollow the steps below to implement [PRODUCT].\n\n### 1. Create your widget\n\nFirst, you must create a [PRODUCT] widget to get your sitekey and secret key.\n\nSelect your preferred implementation method:\n\n- UI dashboard\n- API\n- Terraform\n\n### 2. Embed the widget\n\nAdd the [PRODUCT] widget to your webpage forms and applications.\n\nRefer to Embed the widget to learn more about implicit and explicit rendering methods.\n\n:::note[Testing]\nYou can test your [PRODUCT] widget on your webpage without triggering an actual [ACTION] by using a testing sitekey.\n:::\n\n### 3. Validate tokens\n\nImplement server-side validation to verify the tokens generated by your widgets.\n\nRefer to Validate the token to secure your implementation with proper token verification.\n\n:::note[Testing]\nYou can test the dummy token generated with testing sitekey via Siteverify API with the testing secret key. Your production secret keys will reject dummy tokens.\n:::\n\n## Additional implementation options\n\n### Mobile configuration\n\nSpecial considerations are necessary for mobile applications and WebView implementations.\n\n### Migration from other services\n\nIf you are currently using an alternate service, [PRODUCT] can be a drop-in replacement. You can copy and paste our script wherever you have deployed the existing script today.\n\n---\n\n## Security requirements\n\n- **Server-side validation is mandatory.** It is critical to enforce [PRODUCT] tokens with the Siteverify API. The [PRODUCT] token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation. You must call Siteverify to complete your [PRODUCT] configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in Analytics.\n- **Tokens expire after 300 seconds (5 minutes).** Each token can only be validated once. Expired or used tokens must be replaced with fresh [ACTIONS].\n\n---\n\n## Best practices\n\n### Security\n\n- Protect your secret keys. Never expose secret keys in client-side code.\n- Rotate your keys regularly. Use API or dashboard to rotate secret keys periodically.\n- Restrict your hostnames. Only allow widgets on domains that you control.\n- Monitor the usage. Use analytics to detect unusual patterns.\n\n### Operational\n\n- Use descriptive names. Name widgets based on their purpose, such as "Login Form" or "Contact Page".\n- Separate your environments. Use different widgets for development, staging, and production.\n- Keep track of which widgets are used at which locations.\n- Store your widget configurations in version control when using Terraform.',
            '</pre>',
          '</div>',
        '</div>'
      ].join('')
    },
    'reference-troubleshooting': {
      title: 'Reference & Troubleshooting',
      detail: [
        '<div style="margin-bottom:1.5rem;">',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:0 0 0.25rem 0;">The Problem</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">Many support concerns came not from direct customers, but from their end users who were experiencing loops or being incorrectly flagged as bots. Existing troubleshooting resources were too technical, making it difficult for non-technical users to understand the issue or resolve it on their own.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">The Solution</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">I created a user-friendly troubleshooting guide focused on accessibility and clarity for everyday users. The content explained common causes of loops and false bot detections in simple language, while providing actionable troubleshooting steps and escalation paths if issues persisted. The documentation was designed to reduce confusion, improve self-service support, and create a smoother user experience.</p>',
          '<h3 style="font-size:1rem;font-weight:600;color:var(--color-text);margin:1.25rem 0 0.25rem 0;">Results</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin:0;">Improved accessibility of troubleshooting resources for non-technical users; reduced repetitive support inquiries related to loops and false positives; increased positive feedback around clarity and ease of troubleshooting steps.</p>',
        '</div>',
        '<div style="display:flex;gap:0;border-bottom:1px solid var(--color-border);margin:1.25rem 0 0;">',
          '<button class="modal-tab-btn active" data-mtab="rendered" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid var(--color-accent);cursor:pointer;color:var(--color-text);">Rendered</button>',
          '<button class="modal-tab-btn" data-mtab="markdown" style="padding:0.6rem 1.25rem;font-size:0.85rem;font-weight:500;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;color:var(--color-text-muted);">Markdown</button>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="rendered" style="display:block;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1.25rem;background:var(--color-card-bg);border-bottom:1px solid var(--color-border);font-size:0.8rem;color:var(--color-text-muted);">',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>',
              '<span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block;"></span>',
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">patriciasantaana.com / product / troubleshooting</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h1 style="font-size:2rem;margin-bottom:0.5rem;">Product issues</h1>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:1rem;">Fix loops, unsupported browser errors, and other solve failures.</p>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Loops</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">You may encounter a loop where the [FEATURE] keeps appearing without being solved. This is in very specific cases where we detect strong bot signals. If you are a legitimate human, you can follow the troubleshooting guide below to resolve the issue or submit a feedback report. Loops can happen for several reasons:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong style="color:var(--color-text);">Network issues</strong>: Poor or unstable network connections can prevent the [ACTION] from being completed.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong style="color:var(--color-text);">Browser configuration</strong>: Some browser settings or extensions may block the scripts needed to execute the [ACTION].</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong style="color:var(--color-text);">Unsupported browsers</strong>: Using a browser that is not supported by [PRODUCT].</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong style="color:var(--color-text);">JavaScript disabled</strong>: [PRODUCT] relies on JavaScript to function properly.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong style="color:var(--color-text);">Detection errors</strong>: If [PRODUCT] suspects bot-like behavior, you may encounter repeated loops for verification.</li>',
              '</ul>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">Most [FEATURE] are quick to complete and typically take only a few seconds. If it takes longer, ensure your network is stable and follow the troubleshooting steps.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);">',
                '<strong style="color:var(--color-text);">Note</strong><br>',
                'If the issue persists, try switching to a different network or device to rule out any issues with your browser environment.<br><br>',
                'Ensure your browser is updated to the latest version to maintain compatibility.',
              '</div>',
              '<h2 style="font-size:1.25rem;margin:2rem 0 1rem;">Troubleshooting</h2>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">Follow the steps below to ensure that your environment is properly configured.</p>',
              '<ol style="margin-bottom:1rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;padding-left:1.5rem;">',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Verify your browser compatibility.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; [PRODUCT] supports all major browsers, except Internet Explorer.</li>',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Ensure your browser is up to date.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Disable your browser extensions.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Some browser extensions, such as ad blockers, may block the scripts [PRODUCT] needs to operate.</li>',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Temporarily disable all extensions and reload the page.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Enable JavaScript.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; [PRODUCT] requires JavaScript to run. Ensure it is enabled in your browser settings. Refer to your browser\'s documentation for instructions on enabling JavaScript.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Try Incognito or Private mode.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Use your browser\'s incognito or private mode to rule out issues caused by extensions or cached data.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Test another browser or device.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Switch to a different browser or device to see if the issue is specific to your current setup.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Avoid VPNs or proxies.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Some virtual private networks (VPN) or proxies may interfere with [PRODUCT]. Try disabling them temporarily to test.</li>',
                  '</ul>',
                '</li>',
                '<li style="margin-bottom:0.75rem;"><strong style="color:var(--color-text);">Switch to a different network.</strong>',
                  '<ul style="padding-left:1.2rem;margin-top:0.25rem;margin-bottom:0;list-style:none;">',
                    '<li style="position:relative;padding-left:1.2rem;margin-bottom:0.2rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Your current network may have restrictions causing [PRODUCT] to fail. Try switching to another network, such as a mobile hotspot.</li>',
                  '</ul>',
                '</li>',
              '</ol>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">If none of the above resolves your issue, contact the website administrator with the error code and Ray ID or submit a feedback report through the [PRODUCT] widget by selecting <strong style="color:var(--color-text);">Submit Feedback</strong>.</p>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            `<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">---
title: Product issues
content_type: troubleshooting
description: Fix loops, unsupported browser errors, and other solve failures.
sidebar:
  order: 2
---

## Loops

You may encounter a loop where the [FEATURE] keeps appearing without being solved. This is in very specific cases where we detect strong bot signals. If you are a legitimate human, you can follow the troubleshooting guide below to resolve the issue or submit a feedback report. Loops can happen for several reasons:

- **Network issues**: Poor or unstable network connections can prevent the [ACTION] from being completed.
- **Browser configuration**: Some browser settings or extensions may block the scripts needed to execute the [ACTION].
- **Unsupported browsers**: Using a browser that is not supported by [PRODUCT].
- **JavaScript disabled**: [PRODUCT] relies on JavaScript to function properly.
- **Detection errors**: If [PRODUCT] suspects bot-like behavior, you may encounter repeated loops for verification.

Most [FEATURE] are quick to complete and typically take only a few seconds. If it takes longer, ensure your network is stable and follow the troubleshooting steps.

:::note
If the issue persists, try switching to a different network or device to rule out any issues with your browser environment.

Ensure your browser is updated to the latest version to maintain compatibility.
:::

## Troubleshooting

Follow the steps below to ensure that your environment is properly configured.

- **Verify your browser compatibility.**
    - [PRODUCT] supports all major browsers, except Internet Explorer.
    - Ensure your browser is up to date. 
- **Disable your browser extensions.**
    - Some browser extensions, such as ad blockers, may block the scripts [PRODUCT] needs to operate.
    - Temporarily disable all extensions and reload the page.
- **Enable JavaScript.**
    - [PRODUCT] requires JavaScript to run. Ensure it is enabled in your browser settings. Refer to your browser's documentation for instructions on enabling JavaScript.
- **Try Incognito or Private mode.**
    - Use your browser's incognito or private mode to rule out issues caused by extensions or cached data.
- **Test another browser or device.**
    - Switch to a different browser or device to see if the issue is specific to your current setup.
- **Avoid VPNs or proxies.**
    - Some virtual private networks (VPN) or proxies may interfere with [PRODUCT]. Try disabling them temporarily to test.
- **Switch to a different network.**
    - Your current network may have restrictions causing [PRODUCT] to fail. Try switching to another network, such as a mobile hotspot.

If none of the above resolves your issue, contact the website administrator with the error code and Ray ID or submit a feedback report through the [PRODUCT] widget by selecting **Submit Feedback**.</pre>`,
          '</div>',
        '</div>'
      ].join('')
    }
  };

  function openProjectModal(project) {
    var data = projectData[project];
    if (!data) return;
    projectModalContent.innerHTML =
      '<div class="project-modal-body">' +
        '<h2>' + data.title + '</h2>' +
        '<div class="project-detail">' + data.detail + '</div>' +
      '</div>';

    // Modal tab switching
    var tabBtns = projectModalContent.querySelectorAll('.modal-tab-btn');
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        tabBtns.forEach(function(b) {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = 'var(--color-text-muted)';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = 'var(--color-accent)';
        btn.style.color = 'var(--color-text)';
        var tabs = projectModalContent.querySelectorAll('.modal-mtab-content');
        tabs.forEach(function(t) { t.style.display = 'none'; });
        var target = projectModalContent.querySelector('.modal-mtab-content[data-mtab="' + btn.getAttribute('data-mtab') + '"]');
        if (target) target.style.display = 'block';
      });
    });

    var renderedTab = projectModalContent.querySelector('.modal-mtab-content[data-mtab="rendered"]');
    if (renderedTab) highlightPlaceholders(renderedTab);

    projectModal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.project-view').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var project = this.getAttribute('data-project');
      openProjectModal(project);
    });
  });

  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', function (e) {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }
})();
