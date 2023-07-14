import {
  ArcRotateCamera,
  ArcRotateCameraPointersInput,
  Scene,
  Vector3,
} from "@babylonjs/core";

import { ArcRotateCameraCustomInput } from "./camera_input";

export const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new ArcRotateCamera(
    "camera",
    0,
    0,
    30,
    new Vector3(0, 0, 0),
    scene
  );
  camera.position = new Vector3(0, 30, 30);
  camera.upVector = new Vector3(0, 1, 0);
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 600;
  camera.inertia = 0.8;
  camera.panningInertia = 0.5;
  // camera.angularSensibilityX = 500;
  // camera.angularSensibilityY = 500;
  camera.panningSensibility = 25;
  // camera.wheelPrecision = 1;
  camera.lowerBetaLimit = 0; // Can look from top-view
  camera.upperBetaLimit = (0.9 * Math.PI) / 2; // Preven angle from going under the ground plane (stop slightly above ground level)

  camera.attachControl(canvas, true, true);

  const MIDDLE_MOUSE_BUTTON = 1;
  const RIGHT_MOUSE_BUTTON = 2;
  camera._panningMouseButton = MIDDLE_MOUSE_BUTTON;
  (camera.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons = [
    MIDDLE_MOUSE_BUTTON,
    RIGHT_MOUSE_BUTTON,
  ];

  camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput"); // Disable moving camera with arrow keys
  camera.inputs.add(new ArcRotateCameraCustomInput()); // Move camera with WASD with custom controls
  return camera;
};
