import { News } from '../interfaces';

export type NewsActions =
  | { type: 'add-news'; payload: { news: News } }
  | { type: 'selected-news'; payload: { selectedNews: News } }
  | { type: 'edit-news'; payload: { news: News } }
  | { type: 'delete-news'; payload: { id: string } }
  | { type: 'isEditing'; payload: { isEditing: boolean } }
  | { type: 'add-initial-news'; payload: { initialNews: News[] } };

export type NewsState = {
  news: News[];
  selectedNews: News;
  isEditing: boolean;
};

export const initialState: NewsState = {
  news: [],
  selectedNews: {
    id: null,
    image_url: '',
    title: '',
    date: '',
    body: '',
    author: '',
  },
  isEditing: false,
};

export const NewsReducer = (state: NewsState, action: NewsActions) => {
  if (action.type === 'add-news') {
    const isArray = Array.isArray(action.payload.news);

    return {
      ...state,
      news: isArray
        ? action.payload.news
        : [...state.news, action.payload.news],
      selectedNews: isArray ? action.payload.news[0] : action.payload.news,
    };
  }

  if (action.type === 'selected-news') {
    return {
      ...state,
      selectedNews: action.payload.selectedNews,
    };
  }

  if (action.type === 'edit-news') {
    return {
      ...state,
      news: state.news.map((n) =>
        n.id === action.payload.news.id ? action.payload.news : n
      ),
      selectedNews: action.payload.news,
      isEditing: false,
    };
  }

  if (action.type === 'delete-news') {
    //Elimina la noticia seleccionada y se selecciona la siguiente/anterior
    const indexSelected = state.news.findIndex(
      (n) => n.id === state.selectedNews.id
    );

    const nextSelected =
      state.news[indexSelected + 1] ||
      state.news[indexSelected - 1] ||
      initialState.selectedNews;

    return {
      ...state,
      news: state.news.filter((n) => n.id !== action.payload.id),
      selectedNews: nextSelected,
    };
  }

  if (action.type === 'isEditing') {
    return {
      ...state,
      isEditing: action.payload.isEditing,
    };
  }

  return state;
};
