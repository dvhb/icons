function template({ template }, opts, { componentName, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
    import React from 'react';
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    export default ${componentName};
  `;
}
module.exports = template;
