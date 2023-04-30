import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Routes/Home.tsx";
import Tv from "./Routes/Tv.tsx";
import Search from "./Routes/Search.tsx";
import Header from "./Routes/Components/Header.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./Routes/Search.tsx";

function App() {
    const client = new QueryClient();
    return (

        <QueryClientProvider client={client}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/tv" element={<Tv />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/search/:listType/:id" element={<SearchPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/movies/:movieId" element={<Home />} />
                    <Route path="/home/:listType/:id" element={<Home />}></Route>
                    <Route path="/home/banner/:id" element={<Home />}></Route>

                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
