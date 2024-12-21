// filters.js
import moment from 'moment';

export function formatDate(value) {
    if (value) {
        return moment(String(value)).format('MMMM Do YYYY, h:mm:ss a');
    }
}
