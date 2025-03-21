// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hero section animations
gsap.from('.hero-content', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

var tl = gsap.timeline();

tl.from('.logo', {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
    y: -30
});

tl.from('.cursor-link', {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
    y: -30,
    stagger: 0.3
});

tl.from('.title', {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
    y: -30
});

tl.from('.subtitle', {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
    y: -30
});

tl.from('.cta-button', {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5,
    y: -30
});

// Timeline ScrollTrigger Animation
gsap.registerPlugin(ScrollTrigger);

// Timeline items animation - Alternating left/right with 45% offset
//gsap.from('.timeline-item:nth-child(1)', {
//    scrollTrigger: {
//        trigger: '.timeline-item:nth-child(1)',
//        start: 'top 80%',
//        end: 'bottom 20%',
//        toggleActions: 'play none none reverse'
//    },
//    x: '-45%',
//    opacity: 0,
//    duration: 1.2,
//    ease: 'power3.out'
//});
//
//gsap.from('.timeline-item:nth-child(2)', {
//    scrollTrigger: {
//        trigger: '.timeline-item:nth-child(2)', 
//        start: 'top 80%',
//        end: 'bottom 20%',
//        toggleActions: 'play none none reverse'
//    },
//    x: '45%',
//    opacity: 0,
//    duration: 1.2,
//    ease: 'power3.out'
//});
//
//gsap.from(':nth-child(3 of .timeline-item)', {
//    scrollTrigger: {
//        trigger: ':nth-child(3 of .timeline-item)',
//        start: 'top 80%', 
//        end: 'bottom 20%',
//        toggleActions: 'play none none reverse'
//    },
//    x: '-45%',
//    opacity: 0,
//    duration: 1.2,
//    ease: 'power3.out'
//});

// Create a pseudo-element for the line
const timeline = document.querySelector('.timeline');
if (timeline) {
    gsap.from(timeline, {
        scrollTrigger: {
            trigger: '.timeline',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        "--scaleY": 0, // Using CSS custom property
        duration: 2,
        ease: "power3.inOut"
    });
}

// Timeline content animation
gsap.utils.toArray('.timeline-content').forEach((content) => {
    gsap.from(content, {
        scrollTrigger: {
            trigger: content,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out"
    });
});

// Destination card animations
const cards = document.querySelectorAll('.destination-card');
cards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            end: "bottom center",
            toggleActions: "play none none reverse",
            markers: false
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.out"
    });
});

// 3D Object setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-object').appendChild(renderer.domElement);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshPhongMaterial({
    color: 0xffd93d,
    wireframe: true
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add lights
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

// Mouse movement effect on 3D object
let mouseX = 0;
let mouseY = 0;

//document.addEventListener('mousemove', (event) => {
//    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
//});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate sphere based on mouse position
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.position.x = mouseX * 2;
    sphere.position.y = mouseY * 2;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
}); 

const lenis = new Lenis({
    duration: 2.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1.5
})

lenis.on('scroll', (e) => {
    console.log(e)
  })

  // connect lenis scroll with GSAP
  gsap.ticker.add((time) =>{
    lenis.raf(time * 1000);
  })

  // Update ScrollTrigger when lenis scrolls
  lenis.on('scroll', ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Add this after your existing Lenis scroll configuration

// Parallax effect
const parallaxLayers = document.querySelectorAll('.parallax-layer');

function updateParallax() {
    parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = (lenis.scroll * speed);
        const xPos = (lenis.scroll * speed * 0.5);
        const rotation = lenis.scroll * speed * 0.05;
        
        gsap.set(layer, {
            y: yPos,
            x: xPos,
            rotation: rotation,
            force3D: true
        });
    });
}

// Update parallax on scroll
lenis.on('scroll', () => {
    updateParallax();
});

// Initial update
updateParallax();

// Add smooth transition between sections
gsap.from('.timeline', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top bottom',
        end: 'top center',
        scrub: 1
    },
    y: 100,
    opacity: 0,
    duration: 1
});

gsap.to('.hero-content',{
    y: 100,
    opacity: 0,
    duration: 1,

})

// Add smooth scrolling for anchor links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target element's ID from href
        const targetId = this.getAttribute('href');
        
        // Use Lenis to scroll to target
        lenis.scrollTo(targetId, {
            duration: 3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            offset: 0 // Adjust if needed to account for fixed headers
        });
    });
});