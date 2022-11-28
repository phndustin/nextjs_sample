import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { AppStoreModel } from 'models/app-store'
import { MenuStoreModel } from 'models/menu-store'
import { UserStoreModel } from 'models/user-store'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  userStore: types.optional(UserStoreModel, {}),
  appStore: types.optional(AppStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
