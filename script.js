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
    const scaledLength = Math.round((x / 100) * 30); // 0~100 → 0~30cm로 변환
    const force = (k * scaledLength).toFixed(2);
    spring.style.width = `${300 + x}px`;
    spring.style.height = `${100 + k * 500}px`;
    scale.textContent = `저울 눈금: ${force} N`;
    sliderValue.textContent = `늘어난 길이: ${scaledLength} cm`;
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
    let newLength = parseInt(slider.value) + dx;
    newLength = Math.min(Math.max(newLength, 0), 100); // 슬라이더 범위 제한
    slider.value = newLength;
    updateForce();
    startX = e.clientX;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      slider.value = 0; // 마우스를 놓으면 초기화
      updateForce();
      sensor.style.cursor = "grab";
    }
  });

  sensor.addEventListener("mouseleave", (e) => {
    // 마우스가 눌려 있는 상태에서는 초기화하지 않음
    if (!isDragging) {
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
    let newLength = parseInt(slider.value) + dx;
    newLength = Math.min(Math.max(newLength, 0), 100);
    slider.value = newLength;
    updateForce();
    startX = e.touches[0].clientX;
    e.preventDefault();
  });

  sensor.addEventListener("touchend", () => {
    isDragging = false;
    slider.value = 0; // 터치 끝나면 초기화
    updateForce();
  });

  updateForce();
});