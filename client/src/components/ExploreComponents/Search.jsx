import React, {Fragment, useState} from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const people = [
    { id: 1, name: 'Mumbai City' },
    { id: 2, name: 'Pune' },
    { id: 3, name: 'Mumbai Subarban' },
    { id: 4, name: 'Thane' },
    { id: 5, name: 'Navi Mumbai' },
    { id: 6, name: 'Ratnagiri' },
]

function Search() {
    const [selected, setSelected] = useState(people[0])
    const [query, setQuery] = useState('')
    
    const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')))
    return(
        <div>
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                        <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person) => person.name}
                        onChange={(event) => setQuery(event.target.value)}
                        style={{ outline: 'none', boxShadow: 'none' }}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <MagnifyingGlassIcon
                            className="h-5 w-5 text-black3"
                            aria-hidden="true"/>
                        </Combobox.Button>
                    </div>
                    <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none focus: sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : 
                            (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-blue3 text-white' : 'text-gray-900'
                                        }`
                                        }
                                        value={person}>
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                            >
                                            {person.name}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-blue3'
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default Search;