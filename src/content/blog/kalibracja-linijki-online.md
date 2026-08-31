---
title: "Kalibracja skali na ekranie: dokładny test w 7 krokach"
description: "Skalibruj podziałkę na ekranie za pomocą karty lub fizycznej linijki. Sprawdź zoom, dwa punkty kontrolne i wpływ orientacji telefonu na wynik."
ogTitle: "Jak skalibrować skalę linijki na ekranie?"
ogDescription: "Praktyczny test skali na telefonie, tablecie i komputerze z kartą bankową, znanym odcinkiem oraz kontrolą błędu."
imageAlt: "kalibracja skali pomiarowej na ekranie za pomocą karty"
heroImage: "/images/blog/kalibracja-linijki-online.png"
pubDate: "2026-06-07"
updatedDate: "2026-09-01"
---

## Po co kalibrować podziałkę ekranową?

Kalibracja skali polega na dopasowaniu wskazania na ekranie do przedmiotu o znanej długości. To ważne, ponieważ ten sam odcinek CSS może wyglądać inaczej na telefonie, tablecie i monitorze. Najprostszy test używa karty płatniczej, a najlepsza kontrola sprawdza dwa różne miejsca podziałki.

| Co sprawdzić | Przykład | Dobry rezultat |
| --- | --- | --- |
| Wzorzec | Długi bok karty ID-1 | 85,60 mm na podziałce |
| Środek | Odcinek 5 cm | Zgodność z fizyczną linijką |
| Koniec | Odcinek 10 cm | Brak narastającego przesunięcia |
| Ustawienia | Zoom i orientacja | Brak zmiany po kalibracji |

## Kalibracja kartą krok po kroku

1. Otwórz [linijkę online](/) na urządzeniu, na którym będzie wykonany pomiar.
2. Ustaw powiększenie przeglądarki na 100% i wyłącz dodatkowe powiększenie systemowe.
3. Wybierz jednostkę, w której ma być wykonany odczyt.
4. Połóż kartę płasko przy oznaczonym odcinku.
5. Ustaw suwak lub skalę tak, aby długi bok karty odpowiadał 85,60 mm.
6. Sprawdź odcinek 50 mm w innym miejscu ekranu.
7. Nie zmieniaj orientacji, zoomu ani szerokości okna przed pomiarem.

Standardowy format karty ID-1 ma 85,60 mm szerokości i 53,98 mm wysokości. Warto użyć prostej krawędzi, a nie zaokrąglonego narożnika. Szczegóły formatu opisuje [ISO/IEC 7810](https://www.iso.org/standard/70483.html).

## Dlaczego jeden punkt kontrolny nie wystarcza

Jeśli podziałka ma stałe przesunięcie, jeden punkt może wyglądać poprawnie, mimo że pozostała część skali jest nieprawidłowa. Dlatego po ustawieniu wzorca warto sprawdzić drugi odcinek. Karta pasująca przy początku, środku i końcu daje większą pewność, że nie leży pod kątem.

Przykład: po ustawieniu karty punkt 0 mm zgadza się z lewą krawędzią, ale przy prawej krawędzi brakuje 2 mm. To sygnał, aby ułożyć kartę równolegle albo poprawić skalę. Nie należy kompensować takiego błędu podczas każdego pomiaru.

## Telefon, tablet i monitor

Każde urządzenie wymaga osobnej kalibracji. Telefon może zmienić rozmiar strony po obróceniu, a monitor może mieć włączone systemowe skalowanie 125% lub 150%. Na komputerze warto sprawdzić również szerokość okna, bo układ strony może się zmienić po przejściu w tryb pełnoekranowy.

Orientacja wpływa na wygodę, ale nie powinna zmieniać ustawienia, jeśli narzędzie zachowuje ten sam rozmiar elementów. W praktyce bezpieczniej jest skalibrować urządzenie w tej pozycji, w której będzie mierzone.

## Jak ocenić niepewność wyniku

Niepewność rośnie, gdy krawędź przedmiotu jest gruba, miękka albo zaokrąglona. Przy krótkim odcinku błąd odczytu 1 mm ma większe znaczenie niż przy odcinku 20 cm. Dlatego warto zapisać wynik jako około 47 mm, jeśli krawędź wypada między kreskami, zamiast udawać dokładność do setnych milimetra.

Według [NIST](https://www.nist.gov/pml/owm/si-units-length) 1 cm to 10 mm. Samo przeliczenie jest pewne; niepewność dotyczy dopasowania obrazu, skali i przedmiotu. [MDN opisuje jednostki długości CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length), które na ekranie nie muszą oznaczać fizycznego centymetra bez dodatkowego testu.

## Błędy, które psują kalibrację

- użycie karty z grubą nakładką;
- kalibracja przy powiększonej stronie;
- przykładanie wzorca do krawędzi urządzenia zamiast do podziałki;
- zmiana orientacji po ustawieniu skali;
- pomiar przedmiotu trzymanego w powietrzu;
- zaokrąglanie wyniku wcześniej niż na końcu.

Przy pomiarze technicznym warto użyć fizycznej linijki albo suwmiarki. Kalibracja poprawia skalę, lecz nie usuwa problemu z krzywą krawędzią, paralaksą i ograniczoną rozdzielczością odczytu.

## Narzędzia pomocnicze

Do krótkiego testu można użyć [rozmiaru karty bankowej](/blog/rozmiar-karty-bankowej/). Gdy potrzebny jest dłuższy odcinek, przydatna będzie [linijka online 20 cm](/blog/linijka-online-20-cm/). Dla pomiaru papierowego warto porównać wynik z instrukcją [linijki do druku](/blog/linijka-do-druku/).

## Najczęstsze pytania

### Czy kalibrację wykonuje się na każdym urządzeniu?

Tak. Skala zależy od ekranu, przeglądarki, zoomu i ustawień systemowych.

### Czy karta płatnicza jest dobrym wzorcem?

Tak, jeśli ma standardowy format i prostą, nieodkształconą krawędź. Najlepiej znać jej rzeczywisty wymiar.

### Czy trzeba użyć fizycznej linijki?

Nie, ale fizyczna linijka daje łatwy punkt odniesienia. Karta jest wygodną alternatywą.

### Co zrobić po obróceniu telefonu?

Sprawdzić skalę ponownie. Nie należy zakładać, że orientacja nie zmieni układu strony.

### Czy kalibracja daje dokładność suwmiarki?

Nie. Zmniejsza błąd skali, ale nie zastępuje narzędzia technicznego.

### Jak często sprawdzać ustawienie?

Przed ważnym pomiarem oraz po zmianie urządzenia, zoomu, przeglądarki lub orientacji ekranu.

## Wnioski

Dobra kalibracja ma trzy elementy: znany wzorzec, brak dodatkowego powiększenia i kontrolę w drugim punkcie. Dzięki temu ekranowa podziałka może służyć do codziennych, orientacyjnych pomiarów. Wymiar istotny dla projektu, części lub zamówienia trzeba jednak potwierdzić fizycznym narzędziem.
