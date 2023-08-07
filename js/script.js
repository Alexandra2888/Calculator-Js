
//select DOM elements
const links = document.querySelectorAll("link");
const toggleBtn = document.querySelectorAll("input");


//function to change theme
 themeChange = (i) =>{
    if(i === "0"){
        links[2].setAttribute("href", "");
    } else {
        links[2].setAttribute("href", `css/theme${i}.css`);
    }
}


toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        themeChange(btn.value);
    });
})

