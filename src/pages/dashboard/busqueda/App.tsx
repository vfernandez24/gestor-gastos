import React, { useState } from 'react'
import { loadFromStorage } from '../../../storage'
import {
  initialCategories,
  initialTransactions,
  initialSettings,
  Transaction
} from '../../../data/settingsData'
import { translations } from './translations'
import { translationsCat } from '../../../data/translationsCat'
import Mov from '../../../components/Mov'

type Props = {
  functionEdit: () => void
  functionDelete: () => void
}

const Search = ({ functionDelete, functionEdit }: Props) => {
  const categories = loadFromStorage('categories', initialCategories)
  const transactions = loadFromStorage('transactions', initialTransactions)
  const settings = loadFromStorage('settings', initialSettings)

  const t = (path: string) => {
    const idioma = settings.idioma as keyof typeof translations
    const keys = path.split('.')
    let value: any = translations[idioma] ?? translations['en']

    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) return ''
    }

    return value
  }

  const tCat = (path: string) => {
    const idioma = settings.idioma as keyof typeof translationsCat
    const keys = path.split('.')
    let value: any = translationsCat[idioma] ?? translationsCat['en']

    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) return ''
    }

    return value
  }

  const [result, setResult] = useState<Transaction[]>([])
  const [criterio, setCriterio] = useState('')
  const [type, setType] = useState('search')
  const [resultValid, setResultValid] = useState(true)

  function buscar (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let filteredTransactions: Transaction[] = []

    switch (type) {
      case 'search':
        console.log('search')
        filteredTransactions = transactions.filter(mov =>
          mov.description.toLowerCase().includes(criterio.toLowerCase())
        )
        break
      case 'number':
        console.log('number')
        filteredTransactions = transactions.filter(
          mov => Math.round(mov.amount) === Math.round(Number(criterio))
        )
        break
      case 'type':
        console.log('type')
        filteredTransactions = transactions.filter(
          mov => mov.type.toLowerCase() === criterio.toLowerCase()
        )
        break
      case 'date':
        console.log('date')
        filteredTransactions = transactions.filter(mov => mov.date === criterio)
        break
      case 'category':
        console.log('category')
        filteredTransactions = transactions.filter(
          mov => mov.category === Number(criterio)
        )
        break
    }
    transactions.filter(mov =>
      mov.description.toLowerCase().includes(criterio.toLowerCase())
    )
    setResult(filteredTransactions)
    result.length < 1 ? setResultValid(false) : setResultValid(true)
  }

  return (
    <>
      <h1
        className='py-3 text-4xl font-semibold'
        style={{
          color: settings.tema == 'light' ? settings.color : settings.colorDark
        }}
      >
        {String(t('h1'))}
      </h1>
      <form
        className='lg:flex max-lg:grid max-lg:grid-rows[1fr_1fr] max-lg:grid-cols[1fr] max-lg:gap-y-2 w-full gap-[2%]'
        onSubmit={buscar}
      >
        <div className='lg:flex max-md:flex max-lg:grid max-lg:grid-cols-[1fr_3fr] max-lg:gap-x-2 justify-between max-md:flex-col max-md:gap-2 lg:w-4/5 max-lg:w-full'>
          <select
            required
            onChange={e => setType(e.target.value)}
            className={`lg:w-[25%] max-lg:w-full max-md:w-full border-none ${
              settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
            } max-lg:h-[50px] lg:h-[60px] lg:p-5 max-lg:p-2 rounded-md outline-none`}
          >
            <option className='text-text' value='search'>
              {String(t('filtros.0'))}
            </option>
            <option className='text-text' value='number'>
              {String(t('filtros.1'))}
            </option>
            <option className='text-text' value='type'>
              {String(t('filtros.2'))}
            </option>{' '}
            {/* Select */}
            <option className='text-text' value='date'>
              {String(t('filtros.3'))}
            </option>
            <option className='text-text' value='category'>
              {String(t('filtros.4'))}
            </option>{' '}
            {/* Select */}
          </select>
          {type !== 'type' && type !== 'category' ? (
            <input
              required
              type={type}
              defaultValue={''}
              step={type === 'number' ? '0.01' : undefined}
              onChange={e => setCriterio(e.target.value)}
              className={`max-lg:w-full lg:w-[70%] border-none ${
                settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
              } max-lg:h-[50px] lg:h-[60px] max-lg:p-2 lg:p-5 rounded-md outline-none`}
            />
          ) : (
            <select
              required
              value={criterio}
              onChange={e => setCriterio(e.target.value)}
              className={`max-md:w-full md:w-[70%] border-none ${
                settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
              } max-lg:h-[50px] lg:h-[60px] max-lg:p-2 lg:p-5 rounded-md outline-none`}
            >
              <option value='none' className='text-text'>
                --
              </option>
              {type == 'category' ? (
                <>
                  {categories.map(cat => (
                    <option className='text-text' value={cat.id}>
                      {String(tCat(String(cat.id)))}
                      {cat.id == 8 ? ' (' + t('options.0') + ')' : null}
                      {cat.id == 17 ? ' (' + t('options.1') + ')' : null}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  <option className='text-text' value='ingreso'>
                    {t('options.0')}
                  </option>
                  <option className='text-text' value='gasto'>
                    {t('options.1')}
                  </option>
                </>
              )}
            </select>
          )}
        </div>
        <button
          className='lg:w-[18%] max-lg:w-full max-lg:h-[50px] lg:h-[60px] bg-secondary font-semibold text-white max-lg:rounded-xl lg:rounded-md'
          type='submit'
        >
          {String(t('button'))} <i className='fa-solid fa-search'></i>
        </button>
      </form>
      <ul className='w-full h-full py-3'>
        {result.map((mov, index) => (
          <Mov
            categories={categories}
            deleteFunction={functionDelete}
            editFunction={functionEdit}
            index={index}
            mov={mov}
            settings={settings}
            key={index}
          />
        ))}
        {resultValid == false ? (
          <div className='flex flex-col items-center justify-center w-full h-full gap-2'>
            <div className='flex items-center justify-center w-10 h-10 p-6 border-2 border-gray-300 rounded-full'>
              <i className='fa-solid fa-question'></i>
            </div>
            <span className='text-xl'>{String(t('no'))}</span>
          </div>
        ) : null}
      </ul>
    </>
  )
}

export default Search
