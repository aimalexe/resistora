import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ResistorAnimation(props) {
    useEffect(() => {
        const container = document.getElementById("resistorDesignContainer");

        // creating a renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#resistorDesign"),
        });
        renderer.setPixelRatio = window.devicePixelRatio;
        renderer.setSize(container.clientWidth, container.clientHeight); //window.innerWidth, window.innerHeight);

        // Creating a scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf1f6f9);

        //Fitting camera to the scene
        const fov = 75;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(30, 0, 40);

        const moveWithMouse = new OrbitControls(camera, renderer.domElement);
        // For development only
            // const axesHelper = new THREE.AxesHelper(5);
            // scene.add(axesHelper);

        // Creating a resistor
        const resistor = new THREE.Mesh(
            new THREE.CapsuleGeometry(8, 19, 16, 64),
            new THREE.MeshStandardMaterial({
                color: 0x36b2b8,
                wireframe: false,
            })
        );
        resistor.position.set(0, 0, 0);
        resistor.rotateZ(Math.PI / 2);
        resistor.rotateY(45);
        scene.add(resistor);

        // Creating the terminals
        const material = new THREE.LineBasicMaterial({ color: 0xe26584 });
        const point = [];
        point.push(new THREE.Vector3(0, 30, 0));
        point.push(new THREE.Vector3(0, -30, 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(point);
        const terminals = new THREE.Line(geometry, material);
        resistor.add(terminals);

        // Creating mounds on both end of resistor
        const moundFirst = new THREE.Mesh( 
            new THREE.TorusGeometry( 7, 2.5, 7, 100 ), 
            new THREE.MeshBasicMaterial({ 
                color: 0x36b2b8,
                wireframe: false,
            })
        );
        resistor.add( moundFirst );
        moundFirst.rotateX(Math.PI / 2);
        moundFirst.position.setY(11)

        const moundLast = new THREE.Mesh( 
            new THREE.TorusGeometry( 7, 2.5, 7, 100 ), 
            new THREE.MeshBasicMaterial({ 
                color: 0x36b2b8,
                wireframe: false,
            })
        );
        resistor.add( moundLast );
        moundLast.rotateX(Math.PI / 2);
        moundLast.position.setY(-11)

        // Creating Bands of color
        function createColorBands(x, radius,color) {
            const band = new THREE.Mesh( 
                new THREE.CylinderGeometry( radius, radius, 1.5, 64, 64, true ), 
                new THREE.MeshBasicMaterial({
                    color: color
                })
            );
            scene.add( band );
            band.position.setY(x);
            resistor.add(band);
        }
        createColorBands(11, 9.55, props.firstDigitColor);
        createColorBands(7, 8.1, props.secondDigitColor);
        createColorBands(4, 8.1, props.multiplierColor);
        createColorBands(-11, 9.55, props.toleranceColor);

        //Adding Lights
        //point light (color, intensity, distance, decay)
        const pointLight = new THREE.PointLight(0x404040, 4, 50, 1.5);
        scene.add(pointLight);
        pointLight.position.set(-5, 1, 40);

            // const lightHelper = new THREE.PointLightHelper(pointLight);
            // scene.add(lightHelper);

        //AmbientLight(color, intensity)
        const ambientLight = new THREE.AmbientLight(0x404040, 3);
        scene.add(ambientLight);

        function animate() {
            resistor.rotateX(0.009);
            resistor.rotateY(-0.003);
            resistor.rotateZ(0.005);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        //For Responsiveness
        window.addEventListener("resize", function () {
            camera.aspect = aspect;
            camera.updateProjectionMatrix();

            renderer.setSize(container.clientWidth, container.clientHeight);
        });

    }, [props]);

    return (
        <div
            id="resistorDesignContainer"
            className="carousel bg-white1"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner col-md-12">
                <canvas id="resistorDesign" className="d-block w-75 mx-auto border-bottom border-primary" />
            </div>
        </div>
    );
}
