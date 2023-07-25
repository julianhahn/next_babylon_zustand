import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

import "@babylonjs/core/Materials/standardMaterial";

import { createCamera } from "./camera/camera";

const createEngine = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(
    canvas,
    true, // Anti-aliasing
    { doNotHandleContextLost: true },
    true
  );
  engine.enableOfflineSupport = false;

  if (window) {
    window.addEventListener("resize", () => {
      engine.resize();
    });
  }

  return engine;
};

export const createScene = async (
  canvas: HTMLCanvasElement
): Promise<Scene> => {
  console.log("cre  ate a new Scene");
  const engine = createEngine(canvas);
  const scene = new Scene(engine, { useGeometryUniqueIdsMap: true });

  Promise.all([
    import("@babylonjs/core/Debug/debugLayer"),
    import("@babylonjs/inspector"),
  ]).then((_values) => {
    scene.debugLayer.show({
      // config goes here, if needed
    });
  });

  scene.useRightHandedSystem = true;
  scene.clearColor = Color4.FromHexString("#2F2C43");
  scene.ambientColor = Color3.White();
  scene.autoClearDepthAndStencil = false;

  scene.freezeMaterials();

  createCamera(scene, canvas);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'sphere' shape.
  var sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  void Promise.all([
    import("@babylonjs/core/Debug/debugLayer"),
    import("@babylonjs/inspector"),
  ]).then((_values) => {
    console.log("hello from where the debug scene is shown");
    scene.debugLayer.show({});
  });

  // Move the sphere upward 1/2 its height
  // assign the grid material to the ground and then create the grid
  let gridMaterial = new GridMaterial("grid", scene);
  gridMaterial.majorUnitFrequency = 5;
  gridMaterial.minorUnitVisibility = 0;
  gridMaterial.opacity = 0.98;
  gridMaterial.mainColor = new Color3(1, 1, 1);

  let ground = MeshBuilder.CreateGround(
    "ground",
    {
      width: 1000,
      height: 1000,
    },
    scene
  );
  ground.material = gridMaterial;

  ground.material = gridMaterial;

  engine.runRenderLoop(() => {
    scene.render();
  });

  return scene;
};
