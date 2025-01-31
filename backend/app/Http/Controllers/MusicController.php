<?php

namespace App\Http\Controllers;

use App\Services\MusicImportService;
use App\Services\MusicUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MusicController extends Controller
{
    protected $musicImportService;
    protected $musicUserService;

    public function __construct(MusicImportService $musicImportService, MusicUserService $musicUserService)
    {
        $this->musicImportService = $musicImportService;
        $this->musicUserService = $musicUserService;
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        try {
            $this->musicImportService->importFromCsv($request->file('file'));
            return response()->json(['message' => 'Importação concluída com sucesso.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function associateUserMusic(Request $request)
    {
        $request->validate([
            'music_id' => 'required|integer|exists:musics,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        try {
            $this->musicUserService->associate($request->input('music_id'), $request->input('user_id'));
            return response()->json(['message' => 'Usuário associado à música com sucesso.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserMusic(Request $request)
    {
        $userId = $request->input('user_id');

        $query = "SELECT users.name, musics.title 
                FROM users 
                INNER JOIN music_user ON users.id = music_user.user_id 
                INNER JOIN musics ON musics.id = music_user.music_id";

        $bindings = [];

        if ($userId) {
            $query .= " WHERE users.id = ?";
            $bindings[] = $userId;
        }

        $musics = DB::select($query, $bindings);

        return response()->json($musics);
    }
}
