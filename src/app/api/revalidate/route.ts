// EN: API route to handle WordPress webhook revalidation
// FR: API route pour gérer la revalidation via webhook WordPress

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // EN: Get the secret from headers or body
    // FR: Récupère le secret depuis les headers ou le body
    const headerSecret = request.headers.get("x-headlessnext-secret");

    const body = await request.json().catch(() => ({}));
    const bodySecret = body?.secret;

    const providedSecret = headerSecret || bodySecret;

    // EN: Validate the secret matches our environment variable
    // FR: Valide que le secret correspond à notre variable d'environnement
    if (providedSecret !== process.env.REVALIDATE_SECRET) {
        console.log("[Revalidate] Invalid secret");
        return NextResponse.json(
            { error: "Invalid secret" },
            { status: 401 }
        );
    }

    // EN: Extract slug and post type from the payload
    // FR: Extrait le slug et le type de contenu du payload
    const slug = body?.slug;
    const postType = body?.post_type;

    // EN: Handle test connection (no slug) — return OK so the plugin validates the endpoint
    // FR: Gère le test de connexion (sans slug) — retourne OK pour que le plugin valide l'endpoint
    if (!slug) {
        console.log("[Revalidate] Test connection received — endpoint is reachable");
        return NextResponse.json({
            status: "ok",
            message: "Revalidation endpoint is active (test)",
            timestamp: Date.now(),
        });
    }

    try {
        // EN: Revalidate the specific page based on the post type
        // FR: Revalide la page spécifique selon le type de contenu
        if (postType === "product") {
            revalidatePath(`/produit/${slug}`);
            revalidatePath("/boutique");
            console.log(`[Revalidate] Product updated: /produit/${slug}`);
        } else if (postType === "post") {
            revalidatePath(`/publications/${slug}`);
            revalidatePath("/publications");
            console.log(`[Revalidate] Post updated: /publications/${slug}`);
        } else if (postType === "page") {
            revalidatePath(`/${slug}`);
            console.log(`[Revalidate] Page updated: /${slug}`);
        } else {
            console.log(`[Revalidate] Unknown post type: ${postType} — revalidating homepage only`);
        }

        // EN: Also revalidate the homepage
        // FR: Revalide aussi la page d'accueil
        revalidatePath("/");

        return NextResponse.json({
            revalidated: true,
            slug,
            postType,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error("[Revalidate] Error:", error);
        return NextResponse.json(
            { error: "Revalidation failed" },
            { status: 500 }
        );
    }
}

// EN: GET endpoint for quick health check
// FR: Endpoint GET pour vérification rapide
export async function GET() {
    return NextResponse.json({
        status: "ok",
        message: "Revalidation endpoint is active",
        timestamp: Date.now(),
    });
}