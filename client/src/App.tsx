import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/dashboard';
import { LoadPlaceAction, LoadSocInteractionAction } from './redux/actions/actionCreator';
import { StoreState } from './redux/store/store';
import { getRequest } from './services/apiCalls';
import DetailPage from './components/DetailPage';

function App() {

	const dispatch = useDispatch();

  const placeList_store = useSelector<StoreState>((state) => state.placeList) as any[];
  const socIntList_store = useSelector<StoreState>((state) => state.socInteractionList) as any[];

  useEffect(() => {
    getRequest("social-interactions").then((result) => {
      dispatch(LoadSocInteractionAction(result))
    })

    getRequest("visited-places").then((result) => {
      dispatch(LoadPlaceAction(result))
    });

  }, [])

  // console.log('store place - ', placeList_store)
  // console.log('----------- ')
  // console.log('store soc - ', socIntList_store)


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard placeList={placeList_store} socIntList={socIntList_store} />} />
            <Route path="social-interactions" element={<DetailPage isPlaceExposure={false} list={socIntList_store} />} />
            <Route path="visited-places" element={<DetailPage isPlaceExposure={true} list={placeList_store} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
