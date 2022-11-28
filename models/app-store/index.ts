import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const AppStoreModel = types
  .model('AppStore')
  .props({
    loading: types.optional(types.boolean, false),
    isShowSidebar: types.optional(types.boolean, true)
  })
  .views((self) => ({}))
  .actions((self) => ({
    setLoading(loading: boolean) {
      self.loading = loading
    },
    showSidebar(isShow: boolean) {
      self.isShowSidebar = isShow
    }
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type AppStoreType = Instance<typeof AppStoreModel>
export interface AppStore extends AppStoreType {}
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>
export interface AppStoreSnapshot extends AppStoreSnapshotType {}
