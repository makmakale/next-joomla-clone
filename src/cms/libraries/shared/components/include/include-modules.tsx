import { useModuleHelper } from '@/libraries/src/Module/ModuleHelper';
import { RenderModule } from '@/libraries/src/Module/ui';

export interface JIncludeModulesType {
    type: 'modules';
    name: string;
    style?: 'none' | 'card' | 'body'; // TODO
}

export function JIncludeModules({ name: position }: JIncludeModulesType) {
    const { getModules } = useModuleHelper();

    const modules = getModules(position);

    return (
        <>
            {modules.map(module => (
                <RenderModule key={module.id} module={module} />
            ))}
        </>
    );
}
