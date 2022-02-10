import './App.css';
import { useState, useEffect } from 'react';

const eventFn = () => {
  console.log('h1 clickado');
};

//App sendo feito através de Hook
function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

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
  useEffect(() => {
    document.querySelector('h1')?.addEventListener('click', eventFn);

    // componentWillUmont - limpeza
    return () => {
      document.querySelector('h1')?.removeEventListener('click', eventFn);
    };
  }, []);

  // com dependência - executa toda vez que a dependência mudar
  // Usando Hook, ele pode ser substituído pelo useEffect
  useEffect(() => {
    console.log('C1:', counter, 'C2:', counter2);
  }, [counter, counter2]);

  return (
    <div className="App">
      <p>Teste 4</p>
      <h1>
        C1: {counter} C2: {counter2}{' '}
      </h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter2(counter2 + 1)}>+(2)</button>
    </div>
  );
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
