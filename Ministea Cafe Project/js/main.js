// AJAX Load Page Function
function loadPage(pageUrl) {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    // Loading State
    mainContent.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-success"></div>
            <p class="mt-2">Brewing your page...</p>
        </div>`;

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) throw new Error("Could not load " + pageUrl);
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;

            // Re-run scripts based on page
            if (pageUrl === "pages/home.html") {
                if (typeof window.initHome === 'function') {
                    window.initHome();
                } else {
                    loadScript("js/home.js", () => {
                        if (typeof window.initHome === 'function') window.initHome();
                    });
                }
            }
            else if (pageUrl === "pages/signup.html") {
                if (typeof window.initSignup === 'function') {
                    window.initSignup();
                } else {
                    loadScript("js/signup.js", () => {
                        if (typeof window.initSignup === 'function') window.initSignup();
                    });
                }
            }
            else if (pageUrl === "pages/signin.html") {
                if (typeof window.initSignin === 'function') {
                    window.initSignin();
                } else {
                    loadScript("js/signin.js", () => {
                        if (typeof window.initSignin === 'function') window.initSignin();
                    });
                }
            }   
            else if (pageUrl === "pages/menu.html") {
                if (typeof window.initMenu === 'function') {
                    window.initMenu();
                } else {
                    loadScript("js/menu.js", () => {
                        if (typeof window.initMenu === 'function') window.initMenu();
                    });
                }
            }                    
            // Laging bumalik sa taas ng page pagkatapos mag-load
            window.scrollTo(0, 0);
        })
        .catch(err => {
            mainContent.innerHTML = `
                <div class="text-center py-5 text-danger">
                    <h3>Oops! Something went wrong.</h3>
                    <p>${err.message}</p>
                </div>`;
        });
}

// Load the Scripts
function loadScript(src, callback) {
    if (document.querySelector(`script[src="${src}"]`)) {
        if (callback) callback();
        return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// 4. Initialize Load
document.addEventListener("DOMContentLoaded", () => {
    loadPage("pages/home.html");
    document.addEventListener("click", (e) => {
        const link = e.target.closest(".ajax-link");
        if (link) {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            loadPage(target);
        }
    });
});