export interface JIncludeModulesType {
    type: 'modules';
    name: string;
    style?: 'none' | 'card' | 'body'; // TODO
}

export function JIncludeModules({ name: position }: JIncludeModulesType) {
    return <div>TODO: modules for {position}</div>;
}
