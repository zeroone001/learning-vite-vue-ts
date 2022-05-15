import * as THREE from 'three';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';

export const demoFun = () => {
    /**
     * 创建场景对象Scene
     */
     var scene = new THREE.Scene();

     /**
     * 创建网格模型
     */
    // var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(50, 100, 100); //创建一个立方体几何对象Geometry

    // 材质对象Material
    var material = new THREE.MeshLambertMaterial({
      color: 'red'
    }); 

    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

    scene.add(mesh);

    /**
     * 光源设置
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
    const canvas = document.querySelector('#three')
    var renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);

    // 引入轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 给它加点阻尼感，更真实点
    controls.enableDamping = true;

    function animate() {
        controls.update();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);


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
