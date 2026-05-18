import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useState } from "react";

import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/login"
                    element={
                        <Login setToken={setToken} />
                    }
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register setToken={setToken} />}
                />

                {/* Protected Dashboard */}
                <Route
                    path="/"
                    element={
                        token
                        ? <Dashboard setToken={setToken} />
                        : <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
