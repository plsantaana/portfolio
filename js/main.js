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
      toggle.innerHTML = dark ? '&#x1F31E;' : '&#x1F319;';
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
        '<p><strong>Context:</strong> Documentation sample from Cloudflare\'s Bot solutions. The page is written in Visual Studio Code and uses MDX, a Markdown-based authoring format, with custom components.</p>',
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
              '<span style="flex:1;padding:0.35rem 0.75rem;background:var(--color-bg);border-radius:6px;font-size:0.8rem;">developers.cloudflare.com / bots / concepts / bot</span>',
            '</div>',
            '<div style="padding:1.5rem 2rem;">',
              '<h2 style="font-size:1.5rem;margin-bottom:0.5rem;">Bots</h2>',
              '<p style="color:var(--color-text-muted);margin-bottom:1.5rem;font-size:0.95rem;">Automated software programs that interact with websites and APIs.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">A <strong>bot</strong> is a software application programmed to do certain tasks. Bots can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).</p>',
              '<div style="background:var(--color-card-bg);border-left:3px solid var(--color-accent);padding:1rem 1.25rem;border-radius:8px;margin:1.5rem 0;font-size:0.9rem;color:var(--color-text-muted);"><strong>More information</strong><br>For more background, refer to <a href="https://www.cloudflare.com/learning/bots/what-is-a-bot/" target="_blank">What is a bot? &#x2197;</a></div>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">Verified bots and signed agents</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare maintains an internal directory of <a href="https://developers.cloudflare.com/bots/concepts/bot/verified-bots/" target="_blank">verified bot</a> and <a href="https://developers.cloudflare.com/bots/concepts/bot/signed-agents/" target="_blank">signed agents</a> that are associated with search engine optimization (SEO), website monitoring, and more.</p>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">You can use this directory to prevent any bot protection measures from impacting otherwise helpful bots and agents, such as search crawlers.</p>',
              '<br>',
              '<h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;">AI bots</h3>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">To prevent AI-related usage of your site content (such as training language models or generating search answers), you can turn on a managed rule that blocks known AI crawlers that use data for training models (&ldquo;AI Bots&rdquo;). A managed rule is a rule that Cloudflare maintains and updates — you turn it on, but you do not write or edit the rule yourself.</p>',
              '<br>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Which bots are blocked</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">When you enable this feature, Cloudflare will block the following bots:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">Amazonbot</code> (Amazon)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">Applebot</code> (Apple)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">Bytespider</code> (ByteDance)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">ClaudeBot</code> (Anthropic)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">DuckAssistBot</code> (DuckDuckGo)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">Google-CloudVertexBot</code> (Google)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">GoogleOther</code> (Google)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">GPTBot</code> (OpenAI)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">Meta-ExternalAgent</code> (Meta)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">PetalBot</code> (Huawei)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">TikTokSpider</code> (ByteDance)</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <code style="background:var(--color-card-bg);padding:0.15rem 0.4rem;border-radius:4px;">CCBot</code> (Common Crawl)</li>',
              '</ul>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">In addition to this list, verified bots that are classified as AI crawlers, as well as a number of unverified bots that behave similarly, are included in the rule. This rule does not include verified bots that fall into the <code>Search Engine</code> categories.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">These categories, and the bots classified in these categories, may change from time to time.</p>',
              '<br>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">How it works</h4>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">When you enable this feature, Cloudflare detects and blocks two categories of AI bots:</p>',
              '<ul style="list-style:none;padding-left:0;margin-bottom:1rem;">',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Well-behaved AI crawlers</strong> that comply with <code>robots.txt</code>, respect crawl rates, and do not hide their behavior from your website.</li>',
                '<li style="position:relative;padding-left:1.4rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">&mdash; <strong>Evasive AI crawlers</strong> that do not follow these conventions but are detected through additional signatures.</li>',
              '</ul>',
              '<h4 style="font-size:1rem;margin:1.25rem 0 0.5rem;">Rule evaluation order</h4>',
