import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { defaultLanguage } from 'utils'

export const UserModel = types.model('User').props({
  id: types.maybe(types.number),
  username: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  language: types.optional(types.string, defaultLanguage),
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  isGoogle2fa: types.optional(types.boolean, false)
})

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
