import Img1 from '.././../Assets/Image/p1.webp'
import Img2 from '.././../Assets/Image/p2.webp'
import Img3 from '.././../Assets/Image/p3.webp'
import Img4 from '.././../Assets/Image/p4.webp'

const initialState = {
    product: [
        { id: 0, name: "METRONAUT", info: 'Men Regular Mid Rise Dark Blue Jeans', image: Img1, price: '429', qty: 1  },
        { id: 1, name: "Mast & Harbour ", info: 'Men Skinny Mid Rise Dark Blackdark Jeans ', image: Img2, price: '570', qty: 1 },
        { id: 2, name: "ROADUSTER", info: 'Men Skinny Low Rise Green light Jeans', image: Img3, price: '720', qty: 1 },
        { id: 3, name: "KILLER", info: 'Men Boot-Leg Mid Rise Grey-light Jeans', image: Img4, price: '640', qty: 1 },
    ],
    cart: [],
    count: 0,
    total: 0,
};

const reducer = (state = initialState, action) => {
    if (action.type === "AddToCart") {
        const itemExist = state.cart.some((item) => item.id === state.product[action.payload].id);
        if (!itemExist) {
            return {
                ...state, cart: [...state.cart, { ...state.product[action.payload] }],
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        } else {
            return {
                ...state, cart: state.cart.map((item) => item.id === state.product[action.payload].id ? { ...item, qty: item.qty + 1 } : item),
                total: state.total + parseFloat(state.product[action.payload].price),
            };
        }
    }
    if (action.type === 'DeleteItem') {
        const deletedItem = state.cart[action.payload];
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
    }

    if (action.type === 'Count') {
        return { ...state, count: state.cart.length };
    }
    if (action.type === 'Increment') {
        var itemIndex = action.payload
        return {
            ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty + 1 } : item),
            total: state.total + parseFloat(state.cart[itemIndex].price),
        };
    }
    if (action.type === 'Decrement') {
        var itemIndex = action.payload
        const deletedItem = state.cart[itemIndex];
        if (state.cart[itemIndex].qty > 1) {
            return {
                ...state, cart: state.cart.map((item, id) => id === itemIndex ? { ...item, qty: item.qty - 1 } : item),
                total: state.total - parseFloat(state.cart[itemIndex].price),
            };

        }
        return {
            ...state,
            cart: state.cart.filter((item, id) => id !== action.payload),
            total: state.total - parseFloat(deletedItem.price * deletedItem.qty),
        };
    }
    if (action.type === 'DeleteAll') {
        console.log({...state, cart: []})
        return { ...state, cart: [] , count: 0, total: 0};

    }
    return state;
}

export default reducer