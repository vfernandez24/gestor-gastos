import { useRef, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../../../storage'
import { initialSettings, Settings } from '../../../data/settingsData'
import { translations } from './translations'
import handleScroll from '../../../scroll'

type Props = {}

// Resetea TODOS los datos del localStorage
function resetData () {
  const confirmation = confirm(
    '¿Estás seguro? Borrarás todos los datos sin opción de recuperarlos'
  )

  if (confirmation) {
    localStorage.removeItem('transactions')
    localStorage.removeItem('categories')
    localStorage.removeItem('settings')
    localStorage.removeItem('firstTime')

    window.location.href = '../home/home.html'
  }
}


function AjustesApp ({}: Props) {
  const settings = loadFromStorage('settings', initialSettings)
  const [newSettings, setNewSettings] = useState<Settings>(settings)
  const [isChanged, setIsChanged] = useState(false)
  const [pinActive, setPinActive] = useState(settings.pinActive)

  // Traducciones
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

  // Actualizar los ajustes temporales
  function updateNewSettings (value: string, data: string) {
    console.log('valor: ' + value)
    const updatedSettings = {
      ...newSettings,
      [data]: value
    }

    setNewSettings(updatedSettings)
    setIsChanged(true)
  }

  // Actualizar los ajustes del localStorage
  function updateSettings () {
    saveToStorage('settings', newSettings)
    window.location.reload()
  }

  // Resetear todos las transacciones del localStorage
  function resetTransactions () {
    const confirmation = confirm(
      '¿Estás seguro? Borrarás todos las transacciones sin opción de recuperarlos'
    )

    if (confirmation) {
      localStorage.removeItem('transactions')
      localStorage.removeItem('categories')
      const updatedSettings: Settings = {
        ...newSettings,
        gastos: 0,
        ingresos: 0,
        saldo: 0
      }
      saveToStorage('settings', updatedSettings)

      window.location.reload()
    }
  }

  // Exportar los datos
  function saveData () {}

  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)
  const section4Ref = useRef<HTMLDivElement>(null)
  const section5Ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <h1
        className='py-3 text-4xl font-semibold'
        style={{
          color: settings.tema == 'light' ? settings.color : settings.colorDark
        }}
      >
        {String(t('encabezado'))}
      </h1>
      <div className='relative w-full h-full grid md:grid-cols-[auto_1fr] max-md:grid-cols-[1fr] gap-x-4'>
        <button
          onClick={updateSettings}
          className={`${
            isChanged == true ? null : 'hidden'
          } fixed px-6 py-3 rounded-md cursor-pointer top-[100px] max-md:right-[20px] md:right-10 bg-secondary text-text`}
        >
          {String(t('button'))}
        </button>
        <aside
          className={`h-full w-[250px] border-r-2 ${
            settings.tema == 'light' ? 'border-gray-300' : 'border-gray-500'
          } flex flex-col items-end justify-start pr-5 max-lg:hidden`}
        >
          <a
            onClick={() => handleScroll(section1Ref)}
            className={`sticky top-[10px] cursor-pointer h-[60px] flex items-center text-right text-2xl font-semibold ${
              settings.tema == 'light' ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {String(t('a.a1'))}
          </a>
          <a
            onClick={() => handleScroll(section2Ref)}
            className={`sticky top-[75px] cursor-pointer h-[60px] flex items-center text-right text-2xl font-medium ${
              settings.tema == 'light' ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {String(t('a.a2'))}
          </a>
          <a
            onClick={() => handleScroll(section3Ref)}
            className={`sticky top-[135px] cursor-pointer h-[60px] flex items-center text-right  text-2xl font-medium ${
              settings.tema == 'light' ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {String(t('a.a3'))}
          </a>
          <a
            onClick={() => handleScroll(section4Ref)}
            className={`sticky top-[195px] cursor-pointer h-[60px] flex items-center text-right  text-2xl font-medium ${
              settings.tema == 'light' ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {String(t('a.a4'))}
          </a>
          <a
            onClick={() => handleScroll(section5Ref)}
            className={`sticky top-[255px] cursor-pointer h-[60px] mt-2 flex items-center text-right text-2xl font-medium ${
              settings.tema == 'light' ? 'text-gray-800' : 'text-gray-400'
            }`}
          >
            {String(t('a.a5'))}
          </a>
        </aside>
        <div className='px-3'>
          <section ref={section1Ref}>
            <h1
              className={`py-3 text-3xl font-semibold`}
              style={{
                color:
                  settings.tema == 'light' ? settings.color : settings.colorDark
              }}
            >
              {String(t('a.a1'))}
            </h1>
            <Setting
              nombre={String(t('settings.0.h1'))}
              typeInput={
                <input
                  onChange={e => updateNewSettings(e.target.value, 'userName')}
                  className={`min-w-[250px] border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none`}
                  type='text'
                  defaultValue={settings.userName}
                ></input>
              }
              description={String(t('settings.0.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.1.h1'))}
              typeInput={
                <select
                  onChange={e => updateNewSettings(e.target.value, 'divisa')}
                  defaultValue={settings.divisa}
                  className={`min-w-[250px] border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none`}
                >
                  <option className='text-text' value='EUR'>
                    {String(t('settings.1.options.0'))} (EUR)
                  </option>
                  <option className='text-text' value='USD'>
                    {String(t('settings.1.options.1'))} (USD)
                  </option>
                  <option className='text-text' value='GBP'>
                    {String(t('settings.1.options.2'))} (GBP)
                  </option>
                  <option className='text-text' value='JPY'>
                    {String(t('settings.1.options.3'))} (JPY)
                  </option>
                  <option className='text-text' value='CAD'>
                    {String(t('settings.1.options.4'))} (CAD)
                  </option>
                  <option className='text-text' value='CHF'>
                    {String(t('settings.1.options.5'))} (CHF)
                  </option>
                  <option className='text-text' value='CNY'>
                    {String(t('settings.1.options.6'))} (CNY)
                  </option>
                  <option className='text-text' value='AUD'>
                    {String(t('settings.1.options.7'))} (AUD)
                  </option>
                  <option className='text-text' value='MXN'>
                    {String(t('settings.1.options.8'))} (MXN)
                  </option>
                  <option className='text-text' value='BRL'>
                    {String(t('settings.1.options.9'))} (BRL)
                  </option>
                  <option className='text-text' value='RUB'>
                    {String(t('settings.1.options.10'))} (RUB)
                  </option>
                  <option className='text-text' value='INR'>
                    {String(t('settings.1.options.11'))} (INR)
                  </option>
                  <option className='text-text' value='KRW'>
                    {String(t('settings.1.options.12'))} (KRW)
                  </option>
                </select>
              }
              description={String(t('settings.1.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.2.h1'))}
              typeInput={
                <select
                  onChange={e => updateNewSettings(e.target.value, 'idioma')}
                  defaultValue={settings.idioma}
                  className={`min-w-[250px] border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none`}
                >
                  <option className='text-text' value='es'>
                    Español 🇪🇸
                  </option>
                  <option className='text-text' value='en'>
                    English 🇺🇸🇬🇧
                  </option>
                  <option className='text-text' value='fr'>
                    Français 🇫🇷
                  </option>
                  <option className='text-text' value='de'>
                    Deutsch 🇩🇪
                  </option>
                  <option className='text-text' value='it'>
                    Italiano 🇮🇹
                  </option>
                  <option className='text-text' value='pt'>
                    Português 🇵🇹🇧🇷
                  </option>
                  <option className='text-text' value='zh'>
                    中文（简体中文 🇨🇳
                  </option>
                  <option className='text-text' value='ja'>
                    日本語 🇯🇵
                  </option>
                  <option className='text-text' value='ko'>
                    한국인 🇰🇷
                  </option>
                  <option className='text-text' value='ru'>
                    Русский 🇷🇺
                  </option>
                  <option className='text-text' value='ar'>
                    عربي 🇸🇦
                  </option>
                </select>
              }
              description={String(t('settings.2.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.3.h1'))}
              typeInput={
                <select
                  onChange={e =>
                    updateNewSettings(e.target.value, 'formatoFecha')
                  }
                  defaultValue={settings.formatoFecha}
                  className={`min-w-[250px] border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none`}
                >
                  <option className='text-text' value='DD/MM/AAAA'>
                    DD/MM/AAAA
                  </option>
                  <option className='text-text' value='MM/DD/AAAA'>
                    MM/DD/AAAA
                  </option>
                  <option className='text-text' value='AAAA/DD/MM'>
                    AAAA/DD/MM
                  </option>
                </select>
              }
              description={String(t('settings.3.h2'))}
              optional={true}
            />
          </section>
          <section className='mt-10' ref={section2Ref}>
            <h1
              className={`py-3 text-3xl font-semibold`}
              style={{
                color:
                  settings.tema == 'light' ? settings.color : settings.colorDark
              }}
            >
              {String(t('a.a2'))}
            </h1>
            <Setting
              nombre={String(t('settings.4.h1'))}
              typeInput={
                <select
                  onChange={e => updateNewSettings(e.target.value, 'tema')}
                  defaultValue={settings.tema}
                  className={`min-w-[250px] border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none`}
                >
                  <option className='text-text' value='light'>
                    {String(t('settings.4.options.0'))}
                  </option>
                  <option className='text-text' value='dark'>
                    {String(t('settings.4.options.1'))}
                  </option>
                </select>
              }
              description={String(t('settings.4.h2'))}
              optional={true}
            />
          </section>
          <section className='mt-10' ref={section3Ref}>
            <h1
              className={`py-3 text-3xl font-semibold`}
              style={{
                color:
                  settings.tema == 'light' ? settings.color : settings.colorDark
              }}
            >
              {String(t('a.a3'))}
            </h1>
            <Setting
              nombre={String(t('settings.6.h1'))}
              typeInput={
                <button
                  onClick={resetTransactions}
                  className={`border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none hover:bg-gray-300 transition`}
                >
                  {String(t('button1'))}
                </button>
              }
              description={String(t('settings.6.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.7.h1'))}
              typeInput={
                <button
                  onClick={saveData}
                  className={`border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none hover:bg-gray-300 transition`}
                >
                  {String(t('button2'))}
                </button>
              }
              description={String(t('settings.7.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.8.h1'))}
              typeInput={
                <button
                  onClick={saveData}
                  className={`border-none ${
                    settings.tema == 'light' ? 'bg-gray-200' : 'bg-[#d1d5db50]'
                  } h-[45px] p-3 rounded-md outline-none hover:bg-gray-300 transition`}
                >
                  {String(t('button3'))}
                </button>
              }
              description={String(t('settings.8.h2'))}
              optional={true}
            />
          </section>
          <section className='mt-10' ref={section4Ref}>
            <h1
              className={`py-3 text-3xl font-semibold`}
              style={{
                color:
                  settings.tema == 'light' ? settings.color : settings.colorDark
              }}
            >
              {String(t('a.a4'))}
            </h1>
            <Setting
              nombre={String(t('settings.9.h1'))}
              typeInput={
                <label className='relative inline-flex items-center mt-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked={settings.notificaciones}
                  />
                  <div
                    className={`w-16 h-8 duration-300 bg-transparent rounded-full group peer ring-2 ring-gray-300 after:duration-300 after:bg-gray-300 peer-checked:after:bg-primary peer-checked:ring-primary after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95`}
                  ></div>
                </label>
              }
              description={String(t('settings.9.h2'))}
              optional={true}
            />
            <Setting
              nombre={String(t('settings.10.h1'))}
              typeInput={
                <label className='relative inline-flex items-center mt-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    defaultChecked={settings.recordatorios}
                  />
                  <div
                    className={`w-16 h-8 duration-300 bg-transparent rounded-full group peer ring-2 ring-gray-300 after:duration-300 after:bg-gray-300 peer-checked:after:bg-primary peer-checked:ring-primary after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95`}
                  ></div>
                </label>
              }
              description={String(t('settings.10.h2'))}
              optional={true}
            />
          </section>
          <section className='mt-10' ref={section5Ref}>
            <h1
              className={`py-3 text-3xl font-semibold`}
              style={{
                color:
                  settings.tema == 'light' ? settings.color : settings.colorDark
              }}
            >
              {String(t('a.a5'))}
            </h1>
            <Setting
              nombre={String(t('settings.11.h1'))}
              typeInput={
                <label className='relative inline-flex items-center mt-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    className='sr-only peer'
                    onChange={e => {
                      updateNewSettings(String(e.target.checked), 'pinActive')
                      setPinActive(e.target.checked)
                    }}
                    defaultChecked={settings.pinActive}
                  />
                  <div className='w-16 h-8 duration-300 bg-transparent rounded-full group peer ring-2 ring-gray-300 after:duration-300 after:bg-gray-300 peer-checked:after:bg-primary peer-checked:ring-primary after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95'></div>
                </label>
              }
              description={String(t('settings.11.h2'))}
              optional={true}
            />

            <Setting
              nombre={String(t('settings.12.h1'))}
              typeInput={
                <label>
                  <input
                    disabled={Boolean(!pinActive)}
                    defaultValue={settings.pin}
                    type={Boolean(!pinActive) == false ? 'text' : 'password'}
                    onChange={e => updateNewSettings(e.target.value, 'pin')}
                    maxLength={4}
                    minLength={4}
                    className={`min-w-[250px] border-none h-[45px] p-3 rounded-md outline-none`}
                    style={{
                      background: newSettings.pinActive
                        ? settings.tema == 'light'
                          ? '#e5e7eb'
                          : '#d1d5db50'
                        : settings.tema == 'light'
                        ? '#f3f4f6'
                        : '#e8e8e9cb'
                    }}
                  />
                </label>
              }
              description={String(t('settings.12.h2'))}
              optional={pinActive}
            />
            <Setting
              nombre={String(t('settings.13.h1'))}
              typeInput={
                <button
                  onClick={resetData}
                  className={`border-none ${
                    settings.tema == 'light' ? 'bg-red-400' : 'bg-[#f0505069]'
                  } h-[45px] text-white p-3 rounded-md outline-none hover:bg-red-500 transition`}
                >
                  {String(t('button4'))}
                </button>
              }
              description={String(t('settings.13.h2'))}
              optional={true}
            />
          </section>
        </div>
      </div>
    </>
  )
}

type PropsSettings = {
  nombre: string
  description: string
  typeInput: JSX.Element
  optional: boolean
}

export function Setting ({
  description,
  nombre,
  typeInput,
  optional
}: PropsSettings) {
  return (
    <article className='mb-5'>
      <h3
        className={`text-2xl font-semibold text-${
          optional == true ? 'border' : 'gray-500'
        }`}
      >
        {nombre}
      </h3>
      <h4
        className={`pb-1 text-lg font-medium text-${
          optional == true ? 'border' : 'gray-500'
        }`}
      >
        {description}
      </h4>
      <div className='flex items-center'>{typeInput}</div>
    </article>
  )
}

export default AjustesApp
export { resetData }
