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

export const debounce = (func, delay) => {
    let debounceHandler;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceHandler);
        debounceHandler = setTimeout(() => func.apply(context, args), delay);
    };
};

export const throttle = (func, limit,context) => {
    let inThrottle;
    return (...args)=> {
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};