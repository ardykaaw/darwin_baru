<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $content
 * @property Carbon $date
 * @property string|null $image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Activity extends Model
{
    protected $fillable = ['title', 'content', 'date', 'image'];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }
}
