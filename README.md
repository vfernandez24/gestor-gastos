## React + Typescript + Vite + TailwindCSS3

# Activate tailwind dev

```bash
npx tailwindcss -i ./src/styles/index.css -o ./src/styles/output.css --watch
```

# !IMPOTANT
  <!-- TODO => OTRAS OPCIONES -->
  <!-- TODO => ANÁLISIS  -->

// Index general

# Cargar los datos

1. Importar

```ts
import React, { useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from './storage'
import {
  initialCategories,
  initialTransactions,
  initialSettings,
  Category,
  Transaction,
  Settings
} from './settingsData'
```

2. Declarar las constantes

```ts
const [categories, setCategories] = useState(() =>
  loadFromStorage('categories', initialCategories)
)
const [transactions, setTransactions] = useState(() =>
  loadFromStorage('transactions', initialTransactions)
)
const [settings, setSettings] = useState(() =>
  loadFromStorage('settings', initialSettings)
)

useEffect(() => {
  saveToStorage('categories', categories)
  saveToStorage('transactions', transactions)
  saveToStorage('settings', settings)
}, [categories, transactions, settings])
```

# Cargar las traducciones

1. Importar los datos

```ts
import { translations } from './transaltions'
```

2. Crear el archivo con las traducciones

```ts
export const translations = {
  es: {},

  en: {},

  fr: {},

  de: {},

  it: {},

  pt: {},

  zh: {},

  ja: {},

  ko: {},

  ru: {},

  ar: {}
}
```

3. Crear la funcion

```ts
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
```

4. Usar la funcion

```tsx
<h1>{t('welcome.welcomeButton')}</h1>
```
