export type NewsActions = { type: 'add-news'; payload: { news: Object } };

export type NewsState = { news: Object };

export const initialState: NewsState = {
  news: [],
};

export const NewsReducer = (state: NewsState, action: NewsActions) => {
  if (action.type === 'add-news') {
    return {
      ...state,
      news: action.payload.news,
    };
  }

  return state;
};
