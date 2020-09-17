import moment from 'moment';

export const formatDateBackend = (input: Date) => {
    return moment(input).format('YYYY-MM-DD');
};

export const formatDateMedium = (input: Date) => {
    return moment(input).format('ddd D MMM YYYY');
};

export const formatDateShort = (input: Date) => {
    return moment(input).format('DD MMM YYYY');
};

export const formatDateFull = (input: Date) => {
    return moment(input).format('dddd, MMMM Do YYYY');
};

const sanitiseInput = (input: Date | string): moment.Moment => {
    if (input instanceof Date) {
        return moment(input);
    } else {
        return moment.parseZone(input);
    }
};

export const formatDateTimeFull = (input: Date | string) => {
    return sanitiseInput(input).format('dddd, MMMM Do YYYY, HH:mm:ss');
};

export const formatTime = (input: Date | string) => {
    return sanitiseInput(input).format('HH:mm:ss');
};

export const isFutureDate = (input: moment.Moment) => {
    return input.isAfter(moment.now());
};
