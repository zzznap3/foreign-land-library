// ============================================================
//  異境文庫 診断データ
//  商品の追加・入れ替えはこのファイルだけ編集すればOK。
//  scores: { 商品id: 加点 } —— 選んだ選択肢の点数を合計し、最高点の商品をおすすめします。
// ============================================================

const SHOP = "https://zourokukohan.com";
const img = (path) => `${SHOP}/cdn/shop/files/${path}&width=640`;

const PRODUCTS = {
  nagoya: {
    name: "うそ八百、まこと八百 なごやの一景",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-16-14-05-47`,
    image: img("LRlAZ255QN7lzciihrbZcAfigkZnmhslpkdPvjLK.png?v=1792127366"),
    kind: "掌編小説冊子（B6／24ページ・写真つき）",
    text: "名古屋市内の風景写真をお題に800字の掌編小説を募集する賞「コトノハなごや」への応募作（受賞作含む）を、お題に近しい写真とともに冊子にしました。ひとつひとつ手書きの赤エンピツ文字が入っています（内容はランダム）。自宅で紐綴じをしているので個体差があります。",
  },
  ikimono: {
    name: "ひとひらがたり【生きもの】",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-16-12-09-02`,
    image: img("ENUYWJLTZpb84Nuz24GWXcrZHgy43SE0v869DD2s_aab14dc3-c518-4ed3-930a-0bd92a20d70b.png?v=1792120353"),
    kind: "300字小説カード 10枚セット",
    text: "名刺サイズのカードに300字小説をおさめた〈ひとひら〉シリーズの10枚セット。多くの人が好きなワンニャンからトカゲ、カエル、虫（※本体は出ません）までなんでもいます。",
  },
  fushigi: {
    name: "ひとひらがたり【すこしフシギ】",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-16-12-10-57`,
    image: img("pC4nnO4H872swCnFrZS4pHj93yO54MRuFnnU38rY.png?v=1792120411"),
    kind: "300字小説カード 10枚セット",
    text: "名刺サイズのカードに300字小説をおさめた〈ひとひら〉シリーズの10枚セット。やんわりホラー、かるい幻想、気軽なナンセンス。日々の息抜きにどうぞ。",
  },
  nichijo: {
    name: "ひとひらがたり【日常】",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-16-12-11-55`,
    image: img("up9DizJFryzdnw11UZ20dDL15OdtCnUbZ6o8ohvE.png?v=1792120410"),
    kind: "300字小説カード 10枚セット",
    text: "名刺サイズのカードに300字小説をおさめた〈ひとひら〉シリーズの10枚セット。不安をマジカルなもので素敵に変えて、生活をやっていきたいという気持ち。",
  },
  hoshikakera: {
    name: "星のかけら五つ集めれば",
    price: 300,
    url: `${SHOP}/products/i4-2026-10-14-20-48-05`,
    image: img("rBwVBGA9QSuKVLr5Uapf3cGx51mKit6nGofF17MU_a2eb86e4-b585-4390-bd83-dd3c57a96a8b.png?v=1791978658"),
    kind: "140字小説カード 5枚セット（作：星）",
    text: "140字小説や掌編小説コンテストなどで活躍中の書き手、星（X: @hosi_hitotubu）の発表済み140字小説を名刺サイズのカードにしました。空元気の時に読んで心を落ち着けるのにぴったり。",
  },
  hikaruhoshi: {
    name: "長く伸びた尾の先、光る星",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-14-20-39-44`,
    image: img("IMG_8791.png?v=1792100036"),
    kind: "140字・300字小説カード 10枚セット（星×長尾たぐい）",
    text: "星の140字小説と長尾たぐいの300字小説を名刺サイズのカードセットにしました。作品はすべて書き下ろし。テーマは「願望」。二人がそれぞれどのような「願望」を元に作品を作ったのかは手に入れてみてのお楽しみ。",
  },
  utsusemi: {
    name: "300字小説クリアファイル【うつせ・み】",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-14-19-40-24`,
    image: img("AsuAif5edj605vDFQk87wqb4AgMGe7nwzBkKwPD2.png?v=1791974635"),
    kind: "A4クリアファイル（イラスト：こな・つむり）",
    text: "長尾たぐいの300字小説に寄せてプロのPOP職人、こな・つむりが書き下ろしたイラストを使用したA4クリアファイル。紙を入れると読み味が違う仕様になっております。夏を偲ぶのにいかが？",
  },
  postcard: {
    name: "140字・300字小説ポストカードセット【海月の骨／入眠珈琲】",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-14-19-18-28`,
    image: img("HSv4aUdqAyqJyIyN02jI1xGGFs11IuvT6s8QdLPV.jpg?v=1791973239"),
    kind: "小説ポストカード 2枚セット",
    text: "星の書き下ろし140字小説、そして長尾たぐいの300字小説に寄せてこな・つむりが書き下ろしたイラストを使用した小説ポストカードのセット。どちらも眠り・夢が関わる作品です。枕元にいかが？",
  },
  tenshi: {
    name: "紙の展開図から天使をつくる",
    price: 500,
    url: `${SHOP}/products/i4-2026-10-14-18-06-30`,
    image: img("wqhohanI8TdmsYMp2jtQQpFVuENmwMWJRscAeJva_440eeecd-45b7-4fdf-9747-0a80b9f7ada5.png?v=1791969019"),
    kind: "合作掌編小説冊子（B6／48ページ・曾根崎十三×長尾たぐい）",
    text: "ひとりぼっちの女の子が紙を折って天使を作りだすことを繰り返すお話「そこにある。」と、自分の身体を代償に神の死体から燃料を汲む天使を折る少年たちのお話「ゴッド・コープス・マシナリー」の２編を収録。12㎝角の折り紙をランダム封入しています。",
  },
  scroll: {
    name: "スクロール・ノベル【妖精】",
    price: 300,
    url: `${SHOP}/products/%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB-%E3%83%8E%E3%83%99%E3%83%AB-%E5%A6%96%E7%B2%BE`,
    image: img("IMG_8342.jpg?v=1785039148"),
    kind: "巻物型の掌編（約13×10cm）",
    text: "物理的にスクロールして読む掌編。お気に入りのシーンやセリフ部分を見えるように飾るもよし。「この中から妖精の入ったらランプを探してくれるかい」と、大量のアンティークランプの中からとあるひとつを探してほしいと大伯母に依頼される話。",
  },
  iruka: {
    name: "ひとひらチャーム【いるか】",
    price: 500,
    url: `${SHOP}/products/i4-2026-07-24-17-30-59`,
    image: img("Yf6p5mo9Aza9O5uYhlK9JxyXzwpxNvh4WhS2Q1KY.jpg?v=1784881992"),
    kind: "300字小説チャーム（金属光沢を泳ぐ影）",
    text: "名古屋港水族館で暮らし、そこで命を終えたイルカについてのお話。プールバッグなんかにどうでしょう。",
  },
  mane: {
    name: "ひとひらチャーム【マネしないでください】",
    price: 500,
    url: `${SHOP}/products/i4-2026-07-24-17-27-13`,
    image: img("vBumUDmwwR8HU6UQmD5fk9oAvurxTaWg7931Yrz6.jpg?v=1784882909"),
    kind: "300字小説チャーム（工具類・ランダム）",
    text: "やんちゃサイエンスボーイが人の親になったら、というお話。ペンケースなんかにいかがでしょうか。",
  },
  tsubaki: {
    name: "ひとひらチャーム【椿】",
    price: 500,
    url: `${SHOP}/products/i4-2026-07-24-17-21-22`,
    image: img("yqaaXtvT3eiNtjEwboscW0xXBP8HkdJ76jfRxTLM.jpg?v=1789873496"),
    kind: "300字小説チャーム（椿の落ちる音）",
    text: "月給取りのつらさを扱ったややダークめのお話。通勤カバンのアクセントにいかがでしょうか。",
  },
  neko: {
    name: "ひとひらチャーム【ねこ】",
    price: 500,
    url: `${SHOP}/products/i4-2026-07-24-17-15-04`,
    image: img("EsQNkBWf8pY6Zz4O3vZoQaXZfBJ0lmIsioQ7nqmO.jpg?v=1784881080"),
    kind: "300字小説チャーム（のどか・ランダム）",
    text: "名刺サイズのカードに300字小説をおさめた〈ひとひら〉シリーズのチャーム。タイトルは「のどか」。",
  },
};

const QUESTIONS = [
  {
    q: "物語を、どんなかたちで手元に置きたい？",
    options: [
      { label: "鞄やペンケースにぶらさげて", scores: { iruka: 3, mane: 3, tsubaki: 3, neko: 3 } },
      { label: "小さなカードを一枚ずつめくって", scores: { ikimono: 3, fushigi: 3, nichijo: 3, hoshikakera: 3, hikaruhoshi: 3 } },
      { label: "部屋に飾ったり、本棚に並べたり", scores: { tenshi: 3, nagoya: 3, scroll: 3, utsusemi: 3, postcard: 3 } },
    ],
  },
  {
    q: "読みたくなるのは、どんなとき？",
    options: [
      { label: "通勤・通学の行き帰り", scores: { tsubaki: 3, nagoya: 2, nichijo: 2, mane: 1 } },
      { label: "眠る前の、ひとりの時間", scores: { postcard: 3, hikaruhoshi: 2, hoshikakera: 1, tenshi: 1 } },
      { label: "休憩やおでかけのお供に", scores: { scroll: 2, iruka: 1, fushigi: 1, neko: 1, ikimono: 1, utsusemi: 1 } },
    ],
  },
  {
    q: "気になるモチーフは？",
    options: [
      { label: "犬や猫、海の生きもの", scores: { ikimono: 3, neko: 3, iruka: 3 } },
      { label: "星と夜と、夢", scores: { hoshikakera: 3, hikaruhoshi: 3, postcard: 3 } },
      { label: "妖精や天使、人ならざるもの", scores: { scroll: 3, tenshi: 3, fushigi: 2 } },
    ],
  },
  {
    q: "好きな読後感は？",
    options: [
      { label: "ほっとする、やさしい", scores: { neko: 2, ikimono: 2, nichijo: 2, nagoya: 2, hoshikakera: 1 } },
      { label: "ワクワク、ちょっと不思議", scores: { fushigi: 3, mane: 3, scroll: 1 } },
      { label: "せつなくて、ほろ苦い", scores: { utsusemi: 3, tenshi: 3, tsubaki: 2, iruka: 2, hikaruhoshi: 2 } },
    ],
  },
  {
    q: "いまの気分にいちばん近いのは？",
    options: [
      { label: "空元気でなんとかやっている", scores: { hoshikakera: 3, tsubaki: 2 } },
      { label: "不安を、何か素敵なものに変えたい", scores: { nichijo: 3, neko: 1, mane: 1 } },
      { label: "過ぎた季節や、見慣れた景色を思い出したい", scores: { utsusemi: 3, nagoya: 2, iruka: 1, hikaruhoshi: 1 } },
    ],
  },
];
