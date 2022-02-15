import { PostsContext } from './context';
import P from 'prop-types';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { data } from './data';

// Component pai que irá repassar valores do context para todos os filhos
export const PostsProvider = ({ children }) => {
  const [postsState, postsDispatch] = useReducer(reducer, data);

  return <PostsContext.Provider value={{ postsState, postsDispatch }}>{children}</PostsContext.Provider>;
};

PostsProvider.propTypes = {
  children: P.node.isRequired,
};
