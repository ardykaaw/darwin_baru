<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string|null $category
 * @property bool $is_anonymous
 * @property string|null $reporter_name
 * @property string|null $reporter_phone
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Report extends Model
{
    protected $fillable = ['title', 'description', 'category', 'is_anonymous', 'reporter_name', 'reporter_phone', 'status'];

    protected function casts(): array
    {
        return [
            'is_anonymous' => 'boolean',
        ];
    }
}
