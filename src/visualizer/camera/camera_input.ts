import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { ICameraInput } from "@babylonjs/core/Cameras/cameraInputsManager";
import { Nullable } from "@babylonjs/core/types";


class ArcRotateCameraCustomInput implements ICameraInput<ArcRotateCamera> {
  camera: Nullable<ArcRotateCamera> = null;

  _keys: number[] = [];
  keysUp = [87];
  keysDown = [83];
  keysLeft = [65];
  keysRight = [68];

  public getClassName(): string {
    return "ArcRotateCameraCustomInput";
  }

  public getSimpleName(): string {
    return "customCameraInput";
  }

  public attachControl(noPreventDefault?: boolean | undefined): void {
    var engine = this.camera?.getEngine();
    var element = engine?.getInputElement()!;
    if (this.onKeyDown === null && this.onKeyUp === null) {
      element.tabIndex = 1;
      this.onKeyDown = (evt: KeyboardEvent) => {
        // TODO rewrite this to use `this.keysUp.indexOf(evt.keyCode)` and `w` in `keysUp` since evt.keyCode is deprecated
        if (
          this.keysUp.indexOf(evt.keyCode) !== -1 ||
          this.keysDown.indexOf(evt.keyCode) !== -1 ||
          this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
          var index = this._keys.indexOf(evt.keyCode);
          if (index === -1) {
            this._keys.push(evt.keyCode);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      this.onKeyUp = (evt: KeyboardEvent) => {
        if (
          this.keysUp.indexOf(evt.keyCode) !== -1 ||
          this.keysDown.indexOf(evt.keyCode) !== -1 ||
          this.keysLeft.indexOf(evt.keyCode) !== -1 ||
          this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
          var index = this._keys.indexOf(evt.keyCode);
          if (index >= 0) {
            this._keys.splice(index, 1);
          }
          if (!noPreventDefault) {
            evt.preventDefault();
          }
        }
      };
      element?.addEventListener("keydown", this.onKeyDown, false);
      element?.addEventListener("keyup", this.onKeyUp, false);
    }
  }

  public detachControl(): void {
    var engine = this.camera?.getEngine();
    var element = engine?.getInputElement();

    if (this.onKeyDown !== null && this.onKeyUp !== null) {
      element?.removeEventListener("keydown", this.onKeyDown!);
      element?.removeEventListener("keyup", this.onKeyUp!);
      this._keys = [];
      this.onKeyDown = null;
      this.onKeyUp = null;
    }
  }

  public checkInputs(): void {
    if (this.onKeyDown !== null && this.onKeyUp !== null) {
      var currentCamera = this.camera;
      if (currentCamera !== null) {
        for (var index = 0; index < this._keys.length; index++) {
          var keyCode = this._keys[index];
          if (this.keysLeft.indexOf(keyCode) !== -1) {
            currentCamera.inertialPanningX -= currentCamera.panningInertia;
          } else if (this.keysUp.indexOf(keyCode) !== -1) {
            currentCamera.inertialPanningY += currentCamera.panningInertia;
            currentCamera.radius -= currentCamera.panningInertia;
          } else if (this.keysRight.indexOf(keyCode) !== -1) {
            currentCamera.inertialPanningX += currentCamera.panningInertia;
          } else if (this.keysDown.indexOf(keyCode) !== -1) {
            currentCamera.inertialPanningY -= currentCamera.panningInertia;
            currentCamera.radius += currentCamera.panningInertia;
          }
        }
      }
    }
  }

  // TODO can these be normal member functions without the nullable?
  onKeyDown: Nullable<(event: KeyboardEvent) => void> = null;
  onKeyUp: Nullable<(event: KeyboardEvent) => void> = null;

  // onKeyDown(event: KeyboardEvent): void {
  //     throw new Error("Method not implemented.");
  // }

  // onKeyUp(event: KeyboardEvent): void {
  //     throw new Error("Method not implemented.");
  // }
}

export { ArcRotateCameraCustomInput };
