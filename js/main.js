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
      toggle.innerHTML = dark ? '&#x2600;&#xFE0F;' : '&#x1F319;';
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
    toggle.addEventListener('click', function () {
      var isDark = !document.body.classList.contains('dark-mode');
      setTheme(isDark);
    });
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
          '<h3 style="font-size:1.1rem;margin:0 0 0.75rem;">The Problem</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The Challenges feature originally existed as a single page buried within another product\'s reference documentation. Because it never had a dedicated home and was frequently moved between doc sets, users often ran into broken links, outdated information, and missing guidance. Both internal and external users struggled to find accurate, up-to-date documentation.</p>',
          '<br>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Although the product manager wanted a standalone docs space, there was initial pushback from the technical writing team because the product did not have enough documentation to justify its own space.</p>',
          '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">The Solution</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">To address this, I rebuilt the documentation from the ground up. I worked closely with engineering to document core concepts and workflows, reviewed community-reported issues, and tested configurations myself to better understand the user experience. Using this research, I expanded and restructured the content into a dedicated documentation set with clearer navigation and updated guidance.</p>',
          '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Results</h3>',
          '<ul style="list-style:none;padding-left:0;margin-bottom:0;">',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Created a centralized, evergreen source of truth for the feature</li>',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Improved discoverability and reduced broken references across resources</li>',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Delivered clearer, more complete guidance for both internal and external users</li>',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Launched a standalone docs set that became the second most viewed documentation space, with 3.75 million views since January 2026</li>',
          '</ul>',
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
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">developers.cloudflare.com / cloudflare-challenges / concepts / how-challenges-work</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">How Challenges work</h2>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:0.95rem;">Challenges can be issued in three primary ways depending on which Cloudflare products or features are in use. Each method is designed to balance security with seamless visitor experience.</p>',
              '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">',
                '<thead>',
                  '<tr>',
                    '<th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Product</th>',
                    '<th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Challenge type(s)</th>',
                  '</tr>',
                '</thead>',
                '<tbody>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">WAF (custom rules, rate limiting rules, IP access rules)</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Interstitial Challenge Page</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Bot Management</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">JavaScript Detections</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Bot Fight Mode, Super Bot Fight Mode</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Interstitial Challenge Page</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Turnstile</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Embedded widget</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">HTTP DDoS attack protection</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Any Challenge</td>',
                  '</tr>',
                  '<tr>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Under Attack Mode</td>',
                    '<td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Managed Challenge</td>',
                  '</tr>',
                '</tbody>',
              '</table>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Challenge Pages and Turnstile rely on the same underlying mechanism to issue challenges to your website or application&#39;s visitors.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;"><strong>JavaScript Detections</strong> is an optional feature within Bot Management. When enabled, Cloudflare injects a JavaScript snippet into HTML responses to gather client-side signals. Unlike Challenge Pages, JavaScript Detections runs on every HTML request without pausing or interrupting the visitor. It populates a pass/fail result (<code>cf.bot_management.js_detection.passed</code>) that you can then act on using a WAF custom rule.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Available challenges</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Refer to the following pages for more information on the different challenge types:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Interstitial Challenge Pages</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Turnstile</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; JavaScript Detections</li>',
              '</ul>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Limitations</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare Challenges cannot support the following:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Browser extensions that modify the browser&#39;s User-Agent value or Web APIs such as Canvas and WebGL.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Implementations where a domain serves a challenge page originally requested for another domain.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Challenge Pages cannot be embedded in cross-origin iframes.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Client software where the solve request of a Managed Challenge comes from a different IP than the original IP a Challenge request was issued to. For example, if you receive the Challenge from one IP and solve it using another IP, the solve is not valid and you may encounter a Challenge loop.</li>',
              '</ul>',
              '<hr>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Interstitial Challenge Pages</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">An interstitial Challenge Page (a full-page screen that appears before the visitor reaches the destination URL) acts as a gate between the visitor and your website or application while Cloudflare verifies the authenticity of the visitor.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The Challenge Page intercepts the visitor from getting to the destination URL by holding the request and evaluating the browser environment for automated signals, and serving a challenge. The visitor cannot reach their destination without passing the challenge. Based on the signals indicated by their browser environment, the visitor may be asked to perform an interaction such as checking a box or selecting a button for further probing.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">You can implement a Challenge Page to your website or application by creating a WAF custom rule.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Challenges are triggered by a rule in the Web Application Firewall (WAF), Bot Management, or Rate limiting.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The level of interactivity and visibility of the Challenge Page depends on the Action that you select when creating the WAF rule for your website or application.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Actions</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The following challenge types are the available actions when you create a WAF rule for a Challenge Page.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Non-Interactive Challenges</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">With a Non-Interactive Challenge, Cloudflare makes the determination on whether or not the visitor is automated based on the limited information attained from their browser signals via an injected JavaScript. Then, it presents a Challenge Page that requires no interaction from a visitor except the JavaScript processed by their browser.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The visitor must wait until their browser finishes processing the JavaScript, which typically takes less than five seconds.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">If the visitor passes the challenge, the original request continues to the destination URL. If the challenge fails or cannot be completed, the visitor is presented with another interstitial Challenge Page.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Managed Challenges</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Managed Challenges are where Cloudflare dynamically chooses the appropriate type of challenge served to the visitor based on the characteristics of a request from the signals indicated by their browser. This helps avoid CAPTCHAs, which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Most human visitors are automatically verified and the Challenge Page will display <strong>Successful</strong>. However, if Cloudflare detects non-human attributes from the visitor&#39;s browser, they may be required to interact with the challenge to solve it.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare recommends Managed Challenges for most WAF rules. Unless there are specific compatibility issues, do not use other challenge types.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Warning</strong><br>Using Cloudflare Challenges along with Rules features may cause challenge loops. Refer to Rules troubleshooting for more information.</div>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Interactive Challenges</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Interactive Challenge Pages require a visitor to interact with the challenge to pass.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare always recommends using a Managed Challenge.</p>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">',
