import { IForm } from './interfaces';
declare const useForm: {
    ({ onSubmit }: {
        onSubmit: Function;
    }): IForm;
    displayName: string;
    __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "onSubmit": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
        };
    };
};
export default useForm;
