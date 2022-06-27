<?php

// Данные из таблицы: 'users'. GET token через "плагин Sanctum"
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/token', function (Request $request) {
    return csrf_token();
});


    Route::get('user/get', 'Api\UserController@getUserByIDorEmail');
    Route::post('user/add/wallet', 'Api\UserController@addToWallet');

Route::get(     'posted_projectss',              'Api\PostedController@getPosted');

//------------------------------Все пользователи----------------------------------
Route::prefix( 'v1' )->namespace( 'Api' )->group( function() {

    Route::get(     'posted_projects',              'PostedController@getPosted');

    Route::get(     'posted_projects/{category}',   'PostedController@getByCategory');

    Route::get(     'posted_project/{id}',          'PostedController@getByIdPosted');

    Route::get(     'reward',                       'ProjectRewardController@getByProjectId');

    Route::get(     'users/list',                   'UserController@getUsersResource');

    Route::get(     'project_payment_by/user',      'ProjectPaymentController@getByUserId');

    Route::get(     'deleted_closed',               'PostedController@getAllDeletedOrClosed');

    Route::get(     'noti/user',                    'NotificationController@getByUser');

    Route::post(    'noti/read',                    'NotificationController@readNoti');

    Route::delete(  'noti/delete/{id}',             'NotificationController@deleteById');
});
//----------------------------#END Все пользователи--------------------------------


// Авторизованные пользователи (Routes):
Route::middleware('auth:sanctum')->prefix( 'v1' )->namespace( 'Api' )->group(
function() {

    //----------------------------------Author---------------------------------


        Route::get(     'user/role',                    'RoleController@get');


        Route::post('projects', 'ProjectController@create');

        Route::post(    'projects/edit',                'ProjectController@update');

        Route::post(    'projects/verify',              'ProjectController@verification');

        Route::post(    'uploadImage/{id}',             'ProjectController@uploadImage');

        Route::post(    'reward_create',                'ProjectRewardController@create');

        Route::post(    'reward_update',                'ProjectRewardController@update');

        Route::get(     'reward_get/{id}',              'ProjectRewardController@get');

        Route::get(     'reward_get/bought',            'ProjectRewardController@getBought');

        Route::get(     'reward_get/notbought',         'ProjectRewardController@getNotBought');

        Route::post(    'reward_delete/{id}',           'ProjectRewardController@delete');

        Route::get(     'project/{id}',                 'ProjectController@getProjectById');

        Route::get(     'project_by/user',              'ProjectController@getProjectByUser');

        Route::get(     'moderation_by/user/{id}',      'ProjectController@getOnModerationByUser');

        Route::post(    'projects_to/moderate/{id}',    'ProjectController@sendToModerate');

        Route::post(    'project_payment',              'ProjectPaymentController@create');

        Route::get(     'posted_projects_by/user',      'PostedController@getPostedByUserId');

        Route::post(    'posted_project/post/{id}',     'PostedController@PostProject');

        Route::post(    'posted_project/update',        'UpdatesController@updatePosted');

        Route::post(    'posted_project_delete/{id}',   'PostedController@deleteByIdPosted');
    //-------------------------------#END# Author-------------------------------


    Route::middleware('role:booster, admin, b-angel, curator')->group(function () {
        //-----------Author--Moderator--Kurator--BusinessAngel--Booster--------------
        Route::get('posted_project/history', 'PostedController@getByIdHistory');

        Route::post('diary/{id}', 'DiaryController@add');

        Route::get('diary/{id}', 'DiaryController@getByProjectId');

        Route::delete('diary_delete/{id}', 'DiaryController@deleteById');
        //--------#END# Author--Moderator--Kurator--BusinessAngel--Booster-----------
    });


    //------------------------------Moderator--Kurator----------------------------
    Route::middleware('role:curator')->group(function () {
        Route::get('projects_on_moderation/all', 'ProjectController@getAllOnModeration');

        Route::get('projects_on_moderation/{id}', 'ProjectController@getByIdOnModeration');

        Route::get('updates/all', 'UpdatesController@getAllUpdates');

        Route::get('updates/by/id', 'UpdatesController@getByIdUpdates');

        Route::get('projects/all', 'ProjectController@getAllRawProjects');
        //---------------------------#END# Moderator--Kurator-------------------------
    });


    //-------------------------------------Moderator-------------------------------
    Route::middleware('role:admin')->group(function () {
        Route::get('users/all', 'UserController@getAll');

        Route::get('posted_not/all', 'PostedController@getNotPosted');

        Route::delete('projects/delete_by/id', 'ProjectController@deleteRawProjectById');

        Route::get('author/data', 'AuthorController@get'); // Возвращает автора проекта с его данными document

        Route::post('moderate_to/post/{id}', 'ProjectController@moderatePost');

        Route::post('updates/confirm', 'UpdatesController@confirmUpdate');

        Route::delete('updates/delete/by/id', 'UpdatesController@deleteByIdUpdates');

        Route::get('user/role/{id}', 'RoleController@getByUserId');

        Route::post('user/role/set/{id}/{role}', 'RoleController@setRole');

        Route::post('user/role/remove/{id}', 'RoleController@removeRole');

        Route::get('payments/all', 'ProjectPaymentController@getAll');

        Route::get('payments_by/project/id', 'ProjectPaymentController@getByProjectId');

        Route::post('noti/add', 'NotificationController@add');

        Route::get('city', 'CityController@get');

        Route::post('city', 'CityController@create');

        Route::put('city/{id}', 'CityController@update');

        Route::delete('city/{id}', 'CityController@delete');
    });
    //--------------------------------#END# Moderator------------------------------
    }
);
