export type Locale = 'id' | 'en';

export type TranslationKey = keyof typeof translations.id;

export const translations = {
    id: {
        // === Navigation ===
        'nav.home': 'Beranda',
        'nav.activities': 'Jejak Kiprah',
        'nav.news': 'Berita',
        'nav.galleries': 'Galeri',
        'nav.report': 'Lapor Darwin',
        'nav.aspirasi': 'Lapor Darwin',
        'nav.menu_open': 'Buka menu',
        'nav.menu_close': 'Tutup menu',
        'nav.menu_title': 'Menu Navigasi',
        'nav.menu_desc': 'Menu navigasi Darwin Center',

        // === Footer ===
        'footer.tagline':
            'Ruang dialektika dan catatan pemikiran tentang tata kelola publik, inovasi, dan pembangunan berkelanjutan Muna Barat.',
        'footer.navigation': 'Navigasi',
        'footer.information': 'Informasi',
        'footer.latest_news': 'Berita Terkini',
        'footer.aspirasi_title': 'Lapor Darwin',
        'footer.aspirasi_desc':
            'Kanal pengaduan dan aspirasi langsung warga Muna Barat. Sampaikan laporan Anda ke Darwin Center.',
        'footer.submit_report': 'Buka Lapor Darwin',
        'footer.rights': 'All rights reserved.',
        'footer.admin_login': 'Admin Login',

        // === Hero (Home) ===
        'hero.badge': 'Bersama Membangun Muna Barat',
        'hero.title_line1': 'Meniti Jalan Inovasi,',
        'hero.title_line2': 'Menginspirasi Perubahan',
        'hero.title_line3': 'Berkelanjutan',
        'hero.desc_prefix': 'Ruang dialektika, catatan pemikiran dan esensi kepemimpinan dari',
        'hero.desc_and': 'dan',
        'hero.desc_suffix':
            'Mengulas gagasan modernisasi, tata kelola publik dan strategi pembangunan berkelanjutan.',
        'hero.cta_kiprah': 'Kiprah dan Gagasan',
        'hero.cta_aspirasi': 'Lapor Darwin',
        'hero.caption_name': 'La Ode Darwin & Rhika P.',
        'hero.caption_role': 'Kepemimpinan Muna Barat',
        'hero.stat_pillars': 'Pilar Layanan',
        'hero.stat_transparency': 'Transparansi',
        'hero.stat_districts': 'Kecamatan Terjangkau',
        'hero.page_title': 'Kepemimpinan Inovatif',

        // === Marquee ===
        'marquee.1': 'Membangun Muna Barat',
        'marquee.2': 'Transparansi Publik',
        'marquee.3': 'Inovasi Pelayanan',
        'marquee.4': 'Kolaborasi Warga',
        'marquee.5': 'Pembangunan Berkelanjutan',
        'marquee.6': 'Partisipasi Masyarakat',
        'marquee.7': 'Tata Kelola Modern',

        // === Fondasi Kinerja ===
        'fondasi.badge': 'Fondasi Kinerja',
        'fondasi.title_prefix': 'Menghubungkan layanan publik dengan',
        'fondasi.title_highlight': 'aspirasi warga',
        'fondasi.title_suffix': 'dalam satu platform.',
        'fondasi.desc':
            'Darwin Center hadir sebagai ruang digital untuk melacak program, menyampaikan aspirasi, dan memperkuat transparansi. Semua informasi dirancang agar jelas, ringkas, dan bergerak sejalan dengan kebutuhan masyarakat Muna Barat.',
        'fondasi.checklist.digital': 'Digital',
        'fondasi.checklist.digital_desc': 'Layanan online yang mudah diakses',
        'fondasi.checklist.data': 'Data',
        'fondasi.checklist.data_desc': 'Terbuka dan akurat',
        'fondasi.checklist.participation': 'Partisipasi',
        'fondasi.checklist.participation_desc': 'Aspirasi warga teruji',
        'fondasi.checklist.innovation': 'Inovasi',
        'fondasi.checklist.innovation_desc': 'Program berkelanjutan',
        'fondasi.card_overline': 'Fokus utama',
        'fondasi.card_title': 'Empat pilar layanan',
        'fondasi.card.digital': 'Digital',
        'fondasi.card.digital_val': 'Layanan online',
        'fondasi.card.data': 'Data',
        'fondasi.card.data_val': 'Terbuka & akurat',
        'fondasi.card.participation': 'Partisipasi',
        'fondasi.card.participation_val': 'Aspirasi warga',
        'fondasi.card.innovation': 'Inovasi',
        'fondasi.card.innovation_val': 'Berkelanjutan',

        // === Pillars ===
        'pillar.speed_label': 'Kecepatan',
        'pillar.speed_title': 'Respons Lebih Cepat',
        'pillar.speed_desc':
            'Proses pelaporan dan informasi layanan dirancang untuk mencapai respons cepat dari perangkat pemerintahan.',
        'pillar.clarity_label': 'Kejelasan',
        'pillar.clarity_title': 'Transparansi Terukur',
        'pillar.clarity_desc':
            'Setiap program dan laporan dibuat agar mudah dipahami oleh warga dan pemangku kebijakan.',
        'pillar.collab_label': 'Kolaborasi',
        'pillar.collab_title': 'Suara untuk Semua',
        'pillar.collab_desc':
            'Mendorong keterlibatan masyarakat melalui forum aspirasi, laporan, dan dialog publik berkelanjutan.',
        'pillar.impact_label': 'Dampak',
        'pillar.impact_title': 'Aksi Berkelanjutan',
        'pillar.impact_desc':
            'Program-program yang dirancang hari ini dibangun agar berdampak nyata untuk generasi mendatang.',

        // === News Section (Home) ===
        'news_section.badge': 'Berita Terbaru',
        'news_section.title': 'Sorotan berita paling baru dari Darwin Center.',
        'news_section.view_all': 'Lihat Semua Berita',
        'news_section.headline_badge': 'Berita Utama',
        'news_section.read_now': 'Baca Sekarang',
        'news_section.coming_soon': 'Berita lainnya segera hadir',

        // === Gallery Section (Home) ===
        'gallery_section.badge': 'Galeri Terbaru',
        'gallery_section.title': 'Dokumentasi visual terkini dari Darwin Center.',
        'gallery_section.view_all': 'Lihat Semua Galeri',
        'gallery_section.view_gallery': 'Lihat galeri',

        // === Programs ===
        'programs.badge': 'Inisiatif Unggulan',
        'programs.title': 'Program yang mengubah arah pembangunan.',
        'programs.edu_badge': 'Edukasi',
        'programs.edu_title': 'Pendidikan Digital',
        'programs.edu_desc':
            'Membuka akses kelas digital dan pelatihan tenaga pendidik di seluruh kecamatan.',
        'programs.edu_status': 'Dalam Rencana',
        'programs.edu_point1': 'Akses kelas digital',
        'programs.edu_point2': 'Pelatihan pendidik',
        'programs.infra_badge': 'Infrastruktur',
        'programs.infra_title': 'Revitalisasi Publik',
        'programs.infra_desc':
            'Meningkatkan fasilitas umum dan infrastruktur lokal untuk memperkuat konektivitas antar desa.',
        'programs.infra_status': 'Aktif',
        'programs.infra_point1': 'Fasilitas umum',
        'programs.infra_point2': 'Konektivitas desa',
        'programs.part_badge': 'Fitur Unggulan',
        'programs.part_title': 'Lapor Darwin',
        'programs.part_desc':
            'Layanan pengaduan dan aspirasi langsung warga ke meja kepemimpinan daerah. Dapat dikirim secara terbuka maupun 100% anonim.',
        'programs.part_status': 'Aktif 24/7',
        'programs.part_point1': 'Pilihan 100% anonim & rahasia',
        'programs.part_point2': 'Verifikasi & tindak lanjut cepat',
        'programs.status_prefix': 'Status:',

        // === Lapor Darwin Spotlight (Fitur Unggulan) ===
        'lapor_spotlight.badge': '✦ FITUR UNGGULAN DARWIN CENTER',
        'lapor_spotlight.title_prefix': 'Lapor Darwin:',
        'lapor_spotlight.title_highlight': 'Kanal Pengaduan & Aspirasi Langsung',
        'lapor_spotlight.title_suffix': 'ke Meja Kepemimpinan Daerah',
        'lapor_spotlight.desc':
            'Kanal resmi partisipasi publik warga Muna Barat bersama La Ode Darwin. Laporkan permasalahan jalan rusak, fasilitas publik, sekolah, puskesmas, hingga tata kelola desa secara cepat, transparan, dan terjamin kerahasiaannya.',
        'lapor_spotlight.cta_button': 'Mulai Buat Laporan Sekarang',
        'lapor_spotlight.cta_hotline': 'Hotline Bantuan Langsung',
        'lapor_spotlight.active_status': 'Layanan Aktif Menerima Laporan Warga',
        'lapor_spotlight.benefit_anon_title': 'Opsi 100% Anonim & Rahasia',
        'lapor_spotlight.benefit_anon_desc': 'Identitas dan nomor telepon Anda terjaga aman jika memilih mode anonim.',
        'lapor_spotlight.benefit_speed_title': 'Respons & Pantauan Langsung',
        'lapor_spotlight.benefit_speed_desc': 'Setiap laporan diverifikasi tim secara berkala untuk percepatan solusi di lapangan.',
        'lapor_spotlight.benefit_sector_title': 'Lintas Sektor Pembangunan',
        'lapor_spotlight.benefit_sector_desc': 'Infrastruktur, pendidikan, pelayanan publik, kesehatan, hingga lingkungan.',
        'lapor_spotlight.preview_badge': 'Form Pengaduan Cepat',
        'lapor_spotlight.preview_title': 'Mudah, Cepat, dan Tepat Sasaran',
        'lapor_spotlight.preview_subtitle': 'Sampaikan aduan Anda hanya dalam 4 langkah mudah:',
        'lapor_spotlight.preview_step1': 'Tulis judul & rincian kronologi permasalahan',
        'lapor_spotlight.preview_step2': 'Pilih kategori bidang (Infrastruktur, Sekolah, dll)',
        'lapor_spotlight.preview_step3': 'Pilih kirim secara terbuka atau 100% anonim',
        'lapor_spotlight.preview_step4': 'Laporan diterima & dipantau untuk ditindaklanjuti',

        // === CTA Section ===
        'cta.badge': 'Terbuka untuk Semua Warga',
        'cta.title': 'Dukung Perubahan, Kirim Laporan ke Lapor Darwin',
        'cta.desc':
            'Kajian, berita, dan laporan di sini dibuat untuk memperkuat transparansi serta memastikan suara masyarakat Muna Barat langsung didengar dan ditindaklanjuti.',
        'cta.submit': 'Buka Form Lapor Darwin',
        'cta.browse': 'Telusuri Kiprah & Gagasan',

        // === News Index Page ===
        'news_page.title': 'Berita',
        'news_page.hero_badge': 'Berita',
        'news_page.hero_title': 'Kabar terkini dari Darwin Center.',
        'news_page.hero_desc': 'Isu terkini, hasil kerja, dan agenda publik yang sedang berjalan.',
        'news_page.empty_title': 'Belum ada berita',
        'news_page.empty_desc': 'Berita akan segera terbit.',
        'news_page.spotlight': 'Sorotan & berita terbaru',
        'news_page.published_count': 'berita telah diterbitkan',
        'news_page.latest_badge': 'Berita Terbaru',
        'news_page.dc_news': 'Berita Darwin Center',
        'news_page.read_now': 'Baca Sekarang',
        'news_page.read_more': 'Baca Selengkapnya',

        // === News Show Page ===
        'news_show.badge_berita': 'Berita',
        'news_show.back': 'Kembali ke Berita',
        'news_show.copied': 'Tersalin',
        'news_show.share': 'Bagikan',
        'news_show.cta_title': 'Dapatkan informasi terbaru lainnya?',
        'news_show.cta_desc': 'Ikuti terus kabar dan agenda Darwin Center melalui halaman berita.',
        'news_show.cta_button': 'Kunjungi Halaman Berita',

        // === Activities Index Page ===
        'activities_page.title': 'Jejak Kiprah',
        'activities_page.hero_badge': 'Jejak Kiprah',
        'activities_page.hero_title': 'Menapaki jejak karya dan gagasan.',
        'activities_page.hero_desc':
            'Catatan aktivitas, kunjungan, dan program yang dijalankan — disajikan terbuka untuk publik.',
        'activities_page.empty_title': 'Belum ada aktivitas',
        'activities_page.empty_desc': 'Aktivitas akan segera ditambahkan.',
        'activities_page.spotlight': 'Jejak kiprah terpublikasi',
        'activities_page.count_suffix': 'kegiatan tersedia untuk publik',
        'activities_page.read_more': 'Baca Selengkapnya',

        // === Activities Show Page ===
        'activities_show.badge': 'Aktivitas',
        'activities_show.back': 'Kembali ke Jejak Kiprah',
        'activities_show.copied': 'Tersalin',
        'activities_show.share': 'Bagikan',
        'activities_show.cta_title': 'Telusuri kiprah lainnya',
        'activities_show.cta_desc':
            'Temukan catatan kegiatan dan program lain yang telah dijalankan Darwin Center untuk Muna Barat.',
        'activities_show.cta_button': 'Lihat Semua Aktivitas',
        'activities_show.sidebar_title': 'Aktivitas Lainnya',
        'activities_show.view_all': 'Lihat Semua',

        // === Galleries Page ===
        'galleries_page.title': 'Galeri',
        'galleries_page.hero_badge': 'Galeri',
        'galleries_page.hero_title': 'Dokumentasi visual kegiatan.',
        'galleries_page.hero_desc':
            'Foto-foto terbaik dari kegiatan dan program yang sedang berjalan.',
        'galleries_page.empty_title': 'Belum ada galeri',
        'galleries_page.empty_desc': 'Dokumentasi akan segera ditambahkan.',
        'galleries_page.spotlight': 'Koleksi dokumentasi kami',
        'galleries_page.published_count': 'foto telah dipublikasikan',
        'galleries_page.close': 'Tutup',
        'galleries_page.prev': 'Sebelumnya',
        'galleries_page.next': 'Berikutnya',

        // === Lapor Page ===
        'lapor_page.title': 'Lapor Darwin',
        'lapor_page.hero_badge': 'Layanan Pengaduan & Aspirasi',
        'lapor_page.hero_title': 'Lapor Darwin — Suara Anda, Aksi Nyata Pembangunan.',
        'lapor_page.hero_desc':
            'Sampaikan keluhan, aspirasi, dan masukan pembangunan langsung ke meja kepemimpinan La Ode Darwin. Terbuka atau 100% anonim, diproses secara transparan.',
        'lapor_page.rules_title': 'Ketentuan Pelaporan',
        'lapor_page.rule_anon':
            'Anda dapat melapor <strong>secara anonim</strong> atau menyertakan identitas untuk memudahkan tindak lanjut.',
        'lapor_page.rule_process':
            'Laporan akan diverifikasi dan diproses sesuai kategori serta skala prioritas.',
        'lapor_page.rule_phone': 'Butuh bantuan langsung? Hubungi kami di',
        'lapor_page.field_title': 'Judul Laporan',
        'lapor_page.field_title_placeholder': 'Contoh: Perbaikan jalan di Desa X',
        'lapor_page.field_category': 'Kategori',
        'lapor_page.field_category_placeholder': 'Pilih kategori (opsional)',
        'lapor_page.cat_infrastructure': 'Infrastruktur',
        'lapor_page.cat_education': 'Pendidikan',
        'lapor_page.cat_health': 'Kesehatan',
        'lapor_page.cat_public_service': 'Pelayanan Publik',
        'lapor_page.cat_environment': 'Lingkungan',
        'lapor_page.cat_other': 'Lainnya',
        'lapor_page.field_description': 'Deskripsi Laporan',
        'lapor_page.field_description_placeholder':
            'Jelaskan secara detail kronologi, lokasi, dan harapan Anda...',
        'lapor_page.min_chars': 'minimal 10 karakter',
        'lapor_page.chars': 'karakter',
        'lapor_page.anonymous_title': 'Lapor secara anonim',
        'lapor_page.anonymous_desc': 'Sembunyikan nama dan nomor telepon Anda dari laporan.',
        'lapor_page.toggle_anon': 'Toggle anonim',
        'lapor_page.field_name': 'Nama Lengkap',
        'lapor_page.field_name_placeholder': 'Nama Anda',
        'lapor_page.field_phone': 'Nomor Telepon',
        'lapor_page.field_phone_placeholder': '08xx xxxx xxxx',
        'lapor_page.submitting': 'Mengirim...',
        'lapor_page.submit': 'Kirim Laporan',
        'lapor_page.success_title': 'Laporan Terkirim',
        'lapor_page.success_desc':
            'Terima kasih atas partisipasi Anda. Laporan akan segera kami tindak lanjuti.',
        'lapor_page.send_another': 'Kirim Laporan Lain',

        // === Public Page Hero ===
        'hero_component.back': 'Kembali',
        'hero_component.district': 'Kabupaten Muna Barat',

        // === Pagination ===
        'pagination.prev': 'Halaman sebelumnya',
        'pagination.next': 'Halaman berikutnya',

        // === Language Switcher ===
        'lang.switch': 'EN',
        'lang.current': 'ID',
        'lang.label': 'Ganti Bahasa',

        // === Auto Translation Banner ===
        'translation.translating': 'Sedang menerjemahkan artikel ke Bahasa Inggris...',
        'translation.auto_translated': 'Artikel diterjemahkan secara otomatis ke Bahasa Inggris',
        'translation.view_original': 'Lihat Teks Asli (Indonesia)',
        'translation.view_translated': 'Tampilkan Terjemahan (Inggris)',
        'translation.machine_note': 'Terjemahan mesin otomatis',
    },
    en: {
        // === Navigation ===
        'nav.home': 'Home',
        'nav.activities': 'Activities',
        'nav.news': 'News',
        'nav.galleries': 'Gallery',
        'nav.report': 'Lapor Darwin',
        'nav.aspirasi': 'Lapor Darwin',
        'nav.menu_open': 'Open menu',
        'nav.menu_close': 'Close menu',
        'nav.menu_title': 'Navigation Menu',
        'nav.menu_desc': 'Darwin Center navigation menu',

        // === Footer ===
        'footer.tagline':
            'A space for dialectics and documented insights on public governance, innovation, and sustainable development in Muna Barat.',
        'footer.navigation': 'Navigation',
        'footer.information': 'Information',
        'footer.latest_news': 'Latest News',
        'footer.aspirasi_title': 'Lapor Darwin',
        'footer.aspirasi_desc':
            'Direct grievance and aspiration channel for Muna Barat citizens. Submit your report directly to Darwin Center.',
        'footer.submit_report': 'Open Lapor Darwin',
        'footer.rights': 'All rights reserved.',
        'footer.admin_login': 'Admin Login',

        // === Hero (Home) ===
        'hero.badge': 'Building Muna Barat Together',
        'hero.title_line1': 'Paving the Path of Innovation,',
        'hero.title_line2': 'Inspiring Sustainable',
        'hero.title_line3': 'Change',
        'hero.desc_prefix':
            'A space for dialectics, documented insights and the essence of leadership from',
        'hero.desc_and': 'and',
        'hero.desc_suffix':
            'Exploring ideas of modernization, public governance, and sustainable development strategies.',
        'hero.cta_kiprah': 'Activities & Ideas',
        'hero.cta_aspirasi': 'Lapor Darwin',
        'hero.caption_name': 'La Ode Darwin & Rhika P.',
        'hero.caption_role': 'Leadership of Muna Barat',
        'hero.stat_pillars': 'Service Pillars',
        'hero.stat_transparency': 'Transparency',
        'hero.stat_districts': 'Districts Reached',
        'hero.page_title': 'Innovative Leadership',

        // === Marquee ===
        'marquee.1': 'Building Muna Barat',
        'marquee.2': 'Public Transparency',
        'marquee.3': 'Service Innovation',
        'marquee.4': 'Community Collaboration',
        'marquee.5': 'Sustainable Development',
        'marquee.6': 'Public Participation',
        'marquee.7': 'Modern Governance',

        // === Fondasi Kinerja ===
        'fondasi.badge': 'Performance Foundation',
        'fondasi.title_prefix': 'Connecting public services with',
        'fondasi.title_highlight': 'community aspirations',
        'fondasi.title_suffix': 'in one platform.',
        'fondasi.desc':
            'Darwin Center serves as a digital space to track programs, voice aspirations, and strengthen transparency. All information is designed to be clear, concise, and aligned with the needs of the people of Muna Barat.',
        'fondasi.checklist.digital': 'Digital',
        'fondasi.checklist.digital_desc': 'Easily accessible online services',
        'fondasi.checklist.data': 'Data',
        'fondasi.checklist.data_desc': 'Open and accurate',
        'fondasi.checklist.participation': 'Participation',
        'fondasi.checklist.participation_desc': 'Proven community voice',
        'fondasi.checklist.innovation': 'Innovation',
        'fondasi.checklist.innovation_desc': 'Sustainable programs',
        'fondasi.card_overline': 'Key focus',
        'fondasi.card_title': 'Four service pillars',
        'fondasi.card.digital': 'Digital',
        'fondasi.card.digital_val': 'Online services',
        'fondasi.card.data': 'Data',
        'fondasi.card.data_val': 'Open & accurate',
        'fondasi.card.participation': 'Participation',
        'fondasi.card.participation_val': 'Community voice',
        'fondasi.card.innovation': 'Innovation',
        'fondasi.card.innovation_val': 'Sustainable',

        // === Pillars ===
        'pillar.speed_label': 'Speed',
        'pillar.speed_title': 'Faster Response',
        'pillar.speed_desc':
            'Reporting processes and service information are designed to achieve rapid responses from government agencies.',
        'pillar.clarity_label': 'Clarity',
        'pillar.clarity_title': 'Measurable Transparency',
        'pillar.clarity_desc':
            'Every program and report is made easy to understand by citizens and policymakers.',
        'pillar.collab_label': 'Collaboration',
        'pillar.collab_title': 'A Voice for Everyone',
        'pillar.collab_desc':
            'Encouraging community involvement through aspiration forums, reports, and ongoing public dialogue.',
        'pillar.impact_label': 'Impact',
        'pillar.impact_title': 'Sustainable Action',
        'pillar.impact_desc':
            'Programs designed today are built to create real impact for future generations.',

        // === News Section (Home) ===
        'news_section.badge': 'Latest News',
        'news_section.title': 'The most recent news highlights from Darwin Center.',
        'news_section.view_all': 'View All News',
        'news_section.headline_badge': 'Top Story',
        'news_section.read_now': 'Read Now',
        'news_section.coming_soon': 'More news coming soon',

        // === Gallery Section (Home) ===
        'gallery_section.badge': 'Latest Gallery',
        'gallery_section.title': 'Recent visual documentation from Darwin Center.',
        'gallery_section.view_all': 'View All Gallery',
        'gallery_section.view_gallery': 'View gallery',

        // === Programs ===
        'programs.badge': 'Flagship Initiatives',
        'programs.title': 'Programs that reshape the direction of development.',
        'programs.edu_badge': 'Education',
        'programs.edu_title': 'Digital Education',
        'programs.edu_desc':
            'Opening access to digital classrooms and educator training across all sub-districts.',
        'programs.edu_status': 'Planned',
        'programs.edu_point1': 'Digital classroom access',
        'programs.edu_point2': 'Educator training',
        'programs.infra_badge': 'Infrastructure',
        'programs.infra_title': 'Public Revitalization',
        'programs.infra_desc':
            'Improving public facilities and local infrastructure to strengthen inter-village connectivity.',
        'programs.infra_status': 'Active',
        'programs.infra_point1': 'Public facilities',
        'programs.infra_point2': 'Village connectivity',
        'programs.part_badge': 'Flagship Feature',
        'programs.part_title': 'Lapor Darwin',
        'programs.part_desc':
            'Direct grievance and aspiration service for citizens to regional leadership. Can be submitted openly or 100% anonymously.',
        'programs.part_status': 'Active 24/7',
        'programs.part_point1': '100% anonymous & secure option',
        'programs.part_point2': 'Fast verification & follow-up',
        'programs.status_prefix': 'Status:',

        // === Lapor Darwin Spotlight (Flagship Service) ===
        'lapor_spotlight.badge': '✦ MUNA BARAT FLAGSHIP SERVICE',
        'lapor_spotlight.title_prefix': 'Lapor Darwin:',
        'lapor_spotlight.title_highlight': 'Direct Grievance & Aspiration Channel',
        'lapor_spotlight.title_suffix': 'to Regional Leadership Desk',
        'lapor_spotlight.desc':
            'Official citizen engagement platform of Muna Barat with La Ode Darwin. Report road infrastructure, public facilities, schools, health clinics, and village administration quickly, transparently, and with guaranteed privacy.',
        'lapor_spotlight.cta_button': 'Submit a Report Now',
        'lapor_spotlight.cta_hotline': 'Direct Assistance Hotline',
        'lapor_spotlight.active_status': 'Active Service Receiving Citizen Reports',
        'lapor_spotlight.benefit_anon_title': '100% Anonymous & Secure Option',
        'lapor_spotlight.benefit_anon_desc': 'Your identity and phone number remain confidential when choosing anonymous mode.',
        'lapor_spotlight.benefit_speed_title': 'Direct Response & Follow-up',
        'lapor_spotlight.benefit_speed_desc': 'Every report is verified periodically to accelerate solutions on the ground.',
        'lapor_spotlight.benefit_sector_title': 'Cross-Sector Development',
        'lapor_spotlight.benefit_sector_desc': 'Infrastructure, education, public services, health, and environmental issues.',
        'lapor_spotlight.preview_badge': 'Quick Online Grievance Form',
        'lapor_spotlight.preview_title': 'Simple, Fast, and Direct',
        'lapor_spotlight.preview_subtitle': 'Submit your report in 4 straightforward steps:',
        'lapor_spotlight.preview_step1': 'Provide title & clear description of the issue',
        'lapor_spotlight.preview_step2': 'Select problem category (Infrastructure, School, etc.)',
        'lapor_spotlight.preview_step3': 'Choose to submit openly or 100% anonymously',
        'lapor_spotlight.preview_step4': 'Report received & monitored for action',

        // === CTA Section ===
        'cta.badge': 'Open for All Citizens',
        'cta.title': 'Support Change, Report via Lapor Darwin',
        'cta.desc':
            'Research, news, and reports here are designed to strengthen public trust and ensure your voice is directly heard and acted upon.',
        'cta.submit': 'Open Lapor Darwin Form',
        'cta.browse': 'Explore Activities & Ideas',

        // === News Index Page ===
        'news_page.title': 'News',
        'news_page.hero_badge': 'News',
        'news_page.hero_title': 'Latest updates from Darwin Center.',
        'news_page.hero_desc':
            'Current issues, work results, and ongoing public agendas.',
        'news_page.empty_title': 'No news yet',
        'news_page.empty_desc': 'News will be published soon.',
        'news_page.spotlight': 'Spotlight & latest news',
        'news_page.published_count': 'news articles published',
        'news_page.latest_badge': 'Latest News',
        'news_page.dc_news': 'Darwin Center News',
        'news_page.read_now': 'Read Now',
        'news_page.read_more': 'Read More',

        // === News Show Page ===
        'news_show.badge_berita': 'News',
        'news_show.back': 'Back to News',
        'news_show.copied': 'Copied',
        'news_show.share': 'Share',
        'news_show.cta_title': 'Want more updates?',
        'news_show.cta_desc': 'Stay up to date with the latest news and agenda from Darwin Center.',
        'news_show.cta_button': 'Visit News Page',

        // === Activities Index Page ===
        'activities_page.title': 'Activities',
        'activities_page.hero_badge': 'Activities',
        'activities_page.hero_title': 'Following the trail of work and ideas.',
        'activities_page.hero_desc':
            'Records of activities, visits, and programs — presented openly for the public.',
        'activities_page.empty_title': 'No activities yet',
        'activities_page.empty_desc': 'Activities will be added soon.',
        'activities_page.spotlight': 'Published activity records',
        'activities_page.count_suffix': 'activities available to the public',
        'activities_page.read_more': 'Read More',

        // === Activities Show Page ===
        'activities_show.badge': 'Activity',
        'activities_show.back': 'Back to Activities',
        'activities_show.copied': 'Copied',
        'activities_show.share': 'Share',
        'activities_show.cta_title': 'Explore more activities',
        'activities_show.cta_desc':
            'Discover other activity records and programs carried out by Darwin Center for Muna Barat.',
        'activities_show.cta_button': 'View All Activities',
        'activities_show.sidebar_title': 'Other Activities',
        'activities_show.view_all': 'View All',

        // === Galleries Page ===
        'galleries_page.title': 'Gallery',
        'galleries_page.hero_badge': 'Gallery',
        'galleries_page.hero_title': 'Visual documentation of activities.',
        'galleries_page.hero_desc':
            'The best photos from ongoing activities and programs.',
        'galleries_page.empty_title': 'No gallery yet',
        'galleries_page.empty_desc': 'Documentation will be added soon.',
        'galleries_page.spotlight': 'Our documentation collection',
        'galleries_page.published_count': 'photos published',
        'galleries_page.close': 'Close',
        'galleries_page.prev': 'Previous',
        'galleries_page.next': 'Next',

        // === Lapor Page ===
        'lapor_page.title': 'Lapor Darwin',
        'lapor_page.hero_badge': 'Grievance & Aspiration Service',
        'lapor_page.hero_title': 'Lapor Darwin — Your Voice, Real Action for Development.',
        'lapor_page.hero_desc':
            'Submit complaints, aspirations, and development input directly to La Ode Darwin leadership desk. Open or 100% anonymous, processed transparently.',
        'lapor_page.rules_title': 'Reporting Guidelines',
        'lapor_page.rule_anon':
            'You may report <strong>anonymously</strong> or include your identity to facilitate follow-up.',
        'lapor_page.rule_process':
            'Reports will be verified and processed according to category and priority level.',
        'lapor_page.rule_phone': 'Need direct help? Contact us at',
        'lapor_page.field_title': 'Report Title',
        'lapor_page.field_title_placeholder': 'e.g.: Road repair in Village X',
        'lapor_page.field_category': 'Category',
        'lapor_page.field_category_placeholder': 'Select category (optional)',
        'lapor_page.cat_infrastructure': 'Infrastructure',
        'lapor_page.cat_education': 'Education',
        'lapor_page.cat_health': 'Health',
        'lapor_page.cat_public_service': 'Public Service',
        'lapor_page.cat_environment': 'Environment',
        'lapor_page.cat_other': 'Other',
        'lapor_page.field_description': 'Report Description',
        'lapor_page.field_description_placeholder':
            'Describe in detail the chronology, location, and your expectations...',
        'lapor_page.min_chars': 'minimum 10 characters',
        'lapor_page.chars': 'characters',
        'lapor_page.anonymous_title': 'Report anonymously',
        'lapor_page.anonymous_desc': 'Hide your name and phone number from the report.',
        'lapor_page.toggle_anon': 'Toggle anonymous',
        'lapor_page.field_name': 'Full Name',
        'lapor_page.field_name_placeholder': 'Your name',
        'lapor_page.field_phone': 'Phone Number',
        'lapor_page.field_phone_placeholder': '08xx xxxx xxxx',
        'lapor_page.submitting': 'Sending...',
        'lapor_page.submit': 'Submit Report',
        'lapor_page.success_title': 'Report Submitted',
        'lapor_page.success_desc':
            'Thank you for your participation. We will follow up on your report shortly.',
        'lapor_page.send_another': 'Submit Another Report',

        // === Public Page Hero ===
        'hero_component.back': 'Back',
        'hero_component.district': 'Muna Barat Regency',

        // === Pagination ===
        'pagination.prev': 'Previous page',
        'pagination.next': 'Next page',

        // === Language Switcher ===
        'lang.switch': 'ID',
        'lang.current': 'EN',
        'lang.label': 'Switch Language',

        // === Auto Translation Banner ===
        'translation.translating': 'Translating article to English...',
        'translation.auto_translated': 'Article automatically translated to English',
        'translation.view_original': 'View Original (Indonesian)',
        'translation.view_translated': 'Show Translation (English)',
        'translation.machine_note': 'Automated neural translation',
    },
} as const;
