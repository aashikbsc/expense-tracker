import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import publicRoutes from "./routes/routes"
import "./App.css"

function App() {
   return (
      <Router>
         <Routes>
            {publicRoutes.map((route) => (
               <Route path={route.path} element={<route.component />} />
            ))}
         </Routes>
      </Router>
   )
}

export default App
