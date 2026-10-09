document.addEventListener("DOMContentLoaded", () => {
  const envelopeOverlay = document.getElementById("envelopeOverlay");
  const envelopeCard = document.getElementById("envelopeCard");
  const musicBtn = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  let isPlaying = false;

  // 1. Відкриття конверта + АВТОМАТИЧНИЙ запуск музики при кліку на нього
  if (envelopeCard && envelopeOverlay) {
    envelopeCard.addEventListener("click", () => {
      // Ховаємо конверт
      envelopeOverlay.classList.add("fade-out");
      setTimeout(() => {
        envelopeOverlay.style.display = "none";
      }, 700);

      // Автоматично запускаємо музику (браузер дозволить, бо гість щойно клікнув на конверт)
      if (bgMusic && !isPlaying) {
        bgMusic
          .play()
          .then(() => {
            if (musicBtn) musicBtn.classList.add("playing");
            isPlaying = true;
          })
          .catch((err) => {
            console.log("Відтворення заблоковано браузером:", err);
          });
      }
    });
  }

  // 2. Кнопка перемикання музики (щоб гість міг вимкнути її за бажанням)
  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove("playing");
      } else {
        bgMusic
          .play()
          .then(() => {
            musicBtn.classList.add("playing");
          })
          .catch((err) => console.log(err));
      }
      isPlaying = !isPlaying;
    });
  }

  // 3. Інтерактивний вибір кнопок у формі (Один варіант у групі)
  document.querySelectorAll(".option-buttons").forEach((group) => {
    const buttons = group.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });

  // 4. Зворотний відлік до дати весілля (11 вересня 2027 року)
  const targetDate = new Date("September 11, 2027 12:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysElem = document.getElementById("days");
      const hoursElem = document.getElementById("hours");
      const minutesElem = document.getElementById("minutes");
      const secondsElem = document.getElementById("seconds");

      if (daysElem) daysElem.innerText = days;
      if (hoursElem) hoursElem.innerText = hours;
      if (minutesElem) minutesElem.innerText = minutes;
      if (secondsElem) secondsElem.innerText = seconds;
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
