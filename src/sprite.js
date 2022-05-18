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

    // 创建一个组表示所有的雨滴
    var group = new THREE.Group();
    /**
     * 精灵创建下雨效果
     */
    // 加载雨滴理贴图
    var textureTree = new THREE.TextureLoader().load("/threejs66rain.png");
    console.log('textureTree', textureTree);
    // 批量创建表示雨滴的精灵模型
    for (let i = 0; i < 400; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
            map: textureTree, //设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        
        // 控制精灵大小,
        sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在空间中随机分布
        sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2)
        group.add(sprite);
    }

    scene.add(group);

    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    /**透视投影相机对象*/
    var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(292, 109, 268); //设置相机位置

    /**
     * 创建渲染器对象
     */
    const canvas = document.querySelector('#three');
    var renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    // 渲染函数
    function render() {
        // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
        // 每次渲染都会更新雨滴的位置，进而产生动画效果
        group.children.forEach(sprite => {
            // 雨滴的y坐标每次减1
            sprite.position.y -= 1;
            if (sprite.position.y < 0) {
                // 如果雨滴落到地面，重置y，从新下落
                sprite.position.y = 200;
            }
        });
        renderer.render(scene, camera); //执行渲染操作
        requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }

    render();
};