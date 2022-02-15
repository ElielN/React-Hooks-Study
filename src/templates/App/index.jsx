import { Posts } from '../../components/Posts';
import { PostsProvider } from '../../contexts/PostsProvider';
import './styles.css';

function App() {
  return (
    // PostsProvider é o post que possui o createContext e irá passar dados para todos os filhos
    <PostsProvider>
      <div>
        <Posts />
      </div>
    </PostsProvider>
  );
}

// --------------- USEREDUCE --------------------
/* const reducer = (state, action) => {
  switch (action.type) {
    case 'muda': {
      console.log('Chamou muda com', action.payload);
      return { ...state, title: 'Mudou' };
    }
    case 'inverter': {
      console.log('Chamou inverter');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
  }

  return { ...state };
}; */

// actions.js
/* export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

// Data.js
export const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};

// reducer.js
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE:
      console.log('Mudar título');
      return { ...state, title: action.payload };
  }
  return { ...state };
};

// AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };

  return <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>;
};

AppContext.propTypes = {
  children: P.node,
};

// H1/index.jsx
export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)}>{context.state.title}</h1>;
      <input type="text" ref={inputRef} />
    </>
  );
};

  //No useReducer passamos uma função reducer que vai fazer a lógica das actions
  //e um estado inicial
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;

  //O dispatch serve pra disparar uma ação, podendo enviar junto um payload que são dados
  //Como por exemplo durante uma compra em que eu posso mandar os produtos que estão no carrinho
  return (
    <div>
      <h1>
        {title} {counter}
      </h1>
      <button onClick={() => dispatch({ type: 'muda', payload: new Date().toLocaleDateString('pt-BR') })}>Click</button>
      <button onClick={() => dispatch({ type: 'inverter' })}>Inverte</button>
    </div>
  );
} */
// --------------- USEREDUCE --------------------

// --------------- CRIANDO NOSSO PRÓPRIO HOOK --------------------
/* const useMyHook = (cb, delay = 1000) => {
  const savedCb = useRef();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    //setInterval nos permite executar uma função ou código em um específico intervalo
    //Nesse caso, a cada delay segundos é executado a função callback que foi passada
    //como parâmetro no nosso Hook
    const interval = setInterval(() => {
      savedCb.current();
    }, delay);

    return () => clearInterval(interval); //Limpando lixo
  }, [delay]);
};

//O useReduce é igual ao useState mas foi criado para trabalhar com estados complexos
// App.jsx
function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(100);

  useMyHook(() => setCounter((c) => c + 1), delay);

  return (
    <div>
      <h1>Contador: {counter}</h1>
      <h1>Delay: {delay}</h1>
      <button
        onClick={() => {
          setDelay((d) => d + incrementor);
        }}
      >
        +{incrementor}
      </button>
      <button onClick={() => setDelay((d) => d - incrementor)}>-{incrementor}</button>
      <br />
      <input type="number" value={incrementor} onChange={(e) => setIncrementor(Number(e.target.value))}></input>
    </div>
  ); */
// --------------- CRIANDO NOSSO PRÓPRIO HOOK --------------------

// ----------------- USEREF E USECONTEXT -------------------------
/* import { Div } from './components/Div';
import { AppContext } from './contexts/AppContext';

//O useContext serve pra passar valores entre os components
//As vezes temos muitos components dentro de components que vão formando árvores
//Se eu preciso passar uma informação de um component pai para um filho do filho do filho (...)
//É mais eficiente usar o Hook useContext

function App() {
  return (
    //Aqui é onde o valor está sendo disponibilizado para todos os components
    <AppContext>
      <Div />
    </AppContext>
  );
} */

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

//Useref Hook
/* const Post = ({ post, handleClick }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h1 style={{ fontSize: '14px' }} onClick={() => handleClick(post.title)}>
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};
// ----------------- USEREF E USECONTEXT -------------------------

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
  handleClick: P.func,
};

//App sendo feito através de Hook
function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null);
  const contador = useRef(0);

  console.log('Pai renderizou');

  //Component did mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r));
  }, []);

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    //Retomar aos 9:25 da aula 49
    <div className="App">
      <h1>Renderizou: {contador.current}x</h1>
      <p>
        <input ref={input} type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      </p>
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => {
            return <Post key={post.id} post={post} handleClick={handleClick} />;
          })
        );
      }, [posts])}
      {posts.length <= 0 && <p>Ainda não existem posts.</p>}
    </div>
  ); */
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
//}
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
