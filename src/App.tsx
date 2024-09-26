// componente principal de la app
import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { CartReducer, initialState } from "./reducers/cartReducer";

function App() {

  // acciones del reducer
  const [state, dispatch] = useReducer(CartReducer, initialState) // conectamos con el reducer

  
  // almacenar en localstorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <>
      <Header cart={state.cart} 
              dispatch={dispatch} 
      ></Header> {/*Componente de header*/}

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map(guitar => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch}></Guitar> // Componente de cada guitarra
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
