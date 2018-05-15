import * as moment from "moment";

export class Binder {
    public static bindFloat(data: any): number { return parseFloat(data); }    
    public static bindInt(data: any): number { return parseInt(data); }
    public static bindMoment(data: any): moment.Moment { return moment(data); }
    public static bindDuration(data: any): moment.Duration { return moment.duration(data); }
}
