export const types = ['Manga', 'Manhwa', 'Manhua', 'Cómic', 'Original'];

export const demographies = ['Shounen', 'Shoujo', 'Josei', 'Seinen', 'Kodomo'];



export const states = [
    "Siguiendo", "Completos", "Favoritos", "OneShot", "Pausados", "Pendientes", "Abandonados"
];

export const categories = [
    "Acción",
    "Artes Marciales",
    "Aventura",
    "Boys Love",
    "Ciencia Ficción",
    "Comedia",
    "Demonios",
    "Deporte",
    "Drama",
    "Ecchi",
    "Fantasia",
    "Gender Bender",
    "Girls Love",
    "Gore",
    "Guerra",
    "Harem",
    "Historia",
    "Horror",
    "Magia",
    "Mecha",
    "Misterio",
    "Musica",
    "Oeste",
    "Parodia",
    "Policiaco",
    "Psicológico",
    "Realidad",
    "Reencarnación",
    "Romance",
    "Samurái",
    "Slice of Life",
    "Sobrenatural",
    "Superpoderes",
    "Supervivencia",
    "Thriller",
    "Tragedia",
    "Vampiros",
    "Vida Escolar"
];

export const statusColors = {

    "Siguiendo": "#d500f9",
    "Completos": "#A2D729",
    "Favoritos": "gold",
    "OneShot": "#1975D2",
    "Pausados": "#F86624",
    "Pendientes": "#6E2594",
    "Abandonados": "#ea3546",
};

export class Global {

    static get tags() {
        if (Global.allTags) {
            return Global.allTags;
        }
        return [];
    }

    static set tags(valor) {
        if (valor !== Global.tags) {
            Global.allTags = valor;
        }
    }
}