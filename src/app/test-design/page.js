export default function TestDesign() {
    return (
        <main className="min-h-screen bg-bg-page">
            {/* Section principale */}
            <div className="p-8">
                <h1 className="font-heading text-6xl text-brand-primary mb-6">
                    Clean &amp; Bliss
                </h1>
                <p className="font-body text-lg text-neutral-700 mb-4">
                    Votre référence à Cotonou pour la parfumerie fine et les produits de nettoyage.
                </p>
                <button className="bg-action-primary text-base-white font-body px-6 py-3 rounded-full hover:bg-action-primary-hover transition">
                    Explorer la Boutique
                </button>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-brand-surface p-4 rounded-lg">Carte 1</div>
                    <div className="bg-brand-accent text-base-white p-4 rounded-lg">Carte 2</div>
                    <div className="bg-brand-secondary p-4 rounded-lg">Carte 3</div>
                </div>
            </div>

            {/* ═══ Test du NOUVEAU footer sombre ═══ */}
            <footer className="bg-footer-bg text-footer-text p-12 mt-12">
                <h2 className="font-heading text-3xl mb-6">Clean &amp; Bliss</h2>
                <p className="font-body text-sm mb-8 max-w-md">
                    Votre référence ultime à Cotonou pour la parfumerie fine, les bougies d'ambiance
                    et les produits de nettoyage haute fraîcheur.
                </p>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-footer-link hover:text-footer-link-hover transition">
                            Accueil
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-footer-link hover:text-footer-link-hover transition">
                            Boutique
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-footer-link hover:text-footer-link-hover transition">
                            Qui sommes-nous ?
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-footer-link hover:text-footer-link-hover transition">
                            Contact
                        </a>
                    </li>
                </ul>
            </footer>
        </main>
    );
}