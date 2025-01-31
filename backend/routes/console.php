<?php

use App\Services\MusicImportService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('import:music {file}', function ($file) {
    $musicImportService = new MusicImportService();

    try {
        $result = $musicImportService->importFromCsv($file);
        $this->info($result);
    } catch (\Exception $e) {
        $this->error($e->getMessage());
    }
})->purpose('Importar músicas de um arquivo CSV');