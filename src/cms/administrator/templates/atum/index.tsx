import type { PropsWithChildren } from 'react';

const Atum = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <h2 className="text-2xl font-bold leading-loose">Atum - [Administrator Template]</h2>
            {children}
        </div>
    );
};

export default Atum;
