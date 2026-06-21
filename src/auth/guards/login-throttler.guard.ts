/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard} from "@nestjs/throttler";


@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard{
    protected getTracker(req: Record<string, any>): Promise<string> {
        const email = req.body?.email ?? "anonymous"

        return Promise.resolve(`login-${email}`)
    }

    protected getLimit() : Promise<number> {
        return Promise.resolve(5)
    }

    protected getTtl(): Promise<number>{
        return Promise.resolve(60_000)
    }

    protected throwThrottlingException(): Promise<void>{
        throw new ThrottlerException(`Too many attempts. Please try again after 1 minute.`)
    }
}