export const controlDataRadar = (array, typeRadar, key) => {

    return array[typeRadar].map(item => item[key]);

}
