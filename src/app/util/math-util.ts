/**
 * Created by Andrin on 27.01.2017.
 */
export class MATH_UTIL {
  static getPercent(value: number, from: number) {
    if (typeof value !== 'number' || typeof from !== 'number') return 0;
    return (Math.abs(value) / Math.abs(from)) * 100;
  }
}
