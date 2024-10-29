import React from 'react';
// import {addMedia, clearMedia} from 'src/entities/Task/taskSLice.ts';
// import {useAppDispatch} from 'src/shared/utils/hooks/redux.ts';

const FormattedMessage: React.FC<{children: string}> = ({children}) => {
    return (
        <span
            dangerouslySetInnerHTML={{__html: children}}
            style={{
                maxWidth: '100%',
                whiteSpace: "pre-wrap", 
                lineHeight: '40px',
            }}
        />
    );
};

export default FormattedMessage;
