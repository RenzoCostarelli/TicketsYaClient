export interface BasicCard {
    id: string;
    title: string;
    description: string;
    image: string;    
}

export interface HomeCard extends BasicCard {
    dates: string;
    location: string;
}

export interface DashboardCard extends BasicCard {}
