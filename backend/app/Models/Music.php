<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    use HasFactory;

    protected $table = 'musics';

    protected $fillable = [
        'track_id',
        'title',
        'artist',
        'album',
        'isrc',
        'platform',
        'duration',
        'added_date',
        'added_by',
        'url',
    ];

    protected $casts = [
        'added_date' => 'datetime',
        'duration' => 'integer',
    ];

    public function addedByUser()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'music_user', 'music_id', 'user_id')
                    ->withTimestamps();
    }
}