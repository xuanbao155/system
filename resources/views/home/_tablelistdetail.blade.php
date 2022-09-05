<div class="text_size-small_name">検索数:0</div>
<div class="question_field" style="overflow-x:auto;">
    <form>
        <div class="select_box-container" style="width: 100px;">
            <div class="form-group pagination pagination_dem select_box-wrap" >
                <select class="form-control select select_box" id="maxRows" name="state" tabindex="1">
                    <option value="10" @if(isset($pageSize) && $pageSize == 10) selected @endif>10</option>
                    <option value="50" @if(isset($pageSize) && $pageSize == 50) selected @endif>50</option>
                    <option value="100" @if(isset($pageSize) && $pageSize == 100) selected @endif>100</option>
                </select>
            </div>
        </div>
        <table class="js-sort-table w-100 table-list" id="table_field_container">
            <thead>
                <tr>
                    <th class="js-sort-title min-w150"></th>
                    <th class="js-sort-name min-w150">1姓</th>
                    <th class="js-sort-month min-w150">1名</th>
                    <th class="js-sort-phonenumber min-w150">1電話</th>
                    <th class="js-sort-url min-w200">1Eメール</th>
                    <th class="js-sort-name min-w150">2姓</th>
                    <th class="js-sort-month min-w150">2名</th>
                    <th class="js-sort-phonenumber min-w150">2電話</th>
                    <th class="js-sort-url min-w200">2Eメール</th>
                    <th class="js-sort-date min-w150">作成日</th>
                </tr>
            </thead>
            <tbody>
            @if(isset($listsurveydetail) && $countsurveydetail  > 0)
                @foreach($listsurveydetail as $key => $list)
                    <tr>
                        <td  class="survey_link_row"><a href="/customer/{{$list->id ?? ''}}"><span class="survey_link_customer"> お客様ページへ </span></a></td>
                        <td> {{$list->first_name1 ?? ''}} </td>
                        <td> {{$list->last_name1 ?? ''}} </td>
                        <td class="text-right"> {{$list->phone_number1 ?? ''}} </td>
                        <td> {{$list->email1 ?? ''}} </td>
                        <td> {{$list->first_name2 ?? ''}} </td>
                        <td> {{$list->last_name2 ?? ''}} </td>
                        <td  class="text-right"> {{$list->phone_number2 ?? ''}} </td>
                        <td> {{$list->email2 ?? ''}} </td>
                        <td  class="text-center"> {{substr((str_replace('-','/',$list->created_at)), 0, 16)}} </td>
                    </tr>
                @endforeach
            @else
                <tr><td colspan="10" class="nothing_data_exist"> 該当データは存在しません。 </td></tr>
            @endif
            </tbody>
        </table>
        <div class='pagination-container'>
            <nav>
                <ul class="pagination">
                
                    <li data-page="prev" >
                        <span @if((isset($pageSize) && isset($countsurveydetail) && $countsurveydetail <= $pageSize) || !isset($pageSize)) hidden @endif> < <span class="sr-only"></span></span>
                    </li>
                    <!-- Here the JS Function Will Add the Rows -->
                    <li data-page="next" id="prev">
                        <span @if((isset($pageSize) && isset($countsurveydetail) && $countsurveydetail <= $pageSize) || !isset($pageSize)) hidden @endif> > <span class="sr-only"></span></span>
                    </li>
                </ul>
            </nav>
        </div>
    </form>
</div>