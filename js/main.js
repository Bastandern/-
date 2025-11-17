// DOMContentLoaded 事件监听器
document.addEventListener('DOMContentLoaded', function() {
    
    // 配置映射 (Configuration)
    const mappings = {
        'university-input': { element: '.university-name', defaultValue: '北京邮电大学' },
        'university-en-input': { element: '.university-name-en', defaultValue: 'Beijing University of Posts and Telecommunications' },
        'name-input': { element: '.name-item .name', defaultValue: '张三' },
        'id-input': { element: '.id-item .id', defaultValue: '2023210000' },
        'department-input': { element: '.department-item .department', defaultValue: '网络空间安全学院' },
        'category-input': { element: '.category-item .category', defaultValue: '本科生' },
        'issue-date-input': { element: '.issue-date-item .issue-date', defaultValue: '2023/09/01' },
        'expiry-date-input': { element: '.expiry-date-item .expiry-date', defaultValue: '2027/07/01' }
    };

    // 核心功能函数 (Functions)

    /**
     * 更新卡片上的文本内容 (用于文本框、日期、下拉框)
     * @param {string} inputId - 触发事件的输入框 ID
     */
    function updateCardText(inputId) {
        const input = document.getElementById(inputId);
        const mapping = mappings[inputId];
        const element = document.querySelector(mapping.element);

        if (input && element) {
            let value = input.value.trim();
            
            if (value === '') {
                element.textContent = mapping.defaultValue;
            } else {
                if (input.type === 'date' && value) {
                    value = value.replace(/-/g, '/');
                }
                element.textContent = value;
            }
        }
    }

    /**
     * 更新卡片上的图片 (用于文件上传)
     * @param {string} inputId - 触发事件的文件上传框 ID
     * @param {string} imgSelector - 卡片上 <img> 元素的 CSS 选择器
     */
    function updateCardImage(inputId, imgSelector) {
        const input = document.getElementById(inputId);
        const imgElement = document.querySelector(imgSelector);

        if (input && imgElement) {
            input.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const newImageUrl = e.target.result;
                        imgElement.src = newImageUrl;
                        if (inputId === 'logo-upload') {
                            const cardBack = document.querySelector('.card-back');
                            if (cardBack) {
                                cardBack.style.setProperty('--card-watermark-bg', `url(${newImageUrl})`);
                            }
                        }
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // 事件绑定 (Event Binding)
    // 自动为 mappings 中定义的所有文本/日期/下拉框绑定 'input' 事件
    for (const inputId in mappings) {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => updateCardText(inputId));
        }
    }

    // 手动为图片上传框绑定事件
    updateCardImage('photo-upload', '.card-photo');
    updateCardImage('logo-upload', '.card-logo');

    // 初始化 (Initialization)
    
    /**
     * 在页面加载时，用表单中的初始值立即填充一次卡片
     */
    function initializeCard() {
        for (const inputId in mappings) {
            updateCardText(inputId);
        }
    }
    initializeCard();
});