import { WorkLog } from "../interfaces/workLog";

export default class Calculator {
    private days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

    /**
     * Method that generates a list of pairs of employees who worked the same time.
     * @param workLogList Work log object.
     * @returns List of pairs of employees who worked the same time.
     */
    findCoincidences(workLogList:WorkLog[]){
        let groupByWorkingDay= this.groupByWorkDay(workLogList)
        const employeePairsList:string[] = this.compareTime(groupByWorkingDay)
        return this.countCoincidences(employeePairsList)
    }

    /**
     * Method that create creates an object that groups employees who worked for each day of the week.
     * @param workLogList work log object.
     * @returns object that groups employees who worked for each day of the week.
     */
    groupByWorkDay(workLogList:WorkLog[]){
        let groupByDay:any[]=[];
        this.days.forEach((day:string) => {
            let timeByDay:any[]=[];
            workLogList.forEach((workLog:WorkLog)=>{
                const hasCoincidences = this.checkDayCoincidences(day, workLog)
                if (hasCoincidences) {
                    timeByDay.push(hasCoincidences)
                }
            })
            groupByDay.push({ day:day, data:timeByDay })
        });
        return groupByDay;
    }

    /**
     * Method that allows to verify if an employee works on a specific day.
     * @param day Parameter defined for weekday.
     * @param workLog Parameter defined for a work log object.
     * @returns daily work log..
     */
    checkDayCoincidences(day:string, workLog:WorkLog){
        const workTimeList = workLog.workTime;
        let dailyWorkLog;
        workTimeList.forEach( (workTime:string) => {
            const getDay = workTime.substring(0,2);
            if (day === getDay) {
                dailyWorkLog={employee:workLog.employee, workingTime:workTime}  
            }
        });
        return dailyWorkLog;
    }

    /**
     * Method that compares when an employee coincides in the same work schedule.
     * @param groupByWorkingDay Parameter defined for object that groups employees by day.
     * @returns list of pairs of employees who agreed on the same work schedule.
     */
    compareTime(groupByWorkingDay:any){
        let employeePairsList:any[] = [];
        groupByWorkingDay.forEach((element:any) => {
            const {data} = element;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    const interval = data[i].workingTime 
                    if (i!=j && j>i) {
                        if (interval === data[j].workingTime) {
                            employeePairsList.push(data[i].employee+"-"+data[j].employee)
                        }    
                    }
                }
            };
        });
        
        return employeePairsList;
    }
    
     /**
     * Method that generates an object with the matches by group of employees.
     * @param employeePairsList Parameter defined for employee pairs list
     * @returns object of coincidences by employee.
     */
    countCoincidences(employeePairsList:string[]){
        const coincidences = employeePairsList.reduce((previusValue:any, currentData:any) => 
        (previusValue[currentData] = previusValue[currentData] + 1 || 1, previusValue), {});
        return coincidences;
    }
}