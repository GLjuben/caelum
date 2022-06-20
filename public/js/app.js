const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const info_one = document.querySelector(".info-1");
const info_two = document.querySelector(".info-2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  info_one.textContent = "loading weather info...";
  info_two.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        info_one.textContent = data.error;
      } else {
        info_one.textContent = data.label;
        info_two.textContent = data.forecast.message;
      }
    });
  });
});
