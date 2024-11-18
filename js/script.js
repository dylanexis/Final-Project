// For Back to Top Button

let mybutton = document.getElementById("toTop");

window.onscroll = function()
{scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}

function topFunction(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

}