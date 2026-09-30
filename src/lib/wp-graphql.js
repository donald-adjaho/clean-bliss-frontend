// ┌─────────────────────────────────────────────────────────────────┐
// │ CLIENT GRAPHQL — Clean & Bliss                                  │
// │                                                                 │
// │ Rôle : centraliser toutes les requêtes vers WordPress.         │
// │ Une seule fonction à importer partout dans le projet.          │
// │                                                                 │
// │ Pourquoi centraliser ?                                          │
// │  - Une seule URL à changer en cas de migration                 │
// │  - Gestion uniforme du cache et des erreurs                    │
// │  - Code plus lisible dans les composants                       │
// └─────────────────────────────────────────────────────────────────┘

// On récupère l'URL de GraphQL depuis .env.local
// process.env = objet global Node.js qui contient les variables d'env
const GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;

// Vérification de sécurité : si l'URL manque, on arrête tout
// Comme ça, on voit tout de suite qu'on a oublié de configurer .env.local
if (!GRAPHQL_URL) {
    throw new Error("NEXT_PUBLIC_WP_GRAPHQL_URL n'est pas défini dans .env.local");
}
// ┌─────────────────────────────────────────────────────────────────┐
// │ FONCTION PRINCIPALE : fetchGraphQL                              │
// │                                                                 │
// │ Prend en entrée :                                               │
// │  - query     : la requête GraphQL (chaîne de caractères)        │
// │  - variables : (optionnel) les valeurs dynamiques à injecter    │
// │                                                                 │
// │ Retourne : les données brutes de WordPress (data)               │
// └─────────────────────────────────────────────────────────────────┘
export async function fetchGraphQL(query, variables = {}) {
    // fetch() = fonction native JavaScript pour faire des requêtes HTTP
    // (comme un navigateur qui charge une page, mais en code)

    const response = await fetch(GRAPHQL_URL, {
        // GraphQL utilise TOUJOURS la méthode POST
        // (contrairement à REST qui utilise GET pour lire, POST pour écrire)
        method: "POST",

        // Headers = métadonnées de la requête
        // On dit au serveur : "je t'envoie du JSON"
        headers: { "Content-Type": "application/json" },

        // Body = le contenu de la requête
        // On convertit l'objet JS en chaîne JSON avec JSON.stringify()
        // { query, variables } = syntaxe raccourcie de { query: query, variables: variables }
        body: JSON.stringify({ query, variables }),

        // Option SPÉCIFIQUE Next.js : cache de la réponse pendant 1 heure
        // - 3600 secondes = 1h
        // - Après 1h, Next.js régénère en arrière-plan (stale-while-revalidate)
        // - Résultat : site ultra-rapide + données fraîches
        next: { revalidate: 3600 },
    });

    // Vérification du code HTTP
    // 200-299 = OK, 400+ = erreur
    // response.ok = true si code entre 200 et 299
    if (!response.ok) {
        throw new Error(`Erreur GraphQL (${response.status}): ${response.statusText}`);
    }

    // On convertit la réponse en objet JavaScript
    // await = attend que la conversion soit finie avant de continuer
    const json = await response.json();

    // GraphQL peut retourner des erreurs applicatives
    // (même si le code HTTP est 200, il peut y avoir des errors)
    if (json.errors) {
        console.error("Erreurs GraphQL:", json.errors);
        throw new Error(json.errors[0]?.message || "Erreur GraphQL inconnue");
    }

    // On retourne uniquement la partie "data" (pas les metadata)
    return json.data;
}