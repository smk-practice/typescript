import * as jQuery from 'jquery';
import { sleep } from '../sleep';

(($) => {
    const displayMessage = async(message: string, delay: number) => {
        await sleep(delay);
        alert(message);
    };

    $(function() {
        $('#btnShowMsg').click(function() {
            let msg: string = $('#txtMsg').val().toString();
            let delay: number = +$('#txtDelay').val();
            if(isNaN(delay)) 
                return;
            displayMessage(msg, delay);            
        });
    });
})(jQuery);
