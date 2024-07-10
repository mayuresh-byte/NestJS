import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signUp() {
        return {msg: 'I have singned up'}
    }

    signIn() {
        return {msg: 'I have singned in'}
    }
}