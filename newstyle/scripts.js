function locate_assign() {
document.location.assign("https://superplaycounts.github.io/");
}
let header__burger = document.querySelector('.header__burger');
let menu = document.querySelector('.menu');

header__burger.addEventListener('click', function(){
	header__burger.classList.toggle('active');
	menu.classList.toggle('active');
})
