// Static, tactile film-grain texture applied site-wide.
// Inline SVG noise = no network request, resolution-independent, near-zero cost.
// Intentionally NOT animated (no per-frame cost, respects reduced-motion by default).

const NOISE_SVG =
    "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='200'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='4'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='200'%20height='200'%20filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GrainOverlay() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[45] opacity-[0.4] mix-blend-multiply"
            style={{ backgroundImage: NOISE_SVG, backgroundSize: "180px 180px" }}
        />
    );
}
