/**
 * Created by Andrin on 31.01.2017.
 */
export class ArrayUtil {
  // Dies ist eine von GitHub kopierte Funktion (leicht angepasst) zur Erstellung mehrdimensionaler Arrays.
  public static createArray(length: number, lengthInner?: number): Array<String> { // Workaround mit zweitem Parameter, da TypeScript nicht eine beliebige Anz Param zulässt.
    var arr = new Array(length || 0),
      i = length;
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
    }
    return arr;
  }
}
