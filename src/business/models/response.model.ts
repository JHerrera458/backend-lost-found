export class ResponseModel {

    constructor(public ok: boolean, public message: string, public info: any | any[]) {
        this.ok = ok
        this.message = message
        this.info = info
    }
}