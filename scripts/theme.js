// 主题切换器
(function() {
    const themeNames = {
        'default': '浅蓝白',
        'deep-blue': '深蓝',
        'purple': '优雅紫',
        'green': '清新绿',
        'rose': '玫瑰金',
        'dark': '暗夜'
    };

    // 获取当前主题
    function getCurrentTheme() {
        return localStorage.getItem('theme') || 'default';
    }

    // 设置主题
    function setTheme(theme) {
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        localStorage.setItem('theme', theme);

        // 更新主题名称显示
        const themeNameElement = document.getElementById('theme-name');
        if (themeNameElement) {
            themeNameElement.textContent = themeNames[theme];
        }

        // 更新激活状态
        updateActiveTheme(theme);
    }

    // 更新主题选项的激活状态
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

    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 应用保存的主题
        const currentTheme = getCurrentTheme();
        setTheme(currentTheme);

        // 主题切换按钮
        const themeToggle = document.getElementById('theme-toggle');
        const themePanel = document.getElementById('theme-panel');

        if (themeToggle && themePanel) {
            themeToggle.addEventListener('click', function() {
                themePanel.classList.add('active');
            });

            // 点击面板外部关闭
            themePanel.addEventListener('click', function(e) {
                if (e.target === themePanel) {
                    themePanel.classList.remove('active');
                }
            });
        }

        // 主题选项点击
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                setTheme(theme);

                // 延迟关闭面板，让用户看到选择效果
                setTimeout(() => {
                    if (themePanel) {
                        themePanel.classList.remove('active');
                    }
                }, 300);
            });
        });

        // ESC键关闭面板
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && themePanel) {
                themePanel.classList.remove('active');
            }
        });
    });
})();
