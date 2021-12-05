export default class AppError extends Error {
    public isOperationalError: boolean;
    public message: string;
    public code: number;
    public status: string;

    constructor(message: string, code: number) {
        super(message);
        this.isOperationalError = true;
        this.message = message;
        this.code = code;
        this.status = `${code}`.startsWith("4") ? "fail" : "error";
    }
}