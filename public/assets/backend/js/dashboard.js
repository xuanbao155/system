/**
 * ready 
 *
 * @author      : 
 * @param       :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */

 $(document).ready(function() {
    initialize();
    initEvents();
});

/**
 * initialize
 *
 * @author      :   
 * @param       :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
 function initialize() {
    $( "#datepicker" ).datepicker();
 }

 /**
 * initEvents
 *
 * @author      : 
 * @param       :
 * @return      :   null
 * @access      :   public
 * @see         :   init
 */
  function initEvents() {
    try {
        // Show/hide content
        $(".text_size-small_content").click(function(){
            $(".question_field_content").toggle();
        });

        // Show/hide content 
        $("#btn-primary_servey_clear").click(function(){
            $('.text_input').val('');
            searchSurveyDetail();
        });

        // search survey
        $(document).on('click','#btn-primary_servey_search',function(){
            _PAGE_SIZE = $('#maxRows').val();
            console.log(_PAGE_SIZE);
            searchSurveyDetail();
        });
        
        // Pagination
        getPagination('#table_field_container');
    
        // var maxRow_check = document.getElementById("table_field_container").rows.length;
        // if(maxRow_check <= 19) {
        //     $('.pagination > li > span').hide();
        // }
        // search survey
        $(document).on('click','#btn_new_survey',function(){
            
            window.location.href = '/survey-setting';
        });
    } catch (e) {
        console.log('initEvents: ' + e.message);
    }
}

/**
 * search project
 *
 * @author      :   
 * @param       :   
 * @return      :   null
 * @access      :   public
 * @see         :   
 */
 function searchSurveyDetail() {
	try {
		var first_name1 	    = $('.first_name1').val();
		var last_name1 	        = $('.last_name1').val();
		var phone_number1 	    = $('.phone_number1').val();
		var email1 		        = $('.email1').val();
		var time_start1		    = $('.time_start1').val();
		var time_end1		    = $('.time_end1').val();
        var organization_name1 	= $('.organization_name1').val();
		var first_name2 	    = $('.first_name2').val();
		var last_name2 	        = $('.last_name2').val();
		var phone_number2 	    = $('.phone_number2').val();
		var email2 		        = $('.email2').val();
		var time_start2		    = $('.time_start2').val();
		var time_end2		    = $('.time_end2').val();
        var organization_name2 	= $('.organization_name2').val();
        var survey_id 	        = $('.survey_id').val();
		$.ajax({
			type: 'POST',
			// dataType: 'json',
            url: "/dashboard",
			data: {
				first_name1         : first_name1,
				last_name1          : last_name1,
				phone_number1 	    : phone_number1,
				email1              : email1,
				time_start1         : time_start1,
				time_end1           : time_end1,
                organization_name1  : organization_name1,
                first_name2         : first_name2,
				last_name2          : last_name2,
				phone_number2 	    : phone_number2,
				email2              : email2,
				time_start2         : time_start2,
				time_end2           : time_end2,
                organization_name2  : organization_name2,
                survey_id           : survey_id,
                page_size           : _PAGE_SIZE
			},
			success: function(res){
				if(res.status ==  true){
					$('#table-list_survey_detail').empty();
	            	$('#table-list_survey_detail').append(res.htmlView);
                    // Pagination
                    setTimeout(function() { 
                        getPagination('#table-list_survey_detail');
                    
                        //var maxRow_check = document.getElementById("table_field_container").rows.length;
                        // var maxRow_check = $('#table_field_container tbody').length;
                        // if(maxRow_check <= _PAGE_SIZE) {
                        //     $('.pagination > li > span').hide();
                        // }
                    }, 500);
                }
			}
		});
	} catch(e){
		console.log('searchSurveyDetail:' + e.message);
	}
}