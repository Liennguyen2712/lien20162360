export class DateHelper {
    static getDays(startDate: Date, endDate: Date): Date[] {
        let result: Date[] = [];

        if (startDate >= endDate) {
            return result;
        }

        let tmp = startDate;
        while (tmp <= endDate) {
            result.push(tmp);
            tmp = new Date(tmp);
            tmp.setDate(tmp.getDate() + 1);
        }
        return result;
    }

    static getYearMonth(d: Date) : number {
        if (d == null) return null;
        const rs = d.getFullYear + '' + d.getMonth;
        return +rs;
    }
}