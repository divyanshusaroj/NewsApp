import React from 'react'
import loader from '../loader.gif'

const Loading = () => {
  
    return (
        <div className="text-center my-2">
        <img src={loader} alt='loader' />
      </div>
    )
  
}

export default Loading