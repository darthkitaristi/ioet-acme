import { WorkLog } from "../interfaces/workLog";
import Calculator from "./calculator";
import FileFactory from "../utils/fileFactory";

export class AppService {
    private fileFactory:FileFactory = new FileFactory();
    private calculator:Calculator = new Calculator();
    public outputTable:string[] = []

    /**
     * Method that generates the table of pairs of employees who worked at the same time.
     */
    async generateTable(){
        await this.fileFactory.transformDataFileToObject();
        const transformedDataList:WorkLog[] = this.fileFactory.transformedDataList;
        const coincidences = this.calculator.findCoincidences(transformedDataList);
        console.log("Output 1:\n")
        for (const key in coincidences) {
            console.info(key+"="+coincidences[key])
            this.outputTable.push(key+"="+coincidences[key])
        }
    }

}
module.exports = AppService;