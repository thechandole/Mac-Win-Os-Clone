import { BrowserRouter, Route, Routes } from "react-router-dom";
import Desktop from "./Desktop";
import { BootLayout } from "./bootWindow/BootLayout";
import NotFound from "./NotFound";

function App() {
  return (
 <BrowserRouter>
      <Routes>
      {/* Boot + Desktop flow */}
      <Route element={<BootLayout />}>
        <Route path="/" element={<Desktop />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>);
}

export default App;
