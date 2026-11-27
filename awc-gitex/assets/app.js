const tech = [['Oracle Technologies', 'Fusion, EBS, NetSuite, OCI, OIC, EPM, Primavera and AI Factory.'], ['SAP Practice', 'ECC, S/4HANA, BTP, Fiori, CPI, Joule and analytics.'], ['Salesforce Solutions', 'Sales, Service, Marketing and Commerce Cloud, CPQ and integrations.'], ['Microsoft Technologies', 'Azure, Power Platform, SharePoint and .NET engineering.'], ['ServiceNow', 'ITSM, ITOM, enterprise workflows and digital experiences.'], ['Newgen', 'OmniDocs, iBPS, OmniOMS and low-code automation.'],
["Modern Engineering", "Java, Python, React, Angular, Flutter, Android, iOS, Mendix and full-stack engineering."],
];
const caps = [['Enterprise Applications', 'ERP, CRM and enterprise application implementations, rollouts and upgrades.', 'enterprise.svg'], ['Cloud Transformation', 'Cloud engineering, migrations, integrations and enterprise modernization.', 'cloud.svg'], ['AI & Agentic Automation', 'Generative AI, AI agents, RPA and intelligent workflows.', 'automation.svg'], ['Data & Analytics', 'Data engineering, dashboards, reporting, KPIs and decision intelligence.', 'analytics.svg'], ['Digital Engineering', 'Full-stack web and mobile development, APIs, quality engineering and DevOps.', 'engineering.svg'], ['Managed Services', 'SLA-governed application support, enhancements, monitoring and continuous improvement.', 'managed.svg']];
const uses = [['Invoice processing agent', 'Automate invoice capture, coding and exception workflows.'], ['Plain-language ERP Q&A', 'Ask ERP questions in English or Arabic.'], ['Procurement request agent', 'Streamline requisitions and approval workflows.'], ['Close support agent', 'Support financial close and variance analysis.'], ['Stock replenishment agent', 'Assist demand planning and replenishment decisions.'], ['HR service agent', 'Deliver faster answers to HR policy and service requests.']];
const solutions = [['India tax bolt-ons', 'ERP localization solutions.'], ['AP invoice automation', 'Streamlined accounts payable processes.'], ['Dealer management', 'Digitally connected dealer operations.'], ['Exchange rate automation', 'Automated exchange rate processes.']];
// const clientLogos = Array.from({ length: 24 }, (_, index) => ({ name: `Client ${String(index + 1).padStart(2, '0')}`, src: 'assets/img/client-logo-placeholder.svg' },
// { name: 'AmericanaWhite', src:'assets/img/AmericanaWhite-D4YOyaLq.svg' }
// ));
const clientLogos = [
  { name: 'Airtel', src: 'assets/img/client-logo-placeholder.svg' },
  { name: 'Client 2', src: 'assets/img/AmericanaWhite-D4YOyaLq.svg' },
  { name: 'Client 3', src: 'assets/img/MothersonSumiWhite-BUc_jsdR.svg' },
  { name: 'Client 4', src: 'assets/img/BajajFinservWhite-DvDFbNBA.svg' },
  { name: 'Client 5', src: 'assets/img/FortisWhite-CoLJpWNM.svg' },
  { name: 'Client 6', src: 'assets/img/GenpactWhite-BCK2bxby.svg' },
  { name: 'Client 7', src: 'assets/img/LuminousWhite-BPcX4mRB.svg' },
  { name: 'Client 8', src: 'assets/img/DelloitteWhite-DtQ2pZdz.svg' },
  { name: 'Client 9', src: 'assets/img/CoforgeWhite-gNSiu1_y.svg' },
  { name: 'Client 10', src: 'assets/img/IndusWhite-DysHZA4G.svg' },
  { name: 'Client 11', src: 'assets/img/ThermaxWhite%25201-BkXarUSK.svg' },
  { name: 'Client 12', src: 'assets/img/PeopleStrongWhite%25201-CRXx1jj3.svg' },
  { name: 'Client 13', src: 'assets/img/EvalueServeWhite-Dv0slrk0.svg' },
  { name: 'Client 14', src: 'assets/img/AccoliteWhite%25201-BKdy3gTV.svg' },
  { name: 'Client 15', src: 'assets/img/CKABirlaWhite-BB5wEu4h.svg' }
];
const industries = [['▥', 'Manufacturing'], ['✚', 'Healthcare'], ['▤', 'Retail & E-Commerce'], ['▰', 'Banking & Finance'], ['ϟ', 'Energy & Utilities'], ['◉', 'Communications'], ['⚕', 'Life Sciences'], ['▦', 'Government'], ['▷', 'Media & Entertainment'], ['✈', 'Aerospace & Airlines'], ['⇄', 'Rail & Mobility'], ['◈', 'Automotive']];
const render = (id, items, fn) => { document.getElementById(id).innerHTML = items.map(fn).join('') }; const tile = (x, i) => `<article class="tile"><span class="num">${String(i + 1).padStart(2, '0')} /</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`; render('tech-grid', tech, tile); render('use-grid', uses, tile); render('solution-grid', solutions, tile); render('cap-grid', caps, (x, i) => `<article class="tile cap-card"><img loading="lazy" src="assets/img/${x[2]}" alt="${x[0]} technology illustration"><div class="inside"><span class="num">0${i + 1} / CAPABILITY</span><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`); render('industry-grid', industries, x => `<div class="tile"><span class="symbol" aria-hidden="true">${x[0]}</span>${x[1]}</div>`);
const clientTrack = document.getElementById('client-track');
if (clientTrack) {
  const logoMarkup = clientLogos.map(client => `<li class="client-logo"><img src="${client.src}" alt="${client.name} logo"></li>`).join('');
  clientTrack.innerHTML = `<ol class="client-logo-group">${logoMarkup}</ol><ol aria-hidden="true" class="client-logo-group">${logoMarkup}</ol>`;
}
const menu = document.querySelector('.menu'), nav = document.querySelector('nav'); menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)) }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false') }));
const form = document.getElementById('lead-form'), status = document.getElementById('form-status'), submit = form.querySelector('button'); let successCloseTimer; form.addEventListener('submit', async e => { e.preventDefault(); submit.disabled = true; submit.textContent = 'Submitting…'; status.className = ''; status.textContent = ''; try { const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); const data = await res.json(); if (!res.ok || !data.ok) throw Error(data.message || 'Could not submit enquiry.'); status.textContent = data.message; form.reset(); if (leadDialog.open) { successCloseTimer = setTimeout(() => { if (leadDialog.open) leadDialog.close() }, 3500) } } catch (err) { status.className = 'error'; status.textContent = location.protocol === 'file:' ? 'Open this site through a PHP server to submit the form.' : (err.message.includes('JSON') || err.message === 'Failed to fetch' ? 'Unable to submit. Please try again or email dsales@awcsoftware.com.' : err.message) } finally { submit.disabled = Boolean(successCloseTimer); submit.textContent = 'Submit enquiry ↗' } });
const leadDialog = document.getElementById('lead-dialog'), leadDialogContent = leadDialog.querySelector('.lead-dialog-content'), leadDialogClose = leadDialog.querySelector('.lead-dialog-close'), formPlaceholder = document.createComment('lead-form');
form.before(formPlaceholder);
leadDialog.addEventListener('close', () => { clearTimeout(successCloseTimer); successCloseTimer = undefined; formPlaceholder.after(form); submit.disabled = false });
leadDialogClose.addEventListener('click', () => leadDialog.close());
leadDialog.addEventListener('click', event => { if (event.target === leadDialog) leadDialog.close() });
document.querySelectorAll('.lead-dialog-trigger').forEach(trigger => trigger.addEventListener('click', event => { if (typeof leadDialog.showModal !== 'function') return; event.preventDefault(); leadDialogContent.append(form); leadDialog.showModal(); form.querySelector('[name="name"]').focus() }));
const statCounts = document.querySelectorAll('.stat-count');
if (statCounts.length) {
  const finishCounts = () => statCounts.forEach(counter => { counter.textContent = counter.dataset.count });
  const startCounts = () => {
    const duration = 2600;
    const startTime = performance.now();
    const targets = Array.from(statCounts, counter => Number(counter.dataset.count));
    const updateCounts = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      statCounts.forEach((counter, index) => {
        counter.textContent = String(Math.min(Math.floor(targets[index] * easedProgress), targets[index]));
      });
      if (progress < 1) requestAnimationFrame(updateCounts);
      else finishCounts();
    };
    requestAnimationFrame(updateCounts);
  };
  statCounts.forEach(counter => { counter.textContent = '0' });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishCounts();
  else if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        statsObserver.disconnect();
        startCounts();
      }
    }, { threshold: 0.35 });
    statsObserver.observe(document.querySelector('.stats'));
  } else startCounts();
}