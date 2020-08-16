import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {getData} from './redux/actions/actions'

const colors = ['#473F97', '#FFB259', '#FF5959', '#4CD97B', '#4CB5FF', '#9059FF'];
function assignColor() {
  const digit = Math.floor(Math.random() * (colors.length + 1 ));
  return colors[digit];
}

function App() {
  
  const statistics = useSelector(state => state.covid);
  const [statesResult, setStatesResult] = useState();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsError(false)
      await dispatch(getData())
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch]);

  const searchHandler =  useCallback(() => {
    const query = document.getElementById('state_search').value;
    if(!query || query.length === 0) {
      setStatesResult( statistics.states);
    } else {
      const result = statistics.states.filter( state => state.state.toLowerCase().includes(query.toLowerCase()));
      setStatesResult(result);
    }
  }, [statistics]);

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    setStatesResult(statistics.states)
  }, [statistics])

  let view = <div className="loader">Loading...</div>;
  if(!isLoading && !isError) {
    view = (
      <>
      <main className="main">
      <div className="overview">
      <h3>Covid-19 Statistics <b>Nigeria</b></h3>
      
      <div className="overview__statistics">
        <div className="overview__title "><h4>Overview</h4></div>
        <div className="overview__total_sampled">
          <p><small>Total Sampled</small></p>
          <p><b>{statistics.totalSamplesTested}</b></p>
        </div>
        <div className="overview__total_confirmed">
          <p><small>Total Confirmed</small></p>
          <p><b>{statistics.totalConfirmedCases}</b></p>
        </div>
        <div className="overview__total_others">
          <div className="overview__total_active">
            <p><small>Total Active</small></p>
            <p><b>{statistics.totalActiveCases}</b></p>
          </div>
          <div className="overview__total_discharged">
            <p><small>Total Discharged</small></p>
            <p><b>{statistics.discharged}</b></p>
          </div>
          <div className="overview__total_death">
            <p><small>Total Death</small></p>
            <p><b>{statistics.death}</b></p>
          </div>
        </div>
      </div>
      </div>
    </main>
    <section className="states">
      <div className="states__title">
        <h4>States Statistics</h4>
        <div>
          <input className="states__search" id="state_search" placeholder="Search State" onChange={searchHandler}/>
          <button className="states__search_button" onClick={searchHandler}>Search</button>
        </div>
      </div>
      <div className="states__data">
          {
            statesResult.map(state => {
              return (
                <div className="states__statistics" key={state['_id']}>
                  <div className="states__short_name" style={{backgroundColor: assignColor() || "#1E1E1E" }}>{state.state.substring(0,2)}</div>
                  <h3>{state.state}</h3>
                  <div className="states__figures">
                  <p><b style={{color: '#FFB259'}}>Confirmed Cases: </b>{state.confirmedCases}</p>
                  <p><b style={{color: '#9059FF'}}>Confirmed Admission: </b>{state.casesOnAdmission}</p>
                  <p><b style={{color: '#4CD97B'}}>Discharged: </b>{state.discharged}</p>
                  <p><b style={{color: '#FF5959'}}>Death: </b>{state.death}</p>
                  </div>
                </div>
                )
            })
          }
      </div>
    </section>
    </>
  );
  } else if(isError) {
    view = (
      <div className="app__error">
        <h3>An error occurred please retry</h3>
        <button onClick={loadData}>Retry</button>
      </div>
    )
  }

  return (
    <div className="container">
      {view}
    </div>
  );
}

export default App;
