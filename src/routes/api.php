<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Данные из таблицы: 'users' GET token через "плагин Sanctum"
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/token', function (Request $request) {
    return csrf_token();
});
// #END# таблица:'user' и GET token 'Sanctum'


//------------------------------Все пользователи----------------------------------
Route::prefix( 'v1' )->namespace( 'Api' )->group( function() 
{
    Route::get(     'posted_projects',              'PostedController@getPosted');  // Готовые проекты
    
    Route::get(     'posted_project/{id}',          'PostedController@getByIdPosted'); // Получить готовый проект по {id}
    
    Route::get(     'posted_projects/{category}',   'PostedController@getByCategory');  //  Готовые проекты по {category}
    
    Route::get(     'reward/{id}',                  'ProjectRewardController@getByProjectId');  // Все Rewards проекта

    Route::get(     'users/list',                   'UserController@getUsersResource'); // Список инвесторов в проекте

    Route::get(     'city',                         'CityController@get');  //  Города все

    Route::get(     'closed_projects',              'PostedController@getAllClosed');  // Все завершенные проекты

    Route::get(     'closed_projects/by/{id}',      'PostedController@getClosedById');  // Завершенные проекты по id

    Route::get(     'carousel/get',                 'CarouselController@getCarousel');  // Получить Карусели
});
//----------------------------#END Все пользователи--------------------------------


