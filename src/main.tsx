import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import './index.css'
import App from './App.tsx'

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/:id" element={ <App/> }/>
					<Route path="*" element={ <App/> }/>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</>
)