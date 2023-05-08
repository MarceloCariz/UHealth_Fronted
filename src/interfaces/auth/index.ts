

export interface UserI {
    user: UserInfoI;
}

export interface LoginI {
    email: string;
    password: string;
}

interface UserInfoI {
    username: string;
    email: string;
    role: string;
}

