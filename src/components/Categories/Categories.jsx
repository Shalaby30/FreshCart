import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Categories() {
    const [Catogries, setCatogries] = useState([])
    

    async function getCategories() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            console.log(data.data)
            setCatogries(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    
  return (
    <section className='container mx-auto'>
        <h3 className='text-2xl font-bold mb-8'>Shop bty Category</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>

            {Catogries.map((category) => (
                <div key={category._id}>
                    <img src={category.image} onClick={() => console.log(category.name)} className='mb-2 h-250 hover:scale-110 transition-all p-3 object-cover w-full' alt={category.name} />
                    <h3 className='text-center '>{category.name}</h3>
                </div>
            ))}
            
        </div>

    </section>
  )
}
