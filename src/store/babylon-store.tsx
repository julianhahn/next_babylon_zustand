import { create } from 'zustand';
import { Scene } from 'babylonjs';

interface BabylonState {
    scene: Scene | null,
    showBabylonDebug: boolean,
    actions: {
        showOrHideDebug: (visible: boolean) => void,
        updateScene: (scene: Scene) => void,
        deleteScene: () => void,
    }
}

const useProjectState = create<BabylonState>((set) => {
    return {
        scene: null,
        showBabylonDebug: true,
        // actions in the store are fine, since they are static and never change
        actions: {
            updateScene: (scene: Scene) => set({ scene }),
            showOrHideDebug: (visible: boolean) => set({ showBabylonDebug: visible }),
            deleteScene: () => set((state) => {
                if (state.scene) {
                    console.log('disposing scene')
                    state.scene.dispose()
                }
                return { scene: null }
            })
        }
    }
})

export const useBabylonActions = () => useProjectState(state => state.actions)
export const useBabylonScene = () => useProjectState(state => state.scene)
export const useDebugVisible = () => useProjectState(state => state.showBabylonDebug)