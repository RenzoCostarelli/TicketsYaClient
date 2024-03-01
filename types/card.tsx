export interface BasicCard {
    id: string;
    title: string;
    description: string;
    image: string | null;    
}

export interface HomeCard extends BasicCard {
    dates: string | null;
    location: string;
}

export interface DashboardCard extends BasicCard {}
