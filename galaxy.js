let scene, camera, renderer, starGeo, starMaterial, stars;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();
  for (const _ in Array(6000).fill(0)) {
    const star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }

  const map = new THREE.TextureLoader().load("star.png");
  const starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
  animate();
};

const animate = () => {
  starGeo.vertices.forEach((v) => {
    v.velocity += v.acceleration;
    v.y -= v.velocity;

    if (v.y < -200) {
      v.y = 200;
      v.velocity = 0;
    }
  });

  starGeo.verticesNeedUpdate = true;
  stars.rotation.y += 0.002;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init();
