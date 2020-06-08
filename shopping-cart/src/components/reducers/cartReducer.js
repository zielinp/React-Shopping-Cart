import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,SUB_SHIPPING } from '../actions/action-types/cart-actions'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initState = {
    items: [
        {id:1,title:'Orange', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1},
        {id:2,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2},
        {id:3,title:'Jordan White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3},
        {id:4,title:'Jordan Black', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4},
        {id:5,title:'Sneakers', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{

    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){

         let addedItem = state.items.find(item=> item.id === action.id) // skąd są itemy
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)

         toast.info(`You have added ${addedItem.title} to your cart!`,{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
          }
          );

         if(existed_item)
         {
            addedItem.quantity += 1 //skąd jest quantity?
             return{
                ...state, // co oznaczają te ...
                 total: state.total + addedItem.price
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }

        }
    }

    if(action.type === REMOVE_ITEM){
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)

            toast.warn(`You have removed ${itemToRemove.title} from your cart!`,{
                   position: "bottom-left",
                   autoClose: 5000,
                   hideProgressBar: true,
                   closeOnClick: true,
                   pauseOnHover: false,
                   draggable: true,
                   progress: undefined,
             });

            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        //INSIDE CART COMPONENT
        if(action.type=== ADD_QUANTITY){
            let addedItem = state.items.find(item=> item.id === action.id)
              addedItem.quantity += 1
              let newTotal = state.total + addedItem.price
              return{
                  ...state,
                  total: newTotal
              }
        }
        if(action.type=== SUB_QUANTITY){
            let addedItem = state.items.find(item=> item.id === action.id)
            //if the qt == 0 then it should be removed
            if(addedItem.quantity === 1){
                let new_items = state.addedItems.filter(item=>item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    total: newTotal
                }
            }

        }
        let shipping_price = 6;

        if (action.type === ADD_SHIPPING) {
          let newTotal = state.total + shipping_price
          return {
            ...state,
            total: newTotal
          }
        }

        if (action.type === SUB_SHIPPING) {
          return {
            ...state,
            total: state.total - shipping_price
        }
      }
        return state
    }

    export default cartReducer