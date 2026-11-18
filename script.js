/* 1. DATA */

// Daftar buku perpustakaan
const BOOKS = [
    {
        id: 1,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: null
    },
    {
        id: 2,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: null
    },
    {
        id: 3,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: addDays(5)
    },
    {
        id: 4,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: null
    },
    {
        id: 5,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: addDays(7)
    },
    {
        id: 6,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: addDays(8)
    },
    {
        id: 7,
        t: 'Judul Buku',
        a: 'Penulis Buku',
        c: 'Nama Kategori',
        p: 'Nama Penerbit',
        y: 'yyyy',
        isbn: 'XXX-XXX',
        back: null
    }
];

// Daftar staf perpustakaan
const STAFF = [
    ['Nabil Januarsyah', 'Perlengkapan'],
    ['Revandra Asafa Karnowo', 'Teknologi Informasi'],
    ['Naufal Mohammad Adhi', 'Kepala Perpustakaan'],
    ['Phaksi Giring Pamungkas', 'Administrasi / Keuangan']
];


/* 2. HELPER FUNCTIONS */

// Nama bulan
const BLN = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

// Memilih elemen HTML
const $ = (selector, element = document) =>
    element.querySelector(selector);

// Menambahkan angka 0 di depan angka satu digit
const p2 = number =>
    String(number).padStart(2, '0');

// Format tanggal: DD MM YYYY
const fmt = date =>
    `${p2(date.getDate())} ${p2(date.getMonth() + 1)} ${date.getFullYear()}`;

// Format tanggal: DD-MM-YYYY
const fmtD = date =>
    `${p2(date.getDate())}-${p2(date.getMonth() + 1)}-${date.getFullYear()}`;

// Menambahkan jumlah hari ke tanggal
function addDays(days, date = new Date()) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Menghitung sisa hari menuju tanggal tertentu
const daysLeft = date =>
    Math.ceil((date - new Date().setHours(0, 0, 0, 0)) / 864e5);

// Mengambil data buku berdasarkan ID
const bk = id => BOOKS.find(book => book.id === id);

// Menampilkan notifikasi singkat
const toast = message => {
    const element = $('#toast');

    element.textContent = message;
    element.classList.add('show');

    clearTimeout(toast.h);

    toast.h = setTimeout(() => {
        element.classList.remove('show');
    }, 2200);
};

// Menutup modal
const closeOv = () => {
    $('#ov').classList.remove('show');
    $('#ov').innerHTML = '';
};

// Menampilkan modal
const openOv = html => {
    $('#ov').innerHTML = html;
    $('#ov').classList.add('show');
};

// Pindah halaman
const go = (route, extra) => {
    state.route = route;

    if (extra !== undefined) {
        state.detail = extra;
    }

    state.popOpen = false;
    closeOv();
    render();
    window.scrollTo(0, 0);
};


/* 3. APPLICATION STATE */

const state = {
    user: null,
    route: 'beranda',
    q: '',
    tab: 'all',
    saved: new Set(),
    detail: null,
    popOpen: false
};

// Menu navigasi
const MENU = [
    ['beranda', 'Beranda', '⌂'],
    ['katalog', 'Katalog Buku', '☰'],
    ['peminjaman', 'Peminjaman Aktif', '▤'],
    ['kartu', 'Kartu Anggota', '▭'],
    ['koleksi', 'Kelola Koleksi', '▦'],
    ['tentang', 'Tentang Kami', '☺']
];

// Data peminjaman contoh
const demoLoans = () => [
    {
        id: 1,
        bid: 1,
        start: addDays(-10),
        due: addDays(4),
        status: 'dipinjam',
        ext: false
    },
    {
        id: 2,
        bid: 4,
        start: addDays(-7),
        due: addDays(7),
        status: 'dipinjam',
        ext: false
    },
    {
        id: 3,
        bid: 2,
        start: addDays(-3),
        due: addDays(11),
        status: 'dipinjam',
        ext: false
    },
    {
        id: 4,
        bid: 3,
        start: addDays(0),
        due: null,
        status: 'reservasi',
        ext: false
    },
    {
        id: 5,
        bid: 7,
        start: addDays(-60),
        due: addDays(-46),
        status: 'riwayat',
        ext: false
    }
];

