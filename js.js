      $(function () {
        $('#send_email_form').parsley({
            errorsContainer: function(pEle) {
                var $err = pEle.$element.closest('.form-group');
                return $err;
            }
        }).on('form:submit', function(event) {
          $('#loadingmessage').show();  // show the loading message.
          //emailto = jQuery('#emailto').val();
          //subject = jQuery('#subject').val();
          //body = jQuery('#body').val();
          jQuery.ajax({
              type: "POST",
              url: base_url + "panel/welcome/send_mail",
              data: "to="+emailto+"&subject="+subject+"&body="+body,
              cache: false,
              dataType: "json",
              success: function (data) {
                  $('#loadingmessage').hide();
                  if (data == 2) {
                    toastr.error('<?= lang('field_empty'); ?>');
                  }else if (data == 1) {
                    toastr.info('<?= lang('email_sent'); ?>');
                  }else{
                    toastr.error('<?= lang('email_not_sent'); ?>');
                  }
              }
          });
          return false;

        });
        $('#send_quicksms').parsley({
            errorsContainer: function(pEle) {
                var $err = pEle.$element.closest('.form-group');
                return $err;
            }
        }).on('form:submit', function(event) {
          dta = $('#send_quicksms').serialize();
          jQuery.ajax({
              type: "POST",
              url: base_url + "panel/reparation/send_sms",
              data: dta,
              cache: false,
              dataType: "json",
              success: function(data) {
                  if(data.status == true) toastr['success']("<?= $this->lang->line('quick_sms');?>", '<?= $this->lang->line('sms_sent');?>');
                  else toastr['error']("<?= $this->lang->line('quick_sms');?>", '<?= $this->lang->line('sms_not_sent');?>');
              }
          });
          return false;
        });
    });
