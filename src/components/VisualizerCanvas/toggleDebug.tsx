
import { useDebugVisible } from "@/store/babylon-store"
import { useEffect } from "react"


export function ToggleDebug() {
    const babylonDebug = useDebugVisible()

    useEffect(() => {
        const scene_explorer = document.getElementById('scene-explorer-host')
        const inspector = document.getElementById('inspector-host')
        if (scene_explorer) {
            if (babylonDebug) {
                scene_explorer.style.display = 'block'
            } else {
                scene_explorer.style.display = 'none'
            }
        }
        if (inspector) {
            if (babylonDebug) {
                inspector.style.display = 'block'
            } else {
                inspector.style.display = 'none'
            }
        }

    }, [babylonDebug])

    return (
        <></>
    )
}