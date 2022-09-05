<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class ListOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return view('home.survey.list-survey', compact('listsurvey', 'countsurvey', 'pageSize'));
    }

    /**
    * search surveys
    * -----------------------------------------------
    * @author      :  
    * @param       :
    * @return      :   mixed
    * @access      :   public
    * @see         :   remark
    */
    public function search(Request $request)
    {
        // try {
        //     $htmlView = view('home.survey._tablelist', compact('listsurvey', 'countsurvey', 'pageSize'))->render();
            
        //     if (isset($listsurvey)) {
        //         $response               =   [
        //             'status'              =>  true,
        //             'htmlView'              =>  $htmlView
        //         ];
        //     } else {
        //         $response               =   [
        //             'status'               =>  false,                    
        //         ];
        //     }

        //     return response()->json($response);
        // } catch(\Exception $e) {
        //     return response()->json(array('status'=>false, 'err'=>$e->getMessage()));
        // }
    }
}
