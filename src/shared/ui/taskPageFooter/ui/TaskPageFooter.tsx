import {FC} from 'react';
import {RightOutlined} from '@ant-design/icons';

interface TaskPageFooterProps {}

export const TaskPageFooter: FC<TaskPageFooterProps> = ({}) => {
    return (
        <div>
            <RightOutlined />
        </div>
    );
};
