import dayjs from "dayjs";

export function formatTime(time: Date | string, format = 'YYYY.MM.DD') {
   return dayjs(time).format(format)
}
export const priceFormat = (price: number) => {
    return price.toLocaleString('ko-Kr');
}

