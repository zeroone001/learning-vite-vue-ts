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


    var geometry = new THREE.BufferGeometry(); //声明一个缓冲几何体对象

    //类型数组创建顶点位置position数据
    var vertices = new Float32Array([
        0, 0, 0, //顶点1坐标
        50, 0, 0, //顶点2坐标
        0, 100, 0, //顶点3坐标

        0, 0, 10, //顶点4坐标
        0, 0, 100, //顶点5坐标
        50, 0, 10, //顶点6坐标
    ]);
    // 创建属性缓冲区对象
    var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，作为一个顶点的xyz坐标
    // 设置几何体attributes属性的位置position属性
    geometry.attributes.position = attribue;
    //类型数组创建顶点颜色color数据
    var colors = new Float32Array([
        1, 0, 0, //顶点1颜色
        0, 1, 0, //顶点2颜色
        0, 0, 1, //顶点3颜色

        1, 1, 0, //顶点4颜色
        0, 1, 1, //顶点5颜色
        1, 0, 1, //顶点6颜色
    ]);
    // 设置几何体attributes属性的颜色color属性
    geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB

    var normals = new Float32Array([
        0, 0, 1, //顶点1法向量
        0, 0, 1, //顶点2法向量
        0, 0, 1, //顶点3法向量

        0, 1, 0, //顶点4法向量
        0, 1, 0, //顶点5法向量
        0, 1, 0, //顶点6法向量
    ]);
    // 设置几何体attributes属性的位置normal属性
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据

    // Uint16Array类型数组创建顶点索引数据
    // var indexes = new Uint16Array([
    //     // 0对应第1个顶点位置数据、第1个顶点法向量数据
    //     // 1对应第2个顶点位置数据、第2个顶点法向量数据
    //     // 索引值3个为一组，表示一个三角形的3个顶点
    //     0, 1, 2,
    //     0, 2, 3,
    // ])
    // // 索引数据赋值给几何体的index属性
    // geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

    //材质对象
    var material = new THREE.PointsMaterial({
        // 使用顶点颜色数据渲染模型，不需要再定义color属性
        // color: 0xff0000,
        vertexColors: THREE.VertexColors, //以顶点颜色为准
        size: 10.0 //点对象像素尺寸
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