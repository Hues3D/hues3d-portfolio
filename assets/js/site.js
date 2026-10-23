// Shared behaviour: image lightbox and devlog tag filters.
(function () {
  // Lightbox: any image with [data-zoom] opens full size.
  const zoomable = document.querySelectorAll("img[data-zoom]");
  if (zoomable.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image preview");
    box.innerHTML =
      '<button class="lightbox-close" type="button">Close</button>' +
      "<figure><img alt=\"\" /><figcaption></figcaption></figure>";
    document.body.appendChild(box);

    const boxImg = box.querySelector("img");
    const boxCaption = box.querySelector("figcaption");
    let lastFocus = null;

    const close = () => {
      box.classList.remove("is-open");
      boxImg.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    };

    zoomable.forEach((img) => {
      img.tabIndex = 0;
      const open = () => {
        lastFocus = img;
        boxImg.src = img.dataset.zoom || img.currentSrc || img.src;
        boxImg.alt = img.alt;
        const caption = img.closest("figure")?.querySelector("figcaption");
        boxCaption.textContent = caption ? caption.textContent : img.alt;
        box.classList.add("is-open");
        box.querySelector(".lightbox-close").focus();
      };
      img.addEventListener("click", open);
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    box.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  // Devlog filters: buttons with [data-filter] show rows whose data-tags include it.
  const filters = document.querySelectorAll(".filters button");
  const rows = document.querySelectorAll(".post-row");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.filter;
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      rows.forEach((row) => {
        row.hidden = tag !== "all" && !row.dataset.tags.split(" ").includes(tag);
      });
    });
  });
})();
