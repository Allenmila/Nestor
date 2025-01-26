const headerBtn = document.querySelector(".input__container");
const signBtn = document.querySelector(".nav__btns");
const serviceItems = document.querySelector(".swiper-wrapper");
const popup = document.querySelector(".popup-box")
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");

serviceItems.addEventListener("click",function(event){
  if(event.target.tagName.toLowerCase() == "button"){
     const item =event.target.parentElement;
     const h3 = item.querySelector("h3").innerHTML;
     const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
     popup.querySelector("h3").innerHTML = h3;
     popup.querySelector(".popup-body").innerHTML = readMoreCont;
     popupBox();
  }

})

headerBtn.addEventListener("click", function(event) {
    if (event.target.tagName.toLowerCase() === "button") {
        const item = event.target.parentElement;
        const h2Content = item.querySelector("h3").innerHTML;
        const loginCardContent = item.querySelector(".login-card-content").innerHTML;
        popup.querySelector("h3").innerHTML = h2Content;
        popup.querySelector(".popup-body").innerHTML = loginCardContent;

        popupBox();
    }
});

signBtn.addEventListener("click", function(event) {
    if (event.target.tagName.toLowerCase() === "button") {
        const item = event.target.parentElement;
        const h2Content = item.querySelector("h3").innerHTML;
        const loginCardContent = item.querySelector(".login-card-content").innerHTML;
        popup.querySelector("h3").innerHTML = h2Content;
        popup.querySelector(".popup-body").innerHTML = loginCardContent;

        popupBox();
    }
});

popupCloseBtn.addEventListener("click", popupBox);
popupCloseIcon.addEventListener("click", popupBox);

popup.addEventListener("click", function(event){
   if(event.target == popup){
      popupBox();
   }
})

function popupBox(){
  popup.classList.toggle("open");
}

