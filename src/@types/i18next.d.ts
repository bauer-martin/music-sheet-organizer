import 'i18next'

import common from '../locales/de/common.json'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common'
        resources: {
            common: typeof common
        }
    }
}
