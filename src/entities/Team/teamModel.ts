export type Team = {
    members: teamMember[];
    team_achievements: teamAchievement[];
    team_name: 'string';
};

type teamMember = {
    email: string;
    faculty: string;
    messenger_link: string;
    username: string;
};

type teamAchievement = {
    escription: string;
    image: string;
    title: string;
};

export type Invite = {
    id: number;
    status: string;
    userFrom: {
        email: string;
        faculty: string;
        messenger_link: string;
        username: string;
    };
    userTo: 'string';
};

export type TeamInfo = {
    members: [
        {
            email: string;
            faculty: string;
            messenger_link: string;
            username: string;
        }[],
    ];
    team_achievements: [
        {
            description: string;
            image: string;
            title: string;
        },
    ];
    team_name: string;
};