// Mengambil daftar buku yang sedang dipinjam
const active = () =>
    state.user.loans.filter(loan => loan.status === 'dipinjam');

// Menampilkan status ketersediaan buku
const bookTag = book => {
    return book.back
        ? `<small><i class="dot" style="background:var(--yellow)"></i>Kembali tgl XX</small>`
        : `<small><i class="dot" style="background:var(--green)"></i>Tersedia</small>`;
};


/* 4. LOGIN */

let role = 'Anggota';

function loginView() {
    $('#root').innerHTML = `
        <div class="login">
            <div class="l">
                <div>
                    <div class="logo" style="padding:0">
                        e-Lib
                        <small>Digital Library</small>
                    </div>
                </div>

                <div>
                    <h2 class="serif">Satu buku, banyak perspektif.</h2>
                    <p style="margin-top:18px;font-size:13px">
                        Perpustakaan
                    </p>
                </div>
            </div>

            <div class="r">
                <div class="lbox">
                    <h1>Masuk</h1>
                    <p style="font-size:13px">
                        Gunakan akun perpustakaan kamu
                    </p>

                    <div class="seg">
                        ${['Anggota', 'Pustakawan'].map(item => `
                            <button
                                data-role="${item}"
                                class="${item === role ? 'on' : ''}"
                            >
                                ${item}
                            </button>
                        `).join('')}
                    </div>

                    <label for="nim">NIM atau email</label>
                    <input id="nim" autocomplete="username">

                    <label for="pw">Kata sandi</label>
                    <input
                        id="pw"
                        type="password"
                        autocomplete="current-password"
                    >

                    <button class="btn" style="width:100%" id="go">
                        Masuk
                    </button>

                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('[data-role]').forEach(button => {
        button.onclick = () => {
            role = button.dataset.role;
            loginView();
        };
    });

    const submit = () => {
        const value = $('#nim').value.trim() || '235150200111001';
        const fresh = value.toLowerCase() === 'baru';

        state.user = {
            name: 'Nama Pengguna',
            nim: fresh ? '255150000000001' : value,
            loans: fresh ? [] : demoLoans(),
            role
        };

        state.route = 'beranda';
        render();
    };

    $('#go').onclick = submit;

    $('#pw').onkeydown = event => {
        if (event.key === 'Enter') {
            submit();
        }
    };
}


/* ========================================
   5. LAYOUT & NAVIGATION
======================================== */

function shell(title, sub, body) {
    const user = state.user;

    return `
        <div class="app">
            <aside class="side">
                <div class="logo">
                    e-Lib
                    <small>Digital Library</small>
                </div>

                <p class="menu-t">MENU UTAMA</p>

                <nav>
                    ${MENU.map(([key, name, icon]) => `
                        <button
                            class="nav ${
                                state.route === key ||
                                (key === 'katalog' && state.route === 'detail')
                                    ? 'on'
                                    : ''
                            }"
                            data-go="${key}"
                        >
                            <span>${icon}</span>
                            ${name}
                        </button>
                    `).join('')}
                </nav>

                <div class="grow"></div>

                <div class="pop ${state.popOpen ? 'show' : ''}" id="pop">
                    <p>Menu profil</p>

                    <div>
                        <button data-go="kartu">👤 Profile saya</button>
                        <button data-go="kartu">▭ Kartu anggota</button>
                        <button id="logout">⇥ Keluar</button>
                    </div>
                </div>

                <button class="user" id="userbtn" aria-haspopup="true">
                    <span class="av"></span>

                    <span>
                        <b>${user.name}</b>
                        <small>No. Kartu</small>
                    </span>
                </button>
            </aside>

            <div class="main">
                <header class="top">
                    <input
                        class="search"
                        id="q"
                        placeholder="Cari judul buku, penulis, atau ISBN..."
                        value="${state.q}"
                        aria-label="Cari buku"
                    >

                    <button class="bell" aria-label="Notifikasi" id="bell">
                        🔔
                    </button>
                </header>

                <section class="page">
                    ${
                        title
                            ? `<h1>${title}</h1><p class="sub">${sub || ''}</p>`
                            : ''
                    }

                    ${body}
                </section>
            </div>
        </div>
    `;
}

function bind() {
    // Navigasi menu
    document.querySelectorAll('[data-go]').forEach(button => {
        button.onclick = () => go(button.dataset.go);
    });

    // Membuka detail buku
    document.querySelectorAll('[data-book]').forEach(button => {
        button.onclick = () => go('detail', +button.dataset.book);
    });

    // Membuka menu profil
    $('#userbtn').onclick = event => {
        event.stopPropagation();

        state.popOpen = !state.popOpen;
        $('#pop').classList.toggle('show', state.popOpen);
    };

    // Logout
    const logoutButton = $('#logout');

    if (logoutButton) {
        logoutButton.onclick = () => {
            state.user = null;
            state.popOpen = false;
            render();
        };
    }

    // Notifikasi
    $('#bell').onclick = () => {
        const hasDueSoon = active().some(loan => daysLeft(loan.due) <= 2);

        toast(
            hasDueSoon
                ? 'Ada buku yang jatuh tempo dalam 2 hari'
                : 'Tidak ada notifikasi baru'
        );
    };

    // Pencarian buku
    const searchInput = $('#q');

    searchInput.oninput = () => {
        if (state.route === 'katalog') {
            state.q = searchInput.value;
            renderCatalogList();
        }
    };

    searchInput.onkeydown = event => {
        if (event.key === 'Enter') {
            state.q = searchInput.value.trim();

            if (state.route !== 'katalog') {
                go('katalog');
            } else {
                renderCatalogList();
            }
        }
    };
}

// Menutup menu profil ketika pengguna klik area lain
document.addEventListener('click', event => {
    if (state.popOpen && !event.target.closest('#pop')) {
        state.popOpen = false;

        const popup = $('#pop');

        if (popup) {
            popup.classList.remove('show');
        }
    }
});

// Menutup modal ketika area luar modal diklik
$('#ov').addEventListener('click', event => {
    if (event.target.id === 'ov') {
        closeOv();
    }
});

// Menutup modal dengan tombol Escape
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeOv();
    }
});


/* ========================================
   6. BOOK COMPONENTS
======================================== */

// Tampilan kartu buku
const bookCard = book => `
    <button class="card book" data-book="${book.id}">
        <span class="cover">
            Gambar<br>Buku
        </span>

        <span>
            <b>${book.t}</b>
            <small>${book.a}</small>
            ${bookTag(book)}
        </span>
    </button>
`;

// Filter buku berdasarkan judul, penulis, atau ISBN
const filtered = () => {
    const keyword = state.q.toLowerCase();

    return BOOKS.filter(book =>
        !keyword ||
        [book.t, book.a, book.isbn].some(value =>
            value.toLowerCase().includes(keyword)
        )
    );
};

// Menampilkan hasil pencarian katalog
function renderCatalogList() {
    const list = filtered();
    const box = $('#clist');

    if (!box) {
        return;
    }

    box.innerHTML = list.map(bookCard).join('');

    document.querySelectorAll('[data-book]').forEach(button => {
        button.onclick = () => go('detail', +button.dataset.book);
    });

    if (!list.length) {
        openOv(`
            <div class="modal c">
                <div class="ic">🔍</div>
                <h3>Buku tidak ditemukan</h3>
                <p>Coba kata kunci lain atau ubah filter</p>
                <button class="btn" id="rst">Reset filter</button>
            </div>
        `);

        $('#rst').onclick = () => {
            state.q = '';
            $('#q').value = '';
            closeOv();
            renderCatalogList();
        };
    }
}


/* ========================================
   7. PAGE CONTENT
======================================== */

const pages = {

    // Halaman beranda
    beranda() {
        const loans = active();

        return shell(
            'Selamat datang!',
            'Pantau buku yang kamu pinjam',
            `
                <div class="card hero">
                    <span class="badge">REKOMENDASI MINGGU INI</span>
                    <h2>Satu buku, banyak perspektif.</h2>
                    <p>Temukan bacaan pilihan untuk memperluas wawasanmu.</p>
                    <button class="btn g" data-go="katalog">
                        Jelajah Buku
                    </button>
                </div>

                <div class="two">
                    <div class="card">
                        <small>Sedang Dipinjam</small>
                        <div class="big">
                            X
                            <small style="font:13px Inter">Dari XXX buku</small>
                        </div>
                    </div>

                    <div class="card">
                        <small>Siap Diambil</small>
                        <div class="big">
                            X
                            <small style="font:13px Inter">Di Meja ...</small>
                        </div>
                    </div>
                </div>

                <h2 style="font-size:22px;margin-bottom:12px">
                    Sedang Dipinjam
                </h2>

                ${
                    loans.length
                        ? loans.map(loan => `
                            <div class="card" style="margin-bottom:10px">
                                <button class="book" data-book="${loan.bid}">
                                    <span class="cover">
                                        Gambar<br>Buku
                                    </span>

                                    <span>
                                        <b>${bk(loan.bid).t}</b>
                                        <small>${bk(loan.bid).a}</small>
                                    </span>
                                </button>
                            </div>
                        `).join('')
                        : '<div class="card">Belum ada buku yang dipinjam.</div>'
                }
            `
        );
    },

    // Halaman katalog buku
    katalog() {
        return shell(
            'Katalog Buku',
            'Temukan buku untuk kuliah dan penelitianmu',
            `
                <div class="grid4" id="clist">
                    ${filtered().map(bookCard).join('')}
                </div>
            `
        );
    },

    // Halaman detail buku
    detail() {
        const book = bk(state.detail);
        const saved = state.saved.has(book.id);

        const has = state.user.loans.some(loan =>
            loan.bid === book.id && loan.status === 'dipinjam'
        );

        return shell(
            '',
            '',
            `
                <button class="back" data-go="katalog">
                    ← Katalog Buku / Detail Buku
                </button>

                <div class="card detail">
                    <div class="cover">Gambar Buku</div>

                    <div>
                        <span class="tag ${book.back ? 'y' : ''}">
                            ${book.back ? 'Kembali tgl XX' : 'Tersedia'}
                        </span>

                        <h2 style="font:600 24px Inter;margin-top:8px">
                            ${book.t}
                        </h2>

                        <small>${book.a}</small>

                        <div class="meta">
                            <div>
                                <small>ISBN</small>
                                ${book.isbn}
                            </div>

                            <div>
                                <small>Kategori</small>
                                ${book.c}
                            </div>

                            <div>
                                <small>Penerbit</small>
                                ${book.p}
                            </div>

                            <div>
                                <small>Tahun</small>
                                ${book.y}
                            </div>
                        </div>

                        <b style="font-size:12px">Ringkasan</b>

                        <p style="max-width:520px;margin:4px 0 16px;line-height:1.5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua.
                        </p>

                        <div style="display:flex;gap:12px">
                            <button
                                class="btn"
                                id="pinjam"
                                ${book.back || has ? 'disabled' : ''}
                            >
                                ${
                                    has
                                        ? 'Sedang dipinjam'
                                        : book.back
                                            ? 'Belum tersedia'
                                            : 'Pinjam Buku'
                                }
                            </button>

                            <button class="btn o" id="simpan">
                                ${saved ? 'Tersimpan ✓' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            `
        );
    },

    // Halaman peminjaman
    peminjaman() {
        const loans = state.user.loans;

        const borrowed = loans.filter(loan => loan.status === 'dipinjam');
        const reservations = loans.filter(loan => loan.status === 'reservasi');
        const history = loans.filter(loan => loan.status === 'riwayat');

        const late = borrowed.filter(loan => daysLeft(loan.due) < 0).length;

        const tabs = [
            ['all', `Semua (${borrowed.length + reservations.length})`],
            ['dipinjam', `Sedang Dipinjam (${borrowed.length})`],
            ['reservasi', `Reservasi (${reservations.length})`],
            ['riwayat', `Riwayat (${history.length})`]
        ];

        const rows = loans.filter(loan =>
            state.tab === 'all'
                ? loan.status !== 'riwayat'
                : loan.status === state.tab
        );

        const row = loan => {
            const book = bk(loan.bid);
            const remainingDays = loan.due ? daysLeft(loan.due) : null;

            return `
                <tr>
                    <td>
                        <span style="display:flex;gap:12px;align-items:center">
                            <span class="cover">
                                Gambar<br>Buku
                            </span>

                            <span>
                                <b style="font-weight:500;font-size:14px">
                                    ${book.t}
                                </b>
                                <br>
                                <small>Nama Penulis</small>
                            </span>
                        </span>
                    </td>

                    <td>${fmt(loan.start)}</td>

                    <td>
                        ${
                            loan.due
                                ? `
                                    ${fmt(loan.due)}
                                    <br>
                                    ${
                                        remainingDays <= 4
                                            ? `
                                                <span class="late">
                                                    ⏱ ${
                                                        remainingDays < 0
                                                            ? 'Terlambat ' + -remainingDays
                                                            : remainingDays
                                                    } Hari${remainingDays < 0 ? '' : ' lagi'}
                                                </span>
                                            `
                                            : `
                                                <span class="ok">
                                                    ⏱ ${remainingDays} Hari lagi
                                                </span>
                                            `
                                    }
                                `
                                : '–'
                        }
                    </td>

                    <td>
                        <span class="pill ${
                            loan.status === 'dipinjam'
                                ? ''
                                : loan.status === 'reservasi'
                                    ? 'g'
                                    : 'x'
                        }">
                            ${
                                {
                                    dipinjam: '• Sedang Dipinjam',
                                    reservasi: '• Menunggu Antrean',
                                    riwayat: '• Dikembalikan'
                                }[loan.status]
                            }
                        </span>
                    </td>

                    <td>
                        ${
                            loan.status === 'dipinjam'
                                ? `
                                    <button
                                        class="act"
                                        data-ext="${loan.id}"
                                        ${loan.ext ? 'disabled title="Sudah diperpanjang"' : ''}
                                    >
                                        ${loan.ext ? 'Diperpanjang' : 'Perpanjang'}
                                    </button>
                                `
                                : ''
                        }
                    </td>
                </tr>
            `;
        };

        return shell(
            'Peminjaman Aktif',
            'Pantau buku yang sedang dipinjam dan jadwal pengembaliannya',
            `
                <div class="stats">
                    <div class="card stat">
                        <div>
                            <small>SEDANG DIPINJAM</small>
                            <span class="n">${borrowed.length}</span>
                            dari 5 buku kuota
                        </div>
                        <span class="i">🗎</span>
                    </div>

                    <div class="card stat">
                        <div>
                            <small>RESERVASI</small>
                            <span class="n">${reservations.length}</span>
                            menunggu antrean
                        </div>
                        <span class="i">⏲</span>
                    </div>

                    <div class="card stat">
                        <div>
                            <small>TERLAMBAT</small>
                            <span class="n">${late}</span>
                            ${late ? 'kena denda' : 'tidak ada denda'}
                        </div>
                        <span class="i">✔</span>
                    </div>
                </div>

                <div class="tabs">
                    ${tabs.map(([key, name]) => `
                        <button
                            data-tab="${key}"
                            class="${state.tab === key ? 'on' : ''}"
                        >
                            ${name}
                        </button>
                    `).join('')}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>KOLEKSI BUKU DAN PENULIS</th>
                            <th>TANGGAL PINJAMAN</th>
                            <th>JATUH TEMPO</th>
                            <th>STATUS SIRKULASI</th>
                            <th>AKSI</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${rows.map(row).join('')}
                    </tbody>
                </table>

                <div class="card policy">
                    <h2>Kebijakan dan Ketentuan Peminjaman Perpustakaan</h2>

                    <div class="pol3">
                        <div>
                            <h3>⏱ Durasi Peminjaman</h3>
                            Mahasiswa S1/D4 berhak meminjam hingga 5 buku
                            selama 14 hari kalender.
                        </div>

                        <div>
                            <h3>✉ Pengingat &amp; Pengembalian</h3>
                            Notifikasi otomatis dikirimkan H-2 melalui email
                            UB dan notifikasi dashboard ini.
                        </div>

                        <div>
                            <h3>↻ Ketentuan &amp; Pengajuan</h3>
                            Perpanjangan mandiri dapat dilakukan 1x maksimal
                            selama 7 hari, selama buku tidak diresend.
                        </div>
                    </div>
                </div>
            `
        );
    },

    // Halaman kartu anggota
    kartu() {
        const user = state.user;
        const borrowedCount = active().length;

        return shell(
            'Kartu Anggota',
            '',
            `
                <div class="ucard">
                    <div>
                        <div class="serif" style="font-size:26px">e-Lib</div>
                        <small>Perpustakaan</small>
                    </div>

                    <h2 style="margin-top:14px">Nama Pengguna</h2>
                    <small>Nomor Kartu</small>

                    <div class="row">
                        <div>
                            <small>Status</small>
                            <br>
                            <span class="tag">Aktif</span>
                        </div>

                        <div>
                            <small>Berlaku hingga</small>
                            <br>
                            dd-mm-yyyy
                        </div>

                        <div class="barcode">Barcode</div>
                    </div>
                </div>

                <div class="three">
                    <div class="card">
                        <small>Dipinjam</small>
                        <div class="big">X</div>
                    </div>

                    <div class="card">
                        <small>Sisa Kuota</small>
                        <div class="big">X</div>
                    </div>

                    <div class="card">
                        <small>Denda</small>
                        <div class="big">RpXXX</div>
                    </div>
                </div>
            `
        );
    },

    // Halaman pengelolaan koleksi
    koleksi() {
        return shell(
            'Kelola Koleksi',
            '',
            `
                <div class="stats">
                    <div class="card">
                        <small>Total Buku</small>
                        <div class="big">1.860</div>
                    </div>

                    <div class="card">
                        <small>Sedang Dipinjam</small>
                        <div class="big">390</div>
                    </div>

                    <div class="card">
                        <small>Tersedia Sekarang</small>
                        <div class="big">1.470</div>
                    </div>
                </div>

                <div class="card">
                    <table>
                        <thead>
                            <tr>
                                <th>Judul Buku &amp; Penulis</th>
                                <th>Kategori</th>
                                <th>Total</th>
                                <th>Tersedia</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr style="border-color:#eee">
                                <td>Judul<br>Penulis</td>
                                <td>Nama Kategori</td>
                                <td>X</td>
                                <td>X</td>
                                <td><span class="tag">Tersedia</span></td>
                            </tr>

                            <tr style="border-color:#eee">
                                <td>Judul<br>Penulis</td>
                                <td>Nama Kategori</td>
                                <td>X</td>
                                <td>X</td>
                                <td><span class="tag y">Dipinjam</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        );
    },

    // Halaman tentang perpustakaan
    tentang() {
        return shell(
            'Tentang Kami',
            'Staff Perpustakaan Aktif, Visi, Misi, dan Tujuan',
            `
                <h2 class="center">Staff Perpustakaan Aktif</h2>

                <div class="staff">
                    ${STAFF.map(([name, position]) => `
                        <div class="card">
                            <div class="ph">👤</div>

                            <b style="font:500 15px Lora">
                                ${name}
                            </b>

                            <p style="font-size:12px;margin-top:10px">
                                ${position}
                            </p>
                        </div>
                    `).join('')}
                </div>

                <div class="vm">
                    <div class="card">
                        <h3>Visi</h3>
                        <p class="serif" style="margin-top:10px;font-size:17px">
                            Mewujudkan pemustaka yang cerdas, beretika dan
                            berliterasi sepanjang hayat
                        </p>
                    </div>

                    <div class="card">
                        <h3>Misi</h3>

                        <ul style="margin-top:10px">
                            <li>
                                Meningkatkan kompetensi literasi dan
                                kemandirian belajar pemustaka.
                            </li>
                            <li>Mewujudkan budaya literasi sepanjang hayat.</li>
                            <li>
                                Mendorong penggunaan perpustakaan yang etis,
                                jujur, dan optimal.
                            </li>
                            <li>
                                Menciptakan ruang belajar yang nyaman dan
                                menyenangkan.
                            </li>
                        </ul>
                    </div>

                    <div class="card">
                        <h3>Tujuan</h3>
                        <p class="serif" style="margin-top:10px;font-size:12px;line-height:1.6">
                            Meningkatkan minat baca, literasi, dan kecerdasan
                            untuk IPTEK &amp; IMTAK warga sekolah melalui
                            penyediaan sumber belajar yang berkualitas guna
                            mendukung tujuan pendidikan nasional.
                        </p>
                    </div>
                </div>
            `
        );
    }
};


