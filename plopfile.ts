import { NodePlopAPI } from 'plop'
import { componentGenerator } from 'generators'

export default function plopGenerators(plop: NodePlopAPI): void {
  componentGenerator(plop)
}
