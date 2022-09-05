/**
 * ****************************************************************************
 * COMMON CODE
 * COMMON.JS
 * 
 * 処理概要		:	common.js
 * 作成日		:	2022/04/22
 * 作成者		:	
 * @package		:	MODULE NAME
 * @copyright	:	Copyright (c)
 * @version		:	1.0.0
 * ****************************************************************************
 */

/*** CONSTANTS GLOBAL ***/
/*** example get value  CONSTANTS.delimiter ***/
const CONSTANTS = {
    'delimiter'     : '|#|@',
    'dateOption'    : {locale: 'ja',format: 'YYYY/MM/DD', minDate: '1899', maxDate: '9999'},
    'ymOption'      : {locale: 'ja',format: 'YYYY/MM', minDate: '1899', maxDate: '9999'},
    'msgDuplicate'  : typeof(_text) != 'undefined' && _text[8]!=undefined?_text[8]:'',
    'msgEmail'   	: typeof(_text) != 'undefined' && _text[11]!=undefined?_text[11]:'',
    'msgRequired'   : typeof(_text) != 'undefined' && _text[12]!=undefined?_text[12]:'',
    'msgEmpty'      : typeof(_text) != 'undefined' && _text[13]!=undefined?_text[13]:'',
    'pusherKey'     : '5433a1c2e2d98fb17386',
    'pusherCluster' : 'ap1',
}

var _PAGE_SIZE  = 10;
var _PAGE       = 1;
$(document).ready(function () {
    $('.c-header-toggler, .c-sidebar-minimizer').on('click', function () {
        $('#sidebar').toggleClass('active');
        if($('#sidebar').hasClass('active')){
            $('.c-wrapper').css('margin-left', '0px');
        }else{
            $('.c-wrapper').css('margin-left', '256px');
        }
    });
    $('.c-body').on('click', function () {
        if($('#sidebar').hasClass('active') && $( window ).width() <= 768){
            $('#sidebar').removeClass('active');
            $('.c-wrapper').css('margin-left', '0px');
        }
    });
    $(document).on('blur','input, select, textarea',function(){
        var msgRequired = '必須項目。';
        if(($(this).hasClass('required') || $(this).attr('required') == "required") && $(this).val() != '' && 
            ($(this).attr('has-balloontip-message') === msgRequired || $(this).hasClass('textbox-error'))){
            $(this).removeErrorStyle();
        }
    });
    $(document).on('change','input[type=checkbox]',function(){
        var msgRequired = '必須項目。';
        if($(this).is(':checked') && ($(this).hasClass('required') || $(this).attr('required') == "required")) {
            $(this).removeErrorStyle();
            $(this).next().find('.check_button-icon').tooltip("dispose");
        }
    });
    // refer staff information
    $(document).on('change','[data-search="staff-search"] .input-popup__staff-search',function(e){
        var $staffName   = $(this).val();
        var $obj = $(this);
        if($staffName == ''){
            $obj.closest('.group-item_search.popup').find('.id-popup__staff-search').val('');
            return false;
        }
        _referStaffIDFromStaffName($staffName, $obj, function(res2){
        });
    });
    //click button btn-close-error
    $(document).on('click','.btn-close-error',function(e){
        $(this).closest('div.msg').find('div.alert').remove();
        $(this).closest('div.msg').find('div.btn-close-error').remove();
    });

    //-----------------------------------------------------------
    //START: event for old list item
    //-----------------------------------------------------------
    //click radio/checkbox, show display item
    $(document).on('change',"input[type='radio'], input[type='checkbox']",function(){
        var isChecked =  $(this).is(":checked");
        var radioName = $(this).attr("name");
        var objParents = $(this).parents('div.start-lv2-group-lbl');
        objParents.find('div[data-displaycondition=2][data-displayconditionitem=' + radioName + ']').hide();
        objParents.find('div[data-displaycondition=2][data-displayconditionitem!=' + radioName + ']').show();
    });
    //check init
    var isLastRadioChecked  = $('.radio_button-container22_0').find("input[type='radio']").last().is(":checked");
    if(isLastRadioChecked){
        $("input[name='PurposeOther']").parent().parent().show();
    }else{
        $("input[name='PurposeOther']").parent().parent().hide();
    }
    //event radio click
    $('.radio_button-container22_0').find("input[type='radio']").change(function () {
        var isChecked =  $(this).is(":checked");
        var radioName = $(this).attr("name");
        var lastRadioName = $('.radio_button-container22_0').find("input[type='radio']").last().attr("name");
        if(isChecked) {
            $('.radio_button-container22_0').find('input[type=radio][name!=' + radioName + ']').prop('checked', false);
            if(lastRadioName == radioName){
                $("input[name='PurposeOther']").parent().parent().show();
            }else{
                $("input[name='PurposeOther']").parent().parent().hide();
            }
        }
    });
    //for 3th question
    $('.question_field_111 .check_button-input').change(function () {
        var isChecked = $(this).prop('checked');
        //question 1
        var childClass = $(this).data('child_class');
        if(isChecked === true) {
            $(this).parents('div.check_button-container').next().show();
            if(childClass != undefined && childClass != null && childClass != ''){
            $('.'+childClass).show();
            }
        }else {
            $(this).parents('div.check_button-container').next().hide();
            if(childClass != undefined && childClass != null && childClass != ''){
            $('.'+childClass).hide();
            }
        }
    });
    $('.question_field_113 .radio_button-input').change(function () {
        var radioVal = $(this).val();
        if(radioVal == '0') {
            $(this).parents('div.body-container_parent_2').next().find('div.question_body_check_name_1').hide();
            //show/hide input group, radio of question3th group1
            $(this).parents('div.body-container_parent_2').next().find('div.w-100.col-12').hide();
        }else {
            $(this).parents('div.body-container_parent_2').next().find('div.question_body_check_name_1').show();
            //show/hide input group, radio of question3th group1
            $(this).parents('div.body-container_parent_2').next().find('div.w-100.col-12').show();
        }
    });
    //-----------------------------------------------------------
    //END: event for old list item
    //-----------------------------------------------------------

    //2022/07/04 - hidden all item has data-displaycondition = 1 & 2
    $("[data-displaycondition='1']").each(function () {
        $(this).parents('div.class-for-show-hide-item').hide();
    });
    $("[data-displaycondition='2']").each(function () {
        $(this).parents('div.class-for-show-hide-item').hide();
    });
    //2022/07/04 - click radio/checkbox, show display item
    $(document).on('change','.radio_button-container:not(".question_body-inner_item") >input[type="radio"], input[type="checkbox"]',function(){
        var isChecked =  $(this).is(":checked");
        var radioName = $(this).attr("name");
        if(isChecked){
            $(this).parents('.body-container_parent').find('input[type=radio][name!=' + radioName + ']').prop('checked', false);
            $(this).parents('.body-container_parent').find('input[type=radio][name!=' + radioName + ']').trigger('change');
        }
    });
    //2022/07/04 - click radio/checkbox, show display item
    $(document).on('change','.start-lv2-group input[type="radio"], input[type="checkbox"]',function(){
        var isChecked =  $(this).is(":checked");
        var radioName = $(this).attr("name");
        var objParents = $(this).parents('div.start-lv2-group');
        if(isChecked){
            objParents.find('input[type=radio][name!=' + radioName + ']').prop('checked', false);
            objParents.find('input[type=radio][name!=' + radioName + ']').trigger('change');
        }
    });
    //2022/07/04 - click radio/checkbox, show display item
    $('input, select, textarea').each(function () {
        var itemAction = $(this);
        var displaycondition = $(this).data('displaycondition');
        var displayconditionitem = $(this).data('displayconditionitem');
        //add event for item
        if(displayconditionitem != undefined && displayconditionitem != ''){
            $('[name="'+displayconditionitem+'"]').on('change', function(){
                if($(this).is(':checked')){
                    if(displaycondition == '2'){
                        itemAction.parents('div.class-for-show-hide-item').hide();
                    }else{
                        itemAction.parents('div.class-for-show-hide-item').show();
                    }
                }else{
                    if(displaycondition == '2'){
                        itemAction.parents('div.class-for-show-hide-item').show();
                    }else{
                        itemAction.parents('div.class-for-show-hide-item').hide();
                    }
                }
            });
            if($('[name="'+displayconditionitem+'"]').is(':checked')){
                if(displaycondition == '2'){
                    itemAction.parents('div.class-for-show-hide-item').hide();
                }else{
                    itemAction.parents('div.class-for-show-hide-item').show();
                }
            }
            else {
                if(displaycondition == '2'){
                    itemAction.parents('div.class-for-show-hide-item').show();
                }else{
                    itemAction.parents('div.class-for-show-hide-item').hide();
                }
            }
        }
    });
    
});
$(document).ready(function() {
	try {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            error: function(response){
                window.location.href = '/login';
            }
        });    
        commonModule.init();
        //numeric class
        numericModule.init();
        //only-number class
        onlyNumberModule.init();
        //money Class
        moneyModule.init();
        //date Class
        dateModule.init();
        //Time
        timeModule.init();
        //Decimal class
        decimalModule.init();
	} catch (e) {
		console.log('ready' + e.message);
	}
});
/**
 * create numeric module
 * 
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var numericModule = (function () {
    function numericInit() {
        //keydown numeric
        $(document).on('keydown','input.time48,input.time24,input.time,input.numeric',function(event) {
            commonModule.onlyTypeNumber(event);
        });
        //input blur numeric
        $(document).on('blur', 'input.numeric', function() {
            try {
                if (!numberModule.isNumber($(this).val())) {
                    $(this).val('');
                }
            } catch (e) {
                console.log(e.message);
            }
        });
    }
    return {
        init: numericInit
    };

})();
/**
 * create only-number module
 * 
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var onlyNumberModule = (function () {
    function onlyNumberInit() {
        // input keydown only-number
        $(document).on('keydown','input.only-number',function(event) {
            try {
                commonModule.onlyNumberKeydown(event);
            } catch (e) {
                alert(e.message);
            }
        });
        //input blur only-number
        $(document).on('blur', 'input.only-number', function() {
            try {
                if (!numberModule.isNumber($(this).val())) {
                    $(this).val('');
                }
            } catch (e) {
                alert(e.message);
            }
        });
    }
    return {
        init: onlyNumberInit
    };

})();
/**
 * create money module
 * 
 * @author :
 * @params : obj
 * @return : 1.moneyModule.init()
             2.moneyModule.formatMoney('99999');
 * @access : public
 * @see :
 */
