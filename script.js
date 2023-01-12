import './style.css'


import * as THREE from "three";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x191970);
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 80;
// camera.rotation.x = 1.19;
// camera.rotation.y = -0.17;
// camera.rotation.z = 0.90;
// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()


scene.add( new THREE.AmbientLight( 0x444444 ) );

				const light1 = new THREE.DirectionalLight( 0x0096FF, 0.5 );
				light1.position.set( 1, 1, 1 );
				scene.add( light1 );

				const light2 = new THREE.DirectionalLight( 0x0096FF, 1.5 );
				light2.position.set( 0, - 1, 0 );
				scene.add( light2 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.SphereGeometry( 5, 50, 50 );
const material = new THREE.MeshBasicMaterial( { color: 0x6ef8e6 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const starGeometry = new THREE.BufferGeometry(80, 50, 50)
// 0.5, 32, 32
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVerticies = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVerticies.push(x,y,z)

}

// const light = new THREE.PointLight( 0xffffff, 30, 350, 1.7 );
// light.position.set(0, 0, 250);
// scene.add(light);

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(
    starVerticies, 3)
  )

  const stars = new THREE.Points(
    starGeometry, starMaterial)
    scene.add(stars)
// stars run out after 5mins

// camera.position.z = 80;
//
const loader = new THREE.TextureLoader();
loader.load("./smoke.png", function(texture) {
    const cloudGeo = new THREE.PlaneGeometry(700,700);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
  });
  for(let p=0; p<50; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random()*500 -10,
      //center below
      100,
      Math.random() *50-20
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random()*2*Math.PI;
    cloud.material.opacity = 0.55;
    // texture.offset.x = 0; 
// texture.offset.y = 0;
    // cloudParticles.push(cloud);
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
});

let cloudParticles = [];

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) {

    event.preventDefault(event);

    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5
    );
    vector.unproject( camera );

    var ray = new THREE.Ray( camera.position, 
                             vector.sub( camera.position ).normalize() );

    var intersects = ray.intersectObjects( objects );

    if ( intersects.length > 0 ) {

        intersects[ 0 ].object.materials[ 0 ].color.setHex( Math.random() * 0xffffff );

        var particle = new THREE.Particle( particleMaterial );
        particle.position = intersects[ 0 ].point;
        particle.scale.x = particle.scale.y = 8;
        scene.add( particle );

    }
  }




const animate = function () {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    // stars.position.x += 0.06
    stars.position.x += 0.06
    // stars.rotation.z +=0.01

    cloudParticles.forEach(p =>{
      p.rotation.z -=0.001;
    });
    renderer.render( scene, camera );
};

animate();
