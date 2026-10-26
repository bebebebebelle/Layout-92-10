function setupInfiniteScroll(scrollerSelector, trackSelector, speed, duplicateTrack) {
    const scroller = document.querySelector(scrollerSelector);
    const track = document.querySelector(trackSelector);

    if (!scroller || !track) {
        return;
    }

    if (duplicateTrack) {
        [...track.children].forEach((card) => {
            const duplicate = card.cloneNode(true);
            duplicate.setAttribute('aria-hidden', 'true');
            track.appendChild(duplicate);
        });
    }

    let isPaused = false;
    let lastTime = 0;

    function scrollTrack(currentTime) {
        if (!lastTime) {
            lastTime = currentTime;
        }

        const elapsed = currentTime - lastTime;
        lastTime = currentTime;

        if (!isPaused) {
            const loopWidth = track.scrollWidth / 2;
            scroller.scrollLeft += speed * elapsed / 1000;

            if (scroller.scrollLeft >= loopWidth) {
                scroller.scrollLeft -= loopWidth;
            }
        }

        requestAnimationFrame(scrollTrack);
    }

    scroller.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    scroller.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    scroller.addEventListener('touchstart', () => {
        isPaused = true;
    }, { passive: true });

    scroller.addEventListener('touchend', () => {
        isPaused = false;
    }, { passive: true });

    requestAnimationFrame(scrollTrack);
}

setupInfiniteScroll('.makanan-scroll', '.makanan', 35, false);
setupInfiniteScroll('.books-scroll', '.books', 30, true);

const drawingHobby = document.querySelector('#drawingHobby');
const drawingModal = document.querySelector('#drawingModal');
const closeDrawingModal = document.querySelector('#closeDrawingModal');

function openDrawingModal() {
    drawingModal.classList.add('show');
    drawingModal.setAttribute('aria-hidden', 'false');
    closeDrawingModal.focus();
}

function hideDrawingModal() {
    drawingModal.classList.remove('show');
    drawingModal.setAttribute('aria-hidden', 'true');
}

if (drawingHobby && drawingModal) {
    drawingHobby.addEventListener('click', openDrawingModal);
    drawingHobby.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDrawingModal();
        }
    });

    closeDrawingModal.addEventListener('click', hideDrawingModal);
    drawingModal.addEventListener('click', (event) => {
        if (event.target === drawingModal) {
            hideDrawingModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideDrawingModal();
        }
    });
}

const foodScroller = document.querySelector('.makanan-scroll');
const foodModal = document.querySelector('#foodModal');
const foodModalTitle = document.querySelector('#foodModalTitle');
const foodModalRecipe = document.querySelector('#foodModalRecipe');
const closeFoodModal = document.querySelector('#closeFoodModal');

