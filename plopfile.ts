import { componentGenerator } from 'generators'

import type { NodePlopAPI } from 'plop'

export default function plopGenerators(plop: NodePlopAPI): void {
  componentGenerator(plop)
}