/* ========================================
   8. INTERACTIONS
======================================== */

function afterRender() {
    const route = state.route;

    // Mengganti tab peminjaman
    document.querySelectorAll('[data-tab]').forEach(button => {
        button.onclick = () => {
            state.tab = button.dataset.tab;
            render();
        };
    });

    // Membuka modal perpanjangan
    document.querySelectorAll('[data-ext]').forEach(button => {
        button.onclick = () => extendModal(+button.dataset.ext);
    });

    // Interaksi pada halaman detail buku
    if (route === 'detail') {

        // Simpan atau hapus buku dari koleksi
        $('#simpan').onclick = () => {
            const id = state.detail;

            if (state.saved.has(id)) {
                state.saved.delete(id);
            } else {
                state.saved.add(id);
            }

            render();

            toast(
                state.saved.has(id)
                    ? 'Buku disimpan'
                    : 'Simpanan dihapus'
            );
        };

        // Meminjam buku
        $('#pinjam').onclick = () => {
            const borrowedCount = active().length;

            if (borrowedCount >= 5) {
                return toast('Kuota peminjaman sudah penuh (5 buku)');
            }

            state.user.loans.unshift({
                id: Date.now(),
                bid: state.detail,
                start: new Date(),
                due: addDays(14),
                status: 'dipinjam',
                ext: false
            });

            render();

            toast(
                'Buku berhasil dipinjam, jatuh tempo ' + fmt(addDays(14))
            );
        };
    }

    // Memeriksa hasil pencarian katalog
    if (route === 'katalog' && !filtered().length) {
        renderCatalogList();
    }

    // Menampilkan informasi jika belum ada peminjaman
    if (route === 'peminjaman' && !state.user.loans.length) {
        openOv(`
            <div class="modal c">
                <div class="ic">📖</div>
                <h3>Belum ada peminjaman</h3>
                <p>Buku yang Anda pinjam akan muncul di sini</p>
                <button class="btn" id="jel">Jelajah Buku</button>
            </div>
        `);

        $('#jel').onclick = () => go('katalog');
    }
}

