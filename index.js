// Main container and image selectors
const container = document.querySelector('.container');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const container3 = document.querySelector('.container3');
const image = document.querySelector('#movableImage');
const image1 = document.querySelector('#movableImage1');
const image2 = document.querySelector('#movableImage2');
const image3 = document.querySelector('#movableImage3');
const maxRadius = 200;

// Function to calculate center position
function getCenter(container) {
    return {
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2
    };
}

function handleMouseMove(event, activeContainer, activeImage) {
    // Handle containers and images
    const containers = [container, container1, container2, container3];
    const images = [image, image1, image2, image3];
   
    containers.forEach((cont, index) => {
        if (cont !== activeContainer) {
            // Style for inactive containers
            cont.style.border = "2px solid rgba(255, 255, 255, 0.3)";
            cont.style.backgroundColor = "transparent";
            cont.style.zIndex = "1";
           
            // Style for inactive images
            images[index].style.opacity = "0";
            images[index].classList.remove('active');
            images[index].style.zIndex = "2";
        } else {
            // Style for active container
            cont.style.border = "none";
            cont.style.backgroundColor = "transparent";
            cont.style.zIndex = "15";
           
            // Style for active image
            images[index].style.opacity = "1";
            images[index].classList.add('active');
            images[index].style.zIndex = "20";
        }
       
        // Ensure containers are visible
        cont.style.opacity = "1";
    });

    // Update text style for vector effect
    const bigTexts = document.getElementsByClassName('big-text');
    for (let i = 0; i < bigTexts.length; i++) {
        let bigText = bigTexts[i];
        bigText.style.fill = "transparent";
        bigText.style.stroke = "#2a2a2a";
        bigText.style.strokeWidth = "1px";
        bigText.style.zIndex = "1";
    }

    // Calculate mouse position
    const rect = activeContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const center = getCenter(activeContainer);
    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Apply movement within radius
    if (distance <= maxRadius) {
        activeImage.style.transition = 'none';
        activeImage.style.transform = `translate(${dx}px, ${dy}px)`;
    } else {
        resetImages();
    }
}

function resetImages() {
    const containers = [container, container1, container2, container3];
    const images = [image, image1, image2, image3];
   
    containers.forEach((cont, index) => {
        cont.style.transition = 'all 0.5s ease';
        cont.style.border = "none";
        cont.style.backgroundColor = "transparent";
        cont.style.zIndex = "1";
       
        images[index].style.transition = 'all 0.5s ease';
        images[index].style.transform = 'translate(0, 0)';
        images[index].style.opacity = "1";
        images[index].classList.remove('active');
        images[index].style.zIndex = "2";
    });

    // Reset text style
    const bigTexts = document.getElementsByClassName('big-text');
    for (let i = 0; i < bigTexts.length; i++) {
        let bigText = bigTexts[i];
        bigText.style.fill = "white";
        bigText.style.stroke = "transparent";
        bigText.style.strokeWidth = "1px";
        bigText.style.zIndex = "1";
    }
}

// Event listeners for mouse movement
container.addEventListener('mousemove', (e) => handleMouseMove(e, container, image));
container1.addEventListener('mousemove', (e) => handleMouseMove(e, container1, image1));
container2.addEventListener('mousemove', (e) => handleMouseMove(e, container2, image2));
container3.addEventListener('mousemove', (e) => handleMouseMove(e, container3, image3));

// Event listeners for mouse leave
container.addEventListener('mouseleave', resetImages);
container1.addEventListener('mouseleave', resetImages);
container2.addEventListener('mouseleave', resetImages);
container3.addEventListener('mouseleave', resetImages);