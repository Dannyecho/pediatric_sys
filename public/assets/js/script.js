var DiagnosticSysJS = {
    serverBaseURL: 'http://localhost:3000',
    init: function () {
        $('form#prompt-diagnose').on('submit', async function (e) {
            e.preventDefault();

            let textArea = $(this).find('textarea.prompt-input');
            let promptText = textArea.val();

            if (promptText.length) {
                try {
                    $('.preloader').addClass('active');
                    const response = await fetch(DiagnosticSysJS.serverBaseURL + '/diagnose', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ promptText })
                    });

                    // Add Prompt message
                    DiagnosticSysJS.addMessage( {
                        type: 'prompt',
                        text: promptText,
                    });

                    DiagnosticSysJS.sendBotMessage(await response.json());
                    // console.log( 'response', botMessage );
                } catch (error) {
                    $('.preloader').removeClass('active');
                    alert("Error generating response");
                    console.log("ERROR: ", error);
                }
            }
        });
    },
    addMessage: function(obj){
        if( obj.hasOwnProperty('type') ){
            let textArea = $('textarea.prompt-input');
            
            switch (obj.type) {
                case 'bot':
                    let text = this.formatText(obj.text);

                    $('#responses').append($(`<div class="bot-response">
                        <h4>Bot Response</h4>
                        ${text}
                        </div>`));
                    break;
                default:
                    let promptDiv = $(`<div class="prompt-text"></div>`);
                    promptDiv.html(`<p>${obj.text}</p>`);
                    textArea.prop("disabled", true);
                    
                    $('#responses').append(promptDiv);
                    break;
            }
        }
    },
    sendBotMessage: function (obj) {
        DiagnosticSysJS.addMessage( obj );
        
        // Enable text area
        $('form#prompt-diagnose').find( 'textarea.prompt-input' ).prop( 'disabled', false );
        $('.preloader').removeClass('active');

        // Scroll to the bottom
        /* $('body').animate({
            scrollTo: $(this).height(),
        }, 'slow'); */
    },
    formatText: function (text) {
        text = text.replace("\n", '<br>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<br><b>$1</b>');
        text = text.replace('*', "<br>");
        return text;
    }
};

DiagnosticSysJS.init();