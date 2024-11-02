
// Iterate through quote containers and mycard elements
document.querySelectorAll(".quote-container-pk, .mycard, blockquote").forEach((blockquote) => {
  // Modify the text within the blockquote elements
  

  // Create and append action container for each blockquote
  let actionContainer = document.createElement("div");
  actionContainer.classList.add("quote-actions-pk");
  actionContainer.innerHTML = `
    <span class="copy-action-pk" onclick="copyText(this)"><i class="fa-regular fa-copy"></i></span>
    <span class="facebook-action-pk" onclick="share('facebook', this)"><i class="fa-brands fa-facebook"></i></span>
    <span class="whatsapp-action-pk" onclick="share('whatsapp', this)"><i class="fa-brands fa-whatsapp"></i></span>
    <span class="telegram-action-pk" onclick="share('telegram', this)"><i class="fa-brands fa-telegram"></i></span>`;

  blockquote.append(actionContainer);
});

// Function to copy text to clipboard and highlight the action
function copyText(element) {
  let text = element.parentElement.parentElement.innerText;
  navigator.clipboard.writeText(text + "\n\n" + location.href);
  highlightElement(element);
}

// Function to share text on social media and open a new window
function share(platform, element) {
  let text = element.parentElement.parentElement.innerText;
  let url = location.href;
  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote= encodeURIComponent(${text})`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + "\n\n" + url)}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?text=${encodeURIComponent(text + "\n")}&url=${encodeURIComponent(url+"\n")}`;
      break;
  }

  window.open(shareUrl);
}

// Function to highlight an element temporarily
function highlightElement(element) {
  // Apply the gradient background
  element.style.background = "linear-gradient(135deg, #ff00cc, #3333ff)";

  // Revert to the original background after 3 second
  setTimeout(() => {
    element.style.background = "linear-gradient(135deg, #000, #B7AE7A)";
  }, 1000);
}


// Add click event listeners to action elements for copying and sharing
document.querySelectorAll(".copy-action-pk, .facebook-action-pk, .whatsapp-action-pk, .telegram-action-pk").forEach((el) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("copy-action-pk")) {
      copyText(el);
    } else {
      share(el.classList[0].replace("-action-pk", ""), el);
    }
  });
});
  
  