//----------------------------------Authorized User--------------------------------
Route::middleware('auth:sanctum')->prefix( 'v1' )->namespace( 'Api' )->group( function()
    {
        Route::get(     'user/role',                    'RoleController@get');  // Роль самого юзера

        Route::get(     'user/transaction',             'TransactionController@getByUser');  // Транзакций юзера

        Route::post(    'user/image',                   'UserController@userImage'); // Загрузка изображения пользователя

        Route::post(    'projects',                     'ProjectController@create');    // Создать проект

        Route::post(    'projects/edit',                'ProjectController@update');    // Редактировать проект
        
        Route::post(    'projects/verify',              'ProjectController@verification');  // Загрузить документы

        Route::post(    'uploadImage/{id}',             'ProjectController@uploadImage');   // Для TinyMCE eitor

        Route::post(    'reward_create',                'ProjectRewardController@create');  // Создать Reward

        Route::get(     'reward_get/{id}',              'ProjectRewardController@get');     // Получить Reward по {id}
        
        Route::get(     'reward_get/bought',            'ProjectRewardController@getBought');   // Купленные Reward-ы
        
        Route::get(     'reward_get/notbought',         'ProjectRewardController@getNotBought');    // Не купленные Reward-ы

        Route::post(    'reward_delete/{id}',           'ProjectRewardController@deleteReward');    // Удалить Reward

        Route::get(     'project_by/user',              'ProjectController@getProjectByUser');  // Сырые проекты самого автора

        Route::post(    'projects_to/moderate/{id}',    'ProjectController@sendToModerate');    // Сырой проект на модерацию

        Route::post(    'projects_reject',              'ProjectController@sendToReject');    // Сырой проект не прошел модерацию
        
        Route::get(     'moderation_by/user/{id}',      'ProjectController@getOnModerationByUser'); // Получить сырые проекты на модерации
                
        Route::get(     'posted_projects_by/user',      'PostedController@getPostedByUserId');  //  Готовые проекты самого автора

        Route::post(    'posted_project/post/{id}',     'PostedController@PostProject');    // Готовый проект запустить
        
        Route::post(    'project_payment',              'ProjectPaymentController@create');     // Инвестиция

        Route::get(     'project_payment/active',       'ProjectPaymentController@getActiveByUser');    // Инвестиций юзера из активного проекта

        Route::get(     'project_payment/ended',        'ProjectPaymentController@getEndedByUser');    // Инвестиций юзера из завершенного проекта

        Route::get(     'payments_by/project_id',       'ProjectPaymentController@getByProjectId'); // Инвестиций в проекте автора

        Route::post(    'project_payment/delete',       'ProjectPaymentController@deletePayment');  // Инвестицию удалить
        
        Route::get(     'noti/user',                    'NotificationController@getByUser'); // Уведомления самого юзера

        Route::post(    'noti/read',                    'NotificationController@readNoti'); // Прочитать уведомления

        Route::delete(  'noti/delete/{id}',             'NotificationController@deleteById');   // Удалить уведомления
    });
    //-----------------------#END# Authorized User--------------------------------


    //-----------------------------Author-----------------------------------------
    Route::middleware('auth:sanctum', 'author')->prefix( 'v2' )->namespace( 'Api' )->group( function()
    {
        Route::get(     'project/{id}',                 'ProjectController@getProjectById');    // Сырой проект по {id}

        Route::get(     'posted_project/{id}',          'PostedController@getByIdPosted'); // Получить готовый проект по {id}

        Route::get(     'updates/by/id',                'UpdatesController@getByIdUpdates');    // Обновления по {id}
        
        Route::post(    'posted_project/update',        'UpdatesController@updatePosted');  // Обновить готовый проект
        
        Route::get(     'history/get',                  'PostedController@getByIdHistory'); // История проекта
        
        Route::get(     'diary/{id}',                   'DiaryController@getByProjectId');  // Дневник проекта
        
        Route::post(    'diary/{id}',                   'DiaryController@add');     // Добавить комментарий в дневник

        Route::delete(  'diary_delete/{id}',            'DiaryController@deleteById');  // Удалить комментарий в дневнике

        Route::post(    'reward_update',                'ProjectRewardController@update');  // Обновить Reward 

        Route::delete(  'projects_delete_by/{id}',      'ProjectController@deleteRawProjectById');  // Удалить Сырой проекты

        Route::post(    'posted_project_end/byId',      'PostedController@endByIdPosted');   // Готовый проект удалить

        Route::post(    'posted_project_delete',        'PostedController@deleteByIdPosted');   // Готовый проект удалить
    });
    //--------------------------#END# Author--------------------------------------


    //-----------Author--Moderator--Curator--BusinessAngel--Booster---------------
    Route::middleware('auth:sanctum', 'role:admin,curator,b-angel,booster')->prefix( 'v1' )->namespace( 'Api' )->group( function() 
    {
        Route::get(     'history/get',                  'PostedController@getByIdHistory'); // История проекта

        Route::get(     'diary/{id}',                   'DiaryController@getByProjectId');  // Дневник проекта
        
        Route::post(    'diary/{id}',                   'DiaryController@add');     // Добавить комментарий в дневник

        Route::delete(  'diary_delete/{id}',            'DiaryController@deleteById');  // Удалить комментарий в дневнике
    });
    //--------#END# Author--Moderator--Curator--BusinessAngel--Booster------------

    
    //------------------------------Moderator--Curator----------------------------
    Route::middleware('auth:sanctum', 'role:admin,curator')->prefix( 'v1' )->namespace( 'Api' )->group( function() 
    {
        Route::get(     'projects_on_moderation/all',   'ProjectController@getAllOnModeration');    // Все проекты на модерации

        Route::get(     'projects_on_moderation/{id}',  'ProjectController@getByIdOnModeration');   // Проект на модерации по {id}

        Route::get(     'updates/all',                  'UpdatesController@getAllUpdates');     // Все обновления готовых проектов
        
        Route::get(     'updates/by/id',                'UpdatesController@getByIdUpdates');    // Обновления по {id}

        Route::get(     'projects/all',                 'ProjectController@getAllRawProjects'); // Все сырые проекты на сайте
        
        Route::get(     'project/{id}',                 'ProjectController@getProjectById');    // Сырой проект по {id}
    });
    //---------------------------#END# Moderator--Curator-------------------------


    //-------------------------------------Moderator-------------------------------
    Route::middleware('auth:sanctum','role:admin')->prefix( 'v1' )->namespace( 'Api' )->group( function() 
    {
        Route::get(     'users/all',                    'UserController@getAll');   // Все пользователи

        Route::get(     'user_get_by/{param}',          'UserController@getUserBy');    // Получить пользователя по {id} или {email}

        Route::post(    'user/add_wallet',              'UserController@ToWallet'); // Пополнить средства юзеру

        Route::post(    'moderate_to/post/{id}',        'ProjectController@moderatePost');  // Запустить на Модерации
        
        Route::post(    'resume_ended',                 'PostedController@ResumeEnded');  // Поставить рекомендованный

        Route::post(    'set_recomended/{id}',          'PostedController@setRecomended');  // Поставить рекомендованный
        
        Route::post(    'no_recomended/{id}',           'PostedController@noRecomended');   // Убрать рекомендованный
        
        Route::get(     'posted_not/all',               'PostedController@getNotPosted');   // Еще не запущенные Готовые проекты

        Route::delete(  'projects_delete_by/{id}',      'ProjectController@deleteRawProjectById');  // Удалить Сырой проекты

        Route::post(    'posted_project_end/byId',      'PostedController@endByIdPosted');   // Готовый проект остановить

        Route::post(    'posted_project_delete',        'PostedController@deleteByIdPosted');   // Готовый проект удалить
        
        Route::get(     'author/data/{id}',             'AuthorController@get'); // Документы автора
        
        Route::post(    'updates/confirm/{id}',         'UpdatesController@confirmUpdate'); // Принять обновления проекта
        
        Route::delete(  'updates/delete/by/{id}',       'UpdatesController@deleteByIdUpdates'); // Удалить обновление проекта
        
        Route::get(     'transactions/all',             'TransactionController@getTransactions');   // Все транзакций пользователей

        Route::get(     'payments/all',                 'ProjectPaymentController@getAllPayments'); // Получить все инвестиций сайта
        
        Route::get(     'user/role/{id}',               'RoleController@getByUserId');  // Роль по юзера {id}
        
        Route::post(    'user/role_set',                'RoleController@setRole'); // Поставить роль юзеру
        
        Route::post(    'user/role/remove/{id}',        'RoleController@removeRole');   // Удалить Роль юзера

        Route::post(    'noti/add',                     'NotificationController@addNoti');  // Создать уведомление

        Route::post(    'carousel/update',              'CarouselController@updateCarousel');   // Обновить Карусель
                
        Route::post(    'city',                         'CityController@create');   // Создать город
        
        Route::put(     'city/{id}',                    'CityController@update');   // Обновить город по {id}
        
        Route::delete(  'city/{id}',                    'CityController@delete');   // Удалить город
        
        Route::get(     'deleted_closed',               'PostedController@getAllDeletedOrClosed');  // Все удаленные и завершенные проекты

        Route::get(     'deleted_closed/by/{id}',       'PostedController@getDeletedOrClosedById');  // Завершенные проекты по id
    });
    //--------------------------------#END# Moderator------------------------------