var moneyModule = (function () {
    function moneyInit() {
        // input keydown money
        $(document).on('keydown','input.money',function(event) {
            try {
                var negativeEnabled = false;
                if ($(this).attr('negative')) {
                    negativeEnabled = $(this).attr('negative');
                }
                if (event.keyCode == 229) {
                     $(this).val('');
                }
                if (event.keyCode == 53){
                    return true;
                }
                if (!((event.keyCode > 47 && event.keyCode < 58)
                        || (event.keyCode > 95 && event.keyCode < 106)
                        || event.keyCode == 116
                        || event.keyCode == 46
                        || event.keyCode == 37
                        || event.keyCode == 39
                        || event.keyCode == 8
                        || event.keyCode == 9
                        || event.ctrlKey //
                        || event.keyCode == 229 // ten-key processing
                        )
                        // || event.shiftKey
                        || (negativeEnabled == false
                                && event.keyCode == 189 || event.keyCode == 109)) {
                    event.preventDefault();
                }
                if (negativeEnabled && (event.keyCode == 189 || event.keyCode == 109)) {
                    var val         = $(this).val();
                    var negative    = '-' + val.replace(/-/g, '');
                    $(this).val(negative);
                }
               
            } catch (e) {
                console.log(e.message);
            }
        });
        // focus money item
        $(document).on('focus', 'input.money', function() {
            $(this).val($(this).val().replace(/,/g, ''));
            $(this).select();
        });
        // format money item
        $(document).on('blur', 'input.money', function() {
            if($(this).val() == ''){
                return;
            }
            var val = parseInt($(this).val());
            if (isNaN(val) || val == 0) {
                $(this).val('');
                return;
            }
            $(this).val(formatMoney(val));
        });
    }
    function formatMoney(num) {
        var str = num.toString(), parts = false, output = [], i = 1, formatted = null;
        if (str.indexOf(".") > 0) {
            parts = str.split(".");
            str = parts[0];
        }
        str = str.split("").reverse();
        for (var j = 0, len = str.length; j < len; j++) {
            if (str[j] != ",") {
                output.push(str[j]);
                if (i % 3 == 0 && j < (len - 1)) {
                    output.push(",");
                }
                i++;
            }
        }
        formatted = output.reverse().join("");
        return (formatted.replace('-,', '-') + ((parts) ? "." + parts[1].substr(0, 2) : ""));
    }
    return {
        init: moneyInit,
        formatMoney: formatMoney
    };
})();
/**
 * create date module
 * 
 * @author :
 * @params : obj
 * @return :   1. dateModule.init()
                2. dateModule.isYyyyMmDd('2017/03/13') = true
                3. dateModule.isYyyyMm('2017/01') = true
                4. dateModule.checkFromTo('2017/03/13', '2017/03/12') = false
 * @access : public
 * @see :
 */
var dateModule = (function () {
    function dateInit() {
        formatDatepicker();
        formatYearMonthPicker();

        //auto format date items when lose focus
        autoFormattingDate("input.datepicker");
        autoFormattingMonth("input.month");

        //input method for date class
        $(document).on('keydown','input.date, input.month',function(event) {
             //console.log(event.keyCode);
             if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                     // 9
                     || (event.keyCode > 95 && event.keyCode < 106) // numpad
                     // 0 ~
                     // numpad
                     // 9
                     || event.keyCode == 116 // F5
                     || event.keyCode == 46 // del
                     || event.keyCode == 35 // end
                     || event.keyCode == 36 // home
                     || event.keyCode == 37 // ←
                     || event.keyCode == 39 // →
                     || event.keyCode == 8 // backspace
                     || event.keyCode == 9 // tab
                     || event.keyCode == 191 // forward slash
                     || event.keyCode == 92 // forward slash
                     || event.keyCode == 111 // divide
                     || (event.shiftKey && event.keyCode == 35) // shift
                     // +
                     // end
                     || (event.shiftKey && event.keyCode == 36) // shift
             // +
             // home
             || event.ctrlKey // allow all ctrl combination
             ))
                     || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
             // Shift
             // +
             // [0~9]
             )
                 event.preventDefault();
        });
        //focus date
        $(document).on('focus', 'input.date', function(){
            var string = $(this).val();
            var reg = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}$/;
            if (string.match(reg)){
                $(this).val(string.replace(/\D/g,''));
            }
        });
        $(document).on('blur','input.date ',function() {
            var string = $(this).val();
            var reg1 = /^[0-9]{8}$/;
            var reg2 = /^[0-9]{4}[\/.][0-9]{2}[\/.][0-9]{2}$/;
            if (string.match(reg1)) {
                $(this).val(
                        string.substring(0, 4) + '/'
                                + string.substring(4, 6) + '/'
                                + string.substring(6));
            } else if (string.match(reg2)) {
                $(this).val(string);
            } else {
                $(this).val('');
            }
            if (!validateYyyyMmDd($(this).val())) {
                $(this).val('');
            }
        });
    }
    function validateYyyyMmDd(string) {
        if (string == '') {
            return true;
        }
        if (string.length == 8) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6) + '/'
                    + string.substring(6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29)$/;
        if (string.match(reg)) {
            return true;
        } else {
            return false;
        }
    }
    function validateFromToDate(from, to) {
        try {
            if (from != '' && to != '') {
                var fromDate = new Date(from);
                var toDate = new Date(to);
                if (fromDate.getTime() > toDate.getTime()) {
                    return false;
                }
            }
            return true;
        } catch (e) {
            alert('validateFromToDate:' + e.message);
        }
    }
    function validateYyyyMm(string) {
        if (string == '') {
            return true;
        }
        if (string.length == 6) {
            string = string.substring(0, 4) + '/' + string.substring(4, 6);
        }
        var reg = /^((19|[2-9][0-9])[0-9]{2})[- /.](0?[1-9]|1[012])$/;
        if (string.match(reg)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * format datepicker
     */
    function formatDatepicker(){

        $(".datepicker").each(function(){
            try{
                if($(this).hasClass('hasDatepicker')){
                    if($('#ui-datepicker-div').length>0)
                        $('#ui-datepicker-div').remove();
                    $(this).next('img').remove();
                    $(this).removeClass('hasDatepicker');
                    $(this).datepicker("destroy");
                }
            }catch(e){
                console.log('dapicker destroy '+e.message);
            }
        });

        $( ".datepicker:not(:disabled):not([readonly]):visible" ).datepicker({
            showOn: "button",
            buttonImage: "/assets/images/calendar-icon.ico",
            buttonText : '日付を選択してください',
            buttonImageOnly: true,
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            onSelect: function(d,i){
                if(d !== i.lastVal){
                    $(this).change();
                }
                $(this).focus();
            }
        });
        $( ".datepicker:disabled, .datepicker[readonly]" ).datepicker({
            showOn: "button",
            buttonImage: "/assets/images/calendar-icon.ico",
            buttonText : '日付を選択してください',
            buttonImageOnly: true,
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            disabled: true,
            onSelect: function(){
                $(this).focus();
            }
        });

    }
    /**
     * format year month picker
     */
    function formatYearMonthPicker(){

        if( $('input.month') &&  $('input.month').length > 0 ) {
            $('input.month').each(function(){
                if($(this).is('[readonly]') || $(this).is('[disabled]')){
                    $.appendYmpicker($(this),"","",true);
                } else {
                    $.appendYmpicker($(this));
                }
            });
        }

    }

    /**
     * format datepicker on lose focus
     */
    function autoFormattingDate(target){
        $(target).focusout(function(){
            var string = $(this).val();
            if(string.length == 8){
                string = string.substring(0, 4) + '/' + string.substring(4, 6) + '/' + string.substring(6);
            }
            var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[13578]|1[02])[\/.]31|((19|[2-9][0-9])[0-9]{2}[\/.](01|0[3-9]|1[0-2])[\/.](29|30))|((19|[2-9][0-9])[0-9]{2}[\/.](0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8]))|((((19|[2-9][0-9])(04|08|[2468][048]|[13579][26]))|2000)[\/.](02)[\/.]29)$/;
            if (string.match(reg)){
                $(this).val(string);
            } else {
                $(this).val('');
            }
        });
    }

    /**
     *
     * format year month on lose focus
     */
    function autoFormattingMonth(target){
        $(target).focusout(function(){
            var string = $(this).val();
            if(string.length == 6){
                string = string.substring(0, 4) + '/' + string.substring(4, 6);
            }
            var reg = /^((19|[2-9][0-9])[0-9]{2})[\/.](0[1-9]|1[0-2])$/;
            if (string.match(reg)){
                $(this).val(string);
            } else {
                $(this).val('');
            }
        });
    }
    return {
        init: dateInit,
        isYyyyMmDd: validateYyyyMmDd,
        isYyyyMm: validateYyyyMm,
        checkFromTo: validateFromToDate,
        formatDatepicker: formatDatepicker
    };

})();
/**
 * create time module
 * 
 * @author :
 * @params : obj
 * @return : 1.timeModule.init()
             2.timeModule.validateTime24('2400')
             3.timeModule.validateTime48('4800')
             4.timeModule.padZero('800',4)
             5.timeModule.changeType(1234, 's')
 * @access : public
 * @see :
 */
