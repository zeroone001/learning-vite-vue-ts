import * as THREE from 'three';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
/* 鼠标操作三维场景 */
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

export const demoFun = () => {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();

    /**
     * 1. 创建网格模型
     */
    // SphereGeometry(radius, widthSegments, heightSegments) radius 是球的大小
    // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry

    var geometry = new THREE.DodecahedronGeometry(50);

    // 几何体沿着x轴平移50
    geometry.translate(150, 0, 0);


    /* 
        对于three.js而言漫反射、镜面反射分别对应两个构造函数MeshLambertMaterial()、MeshPhongMaterial(),
    */
    // 材质对象Material
    // var material = new THREE.MeshLambertMaterial({
    //     color: 'red',
    //     opacity: 0.5,
    //     transparent: true,
    //     wireframe: false // 将几何图形渲染为线框。 默认值为false
    // }); 

    // 添加高光效果
    var sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12,
        side:THREE.DoubleSide,
        opacity: 0.5,
        transparent: true,
    }); //材质对象

    // 网格模型对象Mesh
    var mesh = new THREE.Mesh(geometry, sphereMaterial);

    scene.add(mesh);


    /**
     * 2. 光源设置
     */
    // 点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); // 点光源位置
    scene.add(point); // 点光源添加到场景中


    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)


    /**
     * 创建渲染器对象
     */
    const canvas = document.querySelector('#three');
    var renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);

    // 引入轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 给它加点阻尼感，更真实点
    controls.enableDamping = true;

    let T0 = new Date(); //上次时间


    function animate() {
        controls.update();

        let T1 = new Date(); // 本次时间
        let t = T1 - T0; // 时间差
        T0 = T1; //把本次时间赋值给上次时间
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        // 每次绕y轴旋转0.01弧度
        mesh.rotateY(0.001 * t);

        // 添加下面代码
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
};