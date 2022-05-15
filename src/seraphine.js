import * as THREE from 'three';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

export const demoFun = () => {

    const canvas = document.querySelector('#three')

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 想要产生影子
    renderer.shadowMap.enabled = true;

    // document.body.appendChild(renderer.domElement);


    // camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10);
    // camera.lookAt(10, 100, 100);
    // camera.position.z = 10;

    // scene
    const scene = new THREE.Scene();

    scene.background = new THREE.Color('#eee');
    // 给场景加个雾
    scene.fog = new THREE.Fog('#eee', 20, 100);


    /* 平面几何体 */
    let floorGeometry = new THREE.PlaneGeometry(8000, 8000);
    /* 材质 */
    let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0x857ebb,
        shininess: 0,
    });

    /* mesh */
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -0.001;
    scene.add(floor);

    /* 还可以添加多个光源 */
    const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
    hemLight.position.set(0, 48, 0)
    scene.add(hemLight)

    /* 平行光 */
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    //光源等位置
    dirLight.position.set(-10, 8, -5)
    //可以产生阴影
    dirLight.castShadow = true
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    scene.add(dirLight);

    

    //create a blue LineBasicMaterial 材质
    // const material = new THREE.LineBasicMaterial({
    //     color: '#fff'
    // });

    /* geometry（几何体） */
    // const points = [];
    // points.push(new THREE.Vector3(0, 0, 0));
    // points.push(new THREE.Vector3(0, 10, 0));
    // points.push(new THREE.Vector3(10, 0, 0));

    // const geometry = new THREE.BufferGeometry().setFromPoints(points);

    /* 画线 */
    // const line = new THREE.Line(geometry, material);
    /* loader */
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/seraphine/scene.gltf', (gltf) => {
        var model = gltf.scene;

        //添加这段代码
        //遍历模型每部分
        model.traverse((o) => {
            // 将图片作为纹理加载
            let explosionTexture = new THREE.TextureLoader().load(
                '/seraphine/textures/Mat_cwfyfr1_userboy17.bmp_diffuse.png'
            )
            //调整纹理图的方向
            explosionTexture.flipY = false
            //将纹理图生成基础网格材质(MeshBasicMaterial)
            const material = new THREE.MeshBasicMaterial({
                map: explosionTexture,
            })
            //给模型每部分上材质
            o.material = material;

            //加这句，让模型等每个部分都能产生阴影
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        })

        /* 添加到场景中 */
        scene.add(model);
    })
    /* 把线添加到场景中 */
    // scene.add(line);

    /* 调用渲染函数 */
    // renderer.render(scene, camera);

    // 引入轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 给它加点阻尼感，更真实点
    controls.enableDamping = true;


    function animate() {
        controls.update();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);


        //添加下面代码
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix();
        }
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        var width = window.innerWidth
        var height = window.innerHeight
        var canvasPixelWidth = canvas.width / window.devicePixelRatio
        var canvasPixelHeight = canvas.height / window.devicePixelRatio

        const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
        if (needResize) {
            renderer.setSize(width, height, false)
        }
        return needResize
    }

    animate();
}