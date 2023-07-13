"use client"
import { useState, useEffect } from "react";
import { useBabylonActions, useDebugVisible } from "@/store/babylon-store";
import './Header.scss'

export function Header() {
    const babylonDebug = useDebugVisible()
    const { showOrHideDebug } = useBabylonActions()

    return (
        <div className='header'>
            <button onClick={() => {
                showOrHideDebug(!babylonDebug)
            }}> {babylonDebug ? "hide" : "show "} babylon debug </button>
        </div>
    )
}