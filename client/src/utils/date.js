// date
const current = new Date();
const month = current.toLocaleString("default", { month: "short" });
const day = current.toLocaleString("default", { weekday: "long" });
export const date = `${day}, ${current.getDate()} ${month} ${current.getFullYear()}`;
