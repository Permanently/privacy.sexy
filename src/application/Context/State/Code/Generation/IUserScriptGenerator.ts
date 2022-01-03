import { IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';
import { IUserScript } from './IUserScript';

export interface IUserScriptGenerator {
    buildCode(context: IReadOnlyApplicationContext): IUserScript;
}
