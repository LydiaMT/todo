import { useState } from 'react'

const useAjax = (callback) => {

  const [crud, setCrud] = useState({})

  const handlePost = () => {

  }

  const handlePut = () => {

  }

  const handleDelete = () => {
    
  }

  return [
    handlePost,
    handlePut,
    handleDelete,
    crud
  ]

}

export default useForm 
