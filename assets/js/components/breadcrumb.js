// Content loading functionality
    function showContent() {
      const loadingContent = document.getElementById('loading-content');
      const mainContent = document.getElementById('main-content');

      loadingContent.classList.remove('loaded');
      mainContent.classList.add('loaded');
    }

    function showLoading() {
      const loadingContent = document.getElementById('loading-content');
      const mainContent = document.getElementById('main-content');

      mainContent.classList.remove('loaded');
      loadingContent.classList.add('loaded');
    }

    // Initialize with loading state, then show content after delay
    document.addEventListener('DOMContentLoaded', function () {
      showLoading();

      // Simulate loading time
      setTimeout(() => {
        showContent();
      }, 2000);
    });
