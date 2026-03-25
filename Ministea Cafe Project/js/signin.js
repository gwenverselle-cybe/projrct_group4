window.initSignin = function() {
    console.log(" Signin page initialized!");
    
    // Sign in button logic
    const signinBtn = document.querySelector('.btn-signin');
    if (signinBtn) {
        signinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Your signin AJAX logic here
            console.log("Sign in clicked!");
            // Example: validate form, send to server, etc.
        });
    }
    
    // Password toggle (consistent with signup)
    document.querySelectorAll('.toggle-pw').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target') || 'pw1';
            const input = document.getElementById(targetId);
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                const text = type === 'password' ? 'Hide' : 'Show';
                this.lastChild.textContent = text;
            }
        });
    });
};