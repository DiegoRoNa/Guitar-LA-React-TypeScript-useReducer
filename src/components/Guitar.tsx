import { Dispatch } from "react"
import type { Guitar } from "../types/types" // importar el type de Guitar
import type { CartActions } from "../reducers/cartReducer"

// este type solo se usa aqui, no es necesario meterlo al archivo de types
type GuitarProps = {
    guitar: Guitar
    dispatch: Dispatch<CartActions>
}

export default function Guitar({guitar, dispatch} : GuitarProps) { // props es una palabra reservada de React

    const {name, image, description, price} = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`./img/${image}.jpg`} alt="imagen guitarra"/>
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button type="button" className="btn btn-dark w-100" onClick={() => dispatch({type: 'add-to-cart', payload: {item: guitar}})}
                    // onClick={() => setCart(prevCart => [...prevCart, guitar]) /*prevCart es el state cart, no es necesario pasarlo como un prop, pero esta forma ofrece poco control sobre la funcion*/}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}