// ┌─────────────────────────────────────────────────────────────────┐
// │ PAGE DE TEST — Récupération de produits WooCommerce             │
// │                                                                 │
// │ URL d'accès : http://localhost:3000/test-graphql                │
// │                                                                 │
// │ Rôle : vérifier que la connexion Faust ↔ WordPress fonctionne  │
// │                                                                 │
// │ Note : dans l'App Router de Next.js, un fichier nommé          │
// │ "page.js" dans un dossier devient automatiquement une route.    │
// │ → src/app/test-graphql/page.js = route /test-graphql            │
// └─────────────────────────────────────────────────────────────────┘

// On importe notre fonction GraphQL
// Le @/ est un alias qui pointe vers src/ (configuré dans tsconfig.json)
// Donc "@/lib/wp-graphql" = "src/lib/wp-graphql"
import { fetchGraphQL } from "@/lib/wp-graphql";

// ┌─────────────────────────────────────────────────────────────────┐
// │ COMPOSANT REACT — Server Component (par défaut dans App Router) │
// │                                                                 │
// │ "async" = ce composant peut attendre des données                │
// │ Server Component = s'exécute sur le SERVEUR (pas le navigateur) │
// │                                                                 │
// │ Avantages :                                                     │
// │  - Peut accéder directement à la base de données / API          │
// │  - Le HTML est envoyé prêt au navigateur (SEO + vitesse)        │
// │  - Pas de JavaScript envoyé côté client pour ce composant       │
// └─────────────────────────────────────────────────────────────────┘
export default async function TestGraphQL() {

    // ┌─────────────────────────────────────────────────────────────┐
    // │ REQUÊTE GRAPHQL                                             │
    // │                                                             │
    // │ Cette syntaxe (avec les backticks `) s'appelle un          │
    // │ "template literal" — c'est juste une chaîne de caractères  │
    // │ sur plusieurs lignes.                                       │
    // │                                                             │
    // │ La requête demande :                                        │
    // │  - products : la liste des produits                         │
    // │  - first: 5 : les 5 premiers seulement                      │
    // │  - nodes : la liste des résultats                           │
    // │  - id, name, slug : les champs qu'on veut                   │
    // └─────────────────────────────────────────────────────────────┘
    const data = await fetchGraphQL(`
    query GetProducts {
      products(first: 5) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `);

    // ┌─────────────────────────────────────────────────────────────┐
    // │ RENDU JSX                                                   │
    // │                                                             │
    // │ JSX = syntaxe qui ressemble à du HTML mais qui est du      │
    // │ JavaScript. React le transforme en appels de fonctions.     │
    // │                                                             │
    // │ Les accolades { } permettent d'insérer du JavaScript dans  │
    // │ le HTML.                                                    │
    // └─────────────────────────────────────────────────────────────┘
    return (
        // <main> = balise HTML sémantique pour le contenu principal
        // className = en React, on utilise "className" au lieu de "class"
        // Les classes p-8, max-w-3xl, etc. viennent de Tailwind CSS
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Test GraphQL — Mes 5 premiers produits
            </h1>
            <ul className="space-y-3">
                {/*
          .map() = fonction JavaScript qui parcourt un tableau
          Pour chaque "product" dans data.products.nodes, on retourne un <li>
          
          key={product.id} = identifiant unique obligatoire pour React
          (permet à React de savoir quel élément a changé)
        */}
                {data.products.nodes.map((product) => (
                    <li key={product.id} className="border p-4 rounded-lg">
                        {/* {product.name} = affiche le nom du produit */}
                        <strong>{product.name}</strong>
                        {/* {product.slug} = affiche le slug entre parenthèses */}
                        <span className="text-gray-500 ml-2">({product.slug})</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}