// ============================================================
//  シェア用ページの生成
//  使い方：node build-share.js
//  data.js の商品ごとに r/<商品id>.html を作る。
//  X はページの JavaScript を実行せず、HTML に書かれた <meta> だけを読むので、
//  「商品ごとに別の URL・別の og:image を持つ静的ページ」が必要になる。
//  data.js を変更したら、このスクリプトを実行し直して r/ フォルダごとアップロードすること。
// ============================================================
const fs = require("fs");
const path = require("path");

// 公開URL（末尾のスラッシュまで）。
// GitHub Actions で実行するときは自動で渡されるので書き換え不要。
// 手元で実行するときだけ、下の文字列を実際のURLに書き換える。
const SITE_URL = (process.env.SITE_URL || "https://ユーザー名.github.io/リポジトリ名/").replace(/\/?$/, "/");

eval(fs.readFileSync(path.join(__dirname, "data.js"), "utf8") + ";globalThis.PRODUCTS=PRODUCTS;");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// サムネイルの優先順：
//   1. data.js の ogImage（個別に指定したいとき）
//   2. r/img/<商品id>.png（make-share-images.py で生成したもの）
//   3. ショップの商品写真を 1200×630 に中央切り抜き（新商品で画像をまだ作っていないときの保険）
const ogImageOf = (id, p) => {
  if (p.ogImage) return p.ogImage;
  if (fs.existsSync(path.join(__dirname, "r", "img", `${id}.png`))) return `${SITE_URL}r/img/${id}.png`;
  return p.image.replace(/&width=\d+/, "&width=1200&height=630&crop=center");
};

const outDir = path.join(__dirname, "r");
fs.mkdirSync(outDir, { recursive: true });

for (const [id, p] of Object.entries(PRODUCTS)) {
  const url = `${SITE_URL}r/${id}.html`;
  const title = `ひとひら診断の結果は「${p.name}」`;
  const desc = "5つの質問に答えると、異境文庫の文芸雑貨からあなたにひとつ、おすすめをお届けします。";
  const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}｜異境文庫</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${esc(ogImageOf(id, p))}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(p.name)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <main id="app">
    <section class="screen">
      <p class="result__label">この人へのひとひら</p>
      <article class="pick">
        <a class="pick__img" href="${esc(p.url)}" target="_blank" rel="noopener">
          <img src="${esc(p.image)}" alt="${esc(p.name)}" width="640" height="640">
        </a>
        <div class="pick__body">
          <h2>${esc(p.name)}</h2>
          <p class="pick__kind">${esc(p.kind)}</p>
          <p class="pick__text">${esc(p.text)}</p>
          <p class="pick__price">¥${p.price.toLocaleString()}（税込）</p>
          <a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">蔵六湖畔のショップで見る</a>
        </div>
      </article>
      <a class="btn btn--primary" href="../">あなたも診断する</a>
    </section>
  </main>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, `${id}.html`), html);
  console.log(`r/${id}.html`);
}
