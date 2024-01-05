// Get the hamburger menu and the navigation menu
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
const closeMenu = document.getElementById('close-menu');

// Add an event listener for the click event on the close menu button
closeMenu.addEventListener('click', () => {
    // Add the 'hide' class to the navigation menu to trigger the slide-up animation
    navMenu.classList.add('hide');

    // After the animation is complete, hide the navigation menu
    setTimeout(() => {
        navMenu.style.display = 'none';
        navMenu.classList.remove('hide');
    }, 300);
});

// Add an event listener for the click event on the hamburger menu
hamburgerMenu.addEventListener('click', () => {
    // Show the navigation menu
    navMenu.style.display = 'flex';
});