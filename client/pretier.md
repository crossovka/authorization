"importOrder": [
  "<THIRD_PARTY_MODULES>",               // React, Next, библиотеки
  "^@/app/(.*)$",                        // Входные точки, обёртки
  "^@/redux/(.*)$",                      // Redux: store, slices, hooks
  "^@/hooks/(.*)$",                      // Кастомные хуки: useActions, useTypedSelector и пр.
  "^@/modules/(.*)$",                    // Фичи по FSD (auth, profile и пр.)
  "^@/components/_layouts/(.*)$",       // Layout-компоненты: Header, Sidebar
  "^@/components/elements/(.*)$",       // UI-элементы: Button, Input
  "^@/components/shared/(.*)$",         // Общие блоки: Modal, Spinner
  "^@/lib/(.*)$",                        // API и прочие утилиты
  "^@/constants/(.*)$",                 // Константы
  "^@/types/(.*)$",                      // Типы
  "^@/assets/(.*)$",                     // Изображения, иконки
  "^../(.*)$",                           // Относительные выше
  "^./(.*)$"                             // Относительные в текущей папке
]