var timeModule = (function () {
    function timeInit() {
        //focus time
        $(document).on('focus', 'input.time48,input.time24', function() {
            $(this).val($(this).val().replace(/:/g, ''));
        });
        // input blur time24
        $(document).on('blur','input.time24',function() {
            var string = padZeroForTime($(this).val(), 4);
            var reg1 = /^((0[0-9])|([0-1][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
            var reg2 = /^((0[0-9])|([0-1][0-9])|(2[0-3]))[0-5][0-9]|[2][4][0][0]$/;
            if (string.match(reg1)) {
                $(this).val(string);
            } else if (string.match(reg2)) {
                $(this).val(string.substring(0, 2) + ':'+ string.substring(2, 4));
            } else {
                $(this).val('');
            }
            if (!validateTime24($(this).val())) {
                $(this).val('');
            }
        });
        // blur .time48
        $(document).on('blur','input.time48',function() {
            var string = padZeroForTime($(this).val(), 4);
            var reg1 = /^((0[0-9])|([1-3][0-9])|(4[0-7])):[0-5][0-9]|[4][8]:[0][0]$/;
            var reg2 = /^((0[0-9])|([1-3][0-9])|(4[0-7]))[0-5][0-9]|[4][8][0][0]$/;
            // var reg3 = /^[4][8][0][0]$/;
            if (string.match(reg1)) {
                $(this).val(string);
            } else if (string.match(reg2)) {
                $(this).val(string.substring(0, 2) + ':'+ string.substring(2, 4));
            } else {
                $(this).val('');
            }
            if (!validateTime48($(this).val())) {
                $(this).val('');
            }
        });
    }
    function validateTime24(string) {
        var reg = /^((0[0-9])|([1-3][0-9])|(2[0-3])):[0-5][0-9]|[2][4]:[0][0]$/;
        if (string.match(reg) || string == '') {
            return true;
        } else {
            return false;
        }
    }
    function validateTime48(string) {
        var reg = /^((0[0-9])|([1-3][0-9])|(4[0-7])):[0-5][0-9]|[4][8]:[0][0]$/;
        if (string.match(reg) || string == '') {
            return true;
        } else {
            return false;
        }
    }
    function padZeroForTime(string, maxLength) {
        var lengthOfString = string.length;
        if (string == '') {
            for (var i = 0; i < maxLength; i++) {
                string += '0';
            }
            return string;
        }

        if (lengthOfString == maxLength) {
            return string;
        }

        if (lengthOfString > maxLength) {
            for (var i = 0; i < maxLength; i++) {
                string = '0000';
            }
            return string;
        }

        if (lengthOfString == 1) {
            for(var i = 0; i < (maxLength - 3); i++) {
                string = "0" + string;
            }
            string = string +"00";
        } else if (lengthOfString == 2) {
            for(var i = 0; i < (maxLength - 4); i++) {
                string = "0" + string;
            }
            string = string + "00";
        } else if (lengthOfString == 3) {
            string = string + "0"
            for(var i = 0; i < (maxLength - 4); i++) {
                string = "0" + string;
            }
        } else {
            for (var i = 0; i < maxLength; i++) {
                string += '0';
            }
            return string;
        }
        return string;
    }
    function changeType(time, type) {
        try {
            time = parseInt(time, 10);
            //
            switch (type) {
            case 's':
                time = parseInt(time / 1000, 10);
                break;
            case 'm':
                time = parseInt(time / (1000 * 60), 10);
                break;
            case 'h':
                time = parseInt(time / (1000 * 60 * 60), 10);
                break;
            case 'd':
                time = parseInt(time / (1000 * 60 * 60 * 24), 10);
                break;
            default:
                break;
            }
            //
            return (time);
        } catch (e) {
            console.log('changeType : ' + e.message);
            return (0);
        }
    }
    return {
        init: timeInit,
        validateTime24: validateTime24,
        validateTime48: validateTime48,
        padZero: padZeroForTime,
        changeType: changeType
    };

})();
/**
 * create decimal module
 * 
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var decimalModule = (function () {
    function decimalInit() {
        $(document).on('keydown','input.decimal:enabled',function(e) {
            if (!((e.keyCode > 47 && e.keyCode < 58)
                || (e.keyCode > 95 && e.keyCode < 106)
                // ////////// PERIOD SIGN
                || ((e.keyCode == 190 || e.keyCode == 110) && $(this).val().indexOf('.') === -1)
                || e.keyCode == 173
                || e.keyCode == 109
                || e.keyCode == 189
                || e.keyCode == 116
                || e.keyCode == 46
                || e.keyCode == 37
                || e.keyCode == 39
                || e.keyCode == 8 
                || e.keyCode == 9
                || e.keyCode == 229 // ten-key processing
                || 
                ($.inArray(e.keyCode,[ 65, 67, 86, 88, 116 ]) !== -1 && e.ctrlKey === true)
                ||
                // Allow: Ctrl+A, C, X, V
                ($.inArray(e.keyCode,[9]) !== -1 && e.shiftKey === true)
                ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)
            )) {
                e.preventDefault();
                return false;
            }
            // check numeric is negative ?
            var negativeEnabled = $(this).attr('negative');
            if (e.keyCode != 116
                    && e.keyCode != 46
                    && e.keyCode != 37
                    && e.keyCode != 39
                    && e.keyCode != 8
                    && e.keyCode != 9
                    && e.keyCode != 173
                    && e.keyCode != 189
                    && e.keyCode != 109         
                    && ($(this).get(0).selectionEnd - $(this).get(0).selectionStart) < $(this).val().length 
                ) {
                // DEFAULT PARAMS (NUMERIC (10, 0))
                var ml = 10;
                var dc = 0;
                if (parseInt($(this).attr('maxlength')) * 1 > 2) {
                    //ml = 1 * $(this).attr('maxlength') - 1;
                    ml = 1 * $(this).attr('maxlength');
                }
                if (parseInt($(this).attr('decimal')) > 0) {
                    dc = 1 * $(this).attr('decimal');
                    if (dc >= ml - 1) {
                        dc = 0;
                    }
                }
                var it = (ml - (dc > 0 ? (dc + 1) : 0));
                // CURRENT STATES
                var val             = $(this).val();
                var negative        = val.indexOf('-') > -1;
                var selectionStart  = $(this).get(0).selectionStart;
                var selectionEnd    = $(this).get(0).selectionEnd;
                if (negative) {
                    val = val.substring(1);
                    selectionStart--;
                    selectionEnd--;
                }
                // OUTPUT STATES
                var destSelectionStart      = undefined;
                var destSelectionEnd        = undefined;
                var destVal                 = undefined;
                // SKIP PERIOD KEY WHEN DECIMAL = 0
                if (dc == 0 && (e.keyCode == 190 || e.keyCode == 110)) {
                    e.preventDefault();
                }
                // EXCEED THE ACCEPTED NUMBER OF INTEGERS
                if (val.match(new RegExp('[0-9]{' + it + '}')) && selectionStart <= it) {
                    // PERIOD DOES NOT EXIST
                    if (val.indexOf('.') === -1) {      
                        // PERIOD KEY NOT RECEIVED (USER FORGETS TO TYPE PERIOD) DECIMAL > 0
                        if (e.keyCode != 190 && e.keyCode != 110 && dc > 0) {
                            e.preventDefault();
                            //var output = val.substring(0,selectionStart) + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode) + val.substring(selectionStart);   
                            var output = '';
                            if(e.keyCode >= 96 && e.keyCode <= 105){
                                output = val.substring(0,selectionStart) + String.fromCharCode(e.keyCode - 48) + val.substring(selectionStart); 
                                destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));
                            }else if (e.keyCode == 229){
                                if ($.inArray(e.key,[ '0','1','2','3','4','5','6','7','8','9']) !== -1){
                                    output = val.substring(0,selectionStart) + e.key +val.substring(selectionStart);
                                }
                                if(output.substring(ml - (dc + 1)) != ''){
                                    destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));    
                                }else{
                                    destVal = output.substring(0, ml - (dc + 1));
                                }
                            }else{
                                output = val.substring(0,selectionStart) + String.fromCharCode(e.keyCode) + val.substring(selectionStart);          
                                destVal = output.substring(0, ml - (dc + 1)) + '.'+ output.substring(ml - (dc + 1));
                            }
                            // INSERT PERIOD    
                        }
                        // PERIOD EXISTS
                        // CARET STARTS NEXT TO THE PERIOD
                    } else if (selectionStart == val.indexOf('.')) {
                        // EXCEED THE ACCEPTED NUMBER OF
                        // DECIMALS
                        if (val.match(new RegExp('\\.[0-9]{'+ dc + '}$'))) {
                            e.preventDefault();
                        } else {
                            // JUMP TO THE NEXT POSITION THEN
                            // INSERT THE DIGIT
                            destSelectionStart = selectionStart + 1;
                        }
                        // CARET STARTS BEFORE THE PERIOD AND
                        // NOTHING HIGHLIGHTED
                    } else if (selectionStart < val.indexOf('.') && selectionStart == selectionEnd) {
                        e.preventDefault();
                        // CARET STARTS BEFORE THE PERIOD AND
                        // ENDS AFTER THE PERIOD (HIGHLIGHTS
                        // OVER THE PERIOD)
                    } else if (selectionEnd > val.indexOf('.') && selectionStart < val.indexOf('.')) {
                        e.preventDefault();
                        var output = '';
                        if(e.keyCode >= 96 && e.keyCode <= 105){
                            output  = val.substring(0,selectionStart)+ String.fromCharCode(e.keyCode - 48) + val.substring(selectionEnd);
                            destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                        }else if(e.keyCode == 229){
                            //output = val.substring(0,selectionStart)+ val.substring(selectionEnd);
                            if ($.inArray(e.key,[ '0','1','2','3','4','5','6','7','8','9']) !== -1){
                                output = val.substring(0,selectionStart) + e.key +val.substring(selectionStart);
                            }
                            if(output.substring(ml - (dc + 1)) != ''){
                                destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                            }else{
                                destVal = output.substring(0, ml - (dc + 1));
                            }
                        }else{
                            output  = val.substring(0,selectionStart)+ String.fromCharCode(e.keyCode) + val.substring(selectionEnd);
                            destVal = output.substring(0, ml - (dc + 1)) + '.' + output.substring(ml - (dc + 1));
                        }
                        //
                        destSelectionStart  = selectionStart + 1;
                        destSelectionEnd    = selectionStart + 1;
                    }                   
                    // INTEGERS CAN BE ADDED BUT...
                    // EXCEED THE ACCEPTED NUMBER OF DECIMALS
                } else if (val.match(new RegExp('\\.[0-9]{'+ dc + '}$'))) {
                    // PERIOD EXISTS
                    // CARET STARTS AFTER THE PERIOD
                    if (val.indexOf('.') != -1 && selectionStart > val.indexOf('.')) {
                        //e.preventDefault();
                    }
                }
                // CARET RESULT
                if(typeof destVal != undefined){
                    if (destVal && negative) {
                        destVal = '-' + destVal;
                    }
                    if (destVal) {
                        $(this).val(destVal);
                    }   
                }
                //
                if (negative && destSelectionStart) {
                    destSelectionStart++;
                }
                if (destSelectionStart) {
                    $(this).get(0).selectionStart = destSelectionStart;
                }
                if (negative && destSelectionEnd) {
                    destSelectionEnd++;
                }
                if (destSelectionEnd) {
                    $(this).get(0).selectionEnd = destSelectionEnd;
                }
            // when click [-]
            } else if (e.keyCode == 173 || e.keyCode == 109 || e.keyCode == 189) {
                //e.preventDefault();
                if (negativeEnabled) {
                    var val = $(this).val();
                    var negative = val.indexOf('-') > -1;
                    if (negative) {
                        $(this).val(val.substring(1));
                    } else {
                        $(this).val('-' + val);
                    }
                }
            }
            // fix maxlenght
            var val = $(this).val();
            if ($(this).attr('fixed') != undefined && val.indexOf('-') > -1) {
                var f_maxlenght = (parseInt($(this).attr('maxlengthfixed')) + 1) + '';
                if (val.length <= f_maxlenght) {
                    $(this).attr('maxlength', f_maxlenght);
                } else {
                    $(this).attr('maxlength', f_maxlenght);
                }
            } else if ($(this).attr('maxlength') > $(this).attr('maxlengthfixed')) {
                $(this).attr('maxlength',$(this).attr('maxlengthfixed'));
            }
        });

        // input method for decimal
        $(document).on('blur','input.decimal:enabled',function() {
            try {
                var negativeEnabled     = $(this).attr('negative');
                var val                 = $(this).val();
                //
                if (typeof val != undefined && val != ''){
                    var negative            = val.indexOf('-') > -1;
                    var negative_1          = val.indexOf('－') > -1;
                    /*if (negative || negative_1) {
                        val = val.substring(1);
                    }*/
                    var old = val;
                    val = val.replace('.', '');
                    val = old;
                    //
                    var dc = 1 * $(this).attr('decimal');
                    var result = parseFloat(val.replace(/,/g, ""));
                    if (result || result === 0) {
                        result = result.toFixed(dc);
                        if (result.indexOf('.') > -1) {
                            var integer = result.substring(0,result.indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var decimal = result.substring(result.indexOf('.'));
                            var ml = typeof $(this).attr('maxlength') != 'undefined' ? parseInt($(this).attr('maxlength')) : 0;
                            if(ml > 0 && integer.length > (ml-2)){
                                var num = ml-dc-1;
                                var tmp = $(this).val().replace('.', "");
                                integer = parseFloat(tmp.substring(0,num));
                                decimal = parseFloat('0.'+tmp.substring(num,num+dc));
                            }
                            val = integer + decimal;
                        } else {
                            val = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    } else {
                        val = '';
                    }
                    if(!isNaN(val)){
                        //
                        $(this).val((val != '' && val != '0' && val != 'NaN' && negativeEnabled && negative) ? ('-' + val) : val);  
                    }else{
                        $(this).val('');
                    }
                }
            } catch (e) {
                alert('Error input.decimal blur event: ' + e.message);
            }
        });
    }
    return {
        init: decimalInit
    };

})();
/**
 * create common module
 * 
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
var commonModule = (function () {
    function commonInit(){
        setTimeout(function () {
            setButtonRight();
        },120);
        
        //click left menu
        $(document).find('.sidebar-main-toggle').on('click',function() {
           $(window).resize(); 
        });
        $(window).resize(function() {
            //custom size of popup
            if($(this).colorbox != undefined){
                $(this).colorbox.resize({
                    innerWidth : '90%',
                    innerHeight : '90%'
                });
            }

            setTimeout(function () {
                setButtonRight();
            },120);
        });
        // blur input item
        $(document).on('blur','input, textarea',function() {
            if ($(this).val() != '' && $(this).hasClass('required') && $(this).attr('has-balloontip-message') == CONSTANTS.msgRequired) {
                $(this).removeClass('item-error');
                $(this).removeAttr('has-balloontip-message');
            }
        });
        // blur select item
        $(document).on('blur','select',function() {
            if (numberModule.toNumber($(this).val()) > 0) {
                $(this).removeClass('item-error');
                $(this).removeAttr('has-balloontip-message');
            }
        });
        //convert type to tel
        $(document).on('focus','input.numeric,input.money,input.time24,input.time48',function(e) {
            $(this).attr('type', 'tel');
        });
    }
    function  callWaiting(){
        $.blockUI({
            message: '<i class="icon-spinner2 spinner" style="font-size: 30px;"></i>',
            overlayCSS: {
                backgroundColor: '#1b2024',
                opacity: 0.5,
                zIndex: 1200,
                cursor: 'default'
            },
            css: {
                border: 0,
                color: '#fff',
                padding: 0,
                zIndex: 1201,
                backgroundColor: 'transparent'
            }
        });
    }
    function closeWaiting() {
        $.unblockUI({});
    }
    function onlyTypeNumber(event) {
        if ((!((event.keyCode > 47 && event.keyCode < 58) // 0 ~
                // 9
                || (event.keyCode > 95 && event.keyCode < 106) // numpad
                // 0 ~
                // numpad
                // 9
                || event.keyCode == 116 // F5
                || event.keyCode == 46 // del
                || event.keyCode == 35 // end
                || event.keyCode == 36 // home
                || event.keyCode == 37 // ←
                || event.keyCode == 39 // →
                || event.keyCode == 8 // backspace
                || event.keyCode == 9 // tab
                || event.keyCode == 188 // ,
                || event.keyCode == 190 // .
                || event.keyCode == 110 // numpad .
                || (event.shiftKey && event.keyCode == 35) // shift
                // +
                // end
                || (event.shiftKey && event.keyCode == 36) // shift
                // +
                // home
                || event.ctrlKey // allow all ctrl combination
                ))
                || (event.shiftKey && (event.keyCode > 47 && event.keyCode < 58)) // exlcude
        ){
            event.preventDefault();
        }
    }
    function onlyNumberKeydown(event) {
        var negativeEnabled = false;
        if ($(this).attr('negative')) {
            negativeEnabled = $(this).attr('negative');
        }
        // if (event.shiftKey) {
        // event.preventDefault();
        // }
        if (event.keyCode == 229) {
             $(this).val('');
        }
        if (event.keyCode == 53){
            return true;
        }
        if (!((event.keyCode > 47 && event.keyCode < 58)
                || (event.keyCode > 95 && event.keyCode < 106)
                || event.keyCode == 116
                || event.keyCode == 46
                || event.keyCode == 37
                || event.keyCode == 39
                || event.keyCode == 8 
                || event.keyCode == 9
                || event.ctrlKey // 20160404 - sangtk - allow all ctrl combination // 
                || event.keyCode == 229 // ten-key processing
                )
                // || event.shiftKey
                || (negativeEnabled == false
                        && event.keyCode == 189 || event.keyCode == 109)) {
            event.preventDefault();
        }
        if (negativeEnabled && (event.keyCode == 189 || event.keyCode == 109)) {
            var val         = $(this).val();
            var negative    = '-' + val.replace(/-/g, '');
            $(this).val(negative);
        }
    }
    function setButtonRight() {
        try {
            if ( $('.heading-elements#css-menu').is(':hidden') ) {
                    
                // check exist of button
                var checkExistBtn = ($('.heading-elements#css-menu').addClass('visible').find('.btn-link:not(:hidden)').length 
                                      + $('#wrapper-two-btn-2').find('.btn-link:not(:hidden)').length
                                    );
                
                // hidden when check
                $('.heading-elements#css-menu').removeClass('visible');
                // hidden icon when not exist
                if (checkExistBtn === 0) {
                    $('.heading-elements#css-menu').next('.icon-more').hide();
                } else {
                    if (checkExistBtn === 2) {
                        $('.heading-elements#css-menu').next('.icon-more').hide();
                    }

                    if ( $(window).outerWidth(true) <= 768 ) {
                        // check isset btn-link
                        if( $('#wrapper-two-btn .btn-link').length === 0 ){
                            $('#wrapper-two-btn #wrapper-two-btn-2').append($('.heading-elements#css-menu').addClass('visible').find('.btn-link:not(:hidden):lt(2)'));
                            $('.heading-elements#css-menu').removeClass('visible');
                            cssButtonWhenToLimit('tablet');
                        } else {
                            cssButtonWhenToLimit('tablet');
                        }
                    } else {
                        cssButtonWhenToLimit('pc');
                        if($('.heading-btn-group form#employee').length == 0) {
                            $('.heading-btn-group').prepend($('#wrapper-two-btn .btn-link'));
                        } else {
                            $('.heading-btn-group form#employee').prepend($('#wrapper-two-btn .btn-link'));
                        }
                        
                    }
                }
            } else {
                // check exist of button
                var checkExistBtn1 = $('.heading-elements#css-menu .btn-link:not(:hidden)').length;
                var checkExistBtn2 = $('#wrapper-two-btn .btn-link:not(:hidden)').length;
                // hidden icon when not exist
                if (checkExistBtn1 > 0 || checkExistBtn2 > 0) {
                    if ( $(window).outerWidth(true) <= 768 ) {
                        if( $('#wrapper-two-btn .btn-link').length === 0 ){
                            $('#wrapper-two-btn #wrapper-two-btn-2').append($('.heading-elements#css-menu').addClass('visible').find('.btn-link:not(:hidden):lt(2)'));
                            $('.heading-elements#css-menu').removeClass('visible');
                        } else {
                            cssButtonWhenToLimit('tablet');
                        }
                    } else {
                        cssButtonWhenToLimit('pc');
                        if($('.heading-btn-group form#employee').length == 0) {
                            $('.heading-btn-group').prepend($('#wrapper-two-btn .btn-link'));
                        } else {
                            $('.heading-btn-group form#employee').prepend($('#wrapper-two-btn .btn-link'));
                        }
                    }
                }
            }
        } catch (e) {
            console.log('setButtonRight: ' + e.message);
        }
    }
    function cssButtonWhenToLimit(type) {
        try {
            var width_page_header_content = $('.page-header-content').width();
            var width_title               = $('.page-title h4').outerWidth();
            var wrapper_two_btn           = $('#wrapper-two-btn #wrapper-two-btn-2').outerWidth();

            if (type == 'tablet') {
                // set css when button 
                if ((width_page_header_content - width_title) < (wrapper_two_btn + 16)) {
                    $('.content').css({
                        'padding-top'       : '60px'
                    });
                    $('.page-title').css({
                        'border-bottom'       : '1px solid #ddd'
                    });                    // css wrapper button
                    $('#wrapper-two-btn').css({
                        "top"                   : "100%",
                        "right"                 : "0",
                        "left"                  : "0",
                        "background-color"      : "#F5F5F5",
                        "padding-top"           : "14px",
                        "height"                : "100%"
                    });
                    $('#wrapper-two-btn').addClass('mobile');
                    $('#wrapper-two-btn-1').css({
                        'position'              : 'relative',
                        'left'                  : '20px',
                        'width'                 : 'calc(100% - 40px)',
                        'top'                   : '0',
                        'bottom'                : '0',
                        'padding'               : '20px 0px 50px',
                    });                    
                    $('#wrapper-two-btn #wrapper-two-btn-2').css({
                        "float"                 : "right",
                        "margin-right"          : "22px",
                        "margin-top"            : "-20px"
                    });                    
                    $('.heading-elements#css-menu').addClass('visible').css({
                        "top"                   : "200%",
                    }).removeClass('visible');                    
                    $('.page-header-content .heading-elements-toggle').css({
                        "top"                   : "137%",
                        "z-index"               : "1002"
                    });
                } else {
                    $('.content').css({
                        'padding-top'           : '0'
                    });
                    // css wrapper button
                    $('#wrapper-two-btn').css({
                        "top"               : "0",
                        "right"             : "35px",
                        "left"              : "auto",
                        'border-left'       : '0',
                        'border-bottom'     : '0',
                        "padding"           : "0",
                        "background-color"  : "none",
                        "padding-top"       : "14px",
                        "height"            : "100%"
                    });
                    $('#wrapper-two-btn').removeClass('mobile');                        
                    $('#wrapper-two-btn #wrapper-two-btn-1').css({
                        "position"        : "relative",
                        "left"            : "0",
                        "width"           : "auto",
                        "top"             : "0px",
                        "bottom"          : "0px",
                        "padding"         : "0",
                        'border-bottom'   : '0',
                        'border-left'     : '0',
                    });                        
                    $('#wrapper-two-btn #wrapper-two-btn-2').css({
                        "float"             : "none",
                        "margin-right"      : "0",
                        "margin-top"        : "0px"
                    });                    
                    $('.heading-elements#css-menu').css({
                        "top"  : "100%",
                    });                    
                    $('.page-header-content .heading-elements-toggle').css({
                        "top"  : "50%",
                    });
                }
            } else {
                $('.content').css({
                    'padding-top'   : '0'
                });
                $('.heading-elements#css-menu').css({
                    "top"       : "50%",
                });
                // css wrapper button
                $('#wrapper-two-btn').css({
                    "top"               : "0",
                    "right"             : "35px",
                    "left"              : "auto",
                    'border-left'       : '0',
                    'border-bottom'     : '0',
                    "padding"           : "0",
                    "background-color"  : "none"
                });
                $('#wrapper-two-btn').removeClass('mobile');                        
                $('#wrapper-two-btn #wrapper-two-btn-1').css({
                    "padding"         : "0",
                    'border-bottom'   : '0',
                    'border-left'     : '0',
                });
                $('.heading-btn-group').css({
                        "border-left"     : "0",
                        "border-bottom"   : "0",
                        "border-top"      : "0",
                });
            }
        } catch (e) {
            console.log('cssButtonWhenToLimit: ' + e.message);
        }
    }
    return {
        init: commonInit,
        onlyTypeNumber: onlyTypeNumber,
        onlyNumberKeydown: onlyNumberKeydown
    };
})();
/**
 * create string module
 * 
 * @author :
 * @params : obj
 * @return : 1.stringModule.padToLeft('123',5,'*') = '**123'
             2.stringModule.padToRight('123',5,'*') = '123**'
             3.stringModule.convertKana('アハレボ', 'f') = 'あはれぼ'
 * @access : public
 * @see :
 */
