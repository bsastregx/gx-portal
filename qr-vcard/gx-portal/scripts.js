//Forms
const formVCard = document.querySelector("form#qr-generator-vcard");
const formURL = document.querySelector("form#qr-generator-url");

//Menu
const menuVCard = document.querySelector(".menu #qr-vcard");
const menuURL = document.querySelector(".menu #qr-url");

menuVCard.addEventListener("click", function (e) {
  formVCard.classList.remove("hidden");
  formURL.classList.add("hidden");
  menuVCard.classList.add("active");
  menuURL.classList.remove("active");
});

menuURL.addEventListener("click", function (e) {
  formVCard.classList.add("hidden");
  formURL.classList.remove("hidden");
  menuVCard.classList.remove("active");
  menuURL.classList.add("active");
});

//------------------------------------------------------

const formButtonVCard = document.getElementById("generate-qr-vcard");
const formButtonURL = document.getElementById("generate-qr-url");
const clearButton = document.getElementById("clear-data");

//VCard
const lastName = document.getElementById("apellido");
const firstName = document.getElementById("nombre");
const organization = document.getElementById("empresa");
const workPhone = document.getElementById("telefono");
const title = document.getElementById("cargo");
const workEmail = document.getElementById("email");
const workUrl = document.getElementById("url-vcard");

const formInputsArray = [
  lastName,
  firstName,
  organization,
  workPhone,
  title,
  workEmail,
  workUrl,
];

//URL
const url = document.getElementById("url");

const message = document.getElementById("message");

formButtonVCard.addEventListener("click", function (e) {
  var qrCard = {
    version: "3.0",
    lastName: lastName.value,
    middleName: "",
    firstName: firstName.value,
    organization: organization.value,
    workPhone: workPhone.value,
    title: title.value,
    workEmail: workEmail.value,
    workUrl: workUrl.value,
  };

  let requiredIsNull = false;
  for (let input of formInputsArray) {
    if (input.hasAttribute("required")) {
      if (input.value == null || input.value == "") {
        requiredIsNull = true;
        break;
      }
    }
  }

  if (!requiredIsNull) {
    e.preventDefault();
    message.classList.add("hidden");
    document.getElementById("qr-image-container-vcard").innerHTML =
      qrCode.createVCardQr(qrCard, {
        typeElement: "createSvg",
        typeNumber: 15,
        cellSize: 2,
      });
    downloadSVGAsTextVCard(qrCard.firstName, qrCard.lastName);
  } else {
    message.classList.remove("hidden");
  }
});

formButtonURL.addEventListener("click", function (e) {
  let requiredIsNull = false;
  if (url.value == null || url.value == "") {
    requiredIsNull = true;
  }
  if (!requiredIsNull) {
    e.preventDefault();
    document.getElementById("qr-image-container-url").innerHTML =
      qrCode.createQr({
        typeElement: "createSvg",
        data: url.value,
        typeNumber: 10,
        cellSize: 2,
      });
    downloadSVGAsTextURL(url.value);
  }
});

clearButton.addEventListener("click", function () {
  for (let input of formInputsArray) {
    input.value = null;
  }
  message.classList.add("hidden");
  document.getElementById("qr-image-container-vcard").innerHTML = "";
});

function downloadSVGAsTextVCard(firstName, lastName) {
  const svg = document.querySelector("#qr-generator-vcard svg");
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  const a = document.createElement("a");
  const e = new MouseEvent("click");
  a.download = `${firstName}-${lastName}-QR.svg`;
  a.href = "data:image/svg+xml;base64," + base64doc;
  a.dispatchEvent(e);
}

function downloadSVGAsTextURL(url) {
  const svg = document.querySelector("#qr-generator-url svg");
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  const a = document.createElement("a");
  const e = new MouseEvent("click");
  a.download = `${url.slice(0, 30)}...-QR.svg`;
  a.href = "data:image/svg+xml;base64," + base64doc;
  a.dispatchEvent(e);
}
