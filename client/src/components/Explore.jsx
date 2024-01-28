import React from 'react'
import Search from './ExploreComponents/Search'
import Type from './ExploreComponents/Type'
import For from './ExploreComponents/For'
import Room from './ExploreComponents/Room'


export default function Explore() {
  return (
    <div>
        <div className='relative flex flex-col justify-center items-center p-4'>
            <img src="./src/assets/images/real2.png" alt="Houses" className='h-64 w-3/4 rounded-3xl'/>
            <div className='absolute -bottom-10 w-2/4 bg-white3 h-32 rounded-3xl p-4 flex flex-col space-y-3'>
                <div className='flex flex-row justify-left space-x-5'>
                    <Search/>
                    <Type/>
                    <For/>
                    <Room/>
                </div>
                <div className='flex flex-row justify-left space-x-5'>
                    <div className='mt-1 relative w-auto cursor-default text-left overflow-hidden rounded-lg text-sm py-2 pl-4 pr-4 bg-white shadow-md'>
                        <p className='text-black'>Min Price: $100k</p>
                    </div>
                    <div className='mt-1 relative w-auto cursor-default text-left overflow-hidden rounded-lg text-sm py-2 pl-4 pr-4 bg-white shadow-md'>
                        <p className='text-black'>Max Price: $300k</p>
                    </div>
                    <div className='mt-1 relative w-auto cursor-default text-left overflow-hidden rounded-lg text-sm py-2 pl-4 pr-4 bg-white shadow-md'>
                        <p className='text-black'>Room Area: 30 sq.ft </p>
                    </div>
                    <div className='mt-1 relative w-auto cursor-default text-left overflow-hidden rounded-lg text-sm py-2 pl-4 pr-4 bg-white shadow-md'>
                        <p className='text-black'>More filters </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}