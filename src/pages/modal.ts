import * as jQuery from 'jquery';
import 'bootstrap';

(($) => {
    /**
     * When Document Ready
     */
    $(() => {
        initEvent();
    });
    /**
     * Event Initialize
     */
    const initEvent = () => {
        $('#btnModal').click(() => {
            modalButtonClick();
        });
    };
    /**
     * Handle Modal Button Click
     */
    const modalButtonClick = async(): Promise<void> => {
        let message = await showMessageModal();
        let error = '';

        if ((message === '') || (message === null)) {
            displayError('Message is empty');
            return;
        }

        let toUser = await showSendModal();
        if (toUser === null) {
            displayError('Receive user is empty');
            return;
        }

        if ((toUser.name === '') || (toUser.email === '')) {
            displayError('User name and email can not be empty');
            return;
        }
        displaySuccess(`Message Send To ${toUser.name}<${toUser.email}>:<p class="mt-2">${message}</p>`);
    }
    /**
     * Display Error Message
     * @param error Error Message
     */
    const displayError = (error: string) => {
        let $msgBlock = $('#messageBlock');
        $msgBlock.html(`<i class="fas fa-times-circle"></i>&nbsp;${error}`);
        $msgBlock.parents('.alert').removeClass('alert-success alert-danger alert-warning').addClass('alert-danger');
    }
    /**
     * Display Success Message
     * @param message Success Message
     */
    const displaySuccess = (message: string) => {
        let $msgBlock = $('#messageBlock');
        $msgBlock.html(`<i class="fas fa-check-circle"></i>&nbsp;${message}`);
        $msgBlock.parents('.alert').removeClass('alert-success alert-danger alert-warning').addClass('alert-success');
    }
    /**
     * Display Message Input Form
     */
    const showMessageModal = async(): Promise<string> => {
        return new Promise((resolve) => {
            let $modalElem = $('#modalPrompt');
            let $confirmButton = $('#btnModalConfirm')
            let $cancelButton = $('#btnModalCancel')
            let np: string = 'asyncModal';
            if ($modalElem.length === 0)
                return;                

            $confirmButton.off(`click.${np}`);
            $cancelButton.off(`click.${np}`);

            $modalElem.modal()
            .on('show.bs.modal', () => {
                $('#txtMessage').val('');                
            })
            .on('shown.bs.modal', () => {
                window.setTimeout(() => $('#txtMessage')[0].focus(), 100);                    
            })
            .on('hidde.bs.modal', () => {
                $confirmButton.off(`click.${np}`);
                $cancelButton.off(`click.${np}`);
            }); 

            let retVal: string = '';
            $confirmButton.on(`click.${np}`, () => {
                resolve($('#txtMessage').val().toString())
                $modalElem.modal('hide');
            });
            $cancelButton.on(`click.${np}`, () => {
                resolve(null);
                $modalElem.modal('hide');
            });
        });        
    }
    /**
     * Show Send input Form
     */
    const showSendModal = async(): Promise<{ name: string, email: string}> => {
        return new Promise((resolve) => {
            let $modalElem = $('#modalSend');
            let $sendButton = $('#btnSend')
            let $abortButton = $('#btnAbort')
            let np: string = 'asyncModal';
            if ($modalElem.length === 0)
                return;                

            $sendButton.off(`click.${np}`);
            $abortButton.off(`click.${np}`);

            $modalElem.modal()
            .on('show.bs.modal', () => {
                $('#txtName').val('');
                $('#txtMail').val('');
            })
            .on('shown.bs.modal', () => {                
                window.setTimeout(() => $('#txtName')[0].focus(), 100);
            })
            .on('hidde.bs.modal', () => {
                $sendButton.off(`click.${np}`);
                $abortButton.off(`click.${np}`);
            });

            let retVal: string = '';
            $sendButton.on(`click.${np}`, () => {
                resolve({
                    name: $('#txtName').val().toString(),
                    email: $('#txtMail').val().toString(),
                });
                $modalElem.modal('hide');
            });
            $abortButton.on(`click.${np}`, () => {
                resolve(null);
                $modalElem.modal('hide');
            });
        });
    }
})(jQuery);