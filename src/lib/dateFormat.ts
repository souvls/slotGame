export function timestampToDate(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().slice(0, 10); // yyyy-mm-dd
    const formattedTime = date.toTimeString().slice(0, 8); // hh:mm:ss
    return `${formattedDate} ${formattedTime}`;
}
export const parseTimestamp = (timestamp: string): string => {
    if (timestamp.length !== 14) {
      throw new Error("Invalid timestamp format. Expected YYYYMMDDHHMMSS.");
    }
  
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(8, 10);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);
    const second = timestamp.substring(12, 14);
  
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  }