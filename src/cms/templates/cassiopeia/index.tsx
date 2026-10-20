import type { PropsWithChildren } from 'react';

const Cassiopeia = ({children}: PropsWithChildren) => {
    return (
        <div>
            <h2 className="text-2xl font-bold leading-loose">
                Cassiopeia - [Site Template]
            </h2>
            {children}
        </div>
    );
};

export default Cassiopeia;