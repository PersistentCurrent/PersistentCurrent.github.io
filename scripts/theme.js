// テーマ切替器
(function() {
    const themeNames = {
        'default': 'ライトブルー',
        'deep-blue': 'ディープブルー',
        'purple': 'エレガントパープル',
        'green': 'フレッシュグリーン',
        'rose': 'ローズゴールド',
        'dark': 'ダーク'
    };

    // 現在のテーマを取得
    function getCurrentTheme() {
        return localStorage.getItem('theme') || 'default';
    }

    // テーマを設定
    function setTheme(theme) {
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        localStorage.setItem('theme', theme);

        // テーマ名の表示を更新
        const themeNameElement = document.getElementById('theme-name');
        if (themeNameElement) {
            themeNameElement.textContent = themeNames[theme];
        }

        // アクティブ状態を更新
        updateActiveTheme(theme);
    }

    // テーマオプションのアクティブ状態を更新
    function updateActiveTheme(theme) {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const optionTheme = option.getAttribute('data-theme');
            if (optionTheme === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', function() {
        // 保存されたテーマを適用
        const currentTheme = getCurrentTheme();
        setTheme(currentTheme);

        // テーマ切替ボタン
        const themeToggle = document.getElementById('theme-toggle');
        const themePanel = document.getElementById('theme-panel');

        if (themeToggle && themePanel) {
            themeToggle.addEventListener('click', function() {
                themePanel.classList.add('active');
            });

            // パネル外をクリックして閉じる
            themePanel.addEventListener('click', function(e) {
                if (e.target === themePanel) {
                    themePanel.classList.remove('active');
                }
            });
        }

        // テーマオプションのクリック
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                setTheme(theme);

                // パネルを遅延して閉じて、ユーザーが選択効果を見られるようにする
                setTimeout(() => {
                    if (themePanel) {
                        themePanel.classList.remove('active');
                    }
                }, 300);
            });
        });

        // ESCキーでパネルを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && themePanel) {
                themePanel.classList.remove('active');
            }
        });
    });
})();
