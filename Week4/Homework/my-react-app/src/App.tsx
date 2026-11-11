import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";

import CodePage from "./pages/CodePage";
import ListPage from "./pages/ListPage";
import WritePage from "./pages/WritePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/code" replace />} />
      <Route path="/code" element={<CodePage />} />
      <Route
        path="/posts"
        element={
          <>
            <Header />
            <ListPage />
          </>
        }
      />

      <Route
        path="/write"
        element={
          <>
            <Header />
            <WritePage />
          </>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <>
            <Header />
            <DetailPage />
          </>
        }
      />

      <Route
        path="/posts/:id/edit"
        element={
          <>
            <Header />
            <EditPage />
          </>
        }
      />
    </Routes>
  );
};

export default App;
