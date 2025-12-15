   const TO_EMAIL = "yourmail@domain.com"; // <-- receiver email

  const form = document.getElementById("cform");
  const alertBox = document.getElementById("cformAlert");

  function showAlert(kind, msg){
    alertBox.className = "cform-alert " + kind;
    alertBox.textContent = msg;
    alertBox.style.display = "block";
  }

  function clearAlert(){
    alertBox.style.display = "none";
    alertBox.textContent = "";
    alertBox.className = "cform-alert";
  }

  function setHint(id, msg){
    const el = document.querySelector(`.cform-hint[data-hint="${id}"]`);
    if (el) el.textContent = msg || "";
  }

  function validate(){
    let ok = true;
    clearAlert();

    const name = document.getElementById("cname").value.trim();
    const email = document.getElementById("cemail").value.trim();
    const subject = document.getElementById("csubject").value.trim();
    const message = document.getElementById("cmessage").value.trim();

    setHint("cname", "");
    setHint("cemail", "");
    setHint("csubject", "");
    setHint("cmessage", "");

    if (!name){ setHint("cname", "Name is required."); ok = false; }
    if (!email){ setHint("cemail", "Email is required."); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setHint("cemail", "Enter a valid email."); ok = false; }
    if (!subject){ setHint("csubject", "Subject is required."); ok = false; }
    if (!message){ setHint("cmessage", "Message is required."); ok = false; }

    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

     
    const name = document.getElementById("cname").value.trim();
    const email = document.getElementById("cemail").value.trim();
    const subject = document.getElementById("csubject").value.trim();
    const message = document.getElementById("cmessage").value.trim();

    const body =
`Name: ${name}
Email: ${email}

${message}`;

    const mailto =
      `mailto:${encodeURIComponent(TO_EMAIL)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // showAlert("is-info", "Opening your email app… click Send to deliver the message.");
    window.location.href = mailto;
  });
 