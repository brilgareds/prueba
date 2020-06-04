export class Response {
    public message: string;
    public data: string;
    public status: number;

    constructor(message: string = "", data: any = null, status: number = 200) {
      this.message = message;
      this.data = data;
      this.status = status;
    }
    get result() {
      return this;
    }
}