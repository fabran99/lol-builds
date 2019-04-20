import { GET_CHAMPS, SEARCH_CHAMPS, GET_CHAMP } from "./types";
import champions from "../json/champions";

export const getChamps = () => dispatch => {
  dispatch({
    type: GET_CHAMPS,
    payload: champions
  });
};
export const getChamp = id => dispatch => {
  dispatch({
    type: GET_CHAMP,
    payload: id
  });
};
export const searchChamps = data => dispatch => {
  dispatch({
    type: SEARCH_CHAMPS,
    payload: data
  });
};
