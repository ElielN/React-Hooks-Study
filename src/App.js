import P from 'prop-types';
import { useEffect, useState } from 'react';
import './App.css';

// const eventFn = () => {
//   console.log('h1 clickado');
// };

//React.memo irá memorizar o component e irá renderizá-lo novamente apenas se ele tiver mudado
//Existe um Hook específico para isso, o useMemo. Basta colocar o Component dento dele
// const Button = React.memo(function Button({ incrementButton }) {
//   return <button onClick={() => incrementButton(10)}>+</button>;
// });

// const Button = ({ incrementButton }) => {
//   return <button onClick={() => incrementButton(10)}>+</button>;
// };

// Button.propTypes = {
//   incrementButton: P.func,
// };

//App sendo feito através de Hook
function App() {
  const [posts, setPosts] = useState([]);
  console.log('Pai renderizou');

  //Component did mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r));
  });
  return ( //Retomar aos 9:25 da aula 49
    <div className="App">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
  // const [counter, setCounter] = useState(0);
  //useCallback é um Hook que 'salva' nossa função e irá recriá-la apenas
  //se nossa dependência for alterada.
  //Nesse caso, como precisamos alterar nossa dependência mas não queremos recriar a função,
  //vamos usar uma função de callback do próprio useState para incrementar o valor de counter
  //setCounter((c) => c + num)
  //Assim podemos retirar counter das dependências
  // const incrementCounter = useCallback((num) => {
  //   setCounter((c) => c + num);
  // }, []);
  // const btn = useMemo(() => {
  //   return <Button incrementButton={incrementCounter} />;
  // }, [incrementCounter]);
  // return (
  //   <div className="App">
  //     <p>Teste 4</p>
  //     <h1>C1: {counter}</h1>
  //     {btn}
  //   </div>
  // );
  // componentDidUpdate - executa toda vez que o component atualizar
  // Usando Hook, ele pode ser substituído pelo useEffect
  // useEffect(() => {
  //   console.log('componentDidUpdate');
  // });
  // componentDidMount - executa 1x (quando o component é montado na tela)
  // Usando Hook, ele pode ser substituído pelo useEffect
  // useEffect(() => {
  //   console.log('componentDidMount');
  // }, []);
  //Tomar cuidado: Temos que limpar o component para que ele não fique sempre adicionando
  //um novo evento e acumulando vários
  // useEffect(() => {
  //   document.querySelector('h1')?.addEventListener('click', eventFn);
  //   // componentWillUmont - limpeza
  //   return () => {
  //     document.querySelector('h1')?.removeEventListener('click', eventFn);
  //   };
  // }, []);
  // com dependência - executa toda vez que a dependência mudar
  // Usando Hook, ele pode ser substituído pelo useEffect
  // useEffect(() => {
  //   console.log('C1:', counter);
  // }, [counter]);
  // //App sendo feito através de Hook
  // const [reverse, setReverse] = useState(false);
  // const [counter, setCounter] = useState(0);
  // const reverseClass = reverse ? 'reverse' : '';
  // const handleClick = () => {
  //   setReverse(!reverse);
  // };
  // const handleIncrement = () => {
  //   setCounter((counter) => counter + 1);
  //   //setCounter(counter + 1);
  // };
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />
  //       <h1>Counter: {counter}</h1>
  //       <p>
  //         <button type="button" onClick={handleClick}>
  //           Reverse {reverseClass}
  //         </button>
  //       </p>
  //       <p>
  //         <button type="button" onClick={handleIncrement}>
  //           Increment {counter}
  //         </button>
  //       </p>
  //     </header>
  //   </div>
  // );
}
//App sendo feito través de classe
// class App extends Component {
//   state = {
//     reverse: false,
//   };

//   handleClick = () => {
//     const { reverse } = this.state;
//     this.setState({ reverse: !reverse });
//   };

//   render() {
//     const { reverse } = this.state;
//     const reverseClass = reverse ? 'reverse' : '';

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />
//           <button type="button" onClick={this.handleClick}>
//             Reverse {reverseClass}
//           </button>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
