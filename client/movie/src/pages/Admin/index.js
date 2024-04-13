import React from 'react'

import { Tabs, Modal } from "antd"
import MovieList from './MovieList.js'

function index() {

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <Tabs.Tabpane tab="Movies" key="1">
                    <MovieList/>
                </Tabs.Tabpane>
                <Tabs.Tabpane tab="Theaters" key="2">
                    <div>
                        <h1>This is Theaters</h1>
                    </div>
                </Tabs.Tabpane>

            </Tabs>
            
        </div>
    )
}

export default index