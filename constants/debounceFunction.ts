type DebouncedFunction<T extends any[]> = (...args: T) => void;

const debounce = <T extends any[]>(
    func: (...args: T) => void,
    delay: number
): DebouncedFunction<T> => {
    let timer: NodeJS.Timeout;
    return (...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(null, args), delay);
    };
};

export default debounce