import { WorkLog } from '../interfaces/workLog';
import FileRepository from '../repository/fileRepository';

class FileFactory {

    private fileData:string = "";
    public transformedDataList:WorkLog[]=[];

    /**
     * Method that transform data file to array of work log.
     */
    async transformDataFileToObject(){
        await this.getDataFromFile();
        const fileDataList = this.fileData.split(/\r?\n/g);
        fileDataList.forEach((workTime:string) => {
            const getData:WorkLog = this.createObject(workTime);
            this.transformedDataList.push(getData)
        });
    }

    /**
     * Method that allows to fetch data from the file
     */
    async getDataFromFile(){
        let file = new FileRepository()
        const data = await file.initReadFile();
        this.fileData = data;
    }

    /**
     * Method that generates an object of type WorkTimw.
     * @param workLog Parameter defined for employee work log
     */
    createObject(workLog:string){
        const separateWorkLog:string[] = workLog.split("=");
        
        const employeeName:string = separateWorkLog[0];
        const workingTime:string = separateWorkLog[1];

        const workingTimeList = this.transformWorkingTimeToArray(workingTime)
        const workTimeObject:WorkLog = new WorkLog(employeeName, workingTimeList);
        return workTimeObject
    }

    /**
     * Method that extracts the working hours of employee and stores them in a array.
     * @param workingTime Parameter defined for employee working time.
     */
    transformWorkingTimeToArray(workingTime:string){
        let splitedWorkTime = workingTime.split(",")
        return splitedWorkTime;
    }

  
}

export default FileFactory;