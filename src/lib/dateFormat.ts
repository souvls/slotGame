export function timestampToDate(timestamp: string) {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().slice(0, 10); // yyyy-mm-dd
    const formattedTime = date.toTimeString().slice(0, 8); // hh:mm:ss
    return `${formattedDate} ${formattedTime}`;
}