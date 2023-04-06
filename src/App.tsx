import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import store from "./app/store";
import { HeaderComponent } from "./components/header/Header.component";
import { Collection } from "./pages/colection/Colection.component";

export enum NavItems {
  ADD_PRODUCT = "add-product",
  PRODUCTS = "products",
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Collection />} />
          <Route path={`/${NavItems.PRODUCTS}`} element={<Collection />} />
          <Route path={`/${NavItems.ADD_PRODUCT}`} element={<Collection />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
