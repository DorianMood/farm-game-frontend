const numstr = (n:number, text_forms: string[]) => {
    const m = Math.abs(n) % 100;
    const n1 = m % 10;
    if (m > 10 && m < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
};

export const formatDate = (duration?: number) => {
    if (!duration) {
        return duration
    }

    const seconds = Math.floor((duration / 1000));
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));
    const months = Math.floor((duration / (1000 * 60 * 60 * 24 * 12)));

    if (months) {
        return `${months} ${numstr(months, ['месяц', 'месяца', 'месяцев'])}`
    }
    if (days) {
        return `${days} ${numstr(days, ['день', 'дня', 'дней'])}`
    }
    if (hours) {
        return `${hours} ${numstr(hours, ['час', 'часа', 'часов'])}`
    }
    if (minutes) {
        return `${minutes} ${numstr(minutes, ['минута', 'минуты', 'минут'])}`
    }
    if (seconds) {
        return `${seconds} ${numstr(seconds, ['секунда', 'секунды', 'секунд'])}`
    }

    return `${duration} мс`
}