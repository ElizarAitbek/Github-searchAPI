import React from 'react'
import { useAppSelector } from '../hooks/redux'

export const FavouritePage = () => {
  const { favourites } = useAppSelector(state => state.github);

  if (favourites.length === 0) return <h2 className='text-center m-4 font-bold '>No items yet</h2>

  return (
    <div className='flex justify-center p-10 mx-auto h-screen w-screen'>
      <ul className='list-none '>
      <h3 className='text-center font-bold mb-2 border-b-2'>Favourite repos</h3>
        {
          favourites.map(f => (
            <>
              <li key={f} className='mb-3 py-3 px-5 hover:bg-gray-500 hover:text-white transition-colors shadow-md bg-white'>
                <a href={f} target="_blank">
                  {f}
                </a>
              </li>
            </>

          ))
        }
      </ul>
    </div>
  )
}
