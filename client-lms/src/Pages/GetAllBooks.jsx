import React, { useEffect } from 'react'
import Card from '../Components/Library/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooks } from '../Redux/Slices/library.slice'
import LayoutOther from '../Layout/LayoutOther'

const GetAllBooks = () => {
    const dispatch = useDispatch()


    //Extract libraryData state from library slice & this state.books is getting from store.js
    const {libraryData} = useSelector ((state) => state.library ) 

    const actionResult = async () =>{
        await dispatch(getAllBooks())
    }

    useEffect(()=>{
      actionResult()
    },[])

  return (
    <LayoutOther>
   
      <section className='flex flex-col my-10 items-center justify-center gap-10'>
      <label className=" text-4xl text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">books</label>
        <div className='flex flex-wrap gap-12 items-center justify-center'>
        {libraryData && libraryData.map(book =>{
          return <Card 
          {...book}
          key={book._id} 
          data={book}/>
        })}
        </div>
        </section>
    </LayoutOther>
  )
}

export default GetAllBooks
