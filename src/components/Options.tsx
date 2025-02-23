import { useState } from 'react'
import { loadFromStorage } from '../storage'
import { initialSettings, Settings } from '../data/settingsData'

type Props = {
  editFunction: () => void
  deleteFunction: () => void
  indexMov: number
}

function Options ({ editFunction, indexMov, deleteFunction }: Props) {
  const settings: Settings = loadFromStorage('settings', initialSettings)

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  function edit () {
    localStorage.setItem('indexEdit', String(indexMov))
    editFunction()
  }

  function deletee () {
    localStorage.setItem('indexDelete', String(indexMov))
    deleteFunction()
  }

  return (
    <>
      <button
        onClick={toggleDropdown}
        className={`h-[35px] w-[35px] rounded-full ${
          settings.tema == 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700'
        }`}
      >
        <i className='fa-solid fa-ellipsis'></i>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 bottom-[100%] mt-2 ${
            settings.tema == 'light' ? 'bg-white' : 'bg-backgroundDark'
          } rounded-md shadow-lg`}
        >
          <button
            className={`flex items-center w-full gap-2 px-4 py-1 text-lg text-left ${
              settings.tema == 'light'
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-textDark hover:bg-gray-700'
            }`}
            onClick={edit}
          >
            <i className='fa-solid fa-pen-to-square'></i>
            Editar
          </button>
          <button
            className={`flex items-center w-full gap-2 px-4 py-1 text-lg text-left text-red-400 ${
              settings.tema == 'light'
                ? 'hover:bg-gray-100'
                : 'hover:bg-gray-700'
            }`}
            onClick={deletee}
          >
            <i className='fa-solid fa-trash'></i>
            Eliminar
          </button>
        </div>
      )}
    </>
  )
}

export default Options
