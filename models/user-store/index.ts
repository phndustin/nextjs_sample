import { UserModel, UserSnapshot } from './user'
import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model('UserStore')
  .props({
    user: types.maybeNull(UserModel),
    accessToken: types.maybeNull(types.string)
  })
  .actions((self) => ({
    setUser(user: UserSnapshot) {
      self.user = user
    },
    setAccessToken(accessToken: string) {
      self.accessToken = accessToken
    }
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
