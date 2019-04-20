import { GET_CHAMPS, SEARCH_CHAMPS, GET_CHAMP } from "../actions/types";
import champions from "../json/champions";
import objetos from "../json/objetos";
import builds from "../json/builds";

const initialState = {
  champs: champions,
  search: "",
  select: "",
  coincidencias: champions,
  champActual: {},
  objetos: objetos.objetos,
  builds: builds.builds
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAMPS:
      return {
        ...state,
        champs: champions,
        coincidencias: champions
      };

    case GET_CHAMP:
      const id = action.payload;
      var champActual = null;
      state.champs.forEach(champ => {
        if (champ.id == id) {
          champActual = champ;
        }
      });

      return {
        ...state,
        champActual
      };

    case SEARCH_CHAMPS:
      const { search, select } = action.payload;
      // filtro los campeones de acuerdo a la busqueda
      var coincidencias = state.champs.filter(champ => {
        if (select != "") {
          return (
            champ.name.toLowerCase().indexOf(search.toLowerCase()) != -1 &&
            champ.tags.indexOf(select) != -1
          );
        } else {
          return champ.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
        }
      });

      return {
        ...state,
        coincidencias,
        search,
        select
      };

    default:
      return state;
  }
}