'---\ncontent_type: concept\ntitle: How Challenges work\ndescription: How Cloudflare issues challenges through WAF rules, Bot Management, and Bot Fight Mode.\nproducts:\n  - cloudflare-challenges\nsidebar:\n  order: 1\n  label: Challenges\n---\n\nChallenges can be issued in three primary ways depending on which Cloudflare products or features are in use. Each method is designed to balance security with seamless visitor experience.\n\n| Product | Challenge type(s) |\n| ------- | ----------------- |\n| [WAF](/waf/) ([custom rules](/waf/custom-rules/), [rate limiting rules](/waf/rate-limiting-rules/), [IP access rules](/waf/tools/ip-access-rules/)) | [Interstitial Challenge Page](/cloudflare-challenges/challenge-types/challenge-pages/) |\n| [Bot Management](/bots/get-started/bot-management/) | [JavaScript Detections](/bots/additional-configurations/javascript-detections/) |\n| [Bot Fight Mode](/bots/get-started/bot-fight-mode/), [Super Bot Fight Mode](/bots/get-started/super-bot-fight-mode/) | [Interstitial Challenge Page](/cloudflare-challenges/challenge-types/challenge-pages/) |\n| [Turnstile](/turnstile/) | Embedded widget |\n| [HTTP DDoS attack protection](/ddos-protection/managed-rulesets/http/) | Any Challenge |\n| [Under Attack Mode](/fundamentals/reference/under-attack-mode/) | [Managed Challenge](/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge) |\n\nChallenge Pages and Turnstile rely on the same underlying mechanism to issue challenges to your website or application\'s visitors.\n\nJavaScript Detections is an optional feature within [Bot Management](/bots/get-started/bot-management/). When enabled, Cloudflare injects a JavaScript snippet into HTML responses to gather client-side signals. Unlike Challenge Pages, JavaScript Detections runs on every HTML request without pausing or interrupting the visitor. It populates a pass/fail result (`cf.bot_management.js_detection.passed`) that you can then act on using a [WAF custom rule](/waf/custom-rules/).\n\n---\n\n## Available challenges\n\nRefer to the following pages for more information on the different challenge types:\n\n- [Interstitial Challenge Pages](/cloudflare-challenges/challenge-types/challenge-pages/)\n- [Turnstile](/cloudflare-challenges/challenge-types/turnstile/)\n- [JavaScript Detections](/cloudflare-challenges/challenge-types/javascript-detections/)\n\n---\n\n## Limitations\n\nCloudflare Challenges cannot support the following:\n\n- [Browser extensions](/cloudflare-challenges/reference/supported-browsers/#browser-extensions) that modify the browser\'s `User-Agent` value or Web APIs such as `Canvas` and `WebGL`.\n- Implementations where a domain serves a challenge page originally requested for another domain.\n- Challenge Pages cannot be embedded in cross-origin iframes.\n- Client software where the solve request of a Managed Challenge comes from a different IP than the original IP a Challenge request was issued to. For example, if you receive the Challenge from one IP and solve it using another IP, the solve is not valid and you may encounter a Challenge loop.\n\n---\n\nAn interstitial Challenge Page (a full-page screen that appears before the visitor reaches the destination URL) acts as a gate between the visitor and your website or application while Cloudflare verifies the authenticity of the visitor.\n\nThe Challenge Page intercepts the visitor from getting to the destination URL by holding the request and evaluating the browser environment for automated signals, and serving a challenge. The visitor cannot reach their destination without passing the challenge. Based on the signals indicated by their browser environment, the visitor may be asked to perform an interaction such as checking a box or selecting a button for further probing.\n\nYou can implement a Challenge Page to your website or application by creating a WAF custom rule.\n\nThe level of interactivity and visibility of the Challenge Page depends on the Action that you select when creating the WAF rule for your website or application.\n\n## Actions\n\nThe following challenge types are the available actions when you create a WAF rule for a Challenge Page.\n\n### Non-Interactive Challenges\n\nWith a Non-Interactive Challenge, Cloudflare makes the determination on whether or not the visitor is automated based on the limited information attained from their browser signals via an injected JavaScript. Then, it presents a Challenge Page that requires no interaction from a visitor except the JavaScript processed by their browser.\n\nThe visitor must wait until their browser finishes processing the JavaScript, which typically takes less than five seconds.\n\nIf the visitor passes the challenge, the original request continues to the destination URL. If the challenge fails or cannot be completed, the visitor is presented with another interstitial Challenge Page.\n\n### Managed Challenges\n\nManaged Challenges are where Cloudflare dynamically chooses the appropriate type of challenge served to the visitor based on the characteristics of a request from the signals indicated by their browser. This helps avoid [CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.\n\nMost human visitors are automatically verified and the Challenge Page will display **Successful**. However, if Cloudflare detects non-human attributes from the visitor\'s browser, they may be required to interact with the challenge to solve it.\n\nCloudflare recommends Managed Challenges for most WAF rules. Unless there are specific compatibility issues, do not use other challenge types.\n\n:::caution\nUsing Cloudflare Challenges along with Rules features may cause challenge loops. Refer to [Rules troubleshooting](/rules/reference/troubleshooting/) for more information.\n:::\n\n### Interactive Challenges\n\nInteractive Challenge Pages require a visitor to interact with the challenge to pass.\n\nCloudflare always recommends using a Managed Challenge.',
            '</pre>',
          '</div>',
        '</div>'
      ].join('')
    },
    'get-started-guide': {
      title: 'Get Started Guide',
      detail: [
        '<div style="margin-bottom:1.5rem;">',
          '<h3 style="font-size:1.1rem;margin:0 0 0.75rem;">The Problem</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Many developers were embedding Turnstile widgets without validating tokens server-side, leaving applications vulnerable despite appearing protected. The existing onboarding documentation lacked clear guidance on the complete implementation process, leading to frequent misconfigurations and support issues.</p>',
          '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">The Solution</h3>',
          '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">I rewrote the Turnstile "Get Started" documentation with a security-first focus, clearly outlining the role of sitekeys and secret keys and providing a step-by-step implementation flow. The new documentation included setup options through the dashboard UI, API, and Terraform, along with guidance for mobile integrations, CAPTCHA migrations, and security best practices.</p>',
          '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Results</h3>',
          '<ul style="list-style:none;padding-left:0;margin-bottom:0;">',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Reduced support tickets related to implementation misconfiguration</li>',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Fewer negative forum posts and developer complaints</li>',
            '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Increased positive feedback around onboarding clarity and usability</li>',
          '</ul>',
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
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">developers.cloudflare.com / turnstile / get-started</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">Get started</h2>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:0.95rem;">Set up Turnstile to verify visitors without a traditional CAPTCHA.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Turnstile protects your website forms from bots. It works in two steps: a JavaScript widget runs challenges in the visitor\'s browser and produces a token, then your server sends that token to Cloudflare to confirm it is valid. This guide covers how to set up both steps.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Prerequisites</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Before you begin, you must have:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; A Cloudflare account</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; A website or web application to protect</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Basic knowledge of HTML and your preferred server-side language</li>',
              '</ul>',
              '<hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Process</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">A Turnstile widget is an instance of Turnstile embedded on your webpage. Each widget has a <strong>sitekey</strong> (a public identifier you place in your HTML) and a <strong>secret key</strong> (a private credential your server uses to validate tokens).</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Each widget gets its own unique sitekey and secret key pair, and options for configurations.</p>',
              '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">',
                '<thead><tr><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Component</th><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Description</th></tr></thead>',
                '<tbody>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Sitekey</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Public key used to invoke the Turnstile widget on your site.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Secret key</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Private key used for server-side token validation.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Configurations</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Mode, hostnames, appearance settings, and other options.</td></tr>',
                '</tbody>',
              '</table>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Important</strong><br>Regardless of how you create and manage your widgets, you will still need to embed the widget on your webpage and validate the token on your server.</div>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Implementing Turnstile involves two essential components that work together:</p>',
              '<ol style="list-style:none;padding-left:0;margin-bottom:1rem;counter-reset:num;">',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">1.</span> <strong>Client-side:</strong> Embed the widget &mdash; Add the Turnstile widget to your webpage to challenge visitors and generate tokens. A token is a string (up to 2,048 characters) generated when the visitor completes a challenge.</li>',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">2.</span> <strong>Server-side:</strong> Validate the token &mdash; Send tokens to Cloudflare\'s Siteverify API to confirm they are authentic and have not been tampered with.</li>',
              '</ol>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Turnstile is designed to be an independent service. You can use Turnstile on any website, regardless of whether it is proxied through the Cloudflare network. This allows for flexible deployment across multi-cloud environments, on-premises infrastructure, or sites using other CDNs. The client-side widget and server-side validation steps are completely self-contained.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Implementation</h3>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">1. Create your widget</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">First, you must create a Turnstile widget to get your sitekey and secret key.</p>',
              '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin:1rem 0;">',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">Cloudflare dashboard</span>',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">API</span>',
                '<span style="display:inline-block;padding:0.5rem 1.25rem;background:var(--color-card-bg);border:1px solid var(--color-border);border-radius:8px;font-size:0.85rem;color:var(--color-text);">Terraform</span>',
              '</div>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">2. Embed the widget</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Add the Turnstile widget to your webpage forms and applications.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Testing</strong><br>You can test your Turnstile widget on your webpage without triggering an actual Cloudflare Challenge by using a testing sitekey.</div>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">3. Validate tokens</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Implement server-side validation to verify the tokens generated by your widgets.</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>Testing</strong><br>You can test the dummy token generated with testing sitekey via Siteverify API with the testing secret key. Your production secret keys will reject dummy tokens.</div>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Additional implementation options</h3>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Mobile configuration</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Special considerations are necessary for mobile applications and WebView implementations.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Migration from other CAPTCHAs</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">If you are currently using reCAPTCHA, hCaptcha, or another CAPTCHA service, Turnstile can be a drop-in replacement. You can copy and paste our script wherever you have deployed the existing script today.</p>',
              '<hr style="border:none;border-top:1px solid var(--color-border);margin:1.5rem 0;">',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Security requirements</h3>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Server-side validation is mandatory.</strong> It is critical to enforce Turnstile tokens with the Siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation. You must call Siteverify to complete your Turnstile configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in Turnstile Analytics.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Tokens expire after 300 seconds (5 minutes).</strong> Each token can only be validated once. Expired or used tokens must be replaced with fresh challenges.</li>',
              '</ul>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Best practices</h3>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Security</h4>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Protect your secret keys. Never expose secret keys in client-side code.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Rotate your keys regularly. Use API or dashboard to rotate secret keys periodically.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Restrict your hostnames. Only allow widgets on domains that you control.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Monitor the usage. Use analytics to detect unusual patterns.</li>',
              '</ul>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Operational</h4>',
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
'---\ntitle: Get started\ncontent_type: get-started\ndescription: Set up Turnstile to verify visitors without a traditional CAPTCHA.\nproducts:\n  - turnstile\nsidebar:\n  order: 4\n---\n\nTurnstile protects your website forms from bots. It works in two steps: a JavaScript widget runs challenges in the visitor\'s browser and produces a token, then your server sends that token to Cloudflare to confirm it is valid. This guide covers how to set up both steps.\n\n## Prerequisites\n\nBefore you begin, you must have:\n\n- [A Cloudflare account](/fundamentals/account/create-account/)\n- A website or web application to protect\n- Basic knowledge of HTML and your preferred server-side language\n\n---\n\n## Process\n\nA Turnstile widget is an instance of Turnstile embedded on your webpage. Each widget has a <GlossaryTooltip term="sitekey">sitekey</GlossaryTooltip> (a public identifier you place in your HTML) and a <GlossaryTooltip term="secret key">secret key</GlossaryTooltip> (a private credential your server uses to validate tokens).\n\nEach widget gets its own unique sitekey and secret key pair, and options for configurations.\n\n| Component | Description |\n| --- | --- |\n| Sitekey | Public key used to invoke the Turnstile widget on your site. |\n| Secret key | Private key used for server-side token validation. |\n| Configurations | Mode, hostnames, appearance settings, and other options. |\n\n:::note[Important]\nRegardless of how you create and manage your widgets, you will still need to [embed the widget](/turnstile/get-started/client-side-rendering/) on your webpage and [validate the token](/turnstile/get-started/server-side-validation/) on your server.\n:::\n\nImplementing Turnstile involves two essential components that work together:\n\n1. Client-side: [Embed the widget](/turnstile/get-started/client-side-rendering/)\n\n   Add the Turnstile widget to your webpage to challenge visitors and generate tokens. A token is a string (up to 2,048 characters) generated when the visitor completes a challenge.\n\n2. Server-side: [Validate the token](/turnstile/get-started/server-side-validation/)\n\n   Send tokens to Cloudflare\'s [Siteverify API](/turnstile/get-started/server-side-validation/) — the endpoint for validating Turnstile tokens — to confirm they are authentic and have not been tampered with.\n\nTurnstile is designed to be an independent service. You can use Turnstile on any website, regardless of whether it is proxied through the Cloudflare network. This allows for flexible deployment across multi-cloud environments, on-premises infrastructure, or sites using other CDNs. The client-side widget and server-side validation steps are completely self-contained.\n\nRefer to [Implementation](#implementation) below for guidance on how to implement Turnstile on your website.\n\n---\n\n## Implementation\n\nFollow the steps below to implement Turnstile.\n\n### 1. Create your widget\n\nFirst, you must create a Turnstile widget to get your sitekey and secret key.\n\nSelect your preferred implementation method:\n\n- [Cloudflare dashboard](/turnstile/get-started/widget-management/dashboard/)\n- [API](/turnstile/get-started/widget-management/api/)\n- [Terraform](/turnstile/get-started/widget-management/terraform/)\n\n### 2. Embed the widget\n\nAdd the Turnstile widget to your webpage forms and applications.\n\nRefer to [Embed the widget](/turnstile/get-started/client-side-rendering/) to learn more about implicit and explicit rendering methods.\n\n:::note[Testing]\nYou can test your Turnstile widget on your webpage without triggering an actual Cloudflare Challenge by using a testing sitekey.\n:::\n\n### 3. Validate tokens\n\nImplement server-side validation to verify the tokens generated by your widgets.\n\nRefer to [Validate the token](/turnstile/get-started/server-side-validation/) to secure your implementation with proper token verification.\n\n:::note[Testing]\nYou can test the dummy token generated with testing sitekey via Siteverify API with the testing secret key. Your production secret keys will reject dummy tokens.\n:::\n\n## Additional implementation options\n\n### Mobile configuration\n\nSpecial considerations are necessary for mobile applications and WebView implementations.\n\nRefer to [Mobile implementation](/turnstile/get-started/mobile-implementation/) for more information on mobile application integration.\n\n### Migration from other CAPTCHAs\n\nIf you are currently using reCAPTCHA, hCaptcha, or another CAPTCHA service, Turnstile can be a drop-in replacement. You can copy and paste our script wherever you have deployed the existing script today.\n\nRefer to [Migration](/turnstile/migration/) for step-by-step migration guidance from other CAPTCHA services.\n\n---\n\n## Security requirements\n\n- Server-side validation is mandatory. It is critical to enforce Turnstile tokens with the Siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation. You must call Siteverify to complete your Turnstile configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in [Turnstile Analytics](/turnstile/turnstile-analytics/).\n- Tokens expire after 300 seconds (5 minutes). Each token can only be validated once. Expired or used tokens must be replaced with fresh challenges.\n\n---\n\n## Best practices\n\n### Security\n\n- Protect your secret keys. Never expose secret keys in client-side code.\n- Rotate your keys regularly. Use API or dashboard to rotate secret keys periodically.\n- Restrict your hostnames. Only allow widgets on domains that you control.\n- Monitor the usage. Use analytics to detect unusual patterns.\n\n### Operational\n\n- Use descriptive names. Name widgets based on their purpose, such as "Login Form" or "Contact Page".\n- Separate your environments. Use different widgets for development, staging, and production.\n- Keep track of which widgets are used at which locations.\n- Store your widget configurations in version control when using Terraform.',
            '</pre>',
          '</div>',
        '</div>'
      ].join('')
    },
    'reference-troubleshooting': {
      title: 'Reference & Troubleshooting',
      detail: [
        '<p><strong>Context:</strong> Documentation sample from Cloudflare\'s Challenges product. The page is written in Visual Studio Code and uses MDX, a Markdown-based authoring format, with custom components.</p>',
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
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">developers.cloudflare.com / cloudflare-challenges / troubleshooting</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">Troubleshooting</h2>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:0.95rem;">Resolve common issues with Cloudflare challenges, including loops and proxied hostnames.</p>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Common issues</h3>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Proxied hostnames</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">If your hostname is proxied through Cloudflare, visitors may experience challenges on your webpages.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">Cloudflare issues challenges through the Challenge Platform, which is the same underlying technology powering Turnstile.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">In contrast to our Challenge page offerings, Turnstile allows you to run challenges anywhere on your site in a less-intrusive way without requiring the use of Cloudflare\'s CDN.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Deprecated browser support</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Challenges are not supported by Microsoft Internet Explorer. If you are currently using Internet Explorer, try using another modern web browser (Chrome, Safari, Firefox). If you are already using a modern web browser, make sure it is using the latest version.</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Referer header</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">Your visitor\'s HTTP request contains a referer header set to the website that they came from. When they encounter and solve a Challenge Page, the request with the referer is sent to the origin, and the response to the request is served to the user. The JavaScript on the response page may read the value of <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">document.referer</code>, but it will not be accurate.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">For example, a visitor coming from a given website is challenged by a WAF rule via an interstitial Challenge Page served by your domain. Once the visitor loads the website\'s home page, the <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">document.referer</code> value is your domain, not the origin website.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">This affects tools like Google Analytics, which reads the referer from JavaScript, since it replaces the previous website that visitors came from.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;margin-bottom:1rem;">You can add tracking scripts, such as the Google Tag Manager Javascript, within an existing Challenge Page to capture the correct referer header on the initial request.</p>',
              '<p style="color:var(--color-text);font-size:0.9rem;line-height:1.7;margin-top:1rem;"><strong>Example JavaScript</strong></p>',
              '<pre style="background:var(--color-card-bg);padding:1rem;border-radius:8px;overflow-x:auto;font-size:0.85rem;line-height:1.6;color:var(--color-text-muted);margin:0.75rem 0;"><code>&lt;script&gt;<br/>    (function () {<br/>      const gaIds = {<br/>        "&lt;YOUR_DOMAIN&gt;": "&lt;GA_TRACKING_ID&gt;",<br/>      };<br/><br/>      const gaId = gaIds[window.location.hostname];<br/><br/>      if (gaId) {<br/>        const src = "https://www.googletagmanager.com/gtag/js?id=";<br/><br/>        const gaScript = document.createElement("script");<br/>        gaScript.src = src.concat(gaId);<br/>        document.body.appendChild(gaScript);<br/><br/>        window.dataLayer = window.dataLayer || [];<br/>        function gtag() {<br/>          dataLayer.push(arguments);<br/>        }<br/>        gtag("js", new Date());<br/>        gtag("config", gaId);<br/>      } else {<br/>        console.warn(<br/>          "Google Analytics ID not found for host:",<br/>          window.location.hostname,<br/>        );<br/>      }<br/>    })();<br/>  &lt;/script&gt;<br/>&lt;/body&gt;</code></pre>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Cross-origin resource sharing (CORS) preflight requests</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cross-origin resource sharing (CORS) preflight requests, or <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">OPTIONS</code>, exclude user credentials that include cookies. As a result, the <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">cf_clearance</code> cookie will not be sent with the request, causing it to fail to bypass a Challenge Page (Non-interactive, Managed, or Interactive Challenge).</p>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Challenges on Cloudflare-protected sites</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare issues challenges to website visitors to protect against malicious activity, such as bot attacks and DDoS attempts. If a legitimate human visitor is unexpectedly challenged, the reason typically stems from a security feature flagging their request.</p>',
              '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">',
                '<thead><tr><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Source</th><th style="border:1px solid var(--color-border);padding:0.6rem 1rem;text-align:left;background:var(--color-card-bg);font-weight:600;color:var(--color-text);">Description</th></tr></thead>',
                '<tbody>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>High threat score</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">IP addresses with a high-risk score trigger Challenges.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>IP reputation</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">If your IP has a history of suspicious activity, it may be flagged.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Bot detection</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Automated traffic resembling bots is filtered by Cloudflare.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Web Application Firewall (WAF) custom rules</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Site owners may set rules targeting specific regions or user agents.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Browser Integrity Check</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Cloudflare verifies that browsers meet certain standards.</td></tr>',
                  '<tr><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);"><strong>Challenge Passage</strong></td><td style="border:1px solid var(--color-border);padding:0.6rem 1rem;color:var(--color-text-muted);">Technologies like Privacy Pass reduce the frequency of repeated Challenges.</td></tr>',
                '</tbody>',
              '</table>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">To avoid repeated challenges, visitors can take the following steps to ensure their environment does not trigger security checks:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Ensure your web browser is updated to the latest stable version for full compatibility with modern challenge technologies.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; Temporarily disable browser extensions, such as ad blockers or privacy tools, that may block standard browser headers or the necessary challenge scripts.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; If your IP address has a poor reputation (often seen with shared VPNs or corporate proxies), try switching to a different, trusted network connection.</li>',
              '</ul>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            `<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">---
content_type: troubleshooting
title: Troubleshooting
description: Resolve common issues with Cloudflare challenges, including loops and proxied hostnames.
products:
  - cloudflare-challenges
---

## Common issues

### Proxied hostnames

If your hostname is proxied through Cloudflare, visitors may experience challenges on your webpages.

Cloudflare issues challenges through the [Challenge Platform](/cloudflare-challenges/), which is the same underlying technology powering [Turnstile](/turnstile/).

In contrast to our Challenge page offerings, Turnstile allows you to run challenges anywhere on your site in a less-intrusive way without requiring the use of Cloudflare\'s CDN.

### Deprecated browser support

Challenges are not supported by Microsoft Internet Explorer. If you are currently using Internet Explorer, try using another modern web browser (Chrome, Safari, Firefox). If you are already using a modern web browser, make sure it is using the latest version.

### Referer header

Your visitor\'s HTTP request contains a referer header set to the website that they came from. When they encounter and solve a Challenge Page, the request with the referer is sent to the origin, and the response to the request is served to the user. The JavaScript on the response page may read the value of document.referer, but it will not be accurate.

For example, a visitor coming from a given website is challenged by a [WAF rule](/waf/custom-rules/) via an interstitial Challenge Page served by your domain. Once the visitor loads the website\'s home page, the document.referer value is your domain, not the origin website.

This affects tools like Google Analytics, which reads the referer from JavaScript, since it replaces the previous website that visitors came from.

You can add tracking scripts, such as the Google Tag Manager Javascript, within an existing [Challenge Page](/rules/custom-errors/) to capture the correct referer header on the initial request.

**Example JavaScript**

&lt;script&gt;
    (function () {
      const gaIds = {
        "&lt;YOUR_DOMAIN&gt;": "&lt;GA_TRACKING_ID&gt;",
      };

      const gaId = gaIds[window.location.hostname];

      if (gaId) {
        const src = "https://www.googletagmanager.com/gtag/js?id=";

        const gaScript = document.createElement("script");
        gaScript.src = src.concat(gaId);
        document.body.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", gaId);
      } else {
        console.warn(
          "Google Analytics ID not found for host:",
          window.location.hostname,
        );
      }
    })();
  &lt;/script&gt;
&lt;/body&gt;

### Cross-origin resource sharing (CORS) preflight requests

Cross-origin resource sharing (CORS) preflight requests, or OPTIONS, exclude user credentials that include cookies. As a result, the cf_clearance cookie will not be sent with the request, causing it to fail to bypass a Challenge Page (Non-interactive, Managed, or Interactive Challenge).

### Challenges on Cloudflare-protected sites

Cloudflare issues challenges to website visitors to protect against malicious activity, such as bot attacks and DDoS attempts. If a legitimate human visitor is unexpectedly challenged, the reason typically stems from a security feature flagging their request.

| Source | Description |
| --- | --- |
| High threat score | IP addresses with a high-risk score trigger Challenges. |
| IP reputation | If your IP has a history of suspicious activity, it may be flagged. |
| Bot detection | Automated traffic resembling bots is filtered by Cloudflare. |
| Web Application Firewall (WAF) custom rules | Site owners may set rules targeting specific regions or user agents. |
| Browser Integrity Check | Cloudflare verifies that browsers meet certain standards. |
| Challenge Passage | Technologies like Privacy Pass reduce the frequency of repeated Challenges. |

To avoid repeated challenges, visitors can take the following steps to ensure their environment does not trigger security checks:

- Ensure your web browser is updated to the latest stable version for full compatibility with modern challenge technologies.
- Temporarily disable browser extensions, such as ad blockers or privacy tools, that may block standard browser headers or the necessary challenge scripts.
- If your IP address has a poor reputation (often seen with shared VPNs or corporate proxies), try switching to a different, trusted network connection.</pre>`,
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
