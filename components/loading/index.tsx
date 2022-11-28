import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { useStores } from 'models'
import styles from './styles.module.scss'

function Loading() {
  const { appStore } = useStores()

  return (
    <div className={classNames(styles['loading-overlay'], { [styles['active']]: appStore.loading })}>
      <div>Loading...</div>
    </div>
  )
}

export default observer(Loading)