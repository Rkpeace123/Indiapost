// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Stronger directional light
directionalLight.position.set(5, 10, 5).normalize();
scene.add(directionalLight);

// Create a red truck framework (box)
function createTruck(truckLength, truckWidth, truckHeight) {
    const truckGeometry = new THREE.BoxGeometry(truckLength, truckHeight, truckWidth);
    const truckEdges = new THREE.EdgesGeometry(truckGeometry);
    const truckMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    const truckLine = new THREE.LineSegments(truckEdges, truckMaterial);
    scene.add(truckLine);
}

// Function to generate random color
function generateRandomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
}

// Function to create cargo items
function createCargo(boxLength, boxWidth, boxHeight, quantity, truckLength, truckWidth, truckHeight) {
    const boxGeometry = new THREE.BoxGeometry(boxLength, boxHeight, boxWidth);
    const colors = Array.from({ length: quantity }, generateRandomColor);
    let row = 0, col = 0, layer = 0;
    const cols = Math.floor(truckWidth / boxWidth);
    const rows = Math.floor(truckLength / boxLength);
    const layers = Math.floor(truckHeight / boxHeight);

    for (let i = 0; i < quantity; i++) {
        if (row >= rows) {
            row = 0;
            col++;
            if (col >= cols) {
                col = 0;
                layer++;
            }
        }
        if (layer >= layers) {
            break; // Exceeds truck height
        }

        const boxMaterial = new THREE.MeshStandardMaterial({ color: colors[i] });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.position.set(
            (row * boxLength) - (truckLength / 2) + (boxLength / 2),
            (boxHeight / 2) + (boxHeight * layer) - (truckHeight / 2),
            (col * boxWidth) - (truckWidth / 2) + (boxWidth / 2)
        );
        scene.add(boxMesh);

        row++;
    }
}

// Truck dimensions in meters
const truckLength = 6; // Example length
const truckWidth = 2.5; // Example width
const truckHeight = 2.5; // Example height

// Cargo dimensions in meters
const boxLength = 1; // Example length
const boxWidth = 1; // Example width
const boxHeight = 1; // Example height
const quantity = 10; // Example quantity

createTruck(truckLength, truckWidth, truckHeight);
createCargo(boxLength, boxWidth, boxHeight, quantity, truckLength, truckWidth, truckHeight);

// Set camera position to view the truck and cargo from a side angle
camera.position.set(10, 5, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

