// 配点チェック：全回答パターンで各商品が1位になる割合を表示する
// 使い方：node check.js
const fs = require("fs");
eval(fs.readFileSync(__dirname + "/data.js", "utf8") + ";globalThis.Q=QUESTIONS;globalThis.P=PRODUCTS;");
const { rankProducts } = require("./score.js");
const count = Object.fromEntries(Object.keys(P).map((id) => [id, 0]));
let n = 0;
(function walk(a) {
  if (a.length === Q.length) { count[rankProducts(a, Q, P)[0].id]++; n++; return; }
  Q[a.length].options.forEach((_, i) => walk([...a, i]));
})([]);
for (const [id, c] of Object.entries(count)) {
  const mark = c === 0 ? "  ← 一度も1位にならない" : "";
  console.log(`${P[id].name.padEnd(30, "　")} ${String(c).padStart(4)}  ${(c / n * 100).toFixed(1)}%${mark}`);
}
console.log(`全${n}通り`);
