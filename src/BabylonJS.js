import * as BABYLON from 'babylonjs';


export const demoFun = () => {
    var canvas = document.getElementById("renderCanvas");
    var sceneChecked;
    var sceneLocation = "../../Scenes/";
    var engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
    });
    engine.enableOfflineSupport = false;
    var scene;
    var loadCustomScene = function (demoConstructor, then) {
        BABYLON.SceneLoader.ShowLoadingScreen = false;
        engine.displayLoadingUI();
        setTimeout(function () {
            scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(canvas, false)
            }
            scene.executeWhenReady(function () {
                canvas.style.opacity = 1;
                engine.hideLoadingUI();
                BABYLON.SceneLoader.ShowLoadingScreen = true;
                if (then) {
                    then(scene)
                }
            })
        }, 15);
        return
    };
    var renderFunction = function () {
        if (scene) {
            if (!sceneChecked) {
                var remaining = scene.getWaitingItemsCount();
                engine.loadingUIText = "Streaming items..." + (remaining ? remaining + " remaining" : "");
                if (remaining === 0) {
                    sceneChecked = true
                }
            }
            if (scene.activeCamera) {
                scene.render()
            }
            if (scene.useDelayedTextureLoading) {
                var waiting = scene.getWaitingItemsCount();
                if (waiting > 0) {
                    status.innerHTML = "Streaming items..." + waiting + " remaining"
                } else {
                    status.innerHTML = ""
                }
            }
        }
    };
    engine.runRenderLoop(renderFunction);
    window.addEventListener("resize", function () {
        engine.resize()
    });
    if (!BABYLON.Engine.isSupported()) {
        document.getElementById("notSupported").className = ""
    } else {
        loadCustomScene(demo.constructor, demo.onload)
    }

}