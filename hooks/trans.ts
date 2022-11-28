import { useIntl } from 'react-intl'

export function useTrans(): (id: string, values?: Record<string, any>) => string {
  const { formatMessage } = useIntl()
  const trans = (id: string, values?: Record<string, any>) => {
    return formatMessage({ id }, values)
  }

  return trans
}
