<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Music;

class MusicImportService
{
    const DEFAULT_BATCH_SIZE = 100;

    public function importFromCsv($file)
    {
        if (!file_exists($file)) {
            throw new \Exception("O arquivo {$file} não existe.");
        }

        DB::beginTransaction();

        try {
            $batchSize = self::DEFAULT_BATCH_SIZE; 
            $batch = [];

            foreach ($this->parseCsvFile($file) as $data) {
                
                $validator = Validator::make($data, [
                    'title' => 'required|string|max:255',
                    'artist' => 'required|string|max:255',
                    'album' => 'nullable|string|max:255',
                    'isrc' => 'required|string|unique:musics,isrc|max:255',
                    'platform' => 'required|string|max:255',
                    'trackId' => 'required|string|unique:musics,track_id|max:255',
                    'duration' => 'required|string|regex:/^\d+s$/',
                    'addedDate' => 'required|date',
                    'addedBy' => 'nullable|exists:users,id',
                    'url' => 'nullable|url',
                ]);

                if ($validator->fails()) {
                    throw new \Exception("Erro de validação: " . json_encode($validator->errors()));
                }
                
                $formattedData = [
                    'title' => $data['title'],
                    'artist' => $data['artist'],
                    'album' => $data['album'],
                    'isrc' => $data['isrc'],
                    'platform' => $data['platform'],
                    'track_id' => $data['trackId'],
                    'duration' => (int) str_replace('s', '', $data['duration']), 
                    'added_date' => date('Y-m-d H:i:s', strtotime($data['addedDate'])),
                    'added_by' => $data['addedBy'] ?: null,
                    'url' => $data['url'],
                ];

                $batch[] = $formattedData;
                
                if (count($batch) >= $batchSize) {
                    Music::insert($batch);
                    $batch = [];
                }
            }

            if (!empty($batch)) {
                Music::insert($batch);
            }

            DB::commit();
            return "Importação concluída com sucesso!";

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function parseCsvFile($file)
    {
        $handle = fopen($file, 'r');
        if (!$handle) {
            throw new \Exception("Não foi possível abrir o arquivo {$file}.");
        }

        // Ajusta a leitura do arquivo para ignorar o BOM (Byte Order Mark)
        $bom = fread($handle, 3);
        if ($bom !== "\xEF\xBB\xBF") {
            
            rewind($handle);
        }
        
        $header = fgetcsv($handle, 0, ','); 
        if ($header === false) {
            throw new \Exception("O arquivo CSV está vazio ou mal formatado.");
        }
    
        while (($row = fgetcsv($handle, 0, ',')) !== false) {
            if (empty($row)) {
                continue;
            }

            yield array_combine($header, $row);
        }

        fclose($handle);
    }
}