var stringModule = (function () {
    function padToLeft($data, $max, $valuePad) {
        try {
            var length = 0;
            var addValue = '';
            //get length of data
            if($data == null){
                length = $max;
            }else{
                length = $max - $data.length;
            }
            //if data blank => return blank
            if (length == $max) {
                return '';
            }
            //add zero to left
            for (var i = 0; i < length; i++) {
                addValue = addValue + $valuePad;
            }
            return addValue + $data;
        } catch (e) {
            console.log('padToLeft' + e.message);
        }
    }
    function padToRight($data, $max, $valuePad) {
        try {
            var length = $max - $data.length;
            var addValue = '';
            if (length == $max) {
                return '';
            }
            for (var i = 0; i < length; i++) {
                addValue = addValue + $valuePad;
            }
            return  $data + addValue;
        } catch (e) {
            console.log('padToRight' + e.message);
        }
    }
    function convertKana(target, type) {
        try {
            var _deleteStack = '';
            var katakana = new Array('ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク',
                    'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
                    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ',
                    'ム', 'メ', 'モ', 'ヤ', 'ヰ', 'ユ', 'ヱ', 'ヨ', 'ラ', 'リ', 'ル', 'レ',
                    'ロ', 'ワ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ',
                    'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ',
                    'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ',
                    'ョ', 'ッ', 'ヮ', 'ー');
            var hiragana = new Array('あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く',
                    'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
                    'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み',
                    'む', 'め', 'も', 'や', 'ゐ', 'ゆ', 'ゑ', 'よ', 'ら', 'り', 'る', 'れ',
                    'ろ', 'わ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず',
                    'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ',
                    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ',
                    'ょ', 'っ', 'ゎ', 'ー');
            //
            if (type === 'h') {
                target = _formatConvert(target, hiragana, katakana);
                _deleteStack += katakana.join('');
            } else if (type === 'f') {
                target = _formatConvert(target, katakana, hiragana);
                _deleteStack += hiragana.join('');
            }
            return (target);
        } catch (e) {
            return ('');
        }
    }
    function _formatConvert(target, original, format, escape) {
        try {
            var object = null;
            var i = 0;
            var len = original.length;
            //
            if (escape === true) {
                for (i = 0; i < len; i++) {
                    object = new RegExp(_formatConvertEscapeCheck(original[i]),
                            'gm');
                    target = target.replace(object, format[i]);
                }
            } else {
                for (i = 0; i < len; i++) {
                    object = new RegExp(original[i], 'gm');
                    target = target.replace(object, format[i]);
                }
            }
            delete (object);
            return (target);
        } catch (e) {
            return ('');
        }
    }
    function _formatConvertEscapeCheck(character) {
        try {
            var escape = '\\/^$*+-?{|}[].()';
            var i = 0;
            var len = escape.length;
            for (i = 0; i < len; i++) {
                if (character.indexOf(escape[i], 0) !== -1) {
                    return ('\\' + character);
                }
            }
            return (character);
        } catch (e) {
            return ('');
        }
    }
    return {
        padToLeft: padToLeft,
        padToRight: padToRight,
        convertKana: convertKana
    };
})();
/**
 * create number module
 * 
 * @author :
 * @params : obj
 * @return : 1. numberModule.toNumber('009') = 9
             2. numberModule.isNumber('a9') = false
 * @access : public
 * @see :
 */
