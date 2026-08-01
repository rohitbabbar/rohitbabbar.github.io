document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      primaryNav.classList.toggle("open", !isOpen);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("open");
      });
    });
  }

  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const searchInput = document.querySelector("#publication-search");
  const publications = Array.from(document.querySelectorAll(".publication"));
  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const countElement = document.querySelector("#publication-count");
  const noResultsElement = document.querySelector("#no-publications");

  if (publications.length > 0) {
    let selectedYear = "all";

    const applyFilters = () => {
      const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
      let visibleCount = 0;

      publications.forEach((publication) => {
        const matchesYear =
          selectedYear === "all" ||
          publication.dataset.year === selectedYear;

        const searchableText = publication.textContent.toLowerCase();
        const matchesSearch =
          searchTerm === "" ||
          searchableText.includes(searchTerm);

        const shouldShow = matchesYear && matchesSearch;
        publication.hidden = !shouldShow;

        if (shouldShow) {
          visibleCount += 1;
        }
      });

      if (countElement) {
        countElement.textContent =
          visibleCount === 1
            ? "1 publication"
            : `${visibleCount} publications`;
      }

      if (noResultsElement) {
        noResultsElement.hidden = visibleCount !== 0;
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        selectedYear = button.dataset.year;

        filterButtons.forEach((item) => {
          item.classList.toggle("active", item === button);
        });

        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    applyFilters();
  }
});