// Modal konfirmasi perpanjangan peminjaman
function extendModal(id) {
    const loan = state.user.loans.find(item => item.id === id);
    const newDueDate = addDays(7, loan.due);

    openOv(`
        <div class="modal">
            <small>Modal konfirmasi perpanjangan</small>

            <h3 class="q">Perpanjangan peminjaman?</h3>

            <p style="font-size:16px">
                Jatuh tempo baru: dd-mm-yyyy
            </p>

            <div class="acts" id="ea">
                <button class="btn" id="yes">Ya, perpanjang</button>
                <button class="btn o" id="no" style="min-width:120px">
                    Batal
                </button>
            </div>
        </div>
    `);

    $('#no').onclick = closeOv;

    $('#yes').onclick = () => {
        loan.due = newDueDate;
        loan.ext = true;

        $('#ea').outerHTML = `
            <div class="ok-bar" role="status">
                Peminjaman diperpanjang
            </div>
        `;

        setTimeout(() => {
            closeOv();
            render();
        }, 1400);
    };
}


/* ========================================
   9. APPLICATION INITIALIZATION
======================================== */

function render() {
    if (!state.user) {
        return loginView();
    }

    $('#root').innerHTML = pages[state.route]();

    bind();
    afterRender();
}

// Menjalankan aplikasi
render();