var numberModule = (function () {
    function convertNumber(string) {
        try {
            var num = 0;
            var convert = parseInt(string);
            if( !isNaN(convert) ){
                num = convert;
            }
            return num;
        } catch (e) {
            return 0;
        }
    }
    function validateNumber(string) {
        try {
            var regexp = /^-*[0-9]+$/;
            if (regexp.test(string) || string == '') {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e.message);
        }
    }
    return {
        toNumber: convertNumber,
        isNumber: validateNumber
    };
})();
/**
 * create validate module
 * 
 * @author :
 * @params : obj
 * @return : 1. validateModule.validate()
             2. validateModule.clearErrorItem()
             3. validateModule.isEmail()
             4. validateModule.focusFirstError()
             5. validateModule.clearAllError()
 * @access : public
 * @see :
 */
var validateModule = (function () {
    function validate(obj) {
        try {
            var error = 0;
            $.each(obj, function(key, element) {
                var className       = element['attr']['class'];
                var maxlength       = element['attr']['maxlength'];
                var email           = element['attr']['email'];
                var msg_maxlength   = '';
                if( typeof(_text) != 'undefined' && _text[10] != undefined ){
                	msg_maxlength = _text[10].replace('{0}',maxlength);
                }
                var type            = element['type'];
                //check class or id
                if (element['attr']['isClass'] === true) {
                    //check class
                    $('body').find('.'+key).each(function() {
                        if( !$(this).is(':disabled') ){
                            // check required
                            if (/required/.test(className)) {
                                if($(this).val()==='' || numberModule.toNumber($(this).val()) < 0){
                                    $(this).errorStyle(CONSTANTS.msgRequired);
                                    error++;
                                } else {
                                    // clear error
                                    clearErrorItem(this, CONSTANTS.msgRequired);
                                }
                            }
                            // check maxlength
                            if (maxlength != undefined) {
                                if ($(this).val().length > maxlength) {
                                    $(this).errorStyle(msg_maxlength);
                                    error++;
                                } else {
                                    // clear error
                                    clearErrorItem(this,msg_maxlength);
                                }
                            }
                            // check email
                            if ($(this).val() !== '' && /email/.test(className)) {
                                if(!commonModule.checkEmail($(id).val())){
                                    $(this).errorStyle(CONSTANTS.msgEmail);
                                    error++;
                                }else{
                                    // clear error
                                    clearErrorItem(id,CONSTANTS.msgEmail);
                                }
                            }
                        }
                    });
                } else if( !$('#'+key).is(':disabled') && $('#'+key).attr('not-check') !== "true"){
                    //check id
                    var id = '#'+key;
                    // check required
                    if (/required/.test(className)) {
                        if($(id).val()==='' || numberModule.toNumber($(id).val()) < 0){                            
                            if(type=="select"){
                                $(id).next().find('.select2-selection').errorStyle(CONSTANTS.msgRequired);   
                            }else{
                                // console.log('id nì : ', id)
                                $(id).errorStyle(CONSTANTS.msgRequired);
                            }                           
                            error++;
                        }else{
                            // clear error
                            clearErrorItem(id, CONSTANTS.msgRequired);
                        }
                    }
                    // check maxlength
                    if (maxlength != undefined) {
                        if($(id).val().length > maxlength){
                            $(id).errorStyle(msg_maxlength);
                            error++;
                        }else{
                            // clear error
                            clearErrorItem(id,msg_maxlength);
                        }
                    }
                    // check email
                    if ($(id).val() !== '' && /email/.test(className)) {
                        if(!checkEmail($(id).val())){
                            $(id).errorStyle(CONSTANTS.msgEmail);
                            error++;
                        } else {
                            // clear error
                            clearErrorItem(id,CONSTANTS.msgEmail);
                        }
                    }
                }
            });
            //return check object
            if (error > 0) {
                return false;
            } else {
                return true;
            }
        } catch (e) {
            console.log('validate : ' + e.message);
        }
    }
    function clearErrorItem(item,msg){
        try{
            var err = $(item).attr("has-balloontip-message");
            if(msg===err){
                //remove Balloontip
                $(item).removeAttr("has-balloontip-message");
                $("#has-balloontip-class").remove();
                //remove class item-error
                $(item).removeClass('item-error');
            }
        }catch(e){
            console.log('clearErrorItem' + e.message);
        }
    }
    function checkEmail(string) {
        if(string === '') {
            return false;
        }
        var patt = /^[\w-.+]+@[a-zA-Z0-9_-]+?\.[a-zA-Z0-9._-]*$/;
        return patt.test(string);
    }
    function focusFirstError() {
        try {
            
            var elem = $('.item-error:first');
            elem.focus();
            _balloontipMouseover('', jQuery(elem));
        } catch (e) {
            console.log('_focusFirstError:  ' + e.message);
        }
    }
    function clearAllError(obj){
        try{

            $.each(obj, function(key, element) {
                //remove Balloontip
                $('#' + key).removeAttr("has-balloontip-message");
                $("#has-balloontip-class").remove();
                //remove class item-error
                $('#' + key).removeClass('item-error');
            });
        }catch(e){
            console.log('clearAllError' + e.message);
        }
    }
    return {
        validate: validate,
        clearErrorItem: clearErrorItem,
        focusFirstError: focusFirstError,
        clearAllError: clearAllError,
        isEmail: checkEmail
    };
})();
/**
 * create popup module
 * 
 * @author :
 * @params : obj
 * @return : 1. popupModule.show()
 * @access : public
 * @see :
 */
