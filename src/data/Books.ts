import type { Book } from "../types/Book";

export const books: Book[] = [
    {
        id: 1,
        title: "Harry Potter en de Steen der Wijzen",
        author: "J.K. Rowling",
        genre: "Fantasy",
        languageLevel: "B1",
        length: "Lang",
        subject:"Tovenarij",
        description:
            "Harry Potter ontdekt dat hij een tovenaar is en begint aan zijn eerste jaar op Zweinstein."
    },
    {
        id: 2,
        title: "De Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        languageLevel: "B2",
        length: "Lang",
        subject:"Reis met mythische wezens",
        description:
            "Bilbo Balings gaat samen met een groep dwergen op avontuur naar de Eenzame Berg."
    },
    {
        id: 3,
        title: "Het Gouden Ei",
        author: "Tim Krabbé",
        genre: "Thriller",
        languageLevel: "B1",
        length: "Kort",
        subject:"Vermissing",
        description:
            "Tijdens een vakantie verdwijnt Saskia spoorloos. Haar vriend Rex blijft naar haar zoeken."
    },
    {
        id: 4,
        title: "Kruistocht in Spijkerbroek",
        author: "Thea Beckman",
        genre: "Avontuur",
        languageLevel: "B1",
        length: "Gemiddeld",
        subject:"Middeleeuwen",
        description:
            "Dolf belandt onverwacht in een middeleeuwse kruistocht en probeert te overleven."
    },
    {
        id: 5,
        title: "De brief voor de koning",
        author: "Tonke Dragt",
        genre: "Avontuur",
        languageLevel: "A2",
        length: "Gemiddeld",
        subject:"Avontuur",
        description:
            "Tiuri moet tijdens zijn ridderproef een belangrijke geheime brief bezorgen."
    },
    {
        id: 6,
        title: "Divergent",
        author: "Veronica Roth",
        genre: "Sciencefiction",
        languageLevel: "B2",
        length: "Lang",
        subject:"Toekomst",
        description:
            "Tris leeft in een samenleving waarin iedereen op basis van zijn eigenschappen bij een groep hoort."
    }
];