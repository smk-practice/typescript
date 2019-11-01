export const sleep = async(time: number): Promise<void> =>  {
    return new Promise<void>((res, rej) => {
        setTimeout(res, time);
    });
}