var popupModule = (function () {
    function showPopup(href, callBack, options) {
        if (typeof options === 'undefined') options = {};
        var defaultProperties = {
                'href'         : href,
                'open'         : true,
                'iframe'       : true,
                'fastIframe'   : true,
                'opacity'      : 0.5,
                'escKey'       : true,
                'overlayClose' : false,
                'innerWidth'   : '90%',
                'innerHeight'  : '90%',
                'reposition'   : true,
                'speed'        : 0,
                'onClosed'     : function() {
                    $("body").css('overflow' ,'auto');
                    if (typeof callBack == 'function') callBack();                
                },
                'onOpen'     : function() {
                    parent.$('body').css('overflow','hidden');
                    $("body").css('overflow-x' ,'hidden');
                    if(parent.$('#colorbox-draggable').length == 0){
                        parent.$("#colorbox").append('<div id="colorbox-draggable"></div>');
                    }
                }
            };

        for (var property in defaultProperties) {
            if( !options.hasOwnProperty(property) ) {
                options[property] = defaultProperties[property];
            }
        }
        $.colorbox(options);
    }
    return {
        show: showPopup
    };
})();
/**
 * initItem
 * 
 * @author :
 * @params : obj
 * @return : null
 * @access : public
 * @see :
 */
function initItem(obj) {
    try {
        // int element
        $.each(obj, function(key, element) {
            //check class or id
            if (element['attr']['isClass'] === true) {
                // add maxlength
                if (element['attr']['maxlength'] != undefined) {
                    $('.' + key).attr('maxlength', element['attr']['maxlength']);
                }
                // add class
                if (element['attr']['class'] != undefined) {
                    $('.' + key).addClass(element['attr']['class']);
                }
                // add decimal
                if (element['attr']['decimal'] != undefined) {
                    $('.' + key).attr('decimal', element['attr']['decimal']);
                }
                // add read-only
                if (element['attr']['readonly'] != undefined) {
                    $('.' + key).attr('readonly', element['attr']['readonly']);
                }
                if (element['attr']['disabled'] != undefined) {
                    $('.' + key).attr('disabled', element['attr']['disabled']);
                }
                // add tabindex
                if (element['attr']['tabindex'] != undefined) {
                    $('.' + key).attr('tabindex', element['attr']['tabindex']);
                }
                // add tabindex
                if (element['attr']['not-check'] != undefined) {
                    $('.' + key).attr('not-check', element['attr']['not-check']);
                }
                //add name
                if($('.' + key).length > 0){
                    $('.' + key).attr('name', key);
                }
            }else{
                // add maxlength
                if (element['attr']['maxlength'] != undefined) {
                    $('#' + key).attr('maxlength', element['attr']['maxlength']);
                }
                // add class
                if (element['attr']['class'] != undefined) {
                    $('#' + key).addClass(element['attr']['class']);
                }
                // add decimal
                if (element['attr']['decimal'] != undefined) {
                    $('#' + key).attr('decimal', element['attr']['decimal']);
                }
                // add read-only
                if (element['attr']['readonly'] != undefined) {
                    $('#' + key).attr('readonly', element['attr']['readonly']);
                }
                if (element['attr']['disabled'] != undefined) {
                    $('#' + key).attr('disabled', element['attr']['disabled']);
                }
                // add tabindex
                if (element['attr']['tabindex'] != undefined) {
                    $('#' + key).attr('tabindex', element['attr']['tabindex']);
                }
                // add tabindex
                if (element['attr']['not-check'] != undefined) {
                    $('#' + key).attr('not-check', element['attr']['not-check']);
                }
                //add name
                if($('#' + key).length > 0){
                    $('#' + key).attr('name', key);
                }
            }
        });
    } catch (e) {
        console.log('initItem' + e.message);
    }
}
/**
 * postSessionScreenId
 *
 * @author      :   
 * @parram      :   $screen_id string, $parram string or array
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function postSessionScreenId(screen_id, parram, url, callback) {
    try {
        var data = {
            'screen_id' : screen_id,
            'parram'    : parram,
        };

        $.ajax({
            type        :   'GET',
            url         :   '/common/link/session-screen-id',
            dataType    :   'json',
            data        :   data,
            async       :   false,  
            success: function(res) {
                var current_page = $('.bottom .current').text();
                current_page = current_page != '' ? current_page : $('.current').text();
                if(sessionStorage.getItem('current_page') !== null){
                    current_page = sessionStorage.getItem('current_page');
                }
                sessionStorage.setItem('current_page', current_page);
                //
                if(typeof callback === "function") {
                    callback();
                }else {
                    // openTab(url);
                    window.open(url,'_blank');
                }
            },
            error : function(res) {
               // closeWaiting();
               jMessage(78); //You do not have access to this function! Please contact admin
            },
        });
    } catch(e) {
        console.log('postSessionScreenId: ' + e.message)
    }
}
/**
 * openTab
 *
 * @author      :   
 * @parram      :   {string}    url     'handle/issue-management?from=issue-detail'     link to target screen
 * @parram      :   {string}    type    '_blank'                                        type window open
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
function openTab(url, type = '_self') {
    try {
        var newTab = window.open('', type);
        newTab.location.href = url;
    } catch(e) {
        console.log('openTab: ' + e.message);
    }
}

/**
 * getPagination
 *
 * @author      :   
 * @parram      :   
 * @access      :   public
 * @see         :   
 */