const foodRecipes = {
    sate: `Bahan-bahan:\n- 500 gram daging ayam tanpa tulang\n- 2 siung bawang putih, haluskan\n- 1 sendok makan air jeruk nipis\n- 1 sendok makan kecap asin\n- 1 sendok teh lada\n- Tusuk sate secukupnya\n\nSambal taichan:\n- 10 cabai rawit merah\n- 2 siung bawang putih\n- 1/2 sendok teh garam\n- 1 sendok makan air jeruk nipis\n\nCara membuat:\n1. Potong ayam menjadi ukuran kecil, lalu campur dengan bawang putih, jeruk nipis, kecap asin, dan lada. Diamkan selama 30 menit.\n2. Tusuk ayam, kemudian panggang di atas pan atau bara api sambil dibolak-balik sampai matang.\n3. Rebus cabai dan bawang putih selama beberapa menit, lalu haluskan bersama garam.\n4. Tambahkan jeruk nipis ke dalam sambal. Sajikan sate ayam dengan sambal taichan.`,
    mie: `Bahan-bahan:\n- 1 bungkus mi telur atau mi instan\n- 1 butir telur\n- 2 siung bawang putih, cincang\n- 2 butir bawang merah, iris\n- Sawi, kol, atau wortel secukupnya\n- 1 sendok makan kecap manis\n- 1 sendok teh saus tiram\n- Garam dan lada secukupnya\n- Minyak untuk menumis\n\nCara membuat:\n1. Rebus mi sampai setengah matang, tiriskan, lalu campur dengan sedikit minyak agar tidak lengket.\n2. Tumis bawang putih dan bawang merah sampai harum. Masukkan telur, lalu orak-arik.\n3. Tambahkan sayuran dan masak sampai sedikit layu.\n4. Masukkan mi, kecap manis, saus tiram, garam, dan lada. Aduk sampai bumbu merata dan mi matang. Sajikan hangat.`,
    martabak: `Bahan-bahan adonan:\n- 250 gram tepung terigu\n- 50 gram gula pasir\n- 1 butir telur\n- 350 ml air\n- 1/2 sendok teh garam\n- 1/2 sendok teh baking powder\n- 1/2 sendok teh soda kue\n- 1/2 sendok teh vanili\n\nBahan topping:\n- Mentega secukupnya\n- Gula pasir secukupnya\n- Meses atau cokelat batang secukupnya\n- Keju parut secukupnya\n- Susu kental manis secukupnya\n- Kacang cincang secukupnya\n\nCara membuat:\n1. Campur tepung terigu, gula, garam, baking powder, dan vanili dalam mangkuk.\n2. Masukkan telur dan air sedikit demi sedikit sambil diaduk sampai adonan halus dan tidak menggumpal. Kocok adonan selama beberapa menit agar hasilnya lebih bersarang.\n3. Tutup adonan dan diamkan selama 30-60 menit. Sebelum dimasak, masukkan soda kue yang sudah dilarutkan dengan sedikit air, lalu aduk rata.\n4. Panaskan wajan martabak dengan api sedang. Tuangkan adonan dan ratakan bagian pinggirnya.\n5. Masak sampai muncul banyak gelembung dan bagian atasnya hampir matang. Taburkan gula, lalu tutup wajan sampai matang.\n6. Olesi permukaan martabak dengan mentega. Tambahkan susu kental manis, meses, keju, dan kacang sesuai selera.\n7. Lipat martabak menjadi dua, olesi bagian luarnya dengan mentega, lalu potong-potong dan sajikan.`,
    bakwan: `Bahan-bahan:\n- 150 gram tepung terigu\n- 50 gram tepung beras\n- 1 wortel, iris tipis\n- 100 gram kol, iris tipis\n- 2 batang daun bawang, iris\n- 2 siung bawang putih, haluskan\n- 1/2 sendok teh lada\n- Garam secukupnya\n- Air dan minyak goreng secukupnya\n\nCara membuat:\n1. Campur tepung terigu, tepung beras, bawang putih, lada, dan garam.\n2. Tuangkan air sedikit demi sedikit sampai adonan cukup kental.\n3. Masukkan wortel, kol, dan daun bawang, lalu aduk rata.\n4. Panaskan minyak. Ambil satu sendok adonan dan goreng sampai kuning keemasan. Tiriskan dan sajikan dengan sambal atau cabai rawit.`,
    cookies: `Bahan-bahan:\n- 225 gram tepung terigu\n- 125 gram mentega\n- 100 gram gula halus\n- 1 butir telur\n- 1 sendok teh ekstrak vanila\n- 1/2 sendok teh baking powder\n- 100 gram choco chips\n\nCara membuat:\n1. Kocok mentega dan gula sampai lembut. Masukkan telur dan vanila, lalu aduk rata.\n2. Ayak tepung dan baking powder, kemudian masukkan sedikit demi sedikit ke adonan.\n3. Tambahkan choco chips dan aduk sampai tercampur.\n4. Bentuk adonan menjadi bulatan kecil di atas loyang beralas kertas roti.\n5. Panggang dalam oven bersuhu 175 derajat Celsius selama 10-15 menit. Dinginkan sebelum disajikan.`,
    pancakes: `Bahan-bahan:\n- 150 gram tepung terigu\n- 2 sendok makan gula\n- 1 sendok teh baking powder\n- 1 butir telur\n- 200 ml susu cair\n- 2 sendok makan mentega cair\n- Sejumput garam\n\nCara membuat:\n1. Campur tepung, gula, baking powder, dan garam dalam satu wadah.\n2. Di wadah lain, kocok telur bersama susu dan mentega cair.\n3. Tuangkan bahan cair ke bahan kering, lalu aduk sebentar sampai tercampur. Jangan mengaduk terlalu lama.\n4. Tuangkan satu sendok sayur adonan ke pan anti lengket. Masak sampai muncul gelembung, balik, lalu masak sisi lainnya.\n5. Sajikan dengan madu, buah, atau topping pilihan.`,
    churros: `Bahan-bahan:\n- 250 ml air\n- 50 gram mentega\n- 2 sendok makan gula\n- 150 gram tepung terigu\n- 2 butir telur\n- 1/2 sendok teh garam\n- Gula kayu manis untuk taburan\n- Minyak untuk menggoreng\n\nCara membuat:\n1. Rebus air, mentega, gula, dan garam sampai mendidih.\n2. Matikan api, masukkan tepung, lalu aduk cepat sampai menjadi adonan kalis. Dinginkan sebentar.\n3. Masukkan telur satu per satu sambil diaduk sampai adonan lembut.\n4. Masukkan adonan ke piping bag dengan spuit bintang. Semprotkan ke minyak panas dan goreng sampai keemasan.\n5. Tiriskan, lalu gulingkan churros dalam gula kayu manis.`,
    sashimi: `Bahan-bahan:\n- 200 gram ikan segar berkualitas sashimi atau sashimi-grade\n- Kecap asin secukupnya\n- Wasabi secukupnya\n- Acar jahe secukupnya\n- Daun shiso atau irisan lobak sebagai pelengkap\n\nCara membuat:\n1. Pastikan ikan dibeli dari penjual terpercaya dan memang aman dimakan mentah. Jangan gunakan ikan biasa yang tidak ditujukan untuk sashimi.\n2. Simpan ikan dalam keadaan sangat dingin, lalu keringkan permukaannya dengan tisu dapur.\n3. Gunakan pisau yang tajam untuk mengiris ikan melawan arah serat dengan ketebalan yang sama.\n4. Susun irisan ikan di atas piring bersih. Sajikan segera bersama kecap asin, wasabi, dan acar jahe.\n5. Jangan menyimpan sashimi terlalu lama pada suhu ruang.`
};

