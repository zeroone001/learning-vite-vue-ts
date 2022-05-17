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


    var geometry = new THREE.BoxGeometry(); //声明一个几何体对象Geometry
    console.log(geometry);
    console.log('几何体顶点位置数据',geometry.vertices);
    console.log('三角行面数据',geometry.faces);

    //材质对象
    var material = new THREE.MeshLambertMaterial({
        // color: 0xffff00,
        vertexColors: THREE.VertexColors, //以顶点颜色为准
        side: THREE.DoubleSide, //两面可见
    });


    // 点渲染模式  点模型对象Points
    var points = new THREE.Mesh(geometry, material); //点模型对象
    scene.add(points); //点对象添加到场景

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

    renderer.render(scene, camera);
};