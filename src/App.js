import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userRoutes } from "./routes/userRoutes";
import Loading from "./components/Loading";

function App() {
    return (
        <div className="App relative">
            <Loading />

            <BrowserRouter>
                <Routes>
                    {userRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
