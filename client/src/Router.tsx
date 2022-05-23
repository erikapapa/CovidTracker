import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/dashboard';
import { StoreState } from './redux/store/store';

function Router() {

  const placeList_store = useSelector<StoreState>((state) => state.placeList) as any[];
  const socIntList_store = useSelector<StoreState>((state) => state.socInteractionList) as any[];

  const [placeList, setPlaceList] = useState<any[]>();
  const [socIntList, setSocIntList] = useState<any[]>();

  useEffect(() => {
    setPlaceList(placeList_store);
    setSocIntList(socIntList_store);

  }, [placeList_store, socIntList_store])


  console.log('store place - ', placeList_store)
  console.log('store place 2 - ', placeList)

  console.log('----------- ')
  console.log('store soc - ', socIntList_store)
  console.log('store soc 2 - ', socIntList)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            {/* <Route path="products" element={<ProductList />} />
            <Route path="about" element={<About />} />
            <Route path="manageProduct" element={<ManageProduct />} >
              <Route path=":id" element={<ManageProduct />}></Route>
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
