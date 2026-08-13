/* 生成物。編集しないこと。
   docs/design/assets/theme.js(保存キーを差し替え)+ docs/design/assets/nav.js
   + docs/manual/src/lang.js → tools/build-manual.cjs が連結する。 */

/* テーマ切替。AUTO / LIGHT / DARK の 3 状態を localStorage で全ページ共有する。
   初期反映はページ側のインラインスクリプトが先に済ませてある(ちらつき防止)ため、
   ここではトグル UI の組み立てと以降の切り替えだけを行う。 */
(function () {
  'use strict';

  var KEY = 'hebith-manual-theme';
  var MODES = ['auto', 'light', 'dark'];

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return MODES.indexOf(v) !== -1 ? v : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function apply(mode) {
    if (mode === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', mode);
  }

  function save(mode) {
    try {
      if (mode === 'auto') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) {
      /* プライベートモード等で保存できなくても切り替え自体は成立させる */
    }
  }

  var box = document.querySelector('.theme');
  if (!box) return;

  var buttons = MODES.map(function (mode) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = mode;
    b.setAttribute('aria-label', 'テーマ: ' + mode);
    b.addEventListener('click', function () {
      apply(mode);
      save(mode);
      sync(mode);
    });
    box.appendChild(b);
    return b;
  });

  function sync(mode) {
    buttons.forEach(function (b, i) {
      b.setAttribute('aria-pressed', String(MODES[i] === mode));
    });
  }

  sync(stored());

  /* 別タブで切り替えたときに追従する */
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY) return;
    var mode = stored();
    apply(mode);
    sync(mode);
  });
})();


/* ページ移動の帯。狭い画面では横スクロールになるため、現在地が画面の外へ
   隠れることがある。読み込み時に現在のページを帯の中央へ寄せて、どこにいるかと
   前後に何があるかを同時に見せる。ページ名を出すことが前提の挙動 ——
   番号だけに省略すると、どこへ飛ぶのか読めなくなる。 */
(function () {
  'use strict';

  var nav = document.querySelector('.pagenav');
  if (!nav) return;
  var here = nav.querySelector('[aria-current="page"]');
  if (!here) return;

  function center() {
    /* 全部見えているなら動かさない。勝手に横へずれるのは邪魔なだけ。 */
    if (nav.scrollWidth <= nav.clientWidth + 1) return;
    var r = here.getBoundingClientRect(), n = nav.getBoundingClientRect();
    nav.scrollLeft += (r.left - n.left) - (n.width - r.width) / 2;
  }

  center();
  window.addEventListener('resize', center);

  /* 言語を切り替えるとラベルの幅が変わる。位置を取り直す。 */
  if (window.MutationObserver) {
    new MutationObserver(center).observe(document.documentElement,
      { attributes: true, attributeFilter: ['data-lang'] });
  }
})();


/* 言語切替。日本語 / EN の 2 状態を localStorage で全ページ共有する。
   初期反映はページ側のインラインスクリプトが先に済ませてある(ちらつき防止)ため、
   ここではトグル UI の組み立てと以降の切り替えだけを行う。テーマ側(theme.js)と同じ作法。 */
(function () {
  'use strict';

  var KEY = 'hebith-manual-lang';
  var LANGS = [['ja', '日本語'], ['en', 'EN']];

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === 'ja' || v === 'en') return v;
    } catch (e) { /* 読めなければ既定へ落とす */ }
    return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ja';
  }

  function apply(lang) {
    var d = document.documentElement;
    d.setAttribute('data-lang', lang);
    d.setAttribute('lang', lang);
  }

  function save(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* プライベートモード等で保存できなくても切り替え自体は成立させる */
    }
  }

  var box = document.querySelector('.lang');
  if (!box) return;

  var buttons = LANGS.map(function (pair) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = pair[1];
    b.setAttribute('aria-label', 'Language: ' + pair[0]);
    b.addEventListener('click', function () {
      apply(pair[0]);
      save(pair[0]);
      sync(pair[0]);
    });
    box.appendChild(b);
    return b;
  });

  function sync(lang) {
    buttons.forEach(function (b, i) {
      b.setAttribute('aria-pressed', String(LANGS[i][0] === lang));
    });
  }

  sync(stored());

  /* 別タブで切り替えたときに追従する */
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY) return;
    var lang = stored();
    apply(lang);
    sync(lang);
  });
})();