'<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">Cloudflare evaluates bot-related rules in a specific order. When a request matches a rule and receives a terminating action (such as block or challenge), it does not continue to later rules in the sequence.</p>',
               '<br>',
               '<ol style="list-style:none;padding-left:0;margin-bottom:1rem;counter-reset:num;">',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">1.</span> <strong>Custom rules</strong> (WAF custom rules you create) — evaluated first.</li>',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">2.</span> <strong>Block AI bots</strong> (the managed AI rule) — evaluated second.</li>',
                '<li style="position:relative;padding-left:2rem;margin-bottom:0.3rem;color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;counter-increment:num;"><span style="position:absolute;left:0;font-weight:600;">3.</span> <strong>Other Super Bot Fight Mode rules</strong> (definitely automated, likely automated, verified bots) — evaluated last.</li>',
              '</ol>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The Block AI bots rule takes precedence over all other Super Bot Fight Mode rules. For example, if you have enabled <strong>Block AI bots</strong> and <strong>Allow verified bots</strong>, verified AI bots will still be blocked.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">For Bot Management customers, custom rules run before the Block AI bots rule. If your custom rule challenges definitely automated traffic, AI bots will receive that challenge instead of reaching the Block AI bots rule. Because the challenge is a terminating action, Cloudflare does not evaluate the request against later rules in the sequence.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">The SBFM settings for verified, definitely automated, and likely bots also affect evaluation. If these settings are set to <code>allow</code>, the request is not matched to any SBFM rule and proceeds to the next phase — where the Block AI bots rule can still block it. If the setting is <code>block</code>, the request is blocked in the earlier phase and does not reach the AI rule at all. If the setting is <code>challenge</code>, the request matches a rule and receives a terminating action, so it will not continue to later rules.</p>',
              '<br>',
              '<p style="color:var(--color-text-muted);font-size:0.9rem;line-height:1.7;">For self-serve non-Bot Management customers, all rules for verified, definitely automated, and likely bots run in the phase following the AI bots rule.</p>',
              '<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:1.25rem;margin:1.5rem 0;background:var(--color-card-bg);border-radius:10px;">',
                '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">',
                  '<span style="background:var(--color-bg);border:1px solid var(--color-border);padding:0.5rem 1rem;font-size:0.85rem;font-weight:500;border-radius:8px;white-space:nowrap;">Custom rules</span>',
                  '<span style="color:var(--color-text-muted);font-size:1.1rem;">&rarr;</span>',
                  '<span style="background:var(--color-bg);border:1px solid var(--color-border);padding:0.5rem 1rem;font-size:0.85rem;font-weight:500;border-radius:8px;white-space:nowrap;text-align:center;">Block AI bots<br><span style="font-weight:400;font-size:0.75rem;">managed rule</span></span>',
                  '<span style="color:var(--color-text-muted);font-size:1.1rem;">&rarr;</span>',
                  '<span style="background:var(--color-bg);border:1px solid var(--color-border);padding:0.5rem 1rem;font-size:0.85rem;font-weight:500;border-radius:8px;white-space:nowrap;text-align:center;">Other SBFM<br><span style="font-weight:400;font-size:0.75rem;">managed rules</span></span>',
                '</div>',
                '<figcaption style="font-size:0.75rem;color:var(--color-text-muted);margin-top:0.25rem;">Super Bot Fight Mode and custom rules execution order diagram</figcaption>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="modal-mtab-content" data-mtab="markdown" style="display:none;">',
          '<div style="border:1px solid var(--color-border);border-radius:0 0 16px 16px;overflow:hidden;max-height:60vh;overflow-y:auto;">',
            '<pre style="margin:0;padding:1.25rem 1.5rem;background:#1a1a1a;color:#e0e0e0;font-family:SF Mono,Fira Code,Cascadia Code,Consolas,monospace;font-size:0.8rem;line-height:1.7;overflow-x:auto;tab-size:2;">',
