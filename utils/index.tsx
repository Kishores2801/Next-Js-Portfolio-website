import path from "path";

export const cx = (...classNames: (string | undefined | null | false)[]): string =>
    classNames.filter(Boolean).join(" ");