function openFoodModal(food) {
    const foodType = [...food.classList].find((className) => foodRecipes[className]);
    const title = food.querySelector('p').textContent;
    foodModalTitle.textContent = `${title} - Resep`;
    foodModalRecipe.innerHTML = foodRecipes[foodType].replace(
        /(^|\n)(Bahan-bahan:|Bahan-bahan adonan:|Bahan topping:|Sambal taichan:|Bahan kulit:|Bahan isian:|Cara membuat:)/g,
        '$1<strong>$2</strong>'
    );
    foodModal.classList.add('show');
    foodModal.setAttribute('aria-hidden', 'false');
    closeFoodModal.focus();
}

function hideFoodModal() {
    foodModal.classList.remove('show');
    foodModal.setAttribute('aria-hidden', 'true');
}

if (foodScroller && foodModal) {
    foodScroller.addEventListener('click', (event) => {
        const food = event.target.closest('.makanan > div');

        if (food) {
            openFoodModal(food);
        }
    });

    foodScroller.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideFoodModal();
        }
    });

    closeFoodModal.addEventListener('click', hideFoodModal);
    foodModal.addEventListener('click', (event) => {
        if (event.target === foodModal) {
            hideFoodModal();
        }
    });
}

const bookTrack = document.querySelector('.books');
const bookModal = document.querySelector('#bookModal');
const bookModalTitle = document.querySelector('#bookModalTitle');
const bookModalDescription = document.querySelector('#bookModalDescription');
const bookModalReview = document.querySelector('#bookModalReview');
const bookModalRating = document.querySelector('#bookModalRating');
const closeBookModal = document.querySelector('#closeBookModal');

function openBookModal(book) {
    const title = book.querySelector('p').textContent;
    bookModalTitle.textContent = title;
    bookModalDescription.textContent = book.dataset.description;
    bookModalReview.textContent = book.dataset.review;
    bookModalRating.textContent = book.dataset.rating;
    bookModal.classList.add('show');
    bookModal.setAttribute('aria-hidden', 'false');
    closeBookModal.focus();
}

function hideBookModal() {
    bookModal.classList.remove('show');
    bookModal.setAttribute('aria-hidden', 'true');
}

if (bookTrack && bookModal) {
    bookTrack.addEventListener('click', (event) => {
        const book = event.target.closest('.book');

        if (book) {
            openBookModal(book);
        }
    });

    bookTrack.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openBookModal(event.target.closest('.book'));
        }
    });

    closeBookModal.addEventListener('click', hideBookModal);
    bookModal.addEventListener('click', (event) => {
        if (event.target === bookModal) {
            hideBookModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideBookModal();
        }
    });
}

const backToTop = document.querySelector('#backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
        const startPosition = window.scrollY;
        const duration = 1500;
        const startTime = performance.now();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, 0);
            return;
        }

        function animateBackToTop(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = progress < 0.5
                ? 4 * Math.pow(progress, 3)
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition * (1 - easedProgress));

            if (progress < 1) {
                requestAnimationFrame(animateBackToTop);
            }
        }

        requestAnimationFrame(animateBackToTop);
    });
}

const factText = document.querySelector('#factText');
const factButton = document.querySelector('#factButton');

if (factText && factButton) {
    const facts = [
        'Aku suka membaca dan menggambar di waktu luang.',
        'Makanan favoritku adalah sate taichan.',
        'Aku suka mendengarkan musik di Spotify.',
        'Aku suka menemukan buku dan cerita baru.',
        'Aku suka mencoba berbagai makanan dari tempat yang berbeda.',
        'Zodiakku adalah Capricorn.'
    ];

    factButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factText.textContent = facts[randomIndex];
    });
}

const clockTime = document.querySelector('#clockTime');
const clockDate = document.querySelector('#clockDate');
const worldTimes = document.querySelectorAll('.world-time');
const worldLocations = document.querySelectorAll('.world-location');

function updateClock() {
    const now = new Date();
    clockTime.textContent = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    clockDate.textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    worldTimes.forEach((clock) => {
        clock.textContent = now.toLocaleTimeString('id-ID', {
            timeZone: clock.previousElementSibling.value,
            hour: '2-digit',
            minute: '2-digit'
        });
    });
}

worldLocations.forEach((location, index) => {
    location.addEventListener('change', () => {
        worldTimes[index].dataset.timezone = location.value;
        updateClock();
    });
});

if (clockTime && clockDate) {
    updateClock();
    setInterval(updateClock, 1000);
}
