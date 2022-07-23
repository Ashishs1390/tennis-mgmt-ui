import moment from 'moment';
export function getDateYYYYMMDD(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function getDateDDMMYYYY(date) {
    return moment(date).format('DD MMM YYYY');
}

export function getDateMMDDYY(date){
    return moment(date).format('MM-DD-YY')
}
export function getDateWithTime(date) {
    // return moment(date).format('YYYY-MM-DDTHH:mm:ss.sssZ');
    return date.toISOString();
}