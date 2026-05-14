/* ===== 首页专用JavaScript ===== */
(function() {
  'use strict';
  
  // 首页特定功能初始化
  function initHomePage() {
    console.log('首页初始化...');
    
    // 可以在这里添加首页特有的功能
    // 例如：轮播图、特殊动画、数据加载等
    
    // 示例：添加滚动监听
    window.addEventListener('scroll', function() {
      var scrollPosition = window.scrollY;
      var heroSection = document.querySelector('.page-hero');
      
      if (heroSection) {
        // 根据滚动位置调整英雄区域的透明度
        var opacity = 1 - Math.min(scrollPosition / 500, 0.3);
        heroSection.style.opacity = opacity;
      }
    });
    
    // 示例：添加交互效果
    var timelineItems = document.querySelectorAll('.events li');
    timelineItems.forEach(function(item, index) {
      // 添加延迟显示动画
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      setTimeout(function() {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }
  
  // 页面加载完成后初始化首页功能
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomePage);
  } else {
    initHomePage();
  }
  
  // 导出公共API
  window.HomePage = {
    initHomePage: initHomePage
  };
})();