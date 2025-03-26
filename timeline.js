document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline li");
  const timelineWrapper = document.querySelector(".timeline-wrapper");
  const timeline = document.querySelector(".timeline");

  let currentPosition = 0;
  let activeItem = null;
  let isDragging = false;
  let startX;
  let startPosition;

  // Initialize timeline
  function initTimeline() {
    if (timelineItems.length > 0) {
      setActiveItem(timelineItems[0]);
    }
    centerTimeline();
  }

  // Set active item
  function setActiveItem(item) {
    if (activeItem) {
      activeItem.classList.remove("active");
    }
    item.classList.add("active");
    activeItem = item;
    centerActiveItem();
  }

  // Center the active item in view
  function centerActiveItem() {
    if (!activeItem) return;
    const wrapperWidth = timelineWrapper.clientWidth;
    const itemOffset = activeItem.offsetLeft;
    const itemWidth = activeItem.clientWidth;

    currentPosition = -(itemOffset - wrapperWidth / 2 + itemWidth / 2);
    updateTimelinePosition();
  }

  // Center the timeline on load
  function centerTimeline() {
    const wrapperWidth = timelineWrapper.clientWidth;
    const timelineWidth = timeline.scrollWidth;

    currentPosition = -(timelineWidth - wrapperWidth) / 2;
    updateTimelinePosition();
  }

  // Update timeline position
  function updateTimelinePosition() {
    const timelineWidth = timeline.scrollWidth;
    const wrapperWidth = timelineWrapper.clientWidth;

    const maxPosition = 0;
    const minPosition = -(timelineWidth - wrapperWidth);

    currentPosition = Math.min(
      maxPosition,
      Math.max(minPosition, currentPosition)
    );
    timeline.style.transform = `translateX(${currentPosition}px) translateY(-50%)`;
  }

  // Handle item click/tap
  function handleItemInteraction(item, e) {
    if (
      isDragging &&
      Math.abs(e.clientX || e.touches[0].clientX - startX) > 10
    ) {
      return;
    }
    if (item === activeItem) {
      item.classList.remove("active");
      activeItem = null;
    } else {
      setActiveItem(item);
    }
  }

  // Event listeners for timeline items
  timelineItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      handleItemInteraction(item, e);
    });

    // Touch events for mobile
    item.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    item.addEventListener("touchend", function (e) {
      handleItemInteraction(item, e);
    });

    // Close button
    const closeBtn = item.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        item.classList.remove("active");
        activeItem = null;
      });
    }
  });

  // Touch and mouse events for horizontal scrolling
  timelineWrapper.addEventListener("mousedown", startDrag);
  timelineWrapper.addEventListener("touchstart", startDrag, { passive: false });
  timelineWrapper.addEventListener("mousemove", drag);
  timelineWrapper.addEventListener("touchmove", drag, { passive: false });
  timelineWrapper.addEventListener("mouseup", endDrag);
  timelineWrapper.addEventListener("touchend", endDrag);
  timelineWrapper.addEventListener("mouseleave", endDrag);
  timelineWrapper.addEventListener("touchcancel", endDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startPosition = currentPosition;
    timelineWrapper.style.cursor = "grabbing";
    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    const dx = x - startX;
    currentPosition = startPosition + dx;
    updateTimelinePosition();
    e.preventDefault(); // Prevent scrolling
  }

  function endDrag() {
    isDragging = false;
    timelineWrapper.style.cursor = "grab";
  }

  // Initialize
  initTimeline();

  // Handle window resize
  window.addEventListener("resize", function () {
    centerTimeline();
    if (activeItem) {
      centerActiveItem();
    }
  });
});
