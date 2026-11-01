import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Check,
    Code,
    CornerDownLeft,
    Edit3,
    Eye,
    Heading2,
    Heading3,
    HelpCircle,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    Quote,
    Redo2,
    RemoveFormatting,
    Strikethrough,
    Type,
    Underline,
    Undo2,
    Unlink,
    X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
    className?: string;
    error?: string;
    onSaveShortcut?: () => void;
    variant?: 'card' | 'seamless';
}

type EditorTab = 'visual' | 'html' | 'preview';

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Mulai menulis paragraf isi berita di sini...',
    minHeight = '480px',
    className,
    error,
    onSaveShortcut,
    variant = 'card',
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState<EditorTab>('visual');
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strike: false,
        heading2: false,
        heading3: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        alignLeft: false,
        alignCenter: false,
        alignRight: false,
        alignJustify: false,
    });

    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [savedSelection, setSavedSelection] = useState<Range | null>(null);

    // Sync content into contentEditable
    useEffect(() => {
        if (editorRef.current && tab === 'visual') {
            if (editorRef.current.innerHTML !== (value || '')) {
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [value, tab]);

    function updateFormatStates() {
        if (!editorRef.current) return;
        try {
            const isBold = document.queryCommandState('bold');
            const isItalic = document.queryCommandState('italic');
            const isUnderline = document.queryCommandState('underline');
            const isStrike = document.queryCommandState('strikeThrough');
            const isBulletList = document.queryCommandState('insertUnorderedList');
            const isOrderedList = document.queryCommandState('insertOrderedList');
            const isAlignLeft = document.queryCommandState('justifyLeft');
            const isAlignCenter = document.queryCommandState('justifyCenter');
            const isAlignRight = document.queryCommandState('justifyRight');
            const isAlignJustify = document.queryCommandState('justifyFull');

            const sel = window.getSelection();
            let isH2 = false;
            let isH3 = false;
            let isBlockquote = false;

            if (sel && sel.anchorNode) {
                let parent: HTMLElement | null =
                    sel.anchorNode.nodeType === 3
                        ? (sel.anchorNode.parentElement as HTMLElement)
                        : (sel.anchorNode as HTMLElement);

                while (parent && parent !== editorRef.current) {
                    const tag = parent.tagName?.toLowerCase();
                    if (tag === 'h2') isH2 = true;
                    if (tag === 'h3') isH3 = true;
                    if (tag === 'blockquote') isBlockquote = true;
                    parent = parent.parentElement;
                }
            }

            setActiveFormats({
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                strike: isStrike,
                heading2: isH2,
                heading3: isH3,
                bulletList: isBulletList,
                orderedList: isOrderedList,
                blockquote: isBlockquote,
                alignLeft: isAlignLeft,
                alignCenter: isAlignCenter,
                alignRight: isAlignRight,
                alignJustify: isAlignJustify,
            });
        } catch {
            // ignore
        }
    }

    function handleInput() {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html === '<p><br></p>' || html === '<br>' ? '' : html);
            updateFormatStates();
        }
    }

    function exec(command: string, arg: string | undefined = undefined) {
        if (tab !== 'visual') return;
        editorRef.current?.focus();
        document.execCommand(command, false, arg);
        handleInput();
    }

    function formatBlock(tag: 'h2' | 'h3' | 'p' | 'blockquote') {
        if (tab !== 'visual') return;
        editorRef.current?.focus();

        const currentFormat = document.queryCommandValue('formatBlock');
        if (currentFormat.toLowerCase() === tag.toLowerCase()) {
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('formatBlock', false, tag);
        }
        handleInput();
    }

    function openLinkModal() {
        if (tab !== 'visual') return;
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            setSavedSelection(sel.getRangeAt(0));
        }
        setLinkUrl('');
        setLinkModalOpen(true);
    }

    function applyLink() {
        if (savedSelection) {
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(savedSelection);
        }

        if (linkUrl.trim()) {
            const formattedUrl = /^https?:\/\//i.test(linkUrl) ? linkUrl : `https://${linkUrl}`;
            document.execCommand('createLink', false, formattedUrl);
            handleInput();
        }
        setLinkModalOpen(false);
        setSavedSelection(null);
    }

    function unlink() {
        exec('unlink');
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            onSaveShortcut?.();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            exec('bold');
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            exec('italic');
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            exec('underline');
        }
    }

    // Word and character statistics
    const plainText = (value || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const charCount = plainText.length;
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div
            className={cn(
                variant === 'seamless'
                    ? 'flex min-w-0 flex-col bg-white'
                    : 'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all focus-within:border-brand-teal/50 focus-within:ring-4 focus-within:ring-brand-teal/10',
                error && 'border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/10',
                className,
            )}
        >
            {/* Sticky Modern Floating Toolbar */}
            <div
                className={cn(
                    'sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/90 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:px-6 lg:px-8',
                    variant === 'seamless' && 'border-t border-slate-100/80',
                )}
            >
                <div className="flex flex-wrap items-center gap-1">
                    {/* Undo / Redo */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={() => exec('undo')}
                            title="Urungkan (Ctrl+Z)"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-brand-navy hover:shadow-xs"
                        >
                            <Undo2 className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('redo')}
                            title="Ulangi (Ctrl+Y)"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-brand-navy hover:shadow-xs"
                        >
                            <Redo2 className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="mx-1 h-5 w-px bg-slate-200" />

                    {/* Block Headings */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={() => formatBlock('p')}
                            title="Paragraf Biasa"
                            className={cn(
                                'inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all',
                                !activeFormats.heading2 && !activeFormats.heading3
                                    ? 'bg-white text-brand-navy shadow-xs'
                                    : 'text-slate-600 hover:text-brand-navy',
                            )}
                        >
                            <Pilcrow className="h-3.5 w-3.5" />
                            <span>Teks</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => formatBlock('h2')}
                            title="Judul Bab (H2)"
                            className={cn(
                                'inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all',
                                activeFormats.heading2
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:text-brand-navy',
                            )}
                        >
                            <Heading2 className="h-3.5 w-3.5" />
                            <span>H2</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => formatBlock('h3')}
                            title="Sub Judul (H3)"
                            className={cn(
                                'inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-bold transition-all',
                                activeFormats.heading3
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:text-brand-navy',
                            )}
                        >
                            <Heading3 className="h-3.5 w-3.5" />
                            <span>H3</span>
                        </button>
                    </div>

                    <span className="mx-1 h-5 w-px bg-slate-200" />

                    {/* Inline Formats */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={() => exec('bold')}
                            title="Tebal / Bold (Ctrl+B)"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.bold
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <Bold className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('italic')}
                            title="Miring / Italic (Ctrl+I)"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.italic
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <Italic className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('underline')}
                            title="Garis Bawah / Underline (Ctrl+U)"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.underline
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <Underline className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('strikeThrough')}
                            title="Coret / Strikethrough"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.strike
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <Strikethrough className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="mx-1 h-5 w-px bg-slate-200" />

                    {/* Lists, Quote & Divider */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={() => exec('insertUnorderedList')}
                            title="Daftar Poin (Bullet List)"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.bulletList
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <List className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('insertOrderedList')}
                            title="Daftar Nomor (Numbered List)"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.orderedList
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <ListOrdered className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => formatBlock('blockquote')}
                            title="Kutipan / Blockquote"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.blockquote
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <Quote className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('insertHorizontalRule')}
                            title="Garis Pembatas (Divider)"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-brand-navy hover:shadow-xs"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="mx-1 h-5 w-px bg-slate-200" />

                    {/* Alignments */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={() => exec('justifyLeft')}
                            title="Rata Kiri"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.alignLeft
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <AlignLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('justifyCenter')}
                            title="Rata Tengah"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.alignCenter
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <AlignCenter className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('justifyRight')}
                            title="Rata Kanan"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.alignRight
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <AlignRight className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('justifyFull')}
                            title="Rata Kanan-Kiri"
                            className={cn(
                                'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                                activeFormats.alignJustify
                                    ? 'bg-brand-teal text-white shadow-xs'
                                    : 'text-slate-600 hover:bg-white hover:text-brand-navy hover:shadow-xs',
                            )}
                        >
                            <AlignJustify className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="mx-1 h-5 w-px bg-slate-200" />

                    {/* Links & Clean */}
                    <div className="flex items-center rounded-xl bg-slate-100/90 p-0.5">
                        <button
                            type="button"
                            onClick={openLinkModal}
                            title="Sisipkan Link"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-brand-teal-dark hover:shadow-xs"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={unlink}
                            title="Hapus Link"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-brand-navy hover:shadow-xs"
                        >
                            <Unlink className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => exec('removeFormat')}
                            title="Hapus Semua Format"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-white hover:text-rose-600 hover:shadow-xs"
                        >
                            <RemoveFormatting className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* View Mode Segmented Switcher */}
                <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
                    <button
                        type="button"
                        onClick={() => setTab('visual')}
                        className={cn(
                            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all',
                            tab === 'visual'
                                ? 'bg-white text-brand-navy shadow-xs'
                                : 'hover:text-brand-navy',
                        )}
                    >
                        <Edit3 className="h-3.5 w-3.5 text-brand-teal" />
                        Editor Visual
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('html')}
                        className={cn(
                            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all',
                            tab === 'html'
                                ? 'bg-white text-brand-navy shadow-xs'
                                : 'hover:text-brand-navy',
                        )}
                    >
                        <Code className="h-3.5 w-3.5 text-brand-orange-dark" />
                        HTML
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('preview')}
                        className={cn(
                            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all',
                            tab === 'preview'
                                ? 'bg-white text-brand-navy shadow-xs'
                                : 'hover:text-brand-navy',
                        )}
                    >
                        <Eye className="h-3.5 w-3.5 text-brand-teal-dark" />
                        Pratinjau
                    </button>
                </div>
            </div>

            {/* Link Input Floating Bar */}
            {linkModalOpen && (
                <div className="animate-fade-in flex items-center gap-2 border-b border-brand-teal/20 bg-brand-teal/[0.04] p-3 px-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal-dark">
                        <LinkIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-brand-navy">Masukkan Tautan Web:</span>
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://contoh-link.com"
                        className="h-8 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-xs outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                applyLink();
                            } else if (e.key === 'Escape') {
                                setLinkModalOpen(false);
                            }
                        }}
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={applyLink}
                        className="inline-flex h-8 items-center gap-1 rounded-xl bg-brand-teal px-3.5 text-xs font-bold text-white shadow-xs hover:bg-brand-teal-dark"
                    >
                        <Check className="h-3.5 w-3.5" />
                        Terapkan
                    </button>
                    <button
                        type="button"
                        onClick={() => setLinkModalOpen(false)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200/80 hover:text-slate-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Editor Canvas Area */}
            <div className="relative min-w-0 flex-1 bg-white">
                {/* Visual Editor */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onKeyUp={updateFormatStates}
                    onMouseUp={updateFormatStates}
                    onKeyDown={handleKeyDown}
                    style={{ minHeight }}
                    data-placeholder={placeholder}
                    className={cn(
                        'min-w-0 w-full overflow-y-auto px-6 py-6 text-base leading-relaxed text-slate-800 outline-none sm:px-8',
                        'break-words',
                        'prose prose-slate max-w-none',
                        '[&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-brand-navy',
                        '[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-navy',
                        '[&_p]:mb-4 [&_p]:leading-relaxed',
                        '[&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-teal [&_blockquote]:bg-brand-teal/[0.04] [&_blockquote]:py-3 [&_blockquote]:pr-5 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-brand-navy',
                        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
                        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
                        '[&_li]:mb-1.5',
                        '[&_hr]:my-6 [&_hr]:border-t-2 [&_hr]:border-slate-100',
                        '[&_a]:font-bold [&_a]:text-brand-teal-dark [&_a]:underline',
                        // Placeholder
                        'empty:before:pointer-events-none empty:before:text-slate-300 empty:before:content-[attr(data-placeholder)]',
                        tab !== 'visual' && 'hidden',
                    )}
                />

                {/* Raw HTML Editor */}
                {tab === 'html' && (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="<p>Tulis kode HTML di sini...</p>"
                        style={{ minHeight }}
                        className="w-full resize-y bg-slate-900 p-6 font-mono text-xs leading-relaxed text-emerald-400 outline-none selection:bg-emerald-500 selection:text-black"
                    />
                )}

                {/* Public View Preview */}
                {tab === 'preview' && (
                    <div
                        style={{ minHeight }}
                        className="overflow-y-auto bg-slate-50/50 p-6 sm:p-8"
                    >
                        {value ? (
                            <div
                                className="prose prose-slate max-w-none text-base leading-relaxed text-slate-800 lg:text-lg [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-navy [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-navy [&_p]:mb-4 [&_p]:leading-relaxed [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-teal [&_blockquote]:bg-brand-teal/[0.04] [&_blockquote]:py-3 [&_blockquote]:pr-6 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-brand-navy [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_hr]:my-8 [&_hr]:border-slate-200 [&_a]:font-bold [&_a]:text-brand-teal-dark [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: value }}
                            />
                        ) : (
                            <div className="flex h-56 flex-col items-center justify-center text-slate-400">
                                <Eye className="mb-2 h-9 w-9 text-slate-300" />
                                <p className="text-sm font-semibold">Belum ada konten untuk dipratinjau.</p>
                                <p className="mt-1 text-xs text-slate-400">Tulis teks di mode visual untuk melihat hasil render di sini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Clean Status Bar */}
            <div
                className={cn(
                    'flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-2.5 text-xs text-slate-500 sm:px-6 lg:px-8',
                    variant === 'seamless' && 'rounded-b-3xl',
                )}
            >
                <div className="flex items-center gap-4">
                    <span>
                        <strong className="font-bold text-slate-700">{wordCount}</strong> kata
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span>
                        <strong className="font-bold text-slate-700">{charCount}</strong> karakter
                    </span>
                    <span className="h-3 w-px bg-slate-200" />
                    <span className="text-slate-600">
                        Waktu baca: <strong className="font-bold text-slate-700">{readingTime} menit</strong>
                    </span>
                </div>
                <div className="hidden items-center gap-1.5 text-[11px] text-slate-400 sm:flex">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                        Ctrl+S
                    </span>
                    <span>Simpan Cepat</span>
                </div>
            </div>
        </div>
    );
}
