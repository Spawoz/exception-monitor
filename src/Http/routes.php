<?php

// resource routes (index and delete)
Route::resource(config('sptexception.log_dashboard_url'), 'Spt\ExceptionHandling\Http\ExceptionController');
