document.querySelector('.header__responsive').addEventListener('click', () => {
    const menuRight = document.querySelector('.header__right-menu');
    menuRight.classList.toggle('toggleMenu');
})

// function printNumber(start,end){
//     let numberAr = [];
//     for(i=start; i<=end; i+=2){
//         numberAr.push(i);
//     }
//     console.log(numberAr.join(','));
// }

// printNumber(89,105);
// printNumber(90,104);