function validateSignupForm() {
  const pwd = document.getElementById("password").value;
  const confirmPwd = document.getElementById("confirmPassword").value;
  if (pwd !== confirmPwd) {
    alert("Passwords do not match!");
    return false;
  }
  return true;
}