function getPagination(table) {
    var lastPage = 1;
    var rows = _PAGE_SIZE;//$('#maxRows').val();
    $('#maxRows').on('change', function(evt) {
        lastPage = 1;
        $('.pagination').find('li').slice(1, -1).remove();
        var trnum = 0; // reset tr counter
        var maxRows = parseInt($(this).val()); // get Max Rows from select option
        
        if (maxRows == 10000) {
            $('.pagination').hide();
        } else {
            $('.pagination').show();
            
        }
        
        var totalRows = $(table + ' tbody tr').length; // numbers of rows
        $(table + ' tr:gt(0)').each(function() {
            // each TR in  table and not the header
            trnum++; // Start Counter
            if (trnum > maxRows) {
            // if tr number gt maxRows

            $(this).hide(); // fade it out
            }
            if (trnum <= maxRows) {
            $(this).show();
            } // else fade in Important in case if it ..
        }); //  was fade out to fade it in
        if (totalRows > maxRows) {
            // if tr total rows gt max rows option
            var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
            //  numbers of pages
            for (var i = 1; i <= pagenum; ) {
            // for each page append pagination li
            $('.pagination #prev')
                .before(
                '<li data-page="' +
                    i +
                    '">\
                    <span>' +
                    i++ +
                    '<span class="sr-only"></span></span>\
                    </li>'
                )
                .show();
            } // end for i
        } // end if row count > max rows
        $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
        $('.pagination li').on('click', function(evt) {
            pagination = $(this).attr("data-page");
            // on click each page
            evt.stopImmediatePropagation();
            evt.preventDefault();
            var pageNum = $(this).attr('data-page'); // get it's number

            var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option

            if (pageNum == 'prev') {
                if (lastPage == 1) {
                    return;
                }
                pageNum = --lastPage;
            }
            if (pageNum == 'next') {
                if (lastPage == $('.pagination li').length - 2) {
                    return;
                }
                pageNum = ++lastPage;
            }

            lastPage = pageNum;
            _PAGE = lastPage;
            var trIndex = 0; // reset tr counter
            $('.pagination li').removeClass('active'); // remove active class from all li
            $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
            // $(this).addClass('active');          // add active class to the clicked
            limitPagging();
            $(table + ' tr:gt(0)').each(function() {
                // each tr in table not the header
                trIndex++; // tr index counter
                // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                if (
                    trIndex > maxRows * pageNum ||
                    trIndex <= maxRows * pageNum - maxRows
                ) {
                    $(this).hide();
                } else {
                    $(this).show();
                } //else fade in
            }); // end of for each tr in table
        }); // end of on click pagination list
        limitPagging();
    }).val(rows).change();
    if(_PAGE != undefined && _PAGE != null && _PAGE != ''){
        $('.pagination [data-page="'+_PAGE+'"]').trigger('click');
        $('.pagination [data-page="'+_PAGE+'"]').addClass('active'); // add active class to the first li
    }
// end of on select change
// END OF PAGINATION
}

/**
 * limitPagging
 *
 * @author      :   
 * @parram      :   
 * @access      :   public
 * @see         :   
 */
function limitPagging(){
    if($('.pagination li').length > 7 ){
        if( $('.pagination li.active').attr('data-page') <= 3 ){
            $('.pagination li:gt(5)').hide();
            $('.pagination li:lt(5)').show();
            $('.pagination [data-page="next"]').show();
        }
        if ($('.pagination li.active').attr('data-page') > 3){
            $('.pagination li:gt(0)').hide();
            $('.pagination [data-page="next"]').show();
            for( let i = ( parseInt($('.pagination li.active').attr('data-page'))  -2 )  ; i <= ( parseInt($('.pagination li.active').attr('data-page'))  + 2 ) ; i++ ){
                $('.pagination [data-page="'+i+'"]').show();
            }
        }
    }
}
/**
 * getData
 *
 * @author : 
 * @author :
 * @return : {}
 * @access : public
 * @see :
 */
 function getData(eleGetData){
    try {
        if (!eleGetData) {
            eleGetData = $('body');
        }
        var data = [];
        //var data_sql = {};
        eleGetData.find('input[type!=hidden], select, textarea[type!=hidden]').each(function() {
        //$.each(obj, function (fieldName, element){
            var fieldName = $(this).attr('name');
            var element = $(this);
            //get value of element
            var val = getDataRules(fieldName, element);
            var item = {};
            item.key = fieldName;
            item.value = val;
            //add to array
            data.push(item);
        });

            return {
            'data': data,
            //'data_sql': data_sql,
        }
    } catch ( e ) {
        console.log('getData : ' + e.message);
    }
}

/**
 * getDataRules
 *
 * @author : 
 * @author :
 * @return : null
 * @access : public
 * @see :
 */
