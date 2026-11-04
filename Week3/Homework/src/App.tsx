import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Header from "./components/Header";
import MovieList from "./pages/MovieListPage";
import MovieDetail from "./pages/MovieDetailPage";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />}></Route>
          <Route path="/movie/:movieId" element={<MovieDetail />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
