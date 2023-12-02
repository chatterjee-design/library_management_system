import React from 'react'
import LayoutOther from '../../Layout/LayoutOther'
import { placeOrder } from '../../Redux/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';


const CheckOut = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  console.log(cartItem)

  const hndlePlaceOrder =async (e) => {
    e.preventDefault();
    try {
        const response = await dispatch(placeOrder())
        
        if (response?.success) {
          
          toast.success('Order confirmed!')
        }
      } catch (error) {
        toast.error(error.message)
      }
}
  return (
   <LayoutOther>
<button onClick={hndlePlaceOrder} className='btn btn-ghost'>button
</button>
   </LayoutOther>
  )
}

export default CheckOut
