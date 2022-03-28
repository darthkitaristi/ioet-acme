import { promises as fs } from 'fs'

class FileRepository{

    /**
     * Method that allows access to the information of the file.
     * @returns File data in string format.
     */
    async initReadFile(){
        const data = await fs.readFile('./src/assets/input.txt', 'utf8');
        return data;
    }
}

export default FileRepository;
