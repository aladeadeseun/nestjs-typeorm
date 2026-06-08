/* eslint-disable prettier/prettier */

export function formatErrors(validationErrors: any[], errors: Record<string, any> = {}) {
    validationErrors.forEach((error) => {
        if(error.constraints) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            errors[error.property] = Object.values(error.constraints);
        }
        if(error.children?.length){
            errors[error.property] = {};
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            formatErrors(error.children, errors[error.property]);
        }
    });
    return errors;
}

//export function sendSuccessResponse