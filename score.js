// 採点ロジック（ブラウザとテストで共用）
function rankProducts(answers, questions, products) {
  const total = Object.fromEntries(Object.keys(products).map((id) => [id, 0]));
  answers.forEach((optIndex, qIndex) => {
    const scores = questions[qIndex].options[optIndex].scores;
    for (const [id, pt] of Object.entries(scores)) total[id] += pt;
  });
  // 同点のときは回答の組み合わせから決まる順で並べる（同じ回答なら毎回同じ結果）
  const seed = answers.reduce((a, v, i) => a + v * (i + 1), 0);
  const ids = Object.keys(products);
  return ids
    .map((id, i) => ({ id, score: total[id], tie: (i + seed) % ids.length }))
    .sort((a, b) => b.score - a.score || a.tie - b.tie);
}
if (typeof module !== "undefined") module.exports = { rankProducts };
