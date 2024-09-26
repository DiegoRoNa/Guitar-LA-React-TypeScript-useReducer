import { db } from "../data/db";
import { Guitar, GuitarCart } from "../types/types";

// acciones
export type CartActions = 
{ type: 'add-to-cart', payload: {item: Guitar} } |
{ type: 'remove-from-cart', payload: {id: Guitar['id']} } |
{ type: 'decrease-quantity', payload: {id: Guitar['id']} } |
{ type: 'increase-quantity', payload: {id: Guitar['id']} } |
{ type: 'clear-cart' }

// state del carrito
export type CartState = {
    data: Guitar[]
    cart: GuitarCart[]
}

/**
 * leer si hay elementos en el localstorage
 * @returns 
 */
const initialCart = () : GuitarCart[] => {
    const localStorageCart = localStorage.getItem('cart') // retorna un valor o null
    return localStorageCart ? JSON.parse(localStorageCart) : [] // inicio del state cart
}

// valor inicial
export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MAX_GUITARS = 5
const MIN_GUITARS = 1

// funciones de las acciones
export const CartReducer = (state: CartState = initialState, action: CartActions) => {

    // nueva guitarra en el carrito
    if (action.type === 'add-to-cart') {
        
        // validar si existe la guitarra en el carrito
        // se cambio la funcion findIndex por find
        const guitarExist = state.cart.find(guitar => guitar.id === action.payload.item.id) // sacar el indice del obj en el array

        let updateCart : GuitarCart[] = []

        if (guitarExist) { // existe en el carrito

            updateCart = state.cart.map( guitar => {
                if (guitar.id === action.payload.item.id) { // guitarra que se quiere agregar al carito
                    
                    if (guitar.quantity < MAX_GUITARS) { // no superar el maximo a agregar
                        return {...guitar, quantity: guitar.quantity + 1} // sumar 1 mas
                    } else {
                        return guitar
                    }

                } else {
                    return guitar
                }
            })

        } else {
            const newGuitar : GuitarCart = {...action.payload.item, quantity: 1}
            updateCart = [...state.cart, newGuitar]
        }

        return {
            ...state,
            cart: updateCart
        }
    }

    // quitar guitarra en el carrito
    if (action.type === 'remove-from-cart') {
        
        // setear el nuevo state
        const cart = state.cart.filter(guitar => guitar.id !== action.payload.id) 
        return {
            ...state,
            cart
        }
    }

    // quitar una guitarra desde el carrito
    if (action.type === 'decrease-quantity') {

        // actualizar el contador sin mutar el state
        const cart = state.cart.map(guitar => {

            if (guitar.id === action.payload.id && guitar.quantity > MIN_GUITARS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1
                }
            }

            return guitar
        })

        return {
            ...state,
            cart
        }
    }

    // sumar una guitarra desde el carrito
    if (action.type === 'increase-quantity') {
        
        // actualizar el contador sin mutar el state
        const cart = state.cart.map(guitar => {

            if (guitar.id === action.payload.id && guitar.quantity < MAX_GUITARS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1
                }
            }

            return guitar
        })

        return {
            ...state,
            cart
        }
    }

    // limpiar carrito
    if (action.type === 'clear-cart') {
        
        return {
            ...state,
            cart: []
        }
    }

    return state
}