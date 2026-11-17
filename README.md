# Next.js Joomla Clone

NJC - Next Joomla Clone
 
## Component folder structure

```ts
|_provider
|__<name>Provider.tsx
|_src
|__Controller // server actions
|____<ControllerName>Controller.ts  
|__Hook // Model 
|____<HookName>
|______use<HookName>.ts
|__View // client actions
|____<ViewName>View.ts
|_tmpl
|__<name>
|____components
|______<component_name>.tsx
|____default.tsx
|_index.ts // exports all from internal files
```