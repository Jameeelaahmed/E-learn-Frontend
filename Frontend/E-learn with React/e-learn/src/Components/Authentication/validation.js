export function isEmail(value){
    return value.includes('@')
}

export function isNotEmpty(value){
    return value.trim() !=='';
}

export function hasNumber(value){
    return value && value.split('').some(character => !isNaN(character));
}

export function hasMinLength(value,minlength){
    return value.length>=minlength;
}