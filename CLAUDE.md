# iswc-hotel.github.io — notatka dla Claude

Repozytorium hotelu **ibis Styles Warszawa City**. Publikowane przez GitHub Pages
pod `https://iswc-hotel.github.io/`. Kod pisze Claude, właściciel repo nie programuje —
tłumacz zmiany po ludzku i nie zakładaj znajomości gita ani terminala.

Język pracy: **polski** — commity, komentarze w kodzie, rozmowa.

## ⚠️ REPOZYTORIUM JEST PUBLICZNE

Każdy plik w tym repo widzi cały internet. Zanim cokolwiek dopiszesz, sprawdź,
czy to nie jest coś, czego nie powinno być widać.

**Nigdy nie commituj tutaj:**
- danych gości (nazwiska, numery rezerwacji, numery pokoi przypisane do osób)
- danych klientów firmowych: nazw firm, stawek negocjowanych, kontaktów, ofert
- haseł, tokenów, kluczy API, adresów wewnętrznych, danych pracowników

Rzeczy wewnętrzne są już wyłączone w `.gitignore` (`lista-pokoi.txt`,
`Kierunki.xlsx`, `OKOLICA-DANE.txt`, `INSTRUKCJA.txt`, `generator-qr.html`).
Jeśli pojawi się nowy plik tego typu — dopisz go tam, zanim zrobisz `git add`.

**Nie przełączaj repo na prywatne.** Pages w darmowym planie publikuje tylko
z repo publicznych — po przełączeniu informator przestaje działać, a kody QR
we wszystkich pokojach prowadzą donikąd. Cokolwiek wymaga prywatności,
zakładaj na to osobne repo.

## Co tu jest

### `informator.html` — informator dla gości
Jeden samodzielny plik: HTML, CSS i JS razem, bez bibliotek i bez budowania.
Otwierany przez gości z kodu QR w pokoju.

**Pięć wersji językowych w jednym pliku.** Każdy tekst istnieje jako pięć
elementów obok siebie: `lang-pl`, `lang-en`, `lang-es`, `lang-de`, `lang-uk`.
Język wykrywany jest z ustawień telefonu, można go przełączyć przyciskami.

> **Zmieniasz treść — zmieniasz ją we wszystkich pięciu wersjach.**
> Poprawienie samego polskiego zostawia gościa z angielskiego obszaru
> na starej informacji. To najczęstszy błąd w tym pliku.

Personalizacja z linku QR: `?pokoj=215&ewak=lewo` — pokazuje numer pokoju
w nagłówku i obraca strzałkę ewakuacyjną (`lewo` / `prawo` / `prosto`).

Statystyki: GoatCounter, zliczanie osobno per pokój, bez cookies.
Panel: `https://iswc-hotel.goatcounter.com`.

### `kokpit/` — kokpit sprzedażowo-operacyjny
Aplikacja PWA (instalowana na iPhonie i Windows) dla właściciela repo, nie dla gości.
Zapytania od firm, zadania, notatki i pilnowanie follow-upów.

- `index.html` — całość aplikacji w jednym pliku
- `sw.js` — service worker, zasięg ograniczony do `/kokpit/`, żeby nie ruszał informatora
- `manifest.webmanifest`, `ikona-*.png`

**Dane wyłącznie w `localStorage` przeglądarki.** Nic nie jest wysyłane
i nic nie trafia do repo — dlatego publiczne repo jest tu bezpieczne.
Gdyby kiedyś doszła synchronizacja między urządzeniami albo agent zbierający
dane, dane klientów muszą pójść do osobnego, prywatnego repo.

> **Po każdej zmianie `kokpit/index.html` podnieś `WERSJA` w `kokpit/sw.js`.**
> Bez tego telefony serwują starą wersję z pamięci i poprawki nie docierają.

### Pozostałe
`regulamin_hotelu.pdf`, `hotel_regulations.pdf` — regulaminy linkowane z informatora.
`logo-ibis.jpg`, `logo-tramwaj.jpg` — loga w banerze.
`.nojekyll` — wyłącza przetwarzanie Jekyllem, pliki idą na serwer bez zmian.

## Jak sprawdzić zmiany przed wysłaniem

Nie ma testów ani builda. Podgląd lokalny:

```bash
python3 -m http.server 8899
# potem w przeglądarce:
#   http://localhost:8899/informator.html
#   http://localhost:8899/kokpit/
```

Przy zmianach w informatorze przejdź wszystkie pięć języków.
Przy zmianach w Kokpicie sprawdź na wąskim ekranie (tryb telefonu w przeglądarce) —
to jest aplikacja przede wszystkim mobilna.

## Konwencje

- Nazwy zmiennych, funkcji, klas CSS i komentarze — **po polsku**
  (`sprawy`, `rysujOdprawe`, `.karta`, `--ziel-ciemna`)
- Zero zależności zewnętrznych, zero narzędzi budujących — pliki idą na serwer takie, jakie są
- Kolorystyka ibis Styles: `--ziel:#76b82a`, `--ziel-ciemna:#4d8a1f`, `--zolty:#ffc20e`
- Treść dla gości pisz prosto i uprzejmie, bez korpomowy — czyta ją zmęczony
  człowiek na telefonie, często w obcym języku
