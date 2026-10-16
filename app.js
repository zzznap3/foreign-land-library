(() => {
  const $ = (id) => document.getElementById(id);
  const screens = { intro: $("intro"), quiz: $("quiz"), result: $("result") };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let answers = [];

  function show(name) {
    for (const [k, el] of Object.entries(screens)) el.hidden = k !== name;
    window.scrollTo({ top: 0 });
  }

// 文中の @ユーザー名 を X のプロフィールへのリンクにする
function renderWithXLinks(el, text) {
  el.replaceChildren();
  const re = /@([A-Za-z0-9_]{1,15})/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    el.append(text.slice(last, m.index));
    const a = document.createElement("a");
    a.href = `https://x.com/${m[1]}`;
    a.textContent = m[0];
    a.target = "_blank";
    a.rel = "noopener";
    el.append(a);
    last = m.index + m[0].length;
  }
  el.append(text.slice(last));
}

  function renderQuestion() {
    const i = answers.length;
    const q = QUESTIONS[i];
    $("progress").textContent = `${i + 1} / ${QUESTIONS.length}`;
    $("qtext").textContent = q.q;
    // 背後のカードの束：残り枚数に応じて減っていく
    const left = QUESTIONS.length - 1 - i;
    $("stack").style.setProperty("--s1", left >= 1 ? 1 : 0);
    $("stack").style.setProperty("--s2", left >= 2 ? 1 : 0);

    const box = $("options");
    box.replaceChildren();
    q.options.forEach((opt, idx) => {
      const b = document.createElement("button");
      b.className = "option";
      b.type = "button";
      b.textContent = opt.label;
      b.addEventListener("click", () => choose(idx, b));
      box.appendChild(b);
    });
    $("back").hidden = i === 0;
  }

  function choose(idx, btn) {
    btn.setAttribute("aria-pressed", "true");
    document.querySelectorAll(".option").forEach((b) => (b.disabled = true));
    answers.push(idx);
    const next = () => (answers.length === QUESTIONS.length ? showResult() : turnCard());
    if (reduceMotion) return next();
    const card = $("qcard");
    card.classList.add("qcard-out");
    card.addEventListener("animationend", function done() {
      card.removeEventListener("animationend", done);
      card.classList.remove("qcard-out");
      next();
    });
  }

  function turnCard() {
    renderQuestion();
    if (reduceMotion) return;
    const card = $("qcard");
    card.classList.add("qcard-in");
    card.addEventListener("animationend", () => card.classList.remove("qcard-in"), { once: true });
    $("options").querySelector("button")?.focus({ preventScroll: true });
  }

  function showResult() {
    const ranked = rankProducts(answers, QUESTIONS, PRODUCTS);
    const top = PRODUCTS[ranked[0].id];
    $("rimg").src = top.image;
    $("rimg").alt = top.name;
    $("rimg-link").href = top.url;
    $("rname").textContent = top.name;
    $("rkind").textContent = top.kind;
    renderWithXLinks($("rtext"), top.text);
    $("rprice").textContent = `¥${top.price.toLocaleString()}（税込）`;
    $("rlink").href = top.url;

    const also = $("also");
    also.replaceChildren();
    ranked.slice(1, 3).forEach(({ id }) => {
      const p = PRODUCTS[id];
      const li = document.createElement("li");
      li.innerHTML = `<a target="_blank" rel="noopener"><img loading="lazy" alt=""><span></span></a>`;
      li.querySelector("a").href = p.url;
      li.querySelector("img").src = p.image;
      li.querySelector("span").textContent = p.name;
      also.appendChild(li);
    });

    const pageUrl = location.href.split("?")[0].split("#")[0];
    const text = `ひとひら診断の結果、わたしへのおすすめは「${top.name}」でした。`;
    $("share").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageUrl)}&hashtags=${encodeURIComponent("異境文庫")}`;

    show("result");
    $("rname").setAttribute("tabindex", "-1");
    $("rname").focus({ preventScroll: true });
  }

  $("start").addEventListener("click", () => {
    answers = [];
    renderQuestion();
    show("quiz");
    $("options").querySelector("button")?.focus();
  });
  $("back").addEventListener("click", () => {
    answers.pop();
    renderQuestion();
  });
  $("retry").addEventListener("click", () => {
    answers = [];
    show("intro");
    $("start").focus();
  });
})();
