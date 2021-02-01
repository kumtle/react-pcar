/*
    action 객체를 만드는 액션 생성자들을 선언합니다. (action creators)
    여기서 () => ({}) 은, function() { return { } } 와 동일한 의미입니다.
    scope 이슈와 관계 없이 편의상 사용되었습니다.
*/
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_COLOR = 'SET_COLOR';
export const SET_HISTORY = 'SET_HISTORY';
export const SET_TOUR_DATA = 'SET_TOUR_DATA';

export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
});

// 다른 액션 생성자들과 달리, 파라미터를 갖고있습니다
export const setColor = (color) => ({
    type: SET_COLOR,
    color
});

export const setHistory = (history) => ({
    type: SET_HISTORY,
    history,
});

export const setTourData = (tourData) => ({
    type: SET_TOUR_DATA,
    tourData,
});