let speakers = undefined;
document.addEventListener("DOMContentLoaded", () => {
  const speakersList = document.querySelector(".speakers");
  speakers = speakersList.querySelectorAll(".speaker");
  swapSpeaker(0);
});

function swapSpeaker(currentSpeakerIndex) {
  setTimeout(() => {
    speakers[currentSpeakerIndex].classList.add("speaker--opacity-0");
    setTimeout(() => {
      speakers[currentSpeakerIndex].classList.add("speaker--hidden");
      if (currentSpeakerIndex === speakers.length - 1) {
        /*This is the last speaker - rewind*/
        speakers[0].classList.remove("speaker--hidden");
        speakers[0].classList.remove("speaker--opacity-0");
        swapSpeaker(0);
      } else {
        speakers[currentSpeakerIndex + 1].classList.remove("speaker--hidden");
        speakers[currentSpeakerIndex + 1].classList.remove(
          "speaker--opacity-0"
        );
        swapSpeaker(currentSpeakerIndex + 1);
      }
    }, 250);
  }, 4000);
}
