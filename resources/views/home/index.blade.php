@extends('layouts.app-master')

@section('title')
ダッシュボード
@endsection

@section('stylesheet')
    <link href="{!! url('assets/backend/css/surveydetail.css') !!}" rel="stylesheet">
@endsection

@section('javascript')
    <script src="{!! url('assets/backend/js/dashboard.js') !!}"></script>
@endsection

@section('content')
    <div class="rounded bg-light1">
        <!-- @auth
        <h4>ダッシュボード</h4>
        @endauth

        @guest
        <h1>Homepage</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        @endguest -->

        <!-- <button class="w-100 btn btn-lg btn-primary_login btn-primary" id='btn_new_survey' type="submit">新規ヒアリングシート</button> -->

        <div class="sub_title-container">
            <div class="title_servey">検索</div>
        </div>
        <div class="question_field-container">

            <div class="text_size-small">
                <div class="text_size-small_content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/></svg> 検索条件</div>
                </div>
            </div>
            <div class="question_field question_field_content">
                <!-- <div class="question_body-container question_body-cell_container field_container-error">
                    <div class="question_body-cell2">
                        <div class="text_input-container">
                            <label for="text_input3" class="answer_label">１姓</label>
                            <div class="text_input-wrap">
                                <input id="text_input3" name="text_input3" type="text" class="text_input first_name1">
                            </div>
                        </div>
                    </div>
                    <div class="question_body-cell2">
                        <div class="text_input-container">
                            <label for="text_input4" class="answer_label">1名</label>
                            <div class="text_input-wrap">
                                <input id="text_input4" name="text_input4" type="text" class="text_input last_name1">
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="question_body-container question_body-cell_container">
                    <div class="question_body-cell2">
                        <div class="text_input-container">
                            <label for="text_input5" class="answer_label">1電話</label>
                            <div class="text_input-wrap">
                                <input id="text_input5" name="text_input5" type="text" class="text_input phone_number1"
                                        v-model="itemValue.text_input5">
                            </div>
                        </div>
                    </div>
                    <div class="question_body-cell2">
                        <div class="text_input-container">
                            <label for="text_input6" class="answer_label">1Eメール</label>
                            <div class="text_input-wrap">
                                <input id="text_input6" name="text_input6" type="text" class="text_input email1"
                                        v-model="itemValue.text_input6">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="question_body-container question_body-cell_container body-cell_container_wrap" style="display: flex; flex-wrap: wrap;"> 
                    <div class="question_body-container question_body-cell_container body-cell_container_check" style="width: 33.3%;">
                        <label for="text_input7" class="answer_label answer_label_item1">作成日</label>
                        <div class="question_body-container question_body-cell_container body-cell_container_item">
                                <div class="text_input-container text_input-container_item">
                                        <input id="text_input7" name="text_input7" type="text" class="text_input datepicker time_start1">
                                </div>
                            <label for="text_input8" class="answer_label answer_label_item2">~</label>
                                <div class="text_input-container text_input-container_item">
                                        <input id="text_input8" name="text_input8" type="text" class="text_input datepicker time_end1">
                                </div>
                        </div>
                    </div>
                    <!-- <div class="question_body-cell2" style="margin-top: 8px;">
                        <div class="text_input-container">
                            <label for="text_input9" class="answer_label">店舗名</label>
                            <div class="text_input-wrap">
                                <input id="text_input9" name="text_input9" type="text" class="text_input organization_name1">
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>

            <div class="row pt-5 pb-5">
                <div class="col-md-3"></div>
                <div class="col-md-2">
                    <button class="w-100 btn btn-lg btn-back" id="btn-primary_servey_search" type="submit">検索</button>
                </div>
                <div class="col-md-2">
                    <button class="w-100 btn btn-lg btn-back" id="btn-primary_servey_clear" type="submit">クリア</button>
                </div>
                <div class="col-md-2">
                    <button class="w-100 btn btn-lg btn-back" type="submit" id="btn-back"><i class="fa fa-reply mr-1" aria-hidden="true"></i>
                        戻る</button>
                </div>
                <div class="col-md-3"></div>
            </div>
            <!-- <div class="question_body-cell_container_child w-100">
                <div class="question_body-cell_cont" style="width:26%"></div>
                <button class="btn btn-sm btn-primary_login" id="btn-primary_servey_search" type="submit">検索</button>
                <button class="btn btn-sm btn-primary_login" id="btn-primary_servey_clear" type="submit">クリア</button>
                <button class="btn btn-sm btn-back" id="btn-back">
                    <i class="fa fa-reply mr-1" aria-hidden="true"></i>
                    戻る
                </button>
            </div> -->
        </div>

        <div class="question_field-container">
            <div class="text_size-small_empty"></div>
            <div class="question_field_table" id="table-list_survey_detail">
                @include('home._tablelistdetail')
            </div>
        </div>
        

    </div>
@endsection