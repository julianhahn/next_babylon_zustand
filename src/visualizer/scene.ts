import {
  Color3,
  Color4,
  Engine,
  Scene,
  MeshBuilder,
  Vector3,
  HemisphericLight,
} from "@babylonjs/core";

import { GridMaterial } from "@babylonjs/materials";
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

  // Move the sphere upward 1/2 its height
  sphere.position.y = 1;

  let gridMaterial = new GridMaterial("grid", scene);
  gridMaterial.opacity = 0.9;
  gridMaterial.majorUnitFrequency = 10;

  let ground = MeshBuilder.CreateGround(
    "ground",
    {
      width: 1000,
      height: 1000,
    },
    scene
  );
  ground.material = gridMaterial;

  engine.runRenderLoop(() => {
    scene.render();
  });

  return scene;
};
