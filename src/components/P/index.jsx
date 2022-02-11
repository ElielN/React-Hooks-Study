import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const P = () => {
  const theContext = useContext(GlobalContext);
  const {
    contextState: { body, counter },
    setState,
  } = theContext;
  //O spread operator é usado para manter os valores previamente existentes
  //no contextState mas que eu não estou alterando. Se não fizer isso, o
  //setContextState irá atualizar o counter e limpar os outros dados
  return <p onClick={() => setState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>;
};
