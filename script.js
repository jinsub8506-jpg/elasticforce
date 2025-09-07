document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const kSlider = document.getElementById("k-slider");
  const spring = document.getElementById("spring");
  const scale = document.getElementById("scale");
  const kSliderValue = document.getElementById("k-value");
  const sliderValue = document.getElementById("slider-value");
  const sensor = document.getElementById("sensor");

  let k = parseFloat(kSlider.value);
  let isDragging = false;
  let startX = 0;

  function updateForce() {
    const x = parseInt(slider.value);
    const force = (k * x).toFixed(2);
    spring.style.width = `${200 + x}px`;
    spring.style.height = `${50 + k * 500}px`;
    scale.textContent = `저울 눈금: ${force} N`;
    sliderValue.textContent = `늘어난 길이: ${x} cm`;
    kSliderValue.textContent = `${k.toFixed(2)} N/cm (${(k * 100).toFixed(1)} N/m)`;
  }

  slider.addEventListener("input", updateForce);
  kSlider.addEventListener("input", () => {
    k = parseFloat(kSlider.value);
    updateForce();
  });

  sensor.addEventListener("dragstart", (e) => e.preventDefault());

  sensor.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    sensor.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    let newLength = Math.min(Math.max(parseInt(slider.value) + dx, 0), 100);
    slider.value = newLength;
    updateForce();
    startX = e.clientX;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      slider.value = 0;
      updateForce();
      sensor.style.cursor = "grab";
    }
  });

  sensor.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      slider.value = 0;
      updateForce();
      sensor.style.cursor = "grab";
    }
  });

  sensor.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  sensor.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    let newLength = Math.min(Math.max(parseInt(slider.value) + dx, 0), 100);
    slider.value = newLength;
    updateForce();
    startX = e.touches[0].clientX;
    e.preventDefault();
  });

  sensor.addEventListener("touchend", () => {
    isDragging = false;
    slider.value = 0;
    updateForce();
  });

  updateForce();
});