'---\ncontent_type: concept\ntitle: Bots\ndescription: Automated software programs that interact with websites and APIs.\nproducts:\n  - bots\nsidebar:\n  order: 1\n---\n\nA **bot** is a software application programmed to do certain tasks.\n\nBots can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).\n\n:::note[More information]\nFor more background, refer to [What is a bot?](https://www.cloudflare.com/learning/bots/what-is-a-bot/).\n:::\n\n## Verified bots and signed agents\n\nCloudflare maintains an internal directory of [verified bot](/bots/concepts/bot/verified-bots/) and [signed agents](/bots/concepts/bot/signed-agents/) that are associated with search engine optimization (SEO), website monitoring, and more.\nYou can use this directory to prevent any bot protection measures from impacting otherwise helpful bots and agents, such as search crawlers.\n<Render file="verified-bots" product="bots" />\n## AI bots\n\nTo prevent AI-related usage of your site content (such as training language models or generating search answers), you can turn on a managed rule that blocks known AI crawlers that use data for training models ("AI Bots").\n\n### Which bots are blocked\n\nWhen you enable this feature, Cloudflare will block the following bots:\n\n- `Amazonbot` (Amazon)\n- `Applebot` (Apple)\n- `Bytespider` (ByteDance)\n- `ClaudeBot` (Anthropic)\n- `DuckAssistBot` (DuckDuckGo)\n- `Google-CloudVertexBot` (Google)\n- `GoogleOther` (Google)\n- `GPTBot` (OpenAI)\n- `Meta-ExternalAgent` (Meta)\n- `PetalBot` (Huawei)\n- `TikTokSpider` (ByteDance)\n- `CCBot` (Common Crawl)\n\nIn addition to this list, verified bots that are classified as AI crawlers, as well as a number of unverified bots that behave similarly, are included in the rule. This rule does not include verified bots that fall into the `Search Engine` categories.\n\nThese categories, and the bots classified in these categories, may change from time to time.\n\n### How it works\n\nWhen you enable this feature, Cloudflare detects and blocks two categories of AI bots:\n\n- **Well-behaved AI crawlers** that comply with `robots.txt`, respect crawl rates, and do not hide their behavior from your website.\n- **Evasive AI crawlers** that do not follow these conventions but are detected through additional signatures.\n\n### Rule evaluation order\n\nCloudflare evaluates bot-related rules in a specific order. When a request matches a rule and receives a terminating action (such as block or challenge), it does not continue to later rules in the sequence.\n\n1. **Custom rules** (WAF custom rules you create) — evaluated first.\n2. **Block AI bots** (the managed AI rule) — evaluated second.\n3. **Other Super Bot Fight Mode rules** (definitely automated, likely automated, verified bots) — evaluated last.\n\nThe Block AI bots rule takes precedence over all other Super Bot Fight Mode rules. For example, if you have enabled **Block AI bots** and **Allow verified bots**, verified AI bots will still be blocked.\n\nFor Bot Management customers, custom rules run before the Block AI bots rule. If your custom rule challenges definitely automated traffic, AI bots will receive that challenge instead of reaching the Block AI bots rule. Because the challenge is a terminating action, Cloudflare does not evaluate the request against later rules in the sequence.\n\nThe SBFM settings for verified, definitely automated, and likely bots also affect evaluation. If these settings are set to `allow`, the request is not matched to any SBFM rule and proceeds to the next phase — where the Block AI bots rule can still block it. If the setting is `block`, the request is blocked in the earlier phase and does not reach the AI rule at all. If the setting is `challenge`, the request matches a rule and receives a terminating action, so it will not continue to later rules.\n\nFor self-serve non-Bot Management customers, all rules for verified, definitely automated, and likely bots run in the phase following the AI bots rule.\n\n<Render file="execution-order" product="bots" />\n',
            '</pre>',
          '</div>',
        '</div>'
      ].join('')
    },
    'get-started-guide': {
      title: 'Get Started Guide',
      detail: [
        '<p><strong>Context:</strong> Documentation sample from Cloudflare\'s Turnstile product. The page is written in Visual Studio Code and uses MDX, a Markdown-based authoring format, with custom components.</p>',
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
'---\ntitle: Get started\ncontent_type: get-started\ndescription: Set up Turnstile to verify visitors without a traditional CAPTCHA.\nproducts:\n  - turnstile\nsidebar:\n  order: 4\n---\n\nimport { Render, LinkButton, GlossaryTooltip } from "~/components";\n\nTurnstile protects your website forms from bots. It works in two steps: a JavaScript widget runs challenges in the visitor\'s browser and produces a token, then your server sends that token to Cloudflare to confirm it is valid. This guide covers how to set up both steps.\n\n## Prerequisites\n\nBefore you begin, you must have:\n\n- [A Cloudflare account](/fundamentals/account/create-account/)\n- A website or web application to protect\n- Basic knowledge of HTML and your preferred server-side language\n\n---\n\n## Process\n\nA Turnstile widget is an instance of Turnstile embedded on your webpage. Each widget has a <GlossaryTooltip term="sitekey">sitekey</GlossaryTooltip> (a public identifier you place in your HTML) and a <GlossaryTooltip term="secret key">secret key</GlossaryTooltip> (a private credential your server uses to validate tokens).\n\nEach widget gets its own unique sitekey and secret key pair, and options for configurations.\n\n| Component | Description |\n| --- | --- |\n| Sitekey | Public key used to invoke the Turnstile widget on your site. |\n| Secret key | Private key used for server-side token validation. |\n| Configurations | Mode, hostnames, appearance settings, and other options. |\n\n:::note[Important]\nRegardless of how you create and manage your widgets, you will still need to [embed the widget](/turnstile/get-started/client-side-rendering/) on your webpage and [validate the token](/turnstile/get-started/server-side-validation/) on your server.\n:::\n\nImplementing Turnstile involves two essential components that work together:\n\n1. Client-side: [Embed the widget](/turnstile/get-started/client-side-rendering/)\n\n   Add the Turnstile widget to your webpage to challenge visitors and generate tokens. A token is a string (up to 2,048 characters) generated when the visitor completes a challenge.\n\n2. Server-side: [Validate the token](/turnstile/get-started/server-side-validation/)\n\n   Send tokens to Cloudflare\'s [Siteverify API](/turnstile/get-started/server-side-validation/) — the endpoint for validating Turnstile tokens — to confirm they are authentic and have not been tampered with.\n\nTurnstile is designed to be an independent service. You can use Turnstile on any website, regardless of whether it is proxied through the Cloudflare network. This allows for flexible deployment across multi-cloud environments, on-premises infrastructure, or sites using other CDNs. The client-side widget and server-side validation steps are completely self-contained.\n\nRefer to [Implementation](#implementation) below for guidance on how to implement Turnstile on your website.\n\n---\n\n## Implementation\n\nFollow the steps below to implement Turnstile.\n\n### 1. Create your widget\n\nFirst, you must create a Turnstile widget to get your sitekey and secret key.\n\nSelect your preferred implementation method:\n\n- [Cloudflare dashboard](/turnstile/get-started/widget-management/dashboard/)\n- [API](/turnstile/get-started/widget-management/api/)\n- [Terraform](/turnstile/get-started/widget-management/terraform/)\n\n### 2. Embed the widget\n\nAdd the Turnstile widget to your webpage forms and applications.\n\nRefer to [Embed the widget](/turnstile/get-started/client-side-rendering/) to learn more about implicit and explicit rendering methods.\n\n:::note[Testing]\nYou can test your Turnstile widget on your webpage without triggering an actual Cloudflare Challenge by using a testing sitekey.\n:::\n\n### 3. Validate tokens\n\nImplement server-side validation to verify the tokens generated by your widgets.\n\nRefer to [Validate the token](/turnstile/get-started/server-side-validation/) to secure your implementation with proper token verification.\n\n:::note[Testing]\nYou can test the dummy token generated with testing sitekey via Siteverify API with the testing secret key. Your production secret keys will reject dummy tokens.\n:::\n\n## Additional implementation options\n\n### Mobile configuration\n\nSpecial considerations are necessary for mobile applications and WebView implementations.\n\nRefer to [Mobile implementation](/turnstile/get-started/mobile-implementation/) for more information on mobile application integration.\n\n### Migration from other CAPTCHAs\n\nIf you are currently using reCAPTCHA, hCaptcha, or another CAPTCHA service, Turnstile can be a drop-in replacement. You can copy and paste our script wherever you have deployed the existing script today.\n\nRefer to [Migration](/turnstile/migration/) for step-by-step migration guidance from other CAPTCHA services.\n\n---\n\n## Security requirements\n\n- Server-side validation is mandatory. It is critical to enforce Turnstile tokens with the Siteverify API. The Turnstile token could be invalid, expired, or already redeemed. Not verifying the token will leave major vulnerabilities in your implementation. You must call Siteverify to complete your Turnstile configuration. Otherwise, it is incomplete and will result in zeroes for token validation when viewing your metrics in [Turnstile Analytics](/turnstile/turnstile-analytics/).\n- Tokens expire after 300 seconds (5 minutes). Each token can only be validated once. Expired or used tokens must be replaced with fresh challenges.\n\n---\n\n## Best practices\n\n### Security\n\n- Protect your secret keys. Never expose secret keys in client-side code.\n- Rotate your keys regularly. Use API or dashboard to rotate secret keys periodically.\n- Restrict your hostnames. Only allow widgets on domains that you control.\n- Monitor the usage. Use analytics to detect unusual patterns.\n\n### Operational\n\n- Use descriptive names. Name widgets based on their purpose, such as "Login Form" or "Contact Page".\n- Separate your environments. Use different widgets for development, staging, and production.\n- Keep track of which widgets are used at which locations.\n- Store your widget configurations in version control when using Terraform.',
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
