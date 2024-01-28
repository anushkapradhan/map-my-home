import React, {Fragment, useState} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const forType = [
    { name: 'Sale' },
    { name: 'Rent' },
    { name: 'PG' },
    { name: 'Co-living' },
]

function For() {
    const [selected, setSelected] = useState(forType[0])
  return (
    <div>
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">For: {selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                        className="h-5 w-5 text-black3"
                        aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {forType.map((typeTo, typeIdx) => (
                        <Listbox.Option
                            key={typeIdx}
                            className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue3 text-white' : 'text-gray-900'
                            }`
                            }
                            value={typeTo}
                        >
                            {({ selected }) => (
                            <>
                                <span
                                    className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {typeTo.name}
                                </span>
                                {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-blue3">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    </div>
  )
}

export default For;