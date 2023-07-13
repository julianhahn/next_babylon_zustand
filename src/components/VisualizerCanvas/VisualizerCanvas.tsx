"use client"
import { useBabylonActions, useBabylonScene } from "@/store/babylon-store"
import { useRef, useEffect } from "react"
import { createScene } from "@/visualizer/scene"
import './VisualizerCanvas.scss'
import { ToggleDebug } from "./toggleDebug"

export function VisualizerCanvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { updateScene, deleteScene } = useBabylonActions()

    // on component
    useEffect(() => {
        if (canvasRef.current) {
            // Ignore scroll event
            canvasRef.current.addEventListener('wheel', (e) =>
                e.preventDefault()
            )

            // Scene
            createScene(canvasRef.current).then((scene) => {
                updateScene(scene)
            })
        }

        /* TODO: 
        write a propper teardown function on the return of this component
        this means removing the webworker and removeing the event listener
         */
        return () => {
            // Make sure websockets are cleaned up during hot reload
            deleteScene()
        }
    }, [updateScene, deleteScene])

    return (
        <>
            <canvas ref={canvasRef}></canvas>
            <ToggleDebug />
        </>
    )
}