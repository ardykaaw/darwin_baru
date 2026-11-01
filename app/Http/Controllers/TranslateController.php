<?php

namespace App\Http\Controllers;

use DOMDocument;
use DOMXPath;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslateController extends Controller
{
    /**
     * Translate text or HTML content from one language to another.
     */
    public function translate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'content' => 'nullable|string',
            'text' => 'nullable|string',
            'texts' => 'nullable|array',
            'texts.*' => 'string',
            'titles' => 'nullable|array',
            'titles.*' => 'string',
            'items' => 'nullable|array',
            'from' => 'nullable|string|max:5',
            'to' => 'nullable|string|max:5',
        ]);

        $from = $validated['from'] ?? 'id';
        $to = $validated['to'] ?? 'en';

        // Same language: return immediately
        if ($from === $to) {
            return response()->json([
                'title' => $validated['title'] ?? null,
                'content' => $validated['content'] ?? null,
                'text' => $validated['text'] ?? null,
                'texts' => $validated['texts'] ?? [],
                'titles' => $validated['titles'] ?? [],
            ]);
        }

        $response = [];

        // Translate single title
        if (!empty($validated['title'])) {
            $response['title'] = $this->translateSingleText($validated['title'], $from, $to);
        }

        // Translate HTML content
        if (!empty($validated['content'])) {
            $response['content'] = $this->translateHtml($validated['content'], $from, $to);
        }

        // Translate generic text
        if (!empty($validated['text'])) {
            $response['text'] = $this->translateSingleText($validated['text'], $from, $to);
        }

        // Translate array of texts
        if (!empty($validated['texts'])) {
            $translatedList = [];
            foreach ($validated['texts'] as $key => $val) {
                $translatedList[$key] = $this->translateSingleText($val, $from, $to);
            }
            $response['texts'] = $translatedList;
        }

        // Translate dictionary of titles (e.g. for card listings on /news or /)
        if (!empty($validated['titles'])) {
            $translatedTitles = [];
            foreach ($validated['titles'] as $key => $val) {
                $translatedTitles[$key] = $this->translateSingleText($val, $from, $to);
            }
            $response['titles'] = $translatedTitles;
        }

        return response()->json($response);
    }

    /**
     * Translate text, breaking long paragraphs into sentences to respect 500-char API limits.
     */
    public function translateSingleText(string $text, string $from = 'id', string $to = 'en'): string
    {
        $clean = trim($text);
        if ($clean === '' || mb_strlen($clean) < 2) {
            return $text;
        }

        // If longer than 350 chars, split into sentence chunks
        if (mb_strlen($clean) > 350) {
            $chunks = $this->splitIntoChunks($clean, 350);
            $translatedChunks = [];
            foreach ($chunks as $chunk) {
                $translatedChunks[] = $this->translateChunk($chunk, $from, $to);
            }
            return implode(' ', $translatedChunks);
        }

        return $this->translateChunk($clean, $from, $to);
    }

    /**
     * Translate an individual chunk <= 350 chars with persistent caching.
     */
    protected function translateChunk(string $chunk, string $from, string $to): string
    {
        $clean = trim($chunk);
        if ($clean === '' || mb_strlen($clean) < 2) {
            return $chunk;
        }

        $cacheKey = "tr_chunk_{$from}_{$to}_" . md5($clean);

        return Cache::rememberForever($cacheKey, function () use ($clean, $from, $to) {
            try {
                $url = 'https://api.mymemory.translated.net/get?q=' . urlencode($clean) . "&langpair={$from}|{$to}";
                $response = Http::timeout(8)->get($url);

                if ($response->successful()) {
                    $json = $response->json();
                    $translated = $json['responseData']['translatedText'] ?? null;
                    if (!empty($translated) && is_string($translated)) {
                        // Check if API returned an error message string
                        if (!str_contains($translated, 'QUERY LENGTH LIMIT EXCEEDED')) {
                            return html_entity_decode($translated, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                        }
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('Translation failed for chunk: ' . mb_substr($clean, 0, 40) . ' Error: ' . $e->getMessage());
            }

            return $clean;
        });
    }

    /**
     * Split long text into natural sentence chunks within maximum length.
     */
    protected function splitIntoChunks(string $text, int $maxLen = 350): array
    {
        if (mb_strlen($text) <= $maxLen) {
            return [$text];
        }

        // Split by punctuation followed by whitespace
        $sentences = preg_split('/(?<=[.?!])\s+/', $text);
        $chunks = [];
        $current = '';

        foreach ($sentences as $s) {
            if ($current === '') {
                $current = $s;
            } elseif (mb_strlen($current . ' ' . $s) <= $maxLen) {
                $current .= ' ' . $s;
            } else {
                $chunks[] = $current;
                $current = $s;
            }
        }

        if ($current !== '') {
            $chunks[] = $current;
        }

        return $chunks;
    }

    /**
     * Translate HTML content while preserving all DOM tags and structures.
     */
    public function translateHtml(string $html, string $from = 'id', string $to = 'en'): string
    {
        $trimmed = trim($html);
        if ($trimmed === '') {
            return $html;
        }

        $cacheKey = "tr_html_v2_{$from}_{$to}_" . md5($trimmed);

        return Cache::rememberForever($cacheKey, function () use ($trimmed, $from, $to) {
            try {
                $dom = new DOMDocument();
                libxml_use_internal_errors(true);

                // Encode numeric entities and wrap in single root div to guarantee complete tree parsing
                $encoded = mb_encode_numericentity($trimmed, [0x80, 0x10FFFF, 0, 0x1FFFFF], 'UTF-8');
                $dom->loadHTML('<div>' . $encoded . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
                libxml_clear_errors();

                $xpath = new DOMXPath($dom);
                $textNodes = $xpath->query('//text()[normalize-space()]');

                if ($textNodes && $textNodes->length > 0) {
                    foreach ($textNodes as $node) {
                        $raw = trim($node->nodeValue);
                        if (!empty($raw) && mb_strlen($raw) >= 2) {
                            $translated = $this->translateSingleText($raw, $from, $to);
                            $node->nodeValue = $translated;
                        }
                    }

                    // Extract inner HTML of the wrapper div
                    $wrapper = $dom->getElementsByTagName('div')->item(0);
                    if ($wrapper) {
                        $innerHtml = '';
                        foreach ($wrapper->childNodes as $child) {
                            $innerHtml .= $dom->saveHTML($child);
                        }
                        return $innerHtml;
                    }
                }
            } catch (\Throwable $e) {
                Log::warning('HTML Translation failed: ' . $e->getMessage());
            }

            return $trimmed;
        });
    }
}
