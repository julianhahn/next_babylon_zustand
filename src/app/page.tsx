import React from 'react'
import './global.scss'
import './page.scss'
import { VisualizerCanvas } from '@/components/VisualizerCanvas'
import { Header } from '@/components/Header'

const MainPage = () => {
    return (
        <>
            <div className="main-content">
                <Header />
                <div className='some-text-label'> Hello World</div>
            </div>
            <VisualizerCanvas />
        </>
    )
}

export default MainPage