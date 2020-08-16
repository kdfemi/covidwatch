export const GET_DATA = 'GET_DATA';

export const getData = () => {
    return async (dispatch, state) => {
        try {
            const response = await fetch('https://covidnigeria.herokuapp.com/api');
            let data = null
            if(response.ok) {
                data = await response.json();
                dispatch({type: GET_DATA, payload: data.data});
            } else {
                throw new Error('Couldn\'t Load data');
            }
        } catch (err) {
            console.log(err)
            if(err.message) 
            throw err;
            throw new Error('An unknown Error Occurred');
        }
    }
}