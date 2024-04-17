export type User = {
    id: number;
    name: string;
    password?: string;
    role: string;
};

export type Users = {
    users: User[];
    isLoading: boolean;
};

export type Errors = {
    name?: string,
    password?: string,
    role?: string,
}
