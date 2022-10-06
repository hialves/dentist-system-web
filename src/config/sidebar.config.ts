import { IconType } from 'react-icons'
import { FiHome, FiSettings, FiStar } from 'react-icons/fi'
import { restrict } from '../router/routes'

export interface LinkItemProps {
  name: string
  icon: IconType
  to: string
}
export const LinkItemsClinic: Array<LinkItemProps> = [
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
  {
    name: 'Mudar clínica',
    icon: FiStar,
    to: restrict.selectClinic,
  },
  { name: 'Configurações', icon: FiSettings, to: restrict.settings },
]

export const LinkItemsNoClinic: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, to: restrict.dashboard },
  {
    name: 'Selecionar clínica',
    icon: FiStar,
    to: restrict.selectClinic,
  },
]
