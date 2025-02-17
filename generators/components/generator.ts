import { NodePlopAPI } from 'plop'

const generate = (answers: Record<string, string> | undefined) => {
  if (!answers) return []

  const { name, useTranslation } = answers
  const componentName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

  return [
    {
      type: 'add',
      path: `src/modules/common/components/${name}/${name}.component.tsx`,
      templateFile: './generators/components/templates/component.hbs',
      abortOnFail: true,
      data: {
        name,
        componentName,
        useTranslation
      }
    },
    {
      type: 'add',
      path: `src/modules/common/components/${name}/${name}.styles.tsx`,
      templateFile: './generators/components/templates/styles.hbs',
      abortOnFail: true,
      data: {
        name,
        componentName
      }
    },
    {
      type: 'add',
      path: `src/modules/common/components/${name}/index.tsx`,
      templateFile: './generators/components/templates/index.hbs',
      abortOnFail: true,
      data: {
        name,
        componentName
      }
    },
    {
      type: 'append',
      path: 'src/modules/common/components/index.ts',
      pattern: /(.*)/,
      template: `export * from './${name}'`
    }
  ]
}

export function componentGenerator(plop: NodePlopAPI): void {
  plop.setGenerator('NEW_COMPONENT', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of a new component?',
        validate: (value) => {
          if (!value?.trim()) {
            return 'Name is required property'
          }

          const isValid = /^[a-z]+(-[a-z]+)*$/.test(value)

          if (!isValid) {
            return 'Name must contain only lowercase letters and be separated by hyphens (e.g., "component", "component-name").'
          }

          return true
        }
      },
      {
        type: 'confirm',
        name: 'useTranslation',
        message: 'Select whether you want to setup useTranslation in this component'
      }
    ],
    actions: (answers) => [...generate(answers)]
  })
}
