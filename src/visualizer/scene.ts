import {
  Color3,
  Color4,
  Engine,
  Scene,
  MeshBuilder,
  Vector3,
  HemisphericLight,
} from "babylonjs";

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
  console.log("create a new Scene");
  const engine = createEngine(canvas);
  const scene = new Scene(engine, { useGeometryUniqueIdsMap: true });
  scene.useRightHandedSystem = true;
  scene.clearColor = Color4.FromHexString("#2F2C43");
  scene.ambientColor = Color3.White();
  scene.autoClearDepthAndStencil = false;
  await scene.debugLayer.show({ overlay: true });

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

  // assign the grid material to the ground and then create the grid
  /* 
  let gridMaterial = new GridMaterial("grid", scene); */

  let ground = MeshBuilder.CreateGround(
    "ground",
    {
      width: 5,
      height: 5,
    },
    scene
  );

  engine.runRenderLoop(() => {
    scene.render();
  });

  return scene;
};