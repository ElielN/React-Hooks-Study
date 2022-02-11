// eslint-disable-next-line
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const H1 = () => {
  const theContext = useContext(GlobalContext);
  //const { contextState } = theContext;
  //return <h1>{ contextState.title }</h1>
  const {
    contextState: { title, counter },
  } = theContext;
  return (
    <h1>
      {title} {counter}
    </h1>
  );
};
