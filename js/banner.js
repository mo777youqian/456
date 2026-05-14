/* ===== Banner轮播功能 ===== */
(function() {
  'use strict';
  
  class BannerSlider {
    constructor() {
      this.slider = document.querySelector('.banner-slider');
      this.slides = document.querySelectorAll('.banner-slide');
      this.indicators = document.querySelectorAll('.indicator');
      this.prevBtn = document.querySelector('.banner-prev');
      this.nextBtn = document.querySelector('.banner-next');
      
      this.currentSlide = 0;
      this.totalSlides = this.slides.length;
      this.autoPlayInterval = null;
      this.autoPlayDelay = 5000; // 5秒自动切换
      
      this.init();
    }
    
    init() {
      // 初始化事件监听
      this.addEventListeners();
      
      // 开始自动播放
      this.startAutoPlay();
      
      // 更新指示器状态
      this.updateIndicators();
    }
    
    addEventListeners() {
      // 上一张按钮
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.prevSlide();
          this.resetAutoPlay();
        });
      }
      
      // 下一张按钮
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.nextSlide();
          this.resetAutoPlay();
        });
      }
      
      // 指示器点击
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          this.goToSlide(index);
          this.resetAutoPlay();
        });
      });
      
      // 鼠标悬停暂停自动播放
      this.slider.addEventListener('mouseenter', () => {
        this.pauseAutoPlay();
      });
      
      this.slider.addEventListener('mouseleave', () => {
        this.startAutoPlay();
      });
    }
    
    goToSlide(index) {
      // 移除当前活动状态
      this.slides[this.currentSlide].classList.remove('active');
      this.indicators[this.currentSlide].classList.remove('active');
      
      // 更新当前幻灯片索引
      this.currentSlide = index;
      
      // 添加新的活动状态
      this.slides[this.currentSlide].classList.add('active');
      this.indicators[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
      const nextIndex = (this.currentSlide + 1) % this.totalSlides;
      this.goToSlide(nextIndex);
    }
    
    prevSlide() {
      const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.goToSlide(prevIndex);
    }
    
    updateIndicators() {
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlide);
      });
    }
    
    startAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
      }
      
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
    
    resetAutoPlay() {
      this.pauseAutoPlay();
      this.startAutoPlay();
    }
    
    // 键盘导航支持
    enableKeyboardNavigation() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          this.prevSlide();
          this.resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
          this.nextSlide();
          this.resetAutoPlay();
        }
      });
    }
  }
  
  // 页面加载完成后初始化Banner轮播
  function initBannerSlider() {
    if (document.querySelector('.banner-container')) {
      const bannerSlider = new BannerSlider();
      bannerSlider.enableKeyboardNavigation();
      
      // 导出到全局，方便调试
      window.bannerSlider = bannerSlider;
      
      console.log('Banner轮播初始化完成');
    }
  }
  
  // DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBannerSlider);
  } else {
    initBannerSlider();
  }
  
  // 导出公共API
  window.BannerSlider = {
    initBannerSlider: initBannerSlider
  };
})();