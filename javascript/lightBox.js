"use strict";

//Event listener to create the lightbox when the page loads

window.addEventListener('load', createLightBox);

//createLightBox fuction
function createLightBox(){
    //reference the lightbox from html 
    let lightbox = document.getElementById("lightbox");

    //light box components 
    // let lbTitle = document.createElement('h2');
    let lbCounter = document.createElement("div");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");

    //Design the lightbox counter 
    lightbox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
    let currentProd = 1;
    lbCounter.textContent = currentProd + "/" + prodCount;

    //Design lightbox previous slide button
    lightbox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664;";
    lbPrev.onclick = showPrev;

    //Design lightbox next slide button
    lightbox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654;";
    lbNext.onclick = showNext;

    //Design lightbox play button
    lightbox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199;";
    let timeId;
    //event handler when the play button is pressed
    lbPlay.onclick = function() {
        if(timeId) {
            //stop slideshow
            window.clearInterval(timeId);
            timeId = undefined;
        }else {
            showNext();
            timeId = window.setInterval(showNext, 1500);
        }
    }

    //Desgin the lightbox images holder 
    lightbox.appendChild(lbImages);
    lbImages.id = "lbImages";

    //add images from the images products array 
    for(let i = 0; i < prodCount; i++) {
        //create an image element to store images
        let image = document.createElement("img");
        image.src = product[i];
        image.alt = productDsc[i];
        image.onclick = createOverlay;
        //append the image element to lbImages
        lbImages.appendChild(image);  
    }

    //Function to move foward through the products
    function showNext(){
        lbImages.appendChild(lbImages.firstElementChild);
        (currentProd < prodCount) ? currentProd++ : currentProd = 1;
        lbCounter.textContent = currentProd + "/" + prodCount;
    }
    //Function to move back through the products 
    function showPrev() {
        lbImages.appendChild(lbImages.lastElementChild, lbImages.firstElementChild);
        (currentProd > 1) ? currentProd-- : currentProd = prodCount;
        lbCounter.textContent = currentProd + "/" + prodCount;
    }

    //createOverlay function
    function createOverlay() {
        let overlay = document.createElement("div");
        overlay.id = "lbOverlay";
        //Create a figurebox element
        let figureBox = document.createElement("figure");
        overlay.appendChild(figureBox);
        //reference the product that called the function
        let overlayImage = this.cloneNode("true");
        figureBox.appendChild(overlayImage);

        //add the product description to the figurebox
        let overlayDsc = document.createElement("figcaption");
        overlayDsc.textContent = this.alt;
        figureBox.appendChild(overlayDsc);
        //add code for the close button
        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        //button to remove overlay 
        closeBox.onclick = function() {
            document.body.removeChild(overlay);
        }
        overlay.appendChild(closeBox);
        //append overlay to page body;
        document.body.appendChild(overlay);
    }


}