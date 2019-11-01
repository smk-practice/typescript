import * as $ from 'jquery';
const showMessage = (message: string, displaySelector?: string) => {
    if ((displaySelector !== null) && ($(displaySelector).length !== 0))
        $(displaySelector).text(message);
    else
        console.log(message);
} 

export const Lib = {
    showMessage: showMessage
}
export default Lib;
