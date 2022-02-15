import * as types from './types';

// Action de carregar os posts
export const loadPosts = async (dispatch) => {
  dispatch({ type: types.POSTS_LOADING });
  const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsRaw.json();
  //Dava pra fazer sem retorno, apenas colocando o dispatch direto, porém
  //corre o risco de ocorrer problemas na hora de renderizar os posts. Isso
  //aconteceria se mudássemos de tela antes de concluir nossa action
  return () => dispatch({ type: types.POSTS_SUCCESS, payload: posts });
  //O retorno vai nos dar uma função, então poderemos verificar se o component que renderiza
  //os posts ainda está na tela

  //Outra alternativa seia usar o retorno do useEffect para dar um clear ou mesmo
  //abortar o fetch
};
