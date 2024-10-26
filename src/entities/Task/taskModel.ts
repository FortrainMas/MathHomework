export type Task = {
    id: number;
    isDaily: boolean;
    positionX: number;
    positionY: number;
    potentialPoints: string;
    status: string;
    title: string;
};

export interface TasksStages {
    [CLIENT_STAGES.ZERO]: Task[];
    [CLIENT_STAGES.ONE]: Task[];
    [CLIENT_STAGES.TWO]: Task[];
}

export enum CLIENT_STAGES {
    ONE = 'ONE',
    TWO = 'TWO',
    ZERO = 'ZERO',
}

export enum STAGES {
    DEVELOPE = 'DEVELOP',
    ONE = 'ONE',
    TEAMS_JOINING = 'TEAMS_JOINING',
    THREE = 'THREE',
    TWO = 'TWO',
    ZERO = 'ZERO',
}

export enum ANSWER_STATUSES {
    CORRECT = 'CORRECT',
    WRONG = 'WRONG',
    NOT_SENT = 'NOT_SENT',
    SENT_TO_CHECK = 'SENT_TO_CHECK',
}

export enum ANSWER_TYPES {
    COMMON = 'COMMON',
    MANUAL = 'MANUAL',
    MULTIPLE_ANSWERS = 'MULTIPLE_ANSWERS',
    DECREASING = 'DECREASING',
    FILE = 'FILE',
}

export enum TASK_STATUSES {
    LOCKED = 'LOCKED',
    AVAILABLE = 'AVAILABLE',
    COMPLETED = 'COMPLETED',
    SENT_TO_CHECK = 'SENT_TO_CHECK',
}

export type FullTask = {
    answerStatus: ANSWER_STATUSES;
    answerType: ANSWER_TYPES;
    content: string;
    filename: string;
    taskInfo: {
        id: number;
        isDaily: boolean;
        positionX: number;
        positionY: number;
        potentialPoints: string;
        solvedPoints: number;
        status: TASK_STATUSES;
        title: string;
    };
};
