import moment from "moment";

export const countDays = (from, to) => {
    return moment(to).diff(from, "days") + 1;
};
