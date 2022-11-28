import { RootStoreModel, RootStore } from './root-store'
import { Environment } from '../environment'
import * as storage from 'utils/storage'
import { onSnapshot } from 'mobx-state-tree'
import { ROOT_STATE_STORAGE_KEY } from 'utils/constants'
import config from '../../config'

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  try {
    // load data from storage
    data = storage.load(ROOT_STATE_STORAGE_KEY) || {}
    rootStore = RootStoreModel.create(data, env)
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)
  }

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => {
    let newSnapShot = {}
    if (config.store && config.store.whitelist && config.store.whitelist.length > 0) {
      let entries = Object.entries(snapshot)
      // @ts-ignore
      entries = entries.filter(([name]) => config.store.whitelist.includes(name))
      newSnapShot = Object.fromEntries(entries)
    }
    storage.save(ROOT_STATE_STORAGE_KEY, newSnapShot)
  })

  return rootStore
}
