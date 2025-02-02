<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Services\MusicImportService;
use App\Services\MusicUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MusicController extends Controller
{
    protected $musicImportService;
    protected $musicUserService;

    public function __construct(MusicImportService $musicImportService, MusicUserService $musicUserService)
    {
        $this->musicImportService = $musicImportService;
        $this->musicUserService = $musicUserService;
    }

    public function index()
    {
        $musics = Music::all();
        return response()->json($musics);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'artist' => 'required|string',
            'album' => 'nullable|string',
            'isrc' => 'required|string|unique:musics,isrc',
            'platform' => 'required|string',
            'track_id' => 'required|string|unique:musics,track_id',
            'duration' => 'required|integer',
            'added_date' => 'required|date',
            'added_by' => 'nullable|integer|exists:users,id',
            'url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $music = Music::create($request->all());
        return response()->json($music, 201);
    }

    public function show($id)
    {
        $music = Music::find($id);
        if (!$music) {
            return response()->json(['error' => 'Música não encontrada'], 404);
        }
        return response()->json($music);
    }

    public function update(Request $request, $id)
    {
        $music = Music::find($id);
        if (!$music) {
            return response()->json(['error' => 'Música não encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string',
            'artist' => 'sometimes|required|string',
            'album' => 'nullable|string',
            'isrc' => "sometimes|required|string|unique:musics,isrc,{$id}",
            'platform' => 'sometimes|required|string',
            'track_id' => "sometimes|required|string|unique:musics,track_id,{$id}",
            'duration' => 'sometimes|required|integer',
            'added_date' => 'sometimes|required|date',
            'added_by' => 'nullable|integer|exists:users,id',
            'url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $music->update($request->all());
        return response()->json($music);
    }

    public function destroy($id)
    {
        $music = Music::find($id);
        if (!$music) {
            return response()->json(['error' => 'Música não encontrada'], 404);
        }

        $music->delete();
        return response()->json(['message' => 'Música excluída com sucesso']);
    }

    public function associateUserMusic(Request $request)
    {
        $request->validate([
            'music_id' => 'required|integer|exists:musics,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        try {
            $this->musicUserService->associateOrDisassociate($request->input('music_id'), $request->input('user_id'));
            return response()->json(['message' => 'Usuário associado à música com sucesso.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserMusic(Request $request, $user_id = null)
    {
        $userId = $user_id ?: $request->user()->id;

        $query = "SELECT musics.* 
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

    public function likeOrDislike(Request $request, $music_id)
    {
        
        $music = Music::find($music_id);

        if (!$music) {
            return response()->json(['error' => 'Música não encontrada'], 404);
        }

        try {
            $like = $this->musicUserService->associateOrDisassociate($music_id, $request->user()->id);
            return response()->json(['message' => 'Operação realizada com sucesso.', 'like_status' => $like], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
