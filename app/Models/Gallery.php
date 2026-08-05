<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $image_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Gallery extends Model
{
    protected $fillable = ['title', 'image_path'];
}