function getDataRules(name, element){
    try {
        var _getSelector = function (element){
            var $selector = '';
            switch ( element.attr('type') ) {
                case 'select':
                    //$selector = $('#' + name);
                    $selector = $('select[name=' + name + ']');
                    break;
                case 'input':
                    $selector = $('input[name=' + name + ']');
                    break;
                case 'textarea':
                    $selector = $('textarea[name=' + name + ']');
                    break;
                default:
                    $selector = $('input[name=' + name + ']');
            }
            return $selector;
        };
        var _getDataTypeText = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var value = [];
                $selector.each(function (){
                    value.push($.trim($(this).val()));
                });
                return value;
            }

            return $.trim($selector.val());
        };
        var _getDataTypeInput = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var value = [];
                $selector.each(function (){
                    value.push($.trim($(this).val()));
                });
                return value;
            }

            return $.trim($selector.val());
        };
        var _getDataTypeTextarea = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var value = [];
                $selector.each(function (){
                    value.push($.trim($(this).val()));
                });
                return value;
            }

            return $.trim($selector.val());
        };
        var _getDataTypeLabel = function (element){
            var $selector = _getSelector(element);
            if ( element.getType == 'class' ) {
                var value = [];
                $selector.each(function (){
                    value.push($.trim($(this).text()));
                });
                return value;
            }

            return $.trim($selector.text());
        };
        var _getDataTypeTime = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var value = [];
                $selector.each(function (){
                    if ( $(this).val() == '' ) {
                        value.push(0);
                    } else {
                        value.push($.trim($(this).val()).replace(':', ''));
                    }
                });
                return value;
            }

            return $selector.val() == '' ? 0 : $.trim($selector.val()).replace(':', '')
        };
        var _getDataTypeSelect = function (element){
            var $selector = _getSelector(element);

            /*if ( element.getType == 'class' ) {
                var val = [];
                $selector.each(function (){
                    val.push($(this).val());
                });
                return val;
            }*/
            return $selector.val();
        };
        var _getDataTypeListbox = function (element){
            var selector    = {};
            // selector = _getSelector(element);
            var options = $('.CMB_check_list_right option');
            selector.value = $.map(options ,function(option) {
                return option.value;
               
            });

            return JSON.stringify(selector['value']);
        };
        var _getDataTypeRadioBox = function (name){
            // var index = $("input[name='" + name + "']").data('index');
            var length = $("input[name='" + name + "']").length;
            if(length > 1) {
                for (var i = 0; i < length; i++) {
                    if ($('#'+name+i).is(':checked')) {
                        return $('#'+name+i).val();
                    }
                }
            }else if ( $("input[name='" + name + "']").is(':checked') ) {
                return '1';//$("input[name='" + name + "']:checked").val();
            }
            return '0';
        };
        var _getDataTypeCheckBox = function (element){
            var $selector = _getSelector(element);
            return $selector.is(':checked') ? '1' : '0';
        };
        var _getDataTypeNumeric = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var val = [];
                $selector.each(function (){
                    var value = $.trim($(this).val()).replace(/,/g, '');
                    if (value == '' ) {
                        val.push(0);
                    } else {
                        val.push(value);
                    }
                });
                return val;
            }

            return $.trim($selector.val()).replace(/,/g, '') || 0 ;
        };
        var _getDataTypeNumberOnly = function (element){
            var $selector = _getSelector(element);

            if ( element.getType == 'class' ) {
                var val = [];
                $selector.each(function (){
                    if ( $(this).val() == '' ) {
                        val.push(0);
                    } else {
                        val.push($.trim($(this).val()));
                    }
                });
                return val;
            }

            return $selector.val() == '' ? 0 : $.trim($selector.val());
        };

        switch ( element.attr('type') ) {
            case 'text':
                return _getDataTypeText(element);

            case 'input':
                return _getDataTypeInput(element);

            case 'textarea':
                return _getDataTypeTextarea(element);
    
            case 'label':
                return _getDataTypeLabel(element);

            case 'time':
                return _getDataTypeTime(element);

            case 'select':
                return _getDataTypeSelect(element);

            case 'listbox':
                return _getDataTypeListbox(element);

            case 'radio':
                return _getDataTypeRadioBox(name);

            case 'checkbox':
                return _getDataTypeCheckBox(element);

            case 'numeric':
                return _getDataTypeNumeric(element);

            case 'only-number':
                return _getDataTypeNumberOnly(element);
        }
    } catch ( e ) {
        console.log('getDataRules : ' + e.message);
    }
}
/**
 * getDataItem
 *
 * @author : 
 * @author :
 * @return : {*}
 * @access : public
 * @see :
 */
function getDataItem($element, obj){
    try {
        var result = '';
        switch ( obj.attr('type') ) {
            case 'text':
                return $.trim($element.val());

            case 'input':
                return $.trim($element.val());

            case 'textarea':
                return $.trim($element.val());

            case 'label':
                return $.trim($element.text());

            case 'time':
                return $.trim($element.val()).replace(':', '');

            case 'select':
                result = $element.val();
                return result ? result : '';

            case 'listbox':
                var result    = {};
                var options = $('.CMB_check_list_right option');
                result.value = $.map(options ,function(option) {
                    return option.value;
                });
                // result = $element.val();
                console.log(result);
                return result ? result : '';

            case 'checkbox':
                return $element.is(":checked") ? $element.val() : '0';

            case 'numeric':
                var value = $.trim($element.val()).replace(/,/g, '')
                return value == '' ? 0 : value;

            case 'only-number':
                return $.trim($element.val()) == '' ? $.trim($element.val()).replace('', 0) : $.trim($element.val());
        }

    } catch ( e ) {
        console.log('getDataItem : ' + e.message);
    }
}
/**
 * Common item validation process. Call when click save button.
 *
 * @author : create
 * @author :
 * @param :
 *            element
 * @return : true/false
 * @access : public
 * @see :
 */
 function _validate(element) {
	if (!element) {
		element = $('body');
	}
	var error = 0;
	try {
		// validate required
		element.find('[required=required]:enabled').each(function() {
            $(this).removeErrorStyle();
            var isInputError    = $(this).is("input")    && ($.trim($(this).val()) == '');
            var isTextAreaError = $(this).is("textarea") && ($.trim($(this).val()) == '');
            var isSelectError   = $(this).is("select")   && ($(this).val() == '-1' || $(this).val() == '' || $(this).val() == null || $(this).val() == undefined);
            if(isInputError || isTextAreaError || isSelectError) {
                $(this).errorStyle("必須項目。");
                error++;
            }
            if($(this).is(':checkbox')){
                var nm = $(this).attr('name');
                // if($('input[name="'+nm+'"]:checked').length == 0) {
                if(!$('input[name="'+nm+'"]:checked').is(':checked')) {
                    $('input[name="'+nm+'"]').errorStyle("必須項目。");
                    $('input[name="'+nm+'"]').each(function(){
                        $(this).next().find('.check_button-icon').tooltip({
                            title: "必須項目。"
                        });
                        // $(this).closest('.md-checkbox').tooltip({
                        //     title: "必須項目。"
                        // });
                    });
                    error++;
                } else {
                    $('input[name="'+nm+'"]').removeErrorStyle();
                    $('input[name="'+nm+'"]').each(function(){
                        $(this).next().find('.check_button-icon').tooltip("dispose");
                        // $(this).closest('.md-checkbox').tooltip('destroy');
                    });
                }
            }
		});
		if (error > 0) {
			return false;
		} else {
			return true;
		}
	} catch (e) {
		console.log('_validate: ' + e.toString());
	}
}
/**
 * errorStyle
 *
 * @param {string} message
 */
jQuery.fn.errorStyle = function(message, style) {
    try {
        return (this.each(function(index, dom) {
            try {
                if (message !== '') {
                    style = 'textbox-error';
                    if (style === '') {
                        style = 'error-item';
                    }
                    //
                    if (!jQuery(this).hasClass(style)) {
                        if($(this).is(':checkbox') && ($(this).hasClass('required') || $(this).attr('required') == "required")){
                            // エラースタイルを持っていない場合
                            jQuery(this).next().find('.check_button-icon').addClass(style);
                            //
                            jQuery(this).next().find('.check_button-icon').attr('data-toggle', 'tooltip');
                            jQuery(this).next().find('.check_button-icon').attr('title', '必須項目。');
                            jQuery(this).next().find('.check_button-icon').attr('data-bs-original-title', '必須項目。');
                        }
                        else {
                            // エラースタイルを持っていない場合
                            jQuery(this).addClass(style);
                            //
                            jQuery(this).attr('data-toggle', 'tooltip');
                            jQuery(this).attr('title', '必須項目。');
                            jQuery(this).attr('data-bs-original-title', '必須項目。');
                        }
                        if(style == 'textbox-error'){
                            //jQuery(this).balloontip(message);
                        }else{
                            //jQuery(this).balloontip(message, 'focus');
                        }
                    }
                }
                var element = '.'+ style + ':first';
                $(document).find(element).focus();
            } catch (e) {
                return (false);
            }
        }));
    } catch (e) {
        return (this.each(function(index, dom) {
        }));
    }
};
/**
 * removeErrorStyle
 *
 */
 jQuery.fn.removeErrorStyle = function(style) {
    try {
        return (this.each(function(index, dom) {
            try {
                style = '';
                if (style === '') {
                    style = 'textbox-error';
                }
                //
                jQuery(this).removeClass(style);//.removeBalloontip();
                //
                jQuery(this).attr('data-toggle', '');
                jQuery(this).attr('title', '');
                jQuery(this).attr('data-bs-original-title', '');
                if(jQuery(this).is(':checkbox')){
                    // エラースタイルを持っていない場合
                    jQuery(this).next().find('.check_button-icon').removeClass(style);//.removeBalloontip();
                    //
                    jQuery(this).next().find('.check_button-icon').attr('data-toggle', '');
                    jQuery(this).next().find('.check_button-icon').attr('title', '');
                    jQuery(this).next().find('.check_button-icon').attr('data-bs-original-title', '');
                }
            } catch (e) {
                return (false);
            }
        }));
    } catch (e) {
        return (this.each(function(index, dom) {
        }));
    }
};
/**
 * Find first error item and focus it
 */
 function _focusErrorItem() {
	try {
		$('.textbox-error:first').focus();
        //tooltip init
        $('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
	} catch (e) {
		console.log('_focusErrorItem: ' + e.message);
	}
}
/**
 * refer data when staff name
 *
 * @author      :   
 * @param       :   
 * @param       :   callback - function - function excute when refer completed
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
 function _referStaffIDFromStaffName($staffName, $obj) {
    try {
        $.ajax({
            url             :   '/common/refer-staffID',
            type            :   'post',
            data            :   {
                staffName   : $staffName
            },
            success         :   function(res){
                if (res.status) {
                    $obj.closest('.group-item_search.popup').find('.id-popup__staff-search').val(res.data.staff_id);
                    $obj.val(res.data.staff_name);
                } else {
                    $obj.closest('.group-item_search.popup').find('.id-popup__staff-search').val('');
                    $obj.val('');
                }
            },
        });

    } catch ( e ) {
        console.log('_referStaffIDFromStaffName : ' + e.message);
    }
}
