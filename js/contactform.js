   // 🔴 Put your EmailJS values here
  const EMAILJS_PUBLIC_KEY = "zRYLy3LfkMlWCmq8H";
  const EMAILJS_SERVICE_ID = "service_skekz8r";
  const EMAILJS_TEMPLATE_ID = "template_1m870mh";

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("cform");
  const alertBox = document.getElementById("cformAlert");
  const btn = form.querySelector(".cform-btn");

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

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()){
       return;
    }

    btn.disabled = true;

    try{
      const params = {
        from_name: document.getElementById("cname").value.trim(),
        from_email: document.getElementById("cemail").value.trim(),
        subject: document.getElementById("csubject").value.trim(),
        message: document.getElementById("cmessage").value.trim(),
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

      form.reset();
     } catch (err) {
     } finally {
      btn.disabled = false;
    }
  });
 