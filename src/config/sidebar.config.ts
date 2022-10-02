import { IconType } from 'react-icons'
import { FiHome, FiSettings, FiStar } from 'react-icons/fi'
import { restrict } from '../router/routes'

export interface LinkItemProps {
  name: string
  icon: IconType
  to: string
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, to: restrict.dashboard },
  {
    name: 'Clientes',
    icon: FiStar,
    to: restrict.client,
  },
  {
    name: 'Clínicas',
    icon: FiStar,
    to: restrict.clinic,
  },
  {
    name: 'Colaboradores',
    icon: FiStar,
    to: restrict.employee,
  },
  {
    name: 'Estoque',
    icon: FiStar,
    to: restrict.stock,
  },
  { name: 'Configurações', icon: FiSettings, to: restrict.settings },
]
