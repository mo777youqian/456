/* ===== 通用JavaScript功能 ===== */
(function() {
  'use strict';
  
  // DOM加载完成后执行
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
  
  // 加载外部HTML内容
  function loadHTML(url, targetId) {
    return new Promise(function(resolve, reject) {
      var el = document.getElementById(targetId);
      if (!el) {
        reject(new Error('Target element not found: ' + targetId));
        return;
      }
      
      // 检测是否是file://协议
      if (window.location.protocol === 'file:') {
        // 本地文件模式：直接使用内联内容，不尝试动态加载
        console.log('Local file mode: using inline content for ' + targetId);
        useInlineContent(targetId, el);
        resolve();
      } else {
        // HTTP/HTTPS协议：使用fetch
        fetch(url)
          .then(function(response) {
            if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.status);
            }
            return response.text();
          })
          .then(function(html) {
            el.outerHTML = html;
            resolve();
          })
          .catch(function(error) {
            console.error('Failed to load ' + url + ':', error);
            useInlineContent(targetId, el);
            resolve();
          });
      }
    });
  }
  
  // 使用内联内容替代动态加载
  function useInlineContent(targetId, el) {
    var content = '';
    
    if (targetId === 'common-header') {
      content = '<header id="header">' +
        '<nav class="top-nav">' +
        '<a href="../index.html">首页</a>' +
        '<a href="overview.html">概览</a>' +
        '<a href="mogao.html">莫高窟</a>' +
        '<a href="murals.html">壁画</a>' +
        '<a href="apsaras.html">飞天</a>' +
        '<a href="library-cave.html">藏经洞</a>' +
        '<a href="silk-road.html">丝路</a>' +
        '<a href="colors.html">色彩</a>' +
        '<a href="donors.html">供养人</a>' +
        '<a href="dance.html">乐舞</a>' +
        '<a href="digital.html">数字敦煌</a>' +
        '<a href="interactive.html">点亮敦煌</a>' +
        '</nav>' +
        '</header>';
    } else if (targetId === 'common-footer') {
      content = '<footer id="footer">' +
        '<blockquote>敦煌者，吾国学术之伤心史也。<cite>陈寅恪</cite></blockquote>' +
        '<p>735 窟 · 45000 m² 壁画 · 2415 尊彩塑 · 跨越十个朝代</p>' +
        '<nav class="footer-nav">' +
        '<a href="../index.html">首页</a>' +
        '<a href="overview.html">概览</a>' +
        '<a href="mogao.html">莫高窟</a>' +
        '<a href="murals.html">壁画</a>' +
        '<a href="apsaras.html">飞天</a>' +
        '<a href="library-cave.html">藏经洞</a>' +
        '<a href="silk-road.html">丝路</a>' +
        '<a href="colors.html">色彩</a>' +
        '<a href="donors.html">供养人</a>' +
        '<a href="dance.html">乐舞</a>' +
        '<a href="digital.html">数字敦煌</a>' +
        '<a href="interactive.html">点亮敦煌</a>' +
        '</nav>' +
        '<p class="ft-small">静态展示页 · 2026</p>' +
        '</footer>';
    }
    
    if (content) {
      el.outerHTML = content;
    }
  }
  
  // 检查并加载公共组件
  function loadComponents() {
    var promises = [];
    
    // 检查是否需要加载header
    var headerEl = document.getElementById('common-header');
    if (headerEl && headerEl.innerHTML.trim() === '') {
      // 根据当前页面路径计算正确的header路径
      var headerPath = window.location.pathname.includes('/html/') ? '../html/common/header.html' : 'html/common/header.html';
      promises.push(loadHTML(headerPath, 'common-header'));
    }
    
    // 检查是否需要加载footer
    var footerEl = document.getElementById('common-footer');
    if (footerEl && footerEl.innerHTML.trim() === '') {
      // 根据当前页面路径计算正确的footer路径
      var footerPath = window.location.pathname.includes('/html/') ? '../html/common/footer.html' : 'html/common/footer.html';
      promises.push(loadHTML(footerPath, 'common-footer'));
    }
    
    return Promise.all(promises);
  }
  
  // 高亮当前页面导航链接
  function highlightCurrentPage() {
    // 获取当前页面文件名
    var currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html';
    
    // 获取所有导航链接
    var navLinks = document.querySelectorAll('.top-nav a, .footer-nav a');
    
    navLinks.forEach(function(link) {
      // 获取链接指向的页面文件名
      var linkHref = link.getAttribute('href');
      var linkPage = linkHref.split('/').pop();
      
      // 如果链接指向当前页面，添加active类
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function initPageInteractions() {
    var colorTip = document.getElementById('color-tip');
    var colorItems = document.querySelectorAll('.page-colors .color-item');
    if (colorTip && colorItems.length) {
      colorItems.forEach(function(item) {
        item.addEventListener('click', function() {
          colorItems.forEach(function(node) { node.classList.remove('active'); });
          item.classList.add('active');
          var name = item.getAttribute('data-color-name') || '';
          var tip = item.getAttribute('data-color-tip') || '';
          colorTip.textContent = name ? (name + '：' + tip) : tip;
        });
      });
    }

    var processTip = document.getElementById('process-tip');
    var processSteps = document.querySelectorAll('.page-digital .process-step');
    if (processTip && processSteps.length) {
      processSteps.forEach(function(step) {
        step.addEventListener('click', function() {
          processSteps.forEach(function(node) { node.classList.remove('active'); });
          step.classList.add('active');
          var tip = step.getAttribute('data-step-tip');
          if (tip) processTip.textContent = tip;
        });
      });
      var activeStep = document.querySelector('.page-digital .process-step.active');
      if (activeStep) {
        var defaultTip = activeStep.getAttribute('data-step-tip');
        if (defaultTip) processTip.textContent = defaultTip;
      }
    }

    var filters = document.querySelectorAll('.archive-filter');
    var archiveItems = document.querySelectorAll('.archive-item');
    if (filters.length && archiveItems.length) {
      filters.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var filter = btn.getAttribute('data-filter');
          filters.forEach(function(node) { node.classList.remove('active'); });
          btn.classList.add('active');
          archiveItems.forEach(function(item) {
            var type = item.getAttribute('data-type');
            var isVisible = filter === 'all' || type === filter;
            item.classList.toggle('is-hidden', !isVisible);
          });
        });
      });
    }
  }
  
  // 初始化函数
  function init() {
    // 加载公共组件
    loadComponents().then(function() {
      // 组件加载完成后高亮当前页面
      highlightCurrentPage();
    }).catch(function(error) {
      console.warn('Some components failed to load:', error);
    });

    initPageInteractions();
  }
  
  // 页面加载完成后初始化
  domReady(init);
  
  // 导出公共API
  window.CommonUtils = {
    domReady: domReady,
    loadHTML: loadHTML,
    loadComponents: loadComponents
  };
})();