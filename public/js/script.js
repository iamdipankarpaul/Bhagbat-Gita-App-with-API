const headerMenuIcon = document.querySelector('.header-menu-icon');
const headerNav = document.querySelector('.header-nav');

function activeMenu(){
    headerNav.classList.toggle('active');

    (headerNav.classList.contains('active')) 
    ? headerMenuIcon.innerHTML = '<i class="bi bi-x"></i>' 
    : headerMenuIcon.innerHTML = '<i class="bi bi-list"></i>'
}

headerMenuIcon.addEventListener('click', activeMenu);