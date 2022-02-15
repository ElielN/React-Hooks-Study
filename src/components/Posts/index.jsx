import { useContext, useEffect, useRef } from 'react';
import { decrementCounter, incrementCounter } from '../../contexts/CounterProvider/action';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { loadPosts } from '../../contexts/PostsProvider/actions';
import { PostsContext } from '../../contexts/PostsProvider/context';

// Component Posts
export const Posts = () => {
  const isMounted = useRef(true);
  const postsContext = useContext(PostsContext);
  const { postsState, postsDispatch } = postsContext;

  const counterContext = useContext(CounterContext);
  const { counterState, counterDispatch } = counterContext;

  // Quando o component Posts for montado na tela, dispara a action para carregar os posts
  useEffect(() => {
    // Na action a função dispatch é jogada pra dentro de uma função no retorno
    // Isso é feito para garantir que vamos de fato usar a função apenas se os component estiver montado na tela
    // Desmontar o component enquanto carrega os posts pode gerar lixo
    loadPosts(postsDispatch).then((dispatch) => {
      if (isMounted.current) {
        dispatch();
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [postsDispatch]);

  return (
    <div>
      <button onClick={() => incrementCounter(counterDispatch)}>Counter: {counterState.counter}+</button>
      <button onClick={() => decrementCounter(counterDispatch)}>Counter: {counterState.counter}-</button>
      <h1>Oi</h1>
      {postsState.loading && (
        <p>
          <strong>Carregando posts...</strong>
        </p>
      )}
      {postsState.posts.map((p) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  );
};
