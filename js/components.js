/* ===== 组件相关JavaScript ===== */
(function() {
  'use strict';
  
  // 导航栏功能
  function initNavigation() {
    var navLinks = document.querySelectorAll('.top-nav a, .footer-nav a');
    
    // 为当前页面链接添加活动状态
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(function(link) {
      var linkHref = link.getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('active');
      }
      
      // 平滑滚动到锚点
      if (linkHref.startsWith('#')) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          var targetId = linkHref.substring(1);
          var targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }
    });
  }
  
  // 上色功能
  function initColoring() {
    var coloringSvg = document.getElementById('coloringSvg');
    if (!coloringSvg) return;
    
    var colorButtons = document.querySelectorAll('.color-btn');
    var resetButton = document.getElementById('resetBtn');
    var colorZones = coloringSvg.querySelectorAll('.color-zone');
    
    var currentColor = '#b5332e'; // 默认朱砂色
    
    // 颜色按钮点击事件
    colorButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // 移除所有按钮的active类
        colorButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        
        // 添加active类到当前按钮
        button.classList.add('active');
        
        // 更新当前颜色
        currentColor = button.getAttribute('data-color');
      });
    });
    
    // 颜色区域点击事件
    colorZones.forEach(function(zone) {
      zone.addEventListener('click', function() {
        this.setAttribute('fill', currentColor);
      });
    });
    
    // 重置按钮点击事件
    if (resetButton) {
      resetButton.addEventListener('click', function() {
        colorZones.forEach(function(zone) {
          zone.setAttribute('fill', '#f0e6d6'); // 重置为默认颜色
        });
        
        // 重置颜色按钮状态
        colorButtons.forEach(function(button, index) {
          button.classList.remove('active');
          if (index === 0) {
            button.classList.add('active');
          }
        });
        
        currentColor = '#b5332e'; // 重置为默认颜色
      });
    }
  }
  
  // 初始化所有组件
  function initComponents() {
    initNavigation();
    initColoring();
  }
  
  // 页面加载完成后初始化组件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }
  
  // 导出公共API
  window.Components = {
    initNavigation: initNavigation,
    initColoring: initColoring,
    initComponents: initComponents
  };
})();