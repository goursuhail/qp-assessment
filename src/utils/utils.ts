import * as _ from 'lodash';

export class Utils {
  static arrayToObject<T>(
    items: T[],
    key: string,
    fields?: string[],
  ): Record<string, T> {
    return items.reduce((map, item) => {
      map[_.get(item, key)] =
        fields && fields.length ? _.pick(item, fields) : item;

      return map;
    }, {});
  }
  static compile(template: string, variables?: Record<string, unknown>) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    const compiled = _.template(template);

    return compiled(variables);
  }

  static getTimestamp(date: Date) {
    return new Date(date).getTime();
  }

  static isUndefined(obj) {
    return obj === undefined;
  }

  static isNullOrUndefined(obj) {
    return obj === null || obj === undefined;
  }

  static convertTimeZone(date, tzString) {
    const data = new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString(
        'en-US',
        { timeZone: tzString },
      ),
    );
    return data.toISOString().substring(0, 10);
  }

  static getHours(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const difference = Math.abs(date2.getTime() - date1.getTime());
    const hourDifference = difference / 1000 / 3600;
    return hourDifference;
  }
  static getMinutes(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const difference = Math.abs(date2.getTime() - date1.getTime());
    const minuteDifference = difference / 60000;
    return minuteDifference;
  }
  static getSpecificDate(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static getUtcTimeStamp() {
    const currTimestamp = Date.now(),
      utcDateString = new Date(currTimestamp).toUTCString();
    return utcDateString;
  }
}
