export class WorkLog {
    employee:string;
    workTime:string[];

    constructor(employee:string, workTime:string[]){
        this.employee = employee;
        this.workTime = workTime;
    }
}