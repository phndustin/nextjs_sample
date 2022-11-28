import { MenuType } from 'api/service-type'

interface MenuType {
  icon?: string
  id: number
  name: string
  route?: string
  menu_parent_id?: number
}

export function getMenu(): Array<MenuType> {
  return [
    {
      id: 1,
      icon: 'dashboard',
      name: 'Dashboard',
      route: '/'
    }
  ]
}
